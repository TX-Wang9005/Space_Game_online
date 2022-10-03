
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game4Object/coinManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNE9iamVjdFxcY29pbk1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscURBQWdEO0FBRTFDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBcUJDO1FBbkJXLGFBQU8sR0FBWSxJQUFJLENBQUM7O0lBbUJwQyxDQUFDO0lBakJHLDRCQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsMkJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsaUJBQWlCO0lBRWpCLG9DQUFjLEdBQWQsVUFBZSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUs7UUFDL0IsSUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxZQUFZLEVBQUM7WUFDaEMseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLHlCQUFlLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFwQmdCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FxQi9CO0lBQUQsa0JBQUM7Q0FyQkQsQUFxQkMsQ0FyQndDLEVBQUUsQ0FBQyxTQUFTLEdBcUJwRDtrQkFyQm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyQ29pbiBmcm9tIFwiLi9QbGF5ZXJDb2luXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlckNvaW4gZnJvbSBcIi4vR2FtZU1hbmFnZXJDb2luXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvaW5NYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIEdhbWVNZ3I6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLkdhbWVNZ3IgPSBjYy5maW5kKFwiR2FtZU1hbmFnZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuICAgIFxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpIHtcclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdDb2lucGxheWVyJyl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ29pbiEhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVNZ3IuZ2V0Q29tcG9uZW50KEdhbWVNYW5hZ2VyQ29pbikuVXBkYXRlQ29pbigxLCBvdGhlci5ub2RlLm5hbWUpO1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=