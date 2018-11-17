import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ReactExtensionPoint, RenderContext } from './ExtensionPoint';
import { ExtensionPoint } from '@jenkins-cd/es-extensions';
import 'jest-enzyme';

const HelloWorldExtensionPoint: ReactExtensionPoint = new ReactExtensionPoint('hello.world');

test('extension renders', () => {
    const HelloComponent = (props: { name: string }) => <div>Hello {props.name}</div>;

    // Register first "Hello world" extension
    HelloWorldExtensionPoint.register(({ container }) => {
        ReactDOM.render(<HelloComponent name="world" />, container);
    });

    // Mount the Extension renderer (vs shallow) so that we can test rerendering when new plugins are added.
    const wrapper = mount(<HelloWorldExtensionPoint.Component />);
    expect(wrapper).toHaveText('Hello world');

    HelloWorldExtensionPoint.register(({ container }) => {
        ReactDOM.render(<HelloComponent name="test" />, container);
    });

    // Force a "rerender". This is should NOT be needed, however there is a bug in enzyme which makes it not handle ref
    // callback functions correctly.
    wrapper.update();

    expect(wrapper.find('div').at(1)).toHaveText('Hello world');
    expect(wrapper.find('div').at(2)).toHaveText('Hello test');
});

test('default component renders', () => {
    const TestExtensionPoint = new ReactExtensionPoint('default.test');
    const wrapper = mount(
        <TestExtensionPoint.Component context={{}}>
            <hr className="hr_test" />
        </TestExtensionPoint.Component>
    );
    expect(wrapper.find('.hr_test')).toHaveLength(1);
});
