const { JSDOM } = require('jsdom');
const { install } = require('@jenkins-cd/es-extensions-store');

const dom = new JSDOM('');
global.window = dom.window;

install();
