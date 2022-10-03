"use strict";
cc._RF.push(module, '2fbf79NN7BPYbI2p3WXvVNz', 'fight_pressed');
// Script/Game5Object/fight_pressed.ts

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
var fight_forum_1 = require("./fight_forum");
var fight_pressed = /** @class */ (function (_super) {
    __extends(fight_pressed, _super);
    function fight_pressed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.click = null;
        _this.fight_forum = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    fight_pressed.prototype.start = function () {
        this.parent_name = this.node.parent.name;
        var fight_this = new cc.Component.EventHandler();
        fight_this.target = this.node;
        fight_this.component = "fight_pressed";
        fight_this.handler = "fight_forum_open";
        cc.find("Canvas/PlayerContainer/" + this.parent_name + "/fight").getComponent(cc.Button).clickEvents.push(fight_this);
        var rude_this = new cc.Component.EventHandler();
        rude_this.target = this.node;
        rude_this.component = "fight_pressed";
        rude_this.handler = "rude_forum_open";
        cc.find("Canvas/PlayerContainer/" + this.parent_name + "/unreasonable").getComponent(cc.Button).clickEvents.push(rude_this);
    };
    fight_pressed.prototype.fight_forum_open = function () {
        cc.audioEngine.playEffect(this.click, false);
        var handle = this;
        //upload to firebase
        var currentUser = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        firebase.database().ref("player_data/" + this.parent_name + "/game2_state").once('value', function (snapshot) {
            if (snapshot.val().opponent == "null") {
                firebase.database().ref("player_data/" + handle.parent_name + "/game2_state").update({ opponent: currentUser, challenged: "true" });
                handle.fight_forum.getComponent(fight_forum_1.default).being_rude = false;
            }
        });
    };
    fight_pressed.prototype.rude_forum_open = function () {
        cc.audioEngine.playEffect(this.click, false);
        var handle = this;
        //upload to firebase
        var currentUser = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        firebase.database().ref("player_data/" + this.parent_name + "/game2_state").once('value', function (snapshot) {
            if (snapshot.val().opponent == "null") {
                firebase.database().ref("player_data/" + handle.parent_name + "/game2_state").update({ opponent: currentUser, challenged: "absolute" });
            }
        });
    };
    __decorate([
        property(cc.AudioClip)
    ], fight_pressed.prototype, "click", void 0);
    __decorate([
        property(cc.Node)
    ], fight_pressed.prototype, "fight_forum", void 0);
    fight_pressed = __decorate([
        ccclass
    ], fight_pressed);
    return fight_pressed;
}(cc.Component));
exports.default = fight_pressed;

cc._RF.pop();