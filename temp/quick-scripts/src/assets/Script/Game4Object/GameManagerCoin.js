"use strict";
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