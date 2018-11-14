export interface IExtensionStore {
    register(extensionPointId: string, extension: Function): void
    get(extensionPointId: string): Function[]
    subscribe(extensionPointId: string, callback: Function): IStoreSubscription
}

export interface IStoreSubscription {
    unsubscribe(): void
}