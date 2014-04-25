var hash = exports;

hash.utils = require('./hash/utils');
hash.hash = require('./hash/hash');
hash.hmac = require('./hash/hmac');

// Proxy hash functions to the main object
Object.keys(hash.hash).forEach(function(name) {
  hash[name] = hash.hash[name];
});
