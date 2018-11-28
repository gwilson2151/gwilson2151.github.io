"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
// tslint:disable:no-console
window.onload = (function () {
    var SIDE_SAMPLE_RATE = 0.333;
    var DIFF_DELTA = 0.999;
    var MAX_COLOUR_DISTANCE = Math.sqrt(Math.pow(510, 2) * 3);
    var currentImageIndexer;
    var getSamples = function (indexer, func) {
        var e_1, _a;
        var samples = [];
        var coords = func();
        try {
            for (var coords_1 = __values(coords), coords_1_1 = coords_1.next(); !coords_1_1.done; coords_1_1 = coords_1.next()) {
                var coordinate = coords_1_1.value;
                var _b = __read(coordinate, 2), x = _b[0], y = _b[1];
                samples.push(indexer.getColorAt(x, y));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (coords_1_1 && !coords_1_1.done && (_a = coords_1.return)) _a.call(coords_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // console.log(samples);
        return samples;
    };
    var countColourOccurence = function (samples) {
        var e_2, _a;
        var map = new Map();
        try {
            for (var samples_1 = __values(samples), samples_1_1 = samples_1.next(); !samples_1_1.done; samples_1_1 = samples_1.next()) {
                var sample = samples_1_1.value;
                var key = sample.join('|');
                map.set(key, (map.get(key) || 0) + 1);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (samples_1_1 && !samples_1_1.done && (_a = samples_1.return)) _a.call(samples_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        console.log(map.entries());
        return map;
    };
    var estimateSimilarity = function (colourOccurence) {
        var e_3, _a;
        var distinct = [];
        try {
            for (var _b = __values(colourOccurence.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                distinct.push(key.split('|').map(function (i) { return Number(i); }));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        console.log(distinct);
        var distances = [];
        if (distinct.length > 1) {
            for (var x = 0; x < distinct.length - 1; ++x) {
                for (var y = x + 1; y < distinct.length; ++y) {
                    var first = distinct[x];
                    var second = distinct[y];
                    var distance = Math.pow(first[0] + second[0], 2) + Math.pow(first[1] + second[1], 2)
                        + Math.pow(first[2] + second[2], 2);
                    distances.push(distance);
                }
            }
            console.log(distances);
            var sum = distances.reduce(function (prev, curr) { return prev + curr; });
            var result = Math.sqrt(sum / distances.length) / MAX_COLOUR_DISTANCE;
            console.log("sqrt(" + sum + " / " + distances.length + ") / " + MAX_COLOUR_DISTANCE + " = " + result);
            return result;
        }
        throw new Error('i\'m an idiot');
    };
    var setImageFromSelect = function (event) {
        var image = document.getElementById('img');
        var target = event.target;
        if (target) {
            image.src = target.value;
            image.onload = processImage;
        }
        else {
            console.error('no event target or value selected');
        }
    };
    var enablePicker = function () {
        var image = document.getElementById('img');
        image.onclick = getImagePixelColour;
        image.style.cursor = 'crosshair';
    };
    var getImagePixelColour = function (event) {
        var image = document.getElementById('img');
        image.onclick = null;
        image.style.cursor = 'auto';
        var color = currentImageIndexer.getColorAt(event.offsetX, event.offsetY);
        var picked = document.getElementById('picked');
        picked.style.backgroundColor = "rgba(" + color.join(',') + ")";
    };
    var init = function () {
        var select = document.getElementById('img-select');
        select.onchange = setImageFromSelect;
        var picker = document.getElementById('picker');
        picker.onclick = enablePicker;
    };
    var processImage = function () {
        var canvas = document.createElement('canvas');
        var bgcolor = document.getElementById('bgcolor');
        var suggestedContainer = document.getElementById('suggested');
        var image = document.getElementById('img');
        console.log(image.src);
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        currentImageIndexer = new ImageDataIndexer(imageData);
        var xMax = currentImageIndexer.getWidth() - 1;
        var yMax = currentImageIndexer.getHeight() - 1;
        var getRowCoords = function (y) {
            var list = [];
            for (var i = 0; i < xMax * SIDE_SAMPLE_RATE; ++i) {
                list.push([Math.floor(Math.random() * xMax), y]);
            }
            return list;
        };
        var getColumnCoords = function (x) {
            var list = [];
            for (var i = 0; i < yMax * SIDE_SAMPLE_RATE; ++i) {
                list.push([x, Math.floor(Math.random() * yMax)]);
            }
            return list;
        };
        var topSamples = getSamples(currentImageIndexer, function () { return getRowCoords(0); });
        var bottomSamples = getSamples(currentImageIndexer, function () { return getRowCoords(yMax); });
        var leftSamples = getSamples(currentImageIndexer, function () { return getColumnCoords(0); });
        var rightSamples = getSamples(currentImageIndexer, function () { return getColumnCoords(xMax); });
        var allSamples = __spread(topSamples, bottomSamples, leftSamples, rightSamples);
        var colourOccurence = countColourOccurence(allSamples);
        var similarity;
        if (colourOccurence.size === 1) {
            similarity = 1;
        }
        else if (colourOccurence.size === allSamples.length) {
            similarity = 0;
        }
        else {
            similarity = estimateSimilarity(colourOccurence);
        }
        if (similarity > DIFF_DELTA) {
            bgcolor.style.backgroundColor = "rgba(" + topSamples[0].join(',') + ")";
            bgcolor.innerHTML = '';
            suggestedContainer.innerHTML = '';
        }
        else {
            bgcolor.style.backgroundColor = null;
            bgcolor.innerText = 'N/A';
            var list = __spread(colourOccurence.entries()).sort(function (a, b) { return b[1] - a[1]; });
            console.log(list);
            var suggested = list.slice(0, 3);
            suggestedContainer.innerHTML = '';
            suggested.map(function (item) {
                var div = document.createElement('span');
                div.style.width = '100px';
                div.style.height = '100px';
                div.style.backgroundColor = "rgba(" + item[0].split('|').join(',') + ")";
                div.style.display = 'inline-block';
                suggestedContainer.appendChild(div);
            });
        }
    };
    return function () {
        init();
        processImage();
    };
})();
// tslint:enable:no-console
