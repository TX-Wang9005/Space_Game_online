"use strict";
cc._RF.push(module, 'dcb0clOYw5MPrT+MMODsvmK', 'Mine_info_choice');
// Script/Game5Object/Mine_info_choice.ts

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
var panel_info_1 = require("./panel_info");
var battle_field_1 = require("./battle_field");
var Mine_info_choice = /** @class */ (function (_super) {
    __extends(Mine_info_choice, _super);
    function Mine_info_choice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.bet = null;
        _this.multiple = null;
        _this.battle_field = null;
        _this.click = null;
        return _this;
        // update(dt) {
        // }
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Mine_info_choice.prototype.start = function () {
        //this.current_user = cc.find("GameManager").getComponent(GameManagerS2).current_user_node;
        var paper_click = new cc.Component.EventHandler();
        paper_click.target = this.node;
        paper_click.component = "Mine_info_choice";
        paper_click.handler = "paper";
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).clickEvents.push(paper_click);
        var stone_click = new cc.Component.EventHandler();
        stone_click.target = this.node;
        stone_click.component = "Mine_info_choice";
        stone_click.handler = "stone";
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).clickEvents.push(stone_click);
        var scissor_click = new cc.Component.EventHandler();
        scissor_click.target = this.node;
        scissor_click.component = "Mine_info_choice";
        scissor_click.handler = "scissor";
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).clickEvents.push(scissor_click);
        var bet_confirm = new cc.Component.EventHandler();
        bet_confirm.target = this.node;
        bet_confirm.component = "Mine_info_choice";
        bet_confirm.handler = "betting";
        cc.find("Canvas/UI/Mine_info_choice/bet_confirm").getComponent(cc.Button).clickEvents.push(bet_confirm);
        var gamble_this = new cc.Component.EventHandler();
        gamble_this.target = this.node;
        gamble_this.component = "Mine_info_choice";
        gamble_this.handler = "betting_multiple";
        cc.find("Canvas/UI/Mine_info_choice/gambler_ability").getComponent(cc.Button).clickEvents.push(gamble_this);
        var reverse_this = new cc.Component.EventHandler();
        reverse_this.target = this.node;
        reverse_this.component = "Mine_info_choice";
        reverse_this.handler = "switch_result";
        cc.find("Canvas/UI/Mine_info_choice/switch_result").getComponent(cc.Button).clickEvents.push(reverse_this);
        var escape_this = new cc.Component.EventHandler();
        escape_this.target = this.node;
        escape_this.component = "Mine_info_choice";
        escape_this.handler = "escape_battle";
        cc.find("Canvas/UI/Mine_info_choice/escape").getComponent(cc.Button).clickEvents.push(escape_this);
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
    };
    Mine_info_choice.prototype.escape_battle = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.battle_field.getComponent(battle_field_1.default).escape = true;
        firebase.database().ref("player_data/" + this.opponent + "/game2_state/escape").set({ escape: "absolute" });
        var fadeout = cc.fadeOut(5.0);
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Escape active";
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1);
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    };
    Mine_info_choice.prototype.switch_result = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.battle_field.getComponent(battle_field_1.default).reverse = true;
        firebase.database().ref("player_data/" + this.opponent + "/game2_state/reverse").set({ reverse: "absolute" });
        var fadeout = cc.fadeOut(5.0);
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Reverse active";
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1);
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    };
    Mine_info_choice.prototype.betting_multiple = function () {
        cc.audioEngine.playEffect(this.click, false);
        var str = this.multiple.getComponent(cc.EditBox).string;
        if (Number(str) >= 5)
            str = "5";
        firebase.database().ref("player_data/" + this.current_user + "/game2_state/multiple").set({ multiple: str });
        this.battle_field.getComponent(battle_field_1.default).multiple_on = true;
        cc.find('Canvas/UI/Mine_info_choice/gambler_ability').getComponent(cc.Button).interactable = false;
    };
    Mine_info_choice.prototype.betting = function () {
        cc.audioEngine.playEffect(this.click, false);
        // let str = this.bet.getComponent(cc.EditBox).string;
        // if (Number(str) > this.panel.getComponent(panel_info).money_left) {
        //     let fadeout = cc.fadeOut(5.0)
        //     this.scheduleOnce(function () {
        //         cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Not enough money";
        //         cc.find('Canvas/UI/hint_message').active = true;
        //         cc.find('Canvas/UI/hint_message').runAction(fadeout);
        //     }, 0.1)
        //     cc.find('Canvas/UI/hint_message').active = false;
        //     cc.find('Canvas/UI/hint_message').opacity = 255;
        //     return;
        // }
        firebase.database().ref("player_data/" + this.current_user + "/game2_state/bet").set({ bet: this.bet.getComponent(cc.EditBox).string });
        cc.find('Canvas/UI/Mine_info_choice/bet_confirm').getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = true;
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = true;
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = true;
    };
    Mine_info_choice.prototype.paper = function () {
        cc.audioEngine.playEffect(this.click, false);
        var new_paper = this.panel.getComponent(panel_info_1.default).paper_left - 1;
        console.log(new_paper);
        console.log("qwer");
        if (new_paper >= 0) {
            this.panel.getComponent(panel_info_1.default).update_info("paper", new_paper);
            cc.find("Canvas/UI/battle_field/Mine_paper").active = true;
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).my_choice = "paper";
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).show_card('paper', "Mine");
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).me_ready = true;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ card: "paper" });
            this.node.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = String(new_paper);
            cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        }
        else {
            //can't select paper because you don't have paper card anymore
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "No Paper";
            var fadeout_1 = cc.fadeOut(2.0);
            this.scheduleOnce(function () {
                cc.find('Canvas/UI/hint_message').active = true;
                cc.find('Canvas/UI/hint_message').runAction(fadeout_1);
            }, 0.1);
            cc.find('Canvas/UI/hint_message').active = false;
            cc.find('Canvas/UI/hint_message').opacity = 255;
        }
        //get the paper info
    };
    Mine_info_choice.prototype.scissor = function () {
        cc.audioEngine.playEffect(this.click, false);
        var new_scissor = this.panel.getComponent(panel_info_1.default).scissor_left - 1;
        if (new_scissor >= 0) {
            this.panel.getComponent(panel_info_1.default).update_info("scissor", new_scissor);
            cc.find("Canvas/UI/battle_field/Mine_scissor").active = true;
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).my_choice = "scissor";
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).show_card('scissor', "Mine");
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).me_ready = true;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ card: "scissor" });
            this.node.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = String(new_scissor);
            cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        }
        else {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "No Scissors";
            var fadeout_2 = cc.fadeOut(2.0);
            this.scheduleOnce(function () {
                cc.find('Canvas/UI/hint_message').active = true;
                cc.find('Canvas/UI/hint_message').runAction(fadeout_2);
            }, 0.1);
            cc.find('Canvas/UI/hint_message').active = false;
            cc.find('Canvas/UI/hint_message').opacity = 255;
        }
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        //get scissor info
    };
    Mine_info_choice.prototype.stone = function () {
        cc.audioEngine.playEffect(this.click, false);
        var new_stone = this.panel.getComponent(panel_info_1.default).stone_left - 1;
        if (new_stone >= 0) {
            this.panel.getComponent(panel_info_1.default).update_info("stone", new_stone);
            cc.find("Canvas/UI/battle_field/Mine_stone").active = true;
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).my_choice = "stone";
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).show_card('stone', "Mine");
            cc.find("Canvas/UI/battle_field").getComponent(battle_field_1.default).me_ready = true;
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ card: "stone" });
            this.node.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = String(new_stone);
            cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
            cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        }
        else {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "No Stone";
            var fadeout_3 = cc.fadeOut(2.0);
            this.scheduleOnce(function () {
                cc.find('Canvas/UI/hint_message').active = true;
                cc.find('Canvas/UI/hint_message').runAction(fadeout_3);
            }, 0.1);
            cc.find('Canvas/UI/hint_message').active = false;
            cc.find('Canvas/UI/hint_message').opacity = 255;
        }
        cc.find("Canvas/UI/Mine_info_choice/paper").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/scissor").getComponent(cc.Button).interactable = false;
        cc.find("Canvas/UI/Mine_info_choice/stone").getComponent(cc.Button).interactable = false;
        //get stone info
    };
    __decorate([
        property(cc.Node)
    ], Mine_info_choice.prototype, "panel", void 0);
    __decorate([
        property(cc.Node)
    ], Mine_info_choice.prototype, "bet", void 0);
    __decorate([
        property(cc.Node)
    ], Mine_info_choice.prototype, "multiple", void 0);
    __decorate([
        property(cc.Node)
    ], Mine_info_choice.prototype, "battle_field", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Mine_info_choice.prototype, "click", void 0);
    Mine_info_choice = __decorate([
        ccclass
    ], Mine_info_choice);
    return Mine_info_choice;
}(cc.Component));
exports.default = Mine_info_choice;

cc._RF.pop();