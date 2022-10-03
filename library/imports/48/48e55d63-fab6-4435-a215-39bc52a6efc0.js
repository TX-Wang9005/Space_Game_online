"use strict";
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