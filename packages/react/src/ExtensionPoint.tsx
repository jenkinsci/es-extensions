import * as React from 'react';
import { get as getExtensions, subscribe, IStoreSubscription } from '@jenkins-cd/es-extensions';

interface Props {
    extensionPointId: string;
    context?: any;
    containerClassName?: string;
    keyPrefix?: string;
}

interface State {
    extensions: Function[];
}

const ExtensionsContainer: React.SFC<Props> = props => (
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
export class ExtensionPoint extends React.Component<Props, State> {
    private subscription: IStoreSubscription | undefined;
    constructor(props: Props) {
        super(props);
        this.state = { extensions: getExtensions(this.props.extensionPointId) };
    }

    componentDidMount() {
        this.subscription = subscribe(this.props.extensionPointId, (extensions: Function[]) =>
            this.setState({ extensions })
        );
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
}
