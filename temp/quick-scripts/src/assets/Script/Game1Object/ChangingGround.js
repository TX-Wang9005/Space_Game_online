"use strict";
cc._RF.push(module, '08d59k9OzlBQr8ORl+4+7CF', 'ChangingGround');
// Script/Game1Object/ChangingGround.ts

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
var GameManagerS1_1 = require("../GameManager/GameManagerS1");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChangingGround = /** @class */ (function (_super) {
    __extends(ChangingGround, _super);
    function ChangingGround() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameManager = null;
        _this.FrameDefault = null;
        _this.Frame1 = null;
        _this.Frame2 = null;
        _this.Frame3 = null;
        _this.Frame4 = null;
        _this.Frame5 = null;
        _this.gamestart = false;
        _this.owner = 0;
        _this.fadeOuttime = 0.05;
        _this.fadeIntime = 0.2;
        return _this;
    }
    // onLoad () {}
    ChangingGround.prototype.start = function () {
        this.GameComponent = this.gameManager.getComponent(GameManagerS1_1.default);
        this.SpriteComponent = this.node.getComponent(cc.Sprite);
        // console.log(this.SpriteComponent.spriteFrame);
        this.SpriteComponent.spriteFrame = this.FrameDefault;
        // this.SpriteComponent.spriteFrame = this.Frame1;
        // let action: cc.Action;
        // action = cc.sequence(cc.fadeTo(this.fadeOuttime,0), cc.fadeTo(this.fadeIntime,75), cc.fadeTo(this.fadeIntime*10,175));
        // this.node.runAction(action);
    };
    // update (dt) {}
    ChangingGround.prototype.onBeginContact = function (contact, self, other) {
        var _this = this;
        // if(!this.gamestart) return;
        var action;
        action = cc.sequence(cc.fadeTo(this.fadeOuttime, 0), cc.fadeTo(this.fadeIntime, 75), cc.fadeTo(this.fadeIntime * 10, 175));
        if (other.node.name == "player1") {
            if (this.owner != 1) {
                this.node.runAction(action);
                this.GameComponent.UpdateScore(1, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 1;
            this.scheduleOnce(function () {
                _this.SpriteComponent.spriteFrame = _this.Frame1;
            }, this.fadeOuttime);
        }
        else if (other.node.name == "player2") {
            if (this.owner != 2) {
                this.node.runAction(action);
                this.GameComponent.UpdateScore(2, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 2;
            this.scheduleOnce(function () {
                _this.SpriteComponent.spriteFrame = _this.Frame2;
            }, this.fadeOuttime);
        }
        else if (other.node.name == "player3") {
            if (this.owner != 3) {
                this.node.runAction(action);
                this.GameComponent.UpdateScore(3, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 3;
            this.scheduleOnce(function () {
                _this.SpriteComponent.spriteFrame = _this.Frame3;
            }, this.fadeOuttime);
        }
        else if (other.node.name == "player4") {
            if (this.owner != 4) {
                this.node.runAction(action);
                this.GameComponent.UpdateScore(4, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 4;
            this.scheduleOnce(function () {
                _this.SpriteComponent.spriteFrame = _this.Frame4;
            }, this.fadeOuttime);
        }
        else if (other.node.name == "player5") {
            if (this.owner != 5) {
                this.node.runAction(action);
                this.GameComponent.UpdateScore(5, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 5;
            this.scheduleOnce(function () {
                _this.SpriteComponent.spriteFrame = _this.Frame5;
            }, this.fadeOuttime);
        }
    };
    __decorate([
        property(cc.Node)
    ], ChangingGround.prototype, "gameManager", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChangingGround.prototype, "FrameDefault", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChangingGround.prototype, "Frame1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChangingGround.prototype, "Frame2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChangingGround.prototype, "Frame3", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChangingGround.prototype, "Frame4", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ChangingGround.prototype, "Frame5", void 0);
    ChangingGround = __decorate([
        ccclass
    ], ChangingGround);
    return ChangingGround;
}(cc.Component));
exports.default = ChangingGround;

cc._RF.pop();