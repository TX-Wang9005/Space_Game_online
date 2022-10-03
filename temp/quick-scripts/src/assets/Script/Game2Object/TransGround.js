"use strict";
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