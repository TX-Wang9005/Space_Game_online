"use strict";
cc._RF.push(module, 'e7b61V4ulNIU6pnoc0mNIWa', 'utility');
// Script/Game5Object/utility.ts

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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundEffect = [];
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        var press_button = new cc.Component.EventHandler();
        press_button.target = this.node;
        press_button.component = "utility";
        press_button.handler = "selection";
        cc.find("Canvas/MapObjContainer/character_utility/" + this.node.name + "/Button").getComponent(cc.Button).clickEvents.push(press_button);
    };
    NewClass.prototype.selection = function () {
        var game_manager = cc.find('GameManager').getComponent(GameManagerS5_1.default);
        this.current_user = game_manager.current_user_node;
        console.log("finally   " + this.node.name);
        if (!game_manager.select_character) {
            switch (this.node.name) {
                case "book":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "erudite" });
                    game_manager.select_character = true;
                    game_manager.character = "erudite";
                    cc.find('Canvas/UI/Character/book').active = true;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can peak card distribution";
                    break;
                case "bomb":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "thug" });
                    game_manager.select_character = true;
                    game_manager.character = "thug";
                    //get all the irrefutable on
                    for (var i = 1; i <= 5; i++) {
                        if ("player" + i != this.current_user) {
                            cc.find("Canvas/PlayerContainer/player" + i + "/unreasonable").active = true;
                        }
                    }
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = true;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now other can't reject your fight request";
                    break;
                case "black_clover":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "gambler" });
                    game_manager.select_character = true;
                    cc.find('Canvas/UI/Mine_info_choice/gambler_ability').active = true;
                    cc.find('Canvas/UI/Mine_info_choice/betting_multiple').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = true;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can gain more when you win";
                    game_manager.character = "gambler";
                    break;
                case "ring":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "rule_breaker" });
                    game_manager.select_character = true;
                    game_manager.character = "rule_breaker";
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state/reverse").set({ reverse: "true" });
                    cc.find('Canvas/UI/Mine_info_choice/switch_result').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = true;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can reverse the fighting result";
                    break; // means he can swap the cards and invert the result
                case "coin":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "escaper" });
                    game_manager.select_character = true;
                    game_manager.character = "escaper";
                    cc.find('Canvas/UI/Mine_info_choice/escape').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = true;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can escape from fight";
                    break; // means he can swap the cards and invert the result
            }
        }
        cc.audioEngine.playEffect(this.soundEffect[0], false);
        cc.find('Canvas/MapObjContainer/character_utility/book').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/bomb').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/black_clover').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/coin').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/ring').active = false;
        var fadeout = cc.fadeOut(5.0);
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1);
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "soundEffect", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();