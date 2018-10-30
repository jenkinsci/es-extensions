# ES Extensions
> This repository provides a collection of packages to aid with runtime ES5+ extensibility.

## Project Structure

* `/packages/`
  * `store` - Extension store implementation that allows extensions to be registered and looked up.
  * `react` - Tools to help with rendering react extensions. Only needed for extenion points.

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

##Meta
Distributed under the MIT license. See ``LICENSE`` for more information.
