export interface IExtensionStore {
    register<T>(extension: IExtension<T>): void;
    register<T>(extensionPointId: string, extension: T): void;
    register<T>(extensionOrId: string | IExtension<T>, extension?: T): void;

    get<T>(extension: IExtension<T>): T[];
    get<T>(extensionPointId: string): T[];
    get<T>(extensionOrId: string | IExtension<T>): T[];

    subscribe<T>(extension: IExtension<T>, callback: Function): IStoreSubscription;
    subscribe(extensionPointId: string, callback: Function): IStoreSubscription;
    subscribe<T>(extensionOrId: string | IExtension<T>, callback: Function): IStoreSubscription;
}

export interface IStoreSubscription {
    unsubscribe(): void;
}

export interface IExtension<T, S = string> {
    extensionPointId: S;
    extension: T;
}
