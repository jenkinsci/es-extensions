import * as React from 'react';
import { Subscription } from '@jenkins-cd/es-extensions';

interface InjectedProps {
    extensions: { [key: string]: Function[] }
}
interface State {
    extensions: { [key: string]: Function[] }
}

export function InjectExtensions<Props>(extensionPointId: string, ...extensionPointIds: string[]) {
    return function(WrappedComponent: React.ComponentType<InjectedProps & Props>) {
        return class extends React.Component<Props, State> {
            subscriptions: Subscription[];
            constructor(props: Props) {
                super(props);
                this.subscriptions = [];
                const extensions: { [key: string]: Function[] } = {};
                extensions[extensionPointId] = [];
                extensionPointIds.forEach(id => extensions[id] = []);
                this.state = { extensions }
            }
        
            componentDidMount() {
                const store = window.extensionStore;
                const extensions: { [key: string]: Function[] } = {};
                extensions[extensionPointId] = store.getExtensions(extensionPointId);
                extensionPointIds.forEach(id => extensions[id] = store.getExtensions(id));
                this.setState({extensions});
                this.subscriptions = Object.keys(extensions).map(id => {
                    return store.subscribe(id, (e: Function[]) => this.setState(prev => { 
                        prev.extensions[id] = e
                        return prev;
                    }))
                })
            }
        
            componentWillUnmount() {
                this.subscriptions.forEach(sub => sub.unsubscribe());
            }
            render() {
                return <WrappedComponent extensions={this.state.extensions} {...this.props} />
            }
        }
    }
}