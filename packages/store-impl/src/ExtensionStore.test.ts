import { ExtensionStore } from './ExtensionStore';
import { createExtensionPoint } from '@jenkins-cd/es-extensions';

const SumExtensionPoint = createExtensionPoint<(a: number, b: number) => number>('sum');
window.extensionStore = new ExtensionStore();

test('Extension Store registers and fetches an extension', () => {
    SumExtensionPoint.register((a, b) => a + b);

    const testExtensions = SumExtensionPoint.get();

    expect(testExtensions).toHaveLength(1);
    expect(testExtensions[0](1, 2)).toEqual(3);
});

test('Extension Store notifies when registering', () => {
    let counter = 0;

    const sub = SumExtensionPoint.subscribe(() => counter++);
    expect(counter).toBe(0);
    window.extensionStore.register({ extensionPointId: 'sum', extension: (a: number, b: number) => a + b });
    expect(counter).toBe(1);
    sub.unsubscribe();
    SumExtensionPoint.register((a, b) => a + b);
    expect(counter).toBe(1);
});
