# json-size
Get the byte size of an object after JSON.stringify

## Installation
```js
npm i json-size
```

## Usage
#### Example
```js
const jsonSize = require('json-size');

const obj = {
  str1: 'I am a string!',
  obj1: {
    str2: 456,
    obj2: null,
    obj3: undefined
  },
};

console.log(jsonSize(obj));
// expected 57
```

## Why
json-size(obj) equals to Buffer.byteLength(JSON.stringify(obj)).
<br>
but is faster and less likely to cause heap out of memory