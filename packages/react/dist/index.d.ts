import * as React from 'react';
interface Props {
    extensionPointId: string;
    context?: any;
    containerClassName?: string;
    keyPrefix?: string;
}
export declare class RenderExtensions extends React.Component<Props> {
    render(): JSX.Element | JSX.Element[];
}
export {};
