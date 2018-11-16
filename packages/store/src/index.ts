import { IExtensionStore, IStoreSubscription, IExtension } from './types';

declare global {
    interface Window {
        extensionStore: IExtensionStore;
    }
}

class StoreWrapper implements IExtensionStore {
    constructor() {
        this.register = this.register.bind(this);
        this.get = this.get.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    register<T>(extension: IExtension<T>): void;
    register<T>(extensionPointId: string, extension: T): void;
    register<T>(extensionOrId: string | IExtension<T>, extension?: T | undefined): void {
        this.getStore().register(extensionOrId, extension);
    }

    get<T>(extension: IExtension<T>): T[];
    get<T>(extensionPointId: string): T[];
    get<T>(extensionOrId: string | IExtension<T>): T[] {
        return this.getStore().get(extensionOrId);
    }
    subscribe<T>(extension: IExtension<T>, callback: Function): IStoreSubscription;
    subscribe(extensionPointId: string, callback: Function): IStoreSubscription;
    subscribe<T>(extensionOrId: string | IExtension<T>, callback: Function): IStoreSubscription {
        return this.getStore().subscribe(extensionOrId, callback);
    }

    getStore() {
        const store: IExtensionStore | undefined = window && window.extensionStore;
        if (!store) {
            throw 'window.extensionStore has not been initialized yet.';
        }
        return window.extensionStore;
    }
}
const wrapper = new StoreWrapper();
export const register = wrapper.register;
export const get = wrapper.get;
export const subscribe = wrapper.subscribe;
export { IExtensionStore, IStoreSubscription, IExtension };
