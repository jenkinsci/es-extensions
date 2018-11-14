const { JSDOM }  = require('jsdom');
const { ExtensionStore } = require('@jenkins-cd/es-extensions');

const dom = new JSDOM('');
global.window = dom.window;

window.extensionStore = new ExtensionStore();