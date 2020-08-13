import utils = require('./hash/utils');
import common = require('./hash/common');
import sha = require('./hash/sha');
import ripemd = require('./hash/ripemd');
import hmac = require('./hash/hmac');

declare var hash: {
  utils: typeof utils;
  common: typeof common;
  sha: typeof sha;
  ripemd: typeof ripemd;
  hmac: typeof hmac;
  // Proxy hash functions to the main object
  sha1: typeof sha.sha1;
  sha256: typeof sha.sha256;
  sha224: typeof sha.sha224;
  sha384: typeof sha.sha384;
  sha512: typeof sha.sha512;
  ripemd160: typeof ripemd.ripemd160;
};

export = hash;
