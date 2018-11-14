import { IExtensionStore, IStoreSubscription} from './types'

declare global {
    interface Window {
        extensionStore: IExtensionStore;
    }
}

function getStore() {
    const store: IExtensionStore | undefined = window && window.extensionStore
    if(!store) {
        throw 'window.extensionStore has not been initialized yet.'
    }
    return window.extensionStore;
}

function register(extensionPointId: string, extension: Function): void {
    getStore().register(extensionPointId, extension);
}
function get(extensionPointId: string): Function[] {
    return getStore().get(extensionPointId);
}
function subscribe(extensionPointId: string, callback: Function): IStoreSubscription {
    return getStore().subscribe(extensionPointId, callback)
}

export { register, get, subscribe, IExtensionStore, IStoreSubscription };