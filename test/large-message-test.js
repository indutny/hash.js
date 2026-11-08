'use strict';
/* global describe it */

var assert = require('assert');
var crypto = require('crypto');
var hash = require('../');

describe('Large messages (#36)', function() {
  it('bounds intermediate byte arrays when updating a large string', function() {
    var message = new Array(4 * 1024 * 1024 + 1).join('a');
    var original = hash.utils.toArray;
    var largest = 0;
    hash.utils.toArray = function(msg, enc) {
      var bytes = original(msg, enc);
      largest = Math.max(largest, bytes.length);
      return bytes;
    };
    try {
      assert.equal(hash.sha256().update(message).digest('hex'),
                   crypto.createHash('sha256').update(message).digest('hex'));
      assert(largest <= 1024 * 1024,
             'converting the entire message allocates an unbounded byte array');
    } finally {
      hash.utils.toArray = original;
    }
  });

  [ 'sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'ripemd160' ]
    .forEach(function(algorithm) {
      it('preserves multibyte characters and pending data for ' + algorithm,
         function() {
           var prefix = 'prefix';
           var suffix = 'suffix';
           for (var offset = -2; offset <= 2; offset++) {
             var message = new Array(65536 + offset).join('a') +
              '\ud83d\udc4b\u60a8\u597d\u043f\u0440\u0438\u0432\u0435\u0442' +
              new Array(65537).join('b');
             var h = hash[algorithm]().update(prefix);
             assert.strictEqual(h.update(message), h);
             assert.equal(h.update(suffix).digest('hex'),
                          crypto.createHash(algorithm).update(prefix + message + suffix)
                            .digest('hex'));
           }
         });

      it('preserves unpaired surrogate encoding for ' + algorithm, function() {
        var prefix = new Array(65536).join('a');
        var suffix = new Array(65537).join('b');
        var message = prefix + '\ud800x\udc00' + suffix;
        var bytes = Buffer.concat([
          Buffer.from(prefix),
          Buffer.from([ 0xed, 0xa0, 0x80, 0x78, 0xed, 0xb0, 0x80 ]),
          Buffer.from(suffix)
        ]);
        assert.equal(hash[algorithm]().update(message).digest('hex'),
                     crypto.createHash(algorithm).update(bytes).digest('hex'));
      });

      it('preserves odd and formatted hex input for ' + algorithm, function() {
        var even = new Array(32770).join('ab ');
        [ even, 'f' + even ].forEach(function(message) {
          var normalized = message.replace(/\s/g, '');
          if (normalized.length % 2 !== 0)
            normalized = '0' + normalized;
          assert.equal(hash[algorithm]().update(message, 'hex').digest('hex'),
                       crypto.createHash(algorithm).update(normalized, 'hex').digest('hex'));
        });
      });

      it('supports large HMAC messages for ' + algorithm, function() {
        var message = new Array(65537).join('\u60a8');
        assert.equal(hash.hmac(hash[algorithm], 'key').update(message)
          .digest('hex'),
                     crypto.createHmac(algorithm, 'key').update(message).digest('hex'));
      });
    });
});
