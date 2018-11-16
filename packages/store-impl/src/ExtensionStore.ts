import { IExtensionStore, IStoreSubscription, IExtension } from '@jenkins-cd/es-extensions';

export class ExtensionStore implements IExtensionStore {
    private extensions: Record<string, any[]> = {};
    private subscriptions: Record<string, Function[]> = {};

    register<T>(extension: IExtension<T>): void;
    register<T>(extensionPointId: string, extension: T): void;
    register<T>(extensionOrId: string | IExtension<T>, extension?: T): void {
        const extensionPointId = typeof extensionOrId === 'string' ? extensionOrId : extensionOrId.extensionPointId;
        const ext: any = typeof extensionOrId === 'string' ? extension : extensionOrId.extension;
        const extensions = this.extensions[extensionPointId] || [];
        extensions.push(ext);
        this.extensions[extensionPointId] = extensions;
        this.notify(extensionPointId);
    }

    get<T>(extension: IExtension<T>): T[];
    get<T>(extensionPointId: string): T[];
    get<T>(extensionOrId: string | IExtension<T>): T[] {
        const extensionPointId = typeof extensionOrId === 'string' ? extensionOrId : extensionOrId.extensionPointId;
        return this.extensions[extensionPointId] || [];
    }

    subscribe<T>(extension: IExtension<T>, callback: Function): IStoreSubscription;
    subscribe(extensionPointId: string, callback: Function): IStoreSubscription;
    subscribe<T>(extensionOrId: string | IExtension<T>, callback: Function): IStoreSubscription {
        const extensionPointId = typeof extensionOrId === 'string' ? extensionOrId : extensionOrId.extensionPointId;
        const subscriptions = this.subscriptions[extensionPointId] || [];
        subscriptions.push(callback);
        this.subscriptions[extensionPointId] = subscriptions;
        return {
            unsubscribe: () => this.unsubscribe(extensionPointId, callback)
        };
    }

    private notify(extensionPointId: string) {
        const subs = this.subscriptions[extensionPointId] || [];
        subs.forEach(cb => {
            cb(this.get(extensionPointId));
        });
    }

    unsubscribe(extensionPointId: string, callback: Function) {
        const subscriptions = this.subscriptions[extensionPointId] || [];
        this.subscriptions[extensionPointId] = subscriptions.filter(cb => cb != callback);
    }
}
