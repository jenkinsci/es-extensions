import * as React from 'react';
import { IStoreSubscription, ExtensionPoint, IRenderParameter, RenderExtension } from '@jenkins-cd/es-extensions';
interface Props<Params> {
    extensionPoint: ExtensionPoint<RenderExtension<Params>>;
    params: Params;
    containerClassName?: string;
    keyPrefix?: string;
    children?: React.ReactNode;
}

interface State<T> {
    extensions: T[];
}

class ExtensionsContainer<Params> extends React.Component<Props<Params>> {
    render() {
        return (
            <div className={`extension_container ${this.props.containerClassName || ''}`.trim()}>
                {this.props.children}
            </div>
        );
    }
}

class Container<Params> extends React.Component<{ params: Params; extension: RenderExtension<Params> }> {
    render() {
        const ref = (container: HTMLDivElement) => {
            const p = { ...this.props.params, container };
            if (container) {
                this.props.extension(p);
            }
        };

        return <div ref={ref} />;
    }
}

export class ReactExtensionPoint<T> extends React.Component<Props<T>, State<RenderExtension<T>>> {
    subscription: IStoreSubscription | undefined;

    constructor(props: Props<T>) {
        super(props);
        this.state = { extensions: this.props.extensionPoint.get() };
    }

    componentDidMount() {
        this.subscription = this.props.extensionPoint.subscribe(extensions => this.setState({ extensions }));
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    render() {
        const exts = this.state.extensions;

        if (!exts || exts.length === 0) {
            return <ExtensionsContainer {...this.props}>{this.props.children}</ExtensionsContainer>;
        }
        return (
            <ExtensionsContainer {...this.props}>
                {exts.map((extension, index) => {
                    return (
                        <Container<T>
                            key={`${this.props.keyPrefix || 'key-'}${index}`}
                            extension={extension}
                            params={this.props.params}
                        />
                    );
                })}
            </ExtensionsContainer>
        );
    }
}
