import { ProductNode } from './ProductNode';

export class ProductTrie {
  private root: ProductNode;

  constructor() {
    this.root = new ProductNode('');
  }

  // Adds a word to the trie
  addSequence(sequence: string): void {
    this.addNodeRecursive(this.root, sequence);
  }

  // From root, add first letter of remaining sequence and indices recursively
  private addNodeRecursive(root: ProductNode, letters: string): void {
    // If there are more letters in sequence
    if (letters.length > 0) {
      const firstLetter = letters.charAt(0);
      // If the root has children
      if (root.getChildren().length > 0) {
        let match = false;
        for (let i = 0; i < root.getChildren().length; i++) {
          if (root.getChildren()[i].getLetter() === firstLetter) {
            match = true;
            this.addNodeRecursive(root.getChildren()[i], letters.slice(1));
            break;
          }
        }
        if (match === false) {
          root.addChild(firstLetter);
          this.addNodeRecursive(
            root.getChildren()[root.getChildren().length - 1],
            letters.slice(1)
          );
        }
      } else {
        root.addChild(firstLetter);
        this.addNodeRecursive(root.getChildren()[0], letters.slice(1));
      }
    } else {
      return;
    }
  }

  // Returns string array of all product options that begin with searchStr
  getOptions(searchStr: string): string[] {
    return this.traverse(this.root, searchStr.toLowerCase(), '');
  }

  // Traverse trie of searchStr node sequence, building up sequenceStr
  // then return sequenceStr + all sub sequences as product options
  private traverse(
    root: ProductNode,
    searchStrRemoving: string,
    sequenceStr: string
  ): string[] {
    if (searchStrRemoving.length > 0) {
      const firstLetter = searchStrRemoving.charAt(0);
      if (root.getChildren().length > 0) {
        for (const child of root.getChildren()) {
          if (child.getLetter().toLowerCase() === firstLetter) {
            return this.traverse(
              child,
              searchStrRemoving.slice(1),
              sequenceStr + child.getLetter()
            );
          }
        }
        return [];
      } else {
        return [];
      }
    } else {
      const result = this.getAllSequences(root, sequenceStr.slice(0, -1), []);
      return result;
    }
  }

  // Return sequences after searchStr's last node (i.e. last letter)
  private getAllSequences(
    root: ProductNode,
    sequence: string,
    productArr: string[]
  ): string[] {
    if (root.getChildren().length > 0) {
      for (const child of root.getChildren()) {
        productArr.concat(
          this.getAllSequences(child, sequence + root.getLetter(), productArr)
        );
      }
      return productArr;
    } else {
      productArr.push(sequence + root.getLetter());
      return productArr;
    }
  }
}
