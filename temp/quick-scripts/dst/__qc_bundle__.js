
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/CameraManager');
require('./assets/Script/Game1Object/ChangingGround');
require('./assets/Script/Game2Object/PlayerGhost');
require('./assets/Script/Game2Object/TransGround');
require('./assets/Script/Game4Object/GameManagerCoin');
require('./assets/Script/Game4Object/PlayerCoin');
require('./assets/Script/Game4Object/coinManager');
require('./assets/Script/Game5Object/Mine_info_choice');
require('./assets/Script/Game5Object/TranGround_special');
require('./assets/Script/Game5Object/battle_field');
require('./assets/Script/Game5Object/fight_forum');
require('./assets/Script/Game5Object/fight_pressed');
require('./assets/Script/Game5Object/opponent_betting_update');
require('./assets/Script/Game5Object/panel_info');
require('./assets/Script/Game5Object/special_player');
require('./assets/Script/Game5Object/utility');
require('./assets/Script/GameEnd/GameEndManager');
require('./assets/Script/GameManager/GameManagerS1');
require('./assets/Script/GameManager/GameManagerS2');
require('./assets/Script/GameManager/GameManagerS3');
require('./assets/Script/GameManager/GameManagerS4');
require('./assets/Script/GameManager/GameManagerS5');
require('./assets/Script/InteractWall');
require('./assets/Script/LobbyManager');
require('./assets/Script/Player');
require('./assets/Script/UImanager');
require('./assets/Script/computer');
require('./assets/Script/computerRule');
require('./assets/Script/log');
require('./assets/Script/ready_to_S1');
require('./assets/Script/switching_from_waiting');

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/UImanager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '06f3beiKxNEvbWf347dvoGP', 'UImanager');
// Script/UImanager.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UImanager = /** @class */ (function (_super) {
    __extends(UImanager, _super);
    function UImanager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.FollowTarget = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    UImanager.prototype.start = function () {
    };
    UImanager.prototype.update = function (dt) {
        if (this.FollowTarget) {
            this.node.setPosition(this.FollowTarget.position.x, this.FollowTarget.position.y);
        }
    };
    __decorate([
        property(cc.Node)
    ], UImanager.prototype, "FollowTarget", void 0);
    UImanager = __decorate([
        ccclass
    ], UImanager);
    return UImanager;
}(cc.Component));
exports.default = UImanager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUFxQkM7UUFsQkcsa0JBQVksR0FBWSxJQUFJLENBQUM7O0lBa0JqQyxDQUFDO0lBZEcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix5QkFBSyxHQUFMO0lBR0EsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBUSxFQUFFO1FBQ04sSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRjtJQUNMLENBQUM7SUFqQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDVztJQUhaLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FxQjdCO0lBQUQsZ0JBQUM7Q0FyQkQsQUFxQkMsQ0FyQnNDLEVBQUUsQ0FBQyxTQUFTLEdBcUJsRDtrQkFyQm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJbWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBGb2xsb3dUYXJnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZih0aGlzLkZvbGxvd1RhcmdldCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLkZvbGxvd1RhcmdldC5wb3NpdGlvbi54LCB0aGlzLkZvbGxvd1RhcmdldC5wb3NpdGlvbi55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lMU9iamVjdFxcQ2hhbmdpbmdHcm91bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQXlEO0FBRW5ELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBdUdDO1FBbkdHLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLGtCQUFZLEdBQW1CLElBQUksQ0FBQztRQUVwQyxZQUFNLEdBQW1CLElBQUksQ0FBQztRQUU5QixZQUFNLEdBQW1CLElBQUksQ0FBQztRQUU5QixZQUFNLEdBQW1CLElBQUksQ0FBQztRQUU5QixZQUFNLEdBQW1CLElBQUksQ0FBQztRQUU5QixZQUFNLEdBQW1CLElBQUksQ0FBQztRQUt0QixlQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsZ0JBQVUsR0FBVyxHQUFHLENBQUM7O0lBNkVyQyxDQUFDO0lBM0VHLGVBQWU7SUFFZiw4QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFckQsa0RBQWtEO1FBQ2xELHlCQUF5QjtRQUN6Qix5SEFBeUg7UUFDekgsK0JBQStCO0lBQ25DLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsdUNBQWMsR0FBZCxVQUFlLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSztRQUFuQyxpQkEyREM7UUExREcsOEJBQThCO1FBQzlCLElBQUksTUFBaUIsQ0FBQztRQUN0QixNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0SCxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztZQUM1QixJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBQ25ELENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FFeEI7YUFBSyxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztZQUNsQyxJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBQ25ELENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FFeEI7YUFBSyxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztZQUNsQyxJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBQ25ELENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FFeEI7YUFBSyxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztZQUNsQyxJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBQ25ELENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FFeEI7YUFBSyxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztZQUNsQyxJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBQ25ELENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBbEdEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1U7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt3REFDVztJQUVwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2tEQUNLO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7a0RBQ0s7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztrREFDSztJQUU5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2tEQUNLO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7a0RBQ0s7SUFoQmIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXVHbEM7SUFBRCxxQkFBQztDQXZHRCxBQXVHQyxDQXZHMkMsRUFBRSxDQUFDLFNBQVMsR0F1R3ZEO2tCQXZHb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWFuYWdlclMxIGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclMxXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5naW5nR3JvdW5kIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2FtZU1hbmFnZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgRnJhbWVEZWZhdWx0OiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBGcmFtZTE6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIEZyYW1lMjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgRnJhbWUzOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBGcmFtZTQ6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIEZyYW1lNTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgU3ByaXRlQ29tcG9uZW50OiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIEdhbWVDb21wb25lbnQ6IEdhbWVNYW5hZ2VyUzE7XHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lc3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIG93bmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgZmFkZU91dHRpbWU6IG51bWJlciA9IDAuMDU7XHJcbiAgICBwcml2YXRlIGZhZGVJbnRpbWU6IG51bWJlciA9IDAuMjtcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5HYW1lQ29tcG9uZW50ID0gdGhpcy5nYW1lTWFuYWdlci5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTMSk7XHJcbiAgICAgICAgdGhpcy5TcHJpdGVDb21wb25lbnQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5TcHJpdGVDb21wb25lbnQuc3ByaXRlRnJhbWUpO1xyXG4gICAgICAgIHRoaXMuU3ByaXRlQ29tcG9uZW50LnNwcml0ZUZyYW1lID0gdGhpcy5GcmFtZURlZmF1bHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy5TcHJpdGVDb21wb25lbnQuc3ByaXRlRnJhbWUgPSB0aGlzLkZyYW1lMTtcclxuICAgICAgICAvLyBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgLy8gYWN0aW9uID0gY2Muc2VxdWVuY2UoY2MuZmFkZVRvKHRoaXMuZmFkZU91dHRpbWUsMCksIGNjLmZhZGVUbyh0aGlzLmZhZGVJbnRpbWUsNzUpLCBjYy5mYWRlVG8odGhpcy5mYWRlSW50aW1lKjEwLDE3NSkpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpe1xyXG4gICAgICAgIC8vIGlmKCF0aGlzLmdhbWVzdGFydCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBhY3Rpb246IGNjLkFjdGlvbjtcclxuICAgICAgICBhY3Rpb24gPSBjYy5zZXF1ZW5jZShjYy5mYWRlVG8odGhpcy5mYWRlT3V0dGltZSwwKSwgY2MuZmFkZVRvKHRoaXMuZmFkZUludGltZSw3NSksIGNjLmZhZGVUbyh0aGlzLmZhZGVJbnRpbWUqMTAsMTc1KSk7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyMVwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSgxLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWUxO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyMlwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSAyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSgyLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDI7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWUyO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyM1wiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSAzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSgzLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWUzO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyNFwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSA0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSg0LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWU0O1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyNVwiKXtcclxuICAgICAgICAgICAgaWYodGhpcy5vd25lciAhPSA1KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSg1LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZUNvbXBvbmVudC5VcGRhdGVTY29yZSh0aGlzLm93bmVyLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vd25lciA9IDU7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNwcml0ZUNvbXBvbmVudC5zcHJpdGVGcmFtZSA9IHRoaXMuRnJhbWU1O1xyXG4gICAgICAgICAgICB9LCB0aGlzLmZhZGVPdXR0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game4Object/PlayerCoin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c43a9+T15Fk50eX6agL4zg', 'PlayerCoin');
// Script/Game4Object/PlayerCoin.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var CameraManager_1 = require("../CameraManager");
var GameManagerCoin_1 = require("./GameManagerCoin");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayerCoin = /** @class */ (function (_super) {
    __extends(PlayerCoin, _super);
    function PlayerCoin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerSpeed = 0;
        _this.GameMgr = null;
        _this.child_node = null;
        _this.child_label = null;
        _this.current_user_number = 0;
        _this.rigidbody = null;
        _this.child_anim = null;
        _this.leftDown = false;
        _this.rightDown = false;
        _this.upDown = false;
        _this.downDown = false;
        _this.premoveDirX = 0;
        _this.moveDirX = 0;
        _this.moveDirY = 0;
        _this.premoveDirX_firebase = 0;
        _this.moveDirX_firebase = 0;
        _this.moveDirY_firebase = 0;
        _this.logged_in_or_not = false;
        _this.moveable = true;
        _this.moveableKey = true;
        return _this;
        // onEndContact(contact, self, other){
        //     if(other.node.group == "Cointhief"){
        //         console.log("EndContact on Cointhief", other.node.name);            
        //     }
        // }
    }
    PlayerCoin.prototype.onLoad = function () {
        var _this = this;
        var handle = this;
        // 每個player node都會對應一個user
        var name = this.node.name;
        var user = firebase.auth().currentUser.uid;
        this.current_user = user;
        firebase.database().ref("player_data/" + name).once('value', function (snapshot) {
            handle.permited_user = snapshot.val().uid;
            if (snapshot.val() != null) {
                // console.log('fuck im innnnnnnnnnnnnnnnnnn')
                handle.node.active = true;
                handle.logged_in_or_not = true;
            }
            if (user == handle.permited_user) {
                firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/moveable").set({ moveable: "true" });
                firebase.database().ref("player_data/" + name + "/state_value/moveableKey").set({ moveableKey: "true" });
                firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: 0 });
                // firebase.database().ref(`player_data/${name}/state_value/IsLogin`).set({ bool: true })
            }
        });
        this.scheduleOnce(function () {
            _this.this_node_user = handle.permited_user;
            console.log("nodeuser:", _this.node.name, _this.this_node_user);
            console.log("currentuser:", _this.current_user);
            if (_this.current_user == _this.this_node_user)
                cc.find("Canvas/Main Camera").getComponent(CameraManager_1.default).FollowTarget = _this.node;
        }, 0.5);
        // 取得現在玩家編號 current_user_number
        var uid = firebase.auth().currentUser.uid;
        var t = this;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                t.current_user_number = snapshot.val().player_number;
                console.log("Game Coin current_user_number is ", t.current_user_number);
            }
        });
    };
    PlayerCoin.prototype.start = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.child_node = this.node.getChildByName(this.node.name);
        this.child_label = this.node.getChildByName('Label'); // 玩家名稱
        this.child_anim = this.child_node.getComponent(cc.Animation);
        this.child_anim.play('Idle');
        this.schedule(this.updateOthersCurrentPos, 1);
        this.schedule(this.UpdateGroup, 0.5);
        this.GameMgr = cc.find("GameManager");
    };
    PlayerCoin.prototype.update = function (dt) {
        var _this = this;
        //if the player is logged now we active the node 
        if (!this.logged_in_or_not) {
            var handle_1 = this;
            firebase.database().ref("player_data/" + this.node.name).once('value', function (snaphot) {
                if (snaphot.val() != null) {
                    handle_1.node.active = true;
                }
            });
        }
        // firebase
        var name = this.node.name;
        var DirX = this.moveDirX_firebase;
        var DirY = this.moveDirY_firebase;
        var preDirX = this.premoveDirX_firebase;
        var posX = this.node.position.x;
        var posY = this.node.position.y;
        // write firebase realtime database
        if (this.current_user == this.this_node_user) {
            firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: DirX });
            firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: DirY });
            firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: preDirX });
            firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: posX });
            firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: posY });
        }
        // read firebase realtime database
        DirX = 0, DirY = 0, preDirX = 0;
        firebase.database().ref("player_data/" + name + "/state_value").once('value', function (snapshot) {
            if (snapshot.val() != null) {
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                preDirX = snapshot.val().premoveDirX.Dir;
            }
        });
        this.scheduleOnce(function () {
            _this.moveDirX = DirX;
            _this.moveDirY = DirY;
            _this.premoveDirX = preDirX;
        }, 0.2);
        // Scale
        this.child_node.scaleX = (this.moveDirX >= 0) ? 1 : -1;
        if (this.moveDirX == 0)
            this.child_node.scaleX = (this.premoveDirX >= 0) ? 1 : -1;
        // Move
        if (this.moveDirX == 0) {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(0, this.playerSpeed * this.moveDirY);
        }
        else if (this.moveDirY == 0) {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX, 0);
        }
        else {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX * 0.7, this.playerSpeed * this.moveDirY * 0.7);
        }
        // Animation
        if ((this.moveDirX == 0 && this.moveDirY == 0) || !this.moveable) {
            if (!this.child_anim.getAnimationState('Idle').isPlaying)
                this.child_anim.play('Idle');
        }
        else {
            if (!this.child_anim.getAnimationState('Move').isPlaying)
                this.child_anim.play('Move');
        }
    };
    PlayerCoin.prototype.onKeyDown = function (event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.q:
                this.Killothers();
                break;
            case cc.macro.KEY.a:
                this.leftDown = true;
                this.playerMoveX(-1);
                break;
            case cc.macro.KEY.d:
                this.rightDown = true;
                this.playerMoveX(1);
                break;
            case cc.macro.KEY.w:
                this.upDown = true;
                this.playerMoveY(1);
                break;
            case cc.macro.KEY.s:
                this.downDown = true;
                this.playerMoveY(-1);
                break;
        }
    };
    PlayerCoin.prototype.onKeyUp = function (event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = false;
                if (this.rightDown)
                    this.playerMoveX(1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.d:
                this.rightDown = false;
                if (this.leftDown)
                    this.playerMoveX(-1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.w:
                this.upDown = false;
                if (this.downDown)
                    this.playerMoveY(-1);
                else
                    this.playerMoveY(0);
                break;
            case cc.macro.KEY.s:
                this.downDown = false;
                if (this.upDown)
                    this.playerMoveY(1);
                else
                    this.playerMoveY(0);
                break;
        }
    };
    PlayerCoin.prototype.playerMoveX = function (moveDirX) {
        if (this.current_user != this.this_node_user)
            return;
        if (!this.moveableKey)
            return;
        this.premoveDirX_firebase = this.moveDirX_firebase;
        this.moveDirX_firebase = moveDirX;
    };
    PlayerCoin.prototype.playerMoveY = function (moveDirY) {
        if (this.current_user != this.this_node_user)
            return;
        if (!this.moveableKey)
            return;
        this.moveDirY_firebase = moveDirY;
    };
    PlayerCoin.prototype.updateOthersCurrentPos = function () {
        var _this = this;
        if (this.current_user == this.this_node_user)
            return; // 不更新自己的node
        var name = this.node.name;
        // console.log("refresh Pos:", name);
        var posX = -1487, DirX;
        var posY = -1487, DirY;
        // let IsLogin: boolean;
        firebase.database().ref("player_data/" + name + "/state_value").once('value', function (snapshot) {
            if (snapshot.val() != null) {
                posX = snapshot.val().X.x;
                posY = snapshot.val().Y.y;
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                // IsLogin = snapshot.val().IsLogin.bool;
            }
        });
        this.scheduleOnce(function () {
            if (posX == -1487 && posY == -1487)
                return; // 如果firebase database沒有抓到資料，就不要更新。
            var action;
            action = cc.moveTo(0.5, posX, posY); // 修正並平滑移動到正確位置
            if (Math.abs(_this.node.position.x - posX) > 256 || Math.abs(_this.node.position.y - posY) > 256) { // 如果位置差太多就直接閃現。(256為8格)
                _this.node.setPosition(posX, posY);
            }
            _this.node.runAction(action);
        }, 0.20);
    };
    PlayerCoin.prototype.UpdateGroup = function () {
        var t = this;
        firebase.database().ref("GameCoin/" + t.node.name).once('value', function (snapshot) {
            if (snapshot.val().state == "player") {
                if (t.node.group != "Coinplayer") {
                    console.log("changeGroup to player");
                    t.node.group = "Coinplayer";
                    t.node.active = false;
                    t.node.active = true;
                    t.node.getChildByName("C").active = false;
                }
            }
            else if (snapshot.val().state == "thief") {
                if (t.node.group != "Cointhief") {
                    console.log("changeGroup to thief");
                    t.node.group = "Cointhief";
                    t.node.active = false;
                    t.node.active = true;
                    t.node.getChildByName("C").active = true;
                }
            }
        });
    };
    PlayerCoin.prototype.Killothers = function () {
        if (this.this_node_user != this.current_user)
            return;
        // console.log("player", this.current_user_number, "want to kill !!!");
        this.GameMgr.getComponent(GameManagerCoin_1.default).BecomeThief(this.node.name);
    };
    PlayerCoin.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.group == "Cointhief") {
            console.log("BeginContact on Cointhief", other.node.name);
            var current_c_1 = this.GameMgr.getComponent(GameManagerCoin_1.default).current_coin;
            this.GameMgr.getComponent(GameManagerCoin_1.default).playerDie(this.node.name);
            // firebase
            var str = "player" + this.current_user_number;
            if (self.node.name == str) {
                var t = this;
                firebase.database().ref("GameCoin/" + other.node.name).once('value', function (snaphot) {
                    var c = snaphot.val().coin;
                    firebase.database().ref("GameCoin/" + other.node.name).update({ coin: c + current_c_1 });
                });
            }
        }
    };
    __decorate([
        property()
    ], PlayerCoin.prototype, "playerSpeed", void 0);
    PlayerCoin = __decorate([
        ccclass
    ], PlayerCoin);
    return PlayerCoin;
}(cc.Component));
exports.default = PlayerCoin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNE9iamVjdFxcUGxheWVyQ29pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixrREFBNkM7QUFDN0MscURBQWdEO0FBRTFDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBMlNDO1FBdlNHLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRWhCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFeEIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFLNUIseUJBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBRXhDLGVBQVMsR0FBaUIsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFVLEdBQWlCLElBQUksQ0FBQztRQUloQyxjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGlCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsMEJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0Qix1QkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsc0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsaUJBQVcsR0FBWSxJQUFJLENBQUM7O1FBcVE1QixzQ0FBc0M7UUFDdEMsMkNBQTJDO1FBQzNDLCtFQUErRTtRQUMvRSxRQUFRO1FBQ1IsSUFBSTtJQUNSLENBQUM7SUF0UUcsMkJBQU0sR0FBTjtRQUFBLGlCQXlDQztRQXhDRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbEIsMEJBQTBCO1FBQzFCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXpCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLFFBQVE7WUFDM0UsTUFBTSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQzFDLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDeEIsOENBQThDO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7YUFDbEM7WUFDRCxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO2dCQUM5QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksMEJBQXVCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDbkYsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLDBCQUF1QixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ25GLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSwwQkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO2dCQUM3RixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksNkJBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtnQkFDbkcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLDZCQUEwQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ3RGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSxtQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUMxRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksbUJBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDMUUseUZBQXlGO2FBQzVGO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsSUFBSSxLQUFJLENBQUMsWUFBWSxJQUFJLEtBQUksQ0FBQyxjQUFjO2dCQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNSLCtCQUErQjtRQUMvQixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDYixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWEsR0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLFFBQVE7WUFDeEUsSUFBRyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxFQUFDO2dCQUN0QixDQUFDLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUMzRTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDBCQUFLLEdBQUw7UUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU87UUFDN0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsMkJBQU0sR0FBTixVQUFPLEVBQUU7UUFBVCxpQkE0REM7UUEzREcsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEIsSUFBSSxRQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsT0FBTztnQkFDcEYsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUN2QixRQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQzdCO1lBQ0wsQ0FBQyxDQUFDLENBQUE7U0FDTDtRQUVELFdBQVc7UUFDWCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLG1DQUFtQztRQUNuQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksMEJBQXVCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN0RixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksMEJBQXVCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN0RixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksNkJBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtZQUM1RixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksbUJBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUM3RSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksbUJBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtTQUNoRjtRQUNELGtDQUFrQztRQUNsQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksaUJBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ3ZGLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDeEIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBQ25DLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQzthQUM1QztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQy9CLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVSLFFBQVE7UUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUM7WUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEYsT0FBTztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUU7WUFDcEIsSUFBRyxJQUFJLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoRzthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUU7WUFDM0IsSUFBRyxJQUFJLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoRzthQUFNO1lBQ0gsSUFBRyxJQUFJLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQzNJO1FBRUQsWUFBWTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTO2dCQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFGO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTO2dCQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFGO0lBQ0wsQ0FBQztJQUVELDhCQUFTLEdBQVQsVUFBVSxLQUFLO1FBQ1gseUNBQXlDO1FBQ3pDLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNuQixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixNQUFNO1lBQ1YsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUNELDRCQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1QseUNBQXlDO1FBQ3pDLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNuQixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLFNBQVM7b0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7b0JBRXBCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVE7b0JBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztvQkFFckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUTtvQkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1YsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNO29CQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUVwQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBQ0QsZ0NBQVcsR0FBWCxVQUFZLFFBQWdCO1FBQ3hCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU87UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ25ELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUNELGdDQUFXLEdBQVgsVUFBWSxRQUFnQjtRQUN4QixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsMkNBQXNCLEdBQXRCO1FBQUEsaUJBeUJDO1FBeEJHLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU8sQ0FBQyxhQUFhO1FBQ25FLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLHFDQUFxQztRQUNyQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7UUFDdkIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQ3ZCLHdCQUF3QjtRQUN4QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksaUJBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ3ZGLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDeEIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDbkMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUNuQyx5Q0FBeUM7YUFDNUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU8sQ0FBQyxtQ0FBbUM7WUFDL0UsSUFBSSxNQUFpQixDQUFDO1lBQ3RCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlO1lBQ3BELElBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFDLEdBQUcsRUFBQyxFQUFFLHdCQUF3QjtnQkFDNUcsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELGdDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDYixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUMvRSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFDO2dCQUNqQyxJQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFlBQVksRUFBQztvQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO29CQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7b0JBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUM3QzthQUNKO2lCQUFLLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssSUFBSSxPQUFPLEVBQUM7Z0JBQ3RDLElBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksV0FBVyxFQUFDO29CQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQzVDO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCwrQkFBVSxHQUFWO1FBQ0ksSUFBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUNwRCx1RUFBdUU7UUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMseUJBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFDRCxtQ0FBYyxHQUFkLFVBQWUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLO1FBQy9CLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksV0FBVyxFQUFDO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRCxJQUFJLFdBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyx5QkFBZSxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLHlCQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRSxXQUFXO1lBQ1gsSUFBSSxHQUFHLEdBQUcsUUFBUSxHQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUM1QyxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNiLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBWSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBUyxPQUFPO29CQUNqRixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUMzQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQVksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFDLFdBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pGLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFqU0Q7UUFEQyxRQUFRLEVBQUU7bURBQ2E7SUFKUCxVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMlM5QjtJQUFELGlCQUFDO0NBM1NELEFBMlNDLENBM1N1QyxFQUFFLENBQUMsU0FBUyxHQTJTbkQ7a0JBM1NvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgQ2FtZXJhTWFuYWdlciBmcm9tIFwiLi4vQ2FtZXJhTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJDb2luIGZyb20gXCIuL0dhbWVNYW5hZ2VyQ29pblwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyQ29pbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBwbGF5ZXJTcGVlZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIEdhbWVNZ3I6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgY2hpbGRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNoaWxkX2xhYmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHRoaXNfbm9kZV91c2VyO1xyXG4gICAgLy9jaGFuZ2UgXHJcbiAgICBwcml2YXRlIGN1cnJlbnRfdXNlcjtcclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyX251bWJlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICByaWdpZGJvZHk6IGNjLlJpZ2lkQm9keSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNoaWxkX2FuaW06IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBwZXJtaXRlZF91c2VyO1xyXG5cclxuICAgIHByaXZhdGUgbGVmdERvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcmlnaHREb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHVwRG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBkb3duRG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwcmVtb3ZlRGlyWCA9IDA7XHJcbiAgICBwcml2YXRlIG1vdmVEaXJYID0gMDtcclxuICAgIHByaXZhdGUgbW92ZURpclkgPSAwO1xyXG4gICAgcHJpdmF0ZSBwcmVtb3ZlRGlyWF9maXJlYmFzZSA9IDA7XHJcbiAgICBwcml2YXRlIG1vdmVEaXJYX2ZpcmViYXNlID0gMDtcclxuICAgIHByaXZhdGUgbW92ZURpcllfZmlyZWJhc2UgPSAwO1xyXG4gICAgcHJpdmF0ZSBsb2dnZWRfaW5fb3Jfbm90ID0gZmFsc2U7XHJcbiAgICBtb3ZlYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBtb3ZlYWJsZUtleTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vIOavj+WAi3BsYXllciBub2Rl6YO95pyD5bCN5oeJ5LiA5YCLdXNlclxyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5ub2RlLm5hbWU7XHJcbiAgICAgICAgdmFyIHVzZXIgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgICAgIHRoaXMuY3VycmVudF91c2VyID0gdXNlcjtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBoYW5kbGUucGVybWl0ZWRfdXNlciA9IHNuYXBzaG90LnZhbCgpLnVpZDtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmdWNrIGltIGlubm5ubm5ubm5ubm5ubm5ubm5uJylcclxuICAgICAgICAgICAgICAgIGhhbmRsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGUubG9nZ2VkX2luX29yX25vdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVzZXIgPT0gaGFuZGxlLnBlcm1pdGVkX3VzZXIpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVhYmxlS2V5YCkuc2V0KHsgbW92ZWFibGVLZXk6IFwidHJ1ZVwiIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9wcmVtb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvWGApLnNldCh7IHg6IDAgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9Jc0xvZ2luYCkuc2V0KHsgYm9vbDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudGhpc19ub2RlX3VzZXIgPSBoYW5kbGUucGVybWl0ZWRfdXNlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub2RldXNlcjpcIiwgdGhpcy5ub2RlLm5hbWUsIHRoaXMudGhpc19ub2RlX3VzZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImN1cnJlbnR1c2VyOlwiLCB0aGlzLmN1cnJlbnRfdXNlcik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRfdXNlciA9PSB0aGlzLnRoaXNfbm9kZV91c2VyKSBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhXCIpLmdldENvbXBvbmVudChDYW1lcmFNYW5hZ2VyKS5Gb2xsb3dUYXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgfSwgMC41KTtcclxuICAgICAgICAvLyDlj5blvpfnj77lnKjnjqnlrrbnt6jomZ8gY3VycmVudF91c2VyX251bWJlclxyXG4gICAgICAgIHZhciB1aWQgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgICAgIGxldCB0ID0gdGhpcztcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdXNlcl9pbmZvLyR7dWlkfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmKHNuYXBzaG90LnZhbCgpICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdC5jdXJyZW50X3VzZXJfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBDb2luIGN1cnJlbnRfdXNlcl9udW1iZXIgaXMgXCIsIHQuY3VycmVudF91c2VyX251bWJlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmlnaWRib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkX25vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRfbGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0xhYmVsJyk7IC8vIOeOqeWutuWQjeeosVxyXG4gICAgICAgIHRoaXMuY2hpbGRfYW5pbSA9IHRoaXMuY2hpbGRfbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICB0aGlzLmNoaWxkX2FuaW0ucGxheSgnSWRsZScpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy51cGRhdGVPdGhlcnNDdXJyZW50UG9zLCAxKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuVXBkYXRlR3JvdXAsIDAuNSk7XHJcblxyXG4gICAgICAgIHRoaXMuR2FtZU1nciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICAvL2lmIHRoZSBwbGF5ZXIgaXMgbG9nZ2VkIG5vdyB3ZSBhY3RpdmUgdGhlIG5vZGUgXHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2dlZF9pbl9vcl9ub3QpIHtcclxuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMubm9kZS5uYW1lfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgIGxldCBEaXJYID0gdGhpcy5tb3ZlRGlyWF9maXJlYmFzZTtcclxuICAgICAgICBsZXQgRGlyWSA9IHRoaXMubW92ZURpcllfZmlyZWJhc2U7XHJcbiAgICAgICAgbGV0IHByZURpclggPSB0aGlzLnByZW1vdmVEaXJYX2ZpcmViYXNlO1xyXG4gICAgICAgIGxldCBwb3NYID0gdGhpcy5ub2RlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB0aGlzLm5vZGUucG9zaXRpb24ueTtcclxuICAgICAgICAvLyB3cml0ZSBmaXJlYmFzZSByZWFsdGltZSBkYXRhYmFzZVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRfdXNlciA9PSB0aGlzLnRoaXNfbm9kZV91c2VyKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJYYCkuc2V0KHsgRGlyOiBEaXJYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiBEaXJZIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiBwcmVEaXJYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiBwb3NYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiBwb3NZIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlYWQgZmlyZWJhc2UgcmVhbHRpbWUgZGF0YWJhc2VcclxuICAgICAgICBEaXJYID0gMCwgRGlyWSA9IDAsIHByZURpclggPSAwO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIERpclggPSBzbmFwc2hvdC52YWwoKS5tb3ZlRGlyWC5EaXI7XHJcbiAgICAgICAgICAgICAgICBEaXJZID0gc25hcHNob3QudmFsKCkubW92ZURpclkuRGlyO1xyXG4gICAgICAgICAgICAgICAgcHJlRGlyWCA9IHNuYXBzaG90LnZhbCgpLnByZW1vdmVEaXJYLkRpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGlyWCA9IERpclg7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZURpclkgPSBEaXJZO1xyXG4gICAgICAgICAgICB0aGlzLnByZW1vdmVEaXJYID0gcHJlRGlyWDtcclxuICAgICAgICB9LCAwLjIpO1xyXG5cclxuICAgICAgICAvLyBTY2FsZVxyXG4gICAgICAgIHRoaXMuY2hpbGRfbm9kZS5zY2FsZVggPSAodGhpcy5tb3ZlRGlyWCA+PSAwKSA/IDEgOiAtMTtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyWCA9PSAwKSB0aGlzLmNoaWxkX25vZGUuc2NhbGVYID0gKHRoaXMucHJlbW92ZURpclggPj0gMCkgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIC8vIE1vdmVcclxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyWCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZWFibGUpIHRoaXMucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgdGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpclkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb3ZlRGlyWSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZWFibGUpIHRoaXMucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIodGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpclgsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZWFibGUpIHRoaXMucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIodGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpclggKiAwLjcsIHRoaXMucGxheWVyU3BlZWQgKiB0aGlzLm1vdmVEaXJZICogMC43KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFuaW1hdGlvblxyXG4gICAgICAgIGlmICgodGhpcy5tb3ZlRGlyWCA9PSAwICYmIHRoaXMubW92ZURpclkgPT0gMCkgfHwgIXRoaXMubW92ZWFibGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoaWxkX2FuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoJ0lkbGUnKS5pc1BsYXlpbmcpIHRoaXMuY2hpbGRfYW5pbS5wbGF5KCdJZGxlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoaWxkX2FuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoJ01vdmUnKS5pc1BsYXlpbmcpIHRoaXMuY2hpbGRfYW5pbS5wbGF5KCdNb3ZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5RG93bihldmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5RG93blwiLCBldmVudC5rZXlDb2RlKTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkucTpcclxuICAgICAgICAgICAgICAgIHRoaXMuS2lsbG90aGVycygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnREb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVZKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25Eb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25LZXlVcChldmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5RG93blwiLCBldmVudC5rZXlDb2RlKTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdERvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZDpcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHREb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWZ0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKC0xKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bkRvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgtMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5zOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXBEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBsYXllck1vdmVYKG1vdmVEaXJYOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHJlbW92ZURpclhfZmlyZWJhc2UgPSB0aGlzLm1vdmVEaXJYX2ZpcmViYXNlO1xyXG4gICAgICAgIHRoaXMubW92ZURpclhfZmlyZWJhc2UgPSBtb3ZlRGlyWDtcclxuICAgIH1cclxuICAgIHBsYXllck1vdmVZKG1vdmVEaXJZOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubW92ZURpcllfZmlyZWJhc2UgPSBtb3ZlRGlyWTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU90aGVyc0N1cnJlbnRQb3MoKSB7IC8vIOWumuacn+iHquWLleS/ruato+WFtuS7lueOqeWutuato+eiuuS9jee9rlxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRfdXNlciA9PSB0aGlzLnRoaXNfbm9kZV91c2VyKSByZXR1cm47IC8vIOS4jeabtOaWsOiHquW3seeahG5vZGVcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVmcmVzaCBQb3M6XCIsIG5hbWUpO1xyXG4gICAgICAgIGxldCBwb3NYID0gLTE0ODcsIERpclg7XHJcbiAgICAgICAgbGV0IHBvc1kgPSAtMTQ4NywgRGlyWTtcclxuICAgICAgICAvLyBsZXQgSXNMb2dpbjogYm9vbGVhbjtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NYID0gc25hcHNob3QudmFsKCkuWC54O1xyXG4gICAgICAgICAgICAgICAgcG9zWSA9IHNuYXBzaG90LnZhbCgpLlkueTtcclxuICAgICAgICAgICAgICAgIERpclggPSBzbmFwc2hvdC52YWwoKS5tb3ZlRGlyWC5EaXI7XHJcbiAgICAgICAgICAgICAgICBEaXJZID0gc25hcHNob3QudmFsKCkubW92ZURpclkuRGlyO1xyXG4gICAgICAgICAgICAgICAgLy8gSXNMb2dpbiA9IHNuYXBzaG90LnZhbCgpLklzTG9naW4uYm9vbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBvc1ggPT0gLTE0ODcgJiYgcG9zWSA9PSAtMTQ4NykgcmV0dXJuOyAvLyDlpoLmnpxmaXJlYmFzZSBkYXRhYmFzZeaykuacieaKk+WIsOizh+aWme+8jOWwseS4jeimgeabtOaWsOOAglxyXG4gICAgICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgICAgIGFjdGlvbiA9IGNjLm1vdmVUbygwLjUsIHBvc1gsIHBvc1kpOyAvLyDkv67mraPkuKblubPmu5Hnp7vli5XliLDmraPnorrkvY3nva5cclxuICAgICAgICAgICAgaWYoTWF0aC5hYnModGhpcy5ub2RlLnBvc2l0aW9uLngtcG9zWCk+MjU2IHx8IE1hdGguYWJzKHRoaXMubm9kZS5wb3NpdGlvbi55LXBvc1kpPjI1Nil7IC8vIOWmguaenOS9jee9ruW3ruWkquWkmuWwseebtOaOpemWg+ePvuOAgigyNTbngro45qC8KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvc1gscG9zWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIH0sIDAuMjApO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlR3JvdXAoKXtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVDb2luLyR7dC5ub2RlLm5hbWV9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3Qpe1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkuc3RhdGUgPT0gXCJwbGF5ZXJcIil7XHJcbiAgICAgICAgICAgICAgICBpZih0Lm5vZGUuZ3JvdXAgIT0gXCJDb2lucGxheWVyXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlR3JvdXAgdG8gcGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5ncm91cCA9IFwiQ29pbnBsYXllclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJDXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoc25hcHNob3QudmFsKCkuc3RhdGUgPT0gXCJ0aGllZlwiKXtcclxuICAgICAgICAgICAgICAgIGlmKHQubm9kZS5ncm91cCAhPSBcIkNvaW50aGllZlwiKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYW5nZUdyb3VwIHRvIHRoaWVmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5ncm91cCA9IFwiQ29pbnRoaWVmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkNcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgS2lsbG90aGVycygpe1xyXG4gICAgICAgIGlmKHRoaXMudGhpc19ub2RlX3VzZXIgIT0gdGhpcy5jdXJyZW50X3VzZXIpIHJldHVybjtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBsYXllclwiLCB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIsIFwid2FudCB0byBraWxsICEhIVwiKTtcclxuICAgICAgICB0aGlzLkdhbWVNZ3IuZ2V0Q29tcG9uZW50KEdhbWVNYW5hZ2VyQ29pbikuQmVjb21lVGhpZWYodGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpeyAvLyDnorDliLDlgbfph5Hos4rmnIPmrbvmjolcclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09IFwiQ29pbnRoaWVmXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJlZ2luQ29udGFjdCBvbiBDb2ludGhpZWZcIiwgb3RoZXIubm9kZS5uYW1lKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRfYyA9IHRoaXMuR2FtZU1nci5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJDb2luKS5jdXJyZW50X2NvaW47XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZU1nci5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJDb2luKS5wbGF5ZXJEaWUodGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgICAgICAgICAvLyBmaXJlYmFzZVxyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJwbGF5ZXJcIit0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIGlmKHNlbGYubm9kZS5uYW1lID09IHN0cikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHQgPSB0aGlzOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi8ke290aGVyLm5vZGUubmFtZX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uKHNuYXBob3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjID0gc25hcGhvdC52YWwoKS5jb2luO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi8ke290aGVyLm5vZGUubmFtZX1gKS51cGRhdGUoeyBjb2luOiBjK2N1cnJlbnRfYyB9KTtcclxuICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIG9uRW5kQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcil7XHJcbiAgICAvLyAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSBcIkNvaW50aGllZlwiKXtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJFbmRDb250YWN0IG9uIENvaW50aGllZlwiLCBvdGhlci5ub2RlLm5hbWUpOyAgICAgICAgICAgIFxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/fight_forum.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ff61iG8iRKVLLASJ34EDGb', 'fight_forum');
// Script/Game5Object/fight_forum.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var battle_field_1 = require("./battle_field");
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var fight_forum = /** @class */ (function (_super) {
    __extends(fight_forum, _super);
    function fight_forum() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.opponent_info_choice = null;
        _this.Mine_info_choice = null;
        _this.battle_field = null;
        _this.click = null;
        _this.fight = false;
        _this.being_rude = false;
        _this.updated = true;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    fight_forum.prototype.start = function () {
        //this.current_user = cc.find("GameManager").getComponent(GameManagerS2).current_user_node;
        var fight_forum_accept = new cc.Component.EventHandler();
        fight_forum_accept.target = this.node;
        fight_forum_accept.component = "fight_forum";
        fight_forum_accept.handler = "accept";
        cc.find("Canvas/UI/fight_forum/accept").getComponent(cc.Button).clickEvents.push(fight_forum_accept);
        var fight_forum_reject = new cc.Component.EventHandler();
        fight_forum_reject.target = this.node;
        fight_forum_reject.component = "fight_forum";
        fight_forum_reject.handler = "reject";
        cc.find("Canvas/UI/fight_forum/reject").getComponent(cc.Button).clickEvents.push(fight_forum_reject);
    };
    fight_forum.prototype.accept = function () {
        cc.audioEngine.playEffect(this.click, false);
        var handle = this;
        this.fight = true;
        console.log("accept challenge");
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ fighting: "true" });
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ challenged: "false" });
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").once('value', function (snapshot) {
            handle.opponent = snapshot.val().opponent;
            //console.log("you: " + handle.current_user + "  opponent: " + handle.opponent)
            firebase.database().ref("player_data/" + handle.opponent + "/game2_state").update({ opponent: handle.current_user, fighting: "true" });
            var game_manager = cc.find('GameManager').getComponent(GameManagerS5_1.default);
            handle.Mine_info_choice.active = true;
            handle.opponent_info_choice.active = true;
            handle.battle_field.active = true;
            handle.battle_field.getComponent(battle_field_1.default).opponent = handle.opponent;
            game_manager.opponent_user_node = handle.opponent;
            game_manager.fighting = true;
            console.log("game manager fighting: " + game_manager.fighting);
            if (handle.being_rude) {
                cc.find("Canvas/UI/fight_forum/reject").active = true;
                handle.being_rude = false;
            }
            cc.find("Canvas/UI/fight_forum").active = false;
        });
        //open up the battle field and both info_choice
    };
    fight_forum.prototype.reject = function () {
        cc.audioEngine.playEffect(this.click, false);
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ opponent: "null" });
        cc.find("Canvas/UI/fight_forum").active = false;
    };
    fight_forum.prototype.update = function (dt) {
    };
    __decorate([
        property(cc.Node)
    ], fight_forum.prototype, "opponent_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], fight_forum.prototype, "Mine_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], fight_forum.prototype, "battle_field", void 0);
    __decorate([
        property(cc.AudioClip)
    ], fight_forum.prototype, "click", void 0);
    fight_forum = __decorate([
        ccclass
    ], fight_forum);
    return fight_forum;
}(cc.Component));
exports.default = fight_forum;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcZmlnaHRfZm9ydW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsK0NBQTBDO0FBQzFDLDhEQUF5RDtBQUd6RDtJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQStFQztRQTdFRywwQkFBb0IsR0FBWSxJQUFJLENBQUM7UUFFckMsc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQUssR0FBaUIsSUFBSSxDQUFDO1FBSzNCLFdBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFPLEdBQUcsSUFBSSxDQUFDOztJQWdFbkIsQ0FBQztJQTNERyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLDJCQUFLLEdBQUw7UUFDSSwyRkFBMkY7UUFDM0YsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekQsa0JBQWtCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEMsa0JBQWtCLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztRQUM3QyxrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRyxJ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LEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDNUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLENBQUMsWUFBWSxpQkFBYyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDcEQsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxFQUFFO0lBS1QsQ0FBQztJQTNFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZEQUNtQjtJQUVyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNlO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1c7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzs4Q0FDSTtJQVJWLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0ErRS9CO0lBQUQsa0JBQUM7Q0EvRUQsQUErRUMsQ0EvRXdDLEVBQUUsQ0FBQyxTQUFTLEdBK0VwRDtrQkEvRW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5pbXBvcnQgYmF0dGxlX2ZpZWxkIGZyb20gXCIuL2JhdHRsZV9maWVsZFwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJTNSBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJTNVwiO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpZ2h0X2ZvcnVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgb3Bwb25lbnRfaW5mb19jaG9pY2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBNaW5lX2luZm9fY2hvaWNlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmF0dGxlX2ZpZWxkOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBjbGljazogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBjdXJyZW50X3VzZXI7XHJcbiAgICBvcHBvbmVudDtcclxuXHJcbiAgICBmaWdodCA9IGZhbHNlO1xyXG4gICAgYmVpbmdfcnVkZSA9IGZhbHNlO1xyXG4gICAgdXBkYXRlZCA9IHRydWU7XHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgLy90aGlzLmN1cnJlbnRfdXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTMikuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgbGV0IGZpZ2h0X2ZvcnVtX2FjY2VwdCA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgZmlnaHRfZm9ydW1fYWNjZXB0LnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBmaWdodF9mb3J1bV9hY2NlcHQuY29tcG9uZW50ID0gXCJmaWdodF9mb3J1bVwiO1xyXG4gICAgICAgIGZpZ2h0X2ZvcnVtX2FjY2VwdC5oYW5kbGVyID0gXCJhY2NlcHRcIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvZmlnaHRfZm9ydW0vYWNjZXB0YCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChmaWdodF9mb3J1bV9hY2NlcHQpO1xyXG4gICAgICAgIGxldCBmaWdodF9mb3J1bV9yZWplY3QgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIGZpZ2h0X2ZvcnVtX3JlamVjdC50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZmlnaHRfZm9ydW1fcmVqZWN0LmNvbXBvbmVudCA9IFwiZmlnaHRfZm9ydW1cIjtcclxuICAgICAgICBmaWdodF9mb3J1bV9yZWplY3QuaGFuZGxlciA9IFwicmVqZWN0XCI7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL2ZpZ2h0X2ZvcnVtL3JlamVjdGApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goZmlnaHRfZm9ydW1fcmVqZWN0KTtcclxuICAgIH1cclxuICAgIGFjY2VwdCgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZmlnaHQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWNjZXB0IGNoYWxsZW5nZVwiKTtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGVgKS51cGRhdGUoeyBmaWdodGluZzogXCJ0cnVlXCIgfSk7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgY2hhbGxlbmdlZDogXCJmYWxzZVwiIH0pO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGhhbmRsZS5vcHBvbmVudCA9IHNuYXBzaG90LnZhbCgpLm9wcG9uZW50O1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwieW91OiBcIiArIGhhbmRsZS5jdXJyZW50X3VzZXIgKyBcIiAgb3Bwb25lbnQ6IFwiICsgaGFuZGxlLm9wcG9uZW50KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtoYW5kbGUub3Bwb25lbnR9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgb3Bwb25lbnQ6IGhhbmRsZS5jdXJyZW50X3VzZXIsIGZpZ2h0aW5nOiBcInRydWVcIiB9KTtcclxuICAgICAgICAgICAgbGV0IGdhbWVfbWFuYWdlciA9IGNjLmZpbmQoJ0dhbWVNYW5hZ2VyJykuZ2V0Q29tcG9uZW50KEdhbWVNYW5hZ2VyUzUpO1xyXG4gICAgICAgICAgICBoYW5kbGUuTWluZV9pbmZvX2Nob2ljZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaGFuZGxlLmJhdHRsZV9maWVsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBoYW5kbGUuYmF0dGxlX2ZpZWxkLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLm9wcG9uZW50ID0gaGFuZGxlLm9wcG9uZW50O1xyXG4gICAgICAgICAgICBnYW1lX21hbmFnZXIub3Bwb25lbnRfdXNlcl9ub2RlID0gaGFuZGxlLm9wcG9uZW50O1xyXG4gICAgICAgICAgICBnYW1lX21hbmFnZXIuZmlnaHRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgbWFuYWdlciBmaWdodGluZzogXCIgKyBnYW1lX21hbmFnZXIuZmlnaHRpbmcpXHJcbiAgICAgICAgICAgIGlmIChoYW5kbGUuYmVpbmdfcnVkZSkge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL2ZpZ2h0X2ZvcnVtL3JlamVjdGApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGUuYmVpbmdfcnVkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9maWdodF9mb3J1bWApLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9vcGVuIHVwIHRoZSBiYXR0bGUgZmllbGQgYW5kIGJvdGggaW5mb19jaG9pY2VcclxuXHJcblxyXG4gICAgfVxyXG4gICAgcmVqZWN0KCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgb3Bwb25lbnQ6IFwibnVsbFwiIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9maWdodF9mb3J1bWApLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager/GameManagerS3.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9d81azu9dZAO7GUnWK5LBUa', 'GameManagerS3');
// Script/GameManager/GameManagerS3.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS3 = /** @class */ (function (_super) {
    __extends(GameManagerS3, _super);
    function GameManagerS3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.physicManager = null;
        return _this;
        // update (dt) {}
    }
    GameManagerS3.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        // 每個player node初始化位置。
        var user = firebase.auth().currentUser.uid;
        var permited_user;
        firebase.database().ref("player_data").once('value', function (snapshot) {
            snapshot.forEach(function (player) {
                var name = player.key;
                if (name == "player1" || name == "player2" || name == "player3" || name == "player4" || name == "player5") {
                    console.log("Initial player:", name);
                    firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: 16 });
                    firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: -48 });
                }
            });
        });
        // 
    };
    GameManagerS3.prototype.start = function () {
    };
    GameManagerS3 = __decorate([
        ccclass
    ], GameManagerS3);
    return GameManagerS3;
}(cc.Component));
exports.default = GameManagerS3;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlclxcR2FtZU1hbmFnZXJTMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUkxQztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQW1DQztRQWpDVyxtQkFBYSxHQUFzQixJQUFJLENBQUM7O1FBZ0NoRCxpQkFBaUI7SUFDckIsQ0FBQztJQS9CRyw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpDLHNCQUFzQjtRQUN0QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUMzQyxJQUFJLGFBQWEsQ0FBQztRQUNsQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ25FLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxNQUFNO2dCQUM3QixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUN0QixJQUFHLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsRUFBQztvQkFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDckMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLDBCQUF1QixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQ25GLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSwwQkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUNuRixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksNkJBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFDdEYsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLDBCQUF1QixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7b0JBQzdGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSxtQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO29CQUMzRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksbUJBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO2lCQUMvRTtZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7UUFDRixHQUFHO0lBRVAsQ0FBQztJQUVELDZCQUFLLEdBQUw7SUFFQSxDQUFDO0lBaENnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBbUNqQztJQUFELG9CQUFDO0NBbkNELEFBbUNDLENBbkMwQyxFQUFFLENBQUMsU0FBUyxHQW1DdEQ7a0JBbkNvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyUzMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgcGh5c2ljTWFuYWdlcjogY2MuUGh5c2ljc01hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAwKTtcclxuXHJcbiAgICAgICAgLy8g5q+P5YCLcGxheWVyIG5vZGXliJ3lp4vljJbkvY3nva7jgIJcclxuICAgICAgICB2YXIgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAgICAgdmFyIHBlcm1pdGVkX3VzZXI7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgc25hcHNob3QuZm9yRWFjaChmdW5jdGlvbiAocGxheWVyKXtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gcGxheWVyLmtleTtcclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT0gXCJwbGF5ZXIxXCIgfHwgbmFtZSA9PSBcInBsYXllcjJcIiB8fCBuYW1lID09IFwicGxheWVyM1wiIHx8IG5hbWUgPT0gXCJwbGF5ZXI0XCIgfHwgbmFtZSA9PSBcInBsYXllcjVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbml0aWFsIHBsYXllcjpcIiwgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogMTYgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9ZYCkuc2V0KHsgeTogLTQ4IH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameEnd/GameEndManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f429aoC+2VCaocysDVrkRXi', 'GameEndManager');
// Script/GameEnd/GameEndManager.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Player_1 = require("../Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameEndManager = /** @class */ (function (_super) {
    __extends(GameEndManager, _super);
    function GameEndManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.BGM = null;
        _this.Text1 = null;
        _this.Text2 = null;
        _this.WinnerLabel = null;
        _this.current_user_number = 0;
        _this.physicManager = null;
        _this.Round1_winner = 0;
        _this.Round2_winner = 0;
        _this.Round3_winner = 0;
        _this.Round4_winner = 0;
        return _this;
    }
    GameEndManager.prototype.onLoad = function () {
        var _this = this;
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        var user = firebase.auth().currentUser.uid;
        var player_node_number = 0;
        firebase.database().ref("user_info/" + user).once('value', function (snapshot) {
            player_node_number = snapshot.val().player_number;
        });
        this.scheduleOnce(function () {
            _this.current_user_number = player_node_number;
        }, 2.5);
    };
    GameEndManager.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        var player1 = cc.find("Canvas/PlayerContainer/player1");
        var player2 = cc.find("Canvas/PlayerContainer/player2");
        var player3 = cc.find("Canvas/PlayerContainer/player3");
        var player4 = cc.find("Canvas/PlayerContainer/player4");
        var player5 = cc.find("Canvas/PlayerContainer/player5");
        if (player1)
            player1.getComponent(Player_1.default).moveable = false;
        if (player2)
            player5.getComponent(Player_1.default).moveable = false;
        if (player3)
            player5.getComponent(Player_1.default).moveable = false;
        if (player4)
            player5.getComponent(Player_1.default).moveable = false;
        if (player5)
            player5.getComponent(Player_1.default).moveable = false;
        this.Init_player();
        this.FindRoundWinner();
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (player1)
                player1.getComponent(Player_1.default).moveable = true;
            if (player2)
                player5.getComponent(Player_1.default).moveable = true;
            if (player3)
                player5.getComponent(Player_1.default).moveable = true;
            if (player4)
                player5.getComponent(Player_1.default).moveable = true;
            if (player5)
                player5.getComponent(Player_1.default).moveable = true;
            // 開始計時
            cc.audioEngine.playMusic(_this.BGM, true);
            cc.audioEngine.setMusicVolume(0.2);
            _this.Text1Action();
            _this.Text2Action();
        }, 2.5);
    };
    GameEndManager.prototype.update = function (dt) {
    };
    GameEndManager.prototype.Text1Action = function () {
        var action;
        var sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.Text1.runAction(action);
    };
    GameEndManager.prototype.Text2Action = function () {
        var action;
        var sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.Text2.runAction(action);
    };
    GameEndManager.prototype.Init_player = function () {
        var handle = this;
        var _loop_1 = function (i) {
            firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: -736 });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -176 });
                }
            });
        };
        // initialize players
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    GameEndManager.prototype.FindRoundWinner = function () {
        var t = this;
        var _loop_2 = function (i) {
            firebase.database().ref("GameResult/Round1/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val() == 80) {
                        t.Round1_winner = i;
                    }
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_2(i);
        }
        var _loop_3 = function (i) {
            firebase.database().ref("GameResult/Round2/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val() == 0) {
                        t.Round2_winner = i;
                    }
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_3(i);
        }
        var _loop_4 = function (i) {
            firebase.database().ref("GameResult/Round3/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val() == 80) {
                        t.Round3_winner = i;
                    }
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_4(i);
        }
        // GameStage4
        var coin = [0, 0, 0, 0, 0];
        var _loop_5 = function (i) {
            firebase.database().ref("player_data/player" + i + "/game2_state/money").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    coin[i - 1] = snapshot.val();
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_5(i);
        }
        this.scheduleOnce(function () {
            var cnt = 0;
            for (var i = 0; i <= 4; i++) {
                cnt = 0;
                for (var j = 0; j <= 4; j++) {
                    if (coin[i] >= coin[j])
                        cnt++;
                }
                if (cnt == 5) {
                    t.Round4_winner = i + 1;
                }
            }
            // print winner.
            console.log("Winner", t.Round1_winner, t.Round2_winner, t.Round3_winner, t.Round4_winner);
            var p;
            p = cc.find("Canvas/ObjContainer/Round1/Champ/P" + t.Round1_winner);
            if (p)
                p.active = true;
            p = cc.find("Canvas/ObjContainer/Round2/Champ/P" + t.Round2_winner);
            if (p)
                p.active = true;
            p = cc.find("Canvas/ObjContainer/Round3/Champ/P" + t.Round3_winner);
            if (p)
                p.active = true;
            p = cc.find("Canvas/ObjContainer/Round4/Champ/P" + t.Round4_winner);
            if (p)
                p.active = true;
            firebase.database().ref("user_list").once('value', function (snapshot) {
                snapshot.forEach(function (s) {
                    if (s.val().player_number == t.Round4_winner) {
                        t.WinnerLabel.getComponent(cc.Label).string = s.val().email;
                    }
                });
            });
        }, 1.5);
    };
    __decorate([
        property(cc.Node)
    ], GameEndManager.prototype, "loadingBG", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameEndManager.prototype, "BGM", void 0);
    __decorate([
        property(cc.Node)
    ], GameEndManager.prototype, "Text1", void 0);
    __decorate([
        property(cc.Node)
    ], GameEndManager.prototype, "Text2", void 0);
    __decorate([
        property(cc.Node)
    ], GameEndManager.prototype, "WinnerLabel", void 0);
    GameEndManager = __decorate([
        ccclass
    ], GameEndManager);
    return GameEndManager;
}(cc.Component));
exports.default = GameEndManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lRW5kXFxHYW1lRW5kTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixvQ0FBK0I7QUFFekIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFnTEM7UUE3S0csZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixTQUFHLEdBQWlCLElBQUksQ0FBQztRQUd6QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBRXRCLFdBQUssR0FBWSxJQUFJLENBQUM7UUFFdEIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFcEIseUJBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBRWhDLG1CQUFhLEdBQXNCLElBQUksQ0FBQztRQUV4QyxtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixtQkFBYSxHQUFXLENBQUMsQ0FBQzs7SUEwSnRDLENBQUM7SUF2SkcsK0JBQU0sR0FBTjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFX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Q0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO3FCQUMvRDtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQTVLRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7K0NBQ0U7SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDSTtJQUV0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1U7SUFiWCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBZ0xsQztJQUFELHFCQUFDO0NBaExELEFBZ0xDLENBaEwyQyxFQUFFLENBQUMsU0FBUyxHQWdMdkQ7a0JBaExvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9QbGF5ZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVFbmRNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxvYWRpbmdCRzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIEJHTTogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRleHQxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgVGV4dDI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBXaW5uZXJMYWJlbDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgcGh5c2ljTWFuYWdlcjogY2MuUGh5c2ljc01hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgUm91bmQxX3dpbm5lcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgUm91bmQyX3dpbm5lcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgUm91bmQzX3dpbm5lcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgUm91bmQ0X3dpbm5lcjogbnVtYmVyID0gMDtcclxuICAgIFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMucGh5c2ljTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZ3Jhdml0eSA9IGNjLnYyKDAsIDApO1xyXG5cclxuICAgICAgICB2YXIgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAgICAgbGV0IHBsYXllcl9ub2RlX251bWJlciA9IDA7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VzZXJ9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgcGxheWVyX25vZGVfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF91c2VyX251bWJlciA9IHBsYXllcl9ub2RlX251bWJlcjtcclxuICAgICAgICB9LCAyLjUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdCRy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBwbGF5ZXIxID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMVwiKTtcclxuICAgICAgICBsZXQgcGxheWVyMiA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjJcIik7XHJcbiAgICAgICAgbGV0IHBsYXllcjMgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIzXCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXI0ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNFwiKTtcclxuICAgICAgICBsZXQgcGxheWVyNSA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjVcIik7XHJcbiAgICAgICAgaWYgKHBsYXllcjEpIHBsYXllcjEuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAocGxheWVyMikgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChwbGF5ZXIzKSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHBsYXllcjQpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAocGxheWVyNSkgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLkluaXRfcGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5GaW5kUm91bmRXaW5uZXIoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyMSkgcGxheWVyMS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIyKSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHBsYXllcjMpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyNCkgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXI1KSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8g6ZaL5aeL6KiI5pmCXHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDAuMik7XHJcbiAgICAgICAgICAgIHRoaXMuVGV4dDFBY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0MkFjdGlvbigpO1xyXG4gICAgICAgIH0sIDIuNSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuXHJcbiAgICB9XHJcbiAgICBUZXh0MUFjdGlvbigpIHtcclxuICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDEuMSksIGNjLnNjYWxlVG8oMC41LCAxKSk7XHJcbiAgICAgICAgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzZXF1ZW5jZSk7XHJcbiAgICAgICAgdGhpcy5UZXh0MS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuICAgIFRleHQyQWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBhY3Rpb246IGNjLkFjdGlvbjtcclxuICAgICAgICBsZXQgc2VxdWVuY2UgPSBjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuNSwgMS4xKSwgY2Muc2NhbGVUbygwLjUsIDEpKTtcclxuICAgICAgICBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKHNlcXVlbmNlKTtcclxuICAgICAgICB0aGlzLlRleHQyLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgSW5pdF9wbGF5ZXIoKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBwbGF5ZXJzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHsgLy8g5aaC5p6c546p5a6255m75YWlXHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogLTczNiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAtMTc2IH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGluaXRpYWwgRW5kXHJcbiAgICB9XHJcbiAgICBGaW5kUm91bmRXaW5uZXIoKXtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lUmVzdWx0L1JvdW5kMS9wbGF5ZXIke2l9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc25hcHNob3QudmFsKCkgPT0gODApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LlJvdW5kMV93aW5uZXIgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lUmVzdWx0L1JvdW5kMi9wbGF5ZXIke2l9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc25hcHNob3QudmFsKCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuUm91bmQyX3dpbm5lciA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVSZXN1bHQvUm91bmQzL3BsYXllciR7aX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzbmFwc2hvdC52YWwoKSA9PSA4MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuUm91bmQzX3dpbm5lciA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBHYW1lU3RhZ2U0XHJcbiAgICAgICAgbGV0IGNvaW4gPSBbMCwwLDAsMCwwXVxyXG4gICAgICAgIGZvcihsZXQgaT0xO2k8PTU7aSsrKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vZ2FtZTJfc3RhdGUvbW9uZXlgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCl7XHJcbiAgICAgICAgICAgICAgICBpZihzbmFwc2hvdC52YWwoKSE9bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29pbltpLTFdID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBsZXQgY250ID0gMDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTw9NDtpKyspe1xyXG4gICAgICAgICAgICAgICAgY250ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8PTQ7aisrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb2luW2ldPj1jb2luW2pdKSBjbnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGNudCA9PSA1KXtcclxuICAgICAgICAgICAgICAgICAgICB0LlJvdW5kNF93aW5uZXIgPSBpKzE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcHJpbnQgd2lubmVyLlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldpbm5lclwiLCB0LlJvdW5kMV93aW5uZXIsIHQuUm91bmQyX3dpbm5lciwgdC5Sb3VuZDNfd2lubmVyLCB0LlJvdW5kNF93aW5uZXIpXHJcbiAgICAgICAgICAgIGxldCBwO1xyXG4gICAgICAgICAgICBwID0gY2MuZmluZChgQ2FudmFzL09iakNvbnRhaW5lci9Sb3VuZDEvQ2hhbXAvUCR7dC5Sb3VuZDFfd2lubmVyfWApXHJcbiAgICAgICAgICAgIGlmKHApIHAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcCA9IGNjLmZpbmQoYENhbnZhcy9PYmpDb250YWluZXIvUm91bmQyL0NoYW1wL1Ake3QuUm91bmQyX3dpbm5lcn1gKVxyXG4gICAgICAgICAgICBpZihwKSBwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHAgPSBjYy5maW5kKGBDYW52YXMvT2JqQ29udGFpbmVyL1JvdW5kMy9DaGFtcC9QJHt0LlJvdW5kM193aW5uZXJ9YClcclxuICAgICAgICAgICAgaWYocCkgcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwID0gY2MuZmluZChgQ2FudmFzL09iakNvbnRhaW5lci9Sb3VuZDQvQ2hhbXAvUCR7dC5Sb3VuZDRfd2lubmVyfWApXHJcbiAgICAgICAgICAgIGlmKHApIHAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfbGlzdGApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KXtcclxuICAgICAgICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goZnVuY3Rpb24gKHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHMudmFsKCkucGxheWVyX251bWJlciA9PSB0LlJvdW5kNF93aW5uZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Lldpbm5lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcy52YWwoKS5lbWFpbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMS41KTtcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/computer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3555OfbRVJfqVVS2aWjc+P', 'computer');
// Script/computer.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Computer = /** @class */ (function (_super) {
    __extends(Computer, _super);
    function Computer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.readyWindow = null;
        _this.current_user_number = 0;
        return _this;
        // onEndContact(contact, self, other){
        //     if(other.node.group == 'player'){
        //         console.log("close Computer");
        //         this.readyWindow.active = false;
        //     }
        // }
        // update (dt) {}
    }
    Computer.prototype.onLoad = function () {
    };
    Computer.prototype.start = function () {
        var _this = this;
        var uid = firebase.auth().currentUser.uid;
        var current_user_number = 0;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                current_user_number = snapshot.val().player_number;
            }
        });
        this.scheduleOnce(function () {
            _this.current_user_number = current_user_number;
        }, 1.5);
    };
    Computer.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.group == 'player') {
            var str = "player" + this.current_user_number.toString();
            if (other.node.name == str) {
                console.log("open Computer");
                this.readyWindow.active = true;
                other.node.getComponent(Player_1.default).moveable = false;
                other.node.getComponent(Player_1.default).getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], Computer.prototype, "readyWindow", void 0);
    Computer = __decorate([
        ccclass
    ], Computer);
    return Computer;
}(cc.Component));
exports.default = Computer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21wdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixtQ0FBOEI7QUFDeEIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUEwQ0M7UUF2Q0csaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFcEIseUJBQW1CLEdBQVcsQ0FBQyxDQUFDOztRQThCeEMsc0NBQXNDO1FBQ3RDLHdDQUF3QztRQUN4Qyx5Q0FBeUM7UUFDekMsMkNBQTJDO1FBQzNDLFFBQVE7UUFDUixJQUFJO1FBQ1AsaUJBQWlCO0lBQ2xCLENBQUM7SUFuQ0cseUJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBQUEsaUJBWUM7UUFWRyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUMxQyxJQUFJLG1CQUFtQixHQUFHLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWEsR0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLFFBQVE7WUFDeEUsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUN4QixtQkFBbUIsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO2FBQ3REO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBQ25ELENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxpQ0FBYyxHQUFkLFVBQWUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLO1FBQy9CLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFDO1lBQzVCLElBQUksR0FBRyxHQUFHLFFBQVEsR0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkQsSUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ2pELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzthQUMxRjtTQUNKO0lBQ0wsQ0FBQztJQS9CRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNVO0lBSFgsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTBDNUI7SUFBRCxlQUFDO0NBMUNELEFBMENDLENBMUNxQyxFQUFFLENBQUMsU0FBUyxHQTBDakQ7a0JBMUNvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wdXRlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICByZWFkeVdpbmRvdzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgICAgIGxldCB1aWQgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgICAgIGxldCBjdXJyZW50X3VzZXJfbnVtYmVyID0gMDtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdXNlcl9pbmZvLyR7dWlkfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID0gY3VycmVudF91c2VyX251bWJlcjtcclxuICAgICAgICB9LDEuNSk7XHJcbiAgICB9XHJcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcikge1xyXG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ3BsYXllcicpe1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJwbGF5ZXJcIit0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYob3RoZXIubm9kZS5uYW1lID09IHN0cil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW4gQ29tcHV0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWR5V2luZG93LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBvdGhlci5ub2RlLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBvdGhlci5ub2RlLmdldENvbXBvbmVudChQbGF5ZXIpLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIG9uRW5kQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcil7XHJcbiAgICAvLyAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAncGxheWVyJyl7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvc2UgQ29tcHV0ZXJcIik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucmVhZHlXaW5kb3cuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gLy8gdXBkYXRlIChkdCkge31cclxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2129Y42VNFrLyhlB4LZJ/o', 'Player');
// Script/Player.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var CameraManager_1 = require("./CameraManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerSpeed = 0;
        _this.child_node = null;
        _this.child_label = null;
        _this.rigidbody = null;
        _this.anim = null;
        _this.child_anim = null;
        _this.leftDown = false;
        _this.rightDown = false;
        _this.upDown = false;
        _this.downDown = false;
        _this.premoveDirX = 0;
        _this.moveDirX = 0;
        _this.moveDirY = 0;
        _this.premoveDirX_firebase = 0;
        _this.moveDirX_firebase = 0;
        _this.moveDirY_firebase = 0;
        _this.logged_in_or_not = false;
        _this.moveable = true;
        _this.moveableKey = true;
        return _this;
    }
    Player.prototype.onLoad = function () {
        var _this = this;
        var handle = this;
        // 每個player node都會對應一個user
        var name = this.node.name;
        var user = firebase.auth().currentUser.uid;
        this.current_user = user;
        firebase.database().ref("player_data/" + name).once('value', function (snapshot) {
            handle.permited_user = snapshot.val().uid;
            if (snapshot.val() != null) {
                // console.log('fuck im innnnnnnnnnnnnnnnnnn')
                handle.node.active = true;
                handle.logged_in_or_not = true;
            }
            if (user == handle.permited_user) {
                firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/moveable").set({ moveable: "true" });
                firebase.database().ref("player_data/" + name + "/state_value/moveableKey").set({ moveableKey: "true" });
                firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: 0 });
                // firebase.database().ref(`player_data/${name}/state_value/IsLogin`).set({ bool: true })
            }
        });
        this.scheduleOnce(function () {
            _this.this_node_user = handle.permited_user;
            console.log("nodeuser:", _this.node.name, _this.this_node_user);
            console.log("currentuser:", _this.current_user);
            if (_this.current_user == _this.this_node_user)
                cc.find("Canvas/Main Camera").getComponent(CameraManager_1.default).FollowTarget = _this.node;
        }, 0.5);
    };
    Player.prototype.get_current_user_uid = function () {
        return this.permited_user;
    };
    Player.prototype.start = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.child_node = this.node.getChildByName(this.node.name);
        this.child_label = this.node.getChildByName('Label');
        this.child_anim = this.child_node.getComponent(cc.Animation);
        this.child_anim.play('Idle');
        this.schedule(this.updateOthersCurrentPos, 1);
    };
    Player.prototype.update = function (dt) {
        var _this = this;
        //if the player is logged now we active the node 
        if (!this.logged_in_or_not) {
            var handle_1 = this;
            firebase.database().ref("player_data/" + this.node.name).once('value', function (snaphot) {
                if (snaphot.val() != null) {
                    handle_1.node.active = true;
                }
            });
        }
        // firebase
        var name = this.node.name;
        var DirX = this.moveDirX_firebase;
        var DirY = this.moveDirY_firebase;
        var preDirX = this.premoveDirX_firebase;
        var posX = this.node.position.x;
        var posY = this.node.position.y;
        // write firebase realtime database
        if (this.current_user == this.this_node_user) {
            firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: DirX });
            firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: DirY });
            firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: preDirX });
            firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: posX });
            firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: posY });
        }
        // read firebase realtime database
        DirX = 0, DirY = 0, preDirX = 0;
        firebase.database().ref("player_data/" + name + "/state_value").once('value', function (snapshot) {
            if (snapshot.val() != null) {
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                preDirX = snapshot.val().premoveDirX.Dir;
            }
        });
        this.scheduleOnce(function () {
            _this.moveDirX = DirX;
            _this.moveDirY = DirY;
            _this.premoveDirX = preDirX;
        }, 0.2);
        // Scale
        this.child_node.scaleX = (this.moveDirX >= 0) ? 1 : -1;
        if (this.moveDirX == 0)
            this.child_node.scaleX = (this.premoveDirX >= 0) ? 1 : -1;
        // Move
        if (this.moveDirX == 0) {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(0, this.playerSpeed * this.moveDirY);
        }
        else if (this.moveDirY == 0) {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX, 0);
        }
        else {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX * 0.7, this.playerSpeed * this.moveDirY * 0.7);
        }
        // Animation
        if ((this.moveDirX == 0 && this.moveDirY == 0) || !this.moveable) {
            if (!this.child_anim.getAnimationState('Idle').isPlaying)
                this.child_anim.play('Idle');
        }
        else {
            if (!this.child_anim.getAnimationState('Move').isPlaying)
                this.child_anim.play('Move');
        }
    };
    Player.prototype.onKeyDown = function (event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = true;
                this.playerMoveX(-1);
                break;
            case cc.macro.KEY.d:
                this.rightDown = true;
                this.playerMoveX(1);
                break;
            case cc.macro.KEY.w:
                this.upDown = true;
                this.playerMoveY(1);
                break;
            case cc.macro.KEY.s:
                this.downDown = true;
                this.playerMoveY(-1);
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = false;
                if (this.rightDown)
                    this.playerMoveX(1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.d:
                this.rightDown = false;
                if (this.leftDown)
                    this.playerMoveX(-1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.w:
                this.upDown = false;
                if (this.downDown)
                    this.playerMoveY(-1);
                else
                    this.playerMoveY(0);
                break;
            case cc.macro.KEY.s:
                this.downDown = false;
                if (this.upDown)
                    this.playerMoveY(1);
                else
                    this.playerMoveY(0);
                break;
        }
    };
    Player.prototype.playerMoveX = function (moveDirX) {
        if (this.current_user != this.this_node_user)
            return;
        if (!this.moveableKey)
            return;
        this.premoveDirX_firebase = this.moveDirX_firebase;
        this.moveDirX_firebase = moveDirX;
    };
    Player.prototype.playerMoveY = function (moveDirY) {
        if (this.current_user != this.this_node_user)
            return;
        if (!this.moveableKey)
            return;
        this.moveDirY_firebase = moveDirY;
    };
    Player.prototype.updateOthersCurrentPos = function () {
        var _this = this;
        if (this.current_user == this.this_node_user)
            return; // 不更新自己的node
        var name = this.node.name;
        // console.log("refresh Pos:", name);
        var posX = -1487, DirX;
        var posY = -1487, DirY;
        // let IsLogin: boolean;
        firebase.database().ref("player_data/" + name + "/state_value").once('value', function (snapshot) {
            if (snapshot.val() != null) {
                posX = snapshot.val().X.x;
                posY = snapshot.val().Y.y;
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                // IsLogin = snapshot.val().IsLogin.bool;
            }
        });
        this.scheduleOnce(function () {
            if (posX == -1487 && posY == -1487)
                return; // 如果firebase database沒有抓到資料，就不要更新。
            var action;
            action = cc.moveTo(0.5, posX, posY); // 修正並平滑移動到正確位置
            if (Math.abs(_this.node.position.x - posX) > 320 || Math.abs(_this.node.position.y - posY) > 320) { // 如果位置差太多就直接閃現。
                _this.node.setPosition(posX, posY);
            }
            _this.node.runAction(action);
        }, 0.20);
    };
    __decorate([
        property()
    ], Player.prototype, "playerSpeed", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsaURBQTRDO0FBRXRDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBZ1BDO1FBNU9HLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRWhCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBTTVCLGVBQVMsR0FBaUIsSUFBSSxDQUFDO1FBQy9CLFVBQUksR0FBaUIsSUFBSSxDQUFDO1FBQzFCLGdCQUFVLEdBQWlCLElBQUksQ0FBQztRQUloQyxjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGlCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsMEJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0Qix1QkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsc0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsaUJBQVcsR0FBWSxJQUFJLENBQUM7O0lBaU5oQyxDQUFDO0lBN01HLHVCQUFNLEdBQU47UUFBQSxpQkFnQ0M7UUEvQkcsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWxCLDBCQUEw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dXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuaW1wb3J0IENhbWVyYU1hbmFnZXIgZnJvbSBcIi4vQ2FtZXJhTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIHBsYXllclNwZWVkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgY2hpbGRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNoaWxkX2xhYmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHRoaXNfbm9kZV91c2VyO1xyXG4gICAgLy9jaGFuZ2UgXHJcbiAgICBwcml2YXRlIGN1cnJlbnRfdXNlcjtcclxuXHJcbiAgICBwcml2YXRlIHJpZ2lkYm9keTogY2MuUmlnaWRCb2R5ID0gbnVsbDtcclxuICAgIHByaXZhdGUgYW5pbTogY2MuQW5pbWF0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hpbGRfYW5pbTogY2MuQW5pbWF0aW9uID0gbnVsbDtcclxuICAgIC8vXHJcbiAgICBwcml2YXRlIHBlcm1pdGVkX3VzZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBsZWZ0RG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSByaWdodERvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgdXBEb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGRvd25Eb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHByZW1vdmVEaXJYID0gMDtcclxuICAgIHByaXZhdGUgbW92ZURpclggPSAwO1xyXG4gICAgcHJpdmF0ZSBtb3ZlRGlyWSA9IDA7XHJcbiAgICBwcml2YXRlIHByZW1vdmVEaXJYX2ZpcmViYXNlID0gMDtcclxuICAgIHByaXZhdGUgbW92ZURpclhfZmlyZWJhc2UgPSAwO1xyXG4gICAgcHJpdmF0ZSBtb3ZlRGlyWV9maXJlYmFzZSA9IDA7XHJcbiAgICBwcml2YXRlIGxvZ2dlZF9pbl9vcl9ub3QgPSBmYWxzZTtcclxuICAgIG1vdmVhYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIG1vdmVhYmxlS2V5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8g5q+P5YCLcGxheWVyIG5vZGXpg73mnIPlsI3mh4nkuIDlgIt1c2VyXHJcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICB2YXIgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3VzZXIgPSB1c2VyO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGhhbmRsZS5wZXJtaXRlZF91c2VyID0gc25hcHNob3QudmFsKCkudWlkO1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Z1Y2sgaW0gaW5ubm5ubm5ubm5ubm5ubm5ubm4nKVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGhhbmRsZS5sb2dnZWRfaW5fb3Jfbm90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodXNlciA9PSBoYW5kbGUucGVybWl0ZWRfdXNlcikge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlYWJsZWApLnNldCh7IG1vdmVhYmxlOiBcInRydWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvbW92ZWFibGVLZXlgKS5zZXQoeyBtb3ZlYWJsZUtleTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogMCB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvWWApLnNldCh7IHk6IDAgfSlcclxuICAgICAgICAgICAgICAgIC8vIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL0lzTG9naW5gKS5zZXQoeyBib29sOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50aGlzX25vZGVfdXNlciA9IGhhbmRsZS5wZXJtaXRlZF91c2VyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vZGV1c2VyOlwiLCB0aGlzLm5vZGUubmFtZSwgdGhpcy50aGlzX25vZGVfdXNlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudHVzZXI6XCIsIHRoaXMuY3VycmVudF91c2VyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudF91c2VyID09IHRoaXMudGhpc19ub2RlX3VzZXIpIGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmFcIikuZ2V0Q29tcG9uZW50KENhbWVyYU1hbmFnZXIpLkZvbGxvd1RhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICB9LCAwLjUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9jdXJyZW50X3VzZXJfdWlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBlcm1pdGVkX3VzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnJpZ2lkYm9keSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGRfbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSh0aGlzLm5vZGUubmFtZSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZF9sYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnTGFiZWwnKTtcclxuICAgICAgICB0aGlzLmNoaWxkX2FuaW0gPSB0aGlzLmNoaWxkX25vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgdGhpcy5jaGlsZF9hbmltLnBsYXkoJ0lkbGUnKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMudXBkYXRlT3RoZXJzQ3VycmVudFBvcywgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgLy9pZiB0aGUgcGxheWVyIGlzIGxvZ2dlZCBub3cgd2UgYWN0aXZlIHRoZSBub2RlIFxyXG4gICAgICAgIGlmICghdGhpcy5sb2dnZWRfaW5fb3Jfbm90KSB7XHJcbiAgICAgICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLm5vZGUubmFtZX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcGhvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZpcmViYXNlXHJcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICBsZXQgRGlyWCA9IHRoaXMubW92ZURpclhfZmlyZWJhc2U7XHJcbiAgICAgICAgbGV0IERpclkgPSB0aGlzLm1vdmVEaXJZX2ZpcmViYXNlO1xyXG4gICAgICAgIGxldCBwcmVEaXJYID0gdGhpcy5wcmVtb3ZlRGlyWF9maXJlYmFzZTtcclxuICAgICAgICBsZXQgcG9zWCA9IHRoaXMubm9kZS5wb3NpdGlvbi54O1xyXG4gICAgICAgIGxldCBwb3NZID0gdGhpcy5ub2RlLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgLy8gd3JpdGUgZmlyZWJhc2UgcmVhbHRpbWUgZGF0YWJhc2VcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgPT0gdGhpcy50aGlzX25vZGVfdXNlcikge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWGApLnNldCh7IERpcjogRGlyWCB9KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogRGlyWSB9KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9wcmVtb3ZlRGlyWGApLnNldCh7IERpcjogcHJlRGlyWCB9KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogcG9zWCB9KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9ZYCkuc2V0KHsgeTogcG9zWSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZWFkIGZpcmViYXNlIHJlYWx0aW1lIGRhdGFiYXNlXHJcbiAgICAgICAgRGlyWCA9IDAsIERpclkgPSAwLCBwcmVEaXJYID0gMDtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBEaXJYID0gc25hcHNob3QudmFsKCkubW92ZURpclguRGlyO1xyXG4gICAgICAgICAgICAgICAgRGlyWSA9IHNuYXBzaG90LnZhbCgpLm1vdmVEaXJZLkRpcjtcclxuICAgICAgICAgICAgICAgIHByZURpclggPSBzbmFwc2hvdC52YWwoKS5wcmVtb3ZlRGlyWC5EaXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZURpclggPSBEaXJYO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXJZID0gRGlyWTtcclxuICAgICAgICAgICAgdGhpcy5wcmVtb3ZlRGlyWCA9IHByZURpclg7XHJcbiAgICAgICAgfSwgMC4yKTtcclxuXHJcbiAgICAgICAgLy8gU2NhbGVcclxuICAgICAgICB0aGlzLmNoaWxkX25vZGUuc2NhbGVYID0gKHRoaXMubW92ZURpclggPj0gMCkgPyAxIDogLTE7XHJcbiAgICAgICAgaWYgKHRoaXMubW92ZURpclggPT0gMCkgdGhpcy5jaGlsZF9ub2RlLnNjYWxlWCA9ICh0aGlzLnByZW1vdmVEaXJYID49IDApID8gMSA6IC0xO1xyXG5cclxuICAgICAgICAvLyBNb3ZlXHJcbiAgICAgICAgaWYgKHRoaXMubW92ZURpclggPT0gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdmVhYmxlKSB0aGlzLnJpZ2lkYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsIHRoaXMucGxheWVyU3BlZWQgKiB0aGlzLm1vdmVEaXJZKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW92ZURpclkgPT0gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdmVhYmxlKSB0aGlzLnJpZ2lkYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHRoaXMucGxheWVyU3BlZWQgKiB0aGlzLm1vdmVEaXJYLCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdmVhYmxlKSB0aGlzLnJpZ2lkYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHRoaXMucGxheWVyU3BlZWQgKiB0aGlzLm1vdmVEaXJYICogMC43LCB0aGlzLnBsYXllclNwZWVkICogdGhpcy5tb3ZlRGlyWSAqIDAuNyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBbmltYXRpb25cclxuICAgICAgICBpZiAoKHRoaXMubW92ZURpclggPT0gMCAmJiB0aGlzLm1vdmVEaXJZID09IDApIHx8ICF0aGlzLm1vdmVhYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZF9hbmltLmdldEFuaW1hdGlvblN0YXRlKCdJZGxlJykuaXNQbGF5aW5nKSB0aGlzLmNoaWxkX2FuaW0ucGxheSgnSWRsZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZF9hbmltLmdldEFuaW1hdGlvblN0YXRlKCdNb3ZlJykuaXNQbGF5aW5nKSB0aGlzLmNoaWxkX2FuaW0ucGxheSgnTW92ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleURvd24oZXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleURvd25cIiwgZXZlbnQua2V5Q29kZSk7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnREb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVZKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25Eb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25LZXlVcChldmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5RG93blwiLCBldmVudC5rZXlDb2RlKTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdERvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZDpcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHREb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWZ0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKC0xKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bkRvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgtMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5zOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXBEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBsYXllck1vdmVYKG1vdmVEaXJYOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHJlbW92ZURpclhfZmlyZWJhc2UgPSB0aGlzLm1vdmVEaXJYX2ZpcmViYXNlO1xyXG4gICAgICAgIHRoaXMubW92ZURpclhfZmlyZWJhc2UgPSBtb3ZlRGlyWDtcclxuICAgIH1cclxuICAgIHBsYXllck1vdmVZKG1vdmVEaXJZOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubW92ZURpcllfZmlyZWJhc2UgPSBtb3ZlRGlyWTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVPdGhlcnNDdXJyZW50UG9zKCkgeyAvLyDlrprmnJ/oh6rli5Xkv67mraPlhbbku5bnjqnlrrbmraPnorrkvY3nva5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgPT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuOyAvLyDkuI3mm7TmlrDoh6rlt7HnmoRub2RlXHJcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlZnJlc2ggUG9zOlwiLCBuYW1lKTtcclxuICAgICAgICBsZXQgcG9zWCA9IC0xNDg3LCBEaXJYO1xyXG4gICAgICAgIGxldCBwb3NZID0gLTE0ODcsIERpclk7XHJcbiAgICAgICAgLy8gbGV0IElzTG9naW46IGJvb2xlYW47XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWCA9IHNuYXBzaG90LnZhbCgpLlgueDtcclxuICAgICAgICAgICAgICAgIHBvc1kgPSBzbmFwc2hvdC52YWwoKS5ZLnk7XHJcbiAgICAgICAgICAgICAgICBEaXJYID0gc25hcHNob3QudmFsKCkubW92ZURpclguRGlyO1xyXG4gICAgICAgICAgICAgICAgRGlyWSA9IHNuYXBzaG90LnZhbCgpLm1vdmVEaXJZLkRpcjtcclxuICAgICAgICAgICAgICAgIC8vIElzTG9naW4gPSBzbmFwc2hvdC52YWwoKS5Jc0xvZ2luLmJvb2w7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwb3NYID09IC0xNDg3ICYmIHBvc1kgPT0gLTE0ODcpIHJldHVybjsgLy8g5aaC5p6cZmlyZWJhc2UgZGF0YWJhc2XmspLmnInmipPliLDos4fmlpnvvIzlsLHkuI3opoHmm7TmlrDjgIJcclxuICAgICAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgICAgICBhY3Rpb24gPSBjYy5tb3ZlVG8oMC41LCBwb3NYLCBwb3NZKTsgLy8g5L+u5q2j5Lim5bmz5ruR56e75YuV5Yiw5q2j56K65L2N572uXHJcbiAgICAgICAgICAgIGlmKE1hdGguYWJzKHRoaXMubm9kZS5wb3NpdGlvbi54LXBvc1gpPjMyMCB8fCBNYXRoLmFicyh0aGlzLm5vZGUucG9zaXRpb24ueS1wb3NZKT4zMjApeyAvLyDlpoLmnpzkvY3nva7lt67lpKrlpJrlsLHnm7TmjqXploPnj77jgIJcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3NYLHBvc1kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9LCAwLjIwKTtcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/computerRule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e59ee2pAZxBsZCX7zFwtzG6', 'computerRule');
// Script/computerRule.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var computerRule = /** @class */ (function (_super) {
    __extends(computerRule, _super);
    function computerRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ruleWindow = null;
        _this.click = null;
        _this.RuleText = null;
        _this.DetailRuleText = null;
        _this.current_user_number = 0;
        _this.T1 = null;
        _this.T2 = null;
        _this.T3 = null;
        _this.T4 = null;
        return _this;
        // onEndContact(contact, self, other){
        //     if(other.node.group == 'player'){
        //         console.log("close Computer");
        //         this.readyWindow.active = false;
        //     }
        // }
        // update (dt) {}
    }
    computerRule.prototype.onLoad = function () {
    };
    computerRule.prototype.start = function () {
        var _this = this;
        var uid = firebase.auth().currentUser.uid;
        var current_user_number = 0;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                current_user_number = snapshot.val().player_number;
            }
        });
        this.scheduleOnce(function () {
            _this.current_user_number = current_user_number;
        }, 1.5);
        this.Text1Action();
        // buttons
        var rule_btn = new cc.Component.EventHandler();
        rule_btn.target = this.node;
        rule_btn.component = "computerRule";
        rule_btn.handler = "ruleEvent";
        console.log(cc.find("Canvas/Main Camera/RuleWindow/rule"));
        cc.find("Canvas/Main Camera/RuleWindow/rule").getComponent(cc.Button).clickEvents.push(rule_btn);
        var close_btn = new cc.Component.EventHandler();
        close_btn.target = this.node;
        close_btn.component = "computerRule";
        close_btn.handler = "closeEvent";
        cc.find("Canvas/Main Camera/RuleWindow/close").getComponent(cc.Button).clickEvents.push(close_btn);
        var btn1 = new cc.Component.EventHandler();
        btn1.target = this.node;
        btn1.component = "computerRule";
        btn1.handler = "btn1Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn1").getComponent(cc.Button).clickEvents.push(btn1);
        var btn2 = new cc.Component.EventHandler();
        btn2.target = this.node;
        btn2.component = "computerRule";
        btn2.handler = "btn2Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn2").getComponent(cc.Button).clickEvents.push(btn2);
        var btn3 = new cc.Component.EventHandler();
        btn3.target = this.node;
        btn3.component = "computerRule";
        btn3.handler = "btn3Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn3").getComponent(cc.Button).clickEvents.push(btn3);
        var btn4 = new cc.Component.EventHandler();
        btn4.target = this.node;
        btn4.component = "computerRule";
        btn4.handler = "btn4Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn4").getComponent(cc.Button).clickEvents.push(btn4);
        this.T1 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text1");
        this.T2 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text2");
        this.T3 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text3");
        this.T4 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text4");
    };
    computerRule.prototype.ruleEvent = function () {
        cc.audioEngine.playEffect(this.click, false);
        if (this.DetailRuleText.active == false) {
            this.DetailRuleText.active = true;
            this.T1.active = false;
            this.T2.active = false;
            this.T3.active = false;
            this.T4.active = false;
        }
        else {
            this.DetailRuleText.active = false;
            this.T1.active = false;
            this.T2.active = false;
            this.T3.active = false;
            this.T4.active = false;
        }
    };
    computerRule.prototype.closeEvent = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.DetailRuleText.active = false;
        this.ruleWindow.active = false;
        cc.find("Canvas/PlayerContainer/player" + this.current_user_number).getComponent(Player_1.default).moveable = true;
    };
    computerRule.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.group == 'player') {
            var str = "player" + this.current_user_number.toString();
            if (other.node.name == str) {
                console.log("open ComputerRule");
                this.ruleWindow.active = true;
                other.node.getComponent(Player_1.default).moveable = false;
                other.node.getComponent(Player_1.default).getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            }
        }
    };
    computerRule.prototype.Text1Action = function () {
        var action;
        var sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.RuleText.runAction(action);
    };
    computerRule.prototype.btn1Event = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = true;
        this.T2.active = false;
        this.T3.active = false;
        this.T4.active = false;
    };
    computerRule.prototype.btn2Event = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = false;
        this.T2.active = true;
        this.T3.active = false;
        this.T4.active = false;
    };
    computerRule.prototype.btn3Event = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = false;
        this.T2.active = false;
        this.T3.active = true;
        this.T4.active = false;
    };
    computerRule.prototype.btn4Event = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = false;
        this.T2.active = false;
        this.T3.active = false;
        this.T4.active = true;
    };
    __decorate([
        property(cc.Node)
    ], computerRule.prototype, "ruleWindow", void 0);
    __decorate([
        property(cc.AudioClip)
    ], computerRule.prototype, "click", void 0);
    __decorate([
        property(cc.Node)
    ], computerRule.prototype, "RuleText", void 0);
    __decorate([
        property(cc.Node)
    ], computerRule.prototype, "DetailRuleText", void 0);
    computerRule = __decorate([
        ccclass
    ], computerRule);
    return computerRule;
}(cc.Component));
exports.default = computerRule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21wdXRlclJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsbUNBQThCO0FBQ3hCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBc0pDO1FBbkpHLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLFdBQUssR0FBaUIsSUFBSSxDQUFDO1FBRTNCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFFdkIseUJBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBQ2hDLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFDbkIsUUFBRSxHQUFZLElBQUksQ0FBQztRQUNuQixRQUFFLEdBQVksSUFBSSxDQUFDO1FBQ25CLFFBQUUsR0FBWSxJQUFJLENBQUM7O1FBZ0kzQixzQ0FBc0M7UUFDdEMsd0NBQXdDO1FBQ3hDLHlDQUF5QztRQUN6QywyQ0FBMkM7UUFDM0MsUUFBUTtRQUNSLElBQUk7UUFDUCxpQkFBaUI7SUFDbEIsQ0FBQztJQXJJRyw2QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDRCQUFLLEdBQUw7UUFBQSxpQkFvREM7UUFsREcsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDMUMsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7UUFDNUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFhLEdBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ3hF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QVRkLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FzSmhDO0lBQUQsbUJBQUM7Q0F0SkQsQUFzSkMsQ0F0SnlDLEVBQUUsQ0FBQyxTQUFTLEdBc0pyRDtrQkF0Sm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbXB1dGVyUnVsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBydWxlV2luZG93OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBjbGljazogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgUnVsZVRleHQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBEZXRhaWxSdWxlVGV4dDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBUMTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIFQyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgVDM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBUNDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICAgICAgbGV0IHVpZCA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRfdXNlcl9udW1iZXIgPSAwO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB1c2VyX2luZm8vJHt1aWR9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRfdXNlcl9udW1iZXIgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIgPSBjdXJyZW50X3VzZXJfbnVtYmVyO1xyXG4gICAgICAgIH0sMS41KTtcclxuICAgICAgICB0aGlzLlRleHQxQWN0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIGJ1dHRvbnNcclxuICAgICAgICBsZXQgcnVsZV9idG4gPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIHJ1bGVfYnRuLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBydWxlX2J0bi5jb21wb25lbnQgPSBcImNvbXB1dGVyUnVsZVwiO1xyXG4gICAgICAgIHJ1bGVfYnRuLmhhbmRsZXIgPSBcInJ1bGVFdmVudFwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmEvUnVsZVdpbmRvdy9ydWxlXCIpKTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL1J1bGVXaW5kb3cvcnVsZVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHJ1bGVfYnRuKTtcclxuICAgICAgICBsZXQgY2xvc2VfYnRuID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBjbG9zZV9idG4udGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGNsb3NlX2J0bi5jb21wb25lbnQgPSBcImNvbXB1dGVyUnVsZVwiO1xyXG4gICAgICAgIGNsb3NlX2J0bi5oYW5kbGVyID0gXCJjbG9zZUV2ZW50XCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYS9SdWxlV2luZG93L2Nsb3NlXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goY2xvc2VfYnRuKTtcclxuICAgICAgICBsZXQgYnRuMSA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgYnRuMS50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYnRuMS5jb21wb25lbnQgPSBcImNvbXB1dGVyUnVsZVwiO1xyXG4gICAgICAgIGJ0bjEuaGFuZGxlciA9IFwiYnRuMUV2ZW50XCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYS9SdWxlV2luZG93L01lc3NhZ2UvYnRuMVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGJ0bjEpO1xyXG4gICAgICAgIGxldCBidG4yID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBidG4yLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBidG4yLmNvbXBvbmVudCA9IFwiY29tcHV0ZXJSdWxlXCI7XHJcbiAgICAgICAgYnRuMi5oYW5kbGVyID0gXCJidG4yRXZlbnRcIjtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL1J1bGVXaW5kb3cvTWVzc2FnZS9idG4yXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goYnRuMik7XHJcbiAgICAgICAgbGV0IGJ0bjMgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIGJ0bjMudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJ0bjMuY29tcG9uZW50ID0gXCJjb21wdXRlclJ1bGVcIjtcclxuICAgICAgICBidG4zLmhhbmRsZXIgPSBcImJ0bjNFdmVudFwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmEvUnVsZVdpbmRvdy9NZXNzYWdlL2J0bjNcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChidG4zKTtcclxuICAgICAgICBsZXQgYnRuNCA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgYnRuNC50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYnRuNC5jb21wb25lbnQgPSBcImNvbXB1dGVyUnVsZVwiO1xyXG4gICAgICAgIGJ0bjQuaGFuZGxlciA9IFwiYnRuNEV2ZW50XCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYS9SdWxlV2luZG93L01lc3NhZ2UvYnRuNFwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGJ0bjQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuVDEgPSBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL1J1bGVXaW5kb3cvTWVzc2FnZS9UZXh0MVwiKTtcclxuICAgICAgICB0aGlzLlQyID0gY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYS9SdWxlV2luZG93L01lc3NhZ2UvVGV4dDJcIik7XHJcbiAgICAgICAgdGhpcy5UMyA9IGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmEvUnVsZVdpbmRvdy9NZXNzYWdlL1RleHQzXCIpO1xyXG4gICAgICAgIHRoaXMuVDQgPSBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL1J1bGVXaW5kb3cvTWVzc2FnZS9UZXh0NFwiKTtcclxuXHJcbiAgICB9XHJcbiAgICBydWxlRXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICBpZih0aGlzLkRldGFpbFJ1bGVUZXh0LmFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuRGV0YWlsUnVsZVRleHQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5UMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UNC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5EZXRhaWxSdWxlVGV4dC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UNC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2xvc2VFdmVudCgpe1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuRGV0YWlsUnVsZVRleHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ydWxlV2luZG93LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHt0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXJ9YCkuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG5cclxuICAgIH1cclxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3QsIHNlbGYsIG90aGVyKSB7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAncGxheWVyJyl7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcInBsYXllclwiK3RoaXMuY3VycmVudF91c2VyX251bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZihvdGhlci5ub2RlLm5hbWUgPT0gc3RyKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BlbiBDb21wdXRlclJ1bGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGVXaW5kb3cuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KFBsYXllcikuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgVGV4dDFBY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC41LCAxLjEpLCBjYy5zY2FsZVRvKDAuNSwgMSkpO1xyXG4gICAgICAgIGFjdGlvbiA9IGNjLnJlcGVhdEZvcmV2ZXIoc2VxdWVuY2UpO1xyXG4gICAgICAgIHRoaXMuUnVsZVRleHQucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcbiAgICBidG4xRXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB0aGlzLlQxLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5UMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlQzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBidG4yRXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB0aGlzLlQxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlQzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBidG4zRXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB0aGlzLlQxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5UMy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuVDQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBidG40RXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB0aGlzLlQxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5UMy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlQ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyBvbkVuZENvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpe1xyXG4gICAgLy8gICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ3BsYXllcicpe1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIENvbXB1dGVyXCIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnJlYWR5V2luZG93LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/LobbyManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '56e87Na+PxPrLTXUo0zsY0w', 'LobbyManager');
// Script/LobbyManager.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LobbyManager = /** @class */ (function (_super) {
    __extends(LobbyManager, _super);
    function LobbyManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LoadingBG = null;
        _this.startingBG = null;
        _this.JoinGameText = null;
        _this.ReadyLabel = null;
        _this.ReadyCountLabel = null;
        _this.readyWindow = null;
        _this.click = null;
        _this.physicManager = null;
        _this.initialization = false;
        _this.counting = 0;
        _this.current_user_number = 0;
        _this.Max_player_ready_number = 5; // 玩家應該要多少人準備才會開始。
        return _this;
    }
    LobbyManager.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
    };
    LobbyManager.prototype.start = function () {
        var _this = this;
        this.LoadingBG.active = true;
        var uid = firebase.auth().currentUser.uid;
        var current_user_number = 0;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                current_user_number = snapshot.val().player_number;
            }
        });
        this.scheduleOnce(function () {
            // console.log("now is:", current_user_number);
            _this.current_user_number = current_user_number;
            if (current_user_number != 0) {
                firebase.database().ref("player/player" + current_user_number + "_isReady").set(false);
                firebase.database().ref("player/player" + current_user_number + "_islogin").set(true);
            }
            switch (current_user_number) {
                case 1:
                    firebase.database().ref('player/player1_islogin').onDisconnect().set(false);
                    break;
                case 2:
                    firebase.database().ref('player/player2_islogin').onDisconnect().set(false);
                    break;
                case 3:
                    firebase.database().ref('player/player3_islogin').onDisconnect().set(false);
                    break;
                case 4:
                    firebase.database().ref('player/player4_islogin').onDisconnect().set(false);
                    break;
                case 5:
                    firebase.database().ref('player/player5_islogin').onDisconnect().set(false);
                    break;
            }
            _this.schedule(_this.UpdateUser, 1);
            _this.schedule(_this.UpdateMaxReady, 1);
        }, 1);
        this.scheduleOnce(function () {
            _this.LoadingBG.active = false;
            _this.Text1Action();
            _this.schedule(_this.CheckReadyState, 0.2);
        }, 3);
        // buttons
        var ready_btn = new cc.Component.EventHandler();
        ready_btn.target = this.node;
        ready_btn.component = "LobbyManager";
        ready_btn.handler = "readyEvent";
        cc.find("Canvas/Main Camera/readyWindow/ready").getComponent(cc.Button).clickEvents.push(ready_btn);
        var close_btn = new cc.Component.EventHandler();
        close_btn.target = this.node;
        close_btn.component = "LobbyManager";
        close_btn.handler = "closeEvent";
        cc.find("Canvas/Main Camera/readyWindow/close").getComponent(cc.Button).clickEvents.push(close_btn);
    };
    LobbyManager.prototype.update = function (dt) {
    };
    LobbyManager.prototype.UpdateUser = function () {
        var handle = this;
        if (this.counting < 5) {
            var _loop_1 = function (i) {
                if (cc.find("Canvas/PlayerContainer/player" + i).active == true) {
                    return "continue";
                }
                else {
                    firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                        if (snapshot.val() == true) {
                            console.log("Welcome! Player", i);
                            handle.counting += 1;
                            cc.find("Canvas/PlayerContainer/player" + i).active = true;
                            firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                            firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                            firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                            firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                            firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: 16 });
                            firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -48 });
                        }
                    });
                }
            };
            for (var i = 1; i <= 5; i++) {
                _loop_1(i);
            }
        }
    };
    LobbyManager.prototype.Text1Action = function () {
        var action;
        var sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.JoinGameText.runAction(action);
    };
    LobbyManager.prototype.readyEvent = function () {
        var t = this;
        cc.audioEngine.playEffect(this.click, false);
        // console.log("Player", this.current_user_number, "is ready");
        firebase.database().ref("player/player" + t.current_user_number + "_isReady").set(true);
        this.ReadyLabel.runAction(cc.fadeTo(0.1, 255));
    };
    LobbyManager.prototype.closeEvent = function () {
        var t = this;
        cc.audioEngine.playEffect(this.click, false);
        // console.log("Player", this.current_user_number, "is Not ready");
        firebase.database().ref("player/player" + t.current_user_number + "_isReady").set(false);
        console.log("close Computer");
        this.readyWindow.active = false;
        cc.find("Canvas/PlayerContainer/player" + this.current_user_number).getComponent(Player_1.default).moveable = true;
        this.ReadyLabel.runAction(cc.fadeTo(0.1, 100));
    };
    LobbyManager.prototype.CheckReadyState = function () {
        var _this = this;
        var ready_count = 0;
        var _loop_2 = function (i) {
            firebase.database().ref("player/player" + i + "_isReady").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                        if (snapshot.val() == true) {
                            // console.log("Check",i, "isReady");
                            ready_count++;
                        }
                    });
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_2(i);
        }
        this.scheduleOnce(function () {
            var str = "(";
            str += ready_count.toString();
            str += "/";
            str += _this.Max_player_ready_number.toString();
            str += ")";
            _this.ReadyCountLabel.getComponent(cc.Label).string = str;
            if (ready_count == _this.Max_player_ready_number) {
                _this.scheduleOnce(function () {
                    if (ready_count != 1)
                        _this.startingBG.active = true;
                }, 1);
                _this.scheduleOnce(function () {
                    if (ready_count != 1)
                        cc.director.loadScene("GameStage1");
                    // cc.director.loadScene("GameEnd");
                }, 2);
            }
        }, 1);
    };
    LobbyManager.prototype.UpdateMaxReady = function () {
        var _this = this;
        var login_count = 0;
        for (var i = 1; i <= 5; i++) {
            firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    // console.log("Check",i, "isReady");
                    login_count++;
                }
            });
        }
        this.scheduleOnce(function () {
            if (login_count == 0) {
                _this.Max_player_ready_number = 5;
            }
            else {
                _this.Max_player_ready_number = login_count;
            }
        }, 0.5);
    };
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "LoadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "startingBG", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "JoinGameText", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "ReadyLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "ReadyCountLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "readyWindow", void 0);
    __decorate([
        property(cc.AudioClip)
    ], LobbyManager.prototype, "click", void 0);
    LobbyManager = __decorate([
        ccclass
    ], LobbyManager);
    return LobbyManager;
}(cc.Component));
exports.default = LobbyManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsbUNBQThCO0FBRXhCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBZ01DO1FBN0xHLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFN0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFFaEMsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsV0FBSyxHQUFpQixJQUFJLENBQUM7UUFFbkIsbUJBQWEsR0FBc0IsSUFBSSxDQUFDO1FBQ2hELG9CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFFTCx5QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFDaEMsNkJBQXVCLEdBQVcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCOztJQTBLbkUsQ0FBQztJQXhLRyw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBQUEs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LENBQUM7U0FDTjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFHLFdBQVcsSUFBSSxDQUFDLEVBQUM7Z0JBQ2hCLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7YUFDcEM7aUJBQUk7Z0JBQ0QsS0FBSSxDQUFDLHVCQUF1QixHQUFHLFdBQVcsQ0FBQzthQUM5QztRQUNMLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNYLENBQUM7SUE1TEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDUTtJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNTO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1c7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUztJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNjO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzsrQ0FDSTtJQWZWLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FnTWhDO0lBQUQsbUJBQUM7Q0FoTUQsQUFnTUMsQ0FoTXlDLEVBQUUsQ0FBQyxTQUFTLEdBZ01yRDtrQkFoTW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2JieU1hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTG9hZGluZ0JHOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc3RhcnRpbmdCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEpvaW5HYW1lVGV4dDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFJlYWR5TGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBSZWFkeUNvdW50TGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICByZWFkeVdpbmRvdzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgY2xpY2s6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBwaHlzaWNNYW5hZ2VyOiBjYy5QaHlzaWNzTWFuYWdlciA9IG51bGw7XHJcbiAgICBpbml0aWFsaXphdGlvbiA9IGZhbHNlO1xyXG4gICAgY291bnRpbmcgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyX251bWJlcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgTWF4X3BsYXllcl9yZWFkeV9udW1iZXI6IG51bWJlciA9IDU7IC8vIOeOqeWutuaHieipsuimgeWkmuWwkeS6uua6luWCmeaJjeacg+mWi+Wni+OAglxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMucGh5c2ljTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZ3Jhdml0eSA9IGNjLnYyKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuTG9hZGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCB1aWQgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgICAgIGxldCBjdXJyZW50X3VzZXJfbnVtYmVyID0gMDtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdXNlcl9pbmZvLyR7dWlkfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm5vdyBpczpcIiwgY3VycmVudF91c2VyX251bWJlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF91c2VyX251bWJlciA9IGN1cnJlbnRfdXNlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50X3VzZXJfbnVtYmVyICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtjdXJyZW50X3VzZXJfbnVtYmVyfV9pc1JlYWR5YCkuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtjdXJyZW50X3VzZXJfbnVtYmVyfV9pc2xvZ2luYCkuc2V0KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY3VycmVudF91c2VyX251bWJlcikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdwbGF5ZXIvcGxheWVyMV9pc2xvZ2luJykub25EaXNjb25uZWN0KCkuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3BsYXllcjJfaXNsb2dpbicpLm9uRGlzY29ubmVjdCgpLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3BsYXllci9wbGF5ZXIzX2lzbG9naW4nKS5vbkRpc2Nvbm5lY3QoKS5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdwbGF5ZXIvcGxheWVyNF9pc2xvZ2luJykub25EaXNjb25uZWN0KCkuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3BsYXllcjVfaXNsb2dpbicpLm9uRGlzY29ubmVjdCgpLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLlVwZGF0ZVVzZXIsIDEpOyBcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLlVwZGF0ZU1heFJlYWR5LCAxKTtcclxuICAgICAgICB9LCAxKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkxvYWRpbmdCRy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0MUFjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuQ2hlY2tSZWFkeVN0YXRlLCAwLjIpO1xyXG4gICAgICAgIH0sIDMpO1xyXG5cclxuICAgICAgICAvLyBidXR0b25zXHJcbiAgICAgICAgbGV0IHJlYWR5X2J0biA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgcmVhZHlfYnRuLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICByZWFkeV9idG4uY29tcG9uZW50ID0gXCJMb2JieU1hbmFnZXJcIjtcclxuICAgICAgICByZWFkeV9idG4uaGFuZGxlciA9IFwicmVhZHlFdmVudFwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmEvcmVhZHlXaW5kb3cvcmVhZHlcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChyZWFkeV9idG4pO1xyXG4gICAgICAgIGxldCBjbG9zZV9idG4gPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIGNsb3NlX2J0bi50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgY2xvc2VfYnRuLmNvbXBvbmVudCA9IFwiTG9iYnlNYW5hZ2VyXCI7XHJcbiAgICAgICAgY2xvc2VfYnRuLmhhbmRsZXIgPSBcImNsb3NlRXZlbnRcIjtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL3JlYWR5V2luZG93L2Nsb3NlXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goY2xvc2VfYnRuKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcblxyXG4gICAgfVxyXG4gICAgVXBkYXRlVXNlcigpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5jb3VudGluZyA8IDUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9YCkuYWN0aXZlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2VsY29tZSEgUGxheWVyXCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmNvdW50aW5nICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllciR7aX1gKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9wcmVtb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiAxNiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvWWApLnNldCh7IHk6IC00OCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBUZXh0MUFjdGlvbigpIHtcclxuICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDEuMSksIGNjLnNjYWxlVG8oMC41LCAxKSk7XHJcbiAgICAgICAgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzZXF1ZW5jZSk7XHJcbiAgICAgICAgdGhpcy5Kb2luR2FtZVRleHQucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcbiAgICByZWFkeUV2ZW50KCkge1xyXG4gICAgICAgIGxldCB0ID0gdGhpcztcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBsYXllclwiLCB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIsIFwiaXMgcmVhZHlcIik7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllci9wbGF5ZXIke3QuY3VycmVudF91c2VyX251bWJlcn1faXNSZWFkeWApLnNldCh0cnVlKTtcclxuICAgICAgICB0aGlzLlJlYWR5TGFiZWwucnVuQWN0aW9uKGNjLmZhZGVUbygwLjEsIDI1NSkpO1xyXG4gICAgfVxyXG4gICAgY2xvc2VFdmVudCgpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJQbGF5ZXJcIiwgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLCBcImlzIE5vdCByZWFkeVwiKTtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyL3BsYXllciR7dC5jdXJyZW50X3VzZXJfbnVtYmVyfV9pc1JlYWR5YCkuc2V0KGZhbHNlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIENvbXB1dGVyXCIpO1xyXG4gICAgICAgIHRoaXMucmVhZHlXaW5kb3cuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke3RoaXMuY3VycmVudF91c2VyX251bWJlcn1gKS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5SZWFkeUxhYmVsLnJ1bkFjdGlvbihjYy5mYWRlVG8oMC4xLCAxMDApKTtcclxuICAgIH1cclxuICAgIENoZWNrUmVhZHlTdGF0ZSgpIHsgLy8g5a6a5pyf5qqi5p+l5q+P5L2N546p5a625piv5ZCmcmVhZHnvvIzpg73mupblgpnlpb3lsLHplovlp4vjgIJcclxuICAgICAgICBsZXQgcmVhZHlfY291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyL3BsYXllciR7aX1faXNSZWFkeWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2hlY2tcIixpLCBcImlzUmVhZHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkeV9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcIihcIjtcclxuICAgICAgICAgICAgc3RyICs9IHJlYWR5X2NvdW50LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHN0ciArPSBcIi9cIjtcclxuICAgICAgICAgICAgc3RyICs9IHRoaXMuTWF4X3BsYXllcl9yZWFkeV9udW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgc3RyICs9IFwiKVwiO1xyXG4gICAgICAgICAgICB0aGlzLlJlYWR5Q291bnRMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cjtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWFkeV9jb3VudCA9PSB0aGlzLk1heF9wbGF5ZXJfcmVhZHlfbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVhZHlfY291bnQgIT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZWFkeV9jb3VudCAhPSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2UxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lRW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZU1heFJlYWR5KCl7XHJcbiAgICAgICAgbGV0IGxvZ2luX2NvdW50ID0gMDtcclxuICAgICAgICBmb3IobGV0IGk9MTtpPD01O2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDaGVja1wiLGksIFwiaXNSZWFkeVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpbl9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgaWYobG9naW5fY291bnQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1heF9wbGF5ZXJfcmVhZHlfbnVtYmVyID0gNTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1heF9wbGF5ZXJfcmVhZHlfbnVtYmVyID0gbG9naW5fY291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LDAuNSk7XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ready_to_S1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab0aeUex1hCEZENd0Yns22t', 'ready_to_S1');
// Script/ready_to_S1.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.condition = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        var ready_press = new cc.Component.EventHandler();
        //console.log("1")
        ready_press.target = this.node;
        ready_press.component = "ready_to_S1";
        ready_press.handler = "ready_player";
        cc.find("Canvas/ready").getComponent(cc.Button).clickEvents.push(ready_press);
    };
    NewClass.prototype.ready_player = function () {
        var user = firebase.auth().currentUser;
        firebase.database().ref("game" + 1 + "/player_ready_number").once('value', function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref("game" + 1 + "/player_ready_number").set({ number: 1 });
            }
            else if (snapshot.val().number == '1') {
                firebase.database().ref("game" + 1 + "/player_ready_number").set({ number: 2 });
            }
        });
        //get the current time
        var today = new Date();
        var time = today.getTime();
        this.old_time = time;
        console.log("old_time: " + this.old_time);
        //get every player to update the time
        var sessionsRef = firebase.database().ref("sessions");
        sessionsRef.set({
            startedAt: firebase.database.ServerValue.TIMESTAMP
        });
        var handle = this;
        firebase.database().ref("sessions").once('value', function (snapshot) {
            handle.servertime = snapshot.val().startedAt;
        });
        console.log("delay from p1 to server: " + (handle.servertime - this.old_time));
        var now = new Date();
        var now_time = now.getTime();
        console.log(now_time - this.old_time);
        this.delay = (now_time - this.old_time) / 1000;
        console.log("delay from server to p1: " + (now_time - handle.servertime));
    };
    NewClass.prototype.update = function (dt) {
        var user = firebase.auth().currentUser;
        var handle = this;
        var old = new Date();
        var time_old = old.getTime();
        if (this.condition == false) {
            //not all the players have been assigned to ready yet
            firebase.database().ref("game" + 1 + "/player_ready_number").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().number == '2') {
                        handle.condition = true;
                        //read the data from firebase
                        var current_time = new Date();
                        var time = current_time.getTime();
                        //get teh delay
                        var delay = Math.abs((time - time_old) / 2000);
                        console.log("delay time: " + delay);
                        handle.scheduleOnce(function () {
                            // Here this refers to component
                            cc.director.loadScene("GameStage2");
                        }, 2 - delay);
                    }
                }
            });
        }
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxyZWFkeV90b19TMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUkxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQWtGQztRQTVFRyxlQUFTLEdBQUMsS0FBSyxDQUFDOztJQTRFcEIsQ0FBQztJQTFFRyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLHdCQUFLLEdBQUw7UUFDSSxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsa0JBQWtCO1FBQ2xCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvQixXQUFXLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztRQUN0QyxXQUFXLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsK0JBQVksR0FBWjtRQUNJLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdkMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFPLENBQUMseUJBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUNwRixJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxJQUFJ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NkJBQTZCO3dCQUM3QixJQUFJLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUM5QixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2xDLGVBQWU7d0JBQ2YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzt3QkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUE7d0JBQ25DLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQ2hCLGdDQUFnQzs0QkFDaEMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3hDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7cUJBQ2pCO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFqRmdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FrRjVCO0lBQUQsZUFBQztDQWxGRCxBQWtGQyxDQWxGcUMsRUFBRSxDQUFDLFNBQVMsR0FrRmpEO2tCQWxGb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIG9sZF90aW1lO1xyXG4gICAgc2VydmVydGltZTtcclxuICAgIGRlbGF5O1xyXG4gICAgY29uZGl0aW9uPWZhbHNlO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICBsZXQgcmVhZHlfcHJlc3MgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIxXCIpXHJcbiAgICAgICAgcmVhZHlfcHJlc3MudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHJlYWR5X3ByZXNzLmNvbXBvbmVudCA9IFwicmVhZHlfdG9fUzFcIjtcclxuICAgICAgICByZWFkeV9wcmVzcy5oYW5kbGVyID0gXCJyZWFkeV9wbGF5ZXJcIjtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3JlYWR5XCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2gocmVhZHlfcHJlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWR5X3BsYXllcigpIHtcclxuICAgICAgICB2YXIgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlcjtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZSR7MX0vcGxheWVyX3JlYWR5X251bWJlcmApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZSR7MX0vcGxheWVyX3JlYWR5X251bWJlcmApLnNldCh7IG51bWJlcjogMSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzbmFwc2hvdC52YWwoKS5udW1iZXIgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZSR7MX0vcGxheWVyX3JlYWR5X251bWJlcmApLnNldCh7IG51bWJlcjogMiB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIC8vZ2V0IHRoZSBjdXJyZW50IHRpbWVcclxuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHZhciB0aW1lID0gdG9kYXkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMub2xkX3RpbWUgPSB0aW1lO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib2xkX3RpbWU6IFwiICsgdGhpcy5vbGRfdGltZSk7XHJcbiAgICAgICAgLy9nZXQgZXZlcnkgcGxheWVyIHRvIHVwZGF0ZSB0aGUgdGltZVxyXG4gICAgICAgIHZhciBzZXNzaW9uc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwic2Vzc2lvbnNcIik7XHJcbiAgICAgICAgc2Vzc2lvbnNSZWYuc2V0KHtcclxuICAgICAgICAgICAgc3RhcnRlZEF0OiBmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVBcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgaGFuZGxlID0gdGhpcztcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInNlc3Npb25zXCIpLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGhhbmRsZS5zZXJ2ZXJ0aW1lID0gc25hcHNob3QudmFsKCkuc3RhcnRlZEF0XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRlbGF5IGZyb20gcDEgdG8gc2VydmVyOiBcIiArIChoYW5kbGUuc2VydmVydGltZSAtIHRoaXMub2xkX3RpbWUpKTtcclxuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICB2YXIgbm93X3RpbWUgPSBub3cuZ2V0VGltZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5vd190aW1lIC0gdGhpcy5vbGRfdGltZSk7XHJcbiAgICAgICAgdGhpcy5kZWxheSA9IChub3dfdGltZSAtIHRoaXMub2xkX3RpbWUpIC8gMTAwMDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRlbGF5IGZyb20gc2VydmVyIHRvIHAxOiBcIiArIChub3dfdGltZSAtIGhhbmRsZS5zZXJ2ZXJ0aW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIHZhciB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgIHZhciBvbGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGltZV9vbGQgPSBvbGQuZ2V0VGltZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmRpdGlvbiA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvL25vdCBhbGwgdGhlIHBsYXllcnMgaGF2ZSBiZWVuIGFzc2lnbmVkIHRvIHJlYWR5IHlldFxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZSR7MX0vcGxheWVyX3JlYWR5X251bWJlcmApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKS5udW1iZXIgPT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5jb25kaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlYWQgdGhlIGRhdGEgZnJvbSBmaXJlYmFzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudF90aW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWUgPSBjdXJyZW50X3RpbWUuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dldCB0ZWggZGVsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGF5ID0gTWF0aC5hYnMoKHRpbWUgLSB0aW1lX29sZCkgLyAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWxheSB0aW1lOiBcIiArIGRlbGF5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhlcmUgdGhpcyByZWZlcnMgdG8gY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2UyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyIC0gZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/CameraManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1d32apg0lNfqbbMZXmlqL9', 'CameraManager');
// Script/CameraManager.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CameraManager = /** @class */ (function (_super) {
    __extends(CameraManager, _super);
    function CameraManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.FollowTarget = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    CameraManager.prototype.start = function () {
    };
    CameraManager.prototype.update = function (dt) {
        if (this.FollowTarget) {
            var End = cc.find("End");
            if (End != null) {
                var x = this.FollowTarget.position.x;
                if (x < -480) {
                    x = -480;
                }
                else if (x > 480) {
                    x = 480;
                }
                this.node.setPosition(x, 0);
            }
            else {
                this.node.setPosition(this.FollowTarget.position.x, this.FollowTarget.position.y);
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], CameraManager.prototype, "FollowTarget", void 0);
    CameraManager = __decorate([
        ccclass
    ], CameraManager);
    return CameraManager;
}(cc.Component));
exports.default = CameraManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDYW1lcmFNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBNkJDO1FBMUJHLGtCQUFZLEdBQVksSUFBSSxDQUFDOztJQTBCakMsQ0FBQztJQXhCRyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLDZCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFRLEVBQUU7UUFDTixJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUM7WUFDakIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixJQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUM7Z0JBQ1gsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFHLENBQUMsR0FBQyxDQUFDLEdBQUcsRUFBQztvQkFDTixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7aUJBQ1o7cUJBQUssSUFBRyxDQUFDLEdBQUMsR0FBRyxFQUFDO29CQUNYLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ1g7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQy9CO2lCQUFJO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyRjtTQUNKO0lBQ0wsQ0FBQztJQXpCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNXO0lBSFosYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQTZCakM7SUFBRCxvQkFBQztDQTdCRCxBQTZCQyxDQTdCMEMsRUFBRSxDQUFDLFNBQVMsR0E2QnREO2tCQTdCb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBGb2xsb3dUYXJnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKHRoaXMuRm9sbG93VGFyZ2V0KXtcclxuICAgICAgICAgICAgbGV0IEVuZCA9IGNjLmZpbmQoXCJFbmRcIik7XHJcbiAgICAgICAgICAgIGlmKEVuZCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5Gb2xsb3dUYXJnZXQucG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIGlmKHg8LTQ4MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IC00ODA7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih4PjQ4MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IDQ4MDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih4LCAwKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5Gb2xsb3dUYXJnZXQucG9zaXRpb24ueCwgdGhpcy5Gb2xsb3dUYXJnZXQucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/log.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a1318oSHlxFlIBMY42EGHQD', 'log');
// Script/log.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.log_forum = null;
        _this.account = null;
        _this.password = null;
        _this.close = null;
        _this.login2 = null;
        _this.signin2 = null;
        _this.player1 = null;
        _this.player2 = null;
        _this.player3 = null;
        _this.player4 = null;
        _this.player5 = null;
        _this.spaceBG = null;
        _this.LoadingBG = null;
        _this.MutiTag = null;
        _this.BGM = null;
        _this.click = null;
        _this.videoclip = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        // this.videoclip.node.on('ready-to-play', this.playvideo, this);
    };
    NewClass.prototype.start = function () {
        cc.audioEngine.playMusic(this.BGM, true);
        console.log("1");
        var log_in_this = new cc.Component.EventHandler();
        console.log("1");
        log_in_this.target = this.node;
        log_in_this.component = "log";
        log_in_this.handler = "login_forum";
        cc.find("Canvas/UI/log_in").getComponent(cc.Button).clickEvents.push(log_in_this);
        var log_out_this = new cc.Component.EventHandler();
        log_out_this.target = this.node;
        log_out_this.component = "log";
        log_out_this.handler = "signin_forum";
        console.log("2");
        cc.find("Canvas/UI/sign_in").getComponent(cc.Button).clickEvents.push(log_out_this);
        console.log("2");
        var exit_game = new cc.Component.EventHandler();
        exit_game.target = this.node;
        exit_game.component = "log";
        exit_game.handler = "gameEnd";
        console.log("3");
        cc.find("Canvas/UI/EXIT").getComponent(cc.Button).clickEvents.push(exit_game);
        console.log("3");
        // get the user info
        var email_sign = new cc.Component.EventHandler();
        email_sign.target = this.node;
        email_sign.component = "log";
        email_sign.handler = "email_signin";
        cc.find("Canvas/UI/sign_in2").getComponent(cc.Button).clickEvents.push(email_sign);
        var email_log = new cc.Component.EventHandler();
        email_log.target = this.node;
        email_log.component = "log";
        email_log.handler = "email_login";
        cc.find("Canvas/UI/log_in2").getComponent(cc.Button).clickEvents.push(email_log);
        var close_log = new cc.Component.EventHandler();
        close_log.target = this.node;
        close_log.component = "log";
        close_log.handler = "close_forum";
        cc.find("Canvas/UI/close").getComponent(cc.Button).clickEvents.push(close_log);
        this.playerMove(Math.random() * 2);
        this.backgroundMove();
    };
    NewClass.prototype.login_forum = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.log_forum.active = true;
        this.account.active = true;
        this.password.active = true;
        this.login2.active = true;
        this.close.active = true;
    };
    NewClass.prototype.signin_forum = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.log_forum.active = true;
        this.account.active = true;
        this.password.active = true;
        this.signin2.active = true;
        this.close.active = true;
    };
    NewClass.prototype.close_forum = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.log_forum.active = false;
        this.account.active = false;
        this.password.active = false;
        this.signin2.active = false;
        this.login2.active = false;
        this.close.active = false;
    };
    NewClass.prototype.email_signin = function () {
        var email = this.account.getComponent(cc.EditBox).string;
        console.log(email);
        var password = this.password.getComponent(cc.EditBox).string;
        console.log(password);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function () {
            console.log("fuck yeah");
        })
            .catch(function (e) {
            console.log(e);
        });
        cc.audioEngine.playEffect(this.click, false);
        this.close_forum();
    };
    NewClass.prototype.email_login = function () {
        var email = this.account.getComponent(cc.EditBox).string;
        console.log(email);
        var password = this.password.getComponent(cc.EditBox).string;
        console.log(password);
        var t = this;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (userCredential) {
            var user_info = { email: email, uid: userCredential.user.uid, player_number: 0 };
            firebase
                .database()
                .ref("user_list")
                .on("value", function (snapshot) {
                //console.log("check1");
                var new_or_not = false;
                snapshot.forEach(function (childNodes) {
                    var obj = childNodes.val();
                    if (obj.uid == user_info.uid) {
                        new_or_not = true;
                    }
                });
                if (!new_or_not) {
                    //need to update player number
                    firebase.database().ref('player/player_number').once('value', function (snapshot) {
                        //  console.log("wtf"+snapshot.val())
                        if (snapshot.val() == null) {
                            user_info = { email: email, uid: userCredential.user.uid, player_number: 1 };
                            //console.log("p2")
                            firebase.database().ref('player/player_number').set({ player_number: 1 });
                            //also set the player info
                            firebase.database().ref("player_data/player" + 1).set(user_info);
                            firebase.database().ref("user_list").push(user_info);
                            firebase.database().ref("user_info/" + userCredential.user.uid).set(user_info);
                        }
                        else {
                            console.log(snapshot.val().player_number);
                            var number = snapshot.val().player_number;
                            var newnumber = parseInt(number, 10) + 1;
                            firebase.database().ref('player/player_number').set({ player_number: newnumber });
                            user_info = { email: email, uid: userCredential.user.uid, player_number: newnumber };
                            firebase.database().ref("player_data/player" + newnumber).set(user_info);
                            firebase.database().ref("user_list").push(user_info);
                            firebase.database().ref("user_info/" + userCredential.user.uid).set(user_info);
                        }
                    });
                    // firebase.database().ref("user_list").push(user_info);
                    // firebase.database().ref("user_info/" + userCredential.user.uid).set(user_info);
                }
            });
            // firebase.auth().onAuthStateChanged(user=>{
            //  if(user){
            //   console.log("user info uid:"+ user.uid);
            //  }
            //  })
            t.LoadingBG.active = true;
            t.scheduleOnce(function () {
                cc.director.loadScene("Lobby");
            }, 2);
        })
            .catch(function (e) {
            console.log(e);
        });
        cc.audioEngine.playEffect(this.click, false);
    };
    ;
    NewClass.prototype.playerMove = function (delayTime) {
        var _this = this;
        var easeRate = 2;
        var action1;
        var action2;
        var action3;
        var action4;
        var action5;
        var sequence1 = cc.sequence(cc.moveBy(2.5, 0, 25).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(3.5, 0, -25).easing(cc.easeInOut(easeRate)));
        var sequence2 = cc.sequence(cc.moveBy(2, -10, 25).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(2, 10, -25).easing(cc.easeInOut(easeRate)));
        var sequence3 = cc.sequence(cc.moveBy(2.5, -20, -10).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(1.5, 20, 10).easing(cc.easeInOut(easeRate)));
        var sequence4 = cc.sequence(cc.moveBy(4, 20, 15).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(4, -20, -15).easing(cc.easeInOut(easeRate)));
        var sequence5_1 = cc.sequence(cc.moveTo(0, -580, 180), cc.moveBy(10, 1200, -100), cc.delayTime(1), cc.moveTo(0, 0, -450), cc.moveBy(10, -200, 900), cc.delayTime(1), cc.moveTo(0, 260, 450), cc.moveBy(10, -1000, -900), cc.delayTime(5));
        var sequence5_2 = cc.sequence(cc.rotateBy(10, 360), cc.delayTime(1), cc.rotateBy(10, -360), cc.delayTime(1), cc.rotateBy(10, -360), cc.delayTime(5));
        var sequence5 = cc.spawn(sequence5_1, sequence5_2);
        action1 = cc.repeatForever(sequence1);
        action2 = cc.repeatForever(sequence2);
        action3 = cc.repeatForever(sequence3);
        action4 = cc.repeatForever(sequence4);
        action5 = cc.repeatForever(sequence5);
        this.scheduleOnce(function () {
            _this.player1.runAction(action1);
            _this.player2.runAction(action2);
            _this.player3.runAction(action3);
            _this.player4.runAction(action4);
            _this.player5.runAction(action5);
        }, 1);
        // ================================================
    };
    NewClass.prototype.backgroundMove = function () {
        var action;
        // var sequence = cc.sequence(cc.rotateBy(20, 360));
        // action = cc.repeatForever(sequence);
        action = cc.repeatForever(cc.rotateBy(100, 360));
        this.spaceBG.setScale(1.5, 1.5);
        this.spaceBG.runAction(action);
        var s = cc.sequence(cc.scaleTo(1.5, 0.6).easing(cc.easeInOut(2)), cc.scaleTo(1.5, 0.5).easing(cc.easeInOut(2)), cc.delayTime(1));
        action = cc.repeatForever(s);
        this.MutiTag.runAction(action);
    };
    // playvideo(event) {
    //   console.log("HI")
    //   this.videoclip.play();
    // }
    NewClass.prototype.showWindow = function () {
    };
    NewClass.prototype.gameEnd = function () {
        cc.game.end();
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "log_forum", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "account", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "password", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "close", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "login2", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "signin2", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player1", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player2", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player3", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player4", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player5", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "spaceBG", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "LoadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "MutiTag", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "BGM", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "click", void 0);
    __decorate([
        property(cc.VideoPlayer)
    ], NewClass.prototype, "videoclip", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNKLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvSixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0osSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDOUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDaEUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDbkUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckosSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFHbkQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLFlBQVksQ0FB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Q0U7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzsyQ0FDSTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOytDQUNRO0lBdkNkLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0EyUTVCO0lBQUQsZUFBQztDQTNRRCxBQTJRQyxDQTNRcUMsRUFBRSxDQUFDLFNBQVMsR0EyUWpEO2tCQTNRb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIGxvZ19mb3J1bTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIGFjY291bnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICBwYXNzd29yZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIGNsb3NlOiBjYy5Ob2RlID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICBsb2dpbjI6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHNpZ25pbjI6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjE6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjI6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjM6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjU6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHNwYWNlQkc6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIExvYWRpbmdCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgTXV0aVRhZzogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICBCR006IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICBjbGljazogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLlZpZGVvUGxheWVyKVxyXG4gIHZpZGVvY2xpcDogY2MuVmlkZW9QbGF5ZXIgPSBudWxsO1xyXG5cclxuXHJcblxyXG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICAvLyB0aGlzLnZpZGVvY2xpcC5ub2RlLm9uKCdyZWFkeS10by1wbGF5JywgdGhpcy5wbGF5dmlkZW8sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5CR00sIHRydWUpXHJcbiAgICBjb25zb2xlLmxvZyhcIjFcIilcclxuICAgIGxldCBsb2dfaW5fdGhpcyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIjFcIilcclxuICAgIGxvZ19pbl90aGlzLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgIGxvZ19pbl90aGlzLmNvbXBvbmVudCA9IFwibG9nXCI7XHJcbiAgICBsb2dfaW5fdGhpcy5oYW5kbGVyID0gXCJsb2dpbl9mb3J1bVwiO1xyXG4gICAgY2MuZmluZChcIkNhbnZhcy9VSS9sb2dfaW5cIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChsb2dfaW5fdGhpcyk7XHJcbiAgICBsZXQgbG9nX291dF90aGlzID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgIGxvZ19vdXRfdGhpcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICBsb2dfb3V0X3RoaXMuY29tcG9uZW50ID0gXCJsb2dcIjtcclxuICAgIGxvZ19vdXRfdGhpcy5oYW5kbGVyID0gXCJzaWduaW5fZm9ydW1cIjtcclxuICAgIGNvbnNvbGUubG9nKFwiMlwiKVxyXG4gICAgY2MuZmluZChcIkNhbnZhcy9VSS9zaWduX2luXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2gobG9nX291dF90aGlzKTtcclxuICAgIGNvbnNvbGUubG9nKFwiMlwiKVxyXG4gICAgbGV0IGV4aXRfZ2FtZSA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICBleGl0X2dhbWUudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgZXhpdF9nYW1lLmNvbXBvbmVudCA9IFwibG9nXCI7XHJcbiAgICBleGl0X2dhbWUuaGFuZGxlciA9IFwiZ2FtZUVuZFwiO1xyXG4gICAgY29uc29sZS5sb2coXCIzXCIpXHJcbiAgICBjYy5maW5kKFwiQ2FudmFzL1VJL0VYSVRcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChleGl0X2dhbWUpO1xyXG4gICAgY29uc29sZS5sb2coXCIzXCIpXHJcbiAgICAvLyBnZXQgdGhlIHVzZXIgaW5mb1xyXG4gICAgbGV0IGVtYWlsX3NpZ24gPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgZW1haWxfc2lnbi50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICBlbWFpbF9zaWduLmNvbXBvbmVudCA9IFwibG9nXCI7XHJcbiAgICBlbWFpbF9zaWduLmhhbmRsZXIgPSBcImVtYWlsX3NpZ25pblwiO1xyXG4gICAgY2MuZmluZChcIkNhbnZhcy9VSS9zaWduX2luMlwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGVtYWlsX3NpZ24pO1xyXG4gICAgbGV0IGVtYWlsX2xvZyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICBlbWFpbF9sb2cudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgZW1haWxfbG9nLmNvbXBvbmVudCA9IFwibG9nXCI7XHJcbiAgICBlbWFpbF9sb2cuaGFuZGxlciA9IFwiZW1haWxfbG9naW5cIjtcclxuICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvbG9nX2luMlwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGVtYWlsX2xvZyk7XHJcbiAgICBsZXQgY2xvc2VfbG9nID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgIGNsb3NlX2xvZy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICBjbG9zZV9sb2cuY29tcG9uZW50ID0gXCJsb2dcIjtcclxuICAgIGNsb3NlX2xvZy5oYW5kbGVyID0gXCJjbG9zZV9mb3J1bVwiO1xyXG4gICAgY2MuZmluZChcIkNhbnZhcy9VSS9jbG9zZVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGNsb3NlX2xvZyk7XHJcbiAgICB0aGlzLnBsYXllck1vdmUoTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kTW92ZSgpO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgbG9naW5fZm9ydW0oKSB7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gICAgdGhpcy5sb2dfZm9ydW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuYWNjb3VudC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5wYXNzd29yZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5sb2dpbjIuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuY2xvc2UuYWN0aXZlID0gdHJ1ZTtcclxuICB9XHJcbiAgc2lnbmluX2ZvcnVtKCkge1xyXG4gICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSlcclxuICAgIHRoaXMubG9nX2ZvcnVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLmFjY291bnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMucGFzc3dvcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuc2lnbmluMi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5jbG9zZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH1cclxuICBjbG9zZV9mb3J1bSgpIHtcclxuICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICB0aGlzLmxvZ19mb3J1bS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuYWNjb3VudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMucGFzc3dvcmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNpZ25pbjIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLmxvZ2luMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuY2xvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBlbWFpbF9zaWduaW4oKSB7XHJcbiAgICB2YXIgZW1haWwgPSB0aGlzLmFjY291bnQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgIGNvbnNvbGUubG9nKGVtYWlsKTtcclxuICAgIHZhciBwYXNzd29yZCA9IHRoaXMucGFzc3dvcmQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkKTtcclxuICAgIGZpcmViYXNlXHJcbiAgICAgIC5hdXRoKClcclxuICAgICAgLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2sgeWVhaFwiKVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgfSk7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gICAgdGhpcy5jbG9zZV9mb3J1bSgpO1xyXG4gIH1cclxuXHJcbiAgZW1haWxfbG9naW4oKSB7XHJcbiAgICB2YXIgZW1haWwgPSB0aGlzLmFjY291bnQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgIGNvbnNvbGUubG9nKGVtYWlsKTtcclxuICAgIHZhciBwYXNzd29yZCA9IHRoaXMucGFzc3dvcmQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkKTtcclxuICAgIGxldCB0ID0gdGhpcztcclxuICAgIGZpcmViYXNlXHJcbiAgICAgIC5hdXRoKClcclxuICAgICAgLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZClcclxuICAgICAgLnRoZW4oXHJcbiAgICAgICAgKHVzZXJDcmVkZW50aWFsKSA9PiB7XHJcbiAgICAgICAgICB2YXIgdXNlcl9pbmZvID0geyBlbWFpbDogZW1haWwsIHVpZDogdXNlckNyZWRlbnRpYWwudXNlci51aWQsIHBsYXllcl9udW1iZXI6IDAgfTtcclxuICAgICAgICAgIGZpcmViYXNlXHJcbiAgICAgICAgICAgIC5kYXRhYmFzZSgpXHJcbiAgICAgICAgICAgIC5yZWYoXCJ1c2VyX2xpc3RcIilcclxuICAgICAgICAgICAgLm9uKFwidmFsdWVcIiwgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNoZWNrMVwiKTtcclxuICAgICAgICAgICAgICB2YXIgbmV3X29yX25vdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goZnVuY3Rpb24gKGNoaWxkTm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBjaGlsZE5vZGVzLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai51aWQgPT0gdXNlcl9pbmZvLnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXdfb3Jfbm90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBpZiAoIW5ld19vcl9ub3QpIHtcclxuICAgICAgICAgICAgICAgIC8vbmVlZCB0byB1cGRhdGUgcGxheWVyIG51bWJlclxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3BsYXllci9wbGF5ZXJfbnVtYmVyJykub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gIGNvbnNvbGUubG9nKFwid3RmXCIrc25hcHNob3QudmFsKCkpXHJcbiAgICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9pbmZvID0geyBlbWFpbDogZW1haWwsIHVpZDogdXNlckNyZWRlbnRpYWwudXNlci51aWQsIHBsYXllcl9udW1iZXI6IDEgfTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicDJcIilcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3BsYXllcl9udW1iZXInKS5zZXQoeyBwbGF5ZXJfbnVtYmVyOiAxIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbHNvIHNldCB0aGUgcGxheWVyIGluZm9cclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHsxfWApLnNldCh1c2VyX2luZm8pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2VyX2xpc3RcIikucHVzaCh1c2VyX2luZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcl9pbmZvL1wiICsgdXNlckNyZWRlbnRpYWwudXNlci51aWQpLnNldCh1c2VyX2luZm8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzbmFwc2hvdC52YWwoKS5wbGF5ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXIgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdudW1iZXIgPSBwYXJzZUludChudW1iZXIsIDEwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3BsYXllci9wbGF5ZXJfbnVtYmVyJykuc2V0KHsgcGxheWVyX251bWJlcjogbmV3bnVtYmVyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9pbmZvID0geyBlbWFpbDogZW1haWwsIHVpZDogdXNlckNyZWRlbnRpYWwudXNlci51aWQsIHBsYXllcl9udW1iZXI6IG5ld251bWJlciB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke25ld251bWJlcn1gKS5zZXQodXNlcl9pbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJfbGlzdFwiKS5wdXNoKHVzZXJfaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2VyX2luZm8vXCIgKyB1c2VyQ3JlZGVudGlhbC51c2VyLnVpZCkuc2V0KHVzZXJfaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJfbGlzdFwiKS5wdXNoKHVzZXJfaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJfaW5mby9cIiArIHVzZXJDcmVkZW50aWFsLnVzZXIudWlkKS5zZXQodXNlcl9pbmZvKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgLy8gZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCh1c2VyPT57XHJcbiAgICAgICAgICAvLyAgaWYodXNlcil7XHJcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwidXNlciBpbmZvIHVpZDpcIisgdXNlci51aWQpO1xyXG4gICAgICAgICAgLy8gIH1cclxuICAgICAgICAgIC8vICB9KVxyXG4gICAgICAgICAgdC5Mb2FkaW5nQkcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIHQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlcIik7XHJcbiAgICAgICAgICB9LCAyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgfSk7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gIH07XHJcbiAgcGxheWVyTW92ZShkZWxheVRpbWU6IG51bWJlcikge1xyXG4gICAgbGV0IGVhc2VSYXRlOiBudW1iZXIgPSAyO1xyXG4gICAgbGV0IGFjdGlvbjE6IGNjLkFjdGlvbjtcclxuICAgIGxldCBhY3Rpb24yOiBjYy5BY3Rpb247XHJcbiAgICBsZXQgYWN0aW9uMzogY2MuQWN0aW9uO1xyXG4gICAgbGV0IGFjdGlvbjQ6IGNjLkFjdGlvbjtcclxuICAgIGxldCBhY3Rpb241OiBjYy5BY3Rpb247XHJcbiAgICB2YXIgc2VxdWVuY2UxID0gY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDIuNSwgMCwgMjUpLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSwgY2MuZGVsYXlUaW1lKDAuMiksIGNjLm1vdmVCeSgzLjUsIDAsIC0yNSkuZWFzaW5nKGNjLmVhc2VJbk91dChlYXNlUmF0ZSkpKTtcclxuICAgIHZhciBzZXF1ZW5jZTIgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMiwgLTEwLCAyNSkuZWFzaW5nKGNjLmVhc2VJbk91dChlYXNlUmF0ZSkpLCBjYy5kZWxheVRpbWUoMC4yKSwgY2MubW92ZUJ5KDIsIDEwLCAtMjUpLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSk7XHJcbiAgICB2YXIgc2VxdWVuY2UzID0gY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDIuNSwgLTIwLCAtMTApLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSwgY2MuZGVsYXlUaW1lKDAuMiksIGNjLm1vdmVCeSgxLjUsIDIwLCAxMCkuZWFzaW5nKGNjLmVhc2VJbk91dChlYXNlUmF0ZSkpKTtcclxuICAgIHZhciBzZXF1ZW5jZTQgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoNCwgMjAsIDE1KS5lYXNpbmcoY2MuZWFzZUluT3V0KGVhc2VSYXRlKSksIGNjLmRlbGF5VGltZSgwLjIpLCBjYy5tb3ZlQnkoNCwgLTIwLCAtMTUpLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSk7XHJcbiAgICB2YXIgc2VxdWVuY2U1XzEgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMCwgLTU4MCwgMTgwKSwgY2MubW92ZUJ5KDEwLCAxMjAwLCAtMTAwKSxcclxuICAgICAgY2MuZGVsYXlUaW1lKDEpLCBjYy5tb3ZlVG8oMCwgMCwgLTQ1MCksIGNjLm1vdmVCeSgxMCwgLTIwMCwgOTAwKSxcclxuICAgICAgY2MuZGVsYXlUaW1lKDEpLCBjYy5tb3ZlVG8oMCwgMjYwLCA0NTApLCBjYy5tb3ZlQnkoMTAsIC0xMDAwLCAtOTAwKSxcclxuICAgICAgY2MuZGVsYXlUaW1lKDUpKTtcclxuICAgIHZhciBzZXF1ZW5jZTVfMiA9IGNjLnNlcXVlbmNlKGNjLnJvdGF0ZUJ5KDEwLCAzNjApLCBjYy5kZWxheVRpbWUoMSksIGNjLnJvdGF0ZUJ5KDEwLCAtMzYwKSwgY2MuZGVsYXlUaW1lKDEpLCBjYy5yb3RhdGVCeSgxMCwgLTM2MCksIGNjLmRlbGF5VGltZSg1KSk7XHJcbiAgICB2YXIgc2VxdWVuY2U1ID0gY2Muc3Bhd24oc2VxdWVuY2U1XzEsIHNlcXVlbmNlNV8yKTtcclxuXHJcblxyXG4gICAgYWN0aW9uMSA9IGNjLnJlcGVhdEZvcmV2ZXIoc2VxdWVuY2UxKTtcclxuICAgIGFjdGlvbjIgPSBjYy5yZXBlYXRGb3JldmVyKHNlcXVlbmNlMik7XHJcbiAgICBhY3Rpb24zID0gY2MucmVwZWF0Rm9yZXZlcihzZXF1ZW5jZTMpO1xyXG4gICAgYWN0aW9uNCA9IGNjLnJlcGVhdEZvcmV2ZXIoc2VxdWVuY2U0KTtcclxuICAgIGFjdGlvbjUgPSBjYy5yZXBlYXRGb3JldmVyKHNlcXVlbmNlNSk7XHJcblxyXG4gICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICB0aGlzLnBsYXllcjEucnVuQWN0aW9uKGFjdGlvbjEpO1xyXG4gICAgICB0aGlzLnBsYXllcjIucnVuQWN0aW9uKGFjdGlvbjIpO1xyXG4gICAgICB0aGlzLnBsYXllcjMucnVuQWN0aW9uKGFjdGlvbjMpO1xyXG4gICAgICB0aGlzLnBsYXllcjQucnVuQWN0aW9uKGFjdGlvbjQpO1xyXG4gICAgICB0aGlzLnBsYXllcjUucnVuQWN0aW9uKGFjdGlvbjUpO1xyXG4gICAgfSwgMSk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgfVxyXG4gIGJhY2tncm91bmRNb3ZlKCkge1xyXG4gICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgLy8gdmFyIHNlcXVlbmNlID0gY2Muc2VxdWVuY2UoY2Mucm90YXRlQnkoMjAsIDM2MCkpO1xyXG4gICAgLy8gYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzZXF1ZW5jZSk7XHJcbiAgICBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDEwMCwgMzYwKSk7XHJcbiAgICB0aGlzLnNwYWNlQkcuc2V0U2NhbGUoMS41LCAxLjUpO1xyXG4gICAgdGhpcy5zcGFjZUJHLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG5cclxuICAgIHZhciBzID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygxLjUsIDAuNikuZWFzaW5nKGNjLmVhc2VJbk91dCgyKSksIGNjLnNjYWxlVG8oMS41LCAwLjUpLmVhc2luZyhjYy5lYXNlSW5PdXQoMikpLCBjYy5kZWxheVRpbWUoMSkpO1xyXG4gICAgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzKTtcclxuICAgIHRoaXMuTXV0aVRhZy5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8vIHBsYXl2aWRlbyhldmVudCkge1xyXG4gIC8vICAgY29uc29sZS5sb2coXCJISVwiKVxyXG4gIC8vICAgdGhpcy52aWRlb2NsaXAucGxheSgpO1xyXG4gIC8vIH1cclxuICBzaG93V2luZG93KCkge1xyXG5cclxuICB9XHJcbiAgZ2FtZUVuZCgpIHtcclxuICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgfVxyXG5cclxuICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/switching_from_waiting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84ac8kBBlNKBbKvfHIaeqHc', 'switching_from_waiting');
// Script/switching_from_waiting.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.condition = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        var ready_press = new cc.Component.EventHandler();
        //console.log("1")
        ready_press.target = this.node;
        ready_press.component = "switching_from_waiting";
        ready_press.handler = "ready_player";
        cc.find("Canvas/ready").getComponent(cc.Button).clickEvents.push(ready_press);
        var go_press = new cc.Component.EventHandler();
        //console.log("1")
        go_press.target = this.node;
        go_press.component = "switching_from_waiting";
        go_press.handler = "go_player";
        cc.find("Canvas/go").getComponent(cc.Button).clickEvents.push(go_press);
        // Stage button for test
        var Stage1_btn = new cc.Component.EventHandler();
        Stage1_btn.target = this.node;
        Stage1_btn.component = "switching_from_waiting";
        Stage1_btn.handler = "go_Stage1";
        cc.find("Canvas/Stage1").getComponent(cc.Button).clickEvents.push(Stage1_btn);
        var Stage2_btn = new cc.Component.EventHandler();
        Stage2_btn.target = this.node;
        Stage2_btn.component = "switching_from_waiting";
        Stage2_btn.handler = "go_Stage2";
        cc.find("Canvas/Stage2").getComponent(cc.Button).clickEvents.push(Stage2_btn);
        var Stage3_btn = new cc.Component.EventHandler();
        Stage3_btn.target = this.node;
        Stage3_btn.component = "switching_from_waiting";
        Stage3_btn.handler = "go_Stage3";
        cc.find("Canvas/Stage3").getComponent(cc.Button).clickEvents.push(Stage3_btn);
        var Stage4_btn = new cc.Component.EventHandler();
        Stage4_btn.target = this.node;
        Stage4_btn.component = "switching_from_waiting";
        Stage4_btn.handler = "go_Stage4";
        cc.find("Canvas/Stage4").getComponent(cc.Button).clickEvents.push(Stage4_btn);
        var Stage5_btn = new cc.Component.EventHandler();
        Stage5_btn.target = this.node;
        Stage5_btn.component = "switching_from_waiting";
        Stage5_btn.handler = "go_Stage5";
        cc.find("Canvas/Stage5").getComponent(cc.Button).clickEvents.push(Stage5_btn);
    };
    NewClass.prototype.ready_player = function () {
        var user = firebase.auth().currentUser;
        firebase.database().ref('player/player_number').once('value', function (snapshot) {
        });
        firebase.database().ref('player/ready_number').once('value', function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref('player/ready_number').set({ number: 1 });
            }
            else if (snapshot.val().number == '1') {
                firebase.database().ref('player/ready_number').set({ number: 2 });
            }
        });
    };
    NewClass.prototype.go_player = function () {
        cc.director.loadScene("Lobby");
    };
    NewClass.prototype.go_Stage1 = function () {
        cc.director.loadScene("GameStage1");
    };
    NewClass.prototype.go_Stage2 = function () {
        cc.director.loadScene("GameStage2");
    };
    NewClass.prototype.go_Stage3 = function () {
        cc.director.loadScene("GameStage3");
    };
    NewClass.prototype.go_Stage4 = function () {
        cc.director.loadScene("GameStage4");
    };
    NewClass.prototype.go_Stage5 = function () {
        cc.director.loadScene("GameStage5");
    };
    NewClass.prototype.update = function (dt) {
        var handle = this;
        if (this.condition == false) {
            //not all the players have been assigned to ready yet
            firebase.database().ref('player/ready_number').once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().number == '2') {
                        cc.find("Canvas/go").active = true;
                        console.log(handle.condition);
                        handle.condition = true;
                    }
                }
            });
        }
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzd2l0Y2hpbmdfZnJvbV93YWl0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBd0dDO1FBbkdHLGVBQVMsR0FBRyxLQUFLLENBQUM7O0lBbUd0QixDQUFDO0lBbEdHLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYsd0JBQUssR0FBTDtRQUNJLElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxrQkFBa0I7UUFDbEIsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7UUFDakQsV0FBVyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDckMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9DLGtCQUFrQjtRQUNsQixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUIsUUFBUSxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztRQUM5QyxRQUFRLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUMvQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4RSx3QkFBd0I7UUFDeEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2pELFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixVQUFVLENBQUMsU0FBUyxHQUFHLHdCQUF3QixDQUFDO1FBQ2hELFVBQVUsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlFLElBQUksVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqRCxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDOUIsVUFBVSxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztRQUNoRCxVQUFVLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNqQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7UUFDaEQsVUFBVSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDakMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUUsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2pELFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixVQUFVLENBQUMsU0FBUyxHQUFHLHdCQUF3QixDQUFDO1FBQ2hELFVBQVUsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlFLElBQUksVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqRCxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDOUIsVUFBVSxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztRQUNoRCxVQUFVLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNqQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUlsRixDQUFDO0lBRUQsK0JBQVksR0FBWjtRQUNJLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdkMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1FBQ2hGLENBQUMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQzNFLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDeEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3JFO2lCQUNJLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7Z0JBQ25DLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUVyRTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBQ0QsNEJBQVMsR0FBVDtRQUNJLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFDRCw0QkFBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUNELDRCQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBQ0QsNEJBQVMsR0FBVDtRQUNJLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFDRCw0QkFBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVELHlCQUFNLEdBQU4sVUFBTyxFQUFFO1FBQ0wsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLEVBQUU7WUFDekIscURBQXFEO1lBQ3JELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtnQkFDM0UsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUN4QixJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO3dCQUM5QixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO3dCQUM3QixNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztxQkFDM0I7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQXZHZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXdHNUI7SUFBRCxlQUFDO0NBeEdELEFBd0dDLENBeEdxQyxFQUFFLENBQUMsU0FBUyxHQXdHakQ7a0JBeEdvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgIFxyXG5cclxuXHJcbiAgICBjb25kaXRpb24gPSBmYWxzZTtcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGxldCByZWFkeV9wcmVzcyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIjFcIilcclxuICAgICAgICByZWFkeV9wcmVzcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcmVhZHlfcHJlc3MuY29tcG9uZW50ID0gXCJzd2l0Y2hpbmdfZnJvbV93YWl0aW5nXCI7XHJcbiAgICAgICAgcmVhZHlfcHJlc3MuaGFuZGxlciA9IFwicmVhZHlfcGxheWVyXCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9yZWFkeVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHJlYWR5X3ByZXNzKTtcclxuICAgICAgICBsZXQgZ29fcHJlc3MgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIxXCIpXHJcbiAgICAgICAgZ29fcHJlc3MudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGdvX3ByZXNzLmNvbXBvbmVudCA9IFwic3dpdGNoaW5nX2Zyb21fd2FpdGluZ1wiO1xyXG4gICAgICAgIGdvX3ByZXNzLmhhbmRsZXIgPSBcImdvX3BsYXllclwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvZ29cIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChnb19wcmVzcyk7XHJcblxyXG4gICAgICAgIC8vIFN0YWdlIGJ1dHRvbiBmb3IgdGVzdFxyXG4gICAgICAgIGxldCBTdGFnZTFfYnRuID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBTdGFnZTFfYnRuLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBTdGFnZTFfYnRuLmNvbXBvbmVudCA9IFwic3dpdGNoaW5nX2Zyb21fd2FpdGluZ1wiO1xyXG4gICAgICAgIFN0YWdlMV9idG4uaGFuZGxlciA9IFwiZ29fU3RhZ2UxXCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9TdGFnZTFcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChTdGFnZTFfYnRuKTtcclxuICAgICAgICBsZXQgU3RhZ2UyX2J0biA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgU3RhZ2UyX2J0bi50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgU3RhZ2UyX2J0bi5jb21wb25lbnQgPSBcInN3aXRjaGluZ19mcm9tX3dhaXRpbmdcIjtcclxuICAgICAgICBTdGFnZTJfYnRuLmhhbmRsZXIgPSBcImdvX1N0YWdlMlwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvU3RhZ2UyXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goU3RhZ2UyX2J0bik7XHJcbiAgICAgICAgbGV0IFN0YWdlM19idG4gPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIFN0YWdlM19idG4udGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIFN0YWdlM19idG4uY29tcG9uZW50ID0gXCJzd2l0Y2hpbmdfZnJvbV93YWl0aW5nXCI7XHJcbiAgICAgICAgU3RhZ2UzX2J0bi5oYW5kbGVyID0gXCJnb19TdGFnZTNcIjtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1N0YWdlM1wiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKFN0YWdlM19idG4pO1xyXG4gICAgICAgIGxldCBTdGFnZTRfYnRuID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBTdGFnZTRfYnRuLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBTdGFnZTRfYnRuLmNvbXBvbmVudCA9IFwic3dpdGNoaW5nX2Zyb21fd2FpdGluZ1wiO1xyXG4gICAgICAgIFN0YWdlNF9idG4uaGFuZGxlciA9IFwiZ29fU3RhZ2U0XCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9TdGFnZTRcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChTdGFnZTRfYnRuKTtcclxuICAgICAgICBsZXQgU3RhZ2U1X2J0biA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgU3RhZ2U1X2J0bi50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgU3RhZ2U1X2J0bi5jb21wb25lbnQgPSBcInN3aXRjaGluZ19mcm9tX3dhaXRpbmdcIjtcclxuICAgICAgICBTdGFnZTVfYnRuLmhhbmRsZXIgPSBcImdvX1N0YWdlNVwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvU3RhZ2U1XCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goU3RhZ2U1X2J0bik7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVhZHlfcGxheWVyKCkge1xyXG4gICAgICAgIHZhciB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdwbGF5ZXIvcGxheWVyX251bWJlcicpLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3JlYWR5X251bWJlcicpLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3JlYWR5X251bWJlcicpLnNldCh7IG51bWJlcjogMSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzbmFwc2hvdC52YWwoKS5udW1iZXIgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3JlYWR5X251bWJlcicpLnNldCh7IG51bWJlcjogMiB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdvX3BsYXllcigpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieVwiKVxyXG4gICAgfVxyXG4gICAgZ29fU3RhZ2UxKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTdGFnZTFcIilcclxuICAgIH1cclxuICAgIGdvX1N0YWdlMigpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2UyXCIpXHJcbiAgICB9XHJcbiAgICBnb19TdGFnZTMoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiR2FtZVN0YWdlM1wiKVxyXG4gICAgfVxyXG4gICAgZ29fU3RhZ2U0KCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTdGFnZTRcIilcclxuICAgIH1cclxuICAgIGdvX1N0YWdlNSgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2U1XCIpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZGl0aW9uID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8vbm90IGFsbCB0aGUgcGxheWVycyBoYXZlIGJlZW4gYXNzaWduZWQgdG8gcmVhZHkgeWV0XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdwbGF5ZXIvcmVhZHlfbnVtYmVyJykub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpLm51bWJlciA9PSAnMicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9nb1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhoYW5kbGUuY29uZGl0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUuY29uZGl0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game2Object/PlayerGhost.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ce51dyZ7y5MZbBn+/KFp5BV', 'PlayerGhost');
// Script/Game2Object/PlayerGhost.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var CameraManager_1 = require("../CameraManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayerGhost = /** @class */ (function (_super) {
    __extends(PlayerGhost, _super);
    function PlayerGhost() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerSpeed = 0;
        _this.child_node = null;
        _this.child_label = null;
        _this.rigidbody = null;
        _this.anim = null;
        _this.child_anim = null;
        _this.leftDown = false;
        _this.rightDown = false;
        _this.upDown = false;
        _this.downDown = false;
        _this.premoveDirX = 0;
        _this.moveDirX = 0;
        _this.moveDirY = 0;
        _this.premoveDirX_firebase = 0;
        _this.moveDirX_firebase = 0;
        _this.moveDirY_firebase = 0;
        _this.logged_in_or_not = false;
        _this.moveable = true;
        _this.moveableKey = true;
        return _this;
        // 鬼抓人結束
    }
    PlayerGhost.prototype.onLoad = function () {
        var _this = this;
        var handle = this;
        // 每個player node都會對應一個user
        var name = this.node.name;
        var user = firebase.auth().currentUser.uid;
        this.current_user = user;
        firebase.database().ref("player_data/" + name).once('value', function (snapshot) {
            handle.permited_user = snapshot.val().uid;
            if (snapshot.val() != null) {
                handle.node.active = true;
                handle.logged_in_or_not = true;
            }
            if (user == handle.permited_user) {
                firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/moveable").set({ moveable: "true" });
                firebase.database().ref("player_data/" + name + "/state_value/moveableKey").set({ moveableKey: "true" });
                firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: 0 });
                // firebase.database().ref(`player_data/${name}/state_value/IsLogin`).set({ bool: true })
            }
        });
        this.scheduleOnce(function () {
            _this.this_node_user = handle.permited_user;
            console.log("nodeuser:", _this.node.name, _this.this_node_user);
            console.log("currentuser:", _this.current_user);
            if (_this.current_user == _this.this_node_user)
                cc.find("Canvas/Main Camera").getComponent(CameraManager_1.default).FollowTarget = _this.node;
        }, 0.5);
    };
    PlayerGhost.prototype.get_current_user_uid = function () {
        return this.permited_user;
    };
    PlayerGhost.prototype.start = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.child_node = this.node.getChildByName(this.node.name);
        this.child_label = this.node.getChildByName('Label');
        this.child_anim = this.child_node.getComponent(cc.Animation);
        this.child_anim.play('Idle');
        this.schedule(this.updateOthersCurrentPos, 0.5);
    };
    PlayerGhost.prototype.update = function (dt) {
        var _this = this;
        //if the player is logged now we active the node 
        if (!this.logged_in_or_not) {
            var handle_1 = this;
            firebase.database().ref("player_data/" + this.node.name).once('value', function (snaphot) {
                if (snaphot.val() != null) {
                    handle_1.node.active = true;
                }
            });
        }
        // firebase
        var name = this.node.name;
        var DirX = this.moveDirX_firebase;
        var DirY = this.moveDirY_firebase;
        var preDirX = this.premoveDirX_firebase;
        var posX = this.node.position.x;
        var posY = this.node.position.y;
        var mvab = this.moveable;
        // write firebase realtime database
        if (this.current_user == this.this_node_user) {
            firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: DirX });
            firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: DirY });
            firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: preDirX });
            firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: posX });
            firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: posY });
            firebase.database().ref("player_data/" + name + "/state_value/moveable").set({ moveable: mvab });
        }
        // read firebase realtime database
        DirX = 0, DirY = 0, preDirX = 0;
        firebase.database().ref("player_data/" + name + "/state_value").once('value', function (snapshot) {
            if (snapshot.val() != null) {
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                preDirX = snapshot.val().premoveDirX.Dir;
            }
        });
        this.scheduleOnce(function () {
            _this.moveDirX = DirX;
            _this.moveDirY = DirY;
            _this.premoveDirX = preDirX;
        }, 0.2);
        // Scale
        this.child_node.scaleX = (this.moveDirX >= 0) ? 1 : -1;
        if (this.moveDirX == 0)
            this.child_node.scaleX = (this.premoveDirX >= 0) ? 1 : -1;
        // Move
        if (this.moveDirX == 0) {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(0, this.playerSpeed * this.moveDirY);
        }
        else if (this.moveDirY == 0) {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX, 0);
        }
        else {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX * 0.7, this.playerSpeed * this.moveDirY * 0.7);
        }
        if (!this.moveable) {
            this.rigidbody.linearVelocity = cc.v2(0, 0);
        }
        // Animation
        if ((this.moveDirX == 0 && this.moveDirY == 0) || !this.moveable) {
            if (!this.child_anim.getAnimationState('Idle').isPlaying)
                this.child_anim.play('Idle');
        }
        else {
            if (!this.child_anim.getAnimationState('Move').isPlaying)
                this.child_anim.play('Move');
        }
    };
    PlayerGhost.prototype.onKeyDown = function (event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = true;
                this.playerMoveX(-1);
                break;
            case cc.macro.KEY.d:
                this.rightDown = true;
                this.playerMoveX(1);
                break;
            case cc.macro.KEY.w:
                this.upDown = true;
                this.playerMoveY(1);
                break;
            case cc.macro.KEY.s:
                this.downDown = true;
                this.playerMoveY(-1);
                break;
        }
    };
    PlayerGhost.prototype.onKeyUp = function (event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = false;
                if (this.rightDown)
                    this.playerMoveX(1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.d:
                this.rightDown = false;
                if (this.leftDown)
                    this.playerMoveX(-1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.w:
                this.upDown = false;
                if (this.downDown)
                    this.playerMoveY(-1);
                else
                    this.playerMoveY(0);
                break;
            case cc.macro.KEY.s:
                this.downDown = false;
                if (this.upDown)
                    this.playerMoveY(1);
                else
                    this.playerMoveY(0);
                break;
        }
    };
    PlayerGhost.prototype.playerMoveX = function (moveDirX) {
        if (this.current_user != this.this_node_user)
            return;
        if (!this.moveableKey)
            return;
        this.premoveDirX_firebase = this.moveDirX_firebase;
        this.moveDirX_firebase = moveDirX;
    };
    PlayerGhost.prototype.playerMoveY = function (moveDirY) {
        if (this.current_user != this.this_node_user)
            return;
        if (!this.moveableKey)
            return;
        this.moveDirY_firebase = moveDirY;
    };
    PlayerGhost.prototype.updateOthersCurrentPos = function () {
        var _this = this;
        if (this.current_user == this.this_node_user)
            return; // 不更新自己的node
        var name = this.node.name;
        // console.log("refresh Pos:", name);
        var posX = -1487, DirX;
        var posY = -1487, DirY;
        // let IsLogin: boolean;
        firebase.database().ref("player_data/" + name + "/state_value").once('value', function (snapshot) {
            if (snapshot.val() != null) {
                posX = snapshot.val().X.x;
                posY = snapshot.val().Y.y;
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                // IsLogin = snapshot.val().IsLogin.bool;
            }
        });
        this.scheduleOnce(function () {
            if (posX == -1487 && posY == -1487)
                return; // 如果firebase database沒有抓到資料，就不要更新。
            var action;
            action = cc.moveTo(0.5, posX, posY); // 修正並平滑移動到正確位置
            if (Math.abs(_this.node.position.x - posX) > 320 || Math.abs(_this.node.position.y - posY) > 320) { // 如果位置差太多就直接閃現。(320為10格)
                _this.node.setPosition(posX, posY);
            }
            _this.node.runAction(action);
            // if(!IsLogin) {
            //     this.child_node.active = false;
            //     this.child_label.active = false;
            // }
            // else {
            //     this.child_node.active = true;
            //     this.child_label.active = true;
            // }
        }, 0.20);
    };
    // 鬼抓人部分
    PlayerGhost.prototype.onBeginContact = function (contact, self, other) {
        // console.log(other.node.name, self.node.group, other.node.group);
        if (other.node.group == 'ghost') {
            if (self.node.group == 'player' && this.current_user == this.this_node_user) {
                // 如果被鬼的殘影碰到就會變鬼，而鬼碰到別人不算。
                console.log("Ghost:", other.node.name, "Hit:", self.node.name);
                firebase.database().ref("game2/" + self.node.name).set({ type: "ghost" });
                firebase.database().ref("game2/" + other.node.name).set({ type: "player" });
            }
        }
    };
    __decorate([
        property()
    ], PlayerGhost.prototype, "playerSpeed", void 0);
    PlayerGhost = __decorate([
        ccclass
    ], PlayerGhost);
    return PlayerGhost;
}(cc.Component));
exports.default = PlayerGhost;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lMk9iamVjdFxcUGxheWVyR2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsa0RBQTZDO0FBR3ZDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBMFFDO1FBdFFHLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRWhCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBTTVCLGVBQVMsR0FBaUIsSUFBSSxDQUFDO1FBQy9CLFVBQUksR0FBaUIsSUFBSSxDQUFDO1FBQzFCLGdCQUFVLEdBQWlCLElBQUksQ0FBQztRQUloQyxjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGlCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsMEJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0Qix1QkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsc0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsaUJBQVcsR0FBWSxJQUFJLENBQUM7O1FBME81QixRQUFRO0lBQ1osQ0FBQztJQXZPRyw0QkFBTSxHQUFOO1FBQUEsaUJBK0JDO1FBOUJHLElBQUksTUFB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QjtJQUFELGtCQUFDO0NBMVFELEFBMFFDLENBMVF3QyxFQUFFLENBQUMsU0FBUyxHQTBRcEQ7a0JBMVFvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgQ2FtZXJhTWFuYWdlciBmcm9tIFwiLi4vQ2FtZXJhTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJTMiBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJTMlwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyR2hvc3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgcGxheWVyU3BlZWQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBjaGlsZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hpbGRfbGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgdGhpc19ub2RlX3VzZXI7XHJcbiAgICAvL2NoYW5nZSBcclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyO1xyXG5cclxuICAgIHByaXZhdGUgcmlnaWRib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBhbmltOiBjYy5BbmltYXRpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBjaGlsZF9hbmltOiBjYy5BbmltYXRpb24gPSBudWxsO1xyXG4gICAgLy9cclxuICAgIHByaXZhdGUgcGVybWl0ZWRfdXNlcjtcclxuXHJcbiAgICBwcml2YXRlIGxlZnREb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHJpZ2h0RG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB1cERvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZG93bkRvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcHJlbW92ZURpclggPSAwO1xyXG4gICAgcHJpdmF0ZSBtb3ZlRGlyWCA9IDA7XHJcbiAgICBwcml2YXRlIG1vdmVEaXJZID0gMDtcclxuICAgIHByaXZhdGUgcHJlbW92ZURpclhfZmlyZWJhc2UgPSAwO1xyXG4gICAgcHJpdmF0ZSBtb3ZlRGlyWF9maXJlYmFzZSA9IDA7XHJcbiAgICBwcml2YXRlIG1vdmVEaXJZX2ZpcmViYXNlID0gMDtcclxuICAgIHByaXZhdGUgbG9nZ2VkX2luX29yX25vdCA9IGZhbHNlO1xyXG4gICAgbW92ZWFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgbW92ZWFibGVLZXk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDmr4/lgItwbGF5ZXIgbm9kZemDveacg+WwjeaHieS4gOWAi3VzZXJcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgIHZhciB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdXNlciA9IHVzZXI7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgaGFuZGxlLnBlcm1pdGVkX3VzZXIgPSBzbmFwc2hvdC52YWwoKS51aWQ7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmxvZ2dlZF9pbl9vcl9ub3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1c2VyID09IGhhbmRsZS5wZXJtaXRlZF91c2VyKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvbW92ZURpcllgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVhYmxlYCkuc2V0KHsgbW92ZWFibGU6IFwidHJ1ZVwiIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlYWJsZUtleWApLnNldCh7IG1vdmVhYmxlS2V5OiBcInRydWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvcHJlbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiAwIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9ZYCkuc2V0KHsgeTogMCB9KVxyXG4gICAgICAgICAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvSXNMb2dpbmApLnNldCh7IGJvb2w6IHRydWUgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRoaXNfbm9kZV91c2VyID0gaGFuZGxlLnBlcm1pdGVkX3VzZXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm9kZXVzZXI6XCIsIHRoaXMubm9kZS5uYW1lLCB0aGlzLnRoaXNfbm9kZV91c2VyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50dXNlcjpcIiwgdGhpcy5jdXJyZW50X3VzZXIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgPT0gdGhpcy50aGlzX25vZGVfdXNlcikgY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYVwiKS5nZXRDb21wb25lbnQoQ2FtZXJhTWFuYWdlcikuRm9sbG93VGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIH0sIDAuNSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2N1cnJlbnRfdXNlcl91aWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGVybWl0ZWRfdXNlcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmlnaWRib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZF9ub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKHRoaXMubm9kZS5uYW1lKTtcclxuICAgICAgICB0aGlzLmNoaWxkX2xhYmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdMYWJlbCcpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRfYW5pbSA9IHRoaXMuY2hpbGRfbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICB0aGlzLmNoaWxkX2FuaW0ucGxheSgnSWRsZScpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy51cGRhdGVPdGhlcnNDdXJyZW50UG9zLCAwLjUpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIC8vaWYgdGhlIHBsYXllciBpcyBsb2dnZWQgbm93IHdlIGFjdGl2ZSB0aGUgbm9kZSBcclxuICAgICAgICBpZiAoIXRoaXMubG9nZ2VkX2luX29yX25vdCkge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5ub2RlLm5hbWV9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcGhvdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNuYXBob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmaXJlYmFzZVxyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5ub2RlLm5hbWU7XHJcbiAgICAgICAgbGV0IERpclggPSB0aGlzLm1vdmVEaXJYX2ZpcmViYXNlO1xyXG4gICAgICAgIGxldCBEaXJZID0gdGhpcy5tb3ZlRGlyWV9maXJlYmFzZTtcclxuICAgICAgICBsZXQgcHJlRGlyWCA9IHRoaXMucHJlbW92ZURpclhfZmlyZWJhc2U7XHJcbiAgICAgICAgbGV0IHBvc1ggPSB0aGlzLm5vZGUucG9zaXRpb24ueDtcclxuICAgICAgICBsZXQgcG9zWSA9IHRoaXMubm9kZS5wb3NpdGlvbi55O1xyXG4gICAgICAgIGxldCBtdmFiID0gdGhpcy5tb3ZlYWJsZTtcclxuICAgICAgICAvLyB3cml0ZSBmaXJlYmFzZSByZWFsdGltZSBkYXRhYmFzZVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRfdXNlciA9PSB0aGlzLnRoaXNfbm9kZV91c2VyKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJYYCkuc2V0KHsgRGlyOiBEaXJYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiBEaXJZIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiBwcmVEaXJYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiBwb3NYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiBwb3NZIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVhYmxlYCkuc2V0KHsgbW92ZWFibGU6IG12YWIgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVhZCBmaXJlYmFzZSByZWFsdGltZSBkYXRhYmFzZVxyXG4gICAgICAgIERpclggPSAwLCBEaXJZID0gMCwgcHJlRGlyWCA9IDA7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgRGlyWCA9IHNuYXBzaG90LnZhbCgpLm1vdmVEaXJYLkRpcjtcclxuICAgICAgICAgICAgICAgIERpclkgPSBzbmFwc2hvdC52YWwoKS5tb3ZlRGlyWS5EaXI7XHJcbiAgICAgICAgICAgICAgICBwcmVEaXJYID0gc25hcHNob3QudmFsKCkucHJlbW92ZURpclguRGlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXJYID0gRGlyWDtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGlyWSA9IERpclk7XHJcbiAgICAgICAgICAgIHRoaXMucHJlbW92ZURpclggPSBwcmVEaXJYO1xyXG4gICAgICAgIH0sIDAuMik7XHJcblxyXG4gICAgICAgIC8vIFNjYWxlXHJcbiAgICAgICAgdGhpcy5jaGlsZF9ub2RlLnNjYWxlWCA9ICh0aGlzLm1vdmVEaXJYID49IDApID8gMSA6IC0xO1xyXG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJYID09IDApIHRoaXMuY2hpbGRfbm9kZS5zY2FsZVggPSAodGhpcy5wcmVtb3ZlRGlyWCA+PSAwKSA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgLy8gTW92ZVxyXG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJYID09IDApIHtcclxuICAgICAgICAgICAgaWYodGhpcy5tb3ZlYWJsZSkgdGhpcy5yaWdpZGJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCB0aGlzLnBsYXllclNwZWVkICogdGhpcy5tb3ZlRGlyWSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vdmVEaXJZID09IDApIHtcclxuICAgICAgICAgICAgaWYodGhpcy5tb3ZlYWJsZSkgdGhpcy5yaWdpZGJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih0aGlzLnBsYXllclNwZWVkICogdGhpcy5tb3ZlRGlyWCwgMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYodGhpcy5tb3ZlYWJsZSkgdGhpcy5yaWdpZGJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih0aGlzLnBsYXllclNwZWVkICogdGhpcy5tb3ZlRGlyWCAqIDAuNywgdGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpclkgKiAwLjcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5tb3ZlYWJsZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBbmltYXRpb25cclxuICAgICAgICBpZiAoKHRoaXMubW92ZURpclggPT0gMCAmJiB0aGlzLm1vdmVEaXJZID09IDApIHx8ICF0aGlzLm1vdmVhYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZF9hbmltLmdldEFuaW1hdGlvblN0YXRlKCdJZGxlJykuaXNQbGF5aW5nKSB0aGlzLmNoaWxkX2FuaW0ucGxheSgnSWRsZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZF9hbmltLmdldEFuaW1hdGlvblN0YXRlKCdNb3ZlJykuaXNQbGF5aW5nKSB0aGlzLmNoaWxkX2FuaW0ucGxheSgnTW92ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleURvd24oZXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleURvd25cIiwgZXZlbnQua2V5Q29kZSk7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnREb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVZKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25Eb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25LZXlVcChldmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5RG93blwiLCBldmVudC5rZXlDb2RlKTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdERvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZDpcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHREb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWZ0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKC0xKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bkRvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgtMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5zOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXBEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBsYXllck1vdmVYKG1vdmVEaXJYOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHJlbW92ZURpclhfZmlyZWJhc2UgPSB0aGlzLm1vdmVEaXJYX2ZpcmViYXNlO1xyXG4gICAgICAgIHRoaXMubW92ZURpclhfZmlyZWJhc2UgPSBtb3ZlRGlyWDtcclxuICAgIH1cclxuICAgIHBsYXllck1vdmVZKG1vdmVEaXJZOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubW92ZURpcllfZmlyZWJhc2UgPSBtb3ZlRGlyWTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVPdGhlcnNDdXJyZW50UG9zKCkgeyAvLyDlrprmnJ/oh6rli5Xkv67mraPlhbbku5bnjqnlrrbmraPnorrkvY3nva5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgPT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuOyAvLyDkuI3mm7TmlrDoh6rlt7HnmoRub2RlXHJcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlZnJlc2ggUG9zOlwiLCBuYW1lKTtcclxuICAgICAgICBsZXQgcG9zWCA9IC0xNDg3LCBEaXJYO1xyXG4gICAgICAgIGxldCBwb3NZID0gLTE0ODcsIERpclk7XHJcbiAgICAgICAgLy8gbGV0IElzTG9naW46IGJvb2xlYW47XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWCA9IHNuYXBzaG90LnZhbCgpLlgueDtcclxuICAgICAgICAgICAgICAgIHBvc1kgPSBzbmFwc2hvdC52YWwoKS5ZLnk7XHJcbiAgICAgICAgICAgICAgICBEaXJYID0gc25hcHNob3QudmFsKCkubW92ZURpclguRGlyO1xyXG4gICAgICAgICAgICAgICAgRGlyWSA9IHNuYXBzaG90LnZhbCgpLm1vdmVEaXJZLkRpcjtcclxuICAgICAgICAgICAgICAgIC8vIElzTG9naW4gPSBzbmFwc2hvdC52YWwoKS5Jc0xvZ2luLmJvb2w7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwb3NYID09IC0xNDg3ICYmIHBvc1kgPT0gLTE0ODcpIHJldHVybjsgLy8g5aaC5p6cZmlyZWJhc2UgZGF0YWJhc2XmspLmnInmipPliLDos4fmlpnvvIzlsLHkuI3opoHmm7TmlrDjgIJcclxuICAgICAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgICAgICBhY3Rpb24gPSBjYy5tb3ZlVG8oMC41LCBwb3NYLCBwb3NZKTsgLy8g5L+u5q2j5Lim5bmz5ruR56e75YuV5Yiw5q2j56K65L2N572uXHJcbiAgICAgICAgICAgIGlmKE1hdGguYWJzKHRoaXMubm9kZS5wb3NpdGlvbi54LXBvc1gpPjMyMCB8fCBNYXRoLmFicyh0aGlzLm5vZGUucG9zaXRpb24ueS1wb3NZKT4zMjApeyAvLyDlpoLmnpzkvY3nva7lt67lpKrlpJrlsLHnm7TmjqXploPnj77jgIIoMzIw54K6MTDmoLwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zWCxwb3NZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgIC8vIGlmKCFJc0xvZ2luKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNoaWxkX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNoaWxkX2xhYmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jaGlsZF9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNoaWxkX2xhYmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9LCAwLjIwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDprLzmipPkurrpg6jliIZcclxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3QsIHNlbGYsIG90aGVyKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhvdGhlci5ub2RlLm5hbWUsIHNlbGYubm9kZS5ncm91cCwgb3RoZXIubm9kZS5ncm91cCk7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAnZ2hvc3QnKXtcclxuICAgICAgICAgICAgaWYoc2VsZi5ub2RlLmdyb3VwID09ICdwbGF5ZXInICYmIHRoaXMuY3VycmVudF91c2VyID09IHRoaXMudGhpc19ub2RlX3VzZXIpe1xyXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c6KKr6ay855qE5q6Y5b2x56Kw5Yiw5bCx5pyD6K6K6ay877yM6ICM6ay856Kw5Yiw5Yil5Lq65LiN566X44CCXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdob3N0OlwiLG90aGVyLm5vZGUubmFtZSxcIkhpdDpcIiwgc2VsZi5ub2RlLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWUyLyR7c2VsZi5ub2RlLm5hbWV9YCkuc2V0KHsgdHlwZTogXCJnaG9zdFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWUyLyR7b3RoZXIubm9kZS5uYW1lfWApLnNldCh7IHR5cGU6IFwicGxheWVyXCIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDprLzmipPkurrntZDmnZ9cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game4Object/GameManagerCoin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ff98bC1epdGEbsF+k8OyuYC', 'GameManagerCoin');
// Script/Game4Object/GameManagerCoin.ts

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
var PlayerCoin_1 = require("./PlayerCoin");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerCoin = /** @class */ (function (_super) {
    __extends(GameManagerCoin, _super);
    function GameManagerCoin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.GameoverBG = null;
        _this.TimerLabel = null;
        _this.coinLabel = null;
        _this.killCountLabel = null;
        _this.CoinSound = null;
        _this.ThiefSound = null;
        _this.StealCoinSound = null;
        _this.BGM = null;
        _this.ScoreSound = null;
        _this.GameOverSound = null;
        _this.CoinContainer = null;
        _this.GameTime = 120;
        _this.player_node1 = null;
        _this.player_node2 = null;
        _this.player_node3 = null;
        _this.player_node4 = null;
        _this.player_node5 = null;
        _this.physicManager = null;
        _this.current_user_number = 0;
        _this.timer = 0;
        _this.timeUp = false;
        _this.current_coin = 0; // 用於記錄自己的Coin
        _this.killcount = 0; // 用於記錄自己killcount
        _this.killtimer = 0;
        _this.cooldown = false;
        return _this;
    }
    GameManagerCoin.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        var uid = firebase.auth().currentUser.uid;
        var t = this;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                t.current_user_number = snapshot.val().player_number;
                console.log("Game Coin current_user_number is ", t.current_user_number);
            }
        });
    };
    GameManagerCoin.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        // 一開始所有玩家都不能動
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1)
            this.player_node1.getComponent(PlayerCoin_1.default).moveable = false;
        if (this.player_node2)
            this.player_node2.getComponent(PlayerCoin_1.default).moveable = false;
        if (this.player_node3)
            this.player_node3.getComponent(PlayerCoin_1.default).moveable = false;
        if (this.player_node4)
            this.player_node4.getComponent(PlayerCoin_1.default).moveable = false;
        if (this.player_node5)
            this.player_node5.getComponent(PlayerCoin_1.default).moveable = false;
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (_this.player_node1)
                _this.player_node1.getComponent(PlayerCoin_1.default).moveable = true;
            if (_this.player_node2)
                _this.player_node2.getComponent(PlayerCoin_1.default).moveable = true;
            if (_this.player_node3)
                _this.player_node3.getComponent(PlayerCoin_1.default).moveable = true;
            if (_this.player_node4)
                _this.player_node4.getComponent(PlayerCoin_1.default).moveable = true;
            if (_this.player_node5)
                _this.player_node5.getComponent(PlayerCoin_1.default).moveable = true;
            _this.CoinContainer.active = true;
            _this.TimerStart();
            cc.audioEngine.playMusic(_this.BGM, true);
            cc.audioEngine.setMusicVolume(2);
        }, 3);
        this.Init_player();
    };
    // update (dt) {}
    GameManagerCoin.prototype.Init_player = function () {
        var handle = this;
        // initialize players  
        var arrX = [272, -672, -957, 607, 1680];
        var arrY = [96, 697, -893, -682, 433];
        var _loop_1 = function (i) {
            firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: arrX[i - 1] });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: arrY[i - 1] });
                    firebase.database().ref("GameCoin/player" + i).set({ coin: 0, state: "player" });
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    // timer
    GameManagerCoin.prototype.TimerStart = function () {
        this.timer = this.GameTime;
        this.TimerLabel.getComponent(cc.Label).string = this.GameTime.toString();
        this.schedule(this.UpdateTimer, 1);
    };
    GameManagerCoin.prototype.UpdateTimer = function () {
        if (this.timeUp)
            return;
        if (this.timer > 0)
            this.timer += -1;
        else if (this.timer == 0)
            this.timeUp = true;
        this.TimerLabel.getComponent(cc.Label).string = this.timer.toString();
        if (this.timeUp) {
            this.GameOver();
        }
    };
    GameManagerCoin.prototype.GameOver = function () {
        var _this = this;
        cc.audioEngine.stopMusic();
        this.scheduleOnce(function () {
            cc.audioEngine.playEffect(_this.GameOverSound, false);
        }, 0.5);
        this.GameoverBG.active = true;
        var scoreboard = this.GameoverBG.getChildByName("Score");
        var scorepoint = scoreboard.getChildByName("Scorepoint").getComponent(cc.Label);
        var point = scoreboard.getChildByName("Point").getComponent(cc.Label);
        var arr = [0, 0, 0, 0, 0];
        var _loop_2 = function (i) {
            firebase.database().ref("GameCoin/player" + i).once('value', function (snaphot) {
                if (snaphot.val() != null) {
                    console.log("player", i, "Coin", snaphot.val().coin);
                    arr[i - 1] = snaphot.val().coin;
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_2(i);
        }
        this.scheduleOnce(function () {
            scoreboard.active = true;
            var str = "\n";
            str += arr[0] + "\n";
            str += arr[1] + "\n";
            str += arr[2] + "\n";
            str += arr[3] + "\n";
            str += arr[4];
            scorepoint.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(function () {
            var arr2 = [];
            var cnt = 0;
            for (var i = 0; i < 5; i++) {
                cnt = 0;
                for (var j = 0; j < 5; j++) {
                    if (arr[i] < arr[j])
                        cnt++;
                }
                if (arr[i] != 0) {
                    arr2.push(80 - 20 * cnt);
                }
                else {
                    arr2.push(0);
                }
            }
            var str = "";
            for (var i = 0; i < 5; i++) {
                str += "\n+ " + arr2[i].toString();
            }
            point.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
            // firebase
            firebase.database().ref("GameResult/Round3").set({
                player1: arr2[0],
                player2: arr2[1],
                player3: arr2[2],
                player4: arr2[3],
                player5: arr2[4],
            });
        }, 5);
        this.scheduleOnce(function () {
            cc.director.loadScene("GameStage5");
        }, 10);
    };
    GameManagerCoin.prototype.UpdateKillCount = function (t) {
        this.killcount += t;
        if (this.killcount < 0)
            this.killcount = 0;
        this.killCountLabel.getComponent(cc.Label).string = this.killcount.toString();
    };
    GameManagerCoin.prototype.BecomeThief = function (player_name) {
        var _this = this;
        var str = "player" + this.current_user_number.toString();
        if (str != player_name)
            return;
        if (this.killcount <= 0 || this.cooldown || this.timer < 20) {
            console.log("Can't be thief");
            return;
        }
        else {
            console.log("player", this.current_user_number, "BecomeThief!");
            if (this.ThiefSound)
                cc.audioEngine.playEffect(this.ThiefSound, false);
            this.cooldown = true;
            this.killtimer = 30;
            this.killcount += -1;
            this.killCountLabel.getComponent(cc.Label).string = this.killcount.toString();
            this.schedule(this.CooldownTimer, 1);
            // firebase
            var t = this;
            firebase.database().ref("GameCoin/player" + this.current_user_number).update({ state: "thief" });
            this.scheduleOnce(function () {
                firebase.database().ref("GameCoin/player" + _this.current_user_number).update({ state: "player" });
                // firebase
                var t = _this;
                firebase.database().ref("GameCoin/player" + t.current_user_number).once('value', function (snaphot) {
                    var c = snaphot.val().coin;
                    if (t.current_coin != c) { // 代表偷盜錢
                        if (t.StealCoinSound)
                            cc.audioEngine.playEffect(t.StealCoinSound, false);
                    }
                    t.current_coin = c;
                    t.coinLabel.getComponent(cc.Label).string = c.toString();
                });
            }, 15);
        }
    };
    GameManagerCoin.prototype.CooldownTimer = function () {
        this.killtimer += -1;
        // console.log("BecomeThief Cooldown in", this.killtimer);
        if (this.killtimer <= 0) {
            console.log("BecomeThief Cooldown!");
            this.killtimer = 0;
            this.cooldown = false;
            this.unschedule(this.CooldownTimer);
        }
    };
    GameManagerCoin.prototype.UpdateCoin = function (coin, player_name) {
        var str = "player" + this.current_user_number.toString();
        if (str != player_name)
            return;
        if (this.current_coin % 10 == 9) {
            this.UpdateKillCount(1);
            var p = cc.find("Canvas/PlayerContainer/player" + this.current_user_number);
            p.getComponent(PlayerCoin_1.default).playerSpeed *= 0.9;
            p.runAction(cc.scaleBy(0.5, 1.1));
        }
        if (this.CoinSound)
            cc.audioEngine.playEffect(this.CoinSound, false);
        // firebase
        var t = this;
        firebase.database().ref("GameCoin/player" + t.current_user_number).once('value', function (snaphot) {
            var c = snaphot.val().coin;
            t.current_coin = c + coin;
            t.coinLabel.getComponent(cc.Label).string = t.current_coin.toString();
            firebase.database().ref("GameCoin/player" + t.current_user_number).update({ coin: t.current_coin });
        });
    };
    GameManagerCoin.prototype.playerDie = function (player_name) {
        var str = "player" + this.current_user_number.toString();
        if (str != player_name)
            return;
        // 金幣清零
        this.current_coin = 0;
        // firebase
        firebase.database().ref("GameCoin/player" + this.current_user_number).update({ coin: 0 });
        this.coinLabel.getComponent(cc.Label).string = this.current_coin.toString();
        // 速度 大小復原    
        var p = cc.find("Canvas/PlayerContainer/player" + this.current_user_number);
        p.getComponent(PlayerCoin_1.default).playerSpeed = 150;
        p.runAction(cc.scaleTo(0.1, 1));
        // 傳送復活點
        p.getComponent(PlayerCoin_1.default).rigidbody.linearVelocity = cc.v2(0, 0);
        // p.getComponent(PlayerCoin).moveable = false;
        var action;
        var s = cc.sequence(cc.fadeOut(0.3), cc.fadeIn(0.3));
        action = cc.repeat(s, 5);
        p.runAction(action);
        this.scheduleOnce(function () {
            // p.getComponent(PlayerCoin).moveable = true;
        });
        // let arrX = [272, -672, -957, 607, 1680];
        // let arrY = [96, 697, -893, -682, 433];
        // p.setPosition(arrX[this.current_user_number-1], arrY[this.current_user_number-1]);
    };
    __decorate([
        property(cc.Node)
    ], GameManagerCoin.prototype, "loadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerCoin.prototype, "GameoverBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerCoin.prototype, "TimerLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerCoin.prototype, "coinLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerCoin.prototype, "killCountLabel", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerCoin.prototype, "CoinSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerCoin.prototype, "ThiefSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerCoin.prototype, "StealCoinSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerCoin.prototype, "BGM", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerCoin.prototype, "ScoreSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerCoin.prototype, "GameOverSound", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerCoin.prototype, "CoinContainer", void 0);
    __decorate([
        property()
    ], GameManagerCoin.prototype, "GameTime", void 0);
    GameManagerCoin = __decorate([
        ccclass
    ], GameManagerCoin);
    return GameManagerCoin;
}(cc.Component));
exports.default = GameManagerCoin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNE9iamVjdFxcR2FtZU1hbmFnZXJDb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzQztBQUVoQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUkxQztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQThSQztRQTNSRyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFFL0IsZUFBUyxHQUFpQixJQUFJLENBQUM7UUFFL0IsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDO1FBRWhDLG9CQUFjLEdBQWlCLElBQUksQ0FBQztRQUVwQyxTQUFHLEdBQWlCLElBQUksQ0FBQztRQUV6QixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFFaEMsbUJBQWEsR0FBaUIsSUFBSSxDQUFDO1FBR25DLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRTlCLGNBQVEsR0FBVyxHQUFHLENBQUM7UUFFdkIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFckIsbUJBQWEsR0FBc0IsSUFBSSxDQUFDO1FBRXhDLHlCQUFtQixHQUFXLENBQUMsQ0FBQztRQUVoQyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFFaEMsa0JBQVksR0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjO1FBQ3hDLGVBQVMsR0FBVyxD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QVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNRO0lBRTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkRBQ2E7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztzREFDUTtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO3VEQUNTO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7MkRBQ2E7SUFFcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztnREFDRTtJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO3VEQUNTO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7MERBQ1k7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDWTtJQUU5QjtRQURDLFFBQVEsRUFBRTtxREFDWTtJQTVCTixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBOFJuQztJQUFELHNCQUFDO0NBOVJELEFBOFJDLENBOVI0QyxFQUFFLENBQUMsU0FBUyxHQThSeEQ7a0JBOVJvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXllckNvaW4gZnJvbSBcIi4vUGxheWVyQ29pblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyQ29pbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsb2FkaW5nQkc6IGNjLk5vZGUgPSBudWxsOyBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgR2FtZW92ZXJCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRpbWVyTGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb2luTGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBraWxsQ291bnRMYWJlbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgQ29pblNvdW5kOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIFRoaWVmU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgU3RlYWxDb2luU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgQkdNOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIFNjb3JlU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgR2FtZU92ZXJTb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIENvaW5Db250YWluZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIEdhbWVUaW1lOiBudW1iZXIgPSAxMjA7XHJcblxyXG4gICAgcGxheWVyX25vZGUxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlMjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcGxheWVyX25vZGU0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlNTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBwaHlzaWNNYW5hZ2VyOiBjYy5QaHlzaWNzTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgdGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHRpbWVVcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGN1cnJlbnRfY29pbjogbnVtYmVyID0gMDsgLy8g55So5pa86KiY6YyE6Ieq5bex55qEQ29pblxyXG4gICAga2lsbGNvdW50OiBudW1iZXIgPSAwOyAvLyDnlKjmlrzoqJjpjIToh6rlt7FraWxsY291bnRcclxuICAgIGtpbGx0aW1lcjogbnVtYmVyID0gMDsgXHJcbiAgICBjb29sZG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAwKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdWlkID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VpZH1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZihzbmFwc2hvdC52YWwoKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHQuY3VycmVudF91c2VyX251bWJlciA9IHNuYXBzaG90LnZhbCgpLnBsYXllcl9udW1iZXI7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgQ29pbiBjdXJyZW50X3VzZXJfbnVtYmVyIGlzIFwiLCB0LmN1cnJlbnRfdXNlcl9udW1iZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8g5LiA6ZaL5aeL5omA5pyJ546p5a626YO95LiN6IO95YuVXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTEgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIxXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGUyID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMlwiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlMyA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjNcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTQgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXI0XCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGU1ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNVwiKTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTEpIHRoaXMucGxheWVyX25vZGUxLmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMikgdGhpcy5wbGF5ZXJfbm9kZTIuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUzKSB0aGlzLnBsYXllcl9ub2RlMy5nZXRDb21wb25lbnQoUGxheWVyQ29pbikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTQpIHRoaXMucGxheWVyX25vZGU0LmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNSkgdGhpcy5wbGF5ZXJfbm9kZTUuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdCRy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUxKSB0aGlzLnBsYXllcl9ub2RlMS5nZXRDb21wb25lbnQoUGxheWVyQ29pbikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTIpIHRoaXMucGxheWVyX25vZGUyLmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGU0KSB0aGlzLnBsYXllcl9ub2RlNC5nZXRDb21wb25lbnQoUGxheWVyQ29pbikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTUpIHRoaXMucGxheWVyX25vZGU1LmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkNvaW5Db250YWluZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5UaW1lclN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDIpO1xyXG4gICAgICAgIH0sIDMpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5Jbml0X3BsYXllcigpO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbiAgICBJbml0X3BsYXllcigpe1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgcGxheWVycyAgXHJcbiAgICAgICAgbGV0IGFyclggPSBbMjcyLCAtNjcyLCAtOTU3LCA2MDcsIDE2ODBdO1xyXG4gICAgICAgIGxldCBhcnJZID0gWzk2LCA2OTcsIC04OTMsIC02ODIsIDQzM107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHsgLy8g5aaC5p6c546p5a625a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogYXJyWFtpLTFdIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvWWApLnNldCh7IHk6IGFycllbaS0xXSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi9wbGF5ZXIke2l9YCkuc2V0KHsgY29pbjogMCwgc3RhdGU6IFwicGxheWVyXCJ9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW5pdGlhbCBFbmRcclxuICAgIH1cclxuICAgIC8vIHRpbWVyXHJcbiAgICBUaW1lclN0YXJ0KCl7XHJcbiAgICAgICAgdGhpcy50aW1lciA9IHRoaXMuR2FtZVRpbWU7XHJcbiAgICAgICAgdGhpcy5UaW1lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5HYW1lVGltZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5VcGRhdGVUaW1lciwgMSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGVUaW1lcigpe1xyXG4gICAgICAgIGlmKHRoaXMudGltZVVwKSByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy50aW1lciA+IDApIHRoaXMudGltZXIgKz0gLTE7XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnRpbWVyID09IDApIHRoaXMudGltZVVwID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlRpbWVyTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnRpbWVyLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMudGltZVVwKXtcclxuICAgICAgICAgICAgdGhpcy5HYW1lT3ZlcigpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgR2FtZU92ZXIoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuR2FtZU92ZXJTb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgdGhpcy5HYW1lb3ZlckJHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNjb3JlYm9hcmQgPSB0aGlzLkdhbWVvdmVyQkcuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZVwiKTtcclxuICAgICAgICBsZXQgc2NvcmVwb2ludCA9IHNjb3JlYm9hcmQuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZXBvaW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGV0IHBvaW50ID0gc2NvcmVib2FyZC5nZXRDaGlsZEJ5TmFtZShcIlBvaW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGV0IGFyciA9IFswLDAsMCwwLDBdO1xyXG4gICAgICAgIGZvcihsZXQgaT0xO2k8PTU7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVDb2luL3BsYXllciR7aX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwaG90KXtcclxuICAgICAgICAgICAgICAgIGlmKHNuYXBob3QudmFsKCkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXJcIixpLCBcIkNvaW5cIixzbmFwaG90LnZhbCgpLmNvaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpLTFdID0gc25hcGhvdC52YWwoKS5jb2luO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBzY29yZWJvYXJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gYXJyWzBdICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IGFyclsxXSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBhcnJbMl0gKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gYXJyWzNdICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IGFycls0XTtcclxuICAgICAgICAgICAgc2NvcmVwb2ludC5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5TY29yZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXJyMiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgY250ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDU7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJbaV0gPCBhcnJbal0pIGNudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyMi5wdXNoKDgwIC0gMjAgKiBjbnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIyLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCJcXG4rIFwiICsgYXJyMltpXS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBvaW50LnN0cmluZyA9IHN0cjtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLlNjb3JlU291bmQsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVSZXN1bHQvUm91bmQzYCkuc2V0KHtcclxuICAgICAgICAgICAgICAgIHBsYXllcjE6IGFycjJbMF0sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIyOiBhcnIyWzFdLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyMzogYXJyMlsyXSxcclxuICAgICAgICAgICAgICAgIHBsYXllcjQ6IGFycjJbM10sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXI1OiBhcnIyWzRdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTdGFnZTVcIik7XHJcbiAgICAgICAgfSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZUtpbGxDb3VudCh0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMua2lsbGNvdW50ICs9IHQ7XHJcbiAgICAgICAgaWYodGhpcy5raWxsY291bnQgPCAwKSB0aGlzLmtpbGxjb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5raWxsQ291bnRMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMua2lsbGNvdW50LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBCZWNvbWVUaGllZihwbGF5ZXJfbmFtZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgc3RyID0gXCJwbGF5ZXJcIit0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICBpZihzdHIgIT0gcGxheWVyX25hbWUpIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLmtpbGxjb3VudCA8PSAwIHx8IHRoaXMuY29vbGRvd24gfHwgdGhpcy50aW1lciA8IDIwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuJ3QgYmUgdGhpZWZcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXJcIiwgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLFwiQmVjb21lVGhpZWYhXCIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLlRoaWVmU291bmQpIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5UaGllZlNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29vbGRvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmtpbGx0aW1lciA9IDMwO1xyXG4gICAgICAgICAgICB0aGlzLmtpbGxjb3VudCArPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5raWxsQ291bnRMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMua2lsbGNvdW50LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5Db29sZG93blRpbWVyLCAxKTtcclxuICAgICAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgR2FtZUNvaW4vcGxheWVyJHt0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXJ9YCkudXBkYXRlKHsgc3RhdGU6IFwidGhpZWZcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi9wbGF5ZXIke3RoaXMuY3VycmVudF91c2VyX251bWJlcn1gKS51cGRhdGUoeyBzdGF0ZTogXCJwbGF5ZXJcIiB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGZpcmViYXNlXHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgR2FtZUNvaW4vcGxheWVyJHt0LmN1cnJlbnRfdXNlcl9udW1iZXJ9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbihzbmFwaG90KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IHNuYXBob3QudmFsKCkuY29pbjtcclxuICAgICAgICAgICAgICAgICAgICBpZih0LmN1cnJlbnRfY29pbiAhPSBjKXsgLy8g5Luj6KGo5YG355uc6YyiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHQuU3RlYWxDb2luU291bmQpIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodC5TdGVhbENvaW5Tb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0LmN1cnJlbnRfY29pbiA9IGM7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5jb2luTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMTUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIENvb2xkb3duVGltZXIoKXtcclxuICAgICAgICB0aGlzLmtpbGx0aW1lciArPSAtMTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkJlY29tZVRoaWVmIENvb2xkb3duIGluXCIsIHRoaXMua2lsbHRpbWVyKTtcclxuICAgICAgICBpZih0aGlzLmtpbGx0aW1lciA8PSAwKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCZWNvbWVUaGllZiBDb29sZG93biFcIik7XHJcbiAgICAgICAgICAgIHRoaXMua2lsbHRpbWVyID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jb29sZG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5Db29sZG93blRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBVcGRhdGVDb2luKGNvaW46IG51bWJlciwgcGxheWVyX25hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHN0ciA9IFwicGxheWVyXCIrdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYoc3RyICE9IHBsYXllcl9uYW1lKSByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50X2NvaW4gJSAxMCA9PSA5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlS2lsbENvdW50KDEpO1xyXG4gICAgICAgICAgICBsZXQgcCA9IGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHt0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXJ9YCk7XHJcbiAgICAgICAgICAgIHAuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLnBsYXllclNwZWVkICo9IDAuOTtcclxuICAgICAgICAgICAgcC5ydW5BY3Rpb24oY2Muc2NhbGVCeSgwLjUsIDEuMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLkNvaW5Tb3VuZCkgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLkNvaW5Tb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgIC8vIGZpcmViYXNlXHJcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi9wbGF5ZXIke3QuY3VycmVudF91c2VyX251bWJlcn1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uKHNuYXBob3Qpe1xyXG4gICAgICAgICAgICBsZXQgYyA9IHNuYXBob3QudmFsKCkuY29pbjtcclxuICAgICAgICAgICAgdC5jdXJyZW50X2NvaW4gPSBjICsgY29pbjtcclxuICAgICAgICAgICAgdC5jb2luTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0LmN1cnJlbnRfY29pbi50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgR2FtZUNvaW4vcGxheWVyJHt0LmN1cnJlbnRfdXNlcl9udW1iZXJ9YCkudXBkYXRlKHsgY29pbjogdC5jdXJyZW50X2NvaW4gfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwbGF5ZXJEaWUocGxheWVyX25hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHN0ciA9IFwicGxheWVyXCIrdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYoc3RyICE9IHBsYXllcl9uYW1lKSByZXR1cm47XHJcbiAgICAgICAgLy8g6YeR5bmj5riF6Zu2XHJcbiAgICAgICAgdGhpcy5jdXJyZW50X2NvaW4gPSAwO1xyXG4gICAgICAgIC8vIGZpcmViYXNlXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVDb2luL3BsYXllciR7dGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyfWApLnVwZGF0ZSh7IGNvaW46IDAgfSk7XHJcbiAgICAgICAgdGhpcy5jb2luTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmN1cnJlbnRfY29pbi50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIOmAn+W6piDlpKflsI/lvqnljp8gICAgXHJcbiAgICAgICAgbGV0IHAgPSBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllciR7dGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyfWApO1xyXG4gICAgICAgIHAuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLnBsYXllclNwZWVkID0gMTUwO1xyXG4gICAgICAgIHAucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4xLCAxKSk7XHJcbiAgICAgICAgLy8g5YKz6YCB5b6p5rS76bueXHJcbiAgICAgICAgcC5nZXRDb21wb25lbnQoUGxheWVyQ29pbikucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgLy8gcC5nZXRDb21wb25lbnQoUGxheWVyQ29pbikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgbGV0IHMgPSBjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuMyksIGNjLmZhZGVJbigwLjMpKTtcclxuICAgICAgICBhY3Rpb24gPSBjYy5yZXBlYXQocywgNSk7XHJcbiAgICAgICAgcC5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAvLyBwLmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBsZXQgYXJyWCA9IFsyNzIsIC02NzIsIC05NTcsIDYwNywgMTY4MF07XHJcbiAgICAgICAgLy8gbGV0IGFyclkgPSBbOTYsIDY5NywgLTg5MywgLTY4MiwgNDMzXTtcclxuICAgICAgICAvLyBwLnNldFBvc2l0aW9uKGFyclhbdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLTFdLCBhcnJZW3RoaXMuY3VycmVudF91c2VyX251bWJlci0xXSk7XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/battle_field.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9e68agIkCtLyKGaiZAteWD7', 'battle_field');
// Script/Game5Object/battle_field.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var panel_info_1 = require("./panel_info");
var battle_field = /** @class */ (function (_super) {
    __extends(battle_field, _super);
    function battle_field() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.gamemanager = null;
        _this.opponent_info_choice = null;
        _this.Mine_info_choice = null;
        _this.bet = null;
        _this.multiple = null;
        _this.message = null;
        _this.soundEffect = [];
        _this.opponent = "null";
        _this.my_choice = "null";
        _this.opponent_choice = "null";
        _this.opponent_ready = false;
        _this.me_ready = false;
        _this.win_lose = "null";
        _this.multiple_on = false;
        _this.reverse = false;
        _this.escape = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    battle_field.prototype.start = function () {
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
    };
    battle_field.prototype.show_card = function (type, person) {
        console.log(this.opponent_ready + " " + this.me_ready);
        cc.find("Canvas/UI/battle_field/" + person + "_" + type).active = true;
        //this.me_ready = true;
    };
    battle_field.prototype.match_result = function () {
        console.log(this.my_choice + " the fuck " + this.opponent_choice);
        var handle = this;
        if (!this.escape) {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state/reverse").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().reverse == 'absolute') {
                        handle.reverse = true;
                    }
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state/reverse").update({ reverse: "false" });
                }
            });
            switch (this.my_choice) {
                case "paper":
                    if (this.opponent_choice == "paper") {
                        //draw
                        cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "Draw";
                        //nothing happens
                    }
                    else if (this.opponent_choice == "scissor") {
                        //lose
                        this.lose();
                    }
                    else if (this.opponent_choice == "stone") {
                        //win
                        this.win();
                    }
                    break;
                case "scissor":
                    if (this.opponent_choice == "paper") {
                        //win
                        this.win();
                    }
                    else if (this.opponent_choice == "scissor") {
                        //draw
                        //nothing happens
                        cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "Draw";
                    }
                    else if (this.opponent_choice == "stone") {
                        //lose
                        this.lose();
                    }
                    break;
                case "stone":
                    if (this.opponent_choice == "paper") {
                        //lose
                        this.lose();
                    }
                    else if (this.opponent_choice == "scissor") {
                        //win
                        this.win();
                    }
                    else if (this.opponent_choice == "stone") {
                        //draw
                        //nothing happens
                        cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "Draw";
                    }
                    break;
            }
        }
        else {
            //reverse the score
            console.log('escape reverse');
            switch (this.my_choice) {
                case "paper":
                    var paper = this.panel.getComponent(panel_info_1.default).paper_left + 1;
                    this.panel.getComponent(panel_info_1.default).update_info("paper", paper);
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ paper: paper });
                    break;
                case "scissor":
                    var scissor = this.panel.getComponent(panel_info_1.default).scissor_left + 1;
                    this.panel.getComponent(panel_info_1.default).update_info("scissor", scissor);
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ scissor: scissor });
                    break;
                case "stone":
                    var stone = this.panel.getComponent(panel_info_1.default).stone_left + 1;
                    this.panel.getComponent(panel_info_1.default).update_info("stone", stone);
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ stone: stone });
                    break;
            }
            cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = 'Someone escape';
            this.escape = false;
        }
        this.bet.getComponent(cc.EditBox).string = "1";
        this.multiple.getComponent(cc.EditBox).string = "1";
        this.reverse = false;
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/WLMessage').active = true;
        }, 0.5);
        //also reset all the variable in other script
        firebase.database().ref("player_data/" + this.current_user + "/game2_state/escape").update({ escape: "false" });
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ card: "null", challenged: "false", fighting: "false", opponent: "null" });
        handle.gamemanager.getComponent(GameManagerS5_1.default).fighting = false;
        handle.gamemanager.getComponent(GameManagerS5_1.default).reset = true;
        handle.Mine_info_choice.active = false;
        handle.opponent_info_choice.active = false;
        this.scheduleOnce(function () {
            cc.find("Canvas/UI/battle_field/opponent_" + this.opponent_choice).active = false;
            cc.find("Canvas/UI/battle_field/Mine_" + this.my_choice).active = false;
            cc.find('Canvas/UI/Mine_info_choice/gambler_ability').getComponent(cc.Button).interactable = true;
            cc.find('Canvas/UI/Mine_info_choice/bet_confirm').getComponent(cc.Button).interactable = true;
            this.opponent = "null";
            this.my_choice = "null";
            this.opponent_choice = "null";
            cc.find('Canvas/UI/WLMessage').active = false;
            this.multiple_on = false;
            this.node.active = false;
        }, 3);
    };
    battle_field.prototype.win = function () {
        if (this.reverse) {
            this.reverse = false;
            this.lose();
        }
        else {
            //life +1
            console.log("win");
            var handle_1 = this;
            firebase.database().ref("player_data/" + this.opponent + "/game2_state/bet").once('value', function (snapshot) {
                firebase.database().ref("player_data/" + handle_1.current_user + "/game2_state/bet").once('value', function (smallsnapshot) {
                    var bet_money = Math.max(parseInt(snapshot.val().bet, 10), parseInt(smallsnapshot.val().bet, 10));
                    if (handle_1.multiple_on) {
                        firebase.database().ref("player_data/" + handle_1.current_user + "/game2_state/multiple").once('value', function (snap) {
                            if (snap.val() == null) {
                                var new_money = handle_1.panel.getComponent(panel_info_1.default).money_left + bet_money;
                                handle_1.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = handle_1.current_user + " win \n Gain " + bet_money + " money";
                            }
                            else {
                                var multiple = snap.val().multiple;
                                var new_money = handle_1.panel.getComponent(panel_info_1.default).money_left + bet_money * parseInt(multiple, 10);
                                console.log("win " + bet_money * parseInt(multiple, 10));
                                handle_1.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = handle_1.current_user + " win \n Gain " + bet_money * parseInt(multiple, 10) + " money";
                            }
                        });
                    }
                    else {
                        firebase.database().ref("player_data/" + handle_1.opponent + "/game2_state/multiple").once('value', function (snap) {
                            if (snap.val() == null) {
                                var new_money = handle_1.panel.getComponent(panel_info_1.default).money_left + bet_money;
                                handle_1.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = handle_1.current_user + " win \n Gain " + bet_money + " money";
                            }
                            else {
                                var multiple = snap.val().multiple;
                                var new_money = handle_1.panel.getComponent(panel_info_1.default).money_left + bet_money * parseInt(multiple, 10);
                                handle_1.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = handle_1.current_user + " win \n Gain " + bet_money * parseInt(multiple, 10) + " money";
                            }
                        });
                    }
                });
            });
            cc.audioEngine.playEffect(this.soundEffect[0], false);
        }
    };
    battle_field.prototype.lose = function () {
        if (this.reverse) {
            this.reverse = false;
            this.win();
        }
        else {
            console.log("lose");
            var handle_2 = this;
            firebase.database().ref("player_data/" + this.opponent + "/game2_state/bet").once('value', function (snapshot) {
                firebase.database().ref("player_data/" + handle_2.current_user + "/game2_state/bet").once('value', function (smallsnapshot) {
                    var bet_money = Math.max(parseInt(snapshot.val().bet, 10), parseInt(smallsnapshot.val().bet, 10));
                    console.log(parseInt(snapshot.val().bet, 10));
                    console.log(parseInt(smallsnapshot.val().bet, 10));
                    console.log("bet_money = " + bet_money + " ");
                    if (handle_2.multiple_on) {
                        console.log("multiple on lose");
                        firebase.database().ref("player_data/" + handle_2.current_user + "/game2_state/multiple").once('value', function (snap) {
                            if (snap.val() == null) {
                                var new_money = handle_2.panel.getComponent(panel_info_1.default).money_left - bet_money;
                                handle_2.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "You lose \n Loss " + bet_money + " money";
                            }
                            else {
                                var multiple = snap.val().multiple;
                                var new_money = handle_2.panel.getComponent(panel_info_1.default).money_left - bet_money * parseInt(multiple, 10);
                                handle_2.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "You lose \n Loss " + bet_money * parseInt(multiple, 10) + " money";
                            }
                        });
                    }
                    else {
                        firebase.database().ref("player_data/" + handle_2.opponent + "/game2_state/multiple").once('value', function (snap) {
                            if (snap.val() == null) {
                                var new_money = handle_2.panel.getComponent(panel_info_1.default).money_left - bet_money;
                                handle_2.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "You lose \n Loss " + bet_money + " money";
                            }
                            else {
                                var multiple = snap.val().multiple;
                                var new_money = handle_2.panel.getComponent(panel_info_1.default).money_left - bet_money * parseInt(multiple, 10);
                                handle_2.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "You lose \n Loss " + bet_money * parseInt(multiple, 10) + " money";
                            }
                        });
                    }
                });
            });
            cc.audioEngine.playEffect(this.soundEffect[1], false);
        }
    };
    battle_field.prototype.update = function (dt) {
        //console.log(this.opponent_ready +" "+ this.opponent)
        if (this.opponent_ready == false && this.opponent != 'null') {
            var handle_3 = this;
            //console.log('not start?? '+this.opponent)
            firebase.database().ref("player_data/" + this.opponent + "/game2_state").once('value', function (snapshot) {
                var choice = snapshot.val().card;
                if (choice != 'null') {
                    console.log("choice: " + choice);
                    handle_3.opponent_choice = choice;
                    handle_3.opponent_ready = true;
                    console.log("only here is true: " + handle_3.opponent_ready);
                }
            });
        }
        if (this.opponent_ready == true && this.me_ready == true) {
            console.log("???" + this.opponent_ready + " " + this.me_ready);
            this.opponent_ready = false;
            this.me_ready = false;
            this.show_card(this.opponent_choice, "opponent");
            //get the match result;
            this.scheduleOnce(function () {
                this.match_result();
            }, 2);
        }
        if (this.opponent == "null") {
            var handle_4 = this;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").once('value', function (snapshot) {
                handle_4.opponent = snapshot.val().opponent;
            });
        }
        if (this.escape == false) {
            var handle_5 = this;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state/escape").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().escape == 'absolute') {
                        console.log("absolute???????????????");
                        handle_5.escape = true;
                    }
                }
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "panel", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "gamemanager", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "opponent_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "Mine_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "bet", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "multiple", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "message", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], battle_field.prototype, "soundEffect", void 0);
    battle_field = __decorate([
        ccclass
    ], battle_field);
    return battle_field;
}(cc.Component));
exports.default = battle_field;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcYmF0dGxlX2ZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLDhEQUF5RDtBQUN6RCwyQ0FBc0M7QUFHdEM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFpVEM7UUEvU0csV0FBSyxHQUFZLElBQUksQ0FBQztRQUV0QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QiwwQkFBb0IsR0FBWSxJQUFJLENBQUM7UUFFckMsc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFFcEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBRXhCLGlCQUFXLEdBQW1CLEVBQUUsQ0FBQztRQUdqQyxjQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLGVBQVMsR0FBRyxNQUFNLENBQUM7UUFDbkIscUJBQWUsR0FBRyxNQUFNLENBQUM7UUFDekIsb0JBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLGlCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsWUFBTSxHQUFHLEtBQUssQ0FBQzs7SUFzUm5CLENBQUM7SUFsUkcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZiw0QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxD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RyxDQUFDLGlCQUFlLElBQUksQ0FBQyxZQUFZLHdCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLFFBQVE7Z0JBQzNHLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDeEIsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxJQUFJLFVBQVUsRUFBRTt3QkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO3dCQUN0QyxRQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztxQkFDeEI7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBRUwsQ0FBQztJQTlTRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4REFDbUI7SUFFckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDZTtJQUVqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNFO0lBRXBCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ087SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7cURBQ0E7SUFoQmhCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FpVGhDO0lBQUQsbUJBQUM7Q0FqVEQsQUFpVEMsQ0FqVHlDLEVBQUUsQ0FBQyxTQUFTLEdBaVRyRDtrQkFqVG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJTNSBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJTNVwiO1xyXG5pbXBvcnQgcGFuZWxfaW5mbyBmcm9tIFwiLi9wYW5lbF9pbmZvXCI7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmF0dGxlX2ZpZWxkIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBnYW1lbWFuYWdlcjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG9wcG9uZW50X2luZm9fY2hvaWNlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTWluZV9pbmZvX2Nob2ljZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJldDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG11bHRpcGxlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbWVzc2FnZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5BdWRpb0NsaXAgfSlcclxuICAgIHNvdW5kRWZmZWN0OiBjYy5BdWRpb0NsaXBbXSA9IFtdO1xyXG5cclxuICAgIGN1cnJlbnRfdXNlcjtcclxuICAgIG9wcG9uZW50ID0gXCJudWxsXCI7XHJcbiAgICBteV9jaG9pY2UgPSBcIm51bGxcIjtcclxuICAgIG9wcG9uZW50X2Nob2ljZSA9IFwibnVsbFwiO1xyXG4gICAgb3Bwb25lbnRfcmVhZHkgPSBmYWxzZTtcclxuICAgIG1lX3JlYWR5ID0gZmFsc2U7XHJcbiAgICB3aW5fbG9zZSA9IFwibnVsbFwiO1xyXG4gICAgbXVsdGlwbGVfb24gPSBmYWxzZTtcclxuICAgIHJldmVyc2UgPSBmYWxzZTtcclxuICAgIGVzY2FwZSA9IGZhbHNlO1xyXG5cclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3VzZXIgPSBjYy5maW5kKFwiR2FtZU1hbmFnZXJcIikuZ2V0Q29tcG9uZW50KEdhbWVNYW5hZ2VyUzUpLmN1cnJlbnRfdXNlcl9ub2RlO1xyXG4gICAgfVxyXG4gICAgc2hvd19jYXJkKHR5cGU6IHN0cmluZywgcGVyc29uOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wcG9uZW50X3JlYWR5ICsgXCIgXCIgKyB0aGlzLm1lX3JlYWR5KVxyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9iYXR0bGVfZmllbGQvJHtwZXJzb259XyR7dHlwZX1gKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vdGhpcy5tZV9yZWFkeSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBtYXRjaF9yZXN1bHQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5teV9jaG9pY2UgKyBcIiB0aGUgZnVjayBcIiArIHRoaXMub3Bwb25lbnRfY2hvaWNlKVxyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZXNjYXBlKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZS9yZXZlcnNlYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpLnJldmVyc2UgPT0gJ2Fic29sdXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucmV2ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZS9yZXZlcnNlYCkudXBkYXRlKHsgcmV2ZXJzZTogXCJmYWxzZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubXlfY2hvaWNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicGFwZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHBvbmVudF9jaG9pY2UgPT0gXCJwYXBlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZHJhd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgRHJhd2A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbm90aGluZyBoYXBwZW5zXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic2Npc3NvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9zZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vcHBvbmVudF9jaG9pY2UgPT0gXCJzdG9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2luXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNjaXNzb3JcIjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHBvbmVudF9jaG9pY2UgPT0gXCJwYXBlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2luXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic2Npc3NvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZHJhd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25vdGhpbmcgaGFwcGVuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgRHJhd2A7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic3RvbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xvc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInN0b25lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwicGFwZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xvc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic2Npc3NvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2luXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic3RvbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RyYXdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ub3RoaW5nIGhhcHBlbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL1dMTWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYERyYXdgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9yZXZlcnNlIHRoZSBzY29yZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXNjYXBlIHJldmVyc2UnKVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubXlfY2hvaWNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicGFwZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFwZXIgPSB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5wYXBlcl9sZWZ0ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS51cGRhdGVfaW5mbyhcInBhcGVyXCIsIHBhcGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGVgKS51cGRhdGUoeyBwYXBlcjogcGFwZXIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2Npc3NvclwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2lzc29yID0gdGhpcy5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykuc2Npc3Nvcl9sZWZ0ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS51cGRhdGVfaW5mbyhcInNjaXNzb3JcIiwgc2Npc3Nvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgc2Npc3Nvcjogc2Npc3NvciB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzdG9uZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdG9uZSA9IHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnN0b25lX2xlZnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwic3RvbmVcIiwgc3RvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IHN0b25lOiBzdG9uZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnU29tZW9uZSBlc2NhcGUnO1xyXG4gICAgICAgICAgICB0aGlzLmVzY2FwZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5iZXQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZyA9IFwiMVwiO1xyXG4gICAgICAgIHRoaXMubXVsdGlwbGUuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZyA9IFwiMVwiO1xyXG4gICAgICAgIHRoaXMucmV2ZXJzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL1dMTWVzc2FnZScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSwgMC41KVxyXG5cclxuICAgICAgICAvL2Fsc28gcmVzZXQgYWxsIHRoZSB2YXJpYWJsZSBpbiBvdGhlciBzY3JpcHRcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGUvZXNjYXBlYCkudXBkYXRlKHsgZXNjYXBlOiBcImZhbHNlXCIgfSk7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgY2FyZDogXCJudWxsXCIsIGNoYWxsZW5nZWQ6IFwiZmFsc2VcIiwgZmlnaHRpbmc6IFwiZmFsc2VcIiwgb3Bwb25lbnQ6IFwibnVsbFwiIH0pO1xyXG4gICAgICAgIGhhbmRsZS5nYW1lbWFuYWdlci5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuZmlnaHRpbmcgPSBmYWxzZTtcclxuICAgICAgICBoYW5kbGUuZ2FtZW1hbmFnZXIuZ2V0Q29tcG9uZW50KEdhbWVNYW5hZ2VyUzUpLnJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICBoYW5kbGUuTWluZV9pbmZvX2Nob2ljZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvYmF0dGxlX2ZpZWxkL29wcG9uZW50XyR7dGhpcy5vcHBvbmVudF9jaG9pY2V9YCkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9iYXR0bGVfZmllbGQvTWluZV8ke3RoaXMubXlfY2hvaWNlfWApLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9nYW1ibGVyX2FiaWxpdHknKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9iZXRfY29uZmlybScpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub3Bwb25lbnQgPSBcIm51bGxcIjtcclxuICAgICAgICAgICAgdGhpcy5teV9jaG9pY2UgPSBcIm51bGxcIjtcclxuICAgICAgICAgICAgdGhpcy5vcHBvbmVudF9jaG9pY2UgPSBcIm51bGxcIjtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL1dMTWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlX29uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCAzKVxyXG5cclxuICAgIH1cclxuICAgIHdpbigpIHtcclxuICAgICAgICBpZiAodGhpcy5yZXZlcnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV2ZXJzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvL2xpZmUgKzFcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aW5cIilcclxuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLm9wcG9uZW50fS9nYW1lMl9zdGF0ZS9iZXRgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7aGFuZGxlLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGUvYmV0YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc21hbGxzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiZXRfbW9uZXkgPSBNYXRoLm1heChwYXJzZUludChzbmFwc2hvdC52YWwoKS5iZXQsIDEwKSwgcGFyc2VJbnQoc21hbGxzbmFwc2hvdC52YWwoKS5iZXQsIDEwKSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlLm11bHRpcGxlX29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL211bHRpcGxlYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXAudmFsKCkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdfbW9uZXkgPSBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLm1vbmV5X2xlZnQgKyBiZXRfbW9uZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS51cGRhdGVfaW5mbyhcIm1vbmV5XCIsIG5ld19tb25leSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL1dMTWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7aGFuZGxlLmN1cnJlbnRfdXNlcn0gd2luIFxcbiBHYWluICR7YmV0X21vbmV5fSBtb25leWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtdWx0aXBsZSA9IHNuYXAudmFsKCkubXVsdGlwbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld19tb25leSA9IGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykubW9uZXlfbGVmdCArIGJldF9tb25leSAqIHBhcnNlSW50KG11bHRpcGxlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aW4gXCIgKyBiZXRfbW9uZXkgKiBwYXJzZUludChtdWx0aXBsZSwgMTApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykudXBkYXRlX2luZm8oXCJtb25leVwiLCBuZXdfbW9uZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9XTE1lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2hhbmRsZS5jdXJyZW50X3VzZXJ9IHdpbiBcXG4gR2FpbiAke2JldF9tb25leSAqIHBhcnNlSW50KG11bHRpcGxlLCAxMCl9IG1vbmV5YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7aGFuZGxlLm9wcG9uZW50fS9nYW1lMl9zdGF0ZS9tdWx0aXBsZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbmFwLnZhbCgpID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3X21vbmV5ID0gaGFuZGxlLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5tb25leV9sZWZ0ICsgYmV0X21vbmV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykudXBkYXRlX2luZm8oXCJtb25leVwiLCBuZXdfbW9uZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9XTE1lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2hhbmRsZS5jdXJyZW50X3VzZXJ9IHdpbiBcXG4gR2FpbiAke2JldF9tb25leX0gbW9uZXlgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXVsdGlwbGUgPSBzbmFwLnZhbCgpLm11bHRpcGxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdfbW9uZXkgPSBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLm1vbmV5X2xlZnQgKyBiZXRfbW9uZXkgKiBwYXJzZUludChtdWx0aXBsZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykudXBkYXRlX2luZm8oXCJtb25leVwiLCBuZXdfbW9uZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9XTE1lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2hhbmRsZS5jdXJyZW50X3VzZXJ9IHdpbiBcXG4gR2FpbiAke2JldF9tb25leSAqIHBhcnNlSW50KG11bHRpcGxlLCAxMCl9IG1vbmV5YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zb3VuZEVmZmVjdFswXSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmV2ZXJzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldmVyc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy53aW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9zZVwiKVxyXG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5vcHBvbmVudH0vZ2FtZTJfc3RhdGUvYmV0YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL2JldGApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNtYWxsc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmV0X21vbmV5ID0gTWF0aC5tYXgocGFyc2VJbnQoc25hcHNob3QudmFsKCkuYmV0LCAxMCksIHBhcnNlSW50KHNtYWxsc25hcHNob3QudmFsKCkuYmV0LCAxMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyc2VJbnQoc25hcHNob3QudmFsKCkuYmV0LCAxMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyc2VJbnQoc21hbGxzbmFwc2hvdC52YWwoKS5iZXQsIDEwKSlcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgYmV0X21vbmV5ID0gJHtiZXRfbW9uZXl9IGApXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZS5tdWx0aXBsZV9vbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm11bHRpcGxlIG9uIGxvc2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7aGFuZGxlLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGUvbXVsdGlwbGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc25hcC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld19tb25leSA9IGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykubW9uZXlfbGVmdCAtIGJldF9tb25leTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwibW9uZXlcIiwgbmV3X21vbmV5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgWW91IGxvc2UgXFxuIExvc3MgJHtiZXRfbW9uZXl9IG1vbmV5YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG11bHRpcGxlID0gc25hcC52YWwoKS5tdWx0aXBsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3X21vbmV5ID0gaGFuZGxlLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5tb25leV9sZWZ0IC0gYmV0X21vbmV5ICogcGFyc2VJbnQobXVsdGlwbGUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwibW9uZXlcIiwgbmV3X21vbmV5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgWW91IGxvc2UgXFxuIExvc3MgJHtiZXRfbW9uZXkgKiBwYXJzZUludChtdWx0aXBsZSwgMTApfSBtb25leWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5vcHBvbmVudH0vZ2FtZTJfc3RhdGUvbXVsdGlwbGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc25hcC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld19tb25leSA9IGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykubW9uZXlfbGVmdCAtIGJldF9tb25leTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwibW9uZXlcIiwgbmV3X21vbmV5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgWW91IGxvc2UgXFxuIExvc3MgJHtiZXRfbW9uZXl9IG1vbmV5YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG11bHRpcGxlID0gc25hcC52YWwoKS5tdWx0aXBsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3X21vbmV5ID0gaGFuZGxlLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5tb25leV9sZWZ0IC0gYmV0X21vbmV5ICogcGFyc2VJbnQobXVsdGlwbGUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwibW9uZXlcIiwgbmV3X21vbmV5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgWW91IGxvc2UgXFxuIExvc3MgJHtiZXRfbW9uZXkgKiBwYXJzZUludChtdWx0aXBsZSwgMTApfSBtb25leWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc291bmRFZmZlY3RbMV0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLm9wcG9uZW50X3JlYWR5ICtcIiBcIisgdGhpcy5vcHBvbmVudClcclxuICAgICAgICBpZiAodGhpcy5vcHBvbmVudF9yZWFkeSA9PSBmYWxzZSAmJiB0aGlzLm9wcG9uZW50ICE9ICdudWxsJykge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbm90IHN0YXJ0Pz8gJyt0aGlzLm9wcG9uZW50KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLm9wcG9uZW50fS9nYW1lMl9zdGF0ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hvaWNlID0gc25hcHNob3QudmFsKCkuY2FyZDtcclxuICAgICAgICAgICAgICAgIGlmIChjaG9pY2UgIT0gJ251bGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaG9pY2U6IFwiICsgY2hvaWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5vcHBvbmVudF9jaG9pY2UgPSBjaG9pY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X3JlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9ubHkgaGVyZSBpcyB0cnVlOiBcIiArIGhhbmRsZS5vcHBvbmVudF9yZWFkeSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wcG9uZW50X3JlYWR5ID09IHRydWUgJiYgdGhpcy5tZV9yZWFkeSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPz8/XCIgKyB0aGlzLm9wcG9uZW50X3JlYWR5ICsgXCIgXCIgKyB0aGlzLm1lX3JlYWR5KVxyXG4gICAgICAgICAgICB0aGlzLm9wcG9uZW50X3JlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWVfcmVhZHkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd19jYXJkKHRoaXMub3Bwb25lbnRfY2hvaWNlLCBcIm9wcG9uZW50XCIpO1xyXG4gICAgICAgICAgICAvL2dldCB0aGUgbWF0Y2ggcmVzdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoX3Jlc3VsdCgpO1xyXG4gICAgICAgICAgICB9LCAyKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3Bwb25lbnQgPT0gXCJudWxsXCIpIHtcclxuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnQgPSBzbmFwc2hvdC52YWwoKS5vcHBvbmVudDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVzY2FwZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL2VzY2FwZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKS5lc2NhcGUgPT0gJ2Fic29sdXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFic29sdXRlPz8/Pz8/Pz8/Pz8/Pz8/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5lc2NhcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/TranGround_special.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37e384WsudE9paCQ9Sl4dNw', 'TranGround_special');
// Script/Game5Object/TranGround_special.ts

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
var special_player_1 = require("../Game5Object/special_player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TransGround_special = /** @class */ (function (_super) {
    __extends(TransGround_special, _super);
    function TransGround_special() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TransDir = 2; // 1up, 2down, 3left, 4right, 5rightdown, 6leftup.
        _this.TransSpeed = 150;
        _this.playerSpeed = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    TransGround_special.prototype.start = function () {
        this.playerSpeed = cc.find('Canvas/PlayerContainer/player1').getComponent(special_player_1.default).playerSpeed;
    };
    // update (dt) {}
    TransGround_special.prototype.onBeginContact = function (contact, self, other) {
        // console.log("TransGround");
        // console.log(other.node.group)
        if (other.node.group == 'player') {
            console.log("TransGroundPP Pspeed", this.playerSpeed);
            other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            var p = other.node.getComponent(special_player_1.default);
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
    TransGround_special.prototype.onEndContact = function (contact, self, other) {
        if (other.node.group == "player") {
            console.log("TransGroundEE");
            // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);            
            var p = other.node.getComponent(special_player_1.default);
            p.moveableKey = true;
            p.moveDirX_firebase = 0;
            p.moveDirY_firebase = 0;
            p.playerSpeed = this.playerSpeed;
        }
    };
    __decorate([
        property()
    ], TransGround_special.prototype, "TransDir", void 0);
    __decorate([
        property()
    ], TransGround_special.prototype, "TransSpeed", void 0);
    TransGround_special = __decorate([
        ccclass
    ], TransGround_special);
    return TransGround_special;
}(cc.Component));
exports.default = TransGround_special;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcVHJhbkdyb3VuZF9zcGVjaWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGdFQUEyRDtBQUVyRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQXNGQztRQW5GRyxjQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUMsa0RBQWtEO1FBR3hFLGdCQUFVLEdBQVcsR0FBRyxDQUFDO1FBRWpCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDOztJQThFcEMsQ0FBQztJQTNFRyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLG1DQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUUxRyxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLDRDQUFjLEdBQWQsVUFBZSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUs7UUFDL0IsOEJBQThCO1FBQzlCLGdDQUFnQztRQUNoQyxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBQztZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0RCxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFD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O09BQ2EsbUJBQW1CLENBc0Z2QztJQUFELDBCQUFDO0NBdEZELEFBc0ZDLENBdEZnRCxFQUFFLENBQUMsU0FBUyxHQXNGNUQ7a0JBdEZvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgc3BlY2lhbF9wbGF5ZXIgZnJvbSBcIi4uL0dhbWU1T2JqZWN0L3NwZWNpYWxfcGxheWVyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zR3JvdW5kX3NwZWNpYWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBUcmFuc0RpcjogbnVtYmVyID0gMjsgLy8gMXVwLCAyZG93biwgM2xlZnQsIDRyaWdodCwgNXJpZ2h0ZG93biwgNmxlZnR1cC5cclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgVHJhbnNTcGVlZDogbnVtYmVyID0gMTUwO1xyXG5cclxuICAgIHByaXZhdGUgcGxheWVyU3BlZWQ6IG51bWJlciA9IDA7XHJcblxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLnBsYXllclNwZWVkID0gY2MuZmluZCgnQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIxJykuZ2V0Q29tcG9uZW50KHNwZWNpYWxfcGxheWVyKS5wbGF5ZXJTcGVlZDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3QsIHNlbGYsIG90aGVyKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRyYW5zR3JvdW5kXCIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG90aGVyLm5vZGUuZ3JvdXApXHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAncGxheWVyJyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHJhbnNHcm91bmRQUCBQc3BlZWRcIiwgdGhpcy5wbGF5ZXJTcGVlZCk7XHJcbiAgICAgICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLDApO1xyXG4gICAgICAgICAgICBsZXQgcCA9IG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KHNwZWNpYWxfcGxheWVyKTtcclxuICAgICAgICAgICAgcC5wbGF5ZXJTcGVlZCA9IHRoaXMuVHJhbnNTcGVlZDtcclxuICAgICAgICAgICAgcC5tb3ZlYWJsZUtleSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZih0aGlzLlRyYW5zRGlyID09IDEpe1xyXG4gICAgICAgICAgICAgICAgLy8gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsdGhpcy5UcmFuc1NwZWVkKTtcclxuICAgICAgICAgICAgICAgIHAubW92ZURpclhfZmlyZWJhc2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgcC5tb3ZlRGlyWV9maXJlYmFzZSA9IDE7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuVHJhbnNEaXIgPT0gMil7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwtdGhpcy5UcmFuc1NwZWVkKTtcclxuICAgICAgICAgICAgICAgIHAubW92ZURpclhfZmlyZWJhc2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgcC5tb3ZlRGlyWV9maXJlYmFzZSA9IC0xO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlRyYW5zRGlyID09IDMpe1xyXG4gICAgICAgICAgICAgICAgLy8gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKC10aGlzLlRyYW5zU3BlZWQsMCk7XHJcbiAgICAgICAgICAgICAgICBwLm1vdmVEaXJYX2ZpcmViYXNlID0gLTE7XHJcbiAgICAgICAgICAgICAgICBwLm1vdmVEaXJZX2ZpcmViYXNlID0gMDtcclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5UcmFuc0RpciA9PSA0KXtcclxuICAgICAgICAgICAgICAgIC8vIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih0aGlzLlRyYW5zU3BlZWQsMCk7XHJcbiAgICAgICAgICAgICAgICBwLm1vdmVEaXJYX2ZpcmViYXNlID0gMTtcclxuICAgICAgICAgICAgICAgIHAubW92ZURpcllfZmlyZWJhc2UgPSAwO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlRyYW5zRGlyID09IDUpe1xyXG4gICAgICAgICAgICAgICAgLy8gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHRoaXMuVHJhbnNTcGVlZCwgLXRoaXMuVHJhbnNTcGVlZCk7XHJcbiAgICAgICAgICAgICAgICBwLnBsYXllclNwZWVkID0gdGhpcy5UcmFuc1NwZWVkKjEuNDtcclxuICAgICAgICAgICAgICAgIHAubW92ZURpclhfZmlyZWJhc2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgcC5tb3ZlRGlyWV9maXJlYmFzZSA9IC0xO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlRyYW5zRGlyID09IDYpe1xyXG4gICAgICAgICAgICAgICAgLy8gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKC10aGlzLlRyYW5zU3BlZWQsIHRoaXMuVHJhbnNTcGVlZCk7XHJcbiAgICAgICAgICAgICAgICBwLnBsYXllclNwZWVkID0gdGhpcy5UcmFuc1NwZWVkKjEuNDtcclxuICAgICAgICAgICAgICAgIHAubW92ZURpclhfZmlyZWJhc2UgPSAtMTtcclxuICAgICAgICAgICAgICAgIHAubW92ZURpcllfZmlyZWJhc2UgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gb25QcmVTb2x2ZShjb250YWN0LCBzZWxmLCBvdGhlcil7XHJcbiAgICAvLyAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSBcInBsYXllcjFcIiB8fCBvdGhlci5ub2RlLmdyb3VwID09ICdnaG9zdCcpe1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlRyYW5zR3JvdW5kXCIpO1xyXG4gICAgLy8gICAgICAgICBsZXQgeCA9IG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkueDtcclxuICAgIC8vICAgICAgICAgbGV0IHkgPSBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5Lnk7XHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMuVHJhbnNEaXIgPT0gMSl7XHJcbiAgICAvLyAgICAgICAgICAgICBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoeCx0aGlzLlRyYW5zU3BlZWQpO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZSBpZih0aGlzLlRyYW5zRGlyID09IDIpe1xyXG4gICAgLy8gICAgICAgICAgICAgb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHgsLXRoaXMuVHJhbnNTcGVlZCk7XHJcbiAgICAvLyAgICAgICAgIH1lbHNlIGlmKHRoaXMuVHJhbnNEaXIgPT0gMyl7XHJcbiAgICAvLyAgICAgICAgICAgICBvdGhlci5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoLXRoaXMuVHJhbnNTcGVlZCx5KTtcclxuICAgIC8vICAgICAgICAgfWVsc2UgaWYodGhpcy5UcmFuc0RpciA9PSA0KXtcclxuICAgIC8vICAgICAgICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih0aGlzLlRyYW5zU3BlZWQseSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICBvbkVuZENvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpe1xyXG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gXCJwbGF5ZXJcIil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHJhbnNHcm91bmRFRVwiKTtcclxuICAgICAgICAgICAgLy8gb3RoZXIubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsIDApOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcCA9IG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KHNwZWNpYWxfcGxheWVyKTtcclxuICAgICAgICAgICAgcC5tb3ZlYWJsZUtleSA9IHRydWU7XHJcbiAgICAgICAgICAgIHAubW92ZURpclhfZmlyZWJhc2UgPSAwO1xyXG4gICAgICAgICAgICBwLm1vdmVEaXJZX2ZpcmViYXNlID0gMDtcclxuICAgICAgICAgICAgcC5wbGF5ZXJTcGVlZCA9IHRoaXMucGxheWVyU3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/fight_pressed.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2fbf79NN7BPYbI2p3WXvVNz', 'fight_pressed');
// Script/Game5Object/fight_pressed.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var fight_forum_1 = require("./fight_forum");
var fight_pressed = /** @class */ (function (_super) {
    __extends(fight_pressed, _super);
    function fight_pressed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.click = null;
        _this.fight_forum = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    fight_pressed.prototype.start = function () {
        this.parent_name = this.node.parent.name;
        var fight_this = new cc.Component.EventHandler();
        fight_this.target = this.node;
        fight_this.component = "fight_pressed";
        fight_this.handler = "fight_forum_open";
        cc.find("Canvas/PlayerContainer/" + this.parent_name + "/fight").getComponent(cc.Button).clickEvents.push(fight_this);
        var rude_this = new cc.Component.EventHandler();
        rude_this.target = this.node;
        rude_this.component = "fight_pressed";
        rude_this.handler = "rude_forum_open";
        cc.find("Canvas/PlayerContainer/" + this.parent_name + "/unreasonable").getComponent(cc.Button).clickEvents.push(rude_this);
    };
    fight_pressed.prototype.fight_forum_open = function () {
        cc.audioEngine.playEffect(this.click, false);
        var handle = this;
        //upload to firebase
        var currentUser = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        firebase.database().ref("player_data/" + this.parent_name + "/game2_state").once('value', function (snapshot) {
            if (snapshot.val().opponent == "null") {
                firebase.database().ref("player_data/" + handle.parent_name + "/game2_state").update({ opponent: currentUser, challenged: "true" });
                handle.fight_forum.getComponent(fight_forum_1.default).being_rude = false;
            }
        });
    };
    fight_pressed.prototype.rude_forum_open = function () {
        cc.audioEngine.playEffect(this.click, false);
        var handle = this;
        //upload to firebase
        var currentUser = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        firebase.database().ref("player_data/" + this.parent_name + "/game2_state").once('value', function (snapshot) {
            if (snapshot.val().opponent == "null") {
                firebase.database().ref("player_data/" + handle.parent_name + "/game2_state").update({ opponent: currentUser, challenged: "absolute" });
            }
        });
    };
    __decorate([
        property(cc.AudioClip)
    ], fight_pressed.prototype, "click", void 0);
    __decorate([
        property(cc.Node)
    ], fight_pressed.prototype, "fight_forum", void 0);
    fight_pressed = __decorate([
        ccclass
    ], fight_pressed);
    return fight_pressed;
}(cc.Component));
exports.default = fight_pressed;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcZmlnaHRfcHJlc3NlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1Qyw4REFBeUQ7QUFDekQsNkNBQXdDO0FBR3hDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBcURDO1FBakRHLFdBQUssR0FBaUIsSUFBSSxDQUFDO1FBRTNCLGlCQUFXLEdBQVksSUFBSSxDQUFDOztRQThDNUIsaUJBQWlCO0lBQ3JCLENBQUM7SUE3Q0csd0JBQXdCO0lBRXhCLGVBQWU7SUFFZiw2QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2pELFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixVQUFVLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxVQUFVLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxJQUFJLENBQUMsNEJBQTBCLElBQUksQ0FBQyxXQUFXLFdBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqSCxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDaEQsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDdEMsRUFBRSxDQUFDLElBQUksQ0FBQyw0QkFBMEIsSUFBSSxDQUFDLFdBQVcsa0JBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUczSCxDQUFDO0lBRUQsd0NBQWdCLEdBQWhCO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsb0JBQW9CO1FBQ3BCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLHVCQUFhLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztRQUN2RixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksQ0FBQyxXQUFXLGlCQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUNuRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLElBQUksTUFBTSxFQUFFO2dCQUNuQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLE1BQU0sQ0FBQyxXQUFXLGlCQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUMvSCxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUNuRTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELHVDQUFlLEdBQWY7UUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixvQkFBb0I7UUFDcEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3ZGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSxDQUFDLFdBQVcsaUJBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ25HLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsSUFBSSxNQUFNLEVBQUU7Z0JBQ25DLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsTUFBTSxDQUFDLFdBQVcsaUJBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDdEk7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUE5Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztnREFDSTtJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNVO0lBTlgsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXFEakM7SUFBRCxvQkFBQztDQXJERCxBQXFEQyxDQXJEMEMsRUFBRSxDQUFDLFNBQVMsR0FxRHREO2tCQXJEb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmltcG9ydCBHYW1lTWFuYWdlclM1IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclM1XCI7XHJcbmltcG9ydCBmaWdodF9mb3J1bSBmcm9tIFwiLi9maWdodF9mb3J1bVwiO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpZ2h0X3ByZXNzZWQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHBhcmVudF9uYW1lO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIGNsaWNrOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmaWdodF9mb3J1bTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRfbmFtZSA9IHRoaXMubm9kZS5wYXJlbnQubmFtZTtcclxuICAgICAgICBsZXQgZmlnaHRfdGhpcyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgZmlnaHRfdGhpcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZmlnaHRfdGhpcy5jb21wb25lbnQgPSBcImZpZ2h0X3ByZXNzZWRcIjtcclxuICAgICAgICBmaWdodF90aGlzLmhhbmRsZXIgPSBcImZpZ2h0X2ZvcnVtX29wZW5cIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyLyR7dGhpcy5wYXJlbnRfbmFtZX0vZmlnaHRgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGZpZ2h0X3RoaXMpO1xyXG4gICAgICAgIGxldCBydWRlX3RoaXMgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIHJ1ZGVfdGhpcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcnVkZV90aGlzLmNvbXBvbmVudCA9IFwiZmlnaHRfcHJlc3NlZFwiO1xyXG4gICAgICAgIHJ1ZGVfdGhpcy5oYW5kbGVyID0gXCJydWRlX2ZvcnVtX29wZW5cIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyLyR7dGhpcy5wYXJlbnRfbmFtZX0vdW5yZWFzb25hYmxlYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChydWRlX3RoaXMpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZmlnaHRfZm9ydW1fb3BlbigpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAvL3VwbG9hZCB0byBmaXJlYmFzZVxyXG4gICAgICAgIGxldCBjdXJyZW50VXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5wYXJlbnRfbmFtZX0vZ2FtZTJfc3RhdGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkub3Bwb25lbnQgPT0gXCJudWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5wYXJlbnRfbmFtZX0vZ2FtZTJfc3RhdGVgKS51cGRhdGUoeyBvcHBvbmVudDogY3VycmVudFVzZXIsIGNoYWxsZW5nZWQ6IFwidHJ1ZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmZpZ2h0X2ZvcnVtLmdldENvbXBvbmVudChmaWdodF9mb3J1bSkuYmVpbmdfcnVkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJ1ZGVfZm9ydW1fb3BlbigpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAvL3VwbG9hZCB0byBmaXJlYmFzZVxyXG4gICAgICAgIGxldCBjdXJyZW50VXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5wYXJlbnRfbmFtZX0vZ2FtZTJfc3RhdGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkub3Bwb25lbnQgPT0gXCJudWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5wYXJlbnRfbmFtZX0vZ2FtZTJfc3RhdGVgKS51cGRhdGUoeyBvcHBvbmVudDogY3VycmVudFVzZXIsIGNoYWxsZW5nZWQ6IFwiYWJzb2x1dGVcIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/opponent_betting_update.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '41edd7AGmhAo4cjp+3ozieS', 'opponent_betting_update');
// Script/Game5Object/opponent_betting_update.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.opponent_bet = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        this.opponent = cc.find("GameManager").getComponent(GameManagerS5_1.default).opponent_user_node;
    };
    NewClass.prototype.update = function (dt) {
        var handle = this;
        firebase.database().ref("player_data/" + this.opponent + "/game2_state/bet").once('value', function (snapshot) {
            if (snapshot.val() == null) {
                handle.opponent_bet.getComponent(cc.RichText).string = "1";
            }
            else {
                handle.opponent_bet.getComponent(cc.RichText).string = snapshot.val().bet;
            }
        });
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "opponent_bet", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcb3Bwb25lbnRfYmV0dGluZ191cGRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsOERBQXlEO0FBR3pEO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBNEJDO1FBdkJHLGtCQUFZLEdBQVksSUFBSSxDQUFDOztJQXVCakMsQ0FBQztJQXJCRyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLHdCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLHVCQUFhLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztRQUN6RixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLHVCQUFhLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztJQUUxRixDQUFDO0lBRUQseUJBQU0sR0FBTixVQUFPLEVBQUU7UUFDTCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLENBQUMsUUFBUSxxQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ3BHLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDeEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO2FBQzdFO1FBRUwsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBdEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1c7SUFMWixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBNEI1QjtJQUFELGVBQUM7Q0E1QkQsQUE0QkMsQ0E1QnFDLEVBQUUsQ0FBQyxTQUFTLEdBNEJqRDtrQkE1Qm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJTNSBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJTNVwiO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjdXJyZW50X3VzZXI7XHJcbiAgICBvcHBvbmVudDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgb3Bwb25lbnRfYmV0OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgdGhpcy5vcHBvbmVudCA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkub3Bwb25lbnRfdXNlcl9ub2RlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLm9wcG9uZW50fS9nYW1lMl9zdGF0ZS9iZXRgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X2JldC5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwiMVwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X2JldC5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IHNuYXBzaG90LnZhbCgpLmJldDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/InteractWall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d7c6/5pCVIGLp5xl05F7N8', 'InteractWall');
// Script/InteractWall.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InteractWall = /** @class */ (function (_super) {
    __extends(InteractWall, _super);
    function InteractWall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TopOfIW = null;
        _this.Ghost = null;
        _this.PlayerOpen = null;
        _this.PlayerClose = null;
        _this.anim = null;
        _this.current_user_number = 0;
        _this.isTouched = false;
        return _this;
    }
    // onLoad () {}
    InteractWall.prototype.start = function () {
        this.anim = this.node.getComponent(cc.Animation);
        this.anim.play();
        var uid = firebase.auth().currentUser.uid;
        var t = this;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                t.current_user_number = snapshot.val().player_number;
                // console.log("IW current_user_number", t.current_user_number);
            }
        });
        var top = cc.instantiate(this.TopOfIW);
        top.setPosition(this.node.position.x, this.node.position.y + 12);
        if (this.node.name == "IW x1")
            top.setScale(0.5, 1);
        else if (this.node.name == "IW x2 x2") {
            top.setScale(2, 2);
            top.setPosition(this.node.position.x, this.node.position.y + 24);
        }
        cc.find("Canvas/PlayerContainer").addChild(top);
    };
    InteractWall.prototype.update = function (dt) {
    };
    InteractWall.prototype.onBeginContact = function (contact, self, other) {
        var _this = this;
        if (this.isTouched)
            return;
        if (other.node.name == "player1" || other.node.name == "player2" || other.node.name == "player3" || other.node.name == "player4" || other.node.name == "player5") {
            // console.log("IW Begin");
            if (other.node.group == 'player' || other.node.group == 'Coinplayer') {
                // console.log("PB");
                this.isTouched = true;
                if (!this.anim.getAnimationState('Open').isPlaying)
                    this.anim.play('Open');
                this.scheduleOnce(function () {
                    var str = "player" + _this.current_user_number.toString();
                    if (str == other.node.name) {
                        if (_this.PlayerOpen)
                            cc.audioEngine.playEffect(_this.PlayerOpen, false);
                    }
                }, 0.4);
                this.scheduleOnce(function () {
                    contact.disabled = true;
                }, 0.8);
            }
            else if (other.node.group == 'ghost') {
                // console.log("GB");
                var action = void 0;
                action = cc.fadeTo(0.2, 100);
                other.node.runAction(action);
                this.isTouched = true;
                contact.disabled = true;
                var str = "player" + this.current_user_number.toString();
                if (str == other.node.name) {
                    if (this.Ghost)
                        cc.audioEngine.playEffect(this.Ghost, false);
                }
            }
        }
    };
    InteractWall.prototype.onEndContact = function (contact, self, other) {
        var _this = this;
        if (other.node.name == "player1" || other.node.name == "player2" || other.node.name == "player3" || other.node.name == "player4" || other.node.name == "player5") {
            // console.log("IW End");
            if (other.node.group == 'player' || other.node.group == 'Coinplayer') {
                // console.log("PE");
                this.isTouched = false;
                if (!this.anim.getAnimationState('Close').isPlaying)
                    this.anim.play('Close');
                var str = "player" + this.current_user_number.toString();
                if (str == other.node.name) {
                    if (this.PlayerClose)
                        cc.audioEngine.playEffect(this.PlayerClose, false);
                }
                this.scheduleOnce(function () {
                    if (!_this.anim.getAnimationState('Idle').isPlaying)
                        _this.anim.play();
                }, 0.4);
            }
            else if (other.node.group == 'ghost') {
                // console.log("GE");
                var action = void 0;
                action = cc.fadeTo(0.2, 255);
                other.node.runAction(action);
                this.isTouched = false;
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], InteractWall.prototype, "TopOfIW", void 0);
    __decorate([
        property(cc.AudioClip)
    ], InteractWall.prototype, "Ghost", void 0);
    __decorate([
        property(cc.AudioClip)
    ], InteractWall.prototype, "PlayerOpen", void 0);
    __decorate([
        property(cc.AudioClip)
    ], InteractWall.prototype, "PlayerClose", void 0);
    InteractWall = __decorate([
        ccclass
    ], InteractWall);
    return InteractWall;
}(cc.Component));
exports.default = InteractWall;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxJbnRlcmFjdFdhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFJMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFxR0M7UUFsR0csYUFBTyxHQUFjLElBQUksQ0FBQztRQUUxQixXQUFLLEdBQWlCLElBQUksQ0FBQztRQUUzQixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFFaEMsaUJBQVcsR0FBaUIsSUFBSSxDQUFDO1FBRXpCLFVBQUksR0FBaUIsSUFBSSxDQUFDO1FBRTFCLHlCQUFtQixHQUFXLENBQUMsQ0FBQztRQUVoQyxlQUFTLEdBQUcsS0FBSyxDQUFDOztJQXNGOUIsQ0FBQztJQXBGRyxlQUFlO0lBRWYsNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFakIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2IsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFhLEdBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ3hFLElBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBQztnQkFDdEIsQ0FBQyxDQUFD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VGhCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FxR2hDO0lBQUQsbUJBQUM7Q0FyR0QsQUFxR0MsQ0FyR3lDLEVBQUUsQ0FBQyxTQUFTLEdBcUdyRDtrQkFyR29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3RXYWxsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgVG9wT2ZJVzogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBHaG9zdDogY2MuQXVkaW9DbGlwID0gbnVsbDsgICAgXHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgUGxheWVyT3BlbjogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBQbGF5ZXJDbG9zZTogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGFuaW06IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcbiAgICBcclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyX251bWJlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGlzVG91Y2hlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgdGhpcy5hbmltLnBsYXkoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdWlkID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VpZH1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZihzbmFwc2hvdC52YWwoKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHQuY3VycmVudF91c2VyX251bWJlciA9IHNuYXBzaG90LnZhbCgpLnBsYXllcl9udW1iZXI7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIklXIGN1cnJlbnRfdXNlcl9udW1iZXJcIiwgdC5jdXJyZW50X3VzZXJfbnVtYmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBsZXQgdG9wID0gY2MuaW5zdGFudGlhdGUodGhpcy5Ub3BPZklXKTtcclxuICAgICAgICB0b3Auc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uLngsIHRoaXMubm9kZS5wb3NpdGlvbi55KzEyKTtcclxuICAgICAgICBpZih0aGlzLm5vZGUubmFtZSA9PSBcIklXIHgxXCIpXHJcbiAgICAgICAgICAgIHRvcC5zZXRTY2FsZSgwLjUsMSk7XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLm5vZGUubmFtZSA9PSBcIklXIHgyIHgyXCIpe1xyXG4gICAgICAgICAgICB0b3Auc2V0U2NhbGUoMiwyKTtcclxuICAgICAgICAgICAgdG9wLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbi54LCB0aGlzLm5vZGUucG9zaXRpb24ueSsyNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyXCIpLmFkZENoaWxkKHRvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgfVxyXG5cclxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3QsIHNlbGYsIG90aGVyKXtcclxuICAgICAgICBpZih0aGlzLmlzVG91Y2hlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmKG90aGVyLm5vZGUubmFtZSA9PSBcInBsYXllcjFcIiB8fCBvdGhlci5ub2RlLm5hbWUgPT0gXCJwbGF5ZXIyXCIgfHwgb3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyM1wiIHx8IG90aGVyLm5vZGUubmFtZSA9PSBcInBsYXllcjRcIiB8fCBvdGhlci5ub2RlLm5hbWUgPT0gXCJwbGF5ZXI1XCIpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIklXIEJlZ2luXCIpO1xyXG4gICAgICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdwbGF5ZXInIHx8IG90aGVyLm5vZGUuZ3JvdXAgPT0gJ0NvaW5wbGF5ZXInKXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUEJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5hbmltLmdldEFuaW1hdGlvblN0YXRlKCdPcGVuJykuaXNQbGF5aW5nKSB0aGlzLmFuaW0ucGxheSgnT3BlbicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyID0gXCJwbGF5ZXJcIit0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzdHIgPT0gb3RoZXIubm9kZS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJPcGVuKSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuUGxheWVyT3BlbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDAuNCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3QuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSwgMC44KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5ncm91cCA9PSAnZ2hvc3QnKXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiR0JcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSBjYy5mYWRlVG8oMC4yLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgb3RoZXIubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNUb3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnRhY3QuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IFwicGxheWVyXCIrdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZihzdHIgPT0gb3RoZXIubm9kZS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkdob3N0KSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuR2hvc3QsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uRW5kQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcil7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyMVwiIHx8IG90aGVyLm5vZGUubmFtZSA9PSBcInBsYXllcjJcIiB8fCBvdGhlci5ub2RlLm5hbWUgPT0gXCJwbGF5ZXIzXCIgfHwgb3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyNFwiIHx8IG90aGVyLm5vZGUubmFtZSA9PSBcInBsYXllcjVcIil7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSVcgRW5kXCIpO1xyXG4gICAgICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdwbGF5ZXInIHx8IG90aGVyLm5vZGUuZ3JvdXAgPT0gJ0NvaW5wbGF5ZXInKXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUEVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnQ2xvc2UnKS5pc1BsYXlpbmcpIHRoaXMuYW5pbS5wbGF5KCdDbG9zZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IFwicGxheWVyXCIrdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZihzdHIgPT0gb3RoZXIubm9kZS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckNsb3NlKSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuUGxheWVyQ2xvc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnSWRsZScpLmlzUGxheWluZykgdGhpcy5hbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDAuNCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ2dob3N0Jyl7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdFXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gY2MuZmFkZVRvKDAuMiwgMjU1KTtcclxuICAgICAgICAgICAgICAgIG90aGVyLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/utility.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7b61V4ulNIU6pnoc0mNIWa', 'utility');
// Script/Game5Object/utility.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundEffect = [];
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        var press_button = new cc.Component.EventHandler();
        press_button.target = this.node;
        press_button.component = "utility";
        press_button.handler = "selection";
        cc.find("Canvas/MapObjContainer/character_utility/" + this.node.name + "/Button").getComponent(cc.Button).clickEvents.push(press_button);
    };
    NewClass.prototype.selection = function () {
        var game_manager = cc.find('GameManager').getComponent(GameManagerS5_1.default);
        this.current_user = game_manager.current_user_node;
        console.log("finally   " + this.node.name);
        if (!game_manager.select_character) {
            switch (this.node.name) {
                case "book":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "erudite" });
                    game_manager.select_character = true;
                    game_manager.character = "erudite";
                    cc.find('Canvas/UI/Character/book').active = true;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can peak card distribution";
                    break;
                case "bomb":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "thug" });
                    game_manager.select_character = true;
                    game_manager.character = "thug";
                    //get all the irrefutable on
                    for (var i = 1; i <= 5; i++) {
                        if ("player" + i != this.current_user) {
                            cc.find("Canvas/PlayerContainer/player" + i + "/unreasonable").active = true;
                        }
                    }
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = true;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now other can't reject your fight request";
                    break;
                case "black_clover":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "gambler" });
                    game_manager.select_character = true;
                    cc.find('Canvas/UI/Mine_info_choice/gambler_ability').active = true;
                    cc.find('Canvas/UI/Mine_info_choice/betting_multiple').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = true;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can gain more when you win";
                    game_manager.character = "gambler";
                    break;
                case "ring":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "rule_breaker" });
                    game_manager.select_character = true;
                    game_manager.character = "rule_breaker";
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state/reverse").set({ reverse: "true" });
                    cc.find('Canvas/UI/Mine_info_choice/switch_result').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = true;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can reverse the fighting result";
                    break; // means he can swap the cards and invert the result
                case "coin":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "escaper" });
                    game_manager.select_character = true;
                    game_manager.character = "escaper";
                    cc.find('Canvas/UI/Mine_info_choice/escape').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = true;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can escape from fight";
                    break; // means he can swap the cards and invert the result
            }
        }
        cc.audioEngine.playEffect(this.soundEffect[0], false);
        cc.find('Canvas/MapObjContainer/character_utility/book').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/bomb').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/black_clover').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/coin').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/ring').active = false;
        var fadeout = cc.fadeOut(5.0);
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1);
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "soundEffect", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcdXRpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1Qyw4REFBd0Q7QUFHeEQ7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUE0R0M7UUF6R0csaUJBQVcsR0FBbUIsRUFBRSxDQUFDOztRQXdHakMsaUJBQWlCO0lBQ3JCLENBQUM7SUF0R0csd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix3QkFBSyxHQUFMO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNoQyxZQUFZLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxFQUFFLENBQUMsSUFBSSxDQUFDLDhDQUE0QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksWUFBUyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hJLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0ksSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1FBQ25ELE9B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ZCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNoRCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNQLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ3BELENBQUM7SUF0R0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lEQUNBO0lBSGhCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E0RzVCO0lBQUQsZUFBQztDQTVHRCxBQTRHQyxDQTVHcUMsRUFBRSxDQUFDLFNBQVMsR0E0R2pEO2tCQTVHb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmltcG9ydCBHYW1lTWFuYWdlclM1IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclM1XCJcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQXVkaW9DbGlwIH0pXHJcbiAgICBzb3VuZEVmZmVjdDogY2MuQXVkaW9DbGlwW10gPSBbXTtcclxuICAgIGN1cnJlbnRfdXNlcjtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgcHJlc3NfYnV0dG9uID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBwcmVzc19idXR0b24udGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHByZXNzX2J1dHRvbi5jb21wb25lbnQgPSBcInV0aWxpdHlcIjtcclxuICAgICAgICBwcmVzc19idXR0b24uaGFuZGxlciA9IFwic2VsZWN0aW9uXCI7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL01hcE9iakNvbnRhaW5lci9jaGFyYWN0ZXJfdXRpbGl0eS8ke3RoaXMubm9kZS5uYW1lfS9CdXR0b25gKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHByZXNzX2J1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBnYW1lX21hbmFnZXIgPSBjYy5maW5kKCdHYW1lTWFuYWdlcicpLmdldENvbXBvbmVudChHYW1lTWFuYWdlclM1KTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdXNlciA9IGdhbWVfbWFuYWdlci5jdXJyZW50X3VzZXJfbm9kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFsbHkgICBcIiArIHRoaXMubm9kZS5uYW1lKVxyXG4gICAgICAgIGlmICghZ2FtZV9tYW5hZ2VyLnNlbGVjdF9jaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLm5vZGUubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2tcIjpcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vY2hhcmFjdGVyYCkuc2V0KHsgY2hhcmFjdGVyOiBcImVydWRpdGVcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lX21hbmFnZXIuc2VsZWN0X2NoYXJhY3RlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9tYW5hZ2VyLmNoYXJhY3RlciA9IFwiZXJ1ZGl0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9vaycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9jbG92ZXInKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2JvbWInKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2NvaW4nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL3JpbmcnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIk5vdyB5b3UgY2FuIHBlYWsgY2FyZCBkaXN0cmlidXRpb25cIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJib21iXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2NoYXJhY3RlcmApLnNldCh7IGNoYXJhY3RlcjogXCJ0aHVnXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9tYW5hZ2VyLnNlbGVjdF9jaGFyYWN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfbWFuYWdlci5jaGFyYWN0ZXIgPSBcInRodWdcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL2dldCBhbGwgdGhlIGlycmVmdXRhYmxlIG9uXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChgcGxheWVyJHtpfWAgIT0gdGhpcy5jdXJyZW50X3VzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfS91bnJlYXNvbmFibGVgKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9vaycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvY2xvdmVyJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9ib21iJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2NvaW4nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL3JpbmcnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIk5vdyBvdGhlciBjYW4ndCByZWplY3QgeW91ciBmaWdodCByZXF1ZXN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYmxhY2tfY2xvdmVyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2NoYXJhY3RlcmApLnNldCh7IGNoYXJhY3RlcjogXCJnYW1ibGVyXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9tYW5hZ2VyLnNlbGVjdF9jaGFyYWN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL2dhbWJsZXJfYWJpbGl0eScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvYmV0dGluZ19tdWx0aXBsZScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9ib29rJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9jbG92ZXInKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9tYicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvY29pbicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvcmluZycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTm93IHlvdSBjYW4gZ2FpbiBtb3JlIHdoZW4geW91IHdpblwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfbWFuYWdlci5jaGFyYWN0ZXIgPSBcImdhbWJsZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyaW5nXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2NoYXJhY3RlcmApLnNldCh7IGNoYXJhY3RlcjogXCJydWxlX2JyZWFrZXJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lX21hbmFnZXIuc2VsZWN0X2NoYXJhY3RlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9tYW5hZ2VyLmNoYXJhY3RlciA9IFwicnVsZV9icmVha2VyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL3JldmVyc2VgKS5zZXQoeyByZXZlcnNlOiBcInRydWVcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zd2l0Y2hfcmVzdWx0JykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2Jvb2snKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2Nsb3ZlcicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9tYicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvY29pbicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvcmluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJOb3cgeW91IGNhbiByZXZlcnNlIHRoZSBmaWdodGluZyByZXN1bHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBtZWFucyBoZSBjYW4gc3dhcCB0aGUgY2FyZHMgYW5kIGludmVydCB0aGUgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29pblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9jaGFyYWN0ZXJgKS5zZXQoeyBjaGFyYWN0ZXI6IFwiZXNjYXBlclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfbWFuYWdlci5zZWxlY3RfY2hhcmFjdGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lX21hbmFnZXIuY2hhcmFjdGVyID0gXCJlc2NhcGVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvZXNjYXBlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2Jvb2snKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2Nsb3ZlcicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9tYicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvY29pbicpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9yaW5nJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJOb3cgeW91IGNhbiBlc2NhcGUgZnJvbSBmaWdodFwiXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIG1lYW5zIGhlIGNhbiBzd2FwIHRoZSBjYXJkcyBhbmQgaW52ZXJ0IHRoZSByZXN1bHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc291bmRFZmZlY3RbMF0sIGZhbHNlKTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTWFwT2JqQ29udGFpbmVyL2NoYXJhY3Rlcl91dGlsaXR5L2Jvb2snKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTWFwT2JqQ29udGFpbmVyL2NoYXJhY3Rlcl91dGlsaXR5L2JvbWInKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTWFwT2JqQ29udGFpbmVyL2NoYXJhY3Rlcl91dGlsaXR5L2JsYWNrX2Nsb3ZlcicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9NYXBPYmpDb250YWluZXIvY2hhcmFjdGVyX3V0aWxpdHkvY29pbicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9NYXBPYmpDb250YWluZXIvY2hhcmFjdGVyX3V0aWxpdHkvcmluZycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBmYWRlb3V0ID0gY2MuZmFkZU91dCg1LjApXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLnJ1bkFjdGlvbihmYWRlb3V0KTtcclxuICAgICAgICB9LCAwLjEpXHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/Mine_info_choice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dcb0clOYw5MPrT+MMODsvmK', 'Mine_info_choice');
// Script/Game5Object/Mine_info_choice.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var panel_info_1 = require("./panel_info");
var battle_field_1 = require("./battle_field");
var Mine_info_choice = /** @class */ (function (_super) {
    __extends(Mine_info_choice, _super);
    function Mine_info_choice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.bet = null;
        _this.multiple = null;
        _this.battle_field = null;
        _this.click = null;
        return _this;
        // update(dt) {
        // }
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Mine_info_choice.prototype.start = function () {
        //this.current_user = cc.find("GameManager").getComponent(GameManagerS2).current_user_node;
        var paper_click = new cc.Component.EventHandler();
        paper_click.target = this.node;
        paper_click.component = "Mine_info_choice";
        paper_click.handler = "paper";
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).clickEvents.push(paper_click);
        var stone_click = new cc.Component.EventHandler();
        stone_click.target = this.node;
        stone_click.component = "Mine_info_choice";
        stone_click.handler = "stone";
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).clickEvents.push(stone_click);
        var scissor_click = new cc.Component.EventHandler();
        scissor_click.target = this.node;
        scissor_click.component = "Mine_info_choice";
        scissor_click.handler = "scissor";
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).clickEvents.push(scissor_click);
        var bet_confirm = new cc.Component.EventHandler();
        bet_confirm.target = this.node;
        bet_confirm.component = "Mine_info_choice";
        bet_confirm.handler = "betting";
        cc.find("Canvas/UI/Mine_info_choice/bet_confirm").getComponent(cc.Button).clickEvents.push(bet_confirm);
        var gamble_this = new cc.Component.EventHandler();
        gamble_this.target = this.node;
        gamble_this.component = "Mine_info_choice";
        gamble_this.handler = "betting_multiple";
        cc.find("Canvas/UI/Mine_info_choice/gambler_ability").getComponent(cc.Button).clickEvents.push(gamble_this);
        var reverse_this = new cc.Component.EventHandler();
        reverse_this.target = this.node;
        reverse_this.component = "Mine_info_choice";
        reverse_this.handler = "switch_result";
        cc.find("Canvas/UI/Mine_info_choice/switch_result").getComponent(cc.Button).clickEvents.push(reverse_this);
        var escape_this = new cc.Component.EventHandler();
        escape_this.target = this.node;
        escape_this.component = "Mine_info_choice";
        escape_this.handler = "escape_battle";
        cc.find("Canvas/UI/Mine_info_choice/escape").getComponent(cc.Button).clickEvents.push(escape_this);
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
    };
    Mine_info_choice.prototype.escape_battle = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.battle_field.getComponent(battle_field_1.default).escape = true;
        firebase.database().ref("player_data/" + this.opponent + "/game2_state/escape").set({ escape: "absolute" });
        var fadeout = cc.fadeOut(5.0);
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Escape active";
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1);
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    };
    Mine_info_choice.prototype.switch_result = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.battle_field.getComponent(battle_field_1.default).reverse = true;
        firebase.database().ref("player_data/" + this.opponent + "/game2_state/reverse").set({ reverse: "absolute" });
        var fadeout = cc.fadeOut(5.0);
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Reverse active";
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1);
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    };
    Mine_info_choice.prototype.betting_multiple = function () {
        cc.audioEngine.playEffect(this.click, false);
        var str = this.multiple.getComponent(cc.EditBox).string;
        if (Number(str) >= 5)
            str = "5";
        firebase.database().ref("player_data/" + this.current_user + "/game2_state/multiple").set({ multiple: str });
        this.battle_field.getComponent(battle_field_1.default).multiple_on = true;
        cc.find('Canvas/UI/Mine_info_choice/gambler_ability').getComponent(cc.Button).interactable = false;
    };
    Mine_info_choice.prototype.betting = function () {
        cc.audioEngine.playEffect(this.click, false);
        // let str = this.bet.getComponent(cc.EditBox).string;
        // if (Number(str) > this.panel.getComponent(panel_info).money_left) {
        //     let fadeout = cc.fadeOut(5.0)
        //     this.scheduleOnce(function () {
        //         cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Not enough money";
        //         cc.find('Canvas/UI/hint_message').active = true;
        //         cc.find('Canvas/UI/hint_message').runAction(fadeout);
        //     }, 0.1)
        //     cc.find('Canvas/UI/hint_message').active = false;
        //     cc.find('Canvas/UI/hint_message').opacity = 255;
        //     return;
        // }
        firebase.database().ref("player_data/" + this.current_user + "/game2_state/bet").set({ bet: this.bet.getComponent(cc.EditBox).string });
        cc.find('Canvas/UI/Mine_info_choice/bet_confirm').getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = true;
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = true;
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = true;
    };
    Mine_info_choice.prototype.paper = function () {
        cc.audioEngine.playEffect(this.click, false);
        var new_paper = this.panel.getComponent(panel_info_1.default).paper_left - 1;
        console.log(new_paper);
        console.log("qwer");
        if (new_paper >= 0) {
            this.panel.getComponent(panel_info_1.default).update_info("paper", new_paper);
            cc.find("Canvas/UI/battle_field/Mine_paper").active = true;
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).my_choice = "paper";
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).show_card('paper', "Mine");
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).me_ready = true;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ card: "paper" });
            this.node.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = String(new_paper);
            cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        }
        else {
            //can't select paper because you don't have paper card anymore
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "No Paper";
            var fadeout_1 = cc.fadeOut(2.0);
            this.scheduleOnce(function () {
                cc.find('Canvas/UI/hint_message').active = true;
                cc.find('Canvas/UI/hint_message').runAction(fadeout_1);
            }, 0.1);
            cc.find('Canvas/UI/hint_message').active = false;
            cc.find('Canvas/UI/hint_message').opacity = 255;
        }
        //get the paper info
    };
    Mine_info_choice.prototype.scissor = function () {
        cc.audioEngine.playEffect(this.click, false);
        var new_scissor = this.panel.getComponent(panel_info_1.default).scissor_left - 1;
        if (new_scissor >= 0) {
            this.panel.getComponent(panel_info_1.default).update_info("scissor", new_scissor);
            cc.find("Canvas/UI/battle_field/Mine_scissor").active = true;
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).my_choice = "scissor";
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).show_card('scissor', "Mine");
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).me_ready = true;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ card: "scissor" });
            this.node.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = String(new_scissor);
            cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        }
        else {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "No Scissors";
            var fadeout_2 = cc.fadeOut(2.0);
            this.scheduleOnce(function () {
                cc.find('Canvas/UI/hint_message').active = true;
                cc.find('Canvas/UI/hint_message').runAction(fadeout_2);
            }, 0.1);
            cc.find('Canvas/UI/hint_message').active = false;
            cc.find('Canvas/UI/hint_message').opacity = 255;
        }
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        //get scissor info
    };
    Mine_info_choice.prototype.stone = function () {
        cc.audioEngine.playEffect(this.click, false);
        var new_stone = this.panel.getComponent(panel_info_1.default).stone_left - 1;
        if (new_stone >= 0) {
            this.panel.getComponent(panel_info_1.default).update_info("stone", new_stone);
            cc.find("Canvas/UI/battle_field/Mine_stone").active = true;
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).my_choice = "stone";
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).show_card('stone', "Mine");
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).me_ready = true;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ card: "stone" });
            this.node.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = String(new_stone);
            cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        }
        else {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "No Stone";
            var fadeout_3 = cc.fadeOut(2.0);
            this.scheduleOnce(function () {
                cc.find('Canvas/UI/hint_message').active = true;
                cc.find('Canvas/UI/hint_message').runAction(fadeout_3);
            }, 0.1);
            cc.find('Canvas/UI/hint_message').active = false;
            cc.find('Canvas/UI/hint_message').opacity = 255;
        }
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        //get stone info
    };
    __decorate([
        property(cc.Node)
    ], Mine_info_choice.prototype, "panel", void 0);
    __decorate([
        property(cc.Node)
    ], Mine_info_choice.prototype, "bet", void 0);
    __decorate([
        property(cc.Node)
    ], Mine_info_choice.prototype, "multiple", void 0);
    __decorate([
        property(cc.Node)
    ], Mine_info_choice.prototype, "battle_field", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Mine_info_choice.prototype, "click", void 0);
    Mine_info_choice = __decorate([
        ccclass
    ], Mine_info_choice);
    return Mine_info_choice;
}(cc.Component));
exports.default = Mine_info_choice;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcTWluZV9pbmZvX2Nob2ljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QywyQ0FBc0M7QUFDdEMsK0NBQTBDO0FBSTFDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBc05DO1FBbk5HLFdBQUssR0FBWSxJQUFJLENBQUM7UUFFdEIsU0FBRyxHQUFZLElBQUksQ0FBQztRQUVwQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQUssR0FBaUIsSUFBSSxDQUFDOztRQXdNM0IsZUFBZTtRQUVmLElBQUk7SUFDUixDQUFDO0lBcE1HLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYsZ0NBQUssR0FBTDtRQUNJLDJGQUEyRjtRQUMzRixJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7UUFDM0MsV0FBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDOUIsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRyxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7UUFDM0MsV0FBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDOUIsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRyxJQUFJLGFBQWEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEQsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2pDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsYUFBYSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDbEMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RyxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7UUFDM0MsV0FBVyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDaEMsRUFBRSxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RyxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7UUFDM0MsV0FBVyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUN6QyxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVHLElBQUksWUFBWSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuRCxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDaEMsWUFBWSxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxFQUFFLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNHLElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDL0IsV0FBVyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztRQUMzQyxXQUFXLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN0QyxFQUFFLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25HLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekYsRUFBRSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMzRixFQUFFLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzdGLENBQUM7SUFDRCx3Q0FBYSxHQUFiO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMzRCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksQ0FBQyxRQUFRLHdCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDdkcsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztZQUNsRixFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNoRCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNQLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ3BELENBQUM7SUFDRCx3Q0FBYSxHQUFiO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUM1RCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksQ0FBQyxRQUFRLHlCQUFzQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDekcsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDO1lBQ25GLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekQsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ1AsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDakQsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDcEQsQ0FBQztJQUVELDJDQUFnQixHQUFoQjtRQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDNUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RCxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ2hCLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksQ0FBQyxZQUFZLDBCQUF1QixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDaEUsRUFBRSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUN2RyxDQUFDO0lBQ0Qsa0NBQU8sR0FBUDtRQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDNUMsc0RBQXNEO1FBQ3RELHNFQUFzRTtRQUN0RSxvQ0FBb0M7UUFDcEMsc0NBQXNDO1FBQ3RDLGdHQUFnRztRQUNoRywyREFBMkQ7UUFDM0QsZ0VBQWdFO1FBQ2hFLGNBQWM7UUFDZCx3REFBd0Q7UUFDeEQsdURBQXVEO1FBQ3ZELGNBQWM7UUFDZCxJQUFJO1FBQ0osUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLENBQUMsWUFBWSxxQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNuSSxFQUFFLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQy9GLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDeEYsRUFBRSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUMxRixFQUFFLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzVGLENBQUM7SUFDRCxnQ0FBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM1QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxvQkFBVSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkIsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3BFLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzNELEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDakYsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN4RixFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzdFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSxDQUFDLFlBQVksaUJBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDcEgsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUN6RixFQUFFLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzNGLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDNUY7YUFDSTtZQUNELDhEQUE4RDtZQUM5RCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFBO1lBQzVFLElBQUksU0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDaEQsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFPLENBQUMsQ0FBQztZQUN6RCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDUCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqRCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztTQUNuRDtRQUNELG9CQUFvQjtJQUV4QixDQUFDO0lBQ0Qsa0NBQU8sR0FBUDtRQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDNUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsb0JBQVUsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdkUsSUFBSSxXQUFXLElBQUksQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3hFLEVBQUUsQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzdELEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDbkYsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxRixFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzdFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSxDQUFDLFlBQVksaUJBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3BHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDeEgsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUN6RixFQUFFLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzNGLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDNUY7YUFDSTtZQUNELEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUE7WUFDL0UsSUFBSSxTQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNoRCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsU0FBUyxDQUFDLFNBQU8sQ0FBQyxDQUFDO1lBQ3pELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNQLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1NBQ25EO1FBQ0QsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6RixFQUFFLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzNGLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekYsa0JBQWtCO0lBQ3RCLENBQUM7SUFDRCxnQ0FBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM1QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxvQkFBVSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNuRSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsb0JBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDcEUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDM0QsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUNqRixFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3hGLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDN0UsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLENBQUMsWUFBWSxpQkFBYyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNwSCxFQUFFLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3pGLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDM0YsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM1RjthQUNJO1lBQ0QsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQTtZQUM1RSxJQUFJLFNBQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ2hELEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBTyxDQUFDLENBQUM7WUFDekQsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ1AsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakQsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7U0FDbkQ7UUFDRCxFQUFFLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pGLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDM0YsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6RixnQkFBZ0I7SUFDcEIsQ0FBQztJQTlNRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ0U7SUFFcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNXO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7bURBQ0k7SUFYVixnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQXNOcEM7SUFBRCx1QkFBQztDQXRORCxBQXNOQyxDQXRONkMsRUFBRSxDQUFDLFNBQVMsR0FzTnpEO2tCQXROb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuaW1wb3J0IHBhbmVsX2luZm8gZnJvbSBcIi4vcGFuZWxfaW5mb1wiO1xyXG5pbXBvcnQgYmF0dGxlX2ZpZWxkIGZyb20gXCIuL2JhdHRsZV9maWVsZFwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJTNSBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJTNVwiO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmVfaW5mb19jaG9pY2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBtdWx0aXBsZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJhdHRsZV9maWVsZDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgY2xpY2s6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgY3VycmVudF91c2VyO1xyXG4gICAgb3Bwb25lbnQ7XHJcblxyXG5cclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICAvL3RoaXMuY3VycmVudF91c2VyID0gY2MuZmluZChcIkdhbWVNYW5hZ2VyXCIpLmdldENvbXBvbmVudChHYW1lTWFuYWdlclMyKS5jdXJyZW50X3VzZXJfbm9kZTtcclxuICAgICAgICBsZXQgcGFwZXJfY2xpY2sgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIHBhcGVyX2NsaWNrLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBwYXBlcl9jbGljay5jb21wb25lbnQgPSBcIk1pbmVfaW5mb19jaG9pY2VcIjtcclxuICAgICAgICBwYXBlcl9jbGljay5oYW5kbGVyID0gXCJwYXBlclwiO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChwYXBlcl9jbGljayk7XHJcbiAgICAgICAgbGV0IHN0b25lX2NsaWNrID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBzdG9uZV9jbGljay50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgc3RvbmVfY2xpY2suY29tcG9uZW50ID0gXCJNaW5lX2luZm9fY2hvaWNlXCI7XHJcbiAgICAgICAgc3RvbmVfY2xpY2suaGFuZGxlciA9IFwic3RvbmVcIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zdG9uZWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goc3RvbmVfY2xpY2spO1xyXG4gICAgICAgIGxldCBzY2lzc29yX2NsaWNrID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBzY2lzc29yX2NsaWNrLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBzY2lzc29yX2NsaWNrLmNvbXBvbmVudCA9IFwiTWluZV9pbmZvX2Nob2ljZVwiO1xyXG4gICAgICAgIHNjaXNzb3JfY2xpY2suaGFuZGxlciA9IFwic2Npc3NvclwiO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3NjaXNzb3JgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHNjaXNzb3JfY2xpY2spO1xyXG4gICAgICAgIGxldCBiZXRfY29uZmlybSA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgYmV0X2NvbmZpcm0udGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJldF9jb25maXJtLmNvbXBvbmVudCA9IFwiTWluZV9pbmZvX2Nob2ljZVwiO1xyXG4gICAgICAgIGJldF9jb25maXJtLmhhbmRsZXIgPSBcImJldHRpbmdcIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9iZXRfY29uZmlybWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goYmV0X2NvbmZpcm0pO1xyXG4gICAgICAgIGxldCBnYW1ibGVfdGhpcyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgZ2FtYmxlX3RoaXMudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGdhbWJsZV90aGlzLmNvbXBvbmVudCA9IFwiTWluZV9pbmZvX2Nob2ljZVwiO1xyXG4gICAgICAgIGdhbWJsZV90aGlzLmhhbmRsZXIgPSBcImJldHRpbmdfbXVsdGlwbGVcIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9nYW1ibGVyX2FiaWxpdHlgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGdhbWJsZV90aGlzKTtcclxuICAgICAgICBsZXQgcmV2ZXJzZV90aGlzID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICByZXZlcnNlX3RoaXMudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHJldmVyc2VfdGhpcy5jb21wb25lbnQgPSBcIk1pbmVfaW5mb19jaG9pY2VcIjtcclxuICAgICAgICByZXZlcnNlX3RoaXMuaGFuZGxlciA9IFwic3dpdGNoX3Jlc3VsdFwiO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3N3aXRjaF9yZXN1bHRgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHJldmVyc2VfdGhpcyk7XHJcbiAgICAgICAgbGV0IGVzY2FwZV90aGlzID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBlc2NhcGVfdGhpcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZXNjYXBlX3RoaXMuY29tcG9uZW50ID0gXCJNaW5lX2luZm9fY2hvaWNlXCI7XHJcbiAgICAgICAgZXNjYXBlX3RoaXMuaGFuZGxlciA9IFwiZXNjYXBlX2JhdHRsZVwiO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL2VzY2FwZWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goZXNjYXBlX3RoaXMpO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc2Npc3NvcmApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3N0b25lYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlc2NhcGVfYmF0dGxlKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICAgICAgdGhpcy5iYXR0bGVfZmllbGQuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkuZXNjYXBlID0gdHJ1ZTtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLm9wcG9uZW50fS9nYW1lMl9zdGF0ZS9lc2NhcGVgKS5zZXQoeyBlc2NhcGU6IFwiYWJzb2x1dGVcIiB9KTtcclxuICAgICAgICBsZXQgZmFkZW91dCA9IGNjLmZhZGVPdXQoNS4wKVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFc2NhcGUgYWN0aXZlXCI7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykucnVuQWN0aW9uKGZhZGVvdXQpO1xyXG4gICAgICAgIH0sIDAuMSlcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLm9wYWNpdHkgPSAyNTU7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2hfcmVzdWx0KCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICAgICAgdGhpcy5iYXR0bGVfZmllbGQuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkucmV2ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5vcHBvbmVudH0vZ2FtZTJfc3RhdGUvcmV2ZXJzZWApLnNldCh7IHJldmVyc2U6IFwiYWJzb2x1dGVcIiB9KTtcclxuICAgICAgICBsZXQgZmFkZW91dCA9IGNjLmZhZGVPdXQoNS4wKVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJSZXZlcnNlIGFjdGl2ZVwiO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLnJ1bkFjdGlvbihmYWRlb3V0KTtcclxuICAgICAgICB9LCAwLjEpXHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgfVxyXG5cclxuICAgIGJldHRpbmdfbXVsdGlwbGUoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSlcclxuICAgICAgICBsZXQgc3RyID0gdGhpcy5tdWx0aXBsZS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nO1xyXG4gICAgICAgIGlmIChOdW1iZXIoc3RyKSA+PSA1KVxyXG4gICAgICAgICAgICBzdHIgPSBcIjVcIjtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGUvbXVsdGlwbGVgKS5zZXQoeyBtdWx0aXBsZTogc3RyIH0pO1xyXG4gICAgICAgIHRoaXMuYmF0dGxlX2ZpZWxkLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLm11bHRpcGxlX29uID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9nYW1ibGVyX2FiaWxpdHknKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGJldHRpbmcoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSlcclxuICAgICAgICAvLyBsZXQgc3RyID0gdGhpcy5iZXQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgICAgICAvLyBpZiAoTnVtYmVyKHN0cikgPiB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5tb25leV9sZWZ0KSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBmYWRlb3V0ID0gY2MuZmFkZU91dCg1LjApXHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTm90IGVub3VnaCBtb25leVwiO1xyXG4gICAgICAgIC8vICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykucnVuQWN0aW9uKGZhZGVvdXQpO1xyXG4gICAgICAgIC8vICAgICB9LCAwLjEpXHJcbiAgICAgICAgLy8gICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL2JldGApLnNldCh7IGJldDogdGhpcy5iZXQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZyB9KTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9iZXRfY29uZmlybScpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zY2lzc29yYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zdG9uZWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBwYXBlcigpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gICAgICAgIGxldCBuZXdfcGFwZXIgPSB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5wYXBlcl9sZWZ0IC0gMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhuZXdfcGFwZXIpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJxd2VyXCIpXHJcbiAgICAgICAgaWYgKG5ld19wYXBlciA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwicGFwZXJcIiwgbmV3X3BhcGVyKTtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9iYXR0bGVfZmllbGQvTWluZV9wYXBlclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5teV9jaG9pY2UgPSBcInBhcGVyXCI7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvYmF0dGxlX2ZpZWxkXCIpLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLnNob3dfY2FyZCgncGFwZXInLCBcIk1pbmVcIik7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvYmF0dGxlX2ZpZWxkXCIpLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLm1lX3JlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgY2FyZDogXCJwYXBlclwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwYXBlclwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gU3RyaW5nKG5ld19wYXBlcilcclxuICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvcGFwZXJgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc2Npc3NvcmApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zdG9uZWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9jYW4ndCBzZWxlY3QgcGFwZXIgYmVjYXVzZSB5b3UgZG9uJ3QgaGF2ZSBwYXBlciBjYXJkIGFueW1vcmVcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJObyBQYXBlclwiXHJcbiAgICAgICAgICAgIGxldCBmYWRlb3V0ID0gY2MuZmFkZU91dCgyLjApXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLnJ1bkFjdGlvbihmYWRlb3V0KTtcclxuICAgICAgICAgICAgfSwgMC4xKVxyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2dldCB0aGUgcGFwZXIgaW5mb1xyXG5cclxuICAgIH1cclxuICAgIHNjaXNzb3IoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSlcclxuICAgICAgICBsZXQgbmV3X3NjaXNzb3IgPSB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5zY2lzc29yX2xlZnQgLSAxO1xyXG4gICAgICAgIGlmIChuZXdfc2Npc3NvciA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwic2Npc3NvclwiLCBuZXdfc2Npc3Nvcik7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvYmF0dGxlX2ZpZWxkL01pbmVfc2Npc3NvclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5teV9jaG9pY2UgPSBcInNjaXNzb3JcIjtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9iYXR0bGVfZmllbGRcIikuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkuc2hvd19jYXJkKCdzY2lzc29yJywgXCJNaW5lXCIpO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5tZV9yZWFkeSA9IHRydWU7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IGNhcmQ6IFwic2Npc3NvclwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY2lzc29yXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBTdHJpbmcobmV3X3NjaXNzb3IpXHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3NjaXNzb3JgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc3RvbmVgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTm8gU2Npc3NvcnNcIlxyXG4gICAgICAgICAgICBsZXQgZmFkZW91dCA9IGNjLmZhZGVPdXQoMi4wKVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5ydW5BY3Rpb24oZmFkZW91dCk7XHJcbiAgICAgICAgICAgIH0sIDAuMSlcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvcGFwZXJgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zY2lzc29yYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc3RvbmVgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAvL2dldCBzY2lzc29yIGluZm9cclxuICAgIH1cclxuICAgIHN0b25lKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICAgICAgbGV0IG5ld19zdG9uZSA9IHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnN0b25lX2xlZnQgLSAxO1xyXG4gICAgICAgIGlmIChuZXdfc3RvbmUgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS51cGRhdGVfaW5mbyhcInN0b25lXCIsIG5ld19zdG9uZSk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvYmF0dGxlX2ZpZWxkL01pbmVfc3RvbmVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9iYXR0bGVfZmllbGRcIikuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkubXlfY2hvaWNlID0gXCJzdG9uZVwiO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5zaG93X2NhcmQoJ3N0b25lJywgXCJNaW5lXCIpO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5tZV9yZWFkeSA9IHRydWU7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IGNhcmQ6IFwic3RvbmVcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RvbmVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkX251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFN0cmluZyhuZXdfc3RvbmUpXHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3NjaXNzb3JgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc3RvbmVgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTm8gU3RvbmVcIlxyXG4gICAgICAgICAgICBsZXQgZmFkZW91dCA9IGNjLmZhZGVPdXQoMi4wKVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5ydW5BY3Rpb24oZmFkZW91dCk7XHJcbiAgICAgICAgICAgIH0sIDAuMSlcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvcGFwZXJgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zY2lzc29yYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc3RvbmVgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAvL2dldCBzdG9uZSBpbmZvXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlKGR0KSB7XHJcblxyXG4gICAgLy8gfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/special_player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '48e551j+rZENaIVObxSpu/A', 'special_player');
// Script/Game5Object/special_player.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var CameraManager_1 = require("../CameraManager");
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var UImanager_1 = require("../UImanager");
var Mine_info_choice_1 = require("../Game5Object/Mine_info_choice");
var fight_forum_1 = require("../Game5Object/fight_forum");
var battle_field_1 = require("../Game5Object/battle_field");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Special_player = /** @class */ (function (_super) {
    __extends(Special_player, _super);
    function Special_player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerSpeed = 0;
        _this.Mine_info_choice = null;
        _this.battle_field = null;
        _this.fight_forum = null;
        _this.child_node = null;
        _this.child_label = null;
        _this.rigidbody = null;
        _this.anim = null;
        _this.child_anim = null;
        _this.leftDown = false;
        _this.rightDown = false;
        _this.upDown = false;
        _this.downDown = false;
        _this.premoveDirX = 0;
        _this.moveDirX = 0;
        _this.moveDirY = 0;
        _this.premoveDirX_firebase = 0;
        _this.moveDirX_firebase = 0;
        _this.moveDirY_firebase = 0;
        _this.logged_in_or_not = false;
        _this.moveable = true;
        _this.moveableKey = true;
        return _this;
    }
    Special_player.prototype.onLoad = function () {
        var _this = this;
        var handle = this;
        // 每個player node都會對應一個user
        var name = this.node.name;
        var user = firebase.auth().currentUser.uid;
        this.current_user = user;
        firebase.database().ref("player_data/" + name).once('value', function (snapshot) {
            handle.permited_user = snapshot.val().uid;
            if (snapshot.val() != null) {
                handle.node.active = true;
                handle.logged_in_or_not = true;
            }
            if (user == handle.permited_user) {
                firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/moveable").set({ moveable: "true" });
                firebase.database().ref("player_data/" + name + "/state_value/moveableKey").set({ moveableKey: "true" });
                firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: 0 });
                firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: 0 });
                // firebase.database().ref(`player_data/${name}/state_value/IsLogin`).set({ bool: true })
            }
        });
        this.scheduleOnce(function () {
            _this.this_node_user = handle.permited_user;
            console.log("nodeuser:", _this.node.name, _this.this_node_user);
            console.log("currentuser:", _this.current_user);
            if (_this.current_user == _this.this_node_user) {
                cc.find("Canvas/Main Camera").getComponent(CameraManager_1.default).FollowTarget = _this.node;
                cc.find("Canvas/UI").getComponent(UImanager_1.default).FollowTarget = _this.node;
                //adjust the content of the label
                //cc.find("Canvas/UI/info").getComponent(cc.Label).string = "paper : 4  scissor: 4 stone: 4  life:5"
                _this.node.getChildByName("fight").active = false;
                //set the variable in gamemanager
                cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node = _this.node.name;
                _this.Mine_info_choice.getComponent(Mine_info_choice_1.default).current_user = _this.node.name;
                _this.fight_forum.getComponent(fight_forum_1.default).current_user = _this.node.name;
                _this.battle_field.getComponent(battle_field_1.default).current_user == _this.node.name;
            }
        }, 0.25);
    };
    Special_player.prototype.get_current_user_uid = function () {
        return this.permited_user;
    };
    Special_player.prototype.start = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.child_node = this.node.getChildByName(this.node.name);
        this.child_label = this.node.getChildByName('Label');
        this.child_anim = this.child_node.getComponent(cc.Animation);
        this.child_anim.play('Idle');
        this.schedule(this.updateOthersCurrentPos, 1);
    };
    Special_player.prototype.update = function (dt) {
        var _this = this;
        //if the player is logged now we active the node
        if (!this.logged_in_or_not) {
            var handle_1 = this;
            firebase.database().ref("player_data/" + this.node.name).once('value', function (snaphot) {
                if (snaphot.val() != null) {
                    handle_1.node.active = true;
                }
            });
        }
        // firebase
        var name = this.node.name;
        var DirX = this.moveDirX_firebase;
        var DirY = this.moveDirY_firebase;
        var preDirX = this.premoveDirX_firebase;
        var posX = this.node.position.x;
        var posY = this.node.position.y;
        // write firebase realtime database
        if (this.current_user == this.this_node_user) {
            firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: DirX });
            firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: DirY });
            firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: preDirX });
            firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: posX });
            firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: posY });
            //get the fight forum going
            firebase.database().ref("player_data/" + name + "/game2_state").once('value', function (snapshot) {
                var opponent = snapshot.val().opponent;
                var challenged = snapshot.val().challenged;
                //problem
                if (opponent != "null" && challenged == "true") {
                    cc.find("Canvas/UI/fight_forum").active = true;
                    cc.find("Canvas/UI/fight_forum/context").getComponent(cc.RichText).string = opponent + " asks to fight with you";
                }
                else if (opponent != "null" && challenged == "absolute") {
                    cc.find("Canvas/UI/fight_forum").active = true;
                    cc.find("Canvas/UI/fight_forum").getComponent(fight_forum_1.default).being_rude = true;
                    cc.find("Canvas/UI/fight_forum/reject").active = false;
                    cc.find("Canvas/UI/fight_forum/context").getComponent(cc.RichText).string = opponent + " asks to fight with you";
                }
            });
        }
        // read firebase realtime database
        DirX = 0, DirY = 0, preDirX = 0;
        firebase.database().ref("player_data/" + name + "/state_value").once('value', function (snapshot) {
            if (snapshot.val() != null) {
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                preDirX = snapshot.val().premoveDirX.Dir;
            }
        });
        this.scheduleOnce(function () {
            _this.moveDirX = DirX;
            _this.moveDirY = DirY;
            _this.premoveDirX = preDirX;
        }, 0.2);
        // Scale
        this.child_node.scaleX = (this.moveDirX >= 0) ? 1 : -1;
        if (this.moveDirX == 0)
            this.child_node.scaleX = (this.premoveDirX >= 0) ? 1 : -1;
        // Move
        if (this.moveDirX == 0) {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(0, this.playerSpeed * this.moveDirY);
        }
        else if (this.moveDirY == 0) {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX, 0);
        }
        else {
            if (this.moveable)
                this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX * 0.7, this.playerSpeed * this.moveDirY * 0.7);
        }
        // Animation
        if ((this.moveDirX == 0 && this.moveDirY == 0) || !this.moveable) {
            if (!this.child_anim.getAnimationState('Idle').isPlaying)
                this.child_anim.play('Idle');
        }
        else {
            if (!this.child_anim.getAnimationState('Move').isPlaying)
                this.child_anim.play('Move');
        }
    };
    Special_player.prototype.onKeyDown = function (event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = true;
                this.playerMoveX(-1);
                break;
            case cc.macro.KEY.d:
                this.rightDown = true;
                this.playerMoveX(1);
                break;
            case cc.macro.KEY.w:
                this.upDown = true;
                this.playerMoveY(1);
                break;
            case cc.macro.KEY.s:
                this.downDown = true;
                this.playerMoveY(-1);
                break;
        }
    };
    Special_player.prototype.onKeyUp = function (event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = false;
                if (this.rightDown)
                    this.playerMoveX(1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.d:
                this.rightDown = false;
                if (this.leftDown)
                    this.playerMoveX(-1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.w:
                this.upDown = false;
                if (this.downDown)
                    this.playerMoveY(-1);
                else
                    this.playerMoveY(0);
                break;
            case cc.macro.KEY.s:
                this.downDown = false;
                if (this.upDown)
                    this.playerMoveY(1);
                else
                    this.playerMoveY(0);
                break;
        }
    };
    Special_player.prototype.playerMoveX = function (moveDirX) {
        if (this.current_user != this.this_node_user)
            return;
        if (!this.moveableKey)
            return;
        this.premoveDirX_firebase = this.moveDirX_firebase;
        this.moveDirX_firebase = moveDirX;
    };
    Special_player.prototype.playerMoveY = function (moveDirY) {
        if (this.current_user != this.this_node_user)
            return;
        if (!this.moveableKey)
            return;
        this.moveDirY_firebase = moveDirY;
    };
    Special_player.prototype.updateOthersCurrentPos = function () {
        var _this = this;
        if (this.current_user == this.this_node_user)
            return; // 不更新自己的node
        var name = this.node.name;
        // console.log("refresh Pos:", name);
        var posX = -1487, DirX;
        var posY = -1487, DirY;
        // let IsLogin: boolean;
        firebase.database().ref("player_data/" + name + "/state_value").once('value', function (snapshot) {
            if (snapshot.val() != null) {
                posX = snapshot.val().X.x;
                posY = snapshot.val().Y.y;
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                // IsLogin = snapshot.val().IsLogin.bool;
            }
        });
        this.scheduleOnce(function () {
            if (posX == -1487 && posY == -1487)
                return; // 如果firebase database沒有抓到資料，就不要更新。
            var action;
            action = cc.moveTo(0.5, posX, posY); // 修正並平滑移動到正確位置
            _this.node.runAction(action);
            // if(!IsLogin) {
            //     this.child_node.active = false;
            //     this.child_label.active = false;
            // }
            // else {
            //     this.child_node.active = true;
            //     this.child_label.active = true;
            // }
        }, 0.20);
    };
    __decorate([
        property()
    ], Special_player.prototype, "playerSpeed", void 0);
    __decorate([
        property(cc.Node)
    ], Special_player.prototype, "Mine_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], Special_player.prototype, "battle_field", void 0);
    __decorate([
        property(cc.Node)
    ], Special_player.prototype, "fight_forum", void 0);
    Special_player = __decorate([
        ccclass
    ], Special_player);
    return Special_player;
}(cc.Component));
exports.default = Special_player;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcc3BlY2lhbF9wbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsa0RBQTZDO0FBQzdDLDhEQUF5RDtBQUN6RCwwQ0FBcUM7QUFDckMsb0VBQStEO0FBQy9ELDBEQUFxRDtBQUNyRCw0REFBdUQ7QUFDakQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFnUkM7UUE5UUcsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBR3BCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBTTVCLGVBQVMsR0FBaUIsSUFBSSxDQUFDO1FBQy9CLFVBQUksR0FBaUIsSUFBSSxDQUFDO1FBQzFCLGdCQUFVLEdBQWlCLElBQUksQ0FBQztRQUloQyxjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGlCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsMEJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0Qix1QkFBaUIsR0FBRyxDQUFDLENB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TCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU8sQ0FBQyxtQ0FBbUM7WUFDL0UsSUFBSSxNQUFpQixDQUFDO1lBQ3RCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlO1lBQ3BELEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLGlCQUFpQjtZQUNqQixzQ0FBc0M7WUFDdEMsdUNBQXVDO1lBQ3ZDLElBQUk7WUFDSixTQUFTO1lBQ1QscUNBQXFDO1lBQ3JDLHNDQUFzQztZQUN0QyxJQUFJO1FBQ1IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQTdRRDtRQURDLFFBQVEsRUFBRTt1REFDYTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzREQUNlO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ1c7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDVTtJQVJYLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FnUmxDO0lBQUQscUJBQUM7Q0FoUkQsQUFnUkMsQ0FoUjJDLEVBQUUsQ0FBQyxTQUFTLEdBZ1J2RDtrQkFoUm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBDYW1lcmFNYW5hZ2VyIGZyb20gXCIuLi9DYW1lcmFNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlclM1IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclM1XCI7XHJcbmltcG9ydCBVSW1hbmFnZXIgZnJvbSBcIi4uL1VJbWFuYWdlclwiO1xyXG5pbXBvcnQgTWluZV9pbmZvX2Nob2ljZSBmcm9tIFwiLi4vR2FtZTVPYmplY3QvTWluZV9pbmZvX2Nob2ljZVwiO1xyXG5pbXBvcnQgZmlnaHRfZm9ydW0gZnJvbSBcIi4uL0dhbWU1T2JqZWN0L2ZpZ2h0X2ZvcnVtXCI7XHJcbmltcG9ydCBiYXR0bGVfZmllbGQgZnJvbSBcIi4uL0dhbWU1T2JqZWN0L2JhdHRsZV9maWVsZFwiO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGVjaWFsX3BsYXllciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgcGxheWVyU3BlZWQ6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIE1pbmVfaW5mb19jaG9pY2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiYXR0bGVfZmllbGQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmaWdodF9mb3J1bTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgY2hpbGRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNoaWxkX2xhYmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHRoaXNfbm9kZV91c2VyO1xyXG4gICAgLy9jaGFuZ2VcclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyO1xyXG5cclxuICAgIHByaXZhdGUgcmlnaWRib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBhbmltOiBjYy5BbmltYXRpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBjaGlsZF9hbmltOiBjYy5BbmltYXRpb24gPSBudWxsO1xyXG4gICAgLy9cclxuICAgIHByaXZhdGUgcGVybWl0ZWRfdXNlcjtcclxuXHJcbiAgICBwcml2YXRlIGxlZnREb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHJpZ2h0RG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB1cERvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZG93bkRvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcHJlbW92ZURpclggPSAwO1xyXG4gICAgcHJpdmF0ZSBtb3ZlRGlyWCA9IDA7XHJcbiAgICBwcml2YXRlIG1vdmVEaXJZID0gMDtcclxuICAgIHByaXZhdGUgcHJlbW92ZURpclhfZmlyZWJhc2UgPSAwO1xyXG4gICAgcHJpdmF0ZSBtb3ZlRGlyWF9maXJlYmFzZSA9IDA7XHJcbiAgICBwcml2YXRlIG1vdmVEaXJZX2ZpcmViYXNlID0gMDtcclxuICAgIHByaXZhdGUgbG9nZ2VkX2luX29yX25vdCA9IGZhbHNlO1xyXG4gICAgbW92ZWFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgbW92ZWFibGVLZXk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDmr4/lgItwbGF5ZXIgbm9kZemDveacg+WwjeaHieS4gOWAi3VzZXJcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgIHZhciB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdXNlciA9IHVzZXI7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgaGFuZGxlLnBlcm1pdGVkX3VzZXIgPSBzbmFwc2hvdC52YWwoKS51aWQ7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmxvZ2dlZF9pbl9vcl9ub3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1c2VyID09IGhhbmRsZS5wZXJtaXRlZF91c2VyKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvbW92ZURpcllgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVhYmxlYCkuc2V0KHsgbW92ZWFibGU6IFwidHJ1ZVwiIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlYWJsZUtleWApLnNldCh7IG1vdmVhYmxlS2V5OiBcInRydWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvcHJlbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiAwIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9ZYCkuc2V0KHsgeTogMCB9KVxyXG4gICAgICAgICAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvSXNMb2dpbmApLnNldCh7IGJvb2w6IHRydWUgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRoaXNfbm9kZV91c2VyID0gaGFuZGxlLnBlcm1pdGVkX3VzZXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm9kZXVzZXI6XCIsIHRoaXMubm9kZS5uYW1lLCB0aGlzLnRoaXNfbm9kZV91c2VyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50dXNlcjpcIiwgdGhpcy5jdXJyZW50X3VzZXIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgPT0gdGhpcy50aGlzX25vZGVfdXNlcikge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYVwiKS5nZXRDb21wb25lbnQoQ2FtZXJhTWFuYWdlcikuRm9sbG93VGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSVwiKS5nZXRDb21wb25lbnQoVUltYW5hZ2VyKS5Gb2xsb3dUYXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICAgICAgICAvL2FkanVzdCB0aGUgY29udGVudCBvZiB0aGUgbGFiZWxcclxuICAgICAgICAgICAgICAgIC8vY2MuZmluZChcIkNhbnZhcy9VSS9pbmZvXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJwYXBlciA6IDQgIHNjaXNzb3I6IDQgc3RvbmU6IDQgIGxpZmU6NVwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJmaWdodFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vc2V0IHRoZSB2YXJpYWJsZSBpbiBnYW1lbWFuYWdlclxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkdhbWVNYW5hZ2VyXCIpLmdldENvbXBvbmVudChHYW1lTWFuYWdlclM1KS5jdXJyZW50X3VzZXJfbm9kZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NaW5lX2luZm9fY2hvaWNlLmdldENvbXBvbmVudChNaW5lX2luZm9fY2hvaWNlKS5jdXJyZW50X3VzZXIgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRfZm9ydW0uZ2V0Q29tcG9uZW50KGZpZ2h0X2ZvcnVtKS5jdXJyZW50X3VzZXIgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmF0dGxlX2ZpZWxkLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLmN1cnJlbnRfdXNlciA9PSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDAuMjUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9jdXJyZW50X3VzZXJfdWlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBlcm1pdGVkX3VzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnJpZ2lkYm9keSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcclxuICAgICAgICB0aGlzLmNoaWxkX25vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRfbGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0xhYmVsJyk7XHJcbiAgICAgICAgdGhpcy5jaGlsZF9hbmltID0gdGhpcy5jaGlsZF9ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIHRoaXMuY2hpbGRfYW5pbS5wbGF5KCdJZGxlJyk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnVwZGF0ZU90aGVyc0N1cnJlbnRQb3MsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIC8vaWYgdGhlIHBsYXllciBpcyBsb2dnZWQgbm93IHdlIGFjdGl2ZSB0aGUgbm9kZVxyXG4gICAgICAgIGlmICghdGhpcy5sb2dnZWRfaW5fb3Jfbm90KSB7XHJcbiAgICAgICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLm5vZGUubmFtZX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcGhvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgIGxldCBEaXJYID0gdGhpcy5tb3ZlRGlyWF9maXJlYmFzZTtcclxuICAgICAgICBsZXQgRGlyWSA9IHRoaXMubW92ZURpcllfZmlyZWJhc2U7XHJcbiAgICAgICAgbGV0IHByZURpclggPSB0aGlzLnByZW1vdmVEaXJYX2ZpcmViYXNlO1xyXG4gICAgICAgIGxldCBwb3NYID0gdGhpcy5ub2RlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB0aGlzLm5vZGUucG9zaXRpb24ueTtcclxuICAgICAgICAvLyB3cml0ZSBmaXJlYmFzZSByZWFsdGltZSBkYXRhYmFzZVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRfdXNlciA9PSB0aGlzLnRoaXNfbm9kZV91c2VyKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJYYCkuc2V0KHsgRGlyOiBEaXJYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiBEaXJZIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiBwcmVEaXJYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiBwb3NYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiBwb3NZIH0pXHJcbiAgICAgICAgICAgIC8vZ2V0IHRoZSBmaWdodCBmb3J1bSBnb2luZ1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9nYW1lMl9zdGF0ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3Bwb25lbnQgPSBzbmFwc2hvdC52YWwoKS5vcHBvbmVudDtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFsbGVuZ2VkID0gc25hcHNob3QudmFsKCkuY2hhbGxlbmdlZDtcclxuICAgICAgICAgICAgICAgIC8vcHJvYmxlbVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wcG9uZW50ICE9IFwibnVsbFwiICYmIGNoYWxsZW5nZWQgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2ZpZ2h0X2ZvcnVtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9maWdodF9mb3J1bS9jb250ZXh0XCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7b3Bwb25lbnR9IGFza3MgdG8gZmlnaHQgd2l0aCB5b3VgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3Bwb25lbnQgIT0gXCJudWxsXCIgJiYgY2hhbGxlbmdlZCA9PSBcImFic29sdXRlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2ZpZ2h0X2ZvcnVtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9maWdodF9mb3J1bVwiKS5nZXRDb21wb25lbnQoZmlnaHRfZm9ydW0pLmJlaW5nX3J1ZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvZmlnaHRfZm9ydW0vcmVqZWN0XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvZmlnaHRfZm9ydW0vY29udGV4dFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGAke29wcG9uZW50fSBhc2tzIHRvIGZpZ2h0IHdpdGggeW91YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVhZCBmaXJlYmFzZSByZWFsdGltZSBkYXRhYmFzZVxyXG4gICAgICAgIERpclggPSAwLCBEaXJZID0gMCwgcHJlRGlyWCA9IDA7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgRGlyWCA9IHNuYXBzaG90LnZhbCgpLm1vdmVEaXJYLkRpcjtcclxuICAgICAgICAgICAgICAgIERpclkgPSBzbmFwc2hvdC52YWwoKS5tb3ZlRGlyWS5EaXI7XHJcbiAgICAgICAgICAgICAgICBwcmVEaXJYID0gc25hcHNob3QudmFsKCkucHJlbW92ZURpclguRGlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXJYID0gRGlyWDtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGlyWSA9IERpclk7XHJcbiAgICAgICAgICAgIHRoaXMucHJlbW92ZURpclggPSBwcmVEaXJYO1xyXG4gICAgICAgIH0sIDAuMik7XHJcblxyXG4gICAgICAgIC8vIFNjYWxlXHJcbiAgICAgICAgdGhpcy5jaGlsZF9ub2RlLnNjYWxlWCA9ICh0aGlzLm1vdmVEaXJYID49IDApID8gMSA6IC0xO1xyXG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJYID09IDApIHRoaXMuY2hpbGRfbm9kZS5zY2FsZVggPSAodGhpcy5wcmVtb3ZlRGlyWCA+PSAwKSA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgLy8gTW92ZVxyXG4gICAgICAgIGlmICh0aGlzLm1vdmVEaXJYID09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZWFibGUpIHRoaXMucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgdGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpclkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb3ZlRGlyWSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmVhYmxlKSB0aGlzLnJpZ2lkYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHRoaXMucGxheWVyU3BlZWQgKiB0aGlzLm1vdmVEaXJYLCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZlYWJsZSkgdGhpcy5yaWdpZGJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih0aGlzLnBsYXllclNwZWVkICogdGhpcy5tb3ZlRGlyWCAqIDAuNywgdGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpclkgKiAwLjcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBbmltYXRpb25cclxuICAgICAgICBpZiAoKHRoaXMubW92ZURpclggPT0gMCAmJiB0aGlzLm1vdmVEaXJZID09IDApIHx8ICF0aGlzLm1vdmVhYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZF9hbmltLmdldEFuaW1hdGlvblN0YXRlKCdJZGxlJykuaXNQbGF5aW5nKSB0aGlzLmNoaWxkX2FuaW0ucGxheSgnSWRsZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZF9hbmltLmdldEFuaW1hdGlvblN0YXRlKCdNb3ZlJykuaXNQbGF5aW5nKSB0aGlzLmNoaWxkX2FuaW0ucGxheSgnTW92ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleURvd24oZXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIktleURvd25cIiwgZXZlbnQua2V5Q29kZSk7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnREb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVZKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25Eb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25LZXlVcChldmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5RG93blwiLCBldmVudC5rZXlDb2RlKTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdERvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZDpcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHREb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWZ0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKC0xKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bkRvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgtMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5zOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXBEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBsYXllck1vdmVYKG1vdmVEaXJYOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHJlbW92ZURpclhfZmlyZWJhc2UgPSB0aGlzLm1vdmVEaXJYX2ZpcmViYXNlO1xyXG4gICAgICAgIHRoaXMubW92ZURpclhfZmlyZWJhc2UgPSBtb3ZlRGlyWDtcclxuICAgIH1cclxuICAgIHBsYXllck1vdmVZKG1vdmVEaXJZOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubW92ZURpcllfZmlyZWJhc2UgPSBtb3ZlRGlyWTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVPdGhlcnNDdXJyZW50UG9zKCkgeyAvLyDlrprmnJ/oh6rli5Xkv67mraPlhbbku5bnjqnlrrbmraPnorrkvY3nva5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgPT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuOyAvLyDkuI3mm7TmlrDoh6rlt7HnmoRub2RlXHJcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5vZGUubmFtZTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlZnJlc2ggUG9zOlwiLCBuYW1lKTtcclxuICAgICAgICBsZXQgcG9zWCA9IC0xNDg3LCBEaXJYO1xyXG4gICAgICAgIGxldCBwb3NZID0gLTE0ODcsIERpclk7XHJcbiAgICAgICAgLy8gbGV0IElzTG9naW46IGJvb2xlYW47XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWCA9IHNuYXBzaG90LnZhbCgpLlgueDtcclxuICAgICAgICAgICAgICAgIHBvc1kgPSBzbmFwc2hvdC52YWwoKS5ZLnk7XHJcbiAgICAgICAgICAgICAgICBEaXJYID0gc25hcHNob3QudmFsKCkubW92ZURpclguRGlyO1xyXG4gICAgICAgICAgICAgICAgRGlyWSA9IHNuYXBzaG90LnZhbCgpLm1vdmVEaXJZLkRpcjtcclxuICAgICAgICAgICAgICAgIC8vIElzTG9naW4gPSBzbmFwc2hvdC52YWwoKS5Jc0xvZ2luLmJvb2w7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwb3NYID09IC0xNDg3ICYmIHBvc1kgPT0gLTE0ODcpIHJldHVybjsgLy8g5aaC5p6cZmlyZWJhc2UgZGF0YWJhc2XmspLmnInmipPliLDos4fmlpnvvIzlsLHkuI3opoHmm7TmlrDjgIJcclxuICAgICAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgICAgICBhY3Rpb24gPSBjYy5tb3ZlVG8oMC41LCBwb3NYLCBwb3NZKTsgLy8g5L+u5q2j5Lim5bmz5ruR56e75YuV5Yiw5q2j56K65L2N572uXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgLy8gaWYoIUlzTG9naW4pIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2hpbGRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2hpbGRfbGFiZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNoaWxkX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2hpbGRfbGFiZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0sIDAuMjApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/panel_info.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8b223BWzeBPh6BpgH153s5e', 'panel_info');
// Script/Game5Object/panel_info.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var panel_info = /** @class */ (function (_super) {
    __extends(panel_info, _super);
    function panel_info() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flag = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    panel_info.prototype.start = function () {
        var handle = this;
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        handle.paper_left = 2;
        handle.scissor_left = 2;
        handle.stone_left = 2;
        handle.money_left = 5;
        cc.find("Canvas/UI/TopPanel/paper/number").getComponent(cc.Label).string = String(handle.paper_left);
        cc.find("Canvas/UI/TopPanel/scissor/number").getComponent(cc.Label).string = String(handle.scissor_left);
        cc.find("Canvas/UI/TopPanel/stone/number").getComponent(cc.Label).string = String(handle.stone_left);
        cc.find("Canvas/UI/TopPanel/life/number").getComponent(cc.Label).string = String(handle.money_left);
    };
    panel_info.prototype.update_info = function (type, new_number) {
        var handle = this;
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        if (type == "paper") {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ paper: new_number });
            cc.find("Canvas/UI/TopPanel/paper/number").getComponent(cc.Label).string = String(new_number);
            handle.paper_left = new_number;
        }
        else if (type == "scissor") {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ scissor: new_number });
            cc.find("Canvas/UI/TopPanel/scissor/number").getComponent(cc.Label).string = String(new_number);
            this.scissor_left = new_number;
        }
        else if (type == "stone") {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ stone: new_number });
            cc.find("Canvas/UI/TopPanel/stone/number").getComponent(cc.Label).string = String(new_number);
            handle.stone_left = new_number;
        }
        else if (type == "money") {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ money: new_number });
            cc.find("Canvas/UI/TopPanel/life/number").getComponent(cc.Label).string = String(new_number);
            handle.money_left = new_number;
        }
    };
    panel_info.prototype.update = function (dt) {
        if (this.flag == false) {
            var handle_1 = this;
            this.current_user = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
            if (this.current_user != null) {
                this.flag = true;
                firebase.database().ref("player_data/" + this.current_user + "/game2_state").once('value', function (snapshot) {
                    cc.find("Canvas/UI/TopPanel/life/number").getComponent(cc.Label).string = String(snapshot.val().money);
                    handle_1.money_left = snapshot.val().money;
                });
            }
        }
    };
    panel_info = __decorate([
        ccclass
    ], panel_info);
    return panel_info;
}(cc.Component));
exports.default = panel_info;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxccGFuZWxfaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1Qyw4REFBeUQ7QUFHekQ7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUErREM7UUF2RFcsVUFBSSxHQUFHLEtBQUssQ0FBQzs7SUF1RHpCLENBQUM7SUF0REcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZiwwQkFBSyxHQUFMO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3pGLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFB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QyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQ3pGLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO2dCQUNoQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksQ0FBQyxZQUFZLGlCQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtvQkFDcEcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZHLFFBQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLENBQUE7YUFDTDtTQUNKO0lBQ0wsQ0FBQztJQTlEZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQStEOUI7SUFBRCxpQkFBQztDQS9ERCxBQStEQyxDQS9EdUMsRUFBRSxDQUFDLFNBQVMsR0ErRG5EO2tCQS9Eb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmltcG9ydCBHYW1lTWFuYWdlclM1IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclM1XCI7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGFuZWxfaW5mbyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcGFwZXJfbGVmdDtcclxuICAgIHNjaXNzb3JfbGVmdDtcclxuICAgIHN0b25lX2xlZnRcclxuICAgIG1vbmV5X2xlZnQ7XHJcbiAgICBjdXJyZW50X3VzZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBmbGFnID0gZmFsc2U7XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgaGFuZGxlLnBhcGVyX2xlZnQgPSAyO1xyXG4gICAgICAgIGhhbmRsZS5zY2lzc29yX2xlZnQgPSAyO1xyXG4gICAgICAgIGhhbmRsZS5zdG9uZV9sZWZ0ID0gMjtcclxuICAgICAgICBoYW5kbGUubW9uZXlfbGVmdCA9IDU7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9Ub3BQYW5lbC9wYXBlci9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcoaGFuZGxlLnBhcGVyX2xlZnQpO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvVG9wUGFuZWwvc2Npc3Nvci9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcoaGFuZGxlLnNjaXNzb3JfbGVmdCk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9Ub3BQYW5lbC9zdG9uZS9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcoaGFuZGxlLnN0b25lX2xlZnQpO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvVG9wUGFuZWwvbGlmZS9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcoaGFuZGxlLm1vbmV5X2xlZnQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlX2luZm8odHlwZTogc3RyaW5nLCBuZXdfbnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJwYXBlclwiKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IHBhcGVyOiBuZXdfbnVtYmVyIH0pO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL1RvcFBhbmVsL3BhcGVyL251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFN0cmluZyhuZXdfbnVtYmVyKTtcclxuICAgICAgICAgICAgaGFuZGxlLnBhcGVyX2xlZnQgPSBuZXdfbnVtYmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic2Npc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IHNjaXNzb3I6IG5ld19udW1iZXIgfSk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvVG9wUGFuZWwvc2Npc3Nvci9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcobmV3X251bWJlcik7XHJcbiAgICAgICAgICAgIHRoaXMuc2Npc3Nvcl9sZWZ0ID0gbmV3X251bWJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInN0b25lXCIpIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgc3RvbmU6IG5ld19udW1iZXIgfSk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvVG9wUGFuZWwvc3RvbmUvbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKG5ld19udW1iZXIpO1xyXG4gICAgICAgICAgICBoYW5kbGUuc3RvbmVfbGVmdCA9IG5ld19udW1iZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJtb25leVwiKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IG1vbmV5OiBuZXdfbnVtYmVyIH0pO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL1RvcFBhbmVsL2xpZmUvbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKG5ld19udW1iZXIpO1xyXG4gICAgICAgICAgICBoYW5kbGUubW9uZXlfbGVmdCA9IG5ld19udW1iZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZsYWcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF91c2VyID0gY2MuZmluZChcIkdhbWVNYW5hZ2VyXCIpLmdldENvbXBvbmVudChHYW1lTWFuYWdlclM1KS5jdXJyZW50X3VzZXJfbm9kZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudF91c2VyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9Ub3BQYW5lbC9saWZlL251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFN0cmluZyhzbmFwc2hvdC52YWwoKS5tb25leSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm1vbmV5X2xlZnQgPSBzbmFwc2hvdC52YWwoKS5tb25leTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager/GameManagerS5.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ed3c4LMeTJPzosI2dJ4oVp0', 'GameManagerS5');
// Script/GameManager/GameManagerS5.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var special_player_1 = require("../Game5Object/special_player");
var battle_field_1 = require("../Game5Object/battle_field");
var Mine_info_choice_1 = require("../Game5Object/Mine_info_choice");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS5 = /** @class */ (function (_super) {
    __extends(GameManagerS5, _super);
    function GameManagerS5() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.GameoverBG = null;
        _this.TimerLabel = null;
        _this.GameTime = 120;
        _this.opponent_info_choice = null;
        _this.Mine_info_choice = null;
        _this.battle_field = null;
        _this.BGM = null;
        _this.ScoreSound = null;
        _this.GameOverSound = null;
        _this.panel = null;
        _this.physicManager = null;
        _this.flag = false;
        _this.counting = 0;
        _this.player_array = [];
        _this.player_node1 = null;
        _this.player_node2 = null;
        _this.player_node3 = null;
        _this.player_node4 = null;
        _this.player_node5 = null;
        _this.fighting = false;
        _this.reset = false;
        _this.select_character = false;
        _this.timer = 0;
        _this.timeUp = false;
        return _this;
    }
    GameManagerS5.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        // 每個player node初始化位置。
        var user = firebase.auth().currentUser.uid;
        var permited_user;
        var handle = this;
        //
    };
    GameManagerS5.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        //choose the initial ghost
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1)
            this.player_node1.getComponent(special_player_1.default).moveable = false;
        if (this.player_node2)
            this.player_node2.getComponent(special_player_1.default).moveable = false;
        if (this.player_node3)
            this.player_node3.getComponent(special_player_1.default).moveable = false;
        if (this.player_node4)
            this.player_node4.getComponent(special_player_1.default).moveable = false;
        if (this.player_node5)
            this.player_node5.getComponent(special_player_1.default).moveable = false;
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (_this.player_node1)
                _this.player_node1.getComponent(special_player_1.default).moveable = true;
            if (_this.player_node2)
                _this.player_node2.getComponent(special_player_1.default).moveable = true;
            if (_this.player_node3)
                _this.player_node3.getComponent(special_player_1.default).moveable = true;
            if (_this.player_node4)
                _this.player_node4.getComponent(special_player_1.default).moveable = true;
            if (_this.player_node5)
                _this.player_node5.getComponent(special_player_1.default).moveable = true;
            cc.audioEngine.playMusic(_this.BGM, true);
            cc.audioEngine.setMusicVolume(0.5);
            // 開始計時
            _this.TimerStart();
        }, 2.5);
    };
    // getRandomInt(max) {
    //     return Math.floor(Math.random() * max);
    // }
    // timer
    GameManagerS5.prototype.TimerStart = function () {
        this.timer = this.GameTime;
        this.TimerLabel.getComponent(cc.Label).string = this.GameTime.toString();
        this.schedule(this.UpdateTimer, 1);
    };
    GameManagerS5.prototype.UpdateTimer = function () {
        if (this.timeUp)
            return;
        if (this.timer > 0)
            this.timer += -1;
        else if (this.timer == 0)
            this.timeUp = true;
        this.TimerLabel.getComponent(cc.Label).string = this.timer.toString();
        if (this.timeUp) {
            this.GameOver();
        }
    };
    GameManagerS5.prototype.GameOver = function () {
        var _this = this;
        cc.audioEngine.stopMusic();
        this.scheduleOnce(function () {
            cc.audioEngine.playEffect(_this.GameOverSound, false);
        }, 0.5);
        this.GameoverBG.active = true;
        var scoreboard = this.GameoverBG.getChildByName("Score");
        var scorepoint = scoreboard.getChildByName("Scorepoint").getComponent(cc.Label);
        var coin = [0, 0, 0, 0, 0];
        var _loop_1 = function (i) {
            firebase.database().ref("player_data/player" + i + "/game2_state/money").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    coin[i - 1] = snapshot.val();
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        this.scheduleOnce(function () {
            scoreboard.active = true;
            var str = "\n";
            str += coin[0].toString() + "  B" + "\n";
            str += coin[1].toString() + "  B" + "\n";
            str += coin[2].toString() + "  B" + "\n";
            str += coin[3].toString() + "  B" + "\n";
            str += coin[4].toString() + "  B";
            scorepoint.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(function () {
            cc.director.loadScene("GameEnd");
        }, 10);
    };
    //
    GameManagerS5.prototype.update = function (dt) {
        var handle = this;
        if (this.counting < 5) {
            var _loop_2 = function (i) {
                if (cc.find("Canvas/PlayerContainer/player" + i).active == true) {
                    return "continue";
                }
                else {
                    firebase.database().ref("player_data/player" + i).once('value', function (snapshot) {
                        firebase.database().ref("GameResult").once('value', function (childshot) {
                            if (snapshot.val() != null) {
                                var new_money_1 = 0;
                                childshot.forEach(function (element) {
                                    if (element.val() != null) {
                                        if (i == 1) {
                                            new_money_1 += element.val().player1 / 10;
                                        }
                                        else if (i == 2) {
                                            new_money_1 += element.val().player2 / 10;
                                        }
                                        else if (i == 3) {
                                            new_money_1 += element.val().player3 / 10;
                                        }
                                        else if (i == 4) {
                                            new_money_1 += element.val().player4 / 10;
                                        }
                                        else if (i == 5) {
                                            new_money_1 += element.val().player5 / 10;
                                        }
                                    }
                                });
                                handle.counting += 1;
                                handle.player_array.push(i);
                                cc.find("Canvas/PlayerContainer/player" + i).active = true;
                                firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                                firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                                firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                                firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                                firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: 240 });
                                firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -48 });
                                firebase.database().ref("player_data/player" + i + "/game2_state").set({ money: new_money_1, paper: 2, scissor: 2, stone: 2, fighting: "false", opponent: "null", card: "null", challenged: "false" });
                            }
                        });
                    });
                }
            };
            for (var i = 1; i <= 5; i++) {
                _loop_2(i);
            }
        }
        if (this.reset) {
            firebase.database().ref("player_data/" + this.current_user_node + "/game2_state").update({ card: "null", challenged: "false", fighting: "false", opponent: "null" });
            this.reset = false;
        }
        if (!this.fighting && !handle.Mine_info_choice.active && !handle.opponent_info_choice.active && !handle.battle_field.active) {
            firebase.database().ref("player_data/" + this.current_user_node + "/game2_state").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().fighting == 'true') {
                        handle.fighting = true;
                        handle.Mine_info_choice.active = true;
                        handle.Mine_info_choice.getComponent(Mine_info_choice_1.default).opponent = handle.opponent_user_node;
                        handle.Mine_info_choice.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = String(snapshot.val().paper);
                        handle.Mine_info_choice.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = String(snapshot.val().scissor);
                        handle.Mine_info_choice.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = String(snapshot.val().stone);
                        handle.opponent_info_choice.active = true;
                        handle.opponent_info_choice.getChildByName("title").getComponent(cc.RichText).string = snapshot.val().opponent;
                        handle.battle_field.active = true;
                        handle.battle_field.getComponent(battle_field_1.default).me_ready = false;
                        handle.battle_field.getComponent(battle_field_1.default).opponent_ready = false;
                        handle.battle_field.getComponent(battle_field_1.default).opponent = snapshot.val().opponent;
                        handle.opponent_user_node = snapshot.val().opponent;
                        if (handle.character == "erudite") {
                            firebase.database().ref("player_data/" + snapshot.val().opponent + "/game2_state").once('value', function (childshot) {
                                var paper = childshot.val().paper;
                                var scissor = childshot.val().scissor;
                                var stone = childshot.val().stone;
                                var total = paper + scissor + stone;
                                handle.opponent_info_choice.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = (paper / total).toFixed(2) + "%";
                                handle.opponent_info_choice.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = (scissor / total).toFixed(2) + "%";
                                handle.opponent_info_choice.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = (stone / total).toFixed(2) + "%";
                            });
                        }
                        else {
                            handle.opponent_info_choice.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = "??";
                            handle.opponent_info_choice.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = "??";
                            handle.opponent_info_choice.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = "??";
                        }
                    }
                }
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "loadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "GameoverBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "TimerLabel", void 0);
    __decorate([
        property()
    ], GameManagerS5.prototype, "GameTime", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "opponent_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "Mine_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "battle_field", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManagerS5.prototype, "BGM", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS5.prototype, "ScoreSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS5.prototype, "GameOverSound", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "panel", void 0);
    GameManagerS5 = __decorate([
        ccclass
    ], GameManagerS5);
    return GameManagerS5;
}(cc.Component));
exports.default = GameManagerS5;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlclxcR2FtZU1hbmFnZXJTNS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixnRUFBbUQ7QUFDbkQsNERBQXVEO0FBQ3ZELG9FQUErRDtBQUl6RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUk1QztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQTBPQztRQXZPRyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGNBQVEsR0FBVyxHQUFHLENBQUM7UUFHdkIsMEJBQW9CLEdBQVksSUFBSSxDQUFDO1FBRXJDLHNCQUFnQixHQUFZLElBQUksQ0FBQztRQUVqQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixTQUFHLEdBQWlCLElBQUksQ0FBQztRQUV6QixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFFaEMsbUJBQWEsR0FBaUIsSUFBSSxDQUFDO1FBR25DLFdBQUssR0FBWSxJQUFJLENBQUM7UUFFZCxtQkFBYSxHQUFzQixJQUFJLENBQUM7UUFDeEMsVUFBSSxHQUFHLEtBQUssQ0FBQztRQUNyQixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2Isa0JBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFJN0IsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixXQUFLLEdBQUcsS0FBSyxDQUFDO1FBRWQsc0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBR2pCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsWUFBTSxHQUFZLEtBQUssQ0FBQzs7SUF5THBDLENBQUM7SUF0TEcsOEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV6QyxzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDM0MsSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEVBQUU7SUFDTixDQUFDO0lBRUQsNkJBQUssR0FBTDtRQUFBLGlCQTJCQztRQXpCRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDN0IsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyx3QkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMvRSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsd0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDL0UsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQy9FLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyx3QkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMvRSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsd0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDL0UsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLEtBQUksQ0FBQyxZQUFZO2dCQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzlFLElBQUksS0FBSSxDQUFDLFlBQVk7Z0JBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsd0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDOUUsSUFBSSxLQUFJLENBQUMsWUFBWTtnQkFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyx3QkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUM5RSxJQUFJLEtBQUksQ0FBQyxZQUFZO2dCQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsWUFB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Q0o7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQXRPRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNRO0lBRTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1M7SUFFM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDUztJQUczQjtRQURDLFFBQVEsRUFBRTttREFDWTtJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytEQUNtQjtJQUVyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJEQUNlO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1c7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDOzhDQUNSO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7cURBQ1M7SUFFaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3REFDWTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNJO0lBMUJMLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EwT2pDO0lBQUQsb0JBQUM7Q0ExT0QsQUEwT0MsQ0ExTzBDLEVBQUUsQ0FBQyxTQUFTLEdBME90RDtrQkExT29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL0dhbWU1T2JqZWN0L3NwZWNpYWxfcGxheWVyXCI7XHJcbmltcG9ydCBiYXR0bGVfZmllbGQgZnJvbSBcIi4uL0dhbWU1T2JqZWN0L2JhdHRsZV9maWVsZFwiO1xyXG5pbXBvcnQgTWluZV9pbmZvX2Nob2ljZSBmcm9tIFwiLi4vR2FtZTVPYmplY3QvTWluZV9pbmZvX2Nob2ljZVwiO1xyXG5pbXBvcnQgcGFuZWxfaW5mbyBmcm9tIFwiLi4vR2FtZTVPYmplY3QvcGFuZWxfaW5mb1wiO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyUzUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbG9hZGluZ0JHOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgR2FtZW92ZXJCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRpbWVyTGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBHYW1lVGltZTogbnVtYmVyID0gMTIwO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgb3Bwb25lbnRfaW5mb19jaG9pY2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBNaW5lX2luZm9fY2hvaWNlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmF0dGxlX2ZpZWxkOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkF1ZGlvQ2xpcCB9KVxyXG4gICAgQkdNOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIFNjb3JlU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgR2FtZU92ZXJTb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHBoeXNpY01hbmFnZXI6IGNjLlBoeXNpY3NNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgZmxhZyA9IGZhbHNlO1xyXG4gICAgY291bnRpbmcgPSAwO1xyXG4gICAgcGxheWVyX2FycmF5ID0gW107XHJcblxyXG4gICAgcGxheWVyX25vZGUxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlMjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcGxheWVyX25vZGU0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlNTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgY3VycmVudF91c2VyX25vZGU7XHJcbiAgICBvcHBvbmVudF91c2VyX25vZGU7XHJcbiAgICBmaWdodGluZyA9IGZhbHNlO1xyXG5cclxuICAgIHJlc2V0ID0gZmFsc2U7XHJcblxyXG4gICAgc2VsZWN0X2NoYXJhY3RlciA9IGZhbHNlO1xyXG4gICAgY2hhcmFjdGVyO1xyXG5cclxuICAgIHByaXZhdGUgdGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHRpbWVVcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAwKTtcclxuXHJcbiAgICAgICAgLy8g5q+P5YCLcGxheWVyIG5vZGXliJ3lp4vljJbkvY3nva7jgIJcclxuICAgICAgICB2YXIgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAgICAgdmFyIHBlcm1pdGVkX3VzZXI7XHJcbiAgICAgICAgdmFyIGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgLy9cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL2Nob29zZSB0aGUgaW5pdGlhbCBnaG9zdFxyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGUxID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMVwiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlMiA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjJcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTMgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIzXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGU0ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNFwiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlNSA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjVcIik7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUxKSB0aGlzLnBsYXllcl9ub2RlMS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMikgdGhpcy5wbGF5ZXJfbm9kZTIuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTMpIHRoaXMucGxheWVyX25vZGUzLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGU0KSB0aGlzLnBsYXllcl9ub2RlNC5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNSkgdGhpcy5wbGF5ZXJfbm9kZTUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTEpIHRoaXMucGxheWVyX25vZGUxLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUyKSB0aGlzLnBsYXllcl9ub2RlMi5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTQpIHRoaXMucGxheWVyX25vZGU0LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGU1KSB0aGlzLnBsYXllcl9ub2RlNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTSwgdHJ1ZSlcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoMC41KVxyXG4gICAgICAgICAgICAvLyDplovlp4voqIjmmYJcclxuICAgICAgICAgICAgdGhpcy5UaW1lclN0YXJ0KCk7XHJcbiAgICAgICAgfSwgMi41KTtcclxuXHJcbiAgICB9XHJcbiAgICAvLyBnZXRSYW5kb21JbnQobWF4KSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyB0aW1lclxyXG4gICAgVGltZXJTdGFydCgpIHtcclxuICAgICAgICB0aGlzLnRpbWVyID0gdGhpcy5HYW1lVGltZTtcclxuICAgICAgICB0aGlzLlRpbWVyTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkdhbWVUaW1lLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLlVwZGF0ZVRpbWVyLCAxKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZVRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVVcCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVyID4gMCkgdGhpcy50aW1lciArPSAtMTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnRpbWVyID09IDApIHRoaXMudGltZVVwID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlRpbWVyTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnRpbWVyLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVVcCkge1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVPdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZU92ZXIoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLkdhbWVPdmVyU291bmQsIGZhbHNlKTtcclxuICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuR2FtZW92ZXJCRy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzY29yZWJvYXJkID0gdGhpcy5HYW1lb3ZlckJHLmdldENoaWxkQnlOYW1lKFwiU2NvcmVcIik7XHJcbiAgICAgICAgbGV0IHNjb3JlcG9pbnQgPSBzY29yZWJvYXJkLmdldENoaWxkQnlOYW1lKFwiU2NvcmVwb2ludFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldCBjb2luID0gWzAsMCwwLDAsMF1cclxuICAgICAgICBmb3IobGV0IGk9MTtpPD01O2krKyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L2dhbWUyX3N0YXRlL21vbmV5YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3Qpe1xyXG4gICAgICAgICAgICAgICAgaWYoc25hcHNob3QudmFsKCkhPW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvaW5baS0xXSA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBzY29yZWJvYXJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gY29pblswXS50b1N0cmluZygpICsgXCIgIEJcIiArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBjb2luWzFdLnRvU3RyaW5nKCkgKyBcIiAgQlwiICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IGNvaW5bMl0udG9TdHJpbmcoKSArIFwiICBCXCIgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gY29pblszXS50b1N0cmluZygpICsgXCIgIEJcIiArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBjb2luWzRdLnRvU3RyaW5nKCkgKyBcIiAgQlwiO1xyXG4gICAgICAgICAgICBzY29yZXBvaW50LnN0cmluZyA9IHN0cjtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLlNjb3JlU291bmQsIGZhbHNlKTsgICAgICAgICAgICBcclxuICAgICAgICB9LCAzKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVFbmRcIik7XHJcbiAgICAgICAgfSwgMTApO1xyXG4gICAgfVxyXG4gICAgLy9cclxuXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMuY291bnRpbmcgPCA1KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lUmVzdWx0YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoY2hpbGRzaG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdfbW9uZXkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkc2hvdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyMSAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyMiAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyMyAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyNCAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyNSAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmNvdW50aW5nICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnBsYXllcl9hcnJheS5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogMjQwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvWWApLnNldCh7IHk6IC00OCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L2dhbWUyX3N0YXRlYCkuc2V0KHsgbW9uZXk6IG5ld19tb25leSwgcGFwZXI6IDIsIHNjaXNzb3I6IDIsIHN0b25lOiAyLCBmaWdodGluZzogXCJmYWxzZVwiLCBvcHBvbmVudDogXCJudWxsXCIsIGNhcmQ6IFwibnVsbFwiLCBjaGFsbGVuZ2VkOiBcImZhbHNlXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yZXNldCkge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcl9ub2RlfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IGNhcmQ6IFwibnVsbFwiLCBjaGFsbGVuZ2VkOiBcImZhbHNlXCIsIGZpZ2h0aW5nOiBcImZhbHNlXCIsIG9wcG9uZW50OiBcIm51bGxcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuZmlnaHRpbmcgJiYgIWhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmFjdGl2ZSAmJiAhaGFuZGxlLm9wcG9uZW50X2luZm9fY2hvaWNlLmFjdGl2ZSAmJiAhaGFuZGxlLmJhdHRsZV9maWVsZC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJfbm9kZX0vZ2FtZTJfc3RhdGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkuZmlnaHRpbmcgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5maWdodGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmdldENvbXBvbmVudChNaW5lX2luZm9fY2hvaWNlKS5vcHBvbmVudCA9IGhhbmRsZS5vcHBvbmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwicGFwZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkX251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFN0cmluZyhzbmFwc2hvdC52YWwoKS5wYXBlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwic2Npc3NvclwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gU3RyaW5nKHNuYXBzaG90LnZhbCgpLnNjaXNzb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUuTWluZV9pbmZvX2Nob2ljZS5nZXRDaGlsZEJ5TmFtZShcInN0b25lXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBTdHJpbmcoc25hcHNob3QudmFsKCkuc3RvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBzbmFwc2hvdC52YWwoKS5vcHBvbmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmJhdHRsZV9maWVsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUuYmF0dGxlX2ZpZWxkLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLm1lX3JlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5iYXR0bGVfZmllbGQuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkub3Bwb25lbnRfcmVhZHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmJhdHRsZV9maWVsZC5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5vcHBvbmVudCA9IHNuYXBzaG90LnZhbCgpLm9wcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfdXNlcl9ub2RlID0gc25hcHNob3QudmFsKCkub3Bwb25lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGUuY2hhcmFjdGVyID09IFwiZXJ1ZGl0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtzbmFwc2hvdC52YWwoKS5vcHBvbmVudH0vZ2FtZTJfc3RhdGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChjaGlsZHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFwZXIgPSBjaGlsZHNob3QudmFsKCkucGFwZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjaXNzb3IgPSBjaGlsZHNob3QudmFsKCkuc2Npc3NvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RvbmUgPSBjaGlsZHNob3QudmFsKCkuc3RvbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvdGFsID0gcGFwZXIgKyBzY2lzc29yICsgc3RvbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwicGFwZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkX251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGAkeyhwYXBlciAvIHRvdGFsKS50b0ZpeGVkKDIpfSVgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwic2Npc3NvclwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7KHNjaXNzb3IgLyB0b3RhbCkudG9GaXhlZCgyKX0lYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5vcHBvbmVudF9pbmZvX2Nob2ljZS5nZXRDaGlsZEJ5TmFtZShcInN0b25lXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgJHsoc3RvbmUgLyB0b3RhbCkudG9GaXhlZCgyKX0lYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5vcHBvbmVudF9pbmZvX2Nob2ljZS5nZXRDaGlsZEJ5TmFtZShcInBhcGVyXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIj8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuZ2V0Q2hpbGRCeU5hbWUoXCJzY2lzc29yXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIj8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuZ2V0Q2hpbGRCeU5hbWUoXCJzdG9uZVwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCI/P1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager/GameManagerS4.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '427d7LXlGREOaRzwxYoAibI', 'GameManagerS4');
// Script/GameManager/GameManagerS4.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Player_1 = require("../Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS4 = /** @class */ (function (_super) {
    __extends(GameManagerS4, _super);
    function GameManagerS4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.player_node1 = null;
        _this.player_node2 = null;
        _this.player_node3 = null;
        _this.player_node4 = null;
        _this.player_node5 = null;
        _this.physicManager = null;
        return _this;
    }
    GameManagerS4.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
    };
    GameManagerS4.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        // 一開始所有玩家都不能動
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1)
            this.player_node1.getComponent(Player_1.default).moveable = false;
        if (this.player_node2)
            this.player_node2.getComponent(Player_1.default).moveable = false;
        if (this.player_node3)
            this.player_node3.getComponent(Player_1.default).moveable = false;
        if (this.player_node4)
            this.player_node4.getComponent(Player_1.default).moveable = false;
        if (this.player_node5)
            this.player_node5.getComponent(Player_1.default).moveable = false;
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (_this.player_node1)
                _this.player_node1.getComponent(Player_1.default).moveable = true;
            if (_this.player_node2)
                _this.player_node2.getComponent(Player_1.default).moveable = true;
            if (_this.player_node3)
                _this.player_node3.getComponent(Player_1.default).moveable = true;
            if (_this.player_node4)
                _this.player_node4.getComponent(Player_1.default).moveable = true;
            if (_this.player_node5)
                _this.player_node5.getComponent(Player_1.default).moveable = true;
        }, 2.5);
        this.Init_player();
    };
    // update (dt) {}
    GameManagerS4.prototype.Init_player = function () {
        var handle = this;
        var _loop_1 = function (i) {
            firebase.database().ref("player_data/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: -656 });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -16 });
                }
            });
        };
        // initialize players        
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    __decorate([
        property(cc.Node)
    ], GameManagerS4.prototype, "loadingBG", void 0);
    GameManagerS4 = __decorate([
        ccclass
    ], GameManagerS4);
    return GameManagerS4;
}(cc.Component));
exports.default = GameManagerS4;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlclxcR2FtZU1hbmFnZXJTNC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixvQ0FBK0I7QUFFekIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFJMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUFrRUM7UUE5REcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUVyQixtQkFBYSxHQUFzQixJQUFJLENBQUM7O0lBc0RwRCxDQUFDO0lBcERHLDhCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFBQSxpQkF1QkM7UUFyQkcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzdCLGNBQWM7UUFDZCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDL0UsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQy9FLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMvRSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDL0UsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQy9FLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxLQUFJLENBQUMsWUFBWTtnQkFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZ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ZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9QbGF5ZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFuYWdlclM0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsb2FkaW5nQkc6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHBsYXllcl9ub2RlMTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcGxheWVyX25vZGUzOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlNDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgcGh5c2ljTWFuYWdlcjogY2MuUGh5c2ljc01hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8g5LiA6ZaL5aeL5omA5pyJ546p5a626YO95LiN6IO95YuVXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTEgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIxXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGUyID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMlwiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlMyA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjNcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTQgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXI0XCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGU1ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNVwiKTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTEpIHRoaXMucGxheWVyX25vZGUxLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUyKSB0aGlzLnBsYXllcl9ub2RlMi5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTQpIHRoaXMucGxheWVyX25vZGU0LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGU1KSB0aGlzLnBsYXllcl9ub2RlNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMSkgdGhpcy5wbGF5ZXJfbm9kZTEuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTIpIHRoaXMucGxheWVyX25vZGUyLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUzKSB0aGlzLnBsYXllcl9ub2RlMy5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNCkgdGhpcy5wbGF5ZXJfbm9kZTQuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTUpIHRoaXMucGxheWVyX25vZGU1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICB9LCAyLjUpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5Jbml0X3BsYXllcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcblxyXG4gICAgXHJcbiAgICBJbml0X3BsYXllcigpe1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgcGxheWVycyAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHsgLy8g5aaC5p6c546p5a625a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogLTY1NiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAtMTYgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW5pdGlhbCBFbmRcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager/GameManagerS2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6c5315gzDRHgb+CuJr61tW8', 'GameManagerS2');
// Script/GameManager/GameManagerS2.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var PlayerGhost_1 = require("../Game2Object/PlayerGhost");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS2 = /** @class */ (function (_super) {
    __extends(GameManagerS2, _super);
    function GameManagerS2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.SpaceBG = null;
        _this.GameoverBG = null;
        _this.TimerLabel = null;
        _this.GhostLabel = null;
        _this.StartText = null;
        _this.BGM1 = null;
        _this.BGM2 = null;
        _this.ScoreSound = null;
        _this.GameOverSound = null;
        _this.becomeGhostEffect = null;
        _this.GameTime = 120;
        _this.GhostSpeed = 200;
        _this.PlayerSpeed = 100;
        _this.physicManager = null;
        _this.counting = 0;
        _this.player_array = [];
        _this.player_node1 = null;
        _this.player_node2 = null;
        _this.player_node3 = null;
        _this.player_node4 = null;
        _this.player_node5 = null;
        _this.current_user_number = 0;
        _this.P_state = ["", "player", "player", "player", "player", "player"];
        _this.P_prevstate = ["", "player", "player", "player", "player", "player"];
        _this.cooldown = false;
        _this.timer = 0;
        _this.timeUp = false;
        return _this;
    }
    GameManagerS2.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        var uid = firebase.auth().currentUser.uid;
        var t = this;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            t.current_user_number = snapshot.val().player_number;
        });
    };
    GameManagerS2.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        // 一開始所有玩家都不能動
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1)
            this.player_node1.getComponent(PlayerGhost_1.default).moveable = false;
        if (this.player_node2)
            this.player_node2.getComponent(PlayerGhost_1.default).moveable = false;
        if (this.player_node3)
            this.player_node3.getComponent(PlayerGhost_1.default).moveable = false;
        if (this.player_node4)
            this.player_node4.getComponent(PlayerGhost_1.default).moveable = false;
        if (this.player_node5)
            this.player_node5.getComponent(PlayerGhost_1.default).moveable = false;
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (_this.player_node1)
                _this.player_node1.getComponent(PlayerGhost_1.default).moveable = true;
            if (_this.player_node2)
                _this.player_node2.getComponent(PlayerGhost_1.default).moveable = true;
            if (_this.player_node3)
                _this.player_node3.getComponent(PlayerGhost_1.default).moveable = true;
            if (_this.player_node4)
                _this.player_node4.getComponent(PlayerGhost_1.default).moveable = true;
            if (_this.player_node5)
                _this.player_node5.getComponent(PlayerGhost_1.default).moveable = true;
            _this.TimerStart();
            _this.StartText.active = true;
            var action = cc.sequence(cc.fadeOut(0.5), cc.fadeIn(0.5), cc.fadeOut(0.5), cc.fadeIn(0.5), cc.fadeOut(0.5));
            _this.StartText.runAction(action);
            cc.audioEngine.playMusic(_this.BGM2, true);
            cc.audioEngine.setMusicVolume(3);
        }, 2.5);
        this.Init_player();
        // 五秒後選出鬼
        this.scheduleOnce(function () {
            // this.choose_ghost(this.getRandomInt(this.player_array.length)); // 每個人開遊戲會random不一樣，所以這方法不行
            _this.choose_ghost(1, -1);
            _this.schedule(_this.GetPlayerState, 0.3);
            _this.StartText.active = false;
            if (1 == _this.current_user_number) {
                cc.audioEngine.playMusic(_this.BGM1, true);
                cc.audioEngine.setMusicVolume(1);
            }
        }, 5);
        this.scheduleOnce(function () {
            _this.schedule(_this.UpdateGroup, 0.3);
        }, 8);
        // SpaceBG Action
        var action;
        action = cc.repeatForever(cc.rotateBy(100, 360));
        this.SpaceBG.runAction(action);
    };
    GameManagerS2.prototype.choose_ghost = function (Tobeghost_id, Peopleback_id) {
        console.log('Who fuck? ID:', Tobeghost_id);
        console.log("Player ARR:", this.player_array.length, this.player_array);
        //choose from player array
        var ghost_id = Tobeghost_id; // initially set player 1 to be ghost
        for (var i = 1; i < this.player_array.length + 1; i++) {
            if (i == ghost_id) {
                // firebase
                firebase.database().ref("game2/player" + i).set({ type: "ghost" });
                // Make a ghost
                var Gnode = cc.find("Canvas/PlayerContainer/player" + i);
                var ghostBornEffect = cc.instantiate(this.becomeGhostEffect);
                cc.find("Canvas/PlayerContainer/player" + i + "/Label").getComponent(cc.Label).string = "ghost";
                Gnode.setPosition(-176, 752);
                Gnode.group = 'ghost';
                Gnode.active = false;
                Gnode.active = true;
                Gnode.setPosition(-176, 752);
                Gnode.getComponent(PlayerGhost_1.default).moveable = false;
                Gnode.getComponent(PlayerGhost_1.default).playerSpeed = this.GhostSpeed;
                // play particle effect
                Gnode.parent.addChild(ghostBornEffect);
                ghostBornEffect.setPosition(Gnode.position);
                var action = void 0;
                var sequence1 = cc.sequence(cc.fadeTo(0.25, 120), cc.fadeIn(0.25), cc.scaleBy(0.1, 1.1));
                action = cc.repeat(sequence1, 5);
                Gnode.runAction(action);
                this.scheduleOnce(function () {
                    Gnode.getComponent(PlayerGhost_1.default).moveable = true;
                }, 3);
                // make ghost end
            }
            else if (i == Peopleback_id) {
                firebase.database().ref("game2/player" + i).set({ type: "player" });
                cc.find("Canvas/PlayerContainer/player" + i + "/Label").getComponent(cc.Label).string = "player";
                var Pnode = cc.find("Canvas/PlayerContainer/player" + i);
                Pnode.setPosition(240, -48);
                Pnode.group = 'player';
                Pnode.active = false;
                Pnode.active = true;
                Pnode.getComponent(PlayerGhost_1.default).moveable = false;
                Pnode.getComponent(PlayerGhost_1.default).playerSpeed = this.PlayerSpeed;
                Pnode.runAction(cc.scaleTo(0.1, 1));
                var action = void 0;
                var sequence1 = cc.sequence(cc.fadeTo(0.25, 120), cc.fadeIn(0.25));
                action = cc.repeat(sequence1, 5);
                Pnode.runAction(action);
                this.scheduleOnce(function () {
                    Pnode.getComponent(PlayerGhost_1.default).moveable = true;
                }, 2.5);
            }
            else {
                firebase.database().ref("game2/player" + i).set({ type: "player" });
                cc.find("Canvas/PlayerContainer/player" + i + "/Label").getComponent(cc.Label).string = "player";
                var Nnode = cc.find("Canvas/PlayerContainer/player" + i);
                Nnode.group = 'player';
                Nnode.active = false;
                Nnode.active = true;
                Nnode.getComponent(PlayerGhost_1.default).playerSpeed = this.PlayerSpeed;
                Nnode.runAction(cc.scaleTo(0.5, 1));
            }
        }
    };
    // getRandomInt(max: number) {
    //     return Math.ceil(Math.random() * max);
    // }
    // update(dt) {
    // }
    GameManagerS2.prototype.Init_player = function () {
        var handle = this;
        var _loop_1 = function (i) {
            firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    handle.player_array.push(i);
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: 240 });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -48 });
                }
            });
        };
        // initialize players        
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    // timer
    GameManagerS2.prototype.TimerStart = function () {
        this.timer = this.GameTime;
        this.TimerLabel.getComponent(cc.Label).string = this.GameTime.toString();
        this.schedule(this.UpdateTimer, 1);
    };
    GameManagerS2.prototype.UpdateTimer = function () {
        if (this.timeUp)
            return;
        if (this.timer > 0)
            this.timer += -1;
        else if (this.timer == 0)
            this.timeUp = true;
        this.TimerLabel.getComponent(cc.Label).string = this.timer.toString();
        if (this.timeUp) {
            this.GameOver();
        }
    };
    GameManagerS2.prototype.GameOver = function () {
        var _this = this;
        cc.audioEngine.stopMusic();
        this.scheduleOnce(function () {
            cc.audioEngine.playEffect(_this.GameOverSound, false);
        }, 0.5);
        this.GameoverBG.active = true;
        var scoreboard = this.GameoverBG.getChildByName("Score");
        var scorepoint = scoreboard.getChildByName("Scorepoint").getComponent(cc.Label);
        var point = scoreboard.getChildByName("Point").getComponent(cc.Label);
        var P_state = this.P_state;
        this.scheduleOnce(function () {
            scoreboard.active = true;
            var str = "\n";
            str += P_state[1] + "\n";
            str += P_state[2] + "\n";
            str += P_state[3] + "\n";
            str += P_state[4] + "\n";
            str += P_state[5];
            scorepoint.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(function () {
            var arr2 = [];
            for (var i = 1; i <= 5; i++) {
                if (P_state[i] == 'player') {
                    arr2.push(30);
                }
                else if (P_state[i] == 'ghost') {
                    arr2.push(0);
                }
            }
            var str = "";
            for (var i = 0; i < 5; i++) {
                str += "\n+ " + arr2[i].toString();
            }
            point.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
            // firebase
            firebase.database().ref("GameResult/Round2").set({
                player1: arr2[0],
                player2: arr2[1],
                player3: arr2[2],
                player4: arr2[3],
                player5: arr2[4],
            });
        }, 5);
        this.scheduleOnce(function () {
            cc.director.loadScene("GameStage4");
        }, 10);
    };
    GameManagerS2.prototype.GetPlayerState = function () {
        // console.log("Get player state!");
        // 看每個玩家的身分。
        var t = this;
        var _loop_2 = function (i) {
            firebase.database().ref("game2/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    // console.log("player",i, snapshot.val().type);
                    t.P_prevstate[i] = t.P_state[i];
                    t.P_state[i] = snapshot.val().type;
                    if (snapshot.val().type == 'ghost') {
                        t.GhostLabel.getComponent(cc.Label).string = "P" + i.toString();
                    }
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_2(i);
        }
    };
    GameManagerS2.prototype.UpdateGroup = function () {
        var _this = this;
        // 根據身分更新。
        var t = this;
        var ghost_id = -1, back_id = -1;
        var change = false;
        for (var i = 1; i <= 5; i++) {
            if (t.P_prevstate[i] == "player" && t.P_state[i] == "ghost") { // 變成鬼
                console.log("player", i, "become ghost!!!!!!!!!");
                ghost_id = i;
                change = true;
            }
            else if (t.P_prevstate[i] == "ghost" && t.P_state[i] == "player") { // 變回人
                console.log("player", i, "back to player!!!!!!!!!");
                back_id = i;
                change = true;
            }
        }
        if (change && !this.cooldown) {
            this.cooldown = true;
            this.choose_ghost(ghost_id, back_id);
            this.scheduleOnce(function () {
                _this.cooldown = false;
            }, 3);
            // 鬼BGM
            if (ghost_id == this.current_user_number) {
                cc.audioEngine.stopMusic();
                cc.audioEngine.playMusic(this.BGM1, true);
                cc.audioEngine.setMusicVolume(1);
            }
            else if (back_id == this.current_user_number) {
                cc.audioEngine.stopMusic();
                cc.audioEngine.playMusic(this.BGM2, true);
                cc.audioEngine.setMusicVolume(3);
            }
        }
        // console.log(t.P_prevstate, t.P_state);
    };
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "loadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "SpaceBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "GameoverBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "TimerLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "GhostLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "StartText", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS2.prototype, "BGM1", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS2.prototype, "BGM2", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS2.prototype, "ScoreSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS2.prototype, "GameOverSound", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameManagerS2.prototype, "becomeGhostEffect", void 0);
    __decorate([
        property()
    ], GameManagerS2.prototype, "GameTime", void 0);
    __decorate([
        property()
    ], GameManagerS2.prototype, "GhostSpeed", void 0);
    __decorate([
        property()
    ], GameManagerS2.prototype, "PlayerSpeed", void 0);
    GameManagerS2 = __decorate([
        ccclass
    ], GameManagerS2);
    return GameManagerS2;
}(cc.Component));
exports.default = GameManagerS2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlclxcR2FtZU1hbmFnZXJTMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiwwREFBcUQ7QUFDL0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUE4VUM7UUEzVUcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBRXhCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFMUIsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFMUIsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDO1FBRWhDLG1CQUFhLEdBQWlCLElBQUksQ0FBQztRQUduQyx1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFHcEMsY0FBUSxHQUFXLEdBQUcsQ0FBQztRQUV2QixnQkFBVSxHQUFXLEdBQUcsQ0FBQztRQUV6QixpQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUVsQixtQkFBYSxHQUFzQixJQUFJLENBQUM7UUFDaEQsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGtCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWxCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRXJCLHlCQUFtQixHQUFXLENBQUMsQ0FBQztRQUVoQyxhQUFPLEdBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNFLGlCQUFXLEdBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRS9FLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixZQUFNLEdBQVksS0FBSyxDQUFDOztJQTBScEMsQ0FBQztJQXRSRyw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNiLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBYSxHQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUN4RSxDQUFDLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQUEsaUJBc0RDO1FBbkRHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM3QixjQUFjO1FBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3BGLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNwRixJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDcEYsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3BGLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNwRixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksS0FBSSxDQUFDLFlBQVk7Z0JBQUUsS0FBSSxDQUFDLFlBQVks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ZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXJHaG9zdCBmcm9tIFwiLi4vR2FtZTJPYmplY3QvUGxheWVyR2hvc3RcIjtcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1hbmFnZXJTMiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbG9hZGluZ0JHOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU3BhY2VCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEdhbWVvdmVyQkc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUaW1lckxhYmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgR2hvc3RMYWJlbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFN0YXJ0VGV4dDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIEJHTTE6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgQkdNMjogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBTY29yZVNvdW5kOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIEdhbWVPdmVyU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJlY29tZUdob3N0RWZmZWN0OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBHYW1lVGltZTogbnVtYmVyID0gMTIwO1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIEdob3N0U3BlZWQ6IG51bWJlciA9IDIwMDtcclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBQbGF5ZXJTcGVlZDogbnVtYmVyID0gMTAwO1xyXG5cclxuICAgIHByaXZhdGUgcGh5c2ljTWFuYWdlcjogY2MuUGh5c2ljc01hbmFnZXIgPSBudWxsO1xyXG4gICAgY291bnRpbmcgPSAwO1xyXG4gICAgcGxheWVyX2FycmF5ID0gW107XHJcblxyXG4gICAgcGxheWVyX25vZGUxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlMjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcGxheWVyX25vZGU0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlNTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgUF9zdGF0ZTogc3RyaW5nW10gPSBbXCJcIiwgXCJwbGF5ZXJcIiwgXCJwbGF5ZXJcIiwgXCJwbGF5ZXJcIiwgXCJwbGF5ZXJcIiwgXCJwbGF5ZXJcIl07XHJcbiAgICBwcml2YXRlIFBfcHJldnN0YXRlOiBzdHJpbmdbXSA9IFtcIlwiLCBcInBsYXllclwiLCBcInBsYXllclwiLCBcInBsYXllclwiLCBcInBsYXllclwiLCBcInBsYXllclwiXTtcclxuXHJcbiAgICBwcml2YXRlIGNvb2xkb3duOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgdGltZVVwOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAwKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdWlkID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VpZH1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICB0LmN1cnJlbnRfdXNlcl9udW1iZXIgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXJfbnVtYmVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyDkuIDplovlp4vmiYDmnInnjqnlrrbpg73kuI3og73li5VcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlMSA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjFcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTIgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIyXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGUzID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyM1wiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlNCA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjRcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTUgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXI1XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMSkgdGhpcy5wbGF5ZXJfbm9kZTEuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMikgdGhpcy5wbGF5ZXJfbm9kZTIuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNCkgdGhpcy5wbGF5ZXJfbm9kZTQuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNSkgdGhpcy5wbGF5ZXJfbm9kZTUuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMSkgdGhpcy5wbGF5ZXJfbm9kZTEuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMikgdGhpcy5wbGF5ZXJfbm9kZTIuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNCkgdGhpcy5wbGF5ZXJfbm9kZTQuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNSkgdGhpcy5wbGF5ZXJfbm9kZTUuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlRpbWVyU3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRleHQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC41KSxjYy5mYWRlSW4oMC41KSxjYy5mYWRlT3V0KDAuNSksY2MuZmFkZUluKDAuNSksY2MuZmFkZU91dCgwLjUpKTtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRleHQucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTTIsIHRydWUpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSgzKTtcclxuICAgICAgICB9LCAyLjUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuSW5pdF9wbGF5ZXIoKTtcclxuXHJcbiAgICAgICAgLy8g5LqU56eS5b6M6YG45Ye66ay8XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgLy8gdGhpcy5jaG9vc2VfZ2hvc3QodGhpcy5nZXRSYW5kb21JbnQodGhpcy5wbGF5ZXJfYXJyYXkubGVuZ3RoKSk7IC8vIOavj+WAi+S6uumWi+mBiuaIsuacg3JhbmRvbeS4jeS4gOaoo++8jOaJgOS7pemAmeaWueazleS4jeihjFxyXG4gICAgICAgICAgICB0aGlzLmNob29zZV9naG9zdCgxLCAtMSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5HZXRQbGF5ZXJTdGF0ZSwgMC4zKTtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRleHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKDEgPT0gdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTTEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA1KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuVXBkYXRlR3JvdXAsIDAuMyk7XHJcbiAgICAgICAgfSwgOCk7XHJcblxyXG5cclxuICAgICAgICAvLyBTcGFjZUJHIEFjdGlvblxyXG4gICAgICAgIGxldCBhY3Rpb246Y2MuQWN0aW9uO1xyXG4gICAgICAgIGFjdGlvbiA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMTAwLDM2MCkpO1xyXG4gICAgICAgIHRoaXMuU3BhY2VCRy5ydW5BY3Rpb24oYWN0aW9uKTtcclxuXHJcbiAgICB9XHJcbiAgICBjaG9vc2VfZ2hvc3QoVG9iZWdob3N0X2lkOiBudW1iZXIsIFBlb3BsZWJhY2tfaWQ6IG51bWJlcikgeyAgLy8g6YG45a6a5LiA5Lq655W26ay844CCXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1dobyBmdWNrPyBJRDonLCBUb2JlZ2hvc3RfaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIEFSUjpcIiwgdGhpcy5wbGF5ZXJfYXJyYXkubGVuZ3RoLCB0aGlzLnBsYXllcl9hcnJheSk7XHJcbiAgICAgICAgLy9jaG9vc2UgZnJvbSBwbGF5ZXIgYXJyYXlcclxuICAgICAgICBsZXQgZ2hvc3RfaWQgPSBUb2JlZ2hvc3RfaWQ7Ly8gaW5pdGlhbGx5IHNldCBwbGF5ZXIgMSB0byBiZSBnaG9zdFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5wbGF5ZXJfYXJyYXkubGVuZ3RoKzE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBnaG9zdF9pZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lMi9wbGF5ZXIke2l9YCkuc2V0KHsgdHlwZTogXCJnaG9zdFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBhIGdob3N0XHJcbiAgICAgICAgICAgICAgICB2YXIgR25vZGUgPSBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllciR7aX1gKTtcclxuICAgICAgICAgICAgICAgIHZhciBnaG9zdEJvcm5FZmZlY3QgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJlY29tZUdob3N0RWZmZWN0KTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfS9MYWJlbGApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiZ2hvc3RcIjtcclxuICAgICAgICAgICAgICAgIEdub2RlLnNldFBvc2l0aW9uKC0xNzYsIDc1Mik7XHJcbiAgICAgICAgICAgICAgICBHbm9kZS5ncm91cCA9ICdnaG9zdCc7XHJcbiAgICAgICAgICAgICAgICBHbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIEdub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBHbm9kZS5zZXRQb3NpdGlvbigtMTc2LCA3NTIpO1xyXG4gICAgICAgICAgICAgICAgR25vZGUuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR25vZGUuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5wbGF5ZXJTcGVlZCA9IHRoaXMuR2hvc3RTcGVlZDtcclxuICAgICAgICAgICAgICAgIC8vIHBsYXkgcGFydGljbGUgZWZmZWN0XHJcbiAgICAgICAgICAgICAgICBHbm9kZS5wYXJlbnQuYWRkQ2hpbGQoZ2hvc3RCb3JuRWZmZWN0KTtcclxuICAgICAgICAgICAgICAgIGdob3N0Qm9ybkVmZmVjdC5zZXRQb3NpdGlvbihHbm9kZS5wb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlcXVlbmNlMSA9IGNjLnNlcXVlbmNlKGNjLmZhZGVUbygwLjI1LCAxMjApLCBjYy5mYWRlSW4oMC4yNSksIGNjLnNjYWxlQnkoMC4xLCAxLjEpKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IGNjLnJlcGVhdChzZXF1ZW5jZTEsIDUpO1xyXG4gICAgICAgICAgICAgICAgR25vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdub2RlLmdldENvbXBvbmVudChQbGF5ZXJHaG9zdCkubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSwgMylcclxuICAgICAgICAgICAgICAgIC8vIG1ha2UgZ2hvc3QgZW5kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihpID09IFBlb3BsZWJhY2tfaWQpe1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWUyL3BsYXllciR7aX1gKS5zZXQoeyB0eXBlOiBcInBsYXllclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9L0xhYmVsYCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJwbGF5ZXJcIjtcclxuICAgICAgICAgICAgICAgIHZhciBQbm9kZSA9IGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApO1xyXG4gICAgICAgICAgICAgICAgUG5vZGUuc2V0UG9zaXRpb24oMjQwLCAtNDgpO1xyXG4gICAgICAgICAgICAgICAgUG5vZGUuZ3JvdXAgPSAncGxheWVyJztcclxuICAgICAgICAgICAgICAgIFBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgUG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFBub2RlLmdldENvbXBvbmVudChQbGF5ZXJHaG9zdCkubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFBub2RlLmdldENvbXBvbmVudChQbGF5ZXJHaG9zdCkucGxheWVyU3BlZWQgPSB0aGlzLlBsYXllclNwZWVkO1xyXG4gICAgICAgICAgICAgICAgUG5vZGUucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4xLCAxKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VxdWVuY2UxID0gY2Muc2VxdWVuY2UoY2MuZmFkZVRvKDAuMjUsIDEyMCksIGNjLmZhZGVJbigwLjI1KSk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSBjYy5yZXBlYXQoc2VxdWVuY2UxLCA1KTtcclxuICAgICAgICAgICAgICAgIFBub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBQbm9kZS5nZXRDb21wb25lbnQoUGxheWVyR2hvc3QpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sIDIuNSlcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWUyL3BsYXllciR7aX1gKS5zZXQoeyB0eXBlOiBcInBsYXllclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9L0xhYmVsYCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJwbGF5ZXJcIjtcclxuICAgICAgICAgICAgICAgIHZhciBObm9kZSA9IGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApO1xyXG4gICAgICAgICAgICAgICAgTm5vZGUuZ3JvdXAgPSAncGxheWVyJztcclxuICAgICAgICAgICAgICAgIE5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgTm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIE5ub2RlLmdldENvbXBvbmVudChQbGF5ZXJHaG9zdCkucGxheWVyU3BlZWQgPSB0aGlzLlBsYXllclNwZWVkO1xyXG4gICAgICAgICAgICAgICAgTm5vZGUucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC41LCAxKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZ2V0UmFuZG9tSW50KG1heDogbnVtYmVyKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogbWF4KTtcclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgLy8gdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgSW5pdF9wbGF5ZXIoKXtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAvLyBpbml0aWFsaXplIHBsYXllcnMgICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyL3BsYXllciR7aX1faXNsb2dpbmApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7IC8vIOWmguaenOeOqeWutuWtmOWcqFxyXG4gICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGxheWVyX2FycmF5LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9YCkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvcHJlbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlYWJsZWApLnNldCh7IG1vdmVhYmxlOiBcInRydWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiAyNDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9ZYCkuc2V0KHsgeTogLTQ4IH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGluaXRpYWwgRW5kXHJcbiAgICB9XHJcbiAgICAvLyB0aW1lclxyXG4gICAgVGltZXJTdGFydCgpe1xyXG4gICAgICAgIHRoaXMudGltZXIgPSB0aGlzLkdhbWVUaW1lO1xyXG4gICAgICAgIHRoaXMuVGltZXJMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuR2FtZVRpbWUudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuVXBkYXRlVGltZXIsIDEpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlVGltZXIoKXtcclxuICAgICAgICBpZih0aGlzLnRpbWVVcCkgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMudGltZXIgPiAwKSB0aGlzLnRpbWVyICs9IC0xO1xyXG4gICAgICAgIGVsc2UgaWYodGhpcy50aW1lciA9PSAwKSB0aGlzLnRpbWVVcCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5UaW1lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy50aW1lci50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBpZih0aGlzLnRpbWVVcCl7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZU92ZXIoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIEdhbWVPdmVyKCl7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLkdhbWVPdmVyU291bmQsIGZhbHNlKTtcclxuICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuR2FtZW92ZXJCRy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzY29yZWJvYXJkID0gdGhpcy5HYW1lb3ZlckJHLmdldENoaWxkQnlOYW1lKFwiU2NvcmVcIik7XHJcbiAgICAgICAgbGV0IHNjb3JlcG9pbnQgPSBzY29yZWJvYXJkLmdldENoaWxkQnlOYW1lKFwiU2NvcmVwb2ludFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldCBwb2ludCA9IHNjb3JlYm9hcmQuZ2V0Q2hpbGRCeU5hbWUoXCJQb2ludFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldCBQX3N0YXRlID0gdGhpcy5QX3N0YXRlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgc2NvcmVib2FyZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IFBfc3RhdGVbMV0gKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gUF9zdGF0ZVsyXSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBQX3N0YXRlWzNdICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IFBfc3RhdGVbNF0gKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gUF9zdGF0ZVs1XTtcclxuICAgICAgICAgICAgc2NvcmVwb2ludC5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5TY29yZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgbGV0IGFycjIgPSBbXTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTE7aTw9NTtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoUF9zdGF0ZVtpXSA9PSAncGxheWVyJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyMi5wdXNoKDMwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKFBfc3RhdGVbaV0gPT0gJ2dob3N0Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyMi5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IFwiXFxuKyBcIiArIGFycjJbaV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwb2ludC5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5TY29yZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vIGZpcmViYXNlXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lUmVzdWx0L1JvdW5kMmApLnNldCh7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIxOiBhcnIyWzBdLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyMjogYXJyMlsxXSxcclxuICAgICAgICAgICAgICAgIHBsYXllcjM6IGFycjJbMl0sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXI0OiBhcnIyWzNdLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyNTogYXJyMls0XSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2U0XCIpO1xyXG4gICAgICAgIH0sIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRQbGF5ZXJTdGF0ZSgpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiR2V0IHBsYXllciBzdGF0ZSFcIik7XHJcbiAgICAgICAgLy8g55yL5q+P5YCL546p5a6255qE6Lqr5YiG44CCXHJcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD01OyBpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZTIvcGxheWVyJHtpfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicGxheWVyXCIsaSwgc25hcHNob3QudmFsKCkudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5QX3ByZXZzdGF0ZVtpXSA9IHQuUF9zdGF0ZVtpXTtcclxuICAgICAgICAgICAgICAgICAgICB0LlBfc3RhdGVbaV0gPSBzbmFwc2hvdC52YWwoKS50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNuYXBzaG90LnZhbCgpLnR5cGUgPT0gJ2dob3N0Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuR2hvc3RMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUFwiK2kudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgVXBkYXRlR3JvdXAoKXtcclxuICAgICAgICAvLyDmoLnmk5rouqvliIbmm7TmlrDjgIJcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGdob3N0X2lkID0gLTEsIGJhY2tfaWQgPSAtMTtcclxuICAgICAgICBsZXQgY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PTU7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHQuUF9wcmV2c3RhdGVbaV09PVwicGxheWVyXCIgJiYgdC5QX3N0YXRlW2ldPT1cImdob3N0XCIpeyAvLyDorormiJDprLxcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyXCIsIGksIFwiYmVjb21lIGdob3N0ISEhISEhISEhXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2hvc3RfaWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2UgaWYodC5QX3ByZXZzdGF0ZVtpXT09XCJnaG9zdFwiICYmIHQuUF9zdGF0ZVtpXT09XCJwbGF5ZXJcIil7IC8vIOiuiuWbnuS6ulxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXJcIiwgaSwgXCJiYWNrIHRvIHBsYXllciEhISEhISEhIVwiKTtcclxuICAgICAgICAgICAgICAgIGJhY2tfaWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjaGFuZ2UgJiYgIXRoaXMuY29vbGRvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5jb29sZG93biA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hvb3NlX2dob3N0KGdob3N0X2lkLCBiYWNrX2lkKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuY29vbGRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMyk7XHJcbiAgICAgICAgICAgIC8vIOmsvEJHTVxyXG4gICAgICAgICAgICBpZihnaG9zdF9pZCA9PSB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5CR00xLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDEpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihiYWNrX2lkID09IHRoaXMuY3VycmVudF91c2VyX251bWJlcil7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTTIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoMyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codC5QX3ByZXZzdGF0ZSwgdC5QX3N0YXRlKTtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager/GameManagerS1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da618deVopI84CxsiRz16Xc', 'GameManagerS1');
// Script/GameManager/GameManagerS1.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Player_1 = require("../Player");
var ChangingGround_1 = require("../Game1Object/ChangingGround");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS1 = /** @class */ (function (_super) {
    __extends(GameManagerS1, _super);
    function GameManagerS1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.CG = null;
        _this.scorepoint = null;
        _this.loadingBG = null;
        _this.GameoverBG = null;
        _this.TimerLabel = null;
        _this.GameTime = 120;
        _this.WidthPixels = 1;
        _this.HeightPixels = 10;
        _this.BGM = null;
        _this.ScoreSound = null;
        _this.GameOverSound = null;
        _this.current_user_number = 0;
        _this.player1_score = 0;
        _this.player2_score = 0;
        _this.player3_score = 0;
        _this.player4_score = 0;
        _this.player5_score = 0;
        _this.counting = 0;
        _this.physicManager = null;
        _this.timer = 0;
        _this.timeUp = false;
        return _this;
    }
    GameManagerS1.prototype.onLoad = function () {
        var _this = this;
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        // 每個player node初始化位置。
        var user = firebase.auth().currentUser.uid;
        firebase.database().ref("player_data").once('value', function (snapshot) {
            snapshot.forEach(function (player) {
                var name = player.key;
                if (name == "player1" || name == "player2" || name == "player3" || name == "player4" || name == "player5") {
                    console.log("Initial player:", name);
                    firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: 96 });
                    firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: 352 });
                }
            });
        });
        //
        var player_node_number = 0;
        firebase.database().ref("user_info/" + user).once('value', function (snapshot) {
            player_node_number = snapshot.val().player_number;
        });
        this.scheduleOnce(function () {
            _this.current_user_number = player_node_number;
            // console.log("current in S1:", this.current_user_number);
        }, 2.5);
    };
    GameManagerS1.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        var player1 = cc.find("Canvas/PlayerContainer/player1");
        var player2 = cc.find("Canvas/PlayerContainer/player2");
        var player3 = cc.find("Canvas/PlayerContainer/player3");
        var player4 = cc.find("Canvas/PlayerContainer/player4");
        var player5 = cc.find("Canvas/PlayerContainer/player5");
        if (player1)
            player1.getComponent(Player_1.default).moveable = false;
        if (player2)
            player5.getComponent(Player_1.default).moveable = false;
        if (player3)
            player5.getComponent(Player_1.default).moveable = false;
        if (player4)
            player5.getComponent(Player_1.default).moveable = false;
        if (player5)
            player5.getComponent(Player_1.default).moveable = false;
        this.Init_player();
        this.scheduleOnce(function () {
            _this.CreateCG();
        }, 1.5);
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (player1)
                player1.getComponent(Player_1.default).moveable = true;
            if (player2)
                player5.getComponent(Player_1.default).moveable = true;
            if (player3)
                player5.getComponent(Player_1.default).moveable = true;
            if (player4)
                player5.getComponent(Player_1.default).moveable = true;
            if (player5)
                player5.getComponent(Player_1.default).moveable = true;
            // 開始計時
            _this.TimerStart();
            cc.audioEngine.playMusic(_this.BGM, true);
            cc.audioEngine.setMusicVolume(0.5);
        }, 2.5);
        // firebase
        firebase.database().ref('GameOccupyLand/playerScore').set({ player1: 0, player2: 0, player3: 0, player4: 0, player5: 0 });
        this.schedule(this.UpdateScoreOnFirebase, 0.2);
    };
    GameManagerS1.prototype.update = function (dt) {
    };
    GameManagerS1.prototype.Init_player = function () {
        var handle = this;
        var _loop_1 = function (i) {
            firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: 96 });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: 352 });
                }
            });
        };
        // initialize players
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    GameManagerS1.prototype.CreateCG = function () {
        // instantiate CG
        var x, y, x_max, y_max, xpos, ypos;
        x_max = this.WidthPixels;
        y_max = this.HeightPixels;
        var CGcontainer = cc.find("Canvas/MapObjContainer");
        for (x = 0; x < x_max; x++) {
            for (y = 0; y < y_max; y++) {
                xpos = x * 32 + 16 - 1152;
                ypos = y * 32 + 16 - 800;
                // Stage1 reburn at 96,352
                if ((xpos > -64 && xpos < 256 && ypos < 512 && ypos > 192))
                    continue;
                if ((xpos == 784 && ypos == 144) || (xpos == 816 && ypos == 144) || (xpos == 784 && ypos == -272) || (xpos == 816 && ypos == -272) || (xpos == -496 && ypos == 304) ||
                    (xpos == -464 && ypos == -496) || (xpos == -496 && ypos == -496) || (xpos == -976 && ypos == 208) || (xpos == -944 && ypos == 208) || (xpos == -784 && ypos == 48) ||
                    (xpos == -752 && ypos == 48) || (xpos == -976 && ypos == -208) || (xpos == -944 && ypos == -208) || (xpos == 0 && ypos == 0) || (xpos == 0 && ypos == 0))
                    continue;
                // console.log("Create CG in (",x,",",y,").");
                var CG = cc.instantiate(this.CG);
                CG.setPosition(xpos, ypos);
                CG.getComponent(ChangingGround_1.default).gameManager = this.node;
                CGcontainer.addChild(CG);
            }
        }
    };
    // timer
    GameManagerS1.prototype.TimerStart = function () {
        this.timer = this.GameTime;
        this.TimerLabel.getComponent(cc.Label).string = this.GameTime.toString();
        this.schedule(this.UpdateTimer, 1);
    };
    GameManagerS1.prototype.UpdateTimer = function () {
        if (this.timeUp)
            return;
        if (this.timer > 0)
            this.timer += -1;
        else if (this.timer == 0)
            this.timeUp = true;
        this.TimerLabel.getComponent(cc.Label).string = this.timer.toString();
        if (this.timeUp) {
            this.GameOver();
        }
    };
    GameManagerS1.prototype.GameOver = function () {
        var _this = this;
        cc.audioEngine.stopMusic();
        this.scheduleOnce(function () {
            cc.audioEngine.playEffect(_this.GameOverSound, false);
        }, 0.5);
        this.GameoverBG.active = true;
        var scoreboard = this.GameoverBG.getChildByName("Score");
        var scorepoint = scoreboard.getChildByName("Scorepoint").getComponent(cc.Label);
        var point = scoreboard.getChildByName("Point").getComponent(cc.Label);
        var score_p1 = 0;
        var score_p2 = 0;
        var score_p3 = 0;
        var score_p4 = 0;
        var score_p5 = 0;
        firebase.database().ref('GameOccupyLand/playerScore').once('value', function (snapshot) {
            // console.log(snapshot.val().player2);
            score_p1 = snapshot.val().player1;
            score_p2 = snapshot.val().player2;
            score_p3 = snapshot.val().player3;
            score_p4 = snapshot.val().player4;
            score_p5 = snapshot.val().player5;
        });
        this.scheduleOnce(function () {
            scoreboard.active = true;
            var str = "\n";
            str += score_p1.toString() + "\n";
            str += score_p2.toString() + "\n";
            str += score_p3.toString() + "\n";
            str += score_p4.toString() + "\n";
            str += score_p5.toString();
            scorepoint.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(function () {
            var arr = [], arr2 = [];
            arr.push(score_p1);
            arr.push(score_p2);
            arr.push(score_p3);
            arr.push(score_p4);
            arr.push(score_p5);
            var cnt = 0;
            for (var i = 0; i < 5; i++) {
                cnt = 0;
                for (var j = 0; j < 5; j++) {
                    if (arr[i] < arr[j])
                        cnt++;
                }
                if (arr[i] != 0) {
                    arr2.push(80 - 20 * cnt);
                }
                else {
                    arr2.push(0);
                }
            }
            var str = "";
            for (var i = 0; i < 5; i++) {
                str += "\n+ " + arr2[i].toString();
            }
            point.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
            // firebase
            firebase.database().ref("GameResult/Round1").set({
                player1: arr2[0],
                player2: arr2[1],
                player3: arr2[2],
                player4: arr2[3],
                player5: arr2[4],
            });
        }, 5);
        this.scheduleOnce(function () {
            cc.director.loadScene("GameStage2");
        }, 10);
    };
    //
    GameManagerS1.prototype.UpdateScore = function (player, point) {
        if (player == 1 && this.current_user_number == 1) {
            this.player1_score += point;
        }
        else if (player == 2 && this.current_user_number == 2) {
            this.player2_score += point;
        }
        else if (player == 3 && this.current_user_number == 3) {
            this.player3_score += point;
        }
        else if (player == 4 && this.current_user_number == 4) {
            this.player4_score += point;
        }
        else if (player == 5 && this.current_user_number == 5) {
            this.player5_score += point;
        }
    };
    GameManagerS1.prototype.UpdateScoreOnFirebase = function () {
        var _this = this;
        var score_p1 = this.player1_score;
        var score_p2 = this.player2_score;
        var score_p3 = this.player3_score;
        var score_p4 = this.player4_score;
        var score_p5 = this.player5_score;
        var current_user_number = this.current_user_number;
        if (current_user_number == 1) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player1: score_p1
            });
        }
        else if (current_user_number == 2) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player2: score_p2
            });
        }
        else if (current_user_number == 3) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player3: score_p3,
            });
        }
        else if (current_user_number == 4) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player4: score_p4
            });
        }
        else if (current_user_number == 5) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player5: score_p5
            });
        }
        firebase.database().ref('GameOccupyLand/playerScore').once('value', function (snapshot) {
            // console.log(snapshot.val().player2);
            score_p1 = snapshot.val().player1;
            score_p2 = snapshot.val().player2;
            score_p3 = snapshot.val().player3;
            score_p4 = snapshot.val().player4;
            score_p5 = snapshot.val().player5;
        });
        this.scheduleOnce(function () {
            if (current_user_number == 1) {
                var string = "\n";
                string += _this.player1_score.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += score_p5.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
            else if (current_user_number == 2) {
                var string = "\n";
                string += score_p1.toString() + "\n";
                string += _this.player2_score.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += score_p5.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
            else if (current_user_number == 3) {
                var string = "\n";
                string += score_p1.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += _this.player3_score.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += score_p5.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
            else if (current_user_number == 4) {
                var string = "\n";
                string += score_p1.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += _this.player4_score.toString() + "\n";
                string += score_p5.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
            else if (current_user_number == 5) {
                var string = "\n";
                string += score_p1.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += _this.player5_score.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
        }, 2);
    };
    __decorate([
        property(cc.Prefab)
    ], GameManagerS1.prototype, "CG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS1.prototype, "scorepoint", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS1.prototype, "loadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS1.prototype, "GameoverBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS1.prototype, "TimerLabel", void 0);
    __decorate([
        property()
    ], GameManagerS1.prototype, "GameTime", void 0);
    __decorate([
        property()
    ], GameManagerS1.prototype, "WidthPixels", void 0);
    __decorate([
        property()
    ], GameManagerS1.prototype, "HeightPixels", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS1.prototype, "BGM", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS1.prototype, "ScoreSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS1.prototype, "GameOverSound", void 0);
    GameManagerS1 = __decorate([
        ccclass
    ], GameManagerS1);
    return GameManagerS1;
}(cc.Component));
exports.default = GameManagerS1;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlclxcR2FtZU1hbmFnZXJTMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixvQ0FBK0I7QUFDL0IsZ0VBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBNlZDO1FBelZHLFFBQUUsR0FBYyxJQUFJLENBQUM7UUFHckIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUkzQixjQUFRLEdBQVcsR0FBRyxDQUFDO1FBRXZCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBRTFCLFNBQUcsR0FBaUIsSUFBSSxDQUFDO1FBRXpCLGdCQUFVLEdBQWlCLElBQUksQ0FBQztRQUVoQyxtQkFBYSxHQUFpQixJQUFJLENBQUM7UUFFM0IseUJBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBRWhDLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFFYixtQkFBYSxHQUFzQixJQUFJLENBQUM7UUFDeEMsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixZQUFNLEdBQVksS0FBSyxD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QUksQ0FBQyxFQUFFO1lBQzFCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDthQUFNLElBQUksbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDthQUFNLElBQUksbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDthQUFNLElBQUksbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDthQUFNLElBQUksbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDtRQUNELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUNsRix1Q0FBdUM7WUFDdkMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDbEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENB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U0FBUyxDQUFDO3FEQUNTO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0RBQ1k7SUEzQmxCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0E2VmpDO0lBQUQsb0JBQUM7Q0E3VkQsQUE2VkMsQ0E3VjBDLEVBQUUsQ0FBQyxTQUFTLEdBNlZ0RDtrQkE3Vm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllclwiO1xyXG5pbXBvcnQgQ2hhbmdpbmdHcm91bmQgZnJvbSBcIi4uL0dhbWUxT2JqZWN0L0NoYW5naW5nR3JvdW5kXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFuYWdlclMxIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIENHOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc2NvcmVwb2ludDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxvYWRpbmdCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEdhbWVvdmVyQkc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUaW1lckxhYmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIEdhbWVUaW1lOiBudW1iZXIgPSAxMjA7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgV2lkdGhQaXhlbHM6IG51bWJlciA9IDE7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgSGVpZ2h0UGl4ZWxzOiBudW1iZXIgPSAxMDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBCR006IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgU2NvcmVTb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBHYW1lT3ZlclNvdW5kOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyX251bWJlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHBsYXllcjFfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHBsYXllcjJfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHBsYXllcjNfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHBsYXllcjRfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHBsYXllcjVfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGNvdW50aW5nID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHBoeXNpY01hbmFnZXI6IGNjLlBoeXNpY3NNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgdGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHRpbWVVcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMucGh5c2ljTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZ3Jhdml0eSA9IGNjLnYyKDAsIDApO1xyXG5cclxuICAgICAgICAvLyDmr4/lgItwbGF5ZXIgbm9kZeWIneWni+WMluS9jee9ruOAglxyXG4gICAgICAgIHZhciB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGFgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBzbmFwc2hvdC5mb3JFYWNoKGZ1bmN0aW9uIChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gcGxheWVyLmtleTtcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lID09IFwicGxheWVyMVwiIHx8IG5hbWUgPT0gXCJwbGF5ZXIyXCIgfHwgbmFtZSA9PSBcInBsYXllcjNcIiB8fCBuYW1lID09IFwicGxheWVyNFwiIHx8IG5hbWUgPT0gXCJwbGF5ZXI1XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluaXRpYWwgcGxheWVyOlwiLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvcHJlbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlYWJsZWApLnNldCh7IG1vdmVhYmxlOiBcInRydWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiA5NiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAzNTIgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgbGV0IHBsYXllcl9ub2RlX251bWJlciA9IDA7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VzZXJ9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgcGxheWVyX25vZGVfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF91c2VyX251bWJlciA9IHBsYXllcl9ub2RlX251bWJlcjtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjdXJyZW50IGluIFMxOlwiLCB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIpO1xyXG4gICAgICAgIH0sIDIuNSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHBsYXllcjEgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIxXCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXIyID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMlwiKTtcclxuICAgICAgICBsZXQgcGxheWVyMyA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjNcIik7XHJcbiAgICAgICAgbGV0IHBsYXllcjQgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXI0XCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXI1ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNVwiKTtcclxuICAgICAgICBpZiAocGxheWVyMSkgcGxheWVyMS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChwbGF5ZXIyKSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHBsYXllcjMpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAocGxheWVyNCkgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChwbGF5ZXI1KSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuSW5pdF9wbGF5ZXIoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlQ0coKTtcclxuICAgICAgICB9LCAxLjUpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIxKSBwbGF5ZXIxLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHBsYXllcjIpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyMykgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXI0KSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHBsYXllcjUpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyDplovlp4voqIjmmYJcclxuICAgICAgICAgICAgdGhpcy5UaW1lclN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDAuNSk7XHJcbiAgICAgICAgfSwgMi41KTtcclxuXHJcbiAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignR2FtZU9jY3VweUxhbmQvcGxheWVyU2NvcmUnKS5zZXQoeyBwbGF5ZXIxOiAwLCBwbGF5ZXIyOiAwLCBwbGF5ZXIzOiAwLCBwbGF5ZXI0OiAwLCBwbGF5ZXI1OiAwIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuVXBkYXRlU2NvcmVPbkZpcmViYXNlLCAwLjIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuXHJcbiAgICB9XHJcbiAgICBJbml0X3BsYXllcigpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAvLyBpbml0aWFsaXplIHBsYXllcnNcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllci9wbGF5ZXIke2l9X2lzbG9naW5gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkgeyAvLyDlpoLmnpznjqnlrrbnmbvlhaVcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9YCkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvcHJlbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlYWJsZWApLnNldCh7IG1vdmVhYmxlOiBcInRydWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiA5NiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAzNTIgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW5pdGlhbCBFbmRcclxuICAgIH1cclxuICAgIENyZWF0ZUNHKCkge1xyXG4gICAgICAgIC8vIGluc3RhbnRpYXRlIENHXHJcbiAgICAgICAgbGV0IHgsIHksIHhfbWF4LCB5X21heCwgeHBvcywgeXBvcztcclxuICAgICAgICB4X21heCA9IHRoaXMuV2lkdGhQaXhlbHM7XHJcbiAgICAgICAgeV9tYXggPSB0aGlzLkhlaWdodFBpeGVscztcclxuICAgICAgICBsZXQgQ0djb250YWluZXIgPSBjYy5maW5kKFwiQ2FudmFzL01hcE9iakNvbnRhaW5lclwiKTtcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgeF9tYXg7IHgrKykge1xyXG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgeV9tYXg7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgeHBvcyA9IHggKiAzMiArIDE2IC0gMTE1MjtcclxuICAgICAgICAgICAgICAgIHlwb3MgPSB5ICogMzIgKyAxNiAtIDgwMDtcclxuICAgICAgICAgICAgICAgIC8vIFN0YWdlMSByZWJ1cm4gYXQgOTYsMzUyXHJcbiAgICAgICAgICAgICAgICBpZiAoKHhwb3MgPiAtNjQgJiYgeHBvcyA8IDI1NiAmJiB5cG9zIDwgNTEyICYmIHlwb3MgPiAxOTIpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmICgoeHBvcyA9PSA3ODQgJiYgeXBvcyA9PSAxNDQpIHx8ICh4cG9zID09IDgxNiAmJiB5cG9zID09IDE0NCkgfHwgKHhwb3MgPT0gNzg0ICYmIHlwb3MgPT0gLTI3MikgfHwgKHhwb3MgPT0gODE2ICYmIHlwb3MgPT0gLTI3MikgfHwgKHhwb3MgPT0gLTQ5NiAmJiB5cG9zID09IDMwNCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAoeHBvcyA9PSAtNDY0ICYmIHlwb3MgPT0gLTQ5NikgfHwgKHhwb3MgPT0gLTQ5NiAmJiB5cG9zID09IC00OTYpIHx8ICh4cG9zID09IC05NzYgJiYgeXBvcyA9PSAyMDgpIHx8ICh4cG9zID09IC05NDQgJiYgeXBvcyA9PSAyMDgpIHx8ICh4cG9zID09IC03ODQgJiYgeXBvcyA9PSA0OCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAoeHBvcyA9PSAtNzUyICYmIHlwb3MgPT0gNDgpIHx8ICh4cG9zID09IC05NzYgJiYgeXBvcyA9PSAtMjA4KSB8fCAoeHBvcyA9PSAtOTQ0ICYmIHlwb3MgPT0gLTIwOCkgfHwgKHhwb3MgPT0gMCAmJiB5cG9zID09IDApIHx8ICh4cG9zID09IDAgJiYgeXBvcyA9PSAwKSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3JlYXRlIENHIGluIChcIix4LFwiLFwiLHksXCIpLlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBDRyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuQ0cpO1xyXG4gICAgICAgICAgICAgICAgQ0cuc2V0UG9zaXRpb24oeHBvcywgeXBvcyk7XHJcbiAgICAgICAgICAgICAgICBDRy5nZXRDb21wb25lbnQoQ2hhbmdpbmdHcm91bmQpLmdhbWVNYW5hZ2VyID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAgICAgQ0djb250YWluZXIuYWRkQ2hpbGQoQ0cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gdGltZXJcclxuICAgIFRpbWVyU3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lciA9IHRoaXMuR2FtZVRpbWU7XHJcbiAgICAgICAgdGhpcy5UaW1lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5HYW1lVGltZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5VcGRhdGVUaW1lciwgMSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGVUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lVXApIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy50aW1lciA+IDApIHRoaXMudGltZXIgKz0gLTE7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy50aW1lciA9PSAwKSB0aGlzLnRpbWVVcCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5UaW1lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy50aW1lci50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lVXApIHtcclxuICAgICAgICAgICAgdGhpcy5HYW1lT3ZlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVPdmVyKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5HYW1lT3ZlclNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMC41KTtcclxuICAgICAgICB0aGlzLkdhbWVvdmVyQkcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2NvcmVib2FyZCA9IHRoaXMuR2FtZW92ZXJCRy5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlXCIpO1xyXG4gICAgICAgIGxldCBzY29yZXBvaW50ID0gc2NvcmVib2FyZC5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlcG9pbnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXQgcG9pbnQgPSBzY29yZWJvYXJkLmdldENoaWxkQnlOYW1lKFwiUG9pbnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXQgc2NvcmVfcDEgPSAwO1xyXG4gICAgICAgIGxldCBzY29yZV9wMiA9IDA7XHJcbiAgICAgICAgbGV0IHNjb3JlX3AzID0gMDtcclxuICAgICAgICBsZXQgc2NvcmVfcDQgPSAwO1xyXG4gICAgICAgIGxldCBzY29yZV9wNSA9IDA7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ0dhbWVPY2N1cHlMYW5kL3BsYXllclNjb3JlJykub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc25hcHNob3QudmFsKCkucGxheWVyMik7XHJcbiAgICAgICAgICAgIHNjb3JlX3AxID0gc25hcHNob3QudmFsKCkucGxheWVyMTtcclxuICAgICAgICAgICAgc2NvcmVfcDIgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXIyO1xyXG4gICAgICAgICAgICBzY29yZV9wMyA9IHNuYXBzaG90LnZhbCgpLnBsYXllcjM7XHJcbiAgICAgICAgICAgIHNjb3JlX3A0ID0gc25hcHNob3QudmFsKCkucGxheWVyNDtcclxuICAgICAgICAgICAgc2NvcmVfcDUgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXI1O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgc2NvcmVib2FyZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IHNjb3JlX3AxLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gc2NvcmVfcDIudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBzY29yZV9wMy50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IHNjb3JlX3A0LnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gc2NvcmVfcDUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgc2NvcmVwb2ludC5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5TY29yZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10sIGFycjIgPSBbXTtcclxuICAgICAgICAgICAgYXJyLnB1c2goc2NvcmVfcDEpO1xyXG4gICAgICAgICAgICBhcnIucHVzaChzY29yZV9wMik7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHNjb3JlX3AzKTtcclxuICAgICAgICAgICAgYXJyLnB1c2goc2NvcmVfcDQpO1xyXG4gICAgICAgICAgICBhcnIucHVzaChzY29yZV9wNSk7XHJcbiAgICAgICAgICAgIGxldCBjbnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY250ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycltpXSA8IGFycltqXSkgY250Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIyLnB1c2goODAgLSAyMCAqIGNudCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycjIucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN0ciArPSBcIlxcbisgXCIgKyBhcnIyW2ldLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcG9pbnQuc3RyaW5nID0gc3RyO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuU2NvcmVTb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyBmaXJlYmFzZVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgR2FtZVJlc3VsdC9Sb3VuZDFgKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgcGxheWVyMTogYXJyMlswXSxcclxuICAgICAgICAgICAgICAgIHBsYXllcjI6IGFycjJbMV0sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIzOiBhcnIyWzJdLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyNDogYXJyMlszXSxcclxuICAgICAgICAgICAgICAgIHBsYXllcjU6IGFycjJbNF0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiR2FtZVN0YWdlMlwiKTtcclxuICAgICAgICB9LCAxMCk7XHJcbiAgICB9XHJcbiAgICAvL1xyXG4gICAgVXBkYXRlU2NvcmUocGxheWVyOiBudW1iZXIsIHBvaW50OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocGxheWVyID09IDEgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIxX3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IDIgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIyX3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IDMgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIzX3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IDQgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXI0X3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IDUgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXI1X3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFVwZGF0ZVNjb3JlT25GaXJlYmFzZSgpIHtcclxuICAgICAgICBsZXQgc2NvcmVfcDEgPSB0aGlzLnBsYXllcjFfc2NvcmU7XHJcbiAgICAgICAgbGV0IHNjb3JlX3AyID0gdGhpcy5wbGF5ZXIyX3Njb3JlO1xyXG4gICAgICAgIGxldCBzY29yZV9wMyA9IHRoaXMucGxheWVyM19zY29yZTtcclxuICAgICAgICBsZXQgc2NvcmVfcDQgPSB0aGlzLnBsYXllcjRfc2NvcmU7XHJcbiAgICAgICAgbGV0IHNjb3JlX3A1ID0gdGhpcy5wbGF5ZXI1X3Njb3JlO1xyXG4gICAgICAgIGxldCBjdXJyZW50X3VzZXJfbnVtYmVyID0gdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyO1xyXG4gICAgICAgIGlmIChjdXJyZW50X3VzZXJfbnVtYmVyID09IDEpIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ0dhbWVPY2N1cHlMYW5kL3BsYXllclNjb3JlJylcclxuICAgICAgICAgICAgICAgIC51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllcjE6IHNjb3JlX3AxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudF91c2VyX251bWJlciA9PSAyKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdHYW1lT2NjdXB5TGFuZC9wbGF5ZXJTY29yZScpXHJcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIyOiBzY29yZV9wMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRfdXNlcl9udW1iZXIgPT0gMykge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignR2FtZU9jY3VweUxhbmQvcGxheWVyU2NvcmUnKVxyXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyMzogc2NvcmVfcDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudF91c2VyX251bWJlciA9PSA0KSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdHYW1lT2NjdXB5TGFuZC9wbGF5ZXJTY29yZScpXHJcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXI0OiBzY29yZV9wNFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRfdXNlcl9udW1iZXIgPT0gNSkge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignR2FtZU9jY3VweUxhbmQvcGxheWVyU2NvcmUnKVxyXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyNTogc2NvcmVfcDVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdHYW1lT2NjdXB5TGFuZC9wbGF5ZXJTY29yZScpLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNuYXBzaG90LnZhbCgpLnBsYXllcjIpO1xyXG4gICAgICAgICAgICBzY29yZV9wMSA9IHNuYXBzaG90LnZhbCgpLnBsYXllcjE7XHJcbiAgICAgICAgICAgIHNjb3JlX3AyID0gc25hcHNob3QudmFsKCkucGxheWVyMjtcclxuICAgICAgICAgICAgc2NvcmVfcDMgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXIzO1xyXG4gICAgICAgICAgICBzY29yZV9wNCA9IHNuYXBzaG90LnZhbCgpLnBsYXllcjQ7XHJcbiAgICAgICAgICAgIHNjb3JlX3A1ID0gc25hcHNob3QudmFsKCkucGxheWVyNTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50X3VzZXJfbnVtYmVyID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHRoaXMucGxheWVyMV9zY29yZS50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wMi50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wMy50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wNC50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wNS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZXBvaW50LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRfdXNlcl9udW1iZXIgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZyA9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDEudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gdGhpcy5wbGF5ZXIyX3Njb3JlLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3AzLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3A0LnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3A1LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlcG9pbnQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudF91c2VyX251bWJlciA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyaW5nID0gXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wMS50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wMi50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSB0aGlzLnBsYXllcjNfc2NvcmUudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDQudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVwb2ludC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cmluZztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50X3VzZXJfbnVtYmVyID09IDQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3AxLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3AyLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3AzLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHRoaXMucGxheWVyNF9zY29yZS50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wNS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZXBvaW50LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRfdXNlcl9udW1iZXIgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZyA9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDEudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDIudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDMudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDQudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gdGhpcy5wbGF5ZXI1X3Njb3JlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlcG9pbnQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------
