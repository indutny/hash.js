import { BlockHash } from './common';
export declare var ripemd160: RIPEMD160Constructor;
declare interface RIPEMD160Constructor {
  (): RIPEMD160;
  new(): RIPEMD160;
  blockSize: 512;
  outSize: 160;
  hmacStrength: 192;
  padLength: 64;
}
declare class RIPEMD160 extends BlockHash {
  blockSize: 512;
  outSize: 160;
  hmacStrength: 192;
  padLength: 64;
}
