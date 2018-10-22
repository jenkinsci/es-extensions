import * as React from 'react';
import { mount } from 'enzyme';
import { JSDOM } from 'jsdom';
import store from '@jenkins-cd/es-extensions';
import { InjectExtensions } from './InjectExtensions'
import 'jest-enzyme';

const dom = new JSDOM('');

declare module NodeJS  {
    interface Global {
        window: Window
    }
}
window = dom.window;
interface Props {
    extensions: { [key: string]: Function[] }
}
const Comp = InjectExtensions('data.sum')(
    class Comp extends React.Component<Props>{
        render() {
            const sum = this.props.extensions["data.sum"].reduce((a,b)=>a+b().data,0);
            return <div>{sum}</div>
        }
    }
)
test('', () => {
    store.register('data.sum', () => {return { data: 2}})
    const wrapper = mount(<Comp />)
    expect(wrapper).toHaveText("2");
    
    store.register('data.sum', () => {return { data: 4}})
    expect(wrapper).toHaveText("6");
   
    store.register('data.sum', () => {return { data: 6}})
    store.register('data.sum', () => {return { data: 8}})
    expect(wrapper).toHaveText("20");
})