var utils = exports;
var inherits = require('inherits');

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 0xff;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (var i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (var i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
utils.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  if (res < 0)
    res += 0x100000000;
  return res;
}
utils.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
utils.toHex32 = toHex32;

function toHex64(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var hi = msg[i].hi;
    var lo = msg[i].lo;
    if (endian === 'little') {
      hi = htonl(hi);
      lo = htonl(lo);
      res += zero8(lo.toString(16)) + zero8(hi.toString(16));
    } else {
      res += zero8(hi.toString(16)) + zero8(lo.toString(16));
    }
  }
  return res;
}
utils.toHex64 = toHex64;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
utils.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    if (w < 0)
      w += 0x100000000;
    res[i] = w;
  }
  return res;
}
utils.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
utils.split32 = split32;

function split64(msg, endian) {
  var res = new Array(msg.length * 8);
  for (var i = 0, k = 0; i < msg.length; i++, k += 8) {
    var hi = msg[i].hi;
    var lo = msg[i].lo;
    if (endian === 'big') {
      res[k] = hi >>> 24;
      res[k + 1] = (hi >>> 16) & 0xff;
      res[k + 2] = (hi >>> 8) & 0xff;
      res[k + 3] = hi & 0xff;
      res[k + 4] = lo >>> 24;
      res[k + 5] = (lo >>> 16) & 0xff;
      res[k + 6] = (lo >>> 8) & 0xff;
      res[k + 7] = lo & 0xff;
    } else {
      res[k + 7] = hi >>> 24;
      res[k + 6] = (hi >>> 16) & 0xff;
      res[k + 5] = (hi >>> 8) & 0xff;
      res[k + 4] = hi & 0xff;
      res[k + 3] = lo >>> 24;
      res[k + 2] = (lo >>> 16) & 0xff;
      res[k + 1] = (lo >>> 8) & 0xff;
      res[k] = lo & 0xff;
    }
  }
  return res;
}
utils.split64 = split64;

function rotr32(w, b) {
  return (w >>> b) | (w << (32 - b));
}
utils.rotr32 = rotr32;

function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}
utils.rotl32 = rotl32;

function sum32(a, b) {
  var r = (a + b) | 0;
  if (r < 0)
    r += 0x100000000;
  return r;
}
utils.sum32 = sum32;

function sum32_3(a, b, c) {
  var r = (a + b + c) | 0;
  if (r < 0)
    r += 0x100000000;
  return r;
}
utils.sum32_3 = sum32_3;

function sum32_4(a, b, c, d) {
  var r = (a + b + c + d) | 0;
  if (r < 0)
    r += 0x100000000;
  return r;
}
utils.sum32_4 = sum32_4;

function sum32_5(a, b, c, d, e) {
  var r = (a + b + c + d + e) | 0;
  if (r < 0)
    r += 0x100000000;
  return r;
}
utils.sum32_5 = sum32_5;

function assert(cond, msg) {
  if (!cond)
    throw new Error(msg || 'Assertion failed');
}
utils.assert = assert;

utils.inherits = inherits;

function Num64(hi, lo) {
  this.hi = hi;
  this.lo = lo;
  this.normalize();
}
utils.Num64 = Num64;

Num64.prototype.inspect = function inspect() {
  return '0x' + zero8(this.hi.toString(16)) + zero8(this.lo.toString(16));
};

Num64.prototype.clone = function clone() {
  return new Num64(this.hi, this.lo);
};

Num64.prototype.normalize = function normalize() {
  if (this.hi < 0)
    this.hi += 0x100000000;
  if (this.lo < 0)
    this.lo += 0x100000000;
};

Num64.prototype.xor2 = function xor2(a, b) {
  return new Num64(
    a.hi ^ b.hi ^ this.hi,
    a.lo ^ b.lo ^ this.lo
  );
};

Num64.prototype.isum3 = function isum3(a, b, c) {
  var lo = this.lo + a.lo + b.lo + c.lo;
  var hi = this.hi + a.hi + b.hi + c.hi + ((lo / 0x100000000) | 0);

  this.lo = lo | 0;
  this.hi = hi | 0;
  this.normalize();

  return this;
};

Num64.prototype.isum4 = function isum4(a, b, c, d) {
  var lo = this.lo + a.lo + b.lo + c.lo + d.lo;
  var hi = this.hi + a.hi + b.hi + c.hi + d.hi + ((lo / 0x100000000) | 0);

  this.lo = lo | 0;
  this.hi = hi | 0;
  this.normalize();

  return this;
};

Num64.prototype.rotr = function rotr(n) {
  var hi;
  var lo;
  var num = n;
  if (num >= 32) {
    hi = this.lo | 0;
    lo = this.hi | 0;
    num -= 32;
  } else {
    hi = this.hi | 0;
    lo = this.lo | 0;
  }

  // num < 32
  var mask = (1 << num) - 1;
  var rnum = 32 - num;
  return new Num64(
    ((lo & mask) << rnum) | (hi >>> num),
    ((hi & mask) << rnum) | (lo >>> num)
  );
};

Num64.prototype.shr = function shr(num) {
  if (num >= 32)
    return new Num64(0, this.hi).shr(num - 32);

  // num < 32
  var mask = (1 << num) - 1;
  return new Num64(
    this.hi >>> num,
    ((this.hi & mask) << (32 - num)) | (this.lo >>> num)
  );
};

Num64.prototype.isum = function isum(num) {
  var lo = this.lo + num.lo;
  var hi = (((lo / 0x100000000) | 0) + this.hi + num.hi) | 0;

  this.hi = hi;
  this.lo = lo | 0;
  if (this.hi < 0)
    this.hi += 0x100000000;
  if (this.lo < 0)
    this.lo += 0x100000000;

  return this;
};

Num64.prototype.sum = function sum(num) {
  return this.clone().isum(num);
};
