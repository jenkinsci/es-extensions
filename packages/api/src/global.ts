import { ExtensionStore } from './ExtensionStore';


declare global {
    interface Window {
        extensionStore: ExtensionStore
    }
}
