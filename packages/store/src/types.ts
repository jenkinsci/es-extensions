export interface IExtensionStore {
    register<T>(extensionPointId: string, extension: T): void
    get<T>(extensionPointId: string): T[]
    subscribe(extensionPointId: string, callback: Function): IStoreSubscription
}

export interface IStoreSubscription {
    unsubscribe(): void
}