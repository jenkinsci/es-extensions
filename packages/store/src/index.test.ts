import { register, get, subscribe } from './index';
test('functions thow exceptions when extension store not installed', () => {
    expect(() => register('test', () => 5)).toThrow('window.extensionStore has not been initialized yet.')
})