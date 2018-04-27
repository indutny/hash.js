import { BlockHash } from '../common';
declare var sha384: SHA384Constructor;
declare interface SHA384Constructor {
  (): SHA384;
  new(): SHA384;
  blockSize: 1024;
  outSize: 384;
  hmacStrength: 80;
  padLength: 64;
}
declare class SHA384 extends BlockHash {
  blockSize: 1024;
  outSize: 384;
  hmacStrength: 80;
  padLength: 64;
}
export = sha384;
