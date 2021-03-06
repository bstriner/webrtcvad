"use strict";
exports.__esModule = true;
var vadBindings = require("bindings")("vad.node");
var VAD = (function () {
    function VAD(sampleRate, level) {
        if (sampleRate === void 0) { sampleRate = 16000; }
        if (level === void 0) { level = 3; }
        this.sampleRate = sampleRate;
        this.instance = new vadBindings.VAD(sampleRate, level);
    }
    VAD.prototype.valid = function (audio) {
        return (audio.length / 2 == this.sampleRate / 100 ||
            audio.length / 2 == (2 * this.sampleRate) / 100 ||
            audio.length / 2 == (3 * this.sampleRate) / 100);
    };
    VAD.prototype.process = function (audio) {
        if (!this.valid(audio)) {
            throw new Error("Invalid audio length. For a sample rate of " + this.sampleRate + ", audio length must be " + (2 *
                this.sampleRate) /
                100 + ", " + (4 * this.sampleRate) / 100 + ", or " + (6 * this.sampleRate) / 100 + ".");
        }
        return this.instance.process(audio, audio.length / 2);
    };
    return VAD;
}());
exports["default"] = VAD;
//# sourceMappingURL=index.js.map