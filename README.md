# vue-viewport-checker
A Vue mixin to determine if the component currently is in, above or below the viewport using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

## Installation

```bash
$ yarn add vue-viewport-checker , or npm install vue-viewport-checker
```
## Usage

Import the package in your .vue component and add it to mixins

```js

import viewportChecker from 'vue-viewport-checker';

export default {
  // ...
  mixins: [viewportChecker],
  // ...
}
```

## Data provided by mixin

```js
computed: {
  isInViewport: Boolean
},
data: {
  viewportOffsetState: {
    in: Boolean
    above: Boolean
    below: Boolean
  }
}
```

## Props

The following props can be overruled to adjust the viewport checker settings


### viewportCheckerMargin

- type: Number, String
- default: '0px 0px -1px 0px'
- required: false

Example

```html
<your-component-name :viewport-checker-margin="'-25% 0%'" />
```

### viewportCheckerRoot

- type: String, Function, Object
- default: null (document viewport)
- required: false

Example

```html
<your-component-name :viewport-checker-root="'.your-custom-scrolling-element'" />
```

