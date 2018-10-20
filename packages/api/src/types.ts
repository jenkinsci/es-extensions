export interface ExtensionMap {
    [key: string]: Function[]
}

export interface SubscriptionMap {
    [key: string]: Function[]
}

export interface Subscription {
    unsubscribe(): void
}