import { ExtensionStore } from './ExtensionStore';

export { ExtensionStore };
export const register = ExtensionStore.register;
export const subscribe = ExtensionStore.subscribe;
export const unsubscribe = ExtensionStore.unsubscribe;
export const getExtensions = ExtensionStore.getExtensions;

export { Subscription } from './types';

declare global {
    interface Window {
        extensionStore: ExtensionStore;
    }
}
