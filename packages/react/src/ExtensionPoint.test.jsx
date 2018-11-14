import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ExtensionPoint } from './ExtensionPoint';
import { register } from '@jenkins-cd/es-extensions';

test('extension renders', () => {
    const HelloComponent = (props) => <div>Hello {props.name}</div>;

    // Register first "Hello world" extension
    register("hello.world", ({container}) => {
        ReactDOM.render(<HelloComponent name="world"/>, container);
    });

    // Mount the Extension renderer (vs shallow) so that we can test rerendering when new plugins are added.
    const wrapper = mount(<ExtensionPoint extensionPointId="hello.world"/>);

    expect(wrapper).toHaveText('Hello world');

    register("hello.world", ({container}) => {
        ReactDOM.render(<HelloComponent name="test"/>, container);
    });

    // Force a "rerender". This is should NOT be needed, however there is a bug in enzyme which makes it not handle ref
    // callback functions correctly.
    wrapper.update();

    expect(wrapper.find("div").at(1)).toHaveText('Hello world');
    expect(wrapper.find("div").at(2)).toHaveText('Hello test');
})

test('default component renders',() => {
    const wrapper = mount(<ExtensionPoint extensionPointId="default.test"><hr className="hr_test"/></ExtensionPoint>);
    expect(wrapper.find('.hr_test')).toHaveLength(1);
})