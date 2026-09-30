import { A_Scope } from '@adaas/a-concept';
import { Are } from '@adaas/are/component/Are.component';

jest.retryTimes(0);


function makeScopes(components: Array<any>) {
    const id = Math.random().toString(36).slice(2);
    const parent = new A_Scope({ name: `tag-parent-${id}`, components });
    const child = new A_Scope({ name: `tag-child-${id}` }).inherit(parent);
    return { parent, child };
}

describe('Are component tag resolution (minification-safe)', () => {

    it('derives the tag from the class name and strips bundler underscores', () => {
        class UserCard extends Are { }
        // esbuild emits `var _Renamed = class _Renamed {}` for classes with static self-references
        const _Renamed = class _UserBadge extends Are { };

        expect(Are.tagOf(UserCard)).toBe('user-card');
        expect(Are.tagOf(_Renamed)).toBe('user-badge');
    });

    it('prefers an own static tag and does not inherit it', () => {
        const Mangled = class a extends Are { static tag = 'user-card'; };
        const Child = class b extends Mangled { };

        expect(Are.tagOf(Mangled)).toBe('user-card');
        expect(Are.tagOf(Child)).toBe('b');
    });

    it('resolves bundler-renamed and explicitly tagged components from a child scope', () => {
        const _Renamed = class _UserBadge extends Are { };
        const Mangled = class q extends Are { static tag = 'user-card'; };
        class PlainName extends Are { }

        const { child } = makeScopes([_Renamed, Mangled, PlainName]);

        expect(Are.resolveByTag(child, 'user-badge')).toBeInstanceOf(_Renamed);
        expect(Are.resolveByTag(child, 'user-card')).toBeInstanceOf(Mangled);
        expect(Are.resolveByTag(child, 'plain-name')).toBeInstanceOf(PlainName);
        expect(Are.resolveByTag(child, 'div')).toBeUndefined();
        // cached miss stays a miss
        expect(Are.resolveByTag(child, 'div')).toBeUndefined();
    });

    it('picks up a component registered after a cached miss', () => {
        const Late = class _LateCard extends Are { };
        const { parent, child } = makeScopes([]);

        expect(Are.resolveByTag(child, 'late-card')).toBeUndefined();

        parent.register(Late);

        expect(Are.resolveByTag(child, 'late-card')).toBeInstanceOf(Late);
    });
});
