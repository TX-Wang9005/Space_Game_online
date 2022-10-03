
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/battle_field.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcYmF0dGxlX2ZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLDhEQUF5RDtBQUN6RCwyQ0FBc0M7QUFHdEM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFpVEM7UUEvU0csV0FBSyxHQUFZLElBQUksQ0FBQztRQUV0QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QiwwQkFBb0IsR0FBWSxJQUFJLENBQUM7UUFFckMsc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFFcEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBRXhCLGlCQUFXLEdBQW1CLEVBQUUsQ0FBQztRQUdqQyxjQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLGVBQVMsR0FBRyxNQUFNLENBQUM7UUFDbkIscUJBQWUsR0FBRyxNQUFNLENBQUM7UUFDekIsb0JBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLGlCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGFBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsWUFBTSxHQUFHLEtBQUssQ0FBQzs7SUFzUm5CLENBQUM7SUFsUkcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZiw0QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxD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RyxDQUFDLGlCQUFlLElBQUksQ0FBQyxZQUFZLHdCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLFFBQVE7Z0JBQzNHLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDeEIsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxJQUFJLFVBQVUsRUFBRTt3QkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO3dCQUN0QyxRQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztxQkFDeEI7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBRUwsQ0FBQztJQTlTRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4REFDbUI7SUFFckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDZTtJQUVqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNFO0lBRXBCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ087SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7cURBQ0E7SUFoQmhCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FpVGhDO0lBQUQsbUJBQUM7Q0FqVEQsQUFpVEMsQ0FqVHlDLEVBQUUsQ0FBQyxTQUFTLEdBaVRyRDtrQkFqVG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJTNSBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJTNVwiO1xyXG5pbXBvcnQgcGFuZWxfaW5mbyBmcm9tIFwiLi9wYW5lbF9pbmZvXCI7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmF0dGxlX2ZpZWxkIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBnYW1lbWFuYWdlcjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG9wcG9uZW50X2luZm9fY2hvaWNlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTWluZV9pbmZvX2Nob2ljZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJldDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG11bHRpcGxlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbWVzc2FnZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5BdWRpb0NsaXAgfSlcclxuICAgIHNvdW5kRWZmZWN0OiBjYy5BdWRpb0NsaXBbXSA9IFtdO1xyXG5cclxuICAgIGN1cnJlbnRfdXNlcjtcclxuICAgIG9wcG9uZW50ID0gXCJudWxsXCI7XHJcbiAgICBteV9jaG9pY2UgPSBcIm51bGxcIjtcclxuICAgIG9wcG9uZW50X2Nob2ljZSA9IFwibnVsbFwiO1xyXG4gICAgb3Bwb25lbnRfcmVhZHkgPSBmYWxzZTtcclxuICAgIG1lX3JlYWR5ID0gZmFsc2U7XHJcbiAgICB3aW5fbG9zZSA9IFwibnVsbFwiO1xyXG4gICAgbXVsdGlwbGVfb24gPSBmYWxzZTtcclxuICAgIHJldmVyc2UgPSBmYWxzZTtcclxuICAgIGVzY2FwZSA9IGZhbHNlO1xyXG5cclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3VzZXIgPSBjYy5maW5kKFwiR2FtZU1hbmFnZXJcIikuZ2V0Q29tcG9uZW50KEdhbWVNYW5hZ2VyUzUpLmN1cnJlbnRfdXNlcl9ub2RlO1xyXG4gICAgfVxyXG4gICAgc2hvd19jYXJkKHR5cGU6IHN0cmluZywgcGVyc29uOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wcG9uZW50X3JlYWR5ICsgXCIgXCIgKyB0aGlzLm1lX3JlYWR5KVxyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9iYXR0bGVfZmllbGQvJHtwZXJzb259XyR7dHlwZX1gKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vdGhpcy5tZV9yZWFkeSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBtYXRjaF9yZXN1bHQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5teV9jaG9pY2UgKyBcIiB0aGUgZnVjayBcIiArIHRoaXMub3Bwb25lbnRfY2hvaWNlKVxyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZXNjYXBlKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZS9yZXZlcnNlYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpLnJldmVyc2UgPT0gJ2Fic29sdXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucmV2ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZS9yZXZlcnNlYCkudXBkYXRlKHsgcmV2ZXJzZTogXCJmYWxzZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubXlfY2hvaWNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicGFwZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHBvbmVudF9jaG9pY2UgPT0gXCJwYXBlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZHJhd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgRHJhd2A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbm90aGluZyBoYXBwZW5zXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic2Npc3NvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9zZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vcHBvbmVudF9jaG9pY2UgPT0gXCJzdG9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2luXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNjaXNzb3JcIjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHBvbmVudF9jaG9pY2UgPT0gXCJwYXBlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2luXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic2Npc3NvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZHJhd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25vdGhpbmcgaGFwcGVuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgRHJhd2A7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic3RvbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xvc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInN0b25lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwicGFwZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xvc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic2Npc3NvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2luXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3Bwb25lbnRfY2hvaWNlID09IFwic3RvbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RyYXdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ub3RoaW5nIGhhcHBlbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL1dMTWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYERyYXdgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9yZXZlcnNlIHRoZSBzY29yZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXNjYXBlIHJldmVyc2UnKVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubXlfY2hvaWNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicGFwZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFwZXIgPSB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5wYXBlcl9sZWZ0ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS51cGRhdGVfaW5mbyhcInBhcGVyXCIsIHBhcGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGVgKS51cGRhdGUoeyBwYXBlcjogcGFwZXIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2Npc3NvclwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2lzc29yID0gdGhpcy5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykuc2Npc3Nvcl9sZWZ0ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS51cGRhdGVfaW5mbyhcInNjaXNzb3JcIiwgc2Npc3Nvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgc2Npc3Nvcjogc2Npc3NvciB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzdG9uZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdG9uZSA9IHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnN0b25lX2xlZnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwic3RvbmVcIiwgc3RvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IHN0b25lOiBzdG9uZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnU29tZW9uZSBlc2NhcGUnO1xyXG4gICAgICAgICAgICB0aGlzLmVzY2FwZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5iZXQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZyA9IFwiMVwiO1xyXG4gICAgICAgIHRoaXMubXVsdGlwbGUuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZyA9IFwiMVwiO1xyXG4gICAgICAgIHRoaXMucmV2ZXJzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL1dMTWVzc2FnZScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSwgMC41KVxyXG5cclxuICAgICAgICAvL2Fsc28gcmVzZXQgYWxsIHRoZSB2YXJpYWJsZSBpbiBvdGhlciBzY3JpcHRcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGUvZXNjYXBlYCkudXBkYXRlKHsgZXNjYXBlOiBcImZhbHNlXCIgfSk7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgY2FyZDogXCJudWxsXCIsIGNoYWxsZW5nZWQ6IFwiZmFsc2VcIiwgZmlnaHRpbmc6IFwiZmFsc2VcIiwgb3Bwb25lbnQ6IFwibnVsbFwiIH0pO1xyXG4gICAgICAgIGhhbmRsZS5nYW1lbWFuYWdlci5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuZmlnaHRpbmcgPSBmYWxzZTtcclxuICAgICAgICBoYW5kbGUuZ2FtZW1hbmFnZXIuZ2V0Q29tcG9uZW50KEdhbWVNYW5hZ2VyUzUpLnJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICBoYW5kbGUuTWluZV9pbmZvX2Nob2ljZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvYmF0dGxlX2ZpZWxkL29wcG9uZW50XyR7dGhpcy5vcHBvbmVudF9jaG9pY2V9YCkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9iYXR0bGVfZmllbGQvTWluZV8ke3RoaXMubXlfY2hvaWNlfWApLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9nYW1ibGVyX2FiaWxpdHknKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9iZXRfY29uZmlybScpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub3Bwb25lbnQgPSBcIm51bGxcIjtcclxuICAgICAgICAgICAgdGhpcy5teV9jaG9pY2UgPSBcIm51bGxcIjtcclxuICAgICAgICAgICAgdGhpcy5vcHBvbmVudF9jaG9pY2UgPSBcIm51bGxcIjtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL1dMTWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlX29uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCAzKVxyXG5cclxuICAgIH1cclxuICAgIHdpbigpIHtcclxuICAgICAgICBpZiAodGhpcy5yZXZlcnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV2ZXJzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvL2xpZmUgKzFcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aW5cIilcclxuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLm9wcG9uZW50fS9nYW1lMl9zdGF0ZS9iZXRgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7aGFuZGxlLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGUvYmV0YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc21hbGxzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiZXRfbW9uZXkgPSBNYXRoLm1heChwYXJzZUludChzbmFwc2hvdC52YWwoKS5iZXQsIDEwKSwgcGFyc2VJbnQoc21hbGxzbmFwc2hvdC52YWwoKS5iZXQsIDEwKSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlLm11bHRpcGxlX29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL211bHRpcGxlYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXAudmFsKCkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdfbW9uZXkgPSBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLm1vbmV5X2xlZnQgKyBiZXRfbW9uZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS51cGRhdGVfaW5mbyhcIm1vbmV5XCIsIG5ld19tb25leSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL1dMTWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7aGFuZGxlLmN1cnJlbnRfdXNlcn0gd2luIFxcbiBHYWluICR7YmV0X21vbmV5fSBtb25leWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtdWx0aXBsZSA9IHNuYXAudmFsKCkubXVsdGlwbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld19tb25leSA9IGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykubW9uZXlfbGVmdCArIGJldF9tb25leSAqIHBhcnNlSW50KG11bHRpcGxlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aW4gXCIgKyBiZXRfbW9uZXkgKiBwYXJzZUludChtdWx0aXBsZSwgMTApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykudXBkYXRlX2luZm8oXCJtb25leVwiLCBuZXdfbW9uZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9XTE1lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2hhbmRsZS5jdXJyZW50X3VzZXJ9IHdpbiBcXG4gR2FpbiAke2JldF9tb25leSAqIHBhcnNlSW50KG11bHRpcGxlLCAxMCl9IG1vbmV5YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7aGFuZGxlLm9wcG9uZW50fS9nYW1lMl9zdGF0ZS9tdWx0aXBsZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbmFwLnZhbCgpID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3X21vbmV5ID0gaGFuZGxlLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5tb25leV9sZWZ0ICsgYmV0X21vbmV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykudXBkYXRlX2luZm8oXCJtb25leVwiLCBuZXdfbW9uZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9XTE1lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2hhbmRsZS5jdXJyZW50X3VzZXJ9IHdpbiBcXG4gR2FpbiAke2JldF9tb25leX0gbW9uZXlgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXVsdGlwbGUgPSBzbmFwLnZhbCgpLm11bHRpcGxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdfbW9uZXkgPSBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLm1vbmV5X2xlZnQgKyBiZXRfbW9uZXkgKiBwYXJzZUludChtdWx0aXBsZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykudXBkYXRlX2luZm8oXCJtb25leVwiLCBuZXdfbW9uZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9XTE1lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2hhbmRsZS5jdXJyZW50X3VzZXJ9IHdpbiBcXG4gR2FpbiAke2JldF9tb25leSAqIHBhcnNlSW50KG11bHRpcGxlLCAxMCl9IG1vbmV5YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zb3VuZEVmZmVjdFswXSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmV2ZXJzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldmVyc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy53aW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9zZVwiKVxyXG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5vcHBvbmVudH0vZ2FtZTJfc3RhdGUvYmV0YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL2JldGApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNtYWxsc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmV0X21vbmV5ID0gTWF0aC5tYXgocGFyc2VJbnQoc25hcHNob3QudmFsKCkuYmV0LCAxMCksIHBhcnNlSW50KHNtYWxsc25hcHNob3QudmFsKCkuYmV0LCAxMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyc2VJbnQoc25hcHNob3QudmFsKCkuYmV0LCAxMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyc2VJbnQoc21hbGxzbmFwc2hvdC52YWwoKS5iZXQsIDEwKSlcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgYmV0X21vbmV5ID0gJHtiZXRfbW9uZXl9IGApXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZS5tdWx0aXBsZV9vbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm11bHRpcGxlIG9uIGxvc2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7aGFuZGxlLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGUvbXVsdGlwbGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc25hcC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld19tb25leSA9IGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykubW9uZXlfbGVmdCAtIGJldF9tb25leTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwibW9uZXlcIiwgbmV3X21vbmV5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgWW91IGxvc2UgXFxuIExvc3MgJHtiZXRfbW9uZXl9IG1vbmV5YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG11bHRpcGxlID0gc25hcC52YWwoKS5tdWx0aXBsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3X21vbmV5ID0gaGFuZGxlLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5tb25leV9sZWZ0IC0gYmV0X21vbmV5ICogcGFyc2VJbnQobXVsdGlwbGUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwibW9uZXlcIiwgbmV3X21vbmV5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgWW91IGxvc2UgXFxuIExvc3MgJHtiZXRfbW9uZXkgKiBwYXJzZUludChtdWx0aXBsZSwgMTApfSBtb25leWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5vcHBvbmVudH0vZ2FtZTJfc3RhdGUvbXVsdGlwbGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc25hcC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld19tb25leSA9IGhhbmRsZS5wYW5lbC5nZXRDb21wb25lbnQocGFuZWxfaW5mbykubW9uZXlfbGVmdCAtIGJldF9tb25leTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwibW9uZXlcIiwgbmV3X21vbmV5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgWW91IGxvc2UgXFxuIExvc3MgJHtiZXRfbW9uZXl9IG1vbmV5YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG11bHRpcGxlID0gc25hcC52YWwoKS5tdWx0aXBsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3X21vbmV5ID0gaGFuZGxlLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5tb25leV9sZWZ0IC0gYmV0X21vbmV5ICogcGFyc2VJbnQobXVsdGlwbGUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwibW9uZXlcIiwgbmV3X21vbmV5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvV0xNZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgWW91IGxvc2UgXFxuIExvc3MgJHtiZXRfbW9uZXkgKiBwYXJzZUludChtdWx0aXBsZSwgMTApfSBtb25leWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc291bmRFZmZlY3RbMV0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLm9wcG9uZW50X3JlYWR5ICtcIiBcIisgdGhpcy5vcHBvbmVudClcclxuICAgICAgICBpZiAodGhpcy5vcHBvbmVudF9yZWFkeSA9PSBmYWxzZSAmJiB0aGlzLm9wcG9uZW50ICE9ICdudWxsJykge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbm90IHN0YXJ0Pz8gJyt0aGlzLm9wcG9uZW50KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLm9wcG9uZW50fS9nYW1lMl9zdGF0ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hvaWNlID0gc25hcHNob3QudmFsKCkuY2FyZDtcclxuICAgICAgICAgICAgICAgIGlmIChjaG9pY2UgIT0gJ251bGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaG9pY2U6IFwiICsgY2hvaWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5vcHBvbmVudF9jaG9pY2UgPSBjaG9pY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm9wcG9uZW50X3JlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9ubHkgaGVyZSBpcyB0cnVlOiBcIiArIGhhbmRsZS5vcHBvbmVudF9yZWFkeSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wcG9uZW50X3JlYWR5ID09IHRydWUgJiYgdGhpcy5tZV9yZWFkeSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPz8/XCIgKyB0aGlzLm9wcG9uZW50X3JlYWR5ICsgXCIgXCIgKyB0aGlzLm1lX3JlYWR5KVxyXG4gICAgICAgICAgICB0aGlzLm9wcG9uZW50X3JlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWVfcmVhZHkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd19jYXJkKHRoaXMub3Bwb25lbnRfY2hvaWNlLCBcIm9wcG9uZW50XCIpO1xyXG4gICAgICAgICAgICAvL2dldCB0aGUgbWF0Y2ggcmVzdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoX3Jlc3VsdCgpO1xyXG4gICAgICAgICAgICB9LCAyKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3Bwb25lbnQgPT0gXCJudWxsXCIpIHtcclxuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGUub3Bwb25lbnQgPSBzbmFwc2hvdC52YWwoKS5vcHBvbmVudDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVzY2FwZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL2VzY2FwZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKS5lc2NhcGUgPT0gJ2Fic29sdXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFic29sdXRlPz8/Pz8/Pz8/Pz8/Pz8/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5lc2NhcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==