import * as React from 'react';
import { extensionStore, RenderContext } from '@imeredith/es-extensions-api';

interface Props {
    extensionPointId: string
    context: any
}
export class RenderExtensions extends React.Component<Props> {
    render() {
        return extensionStore
            .get(this.props.extensionPointId)
            .map((extension: any, index: number) => 
                <div key={index.toString()} 
                    ref={container => container && extension({...this.props.context, container})}
                    className="extension" />)
    }
}