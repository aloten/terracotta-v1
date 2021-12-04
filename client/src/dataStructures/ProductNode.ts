export class ProductNode {
  private letter: string;
  private children: ProductNode[];

  constructor(letter: string) {
    this.letter = letter;
    this.children = [];
  }

  addChild(letter: string): void {
    const child = new ProductNode(letter);
    this.children.push(child);
  }

  getLetter(): string {
    return this.letter;
  }

  getChildren(): ProductNode[] {
    return this.children;
  }
}
