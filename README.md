# ES Extensions API
> Provides an extension API for es5+ applications based on Jenkins [JEP-204](https://github.com/jenkinsci/jep/tree/master/jep/204)

[![npm version](https://badge.fury.io/js/%40imeredith%2Fes-extensions-api.svg)](https://badge.fury.io/js/%40imeredith%2Fes-extensions-api)

## Installation

```sh
npm i -S @imeredith/es-extensions-api
```


## Usage example
Extensions are just functions that take some context as a parameter, and do something. It is totally up to the application that wants to use extensions implemented by plugins to define the contract for the plugins to implement.


### Example extension

* Extension Point identifier - 'example.ext'
* Extension Context
  * container - Html Div element to render into.
  * name - Name to render

#### Example Extesnion Impl
```javascript
import { ExtensionStore } from '@imeredith/es-extensions-api';

ExtensionStore.register('example.ext', function (context) {
    context.container.innerHTML = '<h1> Hello ' + context.name + '</h1>';
})
```

#### Example Extension Usage 
```javascript
import { ExtensionStore } from '@imeredith/es-extensions-api';

const container = document.getElementbyId('ext_container');

const extension = ExtensionStore.getExtensions('example.ext')[0]
if(extension) {
    extension({container, name: 'World!'})
}
```

## Development setup

```sh
npm i
```

## Release History

* 0.0.3
    * Work in progress

## Meta

Distributed under the MIT license. See ``LICENSE`` for more information.
