export class ProductNode {
  letter: string;
  indices: number[];
  children: ProductNode[];

  constructor(letter: string, indices: number[] = []) {
    this.letter = letter;
    this.indices = indices;
    this.children = [];
  }

  addChild(letter: string, indices?: number[]): void {
    const child = new ProductNode(letter, indices);
    this.children.push(child);
  }

  addIndices(indices: number[]) {
    for (const index of indices) {
      this.indices.push(index);
    }
  }
}
