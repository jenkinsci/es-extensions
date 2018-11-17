export interface IExtensionStore {
    register<T>(extension: IExtension<T>): IExtension<T>;

    get<T>(extensionOrId: IExtensionPointId | ExtensionPoint<T>): T[];

    subscribe<T>(
        extension: IExtensionPointId | ExtensionPoint<T>,
        callback: (extensions: T[]) => void
    ): IStoreSubscription;
}

export interface IStoreSubscription {
    unsubscribe(): void;
}

export interface IExtensionPointId {
    extensionPointId: string;
}

export class ExtensionPoint<T> implements IExtensionPointId {
    readonly extensionPointId: string;

    constructor(extensionPointId: string) {
        this.extensionPointId = extensionPointId;
    }
    register(extension: T): IExtension<T> {
        const ext: IExtension<T> = {
            extension,
            extensionPointId: this.extensionPointId
        };
        return this._getStore().register(ext);
    }

    get(): T[] {
        return this._getStore().get(this);
    }

    subscribe(callback: (extensions: T[]) => void): IStoreSubscription {
        return this._getStore().subscribe(this, callback);
    }

    _getStore() {
        const extensionStore: IExtensionStore | undefined = window.extensionStore;
        if (!extensionStore) {
            throw 'window.extensionStore has not been initialized yet.';
        }
        return extensionStore;
    }
}
export interface IExtension<T> extends IExtensionPointId {
    extension: T;
}
