"use strict";
cc._RF.push(module, '93a4esQ/+xNNb2jcm9lfygB', 'coinManager');
// Script/Game4Object/coinManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameManagerCoin_1 = require("./GameManagerCoin");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CoinManager = /** @class */ (function (_super) {
    __extends(CoinManager, _super);
    function CoinManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.GameMgr = null;
        return _this;
    }
    CoinManager.prototype.onLoad = function () {
    };
    CoinManager.prototype.start = function () {
        this.GameMgr = cc.find("GameManager");
    };
    // update (dt) {}
    CoinManager.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.group == 'Coinplayer') {
            // console.log("Coin!!");
            this.GameMgr.getComponent(GameManagerCoin_1.default).UpdateCoin(1, other.node.name);
            self.node.destroy();
        }
    };
    CoinManager = __decorate([
        ccclass
    ], CoinManager);
    return CoinManager;
}(cc.Component));
exports.default = CoinManager;

cc._RF.pop();