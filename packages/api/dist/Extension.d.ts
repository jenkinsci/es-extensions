export declare type RenderContext = {
    container: HTMLDivElement;
};
export declare type Extension<A = {}, B = {}> = (context: A) => B;
export declare type RenderExtension<A = {}, B = {}> = Extension<A & RenderContext, B>;
