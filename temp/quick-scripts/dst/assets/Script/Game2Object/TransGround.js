
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game2Object/TransGround.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72c524ump5GL40PMpXA7hpe', 'TransGround');
// Script/Game2Object/TransGround.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var PlayerGhost_1 = require("./PlayerGhost");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TransGround = /** @class */ (function (_super) {
    __extends(TransGround, _super);
    function TransGround() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TransDir = 2; // 1up, 2down, 3left, 4right, 5rightdown, 6leftup.
        _this.TransSpeed = 150;
        _this.playerSpeed = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    TransGround.prototype.start = function () {
        this.playerSpeed = cc.find('Canvas/PlayerContainer/player1').getComponent(PlayerGhost_1.default).playerSpeed;
    };
    // update (dt) {}
    TransGround.prototype.onBeginContact = function (contact, self, other) {
        // console.log("TransGround");
        // console.log(other.node.group)
        if (other.node.group == 'player') {
            console.log("TransGroundPP Pspeed", this.playerSpeed);
            other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            var p = other.node.getComponent(PlayerGhost_1.default);
            p.playerSpeed = this.TransSpeed;
            p.moveableKey = false;
            if (this.TransDir == 1) {
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,this.TransSpeed);
                p.moveDirX_firebase = 0;
                p.moveDirY_firebase = 1;
            }
            else if (this.TransDir == 2) {
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,-this.TransSpeed);
                p.moveDirX_firebase = 0;
                p.moveDirY_firebase = -1;
            }
            else if (this.TransDir == 3) {
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.TransSpeed,0);
                p.moveDirX_firebase = -1;
                p.moveDirY_firebase = 0;
            }
            else if (this.TransDir == 4) {
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.TransSpeed,0);
                p.moveDirX_firebase = 1;
                p.moveDirY_firebase = 0;
            }
            else if (this.TransDir == 5) {
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.TransSpeed, -this.TransSpeed);
                p.playerSpeed = this.TransSpeed * 1.4;
                p.moveDirX_firebase = 1;
                p.moveDirY_firebase = -1;
            }
            else if (this.TransDir == 6) {
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.TransSpeed, this.TransSpeed);
                p.playerSpeed = this.TransSpeed * 1.4;
                p.moveDirX_firebase = -1;
                p.moveDirY_firebase = 1;
            }
        }
    };
    // onPreSolve(contact, self, other){
    //     if(other.node.group == "player1" || other.node.group == 'ghost'){
    //         console.log("TransGround");
    //         let x = other.node.getComponent(cc.RigidBody).linearVelocity.x;
    //         let y = other.node.getComponent(cc.RigidBody).linearVelocity.y;
    //         if(this.TransDir == 1){
    //             other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(x,this.TransSpeed);
    //         }else if(this.TransDir == 2){
    //             other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(x,-this.TransSpeed);
    //         }else if(this.TransDir == 3){
    //             other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.TransSpeed,y);
    //         }else if(this.TransDir == 4){
    //             other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.TransSpeed,y);
    //         }
    //     }
    // }
    TransGround.prototype.onEndContact = function (contact, self, other) {
        if (other.node.group == "player") {
            console.log("TransGroundEE");
            // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);            
            var p = other.node.getComponent(PlayerGhost_1.default);
            p.moveableKey = true;
            p.moveDirX_firebase = 0;
            p.moveDirY_firebase = 0;
            p.playerSpeed = this.playerSpeed;
        }
    };
    __decorate([
        property()
    ], TransGround.prototype, "TransDir", void 0);
    __decorate([
        property()
    ], TransGround.prototype, "TransSpeed", void 0);
    TransGround = __decorate([
        ccclass
    ], TransGround);
    return TransGround;
}(cc.Component));
exports.default = TransGround;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lMk9iamVjdFxcVHJhbnNHcm91bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNkNBQXdDO0FBRWxDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBc0ZDO1FBbkZHLGNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQyxrREFBa0Q7UUFHeEUsZ0JBQVUsR0FBVyxHQUFHLENBQUM7UUFFakIsaUJBQVcsR0FBVyxDQUFDLENBQUM7O0lBOEVwQyxDQUFDO0lBM0VHLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYsMkJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsV0FBVyxDQUFDO0lBRXZHLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsb0NBQWMsR0FBZCxVQUFlLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSztRQUMvQiw4QkFBOEI7UUFDOUIsZ0NBQWdDO1FBQ2hDLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFDO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEUs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VyxDQXNGL0I7SUFBRCxrQkFBQztDQXRGRCxBQXNGQyxDQXRGd0MsRUFBRSxDQUFDLFNBQVMsR0FzRnBEO2tCQXRGb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBQbGF5ZXJHaG9zdCBmcm9tIFwiLi9QbGF5ZXJHaG9zdFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFuc0dyb3VuZCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIFRyYW5zRGlyOiBudW1iZXIgPSAyOyAvLyAxdXAsIDJkb3duLCAzbGVmdCwgNHJpZ2h0LCA1cmlnaHRkb3duLCA2bGVmdHVwLlxyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBUcmFuc1NwZWVkOiBudW1iZXIgPSAxNTA7XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJTcGVlZDogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyU3BlZWQgPSBjYy5maW5kKCdDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjEnKS5nZXRDb21wb25lbnQoUGxheWVyR2hvc3QpLnBsYXllclNwZWVkO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVHJhbnNHcm91bmRcIik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cob3RoZXIubm9kZS5ncm91cClcclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdwbGF5ZXInKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUcmFuc0dyb3VuZFBQIFBzcGVlZFwiLCB0aGlzLnBsYXllclNwZWVkKTtcclxuICAgICAgICAgICAgb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsMCk7XHJcbiAgICAgICAgICAgIGxldCBwID0gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoUGxheWVyR2hvc3QpO1xyXG4gICAgICAgICAgICBwLnBsYXllclNwZWVkID0gdGhpcy5UcmFuc1NwZWVkO1xyXG4gICAgICAgICAgICBwLm1vdmVhYmxlS2V5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVHJhbnNEaXIgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCx0aGlzLlRyYW5zU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgcC5tb3ZlRGlyWF9maXJlYmFzZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBwLm1vdmVEaXJZX2ZpcmViYXNlID0gMTtcclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5UcmFuc0RpciA9PSAyKXtcclxuICAgICAgICAgICAgICAgIC8vIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLC10aGlzLlRyYW5zU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgcC5tb3ZlRGlyWF9maXJlYmFzZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBwLm1vdmVEaXJZX2ZpcmViYXNlID0gLTE7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuVHJhbnNEaXIgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoLXRoaXMuVHJhbnNTcGVlZCwwKTtcclxuICAgICAgICAgICAgICAgIHAubW92ZURpclhfZmlyZWJhc2UgPSAtMTtcclxuICAgICAgICAgICAgICAgIHAubW92ZURpcllfZmlyZWJhc2UgPSAwO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlRyYW5zRGlyID09IDQpe1xyXG4gICAgICAgICAgICAgICAgLy8gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHRoaXMuVHJhbnNTcGVlZCwwKTtcclxuICAgICAgICAgICAgICAgIHAubW92ZURpclhfZmlyZWJhc2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgcC5tb3ZlRGlyWV9maXJlYmFzZSA9IDA7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuVHJhbnNEaXIgPT0gNSl7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIodGhpcy5UcmFuc1NwZWVkLCAtdGhpcy5UcmFuc1NwZWVkKTtcclxuICAgICAgICAgICAgICAgIHAucGxheWVyU3BlZWQgPSB0aGlzLlRyYW5zU3BlZWQqMS40O1xyXG4gICAgICAgICAgICAgICAgcC5tb3ZlRGlyWF9maXJlYmFzZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBwLm1vdmVEaXJZX2ZpcmViYXNlID0gLTE7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuVHJhbnNEaXIgPT0gNil7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoLXRoaXMuVHJhbnNTcGVlZCwgdGhpcy5UcmFuc1NwZWVkKTtcclxuICAgICAgICAgICAgICAgIHAucGxheWVyU3BlZWQgPSB0aGlzLlRyYW5zU3BlZWQqMS40O1xyXG4gICAgICAgICAgICAgICAgcC5tb3ZlRGlyWF9maXJlYmFzZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgcC5tb3ZlRGlyWV9maXJlYmFzZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBvblByZVNvbHZlKGNvbnRhY3QsIHNlbGYsIG90aGVyKXtcclxuICAgIC8vICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09IFwicGxheWVyMVwiIHx8IG90aGVyLm5vZGUuZ3JvdXAgPT0gJ2dob3N0Jyl7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiVHJhbnNHcm91bmRcIik7XHJcbiAgICAvLyAgICAgICAgIGxldCB4ID0gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eS54O1xyXG4gICAgLy8gICAgICAgICBsZXQgeSA9IG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkueTtcclxuICAgIC8vICAgICAgICAgaWYodGhpcy5UcmFuc0RpciA9PSAxKXtcclxuICAgIC8vICAgICAgICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih4LHRoaXMuVHJhbnNTcGVlZCk7XHJcbiAgICAvLyAgICAgICAgIH1lbHNlIGlmKHRoaXMuVHJhbnNEaXIgPT0gMil7XHJcbiAgICAvLyAgICAgICAgICAgICBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoeCwtdGhpcy5UcmFuc1NwZWVkKTtcclxuICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy5UcmFuc0RpciA9PSAzKXtcclxuICAgIC8vICAgICAgICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52MigtdGhpcy5UcmFuc1NwZWVkLHkpO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLlRyYW5zRGlyID09IDQpe1xyXG4gICAgLy8gICAgICAgICAgICAgb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHRoaXMuVHJhbnNTcGVlZCx5KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIG9uRW5kQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcil7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSBcInBsYXllclwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUcmFuc0dyb3VuZEVFXCIpO1xyXG4gICAgICAgICAgICAvLyBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgMCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBwID0gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoUGxheWVyR2hvc3QpO1xyXG4gICAgICAgICAgICBwLm1vdmVhYmxlS2V5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgcC5tb3ZlRGlyWF9maXJlYmFzZSA9IDA7XHJcbiAgICAgICAgICAgIHAubW92ZURpcllfZmlyZWJhc2UgPSAwO1xyXG4gICAgICAgICAgICBwLnBsYXllclNwZWVkID0gdGhpcy5wbGF5ZXJTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19