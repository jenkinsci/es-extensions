import { ExtensionMap, SubscriptionMap, Subscription } from './types';
function _getStore() {
    const store: ExtensionStore | undefined = window && window.extensionStore
    if(!store) {
        throw 'window.extensionStore has not been initialized yet.'
    }
    return window.extensionStore;
}
export class ExtensionStore {
    private extensions: ExtensionMap = {}
    private subscriptions: SubscriptionMap  = {};

    register(extensionPointId: string, extension: Function) {
        const extensions = this.extensions[extensionPointId] || []
        extensions.push(extension);
        this.extensions[extensionPointId] = extensions;
        this.notify(extensionPointId)
    }

    static register(extensionPointId: string, extension: Function) {
        _getStore().register(extensionPointId, extension)
    }

    getExtensions(extensionPointId: string): Function[] {
        return this.extensions[extensionPointId] || [];
    }
   
    static getExtensions(extensionPointId: string): Function[] {
        return _getStore().getExtensions(extensionPointId);
    }

    subscribe(extensionPointId: string, callback: Function): Subscription {
        const subscriptions = this.subscriptions[extensionPointId] || []
        subscriptions.push(callback);
        this.subscriptions[extensionPointId] = subscriptions;
        return {
            unsubscribe: () => this.unsubscribe(extensionPointId, callback)
        }
    } 

    static subscribe(extensionPointId: string, callback: Function): Subscription {
        return _getStore().subscribe(extensionPointId, callback)
    }

    private notify(extensionPointId: string) {
        const subs = this.subscriptions[extensionPointId] || [];
        subs.forEach((cb) => {
            cb(this.getExtensions(extensionPointId));
        })
    }

    unsubscribe(extensionPointId: string, callback: Function) {
        const subscriptions = this.subscriptions[extensionPointId] || [];
        this.subscriptions[extensionPointId] = subscriptions.filter(cb => cb != callback)  
    }

    static unsubscribe(extensionPointId: string, callback: Function) {
        _getStore().unsubscribe(extensionPointId, callback)
    }
}