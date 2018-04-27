import { BlockHash } from './common';
declare var hmac: HmacConstructor;
declare interface HmacConstructor {
  <T extends BlockHash>(hash: () => T, key: string, enc: 'hex'): Hmac<T>;
  <T extends BlockHash>(hash: () => T, key: string | number[], enc?: string): Hmac<T>;
  new <T extends BlockHash>(hash: () => T, key: string, enc: 'hex'): Hmac<T>;
  new <T extends BlockHash>(hash: () => T, key: string | number[], enc?: string): Hmac<T>;
}
declare class Hmac<T extends BlockHash> {
  Hash: T;
  blockSize: number;
  outSize: number;
  update(msg: string, enc: 'hex'): this;
  update(msg: string | number[], enc?: string): this;
  digest(): number[];
  digest(enc: 'hex'): string;
}
export = hmac;
