# json-sizeof [![Build Status](https://travis-ci.org/a179346/json-sizeof.svg?branch=main)](https://travis-ci.org/github/a179346/json-sizeof)
> Get the byte size of an object after JSON.stringify

## Installation
```
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

const bytes = jsonSizeOf(obj);
// expected 57
```

## Why
jsonSizeOf(obj) equals to Buffer.byteLength(JSON.stringify(obj)).
<br>
but is **faster** and **less likely to cause "Javascript heap out of memory"**
```js
const obj = {};
for (let i = 0;i < 8000000;i++) {
  obj['test' + i] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
}

// expected: 342888891
jsonSizeOf(obj);

// The following line will cause "JavaScript heap out of memory" fatal error
// if you do not maually increase the memory usage of node app.
Buffer.byteLength(JSON.stringify(obj));
```
