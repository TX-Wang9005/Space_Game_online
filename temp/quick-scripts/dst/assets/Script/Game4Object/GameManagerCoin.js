
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game4Object/GameManagerCoin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNE9iamVjdFxcR2FtZU1hbmFnZXJDb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzQztBQUVoQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUkxQztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQThSQztRQTNSRyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFFL0IsZUFBUyxHQUFpQixJQUFJLENBQUM7UUFFL0IsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDO1FBRWhDLG9CQUFjLEdBQWlCLElBQUksQ0FBQztRQUVwQyxTQUFHLEdBQWlCLElBQUksQ0FBQztRQUV6QixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFFaEMsbUJBQWEsR0FBaUIsSUFBSSxDQUFDO1FBR25DLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRTlCLGNBQVEsR0FBVyxHQUFHLENBQUM7UUFFdkIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFckIsbUJBQWEsR0FBc0IsSUFBSSxDQUFDO1FBRXhDLHlCQUFtQixHQUFXLENBQUMsQ0FBQztRQUVoQyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFFaEMsa0JBQVksR0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjO1FBQ3hDLGVBQVMsR0FBVyxD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QVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNRO0lBRTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkRBQ2E7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztzREFDUTtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO3VEQUNTO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7MkRBQ2E7SUFFcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztnREFDRTtJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO3VEQUNTO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7MERBQ1k7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDWTtJQUU5QjtRQURDLFFBQVEsRUFBRTtxREFDWTtJQTVCTixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBOFJuQztJQUFELHNCQUFDO0NBOVJELEFBOFJDLENBOVI0QyxFQUFFLENBQUMsU0FBUyxHQThSeEQ7a0JBOVJvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXllckNvaW4gZnJvbSBcIi4vUGxheWVyQ29pblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyQ29pbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsb2FkaW5nQkc6IGNjLk5vZGUgPSBudWxsOyBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgR2FtZW92ZXJCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRpbWVyTGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb2luTGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBraWxsQ291bnRMYWJlbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgQ29pblNvdW5kOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIFRoaWVmU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgU3RlYWxDb2luU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgQkdNOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIFNjb3JlU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgR2FtZU92ZXJTb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIENvaW5Db250YWluZXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIEdhbWVUaW1lOiBudW1iZXIgPSAxMjA7XHJcblxyXG4gICAgcGxheWVyX25vZGUxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlMjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcGxheWVyX25vZGU0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlNTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBwaHlzaWNNYW5hZ2VyOiBjYy5QaHlzaWNzTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgdGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHRpbWVVcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGN1cnJlbnRfY29pbjogbnVtYmVyID0gMDsgLy8g55So5pa86KiY6YyE6Ieq5bex55qEQ29pblxyXG4gICAga2lsbGNvdW50OiBudW1iZXIgPSAwOyAvLyDnlKjmlrzoqJjpjIToh6rlt7FraWxsY291bnRcclxuICAgIGtpbGx0aW1lcjogbnVtYmVyID0gMDsgXHJcbiAgICBjb29sZG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAwKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdWlkID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VpZH1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZihzbmFwc2hvdC52YWwoKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHQuY3VycmVudF91c2VyX251bWJlciA9IHNuYXBzaG90LnZhbCgpLnBsYXllcl9udW1iZXI7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgQ29pbiBjdXJyZW50X3VzZXJfbnVtYmVyIGlzIFwiLCB0LmN1cnJlbnRfdXNlcl9udW1iZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8g5LiA6ZaL5aeL5omA5pyJ546p5a626YO95LiN6IO95YuVXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTEgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIxXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGUyID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMlwiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlMyA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjNcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTQgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXI0XCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGU1ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNVwiKTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTEpIHRoaXMucGxheWVyX25vZGUxLmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMikgdGhpcy5wbGF5ZXJfbm9kZTIuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUzKSB0aGlzLnBsYXllcl9ub2RlMy5nZXRDb21wb25lbnQoUGxheWVyQ29pbikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTQpIHRoaXMucGxheWVyX25vZGU0LmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNSkgdGhpcy5wbGF5ZXJfbm9kZTUuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdCRy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUxKSB0aGlzLnBsYXllcl9ub2RlMS5nZXRDb21wb25lbnQoUGxheWVyQ29pbikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTIpIHRoaXMucGxheWVyX25vZGUyLmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGU0KSB0aGlzLnBsYXllcl9ub2RlNC5nZXRDb21wb25lbnQoUGxheWVyQ29pbikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTUpIHRoaXMucGxheWVyX25vZGU1LmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkNvaW5Db250YWluZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5UaW1lclN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDIpO1xyXG4gICAgICAgIH0sIDMpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5Jbml0X3BsYXllcigpO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbiAgICBJbml0X3BsYXllcigpe1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgcGxheWVycyAgXHJcbiAgICAgICAgbGV0IGFyclggPSBbMjcyLCAtNjcyLCAtOTU3LCA2MDcsIDE2ODBdO1xyXG4gICAgICAgIGxldCBhcnJZID0gWzk2LCA2OTcsIC04OTMsIC02ODIsIDQzM107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHsgLy8g5aaC5p6c546p5a625a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogYXJyWFtpLTFdIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvWWApLnNldCh7IHk6IGFycllbaS0xXSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi9wbGF5ZXIke2l9YCkuc2V0KHsgY29pbjogMCwgc3RhdGU6IFwicGxheWVyXCJ9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW5pdGlhbCBFbmRcclxuICAgIH1cclxuICAgIC8vIHRpbWVyXHJcbiAgICBUaW1lclN0YXJ0KCl7XHJcbiAgICAgICAgdGhpcy50aW1lciA9IHRoaXMuR2FtZVRpbWU7XHJcbiAgICAgICAgdGhpcy5UaW1lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5HYW1lVGltZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5VcGRhdGVUaW1lciwgMSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGVUaW1lcigpe1xyXG4gICAgICAgIGlmKHRoaXMudGltZVVwKSByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy50aW1lciA+IDApIHRoaXMudGltZXIgKz0gLTE7XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnRpbWVyID09IDApIHRoaXMudGltZVVwID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlRpbWVyTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnRpbWVyLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMudGltZVVwKXtcclxuICAgICAgICAgICAgdGhpcy5HYW1lT3ZlcigpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgR2FtZU92ZXIoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuR2FtZU92ZXJTb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgdGhpcy5HYW1lb3ZlckJHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNjb3JlYm9hcmQgPSB0aGlzLkdhbWVvdmVyQkcuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZVwiKTtcclxuICAgICAgICBsZXQgc2NvcmVwb2ludCA9IHNjb3JlYm9hcmQuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZXBvaW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGV0IHBvaW50ID0gc2NvcmVib2FyZC5nZXRDaGlsZEJ5TmFtZShcIlBvaW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGV0IGFyciA9IFswLDAsMCwwLDBdO1xyXG4gICAgICAgIGZvcihsZXQgaT0xO2k8PTU7aSsrKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVDb2luL3BsYXllciR7aX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwaG90KXtcclxuICAgICAgICAgICAgICAgIGlmKHNuYXBob3QudmFsKCkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXJcIixpLCBcIkNvaW5cIixzbmFwaG90LnZhbCgpLmNvaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpLTFdID0gc25hcGhvdC52YWwoKS5jb2luO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBzY29yZWJvYXJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gYXJyWzBdICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IGFyclsxXSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBhcnJbMl0gKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gYXJyWzNdICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IGFycls0XTtcclxuICAgICAgICAgICAgc2NvcmVwb2ludC5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5TY29yZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXJyMiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgY250ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDU7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJbaV0gPCBhcnJbal0pIGNudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyMi5wdXNoKDgwIC0gMjAgKiBjbnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIyLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCJcXG4rIFwiICsgYXJyMltpXS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBvaW50LnN0cmluZyA9IHN0cjtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLlNjb3JlU291bmQsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVSZXN1bHQvUm91bmQzYCkuc2V0KHtcclxuICAgICAgICAgICAgICAgIHBsYXllcjE6IGFycjJbMF0sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIyOiBhcnIyWzFdLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyMzogYXJyMlsyXSxcclxuICAgICAgICAgICAgICAgIHBsYXllcjQ6IGFycjJbM10sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXI1OiBhcnIyWzRdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTdGFnZTVcIik7XHJcbiAgICAgICAgfSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZUtpbGxDb3VudCh0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMua2lsbGNvdW50ICs9IHQ7XHJcbiAgICAgICAgaWYodGhpcy5raWxsY291bnQgPCAwKSB0aGlzLmtpbGxjb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5raWxsQ291bnRMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMua2lsbGNvdW50LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBCZWNvbWVUaGllZihwbGF5ZXJfbmFtZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgc3RyID0gXCJwbGF5ZXJcIit0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICBpZihzdHIgIT0gcGxheWVyX25hbWUpIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLmtpbGxjb3VudCA8PSAwIHx8IHRoaXMuY29vbGRvd24gfHwgdGhpcy50aW1lciA8IDIwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuJ3QgYmUgdGhpZWZcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXJcIiwgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLFwiQmVjb21lVGhpZWYhXCIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLlRoaWVmU291bmQpIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5UaGllZlNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29vbGRvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmtpbGx0aW1lciA9IDMwO1xyXG4gICAgICAgICAgICB0aGlzLmtpbGxjb3VudCArPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5raWxsQ291bnRMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMua2lsbGNvdW50LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5Db29sZG93blRpbWVyLCAxKTtcclxuICAgICAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgR2FtZUNvaW4vcGxheWVyJHt0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXJ9YCkudXBkYXRlKHsgc3RhdGU6IFwidGhpZWZcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi9wbGF5ZXIke3RoaXMuY3VycmVudF91c2VyX251bWJlcn1gKS51cGRhdGUoeyBzdGF0ZTogXCJwbGF5ZXJcIiB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGZpcmViYXNlXHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgR2FtZUNvaW4vcGxheWVyJHt0LmN1cnJlbnRfdXNlcl9udW1iZXJ9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbihzbmFwaG90KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IHNuYXBob3QudmFsKCkuY29pbjtcclxuICAgICAgICAgICAgICAgICAgICBpZih0LmN1cnJlbnRfY29pbiAhPSBjKXsgLy8g5Luj6KGo5YG355uc6YyiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHQuU3RlYWxDb2luU291bmQpIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodC5TdGVhbENvaW5Tb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0LmN1cnJlbnRfY29pbiA9IGM7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5jb2luTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMTUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIENvb2xkb3duVGltZXIoKXtcclxuICAgICAgICB0aGlzLmtpbGx0aW1lciArPSAtMTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkJlY29tZVRoaWVmIENvb2xkb3duIGluXCIsIHRoaXMua2lsbHRpbWVyKTtcclxuICAgICAgICBpZih0aGlzLmtpbGx0aW1lciA8PSAwKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCZWNvbWVUaGllZiBDb29sZG93biFcIik7XHJcbiAgICAgICAgICAgIHRoaXMua2lsbHRpbWVyID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jb29sZG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5Db29sZG93blRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBVcGRhdGVDb2luKGNvaW46IG51bWJlciwgcGxheWVyX25hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHN0ciA9IFwicGxheWVyXCIrdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYoc3RyICE9IHBsYXllcl9uYW1lKSByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50X2NvaW4gJSAxMCA9PSA5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlS2lsbENvdW50KDEpO1xyXG4gICAgICAgICAgICBsZXQgcCA9IGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHt0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXJ9YCk7XHJcbiAgICAgICAgICAgIHAuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLnBsYXllclNwZWVkICo9IDAuOTtcclxuICAgICAgICAgICAgcC5ydW5BY3Rpb24oY2Muc2NhbGVCeSgwLjUsIDEuMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLkNvaW5Tb3VuZCkgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLkNvaW5Tb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgIC8vIGZpcmViYXNlXHJcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lQ29pbi9wbGF5ZXIke3QuY3VycmVudF91c2VyX251bWJlcn1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uKHNuYXBob3Qpe1xyXG4gICAgICAgICAgICBsZXQgYyA9IHNuYXBob3QudmFsKCkuY29pbjtcclxuICAgICAgICAgICAgdC5jdXJyZW50X2NvaW4gPSBjICsgY29pbjtcclxuICAgICAgICAgICAgdC5jb2luTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0LmN1cnJlbnRfY29pbi50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgR2FtZUNvaW4vcGxheWVyJHt0LmN1cnJlbnRfdXNlcl9udW1iZXJ9YCkudXBkYXRlKHsgY29pbjogdC5jdXJyZW50X2NvaW4gfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwbGF5ZXJEaWUocGxheWVyX25hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHN0ciA9IFwicGxheWVyXCIrdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYoc3RyICE9IHBsYXllcl9uYW1lKSByZXR1cm47XHJcbiAgICAgICAgLy8g6YeR5bmj5riF6Zu2XHJcbiAgICAgICAgdGhpcy5jdXJyZW50X2NvaW4gPSAwO1xyXG4gICAgICAgIC8vIGZpcmViYXNlXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVDb2luL3BsYXllciR7dGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyfWApLnVwZGF0ZSh7IGNvaW46IDAgfSk7XHJcbiAgICAgICAgdGhpcy5jb2luTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmN1cnJlbnRfY29pbi50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIOmAn+W6piDlpKflsI/lvqnljp8gICAgXHJcbiAgICAgICAgbGV0IHAgPSBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllciR7dGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyfWApO1xyXG4gICAgICAgIHAuZ2V0Q29tcG9uZW50KFBsYXllckNvaW4pLnBsYXllclNwZWVkID0gMTUwO1xyXG4gICAgICAgIHAucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4xLCAxKSk7XHJcbiAgICAgICAgLy8g5YKz6YCB5b6p5rS76bueXHJcbiAgICAgICAgcC5nZXRDb21wb25lbnQoUGxheWVyQ29pbikucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgLy8gcC5nZXRDb21wb25lbnQoUGxheWVyQ29pbikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgbGV0IHMgPSBjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuMyksIGNjLmZhZGVJbigwLjMpKTtcclxuICAgICAgICBhY3Rpb24gPSBjYy5yZXBlYXQocywgNSk7XHJcbiAgICAgICAgcC5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAvLyBwLmdldENvbXBvbmVudChQbGF5ZXJDb2luKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBsZXQgYXJyWCA9IFsyNzIsIC02NzIsIC05NTcsIDYwNywgMTY4MF07XHJcbiAgICAgICAgLy8gbGV0IGFyclkgPSBbOTYsIDY5NywgLTg5MywgLTY4MiwgNDMzXTtcclxuICAgICAgICAvLyBwLnNldFBvc2l0aW9uKGFyclhbdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLTFdLCBhcnJZW3RoaXMuY3VycmVudF91c2VyX251bWJlci0xXSk7XHJcbiAgICB9XHJcbn1cclxuIl19