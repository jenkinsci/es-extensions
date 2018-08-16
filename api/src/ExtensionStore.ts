import { Extension } from './Extension'

declare global {
    interface Window {
        extensionStore: ExtensionStore
    }
}
interface ExtensionMap {
    [key: string]: Extension<any, any>[]
}

export class ExtensionStore {
    private extensions: ExtensionMap = {}

    register<A, B>(extensionPointId: string, extension: Extension<A, B>) {
        const extensions = this.extensions[extensionPointId] || []
        extensions.push(extension);
        this.extensions[extensionPointId] = extensions;
    }

    getExtensions<A = any, B = any>(extensionPointId: string): Extension<A,B>[] {
        return (this.extensions[extensionPointId] || []) as any as Extension<A,B>[];
    }

    static getInstance() {
        if(!window.extensionStore) {
            window.extensionStore = new ExtensionStore();
        }

        return window.extensionStore;
    }
}