function jsonSize (input) {
  if (input === undefined) throw new TypeError('input cannot be undefined');
  if (typeof input === 'function') throw new TypeError('input cannot be function');

  let bytes = 0;
  function sizeOf (obj) {
    if (obj === null) {
      bytes += 4;
      return;
    }
    if (obj === true) {
      bytes += 4;
      return;
    }
    if (obj === false) {
      bytes += 5;
      return;
    }
    const type = typeof (obj);
    if (type === 'string') {
      bytes += obj.length + 2;
      bytes += (obj.match(/"/g) || []).length;
      return;
    }
    if  (type === 'number') {
      bytes += obj.toString().length;
      return;
    }
    if (Array.isArray(obj)) {
      bytes += 1;
      let hasKey = false;
      for (const e of obj) {
        hasKey = true;
        bytes += 1;
        sizeOf(e);
      }
      if (!hasKey)
        bytes += 1;
      return;
    }
    if (type === 'object') {
      if (obj instanceof Date) {
        const str = obj.toJSON();
        bytes += str.length + 2;
        bytes += (str.match(/"/g) || []).length;
        return;
      }
      bytes += 1;
      let hasKey = false;
      for (const key in obj) {
        hasKey = true;
        if (!Object.prototype.hasOwnProperty.call(obj, key) || obj[key] === undefined || typeof (obj[key]) === 'function') continue;
        bytes += 4 + key.length;
        sizeOf(obj[key]);
      }
      if (!hasKey)
        bytes += 1;
    }
  }

  sizeOf(input);
  return bytes;
}

module.exports = jsonSize;