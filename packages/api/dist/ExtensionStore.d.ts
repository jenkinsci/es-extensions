import { Subscription } from './types';
export declare class ExtensionStore {
    private extensions;
    private subscriptions;
    register(extensionPointId: string, extension: Function): void;
    getExtensions<A = any, B = any>(extensionPointId: string): Function[];
    static getInstance(): ExtensionStore;
    subscribe(extensionPointId: string, callback: Function): Subscription;
    private notify(extensionPointId);
    unsubscribe(extensionPointId: string, callback: Function): void;
}
