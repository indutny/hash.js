import { BlockHash } from '../common';
declare var sha256: SHA256Constructor;
declare interface SHA256Constructor {
  (): SHA256;
  new(): SHA256;
  blockSize: 512;
  outSize: 256;
  hmacStrength: 80;
  padLength: 64;
}
declare class SHA256 extends BlockHash {
  blockSize: 512;
  outSize: 256;
  hmacStrength: 80;
  padLength: 64;
}
export = sha256;
