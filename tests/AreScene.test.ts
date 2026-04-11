import { A_Fragment } from '@adaas/a-concept';
import { AreScene } from '@adaas/are/scene/AreScene.context';
import { AreSceneStatuses } from '@adaas/are/scene/AreScene.constants';

jest.retryTimes(0);


describe('AreScene', () => {
    it('Should be an instance of A_Fragment', () => {
        const scene = new AreScene('test-scene');
        expect(scene).toBeInstanceOf(A_Fragment);
    });

    it('Should expose the id passed in constructor', () => {
        const scene = new AreScene('my-scene-id');
        expect(scene.id).toBe('my-scene-id');
    });

    it('Should start in Active status by default', () => {
        const scene = new AreScene('test-active');
        expect(scene.isActive).toBe(true);
        expect(scene.isInactive).toBe(false);
    });

    it('deactivate() should set status to Inactive', () => {
        const scene = new AreScene('deactivate-test');
        scene.deactivate();
        expect(scene.isActive).toBe(false);
        expect(scene.isInactive).toBe(true);
        expect(scene.status).toBe(AreSceneStatuses.Inactive);
    });

    it('activate() should restore Active status after deactivation', () => {
        const scene = new AreScene('reactivate-test');
        scene.deactivate();
        scene.activate();
        expect(scene.isActive).toBe(true);
        expect(scene.status).toBe(AreSceneStatuses.Active);
    });

    it('planned should be empty initially', () => {
        const scene = new AreScene('empty-plan');
        expect(scene.planned).toHaveLength(0);
    });

    it('applied should be empty initially', () => {
        const scene = new AreScene('empty-state');
        expect(scene.applied).toHaveLength(0);
    });

    it('host should be undefined initially', () => {
        const scene = new AreScene('no-host');
        expect(scene.host).toBeUndefined();
    });

    it('changes should show empty toApply and toRevert initially', () => {
        const scene = new AreScene('empty-changes');
        const changes = scene.changes;
        expect(changes.toApply).toHaveLength(0);
        expect(changes.toRevert).toHaveLength(0);
    });
});
