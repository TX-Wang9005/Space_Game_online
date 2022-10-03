
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