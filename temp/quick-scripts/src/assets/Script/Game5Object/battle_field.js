"use strict";
cc._RF.push(module, '9e68agIkCtLyKGaiZAteWD7', 'battle_field');
// Script/Game5Object/battle_field.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var panel_info_1 = require("./panel_info");
var battle_field = /** @class */ (function (_super) {
    __extends(battle_field, _super);
    function battle_field() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.gamemanager = null;
        _this.opponent_info_choice = null;
        _this.Mine_info_choice = null;
        _this.bet = null;
        _this.multiple = null;
        _this.message = null;
        _this.soundEffect = [];
        _this.opponent = "null";
        _this.my_choice = "null";
        _this.opponent_choice = "null";
        _this.opponent_ready = false;
        _this.me_ready = false;
        _this.win_lose = "null";
        _this.multiple_on = false;
        _this.reverse = false;
        _this.escape = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    battle_field.prototype.start = function () {
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
    };
    battle_field.prototype.show_card = function (type, person) {
        console.log(this.opponent_ready + " " + this.me_ready);
        cc.find("Canvas/UI/battle_field/" + person + "_" + type).active = true;
        //this.me_ready = true;
    };
    battle_field.prototype.match_result = function () {
        console.log(this.my_choice + " the fuck " + this.opponent_choice);
        var handle = this;
        if (!this.escape) {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state/reverse").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().reverse == 'absolute') {
                        handle.reverse = true;
                    }
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state/reverse").update({ reverse: "false" });
                }
            });
            switch (this.my_choice) {
                case "paper":
                    if (this.opponent_choice == "paper") {
                        //draw
                        cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "Draw";
                        //nothing happens
                    }
                    else if (this.opponent_choice == "scissor") {
                        //lose
                        this.lose();
                    }
                    else if (this.opponent_choice == "stone") {
                        //win
                        this.win();
                    }
                    break;
                case "scissor":
                    if (this.opponent_choice == "paper") {
                        //win
                        this.win();
                    }
                    else if (this.opponent_choice == "scissor") {
                        //draw
                        //nothing happens
                        cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "Draw";
                    }
                    else if (this.opponent_choice == "stone") {
                        //lose
                        this.lose();
                    }
                    break;
                case "stone":
                    if (this.opponent_choice == "paper") {
                        //lose
                        this.lose();
                    }
                    else if (this.opponent_choice == "scissor") {
                        //win
                        this.win();
                    }
                    else if (this.opponent_choice == "stone") {
                        //draw
                        //nothing happens
                        cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "Draw";
                    }
                    break;
            }
        }
        else {
            //reverse the score
            console.log('escape reverse');
            switch (this.my_choice) {
                case "paper":
                    var paper = this.panel.getComponent(panel_info_1.default).paper_left + 1;
                    this.panel.getComponent(panel_info_1.default).update_info("paper", paper);
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ paper: paper });
                    break;
                case "scissor":
                    var scissor = this.panel.getComponent(panel_info_1.default).scissor_left + 1;
                    this.panel.getComponent(panel_info_1.default).update_info("scissor", scissor);
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ scissor: scissor });
                    break;
                case "stone":
                    var stone = this.panel.getComponent(panel_info_1.default).stone_left + 1;
                    this.panel.getComponent(panel_info_1.default).update_info("stone", stone);
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ stone: stone });
                    break;
            }
            cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = 'Someone escape';
            this.escape = false;
        }
        this.bet.getComponent(cc.EditBox).string = "1";
        this.multiple.getComponent(cc.EditBox).string = "1";
        this.reverse = false;
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/WLMessage').active = true;
        }, 0.5);
        //also reset all the variable in other script
        firebase.database().ref("player_data/" + this.current_user + "/game2_state/escape").update({ escape: "false" });
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ card: "null", challenged: "false", fighting: "false", opponent: "null" });
        handle.gamemanager.getComponent(GameManagerS5_1.default).fighting = false;
        handle.gamemanager.getComponent(GameManagerS5_1.default).reset = true;
        handle.Mine_info_choice.active = false;
        handle.opponent_info_choice.active = false;
        this.scheduleOnce(function () {
            cc.find("Canvas/UI/battle_field/opponent_" + this.opponent_choice).active = false;
            cc.find("Canvas/UI/battle_field/Mine_" + this.my_choice).active = false;
            cc.find('Canvas/UI/Mine_info_choice/gambler_ability').getComponent(cc.Button).interactable = true;
            cc.find('Canvas/UI/Mine_info_choice/bet_confirm').getComponent(cc.Button).interactable = true;
            this.opponent = "null";
            this.my_choice = "null";
            this.opponent_choice = "null";
            cc.find('Canvas/UI/WLMessage').active = false;
            this.multiple_on = false;
            this.node.active = false;
        }, 3);
    };
    battle_field.prototype.win = function () {
        if (this.reverse) {
            this.reverse = false;
            this.lose();
        }
        else {
            //life +1
            console.log("win");
            var handle_1 = this;
            firebase.database().ref("player_data/" + this.opponent + "/game2_state/bet").once('value', function (snapshot) {
                firebase.database().ref("player_data/" + handle_1.current_user + "/game2_state/bet").once('value', function (smallsnapshot) {
                    var bet_money = Math.max(parseInt(snapshot.val().bet, 10), parseInt(smallsnapshot.val().bet, 10));
                    if (handle_1.multiple_on) {
                        firebase.database().ref("player_data/" + handle_1.current_user + "/game2_state/multiple").once('value', function (snap) {
                            if (snap.val() == null) {
                                var new_money = handle_1.panel.getComponent(panel_info_1.default).money_left + bet_money;
                                handle_1.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = handle_1.current_user + " win \n Gain " + bet_money + " money";
                            }
                            else {
                                var multiple = snap.val().multiple;
                                var new_money = handle_1.panel.getComponent(panel_info_1.default).money_left + bet_money * parseInt(multiple, 10);
                                console.log("win " + bet_money * parseInt(multiple, 10));
                                handle_1.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = handle_1.current_user + " win \n Gain " + bet_money * parseInt(multiple, 10) + " money";
                            }
                        });
                    }
                    else {
                        firebase.database().ref("player_data/" + handle_1.opponent + "/game2_state/multiple").once('value', function (snap) {
                            if (snap.val() == null) {
                                var new_money = handle_1.panel.getComponent(panel_info_1.default).money_left + bet_money;
                                handle_1.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = handle_1.current_user + " win \n Gain " + bet_money + " money";
                            }
                            else {
                                var multiple = snap.val().multiple;
                                var new_money = handle_1.panel.getComponent(panel_info_1.default).money_left + bet_money * parseInt(multiple, 10);
                                handle_1.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = handle_1.current_user + " win \n Gain " + bet_money * parseInt(multiple, 10) + " money";
                            }
                        });
                    }
                });
            });
            cc.audioEngine.playEffect(this.soundEffect[0], false);
        }
    };
    battle_field.prototype.lose = function () {
        if (this.reverse) {
            this.reverse = false;
            this.win();
        }
        else {
            console.log("lose");
            var handle_2 = this;
            firebase.database().ref("player_data/" + this.opponent + "/game2_state/bet").once('value', function (snapshot) {
                firebase.database().ref("player_data/" + handle_2.current_user + "/game2_state/bet").once('value', function (smallsnapshot) {
                    var bet_money = Math.max(parseInt(snapshot.val().bet, 10), parseInt(smallsnapshot.val().bet, 10));
                    console.log(parseInt(snapshot.val().bet, 10));
                    console.log(parseInt(smallsnapshot.val().bet, 10));
                    console.log("bet_money = " + bet_money + " ");
                    if (handle_2.multiple_on) {
                        console.log("multiple on lose");
                        firebase.database().ref("player_data/" + handle_2.current_user + "/game2_state/multiple").once('value', function (snap) {
                            if (snap.val() == null) {
                                var new_money = handle_2.panel.getComponent(panel_info_1.default).money_left - bet_money;
                                handle_2.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "You lose \n Loss " + bet_money + " money";
                            }
                            else {
                                var multiple = snap.val().multiple;
                                var new_money = handle_2.panel.getComponent(panel_info_1.default).money_left - bet_money * parseInt(multiple, 10);
                                handle_2.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "You lose \n Loss " + bet_money * parseInt(multiple, 10) + " money";
                            }
                        });
                    }
                    else {
                        firebase.database().ref("player_data/" + handle_2.opponent + "/game2_state/multiple").once('value', function (snap) {
                            if (snap.val() == null) {
                                var new_money = handle_2.panel.getComponent(panel_info_1.default).money_left - bet_money;
                                handle_2.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "You lose \n Loss " + bet_money + " money";
                            }
                            else {
                                var multiple = snap.val().multiple;
                                var new_money = handle_2.panel.getComponent(panel_info_1.default).money_left - bet_money * parseInt(multiple, 10);
                                handle_2.panel.getComponent(panel_info_1.default).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = "You lose \n Loss " + bet_money * parseInt(multiple, 10) + " money";
                            }
                        });
                    }
                });
            });
            cc.audioEngine.playEffect(this.soundEffect[1], false);
        }
    };
    battle_field.prototype.update = function (dt) {
        //console.log(this.opponent_ready +" "+ this.opponent)
        if (this.opponent_ready == false && this.opponent != 'null') {
            var handle_3 = this;
            //console.log('not start?? '+this.opponent)
            firebase.database().ref("player_data/" + this.opponent + "/game2_state").once('value', function (snapshot) {
                var choice = snapshot.val().card;
                if (choice != 'null') {
                    console.log("choice: " + choice);
                    handle_3.opponent_choice = choice;
                    handle_3.opponent_ready = true;
                    console.log("only here is true: " + handle_3.opponent_ready);
                }
            });
        }
        if (this.opponent_ready == true && this.me_ready == true) {
            console.log("???" + this.opponent_ready + " " + this.me_ready);
            this.opponent_ready = false;
            this.me_ready = false;
            this.show_card(this.opponent_choice, "opponent");
            //get the match result;
            this.scheduleOnce(function () {
                this.match_result();
            }, 2);
        }
        if (this.opponent == "null") {
            var handle_4 = this;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").once('value', function (snapshot) {
                handle_4.opponent = snapshot.val().opponent;
            });
        }
        if (this.escape == false) {
            var handle_5 = this;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state/escape").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().escape == 'absolute') {
                        console.log("absolute???????????????");
                        handle_5.escape = true;
                    }
                }
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "panel", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "gamemanager", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "opponent_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "Mine_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "bet", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "multiple", void 0);
    __decorate([
        property(cc.Node)
    ], battle_field.prototype, "message", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], battle_field.prototype, "soundEffect", void 0);
    battle_field = __decorate([
        ccclass
    ], battle_field);
    return battle_field;
}(cc.Component));
exports.default = battle_field;

cc._RF.pop();