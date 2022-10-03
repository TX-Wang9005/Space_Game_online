"use strict";
cc._RF.push(module, 'ed3c4LMeTJPzosI2dJ4oVp0', 'GameManagerS5');
// Script/GameManager/GameManagerS5.ts

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
var special_player_1 = require("../Game5Object/special_player");
var battle_field_1 = require("../Game5Object/battle_field");
var Mine_info_choice_1 = require("../Game5Object/Mine_info_choice");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS5 = /** @class */ (function (_super) {
    __extends(GameManagerS5, _super);
    function GameManagerS5() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.GameoverBG = null;
        _this.TimerLabel = null;
        _this.GameTime = 120;
        _this.opponent_info_choice = null;
        _this.Mine_info_choice = null;
        _this.battle_field = null;
        _this.BGM = null;
        _this.ScoreSound = null;
        _this.GameOverSound = null;
        _this.panel = null;
        _this.physicManager = null;
        _this.flag = false;
        _this.counting = 0;
        _this.player_array = [];
        _this.player_node1 = null;
        _this.player_node2 = null;
        _this.player_node3 = null;
        _this.player_node4 = null;
        _this.player_node5 = null;
        _this.fighting = false;
        _this.reset = false;
        _this.select_character = false;
        _this.timer = 0;
        _this.timeUp = false;
        return _this;
    }
    GameManagerS5.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        // 每個player node初始化位置。
        var user = firebase.auth().currentUser.uid;
        var permited_user;
        var handle = this;
        //
    };
    GameManagerS5.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        //choose the initial ghost
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1)
            this.player_node1.getComponent(special_player_1.default).moveable = false;
        if (this.player_node2)
            this.player_node2.getComponent(special_player_1.default).moveable = false;
        if (this.player_node3)
            this.player_node3.getComponent(special_player_1.default).moveable = false;
        if (this.player_node4)
            this.player_node4.getComponent(special_player_1.default).moveable = false;
        if (this.player_node5)
            this.player_node5.getComponent(special_player_1.default).moveable = false;
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (_this.player_node1)
                _this.player_node1.getComponent(special_player_1.default).moveable = true;
            if (_this.player_node2)
                _this.player_node2.getComponent(special_player_1.default).moveable = true;
            if (_this.player_node3)
                _this.player_node3.getComponent(special_player_1.default).moveable = true;
            if (_this.player_node4)
                _this.player_node4.getComponent(special_player_1.default).moveable = true;
            if (_this.player_node5)
                _this.player_node5.getComponent(special_player_1.default).moveable = true;
            cc.audioEngine.playMusic(_this.BGM, true);
            cc.audioEngine.setMusicVolume(0.5);
            // 開始計時
            _this.TimerStart();
        }, 2.5);
    };
    // getRandomInt(max) {
    //     return Math.floor(Math.random() * max);
    // }
    // timer
    GameManagerS5.prototype.TimerStart = function () {
        this.timer = this.GameTime;
        this.TimerLabel.getComponent(cc.Label).string = this.GameTime.toString();
        this.schedule(this.UpdateTimer, 1);
    };
    GameManagerS5.prototype.UpdateTimer = function () {
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
    GameManagerS5.prototype.GameOver = function () {
        var _this = this;
        cc.audioEngine.stopMusic();
        this.scheduleOnce(function () {
            cc.audioEngine.playEffect(_this.GameOverSound, false);
        }, 0.5);
        this.GameoverBG.active = true;
        var scoreboard = this.GameoverBG.getChildByName("Score");
        var scorepoint = scoreboard.getChildByName("Scorepoint").getComponent(cc.Label);
        var coin = [0, 0, 0, 0, 0];
        var _loop_1 = function (i) {
            firebase.database().ref("player_data/player" + i + "/game2_state/money").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    coin[i - 1] = snapshot.val();
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        this.scheduleOnce(function () {
            scoreboard.active = true;
            var str = "\n";
            str += coin[0].toString() + "  B" + "\n";
            str += coin[1].toString() + "  B" + "\n";
            str += coin[2].toString() + "  B" + "\n";
            str += coin[3].toString() + "  B" + "\n";
            str += coin[4].toString() + "  B";
            scorepoint.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(function () {
            cc.director.loadScene("GameEnd");
        }, 10);
    };
    //
    GameManagerS5.prototype.update = function (dt) {
        var handle = this;
        if (this.counting < 5) {
            var _loop_2 = function (i) {
                if (cc.find("Canvas/PlayerContainer/player" + i).active == true) {
                    return "continue";
                }
                else {
                    firebase.database().ref("player_data/player" + i).once('value', function (snapshot) {
                        firebase.database().ref("GameResult").once('value', function (childshot) {
                            if (snapshot.val() != null) {
                                var new_money_1 = 0;
                                childshot.forEach(function (element) {
                                    if (element.val() != null) {
                                        if (i == 1) {
                                            new_money_1 += element.val().player1 / 10;
                                        }
                                        else if (i == 2) {
                                            new_money_1 += element.val().player2 / 10;
                                        }
                                        else if (i == 3) {
                                            new_money_1 += element.val().player3 / 10;
                                        }
                                        else if (i == 4) {
                                            new_money_1 += element.val().player4 / 10;
                                        }
                                        else if (i == 5) {
                                            new_money_1 += element.val().player5 / 10;
                                        }
                                    }
                                });
                                handle.counting += 1;
                                handle.player_array.push(i);
                                cc.find("Canvas/PlayerContainer/player" + i).active = true;
                                firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                                firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                                firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                                firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                                firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: 240 });
                                firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -48 });
                                firebase.database().ref("player_data/player" + i + "/game2_state").set({ money: new_money_1, paper: 2, scissor: 2, stone: 2, fighting: "false", opponent: "null", card: "null", challenged: "false" });
                            }
                        });
                    });
                }
            };
            for (var i = 1; i <= 5; i++) {
                _loop_2(i);
            }
        }
        if (this.reset) {
            firebase.database().ref("player_data/" + this.current_user_node + "/game2_state").update({ card: "null", challenged: "false", fighting: "false", opponent: "null" });
            this.reset = false;
        }
        if (!this.fighting && !handle.Mine_info_choice.active && !handle.opponent_info_choice.active && !handle.battle_field.active) {
            firebase.database().ref("player_data/" + this.current_user_node + "/game2_state").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().fighting == 'true') {
                        handle.fighting = true;
                        handle.Mine_info_choice.active = true;
                        handle.Mine_info_choice.getComponent(Mine_info_choice_1.default).opponent = handle.opponent_user_node;
                        handle.Mine_info_choice.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = String(snapshot.val().paper);
                        handle.Mine_info_choice.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = String(snapshot.val().scissor);
                        handle.Mine_info_choice.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = String(snapshot.val().stone);
                        handle.opponent_info_choice.active = true;
                        handle.opponent_info_choice.getChildByName("title").getComponent(cc.RichText).string = snapshot.val().opponent;
                        handle.battle_field.active = true;
                        handle.battle_field.getComponent(battle_field_1.default).me_ready = false;
                        handle.battle_field.getComponent(battle_field_1.default).opponent_ready = false;
                        handle.battle_field.getComponent(battle_field_1.default).opponent = snapshot.val().opponent;
                        handle.opponent_user_node = snapshot.val().opponent;
                        if (handle.character == "erudite") {
                            firebase.database().ref("player_data/" + snapshot.val().opponent + "/game2_state").once('value', function (childshot) {
                                var paper = childshot.val().paper;
                                var scissor = childshot.val().scissor;
                                var stone = childshot.val().stone;
                                var total = paper + scissor + stone;
                                handle.opponent_info_choice.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = (paper / total).toFixed(2) + "%";
                                handle.opponent_info_choice.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = (scissor / total).toFixed(2) + "%";
                                handle.opponent_info_choice.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = (stone / total).toFixed(2) + "%";
                            });
                        }
                        else {
                            handle.opponent_info_choice.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = "??";
                            handle.opponent_info_choice.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = "??";
                            handle.opponent_info_choice.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = "??";
                        }
                    }
                }
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "loadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "GameoverBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "TimerLabel", void 0);
    __decorate([
        property()
    ], GameManagerS5.prototype, "GameTime", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "opponent_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "Mine_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "battle_field", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManagerS5.prototype, "BGM", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS5.prototype, "ScoreSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS5.prototype, "GameOverSound", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS5.prototype, "panel", void 0);
    GameManagerS5 = __decorate([
        ccclass
    ], GameManagerS5);
    return GameManagerS5;
}(cc.Component));
exports.default = GameManagerS5;

cc._RF.pop();