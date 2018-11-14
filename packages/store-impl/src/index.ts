import { ExtensionStore } from './ExtensionStore';

export function install() {
    window.extensionStore = new ExtensionStore();
}