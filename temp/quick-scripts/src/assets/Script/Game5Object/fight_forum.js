"use strict";
cc._RF.push(module, '6ff61iG8iRKVLLASJ34EDGb', 'fight_forum');
// Script/Game5Object/fight_forum.ts

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
var battle_field_1 = require("./battle_field");
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var fight_forum = /** @class */ (function (_super) {
    __extends(fight_forum, _super);
    function fight_forum() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.opponent_info_choice = null;
        _this.Mine_info_choice = null;
        _this.battle_field = null;
        _this.click = null;
        _this.fight = false;
        _this.being_rude = false;
        _this.updated = true;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    fight_forum.prototype.start = function () {
        //this.current_user = cc.find("GameManager").getComponent(GameManagerS2).current_user_node;
        var fight_forum_accept = new cc.Component.EventHandler();
        fight_forum_accept.target = this.node;
        fight_forum_accept.component = "fight_forum";
        fight_forum_accept.handler = "accept";
        cc.find("Canvas/UI/fight_forum/accept").getComponent(cc.Button).clickEvents.push(fight_forum_accept);
        var fight_forum_reject = new cc.Component.EventHandler();
        fight_forum_reject.target = this.node;
        fight_forum_reject.component = "fight_forum";
        fight_forum_reject.handler = "reject";
        cc.find("Canvas/UI/fight_forum/reject").getComponent(cc.Button).clickEvents.push(fight_forum_reject);
    };
    fight_forum.prototype.accept = function () {
        cc.audioEngine.playEffect(this.click, false);
        var handle = this;
        this.fight = true;
        console.log("accept challenge");
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ fighting: "true" });
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ challenged: "false" });
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").once('value', function (snapshot) {
            handle.opponent = snapshot.val().opponent;
            //console.log("you: " + handle.current_user + "  opponent: " + handle.opponent)
            firebase.database().ref("player_data/" + handle.opponent + "/game2_state").update({ opponent: handle.current_user, fighting: "true" });
            var game_manager = cc.find('GameManager').getComponent(GameManagerS5_1.default);
            handle.Mine_info_choice.active = true;
            handle.opponent_info_choice.active = true;
            handle.battle_field.active = true;
            handle.battle_field.getComponent(battle_field_1.default).opponent = handle.opponent;
            game_manager.opponent_user_node = handle.opponent;
            game_manager.fighting = true;
            console.log("game manager fighting: " + game_manager.fighting);
            if (handle.being_rude) {
                cc.find("Canvas/UI/fight_forum/reject").active = true;
                handle.being_rude = false;
            }
            cc.find("Canvas/UI/fight_forum").active = false;
        });
        //open up the battle field and both info_choice
    };
    fight_forum.prototype.reject = function () {
        cc.audioEngine.playEffect(this.click, false);
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ opponent: "null" });
        cc.find("Canvas/UI/fight_forum").active = false;
    };
    fight_forum.prototype.update = function (dt) {
    };
    __decorate([
        property(cc.Node)
    ], fight_forum.prototype, "opponent_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], fight_forum.prototype, "Mine_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], fight_forum.prototype, "battle_field", void 0);
    __decorate([
        property(cc.AudioClip)
    ], fight_forum.prototype, "click", void 0);
    fight_forum = __decorate([
        ccclass
    ], fight_forum);
    return fight_forum;
}(cc.Component));
exports.default = fight_forum;

cc._RF.pop();