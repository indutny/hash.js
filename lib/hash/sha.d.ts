import sha1 = require('./sha/1');
import sha224 = require('./sha/224');
import sha256 = require('./sha/256');
import sha384 = require('./sha/384');
import sha512 = require('./sha/512');

declare var sha: {
  sha1: typeof sha1,
  sha224: typeof sha224,
  sha256: typeof sha256,
  sha384: typeof sha384,
  sha512: typeof sha512
};

export = sha;
