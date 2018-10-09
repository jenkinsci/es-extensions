import * as React from 'react';
import { ExtensionStore, RenderContext } from '@imeredith/es-extensions-api';

interface Props {
    extensionPointId: string
    context: any
    containerClassName: string
    keyPrefix: string
}
export class RenderExtensions extends React.Component<Props> {
    render() {
        return ExtensionStore
            .getExtensions(this.props.extensionPointId)
            .map((extension: any, index: number) => 
                <div key={`${this.props.keyPrefix}${index.toString()}`} 
                    ref={container => container && extension({...this.props.context, container})}
                    className={this.props.containerClassName} />)
    }
}