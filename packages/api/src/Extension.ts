export type RenderContext = { container: HTMLDivElement }
export type Extension<A = {}, B = {}> = (context: A) => B
export type RenderExtension<A = {}, B={}> = Extension<A & RenderContext, B>