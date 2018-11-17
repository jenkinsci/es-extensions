import { createExtensionPoint } from './index';
const ExtensionPoint = createExtensionPoint<number>('test');
test('functions thow exceptions when extension store not installed', () => {
    expect(() => ExtensionPoint.register(5)).toThrow('window.extensionStore has not been initialized yet.');
});
