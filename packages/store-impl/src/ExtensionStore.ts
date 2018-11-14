import { IExtensionStore, IStoreSubscription } from '@jenkins-cd/es-extensions';

export class ExtensionStore implements IExtensionStore{
    private extensions: Record<string, any[]> = {}
    private subscriptions: Record<string, Function[]>   = {};

    register<T>(extensionPointId: string, extension: T) {
        const extensions = this.extensions[extensionPointId] || []
        extensions.push(extension as any);
        this.extensions[extensionPointId] = extensions;
        this.notify(extensionPointId)
    }


    get<T>(extensionPointId: string): T[] {
        return this.extensions[extensionPointId] || [];
    }
   
    subscribe(extensionPointId: string, callback: Function): IStoreSubscription {
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
            cb(this.get(extensionPointId));
        })
    }

    unsubscribe(extensionPointId: string, callback: Function) {
        const subscriptions = this.subscriptions[extensionPointId] || [];
        this.subscriptions[extensionPointId] = subscriptions.filter(cb => cb != callback)  
    }
}