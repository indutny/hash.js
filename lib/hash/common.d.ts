export abstract class BlockHash {
  pending: number[];
  pendingTotal: number;
  blockSize: number;
  outSize: number;
  hmacStrength: number;
  padLength: number;
  endian: 'little' | 'big';
  update(msg: string, enc: 'hex'): this;
  update(msg: string | number[], enc?: string): this;
  digest(): number[];
  digest(enc: 'hex'): string;
}
