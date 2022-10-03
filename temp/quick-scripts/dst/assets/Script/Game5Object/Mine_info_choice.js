
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/Mine_info_choice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcTWluZV9pbmZvX2Nob2ljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QywyQ0FBc0M7QUFDdEMsK0NBQTBDO0FBSTFDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBc05DO1FBbk5HLFdBQUssR0FBWSxJQUFJLENBQUM7UUFFdEIsU0FBRyxHQUFZLElBQUksQ0FBQztRQUVwQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQUssR0FBaUIsSUFBSSxDQUFDOztRQXdNM0IsZUFBZTtRQUVmLElBQUk7SUFDUixDQUFDO0lBcE1HLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYsZ0NBQUssR0FBTDtRQUNJLDJGQUEyRjtRQUMzRixJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7UUFDM0MsV0FBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDOUIsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRyxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMs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SUFFcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNXO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7bURBQ0k7SUFYVixnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQXNOcEM7SUFBRCx1QkFBQztDQXRORCxBQXNOQyxDQXRONkMsRUFBRSxDQUFDLFNBQVMsR0FzTnpEO2tCQXROb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuaW1wb3J0IHBhbmVsX2luZm8gZnJvbSBcIi4vcGFuZWxfaW5mb1wiO1xyXG5pbXBvcnQgYmF0dGxlX2ZpZWxkIGZyb20gXCIuL2JhdHRsZV9maWVsZFwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJTNSBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJTNVwiO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmVfaW5mb19jaG9pY2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcGFuZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBtdWx0aXBsZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJhdHRsZV9maWVsZDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgY2xpY2s6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgY3VycmVudF91c2VyO1xyXG4gICAgb3Bwb25lbnQ7XHJcblxyXG5cclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICAvL3RoaXMuY3VycmVudF91c2VyID0gY2MuZmluZChcIkdhbWVNYW5hZ2VyXCIpLmdldENvbXBvbmVudChHYW1lTWFuYWdlclMyKS5jdXJyZW50X3VzZXJfbm9kZTtcclxuICAgICAgICBsZXQgcGFwZXJfY2xpY2sgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIHBhcGVyX2NsaWNrLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBwYXBlcl9jbGljay5jb21wb25lbnQgPSBcIk1pbmVfaW5mb19jaG9pY2VcIjtcclxuICAgICAgICBwYXBlcl9jbGljay5oYW5kbGVyID0gXCJwYXBlclwiO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChwYXBlcl9jbGljayk7XHJcbiAgICAgICAgbGV0IHN0b25lX2NsaWNrID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBzdG9uZV9jbGljay50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgc3RvbmVfY2xpY2suY29tcG9uZW50ID0gXCJNaW5lX2luZm9fY2hvaWNlXCI7XHJcbiAgICAgICAgc3RvbmVfY2xpY2suaGFuZGxlciA9IFwic3RvbmVcIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zdG9uZWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goc3RvbmVfY2xpY2spO1xyXG4gICAgICAgIGxldCBzY2lzc29yX2NsaWNrID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBzY2lzc29yX2NsaWNrLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBzY2lzc29yX2NsaWNrLmNvbXBvbmVudCA9IFwiTWluZV9pbmZvX2Nob2ljZVwiO1xyXG4gICAgICAgIHNjaXNzb3JfY2xpY2suaGFuZGxlciA9IFwic2Npc3NvclwiO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3NjaXNzb3JgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHNjaXNzb3JfY2xpY2spO1xyXG4gICAgICAgIGxldCBiZXRfY29uZmlybSA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgYmV0X2NvbmZpcm0udGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJldF9jb25maXJtLmNvbXBvbmVudCA9IFwiTWluZV9pbmZvX2Nob2ljZVwiO1xyXG4gICAgICAgIGJldF9jb25maXJtLmhhbmRsZXIgPSBcImJldHRpbmdcIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9iZXRfY29uZmlybWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goYmV0X2NvbmZpcm0pO1xyXG4gICAgICAgIGxldCBnYW1ibGVfdGhpcyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgZ2FtYmxlX3RoaXMudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGdhbWJsZV90aGlzLmNvbXBvbmVudCA9IFwiTWluZV9pbmZvX2Nob2ljZVwiO1xyXG4gICAgICAgIGdhbWJsZV90aGlzLmhhbmRsZXIgPSBcImJldHRpbmdfbXVsdGlwbGVcIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9nYW1ibGVyX2FiaWxpdHlgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGdhbWJsZV90aGlzKTtcclxuICAgICAgICBsZXQgcmV2ZXJzZV90aGlzID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICByZXZlcnNlX3RoaXMudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHJldmVyc2VfdGhpcy5jb21wb25lbnQgPSBcIk1pbmVfaW5mb19jaG9pY2VcIjtcclxuICAgICAgICByZXZlcnNlX3RoaXMuaGFuZGxlciA9IFwic3dpdGNoX3Jlc3VsdFwiO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3N3aXRjaF9yZXN1bHRgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHJldmVyc2VfdGhpcyk7XHJcbiAgICAgICAgbGV0IGVzY2FwZV90aGlzID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBlc2NhcGVfdGhpcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZXNjYXBlX3RoaXMuY29tcG9uZW50ID0gXCJNaW5lX2luZm9fY2hvaWNlXCI7XHJcbiAgICAgICAgZXNjYXBlX3RoaXMuaGFuZGxlciA9IFwiZXNjYXBlX2JhdHRsZVwiO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL2VzY2FwZWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goZXNjYXBlX3RoaXMpO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc2Npc3NvcmApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3N0b25lYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlc2NhcGVfYmF0dGxlKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICAgICAgdGhpcy5iYXR0bGVfZmllbGQuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkuZXNjYXBlID0gdHJ1ZTtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLm9wcG9uZW50fS9nYW1lMl9zdGF0ZS9lc2NhcGVgKS5zZXQoeyBlc2NhcGU6IFwiYWJzb2x1dGVcIiB9KTtcclxuICAgICAgICBsZXQgZmFkZW91dCA9IGNjLmZhZGVPdXQoNS4wKVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJFc2NhcGUgYWN0aXZlXCI7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykucnVuQWN0aW9uKGZhZGVvdXQpO1xyXG4gICAgICAgIH0sIDAuMSlcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLm9wYWNpdHkgPSAyNTU7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2hfcmVzdWx0KCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICAgICAgdGhpcy5iYXR0bGVfZmllbGQuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkucmV2ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5vcHBvbmVudH0vZ2FtZTJfc3RhdGUvcmV2ZXJzZWApLnNldCh7IHJldmVyc2U6IFwiYWJzb2x1dGVcIiB9KTtcclxuICAgICAgICBsZXQgZmFkZW91dCA9IGNjLmZhZGVPdXQoNS4wKVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJSZXZlcnNlIGFjdGl2ZVwiO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLnJ1bkFjdGlvbihmYWRlb3V0KTtcclxuICAgICAgICB9LCAwLjEpXHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgfVxyXG5cclxuICAgIGJldHRpbmdfbXVsdGlwbGUoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSlcclxuICAgICAgICBsZXQgc3RyID0gdGhpcy5tdWx0aXBsZS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nO1xyXG4gICAgICAgIGlmIChOdW1iZXIoc3RyKSA+PSA1KVxyXG4gICAgICAgICAgICBzdHIgPSBcIjVcIjtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGUvbXVsdGlwbGVgKS5zZXQoeyBtdWx0aXBsZTogc3RyIH0pO1xyXG4gICAgICAgIHRoaXMuYmF0dGxlX2ZpZWxkLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLm11bHRpcGxlX29uID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9nYW1ibGVyX2FiaWxpdHknKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGJldHRpbmcoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSlcclxuICAgICAgICAvLyBsZXQgc3RyID0gdGhpcy5iZXQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgICAgICAvLyBpZiAoTnVtYmVyKHN0cikgPiB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5tb25leV9sZWZ0KSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBmYWRlb3V0ID0gY2MuZmFkZU91dCg1LjApXHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTm90IGVub3VnaCBtb25leVwiO1xyXG4gICAgICAgIC8vICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykucnVuQWN0aW9uKGZhZGVvdXQpO1xyXG4gICAgICAgIC8vICAgICB9LCAwLjEpXHJcbiAgICAgICAgLy8gICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL2JldGApLnNldCh7IGJldDogdGhpcy5iZXQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZyB9KTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9iZXRfY29uZmlybScpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zY2lzc29yYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zdG9uZWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBwYXBlcigpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gICAgICAgIGxldCBuZXdfcGFwZXIgPSB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5wYXBlcl9sZWZ0IC0gMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhuZXdfcGFwZXIpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJxd2VyXCIpXHJcbiAgICAgICAgaWYgKG5ld19wYXBlciA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwicGFwZXJcIiwgbmV3X3BhcGVyKTtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9iYXR0bGVfZmllbGQvTWluZV9wYXBlclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5teV9jaG9pY2UgPSBcInBhcGVyXCI7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvYmF0dGxlX2ZpZWxkXCIpLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLnNob3dfY2FyZCgncGFwZXInLCBcIk1pbmVcIik7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvYmF0dGxlX2ZpZWxkXCIpLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLm1lX3JlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgY2FyZDogXCJwYXBlclwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwYXBlclwiKS5nZXRDaGlsZEJ5TmFtZShcImNhcmRfbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gU3RyaW5nKG5ld19wYXBlcilcclxuICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvcGFwZXJgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc2Npc3NvcmApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zdG9uZWApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9jYW4ndCBzZWxlY3QgcGFwZXIgYmVjYXVzZSB5b3UgZG9uJ3QgaGF2ZSBwYXBlciBjYXJkIGFueW1vcmVcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJObyBQYXBlclwiXHJcbiAgICAgICAgICAgIGxldCBmYWRlb3V0ID0gY2MuZmFkZU91dCgyLjApXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLnJ1bkFjdGlvbihmYWRlb3V0KTtcclxuICAgICAgICAgICAgfSwgMC4xKVxyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2dldCB0aGUgcGFwZXIgaW5mb1xyXG5cclxuICAgIH1cclxuICAgIHNjaXNzb3IoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSlcclxuICAgICAgICBsZXQgbmV3X3NjaXNzb3IgPSB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS5zY2lzc29yX2xlZnQgLSAxO1xyXG4gICAgICAgIGlmIChuZXdfc2Npc3NvciA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnVwZGF0ZV9pbmZvKFwic2Npc3NvclwiLCBuZXdfc2Npc3Nvcik7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvYmF0dGxlX2ZpZWxkL01pbmVfc2Npc3NvclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5teV9jaG9pY2UgPSBcInNjaXNzb3JcIjtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9iYXR0bGVfZmllbGRcIikuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkuc2hvd19jYXJkKCdzY2lzc29yJywgXCJNaW5lXCIpO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5tZV9yZWFkeSA9IHRydWU7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IGNhcmQ6IFwic2Npc3NvclwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY2lzc29yXCIpLmdldENoaWxkQnlOYW1lKFwiY2FyZF9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBTdHJpbmcobmV3X3NjaXNzb3IpXHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3NjaXNzb3JgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc3RvbmVgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTm8gU2Npc3NvcnNcIlxyXG4gICAgICAgICAgICBsZXQgZmFkZW91dCA9IGNjLmZhZGVPdXQoMi4wKVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5ydW5BY3Rpb24oZmFkZW91dCk7XHJcbiAgICAgICAgICAgIH0sIDAuMSlcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvcGFwZXJgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zY2lzc29yYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc3RvbmVgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAvL2dldCBzY2lzc29yIGluZm9cclxuICAgIH1cclxuICAgIHN0b25lKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICAgICAgbGV0IG5ld19zdG9uZSA9IHRoaXMucGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsX2luZm8pLnN0b25lX2xlZnQgLSAxO1xyXG4gICAgICAgIGlmIChuZXdfc3RvbmUgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLmdldENvbXBvbmVudChwYW5lbF9pbmZvKS51cGRhdGVfaW5mbyhcInN0b25lXCIsIG5ld19zdG9uZSk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvYmF0dGxlX2ZpZWxkL01pbmVfc3RvbmVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9iYXR0bGVfZmllbGRcIikuZ2V0Q29tcG9uZW50KGJhdHRsZV9maWVsZCkubXlfY2hvaWNlID0gXCJzdG9uZVwiO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5zaG93X2NhcmQoJ3N0b25lJywgXCJNaW5lXCIpO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL2JhdHRsZV9maWVsZFwiKS5nZXRDb21wb25lbnQoYmF0dGxlX2ZpZWxkKS5tZV9yZWFkeSA9IHRydWU7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IGNhcmQ6IFwic3RvbmVcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RvbmVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkX251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFN0cmluZyhuZXdfc3RvbmUpXHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3BhcGVyYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL3NjaXNzb3JgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc3RvbmVgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTm8gU3RvbmVcIlxyXG4gICAgICAgICAgICBsZXQgZmFkZW91dCA9IGNjLmZhZGVPdXQoMi4wKVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5ydW5BY3Rpb24oZmFkZW91dCk7XHJcbiAgICAgICAgICAgIH0sIDAuMSlcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvcGFwZXJgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zY2lzc29yYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2Uvc3RvbmVgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAvL2dldCBzdG9uZSBpbmZvXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlKGR0KSB7XHJcblxyXG4gICAgLy8gfVxyXG59XHJcbiJdfQ==