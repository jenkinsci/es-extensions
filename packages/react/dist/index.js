import * as React from 'react';
import { ExtensionStore } from '@imeredith/es-extensions-api';
export class RenderExtensions extends React.Component {
    render() {
        const exts = ExtensionStore.getExtensions(this.props.extensionPointId);
        if (!exts || exts.length == 0) {
            return React.createElement("div", { className: this.props.containerClassName }, this.props.children);
        }
        return exts.map((extension, index) => React.createElement("div", { key: `${this.props.keyPrefix}${index.toString()}`, ref: container => container && extension(Object.assign({}, this.props.context, { container })), className: this.props.containerClassName }));
    }
}
