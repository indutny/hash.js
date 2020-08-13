import { BlockHash } from '../common';
declare var sha224: SHA224Constructor;
declare interface SHA224Constructor {
  (): SHA224;
  new(): SHA224;
  blockSize: 512;
  outSize: 224;
  hmacStrength: 80;
  padLength: 64;
}
declare class SHA224 extends BlockHash {
  blockSize: 512;
  outSize: 224;
  hmacStrength: 80;
  padLength: 64;
}
export = sha224;
