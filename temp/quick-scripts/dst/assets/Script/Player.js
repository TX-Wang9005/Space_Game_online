
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