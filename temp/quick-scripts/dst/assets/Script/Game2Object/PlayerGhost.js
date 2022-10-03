
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