import {
    IExtensionStore,
    IStoreSubscription,
    IExtension,
    ExtensionPoint,
    IExtensionPointId,
    IRenderParameter
} from './types';

declare global {
    interface Window {
        extensionStore: IExtensionStore;
    }
}

export function createExtensionPoint<T>(extensionPointId: string) {
    return new ExtensionPoint<T>(extensionPointId);
}

export function createRenderExtensionPoint<Params>(extensionPointId: string) {
    return createExtensionPoint<RenderExtension<Params>>(extensionPointId);
}
export type RenderExtension<Params> = (params: Params & IRenderParameter) => void;
export type RenderExtensionPoint<Params> = ExtensionPoint<RenderExtension<Params>>;

export { IExtensionStore, IStoreSubscription, IExtension, ExtensionPoint, IExtensionPointId, IRenderParameter };
