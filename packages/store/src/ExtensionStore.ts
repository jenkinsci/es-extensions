import { ExtensionMap, SubscriptionMap, Subscription } from './types';

export class ExtensionStore {
    private extensions: ExtensionMap = {}
    private subscriptions: SubscriptionMap  = {};

    register(extensionPointId: string, extension: Function) {
        const extensions = this.extensions[extensionPointId] || []
        extensions.push(extension);
        this.extensions[extensionPointId] = extensions;
        this.notify(extensionPointId)
    }

    getExtensions(extensionPointId: string): Function[] {
        return this.extensions[extensionPointId] || [];
    }
   
    static getInstance() {
        if(!window.extensionStore) {
            window.extensionStore = new ExtensionStore();
        }

        return window.extensionStore;
    }

    subscribe(extensionPointId: string, callback: Function): Subscription {
        const subscriptions = this.subscriptions[extensionPointId] || []
        subscriptions.push(callback);
        this.subscriptions[extensionPointId] = subscriptions;
        return {
            unsubscribe: () => this.unsubscribe(extensionPointId, callback)
        }
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

}