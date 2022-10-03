
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager/GameManagerS5.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlclxcR2FtZU1hbmFnZXJTNS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixnRUFBbUQ7QUFDbkQsNERBQXVEO0FBQ3ZELG9FQUErRDtBQUl6RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUk1QztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQTBPQztRQXZPRyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGNBQVEsR0FBVyxHQUFHLENBQUM7UUFHdkIsMEJBQW9CLEdBQVksSUFBSSxDQUFDO1FBRXJDLHNCQUFnQixHQUFZLElBQUksQ0FBQztRQUVqQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixTQUFHLEdBQWlCLElBQUksQ0FBQztRQUV6QixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFFaEMsbUJBQWEsR0FBaUIsSUFBSSxDQUFDO1FBR25DLFdBQUssR0FBWSxJQUFJLENBQUM7UUFFZCxtQkFBYSxHQUFzQixJQUFJLENBQUM7UUFDeEMsVUFBSSxHQUFHLEtBQUssQ0FBQztRQUNyQixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2Isa0JBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFJN0IsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixXQUFLLEdBQUcsS0FBSyxDQUFDO1FBRWQsc0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBR2pCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsWUFBTSxHQUFZLEtBQUssQ0FBQzs7SUF5THBDLENBQUM7SUF0TEcsOEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV6QyxzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDM0MsSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEVBQUU7SUFDTixDQUFDO0lBRUQsNkJBQUssR0FBTDtRQUFBLGlCQTJCQztRQXpCRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDN0IsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlELElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyx3QkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMvRSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsd0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDL0UsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQy9FLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyx3QkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMvRSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsd0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDL0UsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLEtBQUksQ0FBQyxZQUFZO2dCQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzlFLElBQUksS0FBSSxDQUFDLFlBQVk7Z0JBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsd0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDOUUsSUFBSSxLQUFJLENBQUMsWUFBWTtnQkFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyx3QkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUM5RSxJQUFJLEtBQUksQ0FBQyxZQUFZO2dCQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsWUFB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Q0o7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQXRPRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNRO0lBRTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1M7SUFFM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDUztJQUczQjtRQURDLFFBQVEsRUFBRTttREFDWTtJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytEQUNtQjtJQUVyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJEQUNlO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1c7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDOzhDQUNSO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7cURBQ1M7SUFFaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3REFDWTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNJO0lBMUJMLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EwT2pDO0lBQUQsb0JBQUM7Q0ExT0QsQUEwT0MsQ0ExTzBDLEVBQUUsQ0FBQyxTQUFTLEdBME90RDtrQkExT29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL0dhbWU1T2JqZWN0L3NwZWNpYWxfcGxheWVyXCI7XHJcbmltcG9ydCBiYXR0bGVfZmllbGQgZnJvbSBcIi4uL0dhbWU1T2JqZWN0L2JhdHRsZV9maWVsZFwiO1xyXG5pbXBvcnQgTWluZV9pbmZvX2Nob2ljZSBmcm9tIFwiLi4vR2FtZTVPYmplY3QvTWluZV9pbmZvX2Nob2ljZVwiO1xyXG5pbXBvcnQgcGFuZWxfaW5mbyBmcm9tIFwiLi4vR2FtZTVPYmplY3QvcGFuZWxfaW5mb1wiO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyUzUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbG9hZGluZ0JHOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgR2FtZW92ZXJCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRpbWVyTGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBHYW1lVGltZTogbnVtYmVyID0gMTIwO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgb3Bwb25lbnRfaW5mb19jaG9pY2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBNaW5lX2luZm9fY2hvaWNlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmF0dGxlX2ZpZWxkOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkF1ZGlvQ2xpcCB9KVxyXG4gICAgQkdNOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIFNjb3JlU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgR2FtZU92ZXJTb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHBoeXNpY01hbmFnZXI6IGNjLlBoeXNpY3NNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgZmxhZyA9IGZhbHNlO1xyXG4gICAgY291bnRpbmcgPSAwO1xyXG4gICAgcGxheWVyX2FycmF5ID0gW107XHJcblxyXG4gICAgcGxheWVyX25vZGUxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlMjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcGxheWVyX25vZGU0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlNTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgY3VycmVudF91c2VyX25vZGU7XHJcbiAgICBvcHBvbmVudF91c2VyX25vZGU7XHJcbiAgICBmaWdodGluZyA9IGZhbHNlO1xyXG5cclxuICAgIHJlc2V0ID0gZmFsc2U7XHJcblxyXG4gICAgc2VsZWN0X2NoYXJhY3RlciA9IGZhbHNlO1xyXG4gICAgY2hhcmFjdGVyO1xyXG5cclxuICAgIHByaXZhdGUgdGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHRpbWVVcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAwKTtcclxuXHJcbiAgICAgICAgLy8g5q+P5YCLcGxheWVyIG5vZGXliJ3lp4vljJbkvY3nva7jgIJcclxuICAgICAgICB2YXIgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAgICAgdmFyIHBlcm1pdGVkX3VzZXI7XHJcbiAgICAgICAgdmFyIGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgLy9cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL2Nob29zZSB0aGUgaW5pdGlhbCBnaG9zdFxyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGUxID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMVwiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlMiA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjJcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTMgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIzXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGU0ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNFwiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlNSA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjVcIik7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUxKSB0aGlzLnBsYXllcl9ub2RlMS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMikgdGhpcy5wbGF5ZXJfbm9kZTIuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTMpIHRoaXMucGxheWVyX25vZGUzLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGU0KSB0aGlzLnBsYXllcl9ub2RlNC5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNSkgdGhpcy5wbGF5ZXJfbm9kZTUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTEpIHRoaXMucGxheWVyX25vZGUxLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUyKSB0aGlzLnBsYXllcl9ub2RlMi5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTQpIHRoaXMucGxheWVyX25vZGU0LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGU1KSB0aGlzLnBsYXllcl9ub2RlNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTSwgdHJ1ZSlcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoMC41KVxyXG4gICAgICAgICAgICAvLyDplovlp4voqIjmmYJcclxuICAgICAgICAgICAgdGhpcy5UaW1lclN0YXJ0KCk7XHJcbiAgICAgICAgfSwgMi41KTtcclxuXHJcbiAgICB9XHJcbiAgICAvLyBnZXRSYW5kb21JbnQobWF4KSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyB0aW1lclxyXG4gICAgVGltZXJTdGFydCgpIHtcclxuICAgICAgICB0aGlzLnRpbWVyID0gdGhpcy5HYW1lVGltZTtcclxuICAgICAgICB0aGlzLlRpbWVyTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkdhbWVUaW1lLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLlVwZGF0ZVRpbWVyLCAxKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZVRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVVcCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVyID4gMCkgdGhpcy50aW1lciArPSAtMTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnRpbWVyID09IDApIHRoaXMudGltZVVwID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlRpbWVyTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnRpbWVyLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVVcCkge1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVPdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZU92ZXIoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLkdhbWVPdmVyU291bmQsIGZhbHNlKTtcclxuICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuR2FtZW92ZXJCRy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzY29yZWJvYXJkID0gdGhpcy5HYW1lb3ZlckJHLmdldENoaWxkQnlOYW1lKFwiU2NvcmVcIik7XHJcbiAgICAgICAgbGV0IHNjb3JlcG9pbnQgPSBzY29yZWJvYXJkLmdldENoaWxkQnlOYW1lKFwiU2NvcmVwb2ludFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldCBjb2luID0gWzAsMCwwLDAsMF1cclxuICAgICAgICBmb3IobGV0IGk9MTtpPD01O2krKyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L2dhbWUyX3N0YXRlL21vbmV5YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3Qpe1xyXG4gICAgICAgICAgICAgICAgaWYoc25hcHNob3QudmFsKCkhPW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvaW5baS0xXSA9IHNuYXBzaG90LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBzY29yZWJvYXJkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gY29pblswXS50b1N0cmluZygpICsgXCIgIEJcIiArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBjb2luWzFdLnRvU3RyaW5nKCkgKyBcIiAgQlwiICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IGNvaW5bMl0udG9TdHJpbmcoKSArIFwiICBCXCIgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gY29pblszXS50b1N0cmluZygpICsgXCIgIEJcIiArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBjb2luWzRdLnRvU3RyaW5nKCkgKyBcIiAgQlwiO1xyXG4gICAgICAgICAgICBzY29yZXBvaW50LnN0cmluZyA9IHN0cjtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLlNjb3JlU291bmQsIGZhbHNlKTsgICAgICAgICAgICBcclxuICAgICAgICB9LCAzKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVFbmRcIik7XHJcbiAgICAgICAgfSwgMTApO1xyXG4gICAgfVxyXG4gICAgLy9cclxuXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMuY291bnRpbmcgPCA1KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lUmVzdWx0YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoY2hpbGRzaG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdfbW9uZXkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkc2hvdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyMSAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyMiAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyMyAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyNCAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3X21vbmV5ICs9IGVsZW1lbnQudmFsKCkucGxheWVyNSAvIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmNvdW50aW5nICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnBsYXllcl9hcnJheS5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogMjQwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvWWApLnNldCh7IHk6IC00OCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L2dhbWUyX3N0YXRlYCkuc2V0KHsgbW9uZXk6IG5ld19tb25leSwgcGFwZXI6IDIsIHNjaXNzb3I6IDIsIHN0b25lOiAyLCBmaWdodGluZzogXCJmYWxzZVwiLCBvcHBvbmVudDogXCJudWxsXCIsIGNhcmQ6IFwibnVsbFwiLCBjaGFsbGVuZ2VkOiBcImZhbHNlXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yZXNldCkge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcl9ub2RlfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IGNhcmQ6IFwibnVsbFwiLCBjaGFsbGVuZ2VkOiBcImZhbHNlXCIsIGZpZ2h0aW5nOiBcImZhbHNlXCIsIG9wcG9uZW50OiBcIm51bGxcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuZmlnaHRpbmcgJiYgIWhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmFjdGl2ZSAmJiAhaGFuZGxlLm9wcG9uZW50X2luZm9fY2hvaWNlLmFjdGl2ZSAmJiAhaGFuZGxlLmJhdHRsZV9maWVsZC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJfbm9kZX0vZ2FtZTJfc3RhdGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkuZmlnaHRpbmcgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5maWdodGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmdldENvbXBvbmVudChNaW5lX2luZm9fY2hvaWNlKS5vcHBvbmVudCA9IGhhbmRsZS5vcHBvbmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwicGFwZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkX251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFN0cmluZyhzbmFwc2hvdC52YWwoKS5wYXBlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5NaW5lX2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwic2Npc3NvclwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gU3RyaW5nKHNuYXBzaG90LnZhbCgpLnNjaXNzb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUuTWluZV9pbmZvX2Nob2ljZS5nZXRDaGlsZEJ5TmFtZShcInN0b25lXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBTdHJpbmcoc25hcHNob3QudmFsKCkuc3RvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBzbmFwc2hvdC52YWwoKS5vcHBvbmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmJhdHRsZV9maWVsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUuYmF0dGxlX2ZpZWxkLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLm1lX3JlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5iYXR0bGVfZmllbGQuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkub3Bwb25lbnRfcmVhZHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmJhdHRsZV9maWVsZC5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5vcHBvbmVudCA9IHNuYXBzaG90LnZhbCgpLm9wcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfdXNlcl9ub2RlID0gc25hcHNob3QudmFsKCkub3Bwb25lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGUuY2hhcmFjdGVyID09IFwiZXJ1ZGl0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtzbmFwc2hvdC52YWwoKS5vcHBvbmVudH0vZ2FtZTJfc3RhdGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChjaGlsZHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFwZXIgPSBjaGlsZHNob3QudmFsKCkucGFwZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjaXNzb3IgPSBjaGlsZHNob3QudmFsKCkuc2Npc3NvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RvbmUgPSBjaGlsZHNob3QudmFsKCkuc3RvbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvdGFsID0gcGFwZXIgKyBzY2lzc29yICsgc3RvbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwicGFwZXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkX251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGAkeyhwYXBlciAvIHRvdGFsKS50b0ZpeGVkKDIpfSVgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X2luZm9fY2hvaWNlLmdldENoaWxkQnlOYW1lKFwic2Npc3NvclwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYCR7KHNjaXNzb3IgLyB0b3RhbCkudG9GaXhlZCgyKX0lYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5vcHBvbmVudF9pbmZvX2Nob2ljZS5nZXRDaGlsZEJ5TmFtZShcInN0b25lXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgJHsoc3RvbmUgLyB0b3RhbCkudG9GaXhlZCgyKX0lYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5vcHBvbmVudF9pbmZvX2Nob2ljZS5nZXRDaGlsZEJ5TmFtZShcInBhcGVyXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIj8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuZ2V0Q2hpbGRCeU5hbWUoXCJzY2lzc29yXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIj8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuZ2V0Q2hpbGRCeU5hbWUoXCJzdG9uZVwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCI/P1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=