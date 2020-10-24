# json-sizeof
Get the byte size of an object after JSON.stringify

## Installation
```js
npm i json-sizeof
```

## Links
[npm package](https://www.npmjs.com/package/json-sizeof)
<br>
[Github page](https://github.com/a179346/json-sizeof)

## Usage
#### Example
```js
const jsonSizeOf = require('json-sizeof');

const obj = {
  str1: 'I am a string!',
  obj1: {
    str2: 456,
    obj2: null,
    obj3: undefined
  },
};

console.log(jsonSizeOf(obj));
// expected 57
```

## Why
jsonSizeOf(obj) equals to Buffer.byteLength(JSON.stringify(obj)).
<br>
but is faster and less likely to cause heap out of memory