import { A_Entity } from '@adaas/a-concept';
import { AreInstruction } from '@adaas/are/instruction/AreInstruction.entity';
import { AreDeclaration } from '@adaas/are/instruction/types/AreDeclaration.instruction';
import { AreMutation } from '@adaas/are/instruction/types/AreMutation.instruction';

jest.retryTimes(0);


describe('AreDeclaration', () => {
    it('Should be an instance of AreInstruction', () => {
        const decl = new AreDeclaration('createElement', { tag: 'div' });
        expect(decl).toBeInstanceOf(AreInstruction);
    });

    it('Should be an instance of A_Entity', () => {
        const decl = new AreDeclaration('createElement', { tag: 'div' });
        expect(decl).toBeInstanceOf(A_Entity);
    });

    it('Should store the payload', () => {
        const decl = new AreDeclaration('createElement', { tag: 'div' });
        expect(decl.payload).toEqual({ tag: 'div' });
    });

    it('Should have no parent when created standalone', () => {
        const decl = new AreDeclaration('createElement', { tag: 'div' });
        expect(decl.parent).toBeUndefined();
    });

    it('Should generate an id', () => {
        const decl = new AreDeclaration('createElement', {});
        expect(decl.id).toBeDefined();
        expect(typeof decl.id).toBe('string');
    });

    it('Should use DefaultName when no name is given', () => {
        const decl = new AreDeclaration();
        expect(decl.id).toBeDefined();
    });
});


describe('AreMutation', () => {
    it('Should be an instance of AreInstruction', () => {
        const host = new AreDeclaration('createElement', { tag: 'div' });
        const mutation = new AreMutation('setAttribute', host, { name: 'class', value: 'foo' });
        expect(mutation).toBeInstanceOf(AreInstruction);
    });

    it('Should be an instance of A_Entity', () => {
        const host = new AreDeclaration('createElement', { tag: 'span' });
        const mutation = new AreMutation('setAttribute', host, { name: 'id', value: 'bar' });
        expect(mutation).toBeInstanceOf(A_Entity);
    });

    it('Should store the payload', () => {
        const host = new AreDeclaration('createElement', { tag: 'p' });
        const mutation = new AreMutation('setAttribute', host, { name: 'class', value: 'active' });
        expect(mutation.payload).toEqual({ name: 'class', value: 'active' });
    });

    it('Should reference the parent declaration ASEID', () => {
        const host = new AreDeclaration('createElement', { tag: 'div' });
        const mutation = new AreMutation('setAttribute', host, {});
        expect(mutation.parent).toBe(host.aseid.toString());
    });

    it('Should use the parent declaration as group', () => {
        const host = new AreDeclaration('createElement', { tag: 'div' });
        const mutation = new AreMutation('setAttribute', host, {});
        expect(mutation.group).toBe(host.aseid.toString());
    });
});
