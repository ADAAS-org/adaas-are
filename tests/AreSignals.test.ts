import { A_Signal } from '@adaas/a-utils/a-signal';
import { AreSignal } from '@adaas/are/signals/AreSignal.entity';
import { AreInit } from '@adaas/are/signals/entities/AreInit.signal';
import { AreRoute } from '@adaas/are/signals/entities/AreRoute.signal';

jest.retryTimes(0);


describe('AreSignal', () => {
    it('Should be an instance of A_Signal', () => {
        const signal = new AreSignal({ data: {} });
        expect(signal).toBeInstanceOf(A_Signal);
    });
});


describe('AreInit', () => {
    it('Should be an instance of AreSignal', () => {
        const signal = new AreInit({ data: {} });
        expect(signal).toBeInstanceOf(AreSignal);
    });

    it('Should be an instance of A_Signal', () => {
        const signal = new AreInit({ data: {} });
        expect(signal).toBeInstanceOf(A_Signal);
    });

    it('AreInit.default() should return an AreInit instance', () => {
        const signal = AreInit.default();
        expect(signal).toBeInstanceOf(AreInit);
    });

    it('AreInit.default() should have ready: false', () => {
        const signal = AreInit.default()!;
        expect(signal.data).toHaveProperty('ready', false);
    });
});


describe('AreRoute', () => {
    it('Should be an instance of AreSignal', () => {
        const signal = new AreRoute('/test');
        expect(signal).toBeInstanceOf(AreSignal);
    });

    it('Should be an instance of A_Signal', () => {
        const signal = new AreRoute('/test');
        expect(signal).toBeInstanceOf(A_Signal);
    });

    it('Should expose the route path via .route', () => {
        const signal = new AreRoute('/home');
        expect(signal.route).toBeDefined();
    });
});
