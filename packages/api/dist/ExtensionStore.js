"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExtensionStore = /** @class */ (function () {
    function ExtensionStore() {
        this.extensions = {};
        this.subscriptions = {};
    }
    ExtensionStore.prototype.register = function (extensionPointId, extension) {
        var extensions = this.extensions[extensionPointId] || [];
        extensions.push(extension);
        this.extensions[extensionPointId] = extensions;
        this.notify(extensionPointId);
    };
    ExtensionStore.prototype.getExtensions = function (extensionPointId) {
        return this.extensions[extensionPointId] || [];
    };
    ExtensionStore.getInstance = function () {
        if (!window.extensionStore) {
            window.extensionStore = new ExtensionStore();
        }
        return window.extensionStore;
    };
    ExtensionStore.prototype.subscribe = function (extensionPointId, callback) {
        var _this = this;
        var subscriptions = this.subscriptions[extensionPointId] || [];
        subscriptions.push(callback);
        this.subscriptions[extensionPointId] = subscriptions;
        return {
            unsubscribe: function () { return _this.unsubscribe(extensionPointId, callback); }
        };
    };
    ExtensionStore.prototype.notify = function (extensionPointId) {
        var _this = this;
        var subs = this.subscriptions[extensionPointId] || [];
        subs.forEach(function (cb) {
            cb(_this.getExtensions(extensionPointId));
        });
    };
    ExtensionStore.prototype.unsubscribe = function (extensionPointId, callback) {
        var subscriptions = this.subscriptions[extensionPointId] || [];
        this.subscriptions[extensionPointId] = subscriptions.filter(function (cb) { return cb != callback; });
    };
    return ExtensionStore;
}());
exports.ExtensionStore = ExtensionStore;
