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

function register<T>(extensionPointId: string, extension: T): void {
    getStore().register(extensionPointId, extension);
}
function get<T>(extensionPointId: string): T[] {
    return getStore().get(extensionPointId);
}
function subscribe(extensionPointId: string, callback: Function): IStoreSubscription {
    return getStore().subscribe(extensionPointId, callback)
}

export { register, get, subscribe, IExtensionStore, IStoreSubscription };