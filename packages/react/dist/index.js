import * as React from 'react';
import { extensionStore } from '@imeredith/es-extensions-api';
export class RenderExtensions extends React.Component {
    render() {
        return extensionStore
            .get(this.props.extensionPointId)
            .map((extension, index) => React.createElement("div", { key: index.toString(), ref: container => container && extension(Object.assign({}, this.props.context, { container })), className: "extension" }));
    }
}
