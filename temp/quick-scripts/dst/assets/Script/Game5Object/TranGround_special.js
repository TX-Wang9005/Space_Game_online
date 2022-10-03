
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