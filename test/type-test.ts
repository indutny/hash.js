// Selective hash usage
import sha1 = require('../lib/hash/sha/1');
import sha224 = require('../lib/hash/sha/224');
import sha256 = require('../lib/hash/sha/256');
import sha384 = require('../lib/hash/sha/384');
import sha512 = require('../lib/hash/sha/512');
import { ripemd160 } from '../lib/hash/ripemd';

import * as sha from '../lib/hash/sha';
import * as hash from '../lib/hash';

/* global describe it */

import assert = require('assert');
import { BlockHash } from '../lib/hash/common';

function typeAssertEqual<T>(a: T): void { }
// test selective hash usage
typeAssertEqual<typeof sha1>(sha.sha1);
typeAssertEqual<typeof sha224>(sha.sha224);
typeAssertEqual<typeof sha256>(sha.sha256);
typeAssertEqual<typeof sha384>(sha.sha384);
typeAssertEqual<typeof sha512>(sha.sha512);

describe('Hash Types', function () {
  function test(fn: () => BlockHash, cases: ([string, string] | [string, string, 'hex'])[]) {
    for (let i = 0; i < cases.length; i++) {
      const msg = cases[i][0];
      const res = cases[i][1];
      const enc = cases[i][2];

      let dgst = fn().update(msg, enc).digest('hex');
      assert.equal(dgst, res);

      // Split message
      dgst = fn().update(msg.slice(0, 2), enc)
        .update(msg.slice(2), enc)
        .digest('hex');
      assert.equal(dgst, res);
    }
  }

  it('should support sha256', function () {
    assert.equal(sha256.blockSize, 512);
    typeAssertEqual<512>(sha256.blockSize);
    assert.equal(sha256().blockSize, 512);
    typeAssertEqual<512>(sha256().blockSize);
    assert.equal(sha256.outSize, 256);
    typeAssertEqual<256>(sha256.outSize);
    assert.equal(sha256().outSize, 256);
    typeAssertEqual<256>(sha256().outSize);

    test(sha256, [
      ['abc',
        'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'],
      ['abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq',
        '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1'],
      ['deadbeef',
        '5f78c33274e43fa9de5659265c1d917e25c03722dcb0b8d27db8d5feaa813953',
        'hex'],
    ]);
  });

  it('should support sha224', function () {
    assert.equal(sha224.blockSize, 512);
    typeAssertEqual<512>(sha224.blockSize);
    assert.equal(sha224().blockSize, 512);
    typeAssertEqual<512>(sha224().blockSize);
    assert.equal(sha224.outSize, 224);
    typeAssertEqual<224>(sha224.outSize);
    assert.equal(sha224().outSize, 224);
    typeAssertEqual<224>(sha224().outSize);

    test(sha224, [
      ['abc',
        '23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7'],
      ['abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq',
        '75388b16512776cc5dba5da1fd890150b0c6455cb4f58b1952522525'],
      ['deadbeef',
        '55b9eee5f60cc362ddc07676f620372611e22272f60fdbec94f243f8',
        'hex'],
    ]);
  });

  it('should support ripemd160', function () {
    assert.equal(ripemd160.blockSize, 512);
    typeAssertEqual<512>(ripemd160.blockSize);
    assert.equal(ripemd160().blockSize, 512);
    typeAssertEqual<512>(ripemd160().blockSize);
    assert.equal(ripemd160.outSize, 160);
    typeAssertEqual<160>(ripemd160.outSize);
    assert.equal(ripemd160().outSize, 160);
    typeAssertEqual<160>(ripemd160().outSize);

    test(ripemd160, [
      ['', '9c1185a5c5e9fc54612808977ee8f548b2258d31'],
      ['abc',
        '8eb208f7e05d987a9b044a8e98c6b087f15a0bfc'],
      ['message digest',
        '5d0689ef49d2fae572b881b123a85ffa21595f36'],
      ['abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq',
        '12a053384a9c0c88e405a06c27dcf49ada62eb2b'],
      ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        'b0e20b6e3116640286ed3a87a5713079b21f5189'],
    ]);
  });

  it('should support sha1', function () {
    assert.equal(sha1.blockSize, 512);
    typeAssertEqual<512>(sha1.blockSize);
    assert.equal(sha1().blockSize, 512);
    typeAssertEqual<512>(sha1().blockSize);
    assert.equal(sha1.outSize, 160);
    typeAssertEqual<160>(sha1.outSize);
    assert.equal(sha1().outSize, 160);
    typeAssertEqual<160>(sha1().outSize);

    test(sha1, [
      ['',
        'da39a3ee5e6b4b0d3255bfef95601890afd80709'],
      ['abc',
        'a9993e364706816aba3e25717850c26c9cd0d89d'],
      ['abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq',
        '84983e441c3bd26ebaae4aa1f95129e5e54670f1'],
      ['deadbeef',
        'd78f8bb992a56a597f6c7a1fb918bb78271367eb',
        'hex'],
    ]);
  });

  it('should support sha512', function () {
    assert.equal(sha512.blockSize, 1024);
    typeAssertEqual<1024>(sha512.blockSize);
    assert.equal(sha512().blockSize, 1024);
    typeAssertEqual<1024>(sha512().blockSize);
    assert.equal(sha512.outSize, 512);
    typeAssertEqual<512>(sha512.outSize);
    assert.equal(sha512().outSize, 512);
    typeAssertEqual<512>(sha512().outSize);

    test(sha512, [
      ['abc',
        'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a' +
        '2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f'
      ],
      [
        'abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmn' +
        'hijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu',
        '8e959b75dae313da8cf4f72814fc143f8f7779c6eb9f7fa17299aeadb6889018' +
        '501d289e4900f7e4331b99dec4b5433ac7d329eeb6dd26545e96e55b874be909'
      ]
    ]);
  });

  it('should support sha384', function () {
    assert.equal(sha384.blockSize, 1024);
    typeAssertEqual<1024>(sha384.blockSize);
    assert.equal(sha384().blockSize, 1024);
    typeAssertEqual<1024>(sha384().blockSize);
    assert.equal(sha384.outSize, 384);
    typeAssertEqual<384>(sha384.outSize);
    assert.equal(sha384().outSize, 384);
    typeAssertEqual<384>(sha384().outSize);

    test(sha384, [
      ['abc',
        'cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed' +
        '8086072ba1e7cc2358baeca134c825a7'
      ],
      [
        'abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmn' +
        'hijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu',
        '09330c33f71147e83d192fc782cd1b4753111b173b3b05d22fa08086e3b0f712' +
        'fcc7c71a557e2db966c3e9fa91746039'
      ]
    ]);
  });
});

describe('Hmac Types', function () {
  describe('mixed test vector', function () {
    interface Option {
      name: string;
      key: string;
      msg: string;
      res: string;
      msgEnc?: string;
    }
    test({
      name: 'nist 1',
      key: '00010203 04050607 08090A0B 0C0D0E0F' +
        '10111213 14151617 18191A1B 1C1D1E1F 20212223 24252627' +
        '28292A2B 2C2D2E2F 30313233 34353637 38393A3B 3C3D3E3F',
      msg: 'Sample message for keylen=blocklen',
      res: '8bb9a1db9806f20df7f77b82138c7914d174d59e13dc4d0169c9057b133e1d62'
    });
    test({
      name: 'nist 2',
      key: '00010203 04050607' +
        '08090A0B 0C0D0E0F 10111213 14151617 18191A1B 1C1D1E1F',
      msg: 'Sample message for keylen<blocklen',
      res: 'a28cf43130ee696a98f14a37678b56bcfcbdd9e5cf69717fecf5480f0ebdf790'
    });
    test({
      name: 'nist 3',
      key: '00010203' +
        '04050607 08090A0B 0C0D0E0F 10111213 14151617 18191A1B' +
        '1C1D1E1F 20212223 24252627 28292A2B 2C2D2E2F 30313233' +
        '34353637 38393A3B 3C3D3E3F 40414243 44454647 48494A4B' +
        '4C4D4E4F 50515253 54555657 58595A5B 5C5D5E5F 60616263',
      msg: 'Sample message for keylen=blocklen',
      res: 'bdccb6c72ddeadb500ae768386cb38cc41c63dbb0878ddb9c7a38a431b78378d'
    });
    test({
      name: 'nist 4',
      key: '00' +
        '01020304 05060708 090A0B0C 0D0E0F10 11121314 15161718' +
        '191A1B1C 1D1E1F20 21222324 25262728 292A2B2C 2D2E2F30',
      msg: 'Sample message for keylen<blocklen, with truncated tag',
      res: '27a8b157839efeac98df070b331d593618ddb985d403c0c786d23b5d132e57c7'
    });
    test({
      name: 'regression 1',
      key: '48f38d0c6a344959cc94502b7b5e8dffb6a5f41795d9066fc9a649557167ee2f',
      msg: '1d495eef7761b65dccd0a983d2d7204fea28b5c81f1758046e062eb043755ea1',
      msgEnc: 'hex',
      res: 'cf5ad5984f9e43917aa9087380dac46e410ddc8a7731859c84e9d0f31bd43655'
    });

    function test(opt: Option) {
      it('should not fail at ' + opt.name, function () {
        let h = hash.hmac(hash.sha256, opt.key, 'hex');
        assert.equal(h.update(opt.msg, opt.msgEnc).digest('hex'), opt.res);
        h = hash.hmac(hash.sha256, opt.key, 'hex');
        assert.equal(h
          .update(opt.msg.slice(0, 10), opt.msgEnc)
          .update(opt.msg.slice(10), opt.msgEnc)
          .digest('hex'), opt.res);
      });
    }
  });
});
