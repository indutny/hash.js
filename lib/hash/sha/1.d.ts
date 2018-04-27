import { BlockHash } from '../common';
declare var sha1: SHA1Constructor;
declare interface SHA1Constructor {
  (): SHA1;
  new(): SHA1;
  blockSize: 512;
  outSize: 160;
  hmacStrength: 80;
  padLength: 64;
}
declare class SHA1 extends BlockHash {
  blockSize: 512;
  outSize: 160;
  hmacStrength: 80;
  padLength: 64;
}
export = sha1;
