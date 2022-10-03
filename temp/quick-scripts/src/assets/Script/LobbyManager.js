"use strict";
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