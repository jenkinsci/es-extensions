import {
    IExtensionStore,
    IStoreSubscription,
    IExtension,
    ExtensionPoint,
    IExtensionPointId
} from '@jenkins-cd/es-extensions';

export class ExtensionStore implements IExtensionStore {
    private extensions: Record<string, any[]> = {};
    private subscriptions: Record<string, Function[]> = {};

    register<T>(extension: IExtension<T>): IExtension<T> {
        const extensions = this.extensions[extension.extensionPointId] || [];
        extensions.push(extension.extension);
        this.extensions[extension.extensionPointId] = extensions;
        this.notify(extension.extensionPointId);
        return extension;
    }

    get<T>(extensionPoint: IExtensionPointId | ExtensionPoint<T>): T[] {
        return this.extensions[extensionPoint.extensionPointId] || [];
    }

    subscribe<T>(
        extensionPoint: IExtensionPointId | ExtensionPoint<T>,
        callback: (extensions: T[]) => void
    ): IStoreSubscription {
        const subscriptions = this.subscriptions[extensionPoint.extensionPointId] || [];
        subscriptions.push(callback);
        this.subscriptions[extensionPoint.extensionPointId] = subscriptions;
        return {
            unsubscribe: () => this.unsubscribe(extensionPoint.extensionPointId, callback)
        };
    }

    private notify(extensionPointId: string) {
        const subs = this.subscriptions[extensionPointId] || [];
        subs.forEach(cb => {
            cb(this.get({ extensionPointId }));
        });
    }

    unsubscribe(extensionPointId: string, callback: Function) {
        const subscriptions = this.subscriptions[extensionPointId] || [];
        this.subscriptions[extensionPointId] = subscriptions.filter(cb => cb !== callback);
    }
}
