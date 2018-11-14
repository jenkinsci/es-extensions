import { ExtensionStore } from './ExtensionStore';

function sum(context: {a: number, b: number}) {
    return context.a + context.b;
}

test('Extension Store registers and fetches an extension', () => {
    const store = new ExtensionStore();

    store.register('test', sum);
    const testExtensions = store.get('test');
    expect(testExtensions).toHaveLength(1);
    expect(testExtensions[0]({a:1, b:2})).toEqual(3);
})

test('Extension Store notifies when registering', () => {
    const store = new ExtensionStore();
    let counter = 0;

    const sub = store.subscribe('test', () => counter++);

    expect(counter).toBe(0);
    store.register('test', sum);
    expect(counter).toBe(1);
    sub.unsubscribe();
    store.register('test', sum);
    expect(counter).toBe(1); 
})