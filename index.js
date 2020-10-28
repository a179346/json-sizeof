function jsonSizeOf (input) {
  if (input === undefined) throw new TypeError('input cannot be undefined');
  if (typeof (input) === 'function') throw new TypeError('input cannot be function');

  return sizeOf('', { '':input }, new WeakSet());
}

const NULL_LEN = Buffer.byteLength('null');
const SQU_BRA_LEN = Buffer.byteLength('[]');
const CUR_BRA_LEN = Buffer.byteLength('{}');
const COMMA_LEN = Buffer.byteLength(',');
const COLON_LEN = Buffer.byteLength(':');
function sizeOf (key, holder, seenObjs) {
  let v,
    value = holder[key];

  if (value && typeof (value) === 'object') {
    if (seenObjs.has(value))
      throw new TypeError('cyclic object value');
    v = value;
    seenObjs.add(value);

    if (typeof value.toJSON === 'function')
      value = value.toJSON(key);
  }

  switch (typeof (value)) {
    case 'string':
      return sizeOfReturn(quote(value), v, seenObjs);

    case 'number':
      return sizeOfReturn(isFinite(value) ? String(value) : 'null', v, seenObjs);

    case 'boolean':
    case 'null':
      return sizeOfReturn(String(value), v, seenObjs);

    case 'object':
      if (!value)
        return sizeOfReturn(NULL_LEN, v, seenObjs);

      if (Array.isArray(value)) {
        let i,
          size,
          bytes = SQU_BRA_LEN,
          length = value.length,
          first = true;
        for (i = 0; i < length; i += 1) {
          if (first)
            first = false;
          else
            bytes += COMMA_LEN;
          size = sizeOf(i, value, seenObjs);
          bytes += size !== undefined ? size : NULL_LEN;
        }
        return sizeOfReturn(bytes, v, seenObjs);
      } else {
        let k,
          size,
          bytes = CUR_BRA_LEN,
          first = true;
        for (k in value) {
          if (Object.prototype.hasOwnProperty.call(value, k)) {
            size = sizeOf(k, value, seenObjs);
            if (size !== undefined) {
              if (first)
                first = false;
              else
                bytes += COMMA_LEN;
              bytes += Buffer.byteLength(quote(k)) + COLON_LEN + size;
            }
          }
        }
        return sizeOfReturn(bytes, v, seenObjs);
      }
  }
}

function sizeOfReturn (ret, v, seenObjs) {
  if (v) seenObjs.delete(v);
  if (typeof (ret) === 'number') return ret;
  return Buffer.byteLength(ret);
}

// eslint-disable-next-line
const rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
const meta = {    // table of character substitutions
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '"': '\\"',
  '\\': '\\\\'
};

function quote (string) {

  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.

  rx_escapable.lastIndex = 0;
  return rx_escapable.test(string)
    ? '"' + string.replace(rx_escapable, function (a) {
      const c = meta[a];
      return typeof c === 'string'
        ? c
        : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"'
    : '"' + string + '"';
}

module.exports = jsonSizeOf;