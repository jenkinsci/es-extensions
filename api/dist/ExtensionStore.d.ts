import { Extension } from './Extension';
declare global  {
    interface Window {
        extensionStore: ExtensionStore;
    }
}
export declare class ExtensionStore {
    private extensions;
    register<A, B>(extensionPointId: string, extension: Extension<A, B>): void;
    getExtensions<A = any, B = any>(extensionPointId: string): Extension<A, B>[];
    static getInstance(): ExtensionStore;
}
