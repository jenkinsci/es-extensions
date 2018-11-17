import * as React from 'react';
import { IStoreSubscription, ExtensionPoint } from '@jenkins-cd/es-extensions';
import { create } from 'domain';

export interface RenderContext {
    container: HTMLDivElement;
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

interface Props<Context> {
    context?: Context;
    containerClassName?: string;
    keyPrefix?: string;
}

interface State<T> {
    extensions: T[];
}

const ExtensionsContainer: React.SFC<Props<any>> = props => (
    <div className={`extension_container ${props.containerClassName || ''}`.trim()}>{props.children}</div>
);

const Container: React.SFC<{ context?: any; extension: Function }> = props => {
    const ref = (container: HTMLDivElement) => {
        if (container) {
            props.extension({ ...props.context, container });
        }
    };

    return <div ref={ref} />;
};

export function createReactExtensionPoint<T>(extensionPointId: string) {
    return new ReactExtensionPoint<T>(extensionPointId);
}
export class ReactExtensionPoint<T = {}> extends ExtensionPoint<(t: RenderContext & T) => void> {
    constructor(extensionPointId: string) {
        super(extensionPointId);
        this.Component = createComponent(this);
    }

    readonly Component: React.ComponentType<Props<T>>;
}

function createComponent<T>(
    extensionPoint: ExtensionPoint<(t: RenderContext & T) => void>
): React.ComponentType<Props<T>> {
    return (class extends React.Component<Props<T>, State<(t: RenderContext & T) => void>> {
        subscription: IStoreSubscription | undefined;

        constructor(props: Props<T>) {
            super(props);
            this.state = { extensions: extensionPoint.get() };
        }

        componentDidMount() {
            this.subscription = extensionPoint.subscribe(extensions => this.setState({ extensions }));
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
                    {exts.map((extension: any, index: number) => {
                        return (
                            <Container
                                key={`${this.props.keyPrefix || 'key-'}${index}`}
                                extension={extension}
                                context={this.props.context}
                            />
                        );
                    })}
                </ExtensionsContainer>
            );
        }
    } as any) as React.ComponentType<Props<T>>;
}
