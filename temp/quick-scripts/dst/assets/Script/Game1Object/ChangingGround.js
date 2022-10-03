
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game1Object/ChangingGround.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lMU9iamVjdFxcQ2hhbmdpbmdHcm91bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQXlEO0FBRW5ELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBdUdDO1FBbkdHLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLGtCQUFZLEdBQW1CLElBQUksQ0FBQztRQUVwQyxZQUFNLEdBQW1CLElBQUksQ0FBQztRQUU5QixZQUFNLEdBQW1CLElBQUksQ0FBQztRQUU5QixZQUFNLEdBQW1CLElBQUksQ0FBQztRQUU5QixZQUFNLEdBQW1CLElBQUksQ0FBQztRQUU5QixZQUFNLEdBQW1CLElBQUksQ0FBQztRQUt0QixlQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsZ0JBQVUsR0FBVyxHQUFHLENBQUM7O0lBNkVyQyxDQUFDO0lBM0VHLGVBQWU7SUFFZiw4QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFckQsa0RBQWtEO1FBQ2xELHlCQUF5QjtRQUN6Qix5SEFBeUg7UUFDekgsK0JBQStCO0lBQ25DLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsdUNBQWMsR0FBZCxV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O1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7a0RBQ0s7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztrREFDSztJQUU5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2tEQUNLO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7a0RBQ0s7SUFoQmIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXVHbEM7SUFBRCxxQkFBQztDQXZHRCxBQXVHQyxDQXZHMkMsRUFBRSxDQUFDLFNBQVMsR0F1R3ZEO2tCQXZHb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWFuYWdlclMxIGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclMxXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5naW5nR3JvdW5kIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2FtZU1hbmFnZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgRnJhbWVEZWZhdWx0OiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBGcmFtZTE6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIEZyYW1lMjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgRnJhbWUzOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBGcmFtZTQ6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIEZyYW1lNTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgU3ByaXRlQ29tcG9uZW50OiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIEdhbWVDb21wb25lbnQ6IEdhbWVNYW5hZ2VyUzE7XHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lc3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIG93bmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgZmFkZU91dHRpbWU6IG51bWJlciA9IDAuMDU7XHJcbiAgICBwcml2YXRlIGZhZGVJbnRpbWU6IG51bWJlciA9IDAuMjtcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5HYW1lQ29tcG9uZW50ID0gdGhpcy5nYW1lTWFuYWdlci5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTMSk7XHJcbiAgICAgICAgdGhpcy5TcHJpdGVDb21wb25lbnQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5TcHJpdGVDb21wb25lbnQuc3ByaXRlRnJhbWUpO1xyXG4gICAgICAgIHRoaXMuU3ByaXRlQ29tcG9uZW50LnNwcml0ZUZyYW1lID0gdGhpcy5GcmFtZURlZmF1bHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy5TcHJpdGVDb21wb25lbnQuc3ByaXRlRnJhbWUgPSB0aGlzLkZyYW1lMTtcclxuICAgICAgICAvLyBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgLy8gYWN0aW9uID0gY2Muc2VxdWVuY2UoY2MuZmFkZVRvKHRoaXMuZmFkZU91dHRpbWUsMCksIGNjLmZhZGVUbyh0aGlzLmZhZGVJbnRpbWUsNzUpLCBjYy5mYWRlVG8odGhpcy5mYWRlSW50aW1lKjEwLDE3NSkpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpe1xyXG4gICAgICAgIC8vIGlmKCF0aGlzLmdhbWVzdGFydCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBhY3Rpb246IGNjLkFjdGlvbjtcclxuICAgICAgICBhY3Rpb24gPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8odGhpcy5mYWRlT3V0dGltZSwwKSwgY2MuZmFkZVRvKHRoaXMuZmFkZUludGltZSw3NSksIGNjLmZhZGVUbyh0aGlzLmZhZGVJbnRpbWUqMTAsMTc1KSk7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyMVwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSgxLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWUxO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyMlwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSAyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSgyLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDI7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWUyO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyM1wiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSAzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSgzLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWUzO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyNFwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSA0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSg0LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWU0O1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyNVwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSA1KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSg1LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDU7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWU1O1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19