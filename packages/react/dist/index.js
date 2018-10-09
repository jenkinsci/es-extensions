import * as React from 'react';
import { ExtensionStore } from '@imeredith/es-extensions-api';
export class RenderExtensions extends React.Component {
    render() {
        return ExtensionStore
            .getExtensions(this.props.extensionPointId)
            .map((extension, index) => React.createElement("div", { key: `${this.props.keyPrefix}${index.toString()}`, ref: container => container && extension(Object.assign({}, this.props.context, { container })), className: this.props.containerClassName }));
    }
}
