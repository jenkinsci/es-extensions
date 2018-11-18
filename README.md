# ES Extensions

> This repository provides a collection of packages to aid with runtime ES5+ extensibility.

-   [Usage](#usage)
    -   [Installation](#installation)
-   [Define](#defin)
    -   [Project Structre](#project-structre)
    -   [Building](#building)
    -   [Test](#test)
    -   [Meta](#meta)

# Usage

The recommended way to use this library is in conjunction with React. However es-extensions is compatable with any es5+.

```sh
npm install -S @jenkins-cd/es-extensions-react15.4
```

ES extensions provides a function to define extension points for react.

```typescript tsx
import { createReactExtensionPoint } from '@jenkins-cd/es-extensions-react15.4';

interface Context {
    enviornment: 'dev' | 'prod';
}
export const ExampleExtensionPoint = createReactExtensionPoint<Context>('example');
```

```tsx
render() {
    return <ExampleExtensionPoint.Component context={environment: 'dev'}>
}

```

## Installation

`npm install --save @jenkins-cd/es-extensions`

# Defin

## Project Structre

-   `/packages/`
    -   `store` - Extension store implementation that allows extensions to be registered and looked up.
    -   `react` - Tools to help with rendering react extensions. Only needed for extenion points.

## Building

This repository is managed with [lerna](https://github.com/lerna/lerna). To build:

```sh
npm install
npm run bootstrap
```

## Test

```sh
npm test
```

## Meta

Distributed under the MIT license. See `LICENSE` for more information.
