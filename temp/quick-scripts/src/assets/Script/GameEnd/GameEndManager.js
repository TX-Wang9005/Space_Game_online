"use strict";
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