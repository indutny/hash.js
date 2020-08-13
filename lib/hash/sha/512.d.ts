import { BlockHash } from '../common';
declare var sha512: SHA512Constructor;
declare interface SHA512Constructor {
  (): SHA512;
  new(): SHA512;
  blockSize: 1024;
  outSize: 512;
  hmacStrength: 80;
  padLength: 64;
}
declare class SHA512 extends BlockHash {
  blockSize: 1024;
  outSize: 512;
  hmacStrength: 80;
  padLength: 64;
}
export = sha512;
