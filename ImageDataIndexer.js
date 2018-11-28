"use strict";
var ImageDataIndexer = /** @class */ (function () {
    function ImageDataIndexer(imageData) {
        this.imageData = imageData;
        this.PIXEL_DATA_SIZE = 4;
        this.isDebug = false;
        this.ROW_SIZE = imageData.width * this.PIXEL_DATA_SIZE;
        this.log("imageData array length: 0-" + imageData.data.length);
    }
    ImageDataIndexer.prototype.getWidth = function () {
        return this.imageData.width;
    };
    ImageDataIndexer.prototype.getHeight = function () {
        return this.imageData.height;
    };
    ImageDataIndexer.prototype.getColorAt = function (x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x >= this.getWidth() || x < 0) {
            throw new Error("x must be between 0 and  " + this.getWidth() + ".");
        }
        if (y >= this.getHeight() || y < 0) {
            throw new Error("y must be between 0 and " + this.getHeight() + ".");
        }
        var yIndex = y * this.ROW_SIZE;
        var xIndex = x * this.PIXEL_DATA_SIZE;
        this.log("[" + yIndex + ", " + xIndex + "]: " + (xIndex + yIndex));
        var index = xIndex + yIndex;
        return this.imageData.data.slice(index, index + this.PIXEL_DATA_SIZE);
    };
    ImageDataIndexer.prototype.log = function (message) {
        if (this.isDebug) {
            console.log(message); // tslint:disable-line:no-console
        }
    };
    return ImageDataIndexer;
}());
