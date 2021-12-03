import { ProductNode } from './ProductNode';

export class ProductTrie {
  root: ProductNode;
  // model: Object;

  constructor() {
    this.root = new ProductNode('');
    // this.model = this.getChildren(this.root);
  }

  // Adds a word and corresponding indices to the trie
  // (indices map to an array of unique product terms)
  addSequence(sequence: string, indices: number[]): void {
    this.addNodeRecursive(this.root, sequence, indices);
  }

  // From root, add first letter of remaining sequence and indices recursively
  private addNodeRecursive(
    root: ProductNode,
    letters: string,
    indices: number[]
  ): void {
    // If there are more letters in sequence
    if (letters.length > 0) {
      const firstLetter = letters.charAt(0);
      // If the root has children
      if (root.children.length > 0) {
        let match = false;
        for (let i = 0; i < root.children.length; i++) {
          if (root.children[i].letter === firstLetter) {
            match = true;
            root.children[i].addIndices(indices);
            this.addNodeRecursive(root.children[i], letters.slice(1), indices);
            break;
          }
        }
        if (match === false) {
          root.addChild(firstLetter, indices);
          this.addNodeRecursive(
            root.children[root.children.length - 1],
            letters.slice(1),
            indices
          );
        }
      } else {
        root.addChild(firstLetter, indices);
        this.addNodeRecursive(root.children[0], letters.slice(1), indices);
      }
    } else {
      return;
    }
  }
}
