<div align="center">
<h1 align="center"> ⭕ json-sizeof ⭕</h1>

<p>
  <a href="https://github.com/a179346/json-sizeof/actions/workflows/test.yml" target="_blank">
    <img alt="Documentation" src="https://github.com/a179346/json-sizeof/actions/workflows/test.yml/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/json-sizeof" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/npm/v/json-sizeof?maxAge=3600)" />
  </a>
  <a href="https://github.com/a179346/json-sizeof#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/a179346/json-sizeof/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/a179346/json-sizeof/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/a179346/json-sizeof" />
  </a>
</p>
</div>


> Get the byte size of an object after JSON.stringify

## 📩 Installation
```
npm i json-sizeof
```

## 🔗 Links
[npm package](https://www.npmjs.com/package/json-sizeof)
<br>
[Github page](https://github.com/a179346/json-sizeof)

## 📋 Usage
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

## 📌 Why
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
