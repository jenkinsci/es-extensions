import { ExtensionStore } from './ExtensionStore';
import { IExtension } from '@jenkins-cd/es-extensions';

interface SumExtensionPoint extends IExtension<(context: { a: number; b: number }) => number, 'sum'> {}
const SumExtension: SumExtensionPoint = {
    extensionPointId: 'sum',
    extension: (context: { a: number; b: number }) => {
        return context.a + context.b;
    }
};

test('Extension Store registers and fetches an extension', () => {
    const store = new ExtensionStore();

    store.register(SumExtension);
    const testExtensions = store.get(SumExtension);

    expect(testExtensions).toHaveLength(1);
    expect(testExtensions[0]({ a: 1, b: 2 })).toEqual(3);
});

test('Extension Store notifies when registering', () => {
    const store = new ExtensionStore();
    let counter = 0;

    const sub = store.subscribe(SumExtension, () => counter++);

    expect(counter).toBe(0);
    store.register(SumExtension);
    expect(counter).toBe(1);
    sub.unsubscribe();
    store.register(SumExtension);
    expect(counter).toBe(1);
});
