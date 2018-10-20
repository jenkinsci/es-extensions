import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Extension } from './Extension';
import { JSDOM } from 'jsdom';
import store from '@imeredith/es-extensions-api';

const dom = new JSDOM('');
global.window = dom.window;

test('extension renders', () => {
    const HelloComponent = (props) => <div>Hello {props.name}</div>;

    // Register first "Hello world" extension
    store.register("hello.world", ({container}) => {
        ReactDOM.render(<HelloComponent name="world"/>, container);
    });

    // Mount the Extension renderer (vs shallow) so that we can test rerendering when new plugins are added.
    const wrapper = mount(<Extension extensionPointId="hello.world"/>, { attachTo: dom.window.document.body });

    expect(wrapper).toHaveText('Hello world');

    store.register("hello.world", ({container}) => {
        ReactDOM.render(<HelloComponent name="test"/>, container);
    });

    // Force a "rerender". This is should NOT be needed, however there is a bug in enzyme which makes it not handle ref
    // callback functions correctly.
    wrapper.update();

    expect(wrapper.find("div").at(1)).toHaveText('Hello world');
    expect(wrapper.find("div").at(2)).toHaveText('Hello test');
})