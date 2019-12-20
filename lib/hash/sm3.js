'use strict';

var utils = require('./utils');
var common = require('./common');

var rotl32 = utils.rotl32;
var sum32_3 = utils.sum32_3;
var sum32_4 = utils.sum32_4;

function P0(X) {
  return X ^ rotl32(X, 9) ^ rotl32(X, 17);
}

// P1(X) = X xor (X <<< 15) xor (X <<< 23)
function P1(X) {
  return X ^ rotl32(X, 15) ^ rotl32(X, 23);
}

function FF(X, Y, Z, j) {
  return j >= 0 && j <= 15 ? X ^ Y ^ Z : (X & Y) | (X & Z) | (Y & Z);
}

function GG(X, Y, Z, j) {
  return j >= 0 && j <= 15 ? X ^ Y ^ Z : (X & Y) | ((~X) & Z);
}

function T(j) {
  return j >= 0 && j <= 15 ? 0x79cc4519 : 0x7a879d8a;
}

var BlockHash = common.BlockHash;

function SM3() {
  if (!(this instanceof SM3))
    return new SM3();

  BlockHash.call(this);
  this.h = [
    0x7380166f, 0x4914b2b9, 0x172442d7, 0xda8a0600,
    0xa96f30bc, 0x163138aa, 0xe38dee4d, 0xb0fb0e4e
  ];

  this.W = new Array(68);
  this.M = new Array(64);
}
utils.inherits(SM3, BlockHash);
module.exports = SM3;

SM3.blockSize = 512;
SM3.outSize = 256;
SM3.hmacStrength = 192;
SM3.padLength = 64;

SM3.prototype._update = function _update(msg, start) {
  var W = this.W;
  var M = this.M;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  // W[j] <- P1(W[j−16] xor W[j−9] xor (W[j−3] <<< 15)) xor (W[j−13] <<< 7) xor W[j−6]
  for (; i < 68; i++)
    W[i] = P1(W[i - 16] ^ W[i - 9] ^ rotl32(W[i - 3], 15)) ^ rotl32(W[i - 13], 7) ^ W[i - 6];

  // W′[j] = W[j] xor W[j+4]
  for (i = 0; i < 64; i++)
    M[i] = W[i] ^ W[i + 4];

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];


  let SS1;
  let SS2;
  let TT1;
  let TT2;
  for (let j = 0; j < 64; j += 1) {
    SS1 = rotl32(sum32_3(rotl32(a, 12), e, rotl32(T(j), j)), 7);
    SS2 = SS1 ^ rotl32(a, 12);

    TT1 = sum32_4(FF(a, b, c, j), d, SS2, M[j]);
    TT2 = sum32_4(GG(e, f, g, j), h, SS1, W[j]);

    d = c;
    c = rotl32(b, 9);
    b = a;
    a = TT1;
    h = g;
    g = rotl32(f, 19);
    f = e;
    e = P0(TT2);
  }

  this.h[0] = this.h[0] ^ a;
  this.h[1] = this.h[1] ^ b;
  this.h[2] = this.h[2] ^ c;
  this.h[3] = this.h[3] ^ d;
  this.h[4] = this.h[4] ^ e;
  this.h[5] = this.h[5] ^ f;
  this.h[6] = this.h[6] ^ g;
  this.h[7] = this.h[7] ^ h;
};



SM3.prototype._digest = function digest(enc) {
  this.h[0] = this.h[0] >>> 0;
  this.h[1] = this.h[1] >>> 0;
  this.h[2] = this.h[2] >>> 0;
  this.h[3] = this.h[3] >>> 0;
  this.h[4] = this.h[4] >>> 0;
  this.h[5] = this.h[5] >>> 0;
  this.h[6] = this.h[6] >>> 0;
  this.h[7] = this.h[7] >>> 0;

  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};
