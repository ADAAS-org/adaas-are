import { A_Scope } from '@adaas/a-concept';
import { AreStore } from '@adaas/are/store/AreStore.context';
import { AreContext } from '@adaas/are/component/Are.context';
import { AreStoreWatchingEntity } from '@adaas/are/store/AreStore.types';

jest.retryTimes(0);


/**
 * Builds an isolated AreStore wired into a scope that also carries an
 * AreContext (the store reads its shared `watchers` set from there).
 */
function makeStore<T extends Record<string, any> = Record<string, any>>() {
    const scope = new A_Scope({ name: `store-test-${Math.random().toString(36).slice(2)}` });
    const context = new AreContext('');
    scope.register(context);
    const store = new AreStore<T>(`store-${Math.random().toString(36).slice(2)}`);
    scope.register(store);
    return { scope, context, store };
}

/**
 * Creates a watcher whose `update()` is a jest mock, optionally re-reading the
 * given keys on every update (used to exercise stale-dependency pruning).
 */
function makeWatcher(store: AreStore, rereads?: () => string[]): AreStoreWatchingEntity & { update: jest.Mock } {
    const watcher: AreStoreWatchingEntity & { update: jest.Mock } = {
        update: jest.fn(() => {
            if (!rereads) return;
            store.watch(watcher);
            for (const key of rereads()) store.get(key);
            store.unwatch(watcher);
        }),
    };
    return watcher;
}

/** Registers `watcher` against every `key` it "reads" inside one tracking window. */
function track(store: AreStore, watcher: AreStoreWatchingEntity, keys: string[]) {
    store.watch(watcher);
    for (const key of keys) store.get(key);
    store.unwatch(watcher);
}


describe('AreStore — baseline behavior', () => {
    it('stores and reads a top-level key', () => {
        const { store } = makeStore<{ name: string }>();
        store.set('name', 'Alice');
        expect(store.get('name')).toBe('Alice');
    });

    it('stores and reads via an object set', () => {
        const { store } = makeStore<{ a: number; b: number }>();
        store.set({ a: 1, b: 2 });
        expect(store.get('a')).toBe(1);
        expect(store.get('b')).toBe(2);
    });

    it('stores and reads a nested path', () => {
        const { store } = makeStore<{ user: { name: string } }>();
        // Objects are written wholesale and read by nested path — the common
        // component pattern (e.g. store.set('user', {...}) then {{user.name}}).
        store.set('user', { name: 'Bob' });
        expect(store.get('user.name')).toBe('Bob');
        expect(store.get('user')).toEqual({ name: 'Bob' });
    });

    it('tracks keys in the keys set', () => {
        const { store } = makeStore<{ a: number; b: number }>();
        store.set({ a: 1, b: 2 });
        expect(store.keys.has('a')).toBe(true);
        expect(store.keys.has('b')).toBe(true);
    });

    it('watch/unwatch toggle the shared watchers set', () => {
        const { store } = makeStore();
        const watcher = makeWatcher(store);
        expect(store.watchers.size).toBe(0);
        store.watch(watcher);
        expect(store.watchers.size).toBe(1);
        store.unwatch(watcher);
        expect(store.watchers.size).toBe(0);
    });
});


describe('AreStore — dependency tracking & notification', () => {
    it('notifies a watcher when its exact key changes', () => {
        const { store } = makeStore<{ count: number }>();
        store.set('count', 0);
        const watcher = makeWatcher(store);
        track(store, watcher, ['count']);

        store.set('count', 1);
        expect(watcher.update).toHaveBeenCalledTimes(1);
    });

    it('does NOT notify a watcher for an unrelated key', () => {
        const { store } = makeStore<{ a: number; b: number }>();
        store.set({ a: 0, b: 0 });
        const watcher = makeWatcher(store);
        track(store, watcher, ['a']);

        store.set('b', 1);
        expect(watcher.update).not.toHaveBeenCalled();
    });

    it('notifies an ancestor watcher when a descendant changes', () => {
        const { store } = makeStore<{ user: { name: string } }>();
        store.set('user', { name: 'a' });
        const watcher = makeWatcher(store);
        track(store, watcher, ['user']); // subscribes to "user"

        store.set('user.name', 'b'); // descendant write
        expect(watcher.update).toHaveBeenCalledTimes(1);
    });

    it('notifies a descendant watcher when an ancestor changes', () => {
        const { store } = makeStore<{ user: { name: string } }>();
        store.set('user', { name: 'a' });
        const watcher = makeWatcher(store);
        track(store, watcher, ['user.name']); // subscribes to user.name

        store.set('user', { name: 'b' }); // ancestor write
        expect(watcher.update).toHaveBeenCalledTimes(1);
    });

    it('drop() removes the key and notifies its watchers', () => {
        const { store } = makeStore<{ a: number }>();
        store.set('a', 1);
        const watcher = makeWatcher(store);
        track(store, watcher, ['a']);

        store.drop('a');
        expect(watcher.update).toHaveBeenCalledTimes(1);
        expect(store.keys.has('a')).toBe(false);
    });

    it('forceUpdate() with no key notifies every registered watcher', () => {
        const { store } = makeStore<{ a: number; b: number }>();
        store.set({ a: 0, b: 0 });
        const wa = makeWatcher(store);
        const wb = makeWatcher(store);
        track(store, wa, ['a']);
        track(store, wb, ['b']);

        store.forceUpdate();
        expect(wa.update).toHaveBeenCalledTimes(1);
        expect(wb.update).toHaveBeenCalledTimes(1);
    });
});


// ── #3: redundant update() calls — a single logical change must notify once ──
describe('AreStore — deduplicated dispatch (#3)', () => {
    it('notifies a deep-path watcher exactly once despite matching multiple ancestor entries', () => {
        const { store } = makeStore<{ user: { profile: { name: string } } }>();
        store.set('user', { profile: { name: 'a' } });

        const watcher = makeWatcher(store);
        // Reading user.profile.name registers under user, user.profile AND user.profile.name.
        track(store, watcher, ['user.profile.name']);

        store.set('user.profile.name', 'b');
        // Without dedup this would fire 3× (one per matching ancestor entry).
        expect(watcher.update).toHaveBeenCalledTimes(1);
    });

    it('notifies once when a watcher reads several keys changed by one object set', () => {
        const { store } = makeStore<{ a: number; b: number; c: number }>();
        store.set({ a: 0, b: 0, c: 0 });

        const watcher = makeWatcher(store);
        track(store, watcher, ['a', 'b', 'c']);

        store.set({ a: 1, b: 2, c: 3 });
        expect(watcher.update).toHaveBeenCalledTimes(1);
    });
});


// ── #4: write batching ──────────────────────────────────────────────────────
describe('AreStore — write batching (#4)', () => {
    it('object set is itself a single batch (one update for multiple keys)', () => {
        const { store } = makeStore<{ a: number; b: number }>();
        store.set({ a: 0, b: 0 });
        const watcher = makeWatcher(store);
        track(store, watcher, ['a', 'b']);

        store.set({ a: 1, b: 2 });
        expect(watcher.update).toHaveBeenCalledTimes(1);
    });

    it('batch() coalesces multiple set() calls into one notification', () => {
        const { store } = makeStore<{ a: number; b: number }>();
        store.set({ a: 0, b: 0 });
        const watcher = makeWatcher(store);
        track(store, watcher, ['a', 'b']);

        store.batch(() => {
            store.set('a', 1);
            store.set('b', 2);
            // deferred — nothing fired yet
            expect(watcher.update).not.toHaveBeenCalled();
        });

        expect(watcher.update).toHaveBeenCalledTimes(1);
    });

    it('nested batch() flushes only when the outermost batch completes', () => {
        const { store } = makeStore<{ a: number }>();
        store.set('a', 0);
        const watcher = makeWatcher(store);
        track(store, watcher, ['a']);

        store.batch(() => {
            store.batch(() => {
                store.set('a', 1);
            });
            // inner batch returned but outer still open → not flushed
            expect(watcher.update).not.toHaveBeenCalled();
            store.set('a', 2);
        });

        expect(watcher.update).toHaveBeenCalledTimes(1);
    });

    it('batch() still flushes pending notifications if the body throws', () => {
        const { store } = makeStore<{ a: number }>();
        store.set('a', 0);
        const watcher = makeWatcher(store);
        track(store, watcher, ['a']);

        expect(() =>
            store.batch(() => {
                store.set('a', 1);
                throw new Error('boom');
            }),
        ).toThrow('boom');

        expect(watcher.update).toHaveBeenCalledTimes(1);
    });
});


// ── #5: stale dependencies pruned on re-evaluation ──────────────────────────
describe('AreStore — stale dependency pruning (#5)', () => {
    it('re-watching prunes paths no longer read', () => {
        const { store } = makeStore<{ a: number; b: number }>();
        store.set({ a: 0, b: 0 });
        const watcher = makeWatcher(store);

        // First render reads "a"
        track(store, watcher, ['a']);
        // Second render reads "b" instead — must drop the "a" subscription
        track(store, watcher, ['b']);

        store.set('a', 1);
        expect(watcher.update).not.toHaveBeenCalled();

        store.set('b', 1);
        expect(watcher.update).toHaveBeenCalledTimes(1);
    });

    it('prunes stale paths through a self-driving update() re-read', () => {
        const { store } = makeStore<{ a: number; b: number }>();
        store.set({ a: 0, b: 0 });

        let readKey = 'a';
        const watcher = makeWatcher(store, () => [readKey]);

        // Initial subscription is on "a"
        track(store, watcher, ['a']);

        // Flip what the watcher will read, then trigger it via "a".
        readKey = 'b';
        store.set('a', 1); // fires update() once → re-reads "b", prunes "a"
        expect(watcher.update).toHaveBeenCalledTimes(1);

        watcher.update.mockClear();

        // "a" is no longer a dependency; "b" now is.
        store.set('a', 2);
        expect(watcher.update).not.toHaveBeenCalled();

        store.set('b', 1);
        expect(watcher.update).toHaveBeenCalledTimes(1);
    });
});


// ── #1: watchers unregistered on revert/unmount ─────────────────────────────
describe('AreStore — unregister cleanup (#1)', () => {
    it('unregister() stops a watcher from being notified', () => {
        const { store } = makeStore<{ a: number }>();
        store.set('a', 0);
        const watcher = makeWatcher(store);
        track(store, watcher, ['a']);

        store.set('a', 1);
        expect(watcher.update).toHaveBeenCalledTimes(1);

        store.unregister(watcher);
        watcher.update.mockClear();

        store.set('a', 2);
        expect(watcher.update).not.toHaveBeenCalled();
    });

    it('unregister() removes the watcher from every path it held', () => {
        const { store } = makeStore<{ user: { name: string }; other: number }>();
        store.set({ user: { name: 'a' }, other: 0 });
        const watcher = makeWatcher(store);
        track(store, watcher, ['user.name', 'other']);

        store.unregister(watcher);
        watcher.update.mockClear();

        store.set('user.name', 'b');
        store.set('other', 1);
        store.set('user', { name: 'c' });
        expect(watcher.update).not.toHaveBeenCalled();
    });

    it('unregister() drops a pending batched notification', () => {
        const { store } = makeStore<{ a: number }>();
        store.set('a', 0);
        const watcher = makeWatcher(store);
        track(store, watcher, ['a']);

        store.batch(() => {
            store.set('a', 1);     // queues the watcher
            store.unregister(watcher); // … then it is torn down
        });

        expect(watcher.update).not.toHaveBeenCalled();
    });
});
