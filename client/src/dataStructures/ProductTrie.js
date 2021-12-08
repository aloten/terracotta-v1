"use strict";
exports.__esModule = true;
exports.ProductTrie = void 0;
var ProductNode_1 = require("./ProductNode");
var ProductTrie = /** @class */ (function () {
    function ProductTrie() {
        this.root = new ProductNode_1.ProductNode('');
    }
    // Adds a word to the trie
    ProductTrie.prototype.addSequence = function (sequence) {
        this.addNodeRecursive(this.root, sequence);
    };
    // From root, add first letter of remaining sequence and indices recursively
    ProductTrie.prototype.addNodeRecursive = function (root, letters) {
        // If there are more letters in sequence
        if (letters.length > 0) {
            var firstLetter = letters.charAt(0);
            // If the root has children
            if (root.getChildren().length > 0) {
                var match = false;
                for (var i = 0; i < root.getChildren().length; i++) {
                    if (root.getChildren()[i].getLetter() === firstLetter) {
                        match = true;
                        this.addNodeRecursive(root.getChildren()[i], letters.slice(1));
                        break;
                    }
                }
                if (match === false) {
                    root.addChild(firstLetter);
                    this.addNodeRecursive(root.getChildren()[root.getChildren().length - 1], letters.slice(1));
                }
            }
            else {
                root.addChild(firstLetter);
                this.addNodeRecursive(root.getChildren()[0], letters.slice(1));
            }
        }
        else {
            return;
        }
    };
    // Returns string array of all product options that begin with searchStr
    ProductTrie.prototype.getOptions = function (searchStr) {
        return this.traverse(this.root, searchStr.toLowerCase(), '');
    };
    // Traverse trie of searchStr node sequence, building up sequenceStr
    // then return sequenceStr + all sub sequences as product options
    ProductTrie.prototype.traverse = function (root, searchStrRemoving, sequenceStr) {
        if (searchStrRemoving.length > 0) {
            var firstLetter = searchStrRemoving.charAt(0);
            if (root.getChildren().length > 0) {
                for (var _i = 0, _a = root.getChildren(); _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (child.getLetter().toLowerCase() === firstLetter) {
                        return this.traverse(child, searchStrRemoving.slice(1), sequenceStr + child.getLetter());
                    }
                }
                return [];
            }
            else {
                return [];
            }
        }
        else {
            var result = this.getAllSequences(root, sequenceStr.slice(0, -1), []);
            return result;
        }
    };
    // Return sequences after searchStr's last node (i.e. last letter)
    ProductTrie.prototype.getAllSequences = function (root, sequence, productArr) {
        if (root.getChildren().length > 0) {
            for (var _i = 0, _a = root.getChildren(); _i < _a.length; _i++) {
                var child = _a[_i];
                productArr.concat(this.getAllSequences(child, sequence + root.getLetter(), productArr));
            }
            return productArr;
        }
        else {
            productArr.push(sequence + root.getLetter());
            return productArr;
        }
    };
    return ProductTrie;
}());
exports.ProductTrie = ProductTrie;
