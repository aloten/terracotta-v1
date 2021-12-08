"use strict";
exports.__esModule = true;
exports.ProductNode = void 0;
var ProductNode = /** @class */ (function () {
    function ProductNode(letter) {
        this.letter = letter;
        this.children = [];
    }
    ProductNode.prototype.addChild = function (letter) {
        var child = new ProductNode(letter);
        this.children.push(child);
    };
    ProductNode.prototype.getLetter = function () {
        return this.letter;
    };
    ProductNode.prototype.getChildren = function () {
        return this.children;
    };
    return ProductNode;
}());
exports.ProductNode = ProductNode;
