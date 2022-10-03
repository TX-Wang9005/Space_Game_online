
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNE9iamVjdFxcUGxheWVyQ29pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixrREFBNkM7QUFDN0MscURBQWdEO0FBRTFDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBMlNDO1FBdlNHLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRWhCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFeEIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFLNUIseUJBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBRXhDLGVBQVMsR0FBaUIsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFVLEdBQWlCLElBQUksQ0FBQztRQUloQyxjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGlCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsMEJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0Qix1QkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsc0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsaUJBQVcsR0FBWSxJQUFJLENBQUM7O1FBcVE1QixzQ0FBc0M7UUFDdEMsMkNBQTJD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Q0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRCxJQUFJLFdBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyx5QkFBZSxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLHlCQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRSxXQUFXO1lBQ1gsSUFBSSxHQUFHLEdBQUcsUUFBUSxHQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUM1QyxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNiLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBWSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBUyxPQUFPO29CQUNqRixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUMzQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQVksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFDLFdBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pGLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFqU0Q7UUFEQyxRQUFRLEVBQUU7bURBQ2E7SUFKUCxVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMlM5QjtJQUFELGlCQUFDO0NBM1NELEFBMlNDLENBM1N1QyxFQUFFLENBQUMsU0FBUyxHQTJTbkQ7a0JBM1NvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgQ2FtZXJhTWFuYWdlciBmcm9tIFwiLi4vQ2FtZXJhTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJDb2luIGZyb20gXCIuL0dhbWVNYW5hZ2VyQ29pblwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyQ29pbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBwbGF5ZXJTcGVlZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIEdhbWVNZ3I6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgY2hpbGRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNoaWxkX2xhYmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHRoaXNfbm9kZV91c2VyO1xyXG4gICAgLy9jaGFuZ2UgXHJcbiAgICBwcml2YXRlIGN1cnJlbnRfdXNlcjtcclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyX251bWJlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICByaWdpZGJvZHk6IGNjLlJpZ2lkQm9keSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNoaWxkX2FuaW06IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBwZXJtaXRlZF91c2VyO1xyXG5cclxuICAgIHByaXZhdGUgbGVmdERvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcmlnaHREb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHVwRG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBkb3duRG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwcmVtb3ZlRGlyWCA9IDA7XHJcbiAgICBwcml2YXRlIG1vdmVEaXJYID0gMDtcclxuICAgIHByaXZhdGUgbW92ZURpclkgPSAwO1xyXG4gICAgcHJpdmF0ZSBwcmVtb3ZlRGlyWF9maXJlYmFzZSA9IDA7XHJcbiAgICBwcml2YXRlIG1vdmVEaXJYX2ZpcmViYXNlID0gMDtcclxuICAgIHByaXZhdGUgbW92ZURpcllfZmlyZWJhc2UgPSAwO1xyXG4gICAgcHJpdmF0ZSBsb2dnZWRfaW5fb3Jfbm90ID0gZmFsc2U7XHJcbiAgICBtb3ZlYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBtb3ZlYWJsZUtleTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vIOavj+WAi3BsYXllciBub2Rl6YO95pyD5bCN5oeJ5LiA5YCLdXNlclxyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5ub2RlLm5hbWU7XHJcbiAgICAgICAgdmFyIHVzZXIgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgICAgIHRoaXMuY3VycmVudF91c2VyID0gdXNlcjtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBoYW5kbGUucGVybWl0ZWRfdXNlciA9IHNuYXBzaG90LnZhbCgpLnVpZDtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmdWNrIGltIGlubm5ubm5ubm5ubm5ubm5ubm5uJylcclxuICAgICAgICAgICAgICAgIGhhbmRsZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGUubG9nZ2VkX2luX29yX25vdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVzZXIgPT0gaGFuZGxlLnBlcm1pdGVkX3VzZXIpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVhYmxlS2V5YCkuc2V0KHsgbW92ZWFibGVLZXk6IFwidHJ1ZVwiIH0pXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9wcmVtb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvWGApLnNldCh7IHg6IDAgfSlcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9Jc0xvZ2luYCkuc2V0KHsgYm9vbDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudGhpc19ub2RlX3VzZXIgPSBoYW5kbGUucGVybWl0ZWRfdXNlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub2RldXNlcjpcIiwgdGhpcy5ub2RlLm5hbWUsIHRoaXMudGhpc19ub2RlX3VzZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImN1cnJlbnR1c2VyOlwiLCB0aGlzLmN1cnJlbnRfdXNlcik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRfdXNlciA9PSB0aGlzLnRoaXNfbm9kZV91c2VyKSBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhXCIpLmdldENvbXBvbmVudChDYW1lcmFNYW5hZ2VyKS5Gb2xsb3dUYXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgfSwgMC41KTtcclxuICAgICAgICAvLyDlj5blvpfnj77lnKjnjqnlrrbnt6jomZ8gY3VycmVudF91c2VyX251bWJlclxyXG4gICAgICAgIHZhciB1aWQgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgICAgIGxldCB0ID0gdGhpcztcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdXNlcl9pbmZvLyR7dWlkfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmKHNuYXBzaG90LnZhbCgpICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdC5jdXJyZW50X3VzZXJfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBDb2luIGN1cnJlbnRfdXNlcl9udW1iZXIgaXMgXCIsIHQuY3VycmVudF91c2VyX251bWJlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmlnaWRib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkX25vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUodGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRfbGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0xhYmVsJyk7IC8vIOeOqeWutuWQjeeosVxyXG4gICAgICAgIHRoaXMuY2hpbGRfYW5pbSA9IHRoaXMuY2hpbGRfbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICB0aGlzLmNoaWxkX2FuaW0ucGxheSgnSWRsZScpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy51cGRhdGVPdGhlcnNDdXJyZW50UG9zLCAxKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuVXBkYXRlR3JvdXAsIDAuNSk7XHJcblxyXG4gICAgICAgIHRoaXMuR2FtZU1nciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICAvL2lmIHRoZSBwbGF5ZXIgaXMgbG9nZ2VkIG5vdyB3ZSBhY3RpdmUgdGhlIG5vZGUgXHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2dlZF9pbl9vcl9ub3QpIHtcclxuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMubm9kZS5uYW1lfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgIGxldCBEaXJYID0gdGhpcy5tb3ZlRGlyWF9maXJlYmFzZTtcclxuICAgICAgICBsZXQgRGlyWSA9IHRoaXMubW92ZURpcllfZmlyZWJhc2U7XHJcbiAgICAgICAgbGV0IHByZURpclggPSB0aGlzLnByZW1vdmVEaXJYX2ZpcmViYXNlO1xyXG4gICAgICAgIGxldCBwb3NYID0gdGhpcy5ub2RlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB0aGlzLm5vZGUucG9zaXRpb24ueTtcclxuICAgICAgICAvLyB3cml0ZSBmaXJlYmFzZSByZWFsdGltZSBkYXRhYmFzZVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRfdXNlciA9PSB0aGlzLnRoaXNfbm9kZV91c2VyKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJYYCkuc2V0KHsgRGlyOiBEaXJYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiBEaXJZIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiBwcmVEaXJYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiBwb3NYIH0pXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiBwb3NZIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlYWQgZmlyZWJhc2UgcmVhbHRpbWUgZGF0YWJhc2VcclxuICAgICAgICBEaXJYID0gMCwgRGlyWSA9IDAsIHByZURpclggPSAwO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIERpclggPSBzbmFwc2hvdC52YWwoKS5tb3ZlRGlyWC5EaXI7XHJcbiAgICAgICAgICAgICAgICBEaXJZID0gc25hcHNob3QudmFsKCkubW92ZURpclkuRGlyO1xyXG4gICAgICAgICAgICAgICAgcHJlRGlyWCA9IHNuYXBzaG90LnZhbCgpLnByZW1vdmVEaXJYLkRpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGlyWCA9IERpclg7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZURpclkgPSBEaXJZO1xyXG4gICAgICAgICAgICB0aGlzLnByZW1vdmVEaXJYID0gcHJlRGlyWDtcclxuICAgICAgICB9LCAwLjIpO1xyXG5cclxuICAgICAgICAvLyBTY2FsZVxyXG4gICAgICAgIHRoaXMuY2hpbGRfbm9kZS5zY2FsZVggPSAodGhpcy5tb3ZlRGlyWCA+PSAwKSA/IDEgOiAtMTtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyWCA9PSAwKSB0aGlzLmNoaWxkX25vZGUuc2NhbGVYID0gKHRoaXMucHJlbW92ZURpclggPj0gMCkgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIC8vIE1vdmVcclxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyWCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZWFibGUpIHRoaXMucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgdGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpclkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb3ZlRGlyWSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZWFibGUpIHRoaXMucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIodGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpclgsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZWFibGUpIHRoaXMucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIodGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpclggKiAwLjcsIHRoaXMucGxheWVyU3BlZWQgKiB0aGlzLm1vdmVEaXJZICogMC43KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFuaW1hdGlvblxyXG4gICAgICAgIGlmICgodGhpcy5tb3ZlRGlyWCA9PSAwICYmIHRoaXMubW92ZURpclkgPT0gMCkgfHwgIXRoaXMubW92ZWFibGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoaWxkX2FuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoJ0lkbGUnKS5pc1BsYXlpbmcpIHRoaXMuY2hpbGRfYW5pbS5wbGF5KCdJZGxlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoaWxkX2FuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoJ01vdmUnKS5pc1BsYXlpbmcpIHRoaXMuY2hpbGRfYW5pbS5wbGF5KCdNb3ZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5RG93bihldmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5RG93blwiLCBldmVudC5rZXlDb2RlKTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkucTpcclxuICAgICAgICAgICAgICAgIHRoaXMuS2lsbG90aGVycygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnREb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVZKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25Eb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25LZXlVcChldmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiS2V5RG93blwiLCBldmVudC5rZXlDb2RlKTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdERvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJpZ2h0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVgoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZDpcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHREb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWZ0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKC0xKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllck1vdmVYKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bkRvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgtMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5zOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXBEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTW92ZVkoMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJNb3ZlWSgwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBsYXllck1vdmVYKG1vdmVEaXJYOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHJlbW92ZURpclhfZmlyZWJhc2UgPSB0aGlzLm1vdmVEaXJYX2ZpcmViYXNlO1xyXG4gICAgICAgIHRoaXMubW92ZURpclhfZmlyZWJhc2UgPSBtb3ZlRGlyWDtcclxuICAgIH1cclxuICAgIHBsYXllck1vdmVZKG1vdmVEaXJZOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50X3VzZXIgIT0gdGhpcy50aGlzX25vZGVfdXNlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5tb3ZlYWJsZUtleSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubW92ZURpcllfZmlyZWJhc2UgPSBtb3ZlRGlyWTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU90aGVyc0N1cnJlbnRQb3MoKSB7IC8vIOWumuacn+iHquWLleS/ruato+WFtuS7lueOqeWutuato+eiuuS9jee9rlxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRfdXNlciA9PSB0aGlzLnRoaXNfbm9kZV91c2VyKSByZXR1cm47IC8vIOS4jeabtOaWsOiHquW3seeahG5vZGVcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVmcmVzaCBQb3M6XCIsIG5hbWUpO1xyXG4gICAgICAgIGxldCBwb3NYID0gLTE0ODcsIERpclg7XHJcbiAgICAgICAgbGV0IHBvc1kgPSAtMTQ4NywgRGlyWTtcclxuICAgICAgICAvLyBsZXQgSXNMb2dpbjogYm9vbGVhbjtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NYID0gc25hcHNob3QudmFsKCkuWC54O1xyXG4gICAgICAgICAgICAgICAgcG9zWSA9IHNuYXBzaG90LnZhbCgpLlkueTtcclxuICAgICAgICAgICAgICAgIERpclggPSBzbmFwc2hvdC52YWwoKS5tb3ZlRGlyWC5EaXI7XHJcbiAgICAgICAgICAgICAgICBEaXJZID0gc25hcHNob3QudmFsKCkubW92ZURpclkuRGlyO1xyXG4gICAgICAgICAgICAgICAgLy8gSXNMb2dpbiA9IHNuYXBzaG90LnZhbCgpLklzTG9naW4uYm9vbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBvc1ggPT0gLTE0ODcgJiYgcG9zWSA9PSAtMTQ4NykgcmV0dXJuOyAvLyDlpoLmnpxmaXJlYmFzZSBkYXRhYmFzZeaykuacieaKk+WIsOizh+aWme+8jOWwseS4jeimgeabtOaWsOOAglxyXG4gICAgICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgICAgIGFjdGlvbiA9IGNjLm1vdmVUbygwLjUsIHBvc1gsIHBvc1kpOyAvLyDkv67mraPkuKblubPmu5Hnp7vli5XliLDmraPnorrkvY3nva5cclxuICAgICAgICAgICAgaWYoTWF0aC5hYnModGhpcy5ub2RlLnBvc2l0aW9uLngtcG9zWCk+MjU2IHx8IE1hdGguYWJzKHRoaXMubm9kZS5wb3NpdGlvbi55LXBvc1kpPjI1Nil7IC8vIOWmguaenOS9jee9ruW3ruWkquWkmuWwseebtOaOpemWg+ePvuOAgigyNTbngro45qC8KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvc1gscG9zWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIH0sIDAuMjApO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlR3JvdXAoKXtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVDb2luLyR7dC5ub2RlLm5hbWV9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3Qpe1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkuc3RhdGUgPT0gXCJwbGF5ZXJcIil7XHJcbiAgICAgICAgICAgICAgICBpZih0Lm5vZGUuZ3JvdXAgIT0gXCJDb2lucGxheWVyXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlR3JvdXAgdG8gcGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5ncm91cCA9IFwiQ29pbnBsYXllclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJDXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoc25hcHNob3QudmFsKCkuc3RhdGUgPT0gXCJ0aGllZlwiKXtcclxuICAgICAgICAgICAgICAgIGlmKHQubm9kZS5ncm91cCAhPSBcIkNvaW50aGllZlwiKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYW5nZUdyb3VwIHRvIHRoaWVmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5ncm91cCA9IFwiQ29pbnRoaWVmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkNcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgS2lsbG90aGVycygpe1xyXG4gICAgICAgIGlmKHRoaXMudGhpc19ub2RlX3VzZXIgIT0gdGhpcy5jdXJyZW50X3VzZXIpIHJldHVybjtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBsYXllclwiLCB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIsIFwid2FudCB0byBraWxsICEhIVwiKTtcclxuICAgICAgICB0aGlzLkdhbWVNZ3IuZ2V0Q29tcG9uZW50KEdhbWVNYW5hZ2VyQ29pbikuQmVjb21lVGhpZWYodGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpeyAvLyDnorDliLDlgbfph5Hos4rmnIPmrbvmjolcclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09IFwiQ29pbnRoaWVmXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJlZ2luQ29udGFjdCBvbiBDb2ludGhpZWZcIiwgb3RoZXIubm9kZS5uYW1lKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRfYyA9IHRoaXMuR2FtZU1nci5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJDb2luKS5jdXJyZW50X2NvaW47XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZU1nci5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJDb2luKS5wbGF5ZXJEaWUodGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgICAgICAgICAvLyBmaXJlYmFzZVxyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJwbGF5ZXJcIit0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIGlmKHNlbGYubm9kZS5uYW1lID09IHN0cikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHQgPSB0aGlzOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi8ke290aGVyLm5vZGUubmFtZX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uKHNuYXBob3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjID0gc25hcGhvdC52YWwoKS5jb2luO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi8ke290aGVyLm5vZGUubmFtZX1gKS51cGRhdGUoeyBjb2luOiBjK2N1cnJlbnRfYyB9KTtcclxuICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIG9uRW5kQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcil7XHJcbiAgICAvLyAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSBcIkNvaW50aGllZlwiKXtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJFbmRDb250YWN0IG9uIENvaW50aGllZlwiLCBvdGhlci5ub2RlLm5hbWUpOyAgICAgICAgICAgIFxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxufVxyXG4iXX0=