import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreDeclaration } from '@adaas/are/instruction/types/AreDeclaration.instruction';
import { AreMutation } from '@adaas/are/instruction/types/AreMutation.instruction';
import { AreAttribute } from '@adaas/are/attribute/AreAttribute.entity';
import { AreScene } from '@adaas/are/scene/AreScene.context';

jest.retryTimes(0);


describe('AreInstruction serialization', () => {
    it('toJSON() should expose the structural fields', () => {
        const decl = new AreDeclaration('createElement', { tag: 'div' });
        const json = decl.toJSON();

        expect(json.aseid).toBe(decl.aseid.toString());
        expect(json.name).toBe('createElement');
        expect(json.payload).toEqual({ tag: 'div' });
    });

    it('toJSON() type discriminator should be the canonical class name', () => {
        const decl = new AreDeclaration('createElement', { tag: 'div' });
        const host = new AreDeclaration('createElement', { tag: 'div' });
        const mutation = new AreMutation('setAttribute', host, { name: 'class', value: 'x' });

        expect(decl.toJSON().type).toBe('AreDeclaration');
        expect(mutation.toJSON().type).toBe('AreMutation');
    });

    it('toJSON() should NOT leak runtime-only fields', () => {
        const decl = new AreDeclaration('createElement', { tag: 'div' });
        const json = decl.toJSON() as Record<string, unknown>;

        expect(json).not.toHaveProperty('_props');
        expect(json).not.toHaveProperty('props');
    });

    it('should be fully JSON serializable (stringify/parse round-trip)', () => {
        const decl = new AreDeclaration('createElement', { tag: 'div', id: 'root' });
        const raw = JSON.stringify(decl);
        const parsed = JSON.parse(raw);

        expect(parsed.name).toBe('createElement');
        expect(parsed.type).toBe('AreDeclaration');
        expect(parsed.payload).toEqual({ tag: 'div', id: 'root' });
        expect(parsed.aseid).toBe(decl.aseid.toString());
    });
});


describe('AreInstruction deserialization (round-trip)', () => {
    it('AreDeclaration should be reconstructable from its serialized form', () => {
        const original = new AreDeclaration('createElement', { tag: 'section' });
        const serialized = JSON.parse(JSON.stringify(original));

        const restored = new AreDeclaration(serialized);

        expect(restored).toBeInstanceOf(AreInstruction);
        expect(restored).toBeInstanceOf(AreDeclaration);
        expect(restored.aseid.toString()).toBe(original.aseid.toString());
        expect(restored.id).toBe(original.id);
        expect(restored.name).toBe('createElement');
        expect(restored.payload).toEqual({ tag: 'section' });
    });

    it('AreMutation should preserve parent and group references after round-trip', () => {
        const host = new AreDeclaration('createElement', { tag: 'div' });
        const original = new AreMutation('setAttribute', host, { name: 'class', value: 'active' });
        const serialized = JSON.parse(JSON.stringify(original));

        const restored = new AreMutation(serialized);

        expect(restored).toBeInstanceOf(AreMutation);
        expect(restored.aseid.toString()).toBe(original.aseid.toString());
        expect(restored.name).toBe('setAttribute');
        expect(restored.payload).toEqual({ name: 'class', value: 'active' });
        expect(restored.parent).toBe(host.aseid.toString());
        expect(restored.group).toBe(host.aseid.toString());
    });

    it('round-trip should produce an identical serialized form (idempotent)', () => {
        const host = new AreDeclaration('createElement', { tag: 'div' });
        const original = new AreMutation('setAttribute', host, { name: 'id', value: 'x' });

        const firstPass = original.toJSON();
        const restored = new AreMutation(firstPass);
        const secondPass = restored.toJSON();

        expect(secondPass).toEqual(firstPass);
    });
});


describe('AreAttribute serialization', () => {
    const init = {
        name: 'label',
        raw: ' :label="buttonLabel" ',
        content: 'buttonLabel',
        prefix: ':',
    };

    it('toJSON() should expose the static fields and drop the evaluated value', () => {
        const attr = new AreAttribute(init);
        attr.value = 'Click me'; // runtime-evaluated value

        const json = attr.toJSON() as Record<string, unknown>;

        expect(json.aseid).toBe(attr.aseid.toString());
        expect(json.name).toBe('label');
        expect(json.raw).toBe(' :label="buttonLabel" ');
        expect(json.content).toBe('buttonLabel');
        expect(json.prefix).toBe(':');
        expect(json).not.toHaveProperty('value');
    });

    it('should be reconstructable from its serialized form without the runtime value', () => {
        const original = new AreAttribute(init);
        original.value = 'Click me';

        const serialized = JSON.parse(JSON.stringify(original));
        const restored = new AreAttribute(serialized);

        expect(restored).toBeInstanceOf(AreAttribute);
        expect(restored.aseid.toString()).toBe(original.aseid.toString());
        expect(restored.name).toBe('label');
        expect(restored.raw).toBe(' :label="buttonLabel" ');
        expect(restored.content).toBe('buttonLabel');
        expect(restored.prefix).toBe(':');
        expect(restored.value).toBeUndefined();
    });
});


describe('AreScene serialization', () => {
    it('toJSON() should serialize the host and the ordered plan', () => {
        const scene = new AreScene('scene-1');
        const host = new AreDeclaration('createElement', { tag: 'div' });
        scene.setHost(host);
        scene.plan(host);

        const mutation = new AreMutation('setAttribute', host, { name: 'class', value: 'box' });
        scene.plan(mutation);

        const json = scene.toJSON();

        expect(json.name).toBe('scene-1');
        expect(json.host?.name).toBe('createElement');
        expect(json.host?.type).toBe('AreDeclaration');
        expect(json.plan).toHaveLength(2);
        expect(json.plan.map(i => i.type)).toEqual(['AreDeclaration', 'AreMutation']);
        expect(json.plan[0].aseid).toBe(host.aseid.toString());
        expect(json.plan[1].aseid).toBe(mutation.aseid.toString());
    });

    it('toJSON() should NOT include runtime-only scene state (status / applied)', () => {
        const scene = new AreScene('scene-2');
        const host = new AreDeclaration('createElement', { tag: 'span' });
        scene.setHost(host);
        scene.plan(host);
        scene.deactivate();

        const json = scene.toJSON() as Record<string, unknown>;

        expect(json).not.toHaveProperty('status');
        expect(json).not.toHaveProperty('_state');
        expect(json).not.toHaveProperty('applied');
    });

    it('the serialized plan should survive a full JSON stringify/parse round-trip', () => {
        const scene = new AreScene('scene-3');
        const host = new AreDeclaration('createElement', { tag: 'ul' });
        scene.setHost(host);
        scene.plan(host);

        const parsed = JSON.parse(JSON.stringify(scene));

        expect(parsed.name).toBe('scene-3');
        expect(parsed.plan).toHaveLength(1);
        expect(parsed.plan[0].name).toBe('createElement');
        expect(parsed.plan[0].type).toBe('AreDeclaration');
    });
});
