"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExtensionStore = /** @class */ (function () {
    function ExtensionStore() {
        this.extensions = {};
    }
    ExtensionStore.prototype.register = function (extensionPointId, extension) {
        var extensions = this.extensions[extensionPointId] || [];
        extensions.push(extension);
        this.extensions[extensionPointId] = extensions;
    };
    ExtensionStore.register = function (extensionPointId, extension) {
        this.getInstance().register(extensionPointId, extension);
    };
    ExtensionStore.prototype.getExtensions = function (extensionPointId) {
        return (this.extensions[extensionPointId] || []);
    };
    ExtensionStore.getExtensions = function (extensionPointId) {
        return this.getInstance().getExtensions(extensionPointId);
    };
    ExtensionStore.getInstance = function () {
        if (!window.extensionStore) {
            window.extensionStore = new ExtensionStore();
        }
        return window.extensionStore;
    };
    return ExtensionStore;
}());
exports.ExtensionStore = ExtensionStore;
