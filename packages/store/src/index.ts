import { IExtensionStore, IStoreSubscription, IExtension, ExtensionPoint, IExtensionPointId } from './types';

declare global {
    interface Window {
        extensionStore: IExtensionStore;
    }
}

export function createExtensionPoint<T>(extensionPointId: string) {
    return new ExtensionPoint<T>(extensionPointId);
}
export { IExtensionStore, IStoreSubscription, IExtension, ExtensionPoint, IExtensionPointId };
