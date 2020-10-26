const jsonSizeOf = require('../index.js');
const { expect } = require('chai');

function testEqual (obj) {
  expect(jsonSizeOf(obj)).to.equal(Buffer.byteLength(JSON.stringify(obj)));
}

function testError (obj, errorType) {
  expect(function () { jsonSizeOf(obj); }).to.throw(errorType);
}

describe('json-sizeof test', function () {
  it('input is null: must be equal', function () {
    const obj = null;
    testEqual(obj);
  });

  it('input is string: must be equal', function () {
    const obj = '"123astDG!@#@#$*&^UYTJH';
    testEqual(obj);
  });

  it('input is number: must be equal', function () {
    const obj = 1234560;
    testEqual(obj);
  });

  it('input is decimal: must be equal', function () {
    const obj = 123.4560;
    testEqual(obj);
  });

  it('input is true: must be equal', function () {
    const obj = true;
    testEqual(obj);
  });

  it('input is false: must be equal', function () {
    const obj = false;
    testEqual(obj);
  });

  it('input is Date: must be equal', function () {
    const obj = new Date();
    testEqual(obj);
  });

  it('input is function: must throw error', function () {
    const obj = function () {};
    testError(obj, TypeError);
  });

  it('input is arrow function: must throw error', function () {
    const obj = () => {};
    testError(obj, TypeError);
  });

  it('input is async function: must throw error', function () {
    const obj = async function () {};
    testError(obj, TypeError);
  });

  it('input is async arrow function: must throw error', function () {
    const obj = async () => {};
    testError(obj, TypeError);
  });

  it('input is undefined: must throw error', function () {
    const obj = undefined;
    testError(obj, TypeError);
  });

  it('input is cyclic obejct: must throw error', function () {
    const obj = {};
    obj.a = obj;
    testError(obj, TypeError);
  });

  it('input is cyclic array: must throw error', function () {
    const obj = [];
    obj[0] = obj;
    testError(obj, TypeError);
  });

  it('input object 1: must be equal', function () {
    const obj = { a:{}, b:null };
    testEqual(obj);
  });

  it('input object 2: must be equal', function () {
    const obj = {};
    testEqual(obj);
  });

  it('input object 3: must be equal', function () {
    const obj = [ 123456789, { a:123 } ];
    testEqual(obj);
  });

  it('input object 4: must be equal', function () {
    const obj = { log:{ a:123 }, b:undefined };
    testEqual(obj);
  });

  it('input object 5: must be equal', function () {
    const obj = { a:{ b:{ c:123, d:'str' }, e: true, f:false } };
    testEqual(obj);
  });

  it('input object 6: must be equal', function () {
    const obj = { a:[] };
    testEqual(obj);
  });

  it('input object 7: must be equal', function () {
    const obj = { a:'"' };
    testEqual(obj);
  });

  it('input object 8: must be equal', function () {
    const obj = { a:{ b:{ c:{ d:{ e:[ { f:{}, g:[ { i:'"', j:'', k:{ l:null, m:undefined }, n:{ o:[], p:{}, q:true, r:false, t:'"test"', u:new Date(), v:function () { return 0; }, w:() => { return 1; }, x:async function () { return 2; }, y:async () => { return 3; } } }, null, undefined ] }, 123 ] } } } } };
    testEqual(obj);
  });

  it('input object 9: must be equal', function () {
    const obj = {};
    for (let i = 0;i < 500000;i++) {
      obj['test' + i] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    testEqual(obj);
  });

  it('large input object: should not out of memory', function () {
    const obj = {};
    for (let i = 0;i < 8000000;i++) {
      obj['test' + i] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    expect(jsonSizeOf(obj)).to.be.a('number');
  });
});