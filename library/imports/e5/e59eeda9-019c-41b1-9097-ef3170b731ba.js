"use strict";
cc._RF.push(module, 'e59ee2pAZxBsZCX7zFwtzG6', 'computerRule');
// Script/computerRule.ts

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
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var computerRule = /** @class */ (function (_super) {
    __extends(computerRule, _super);
    function computerRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ruleWindow = null;
        _this.click = null;
        _this.RuleText = null;
        _this.DetailRuleText = null;
        _this.current_user_number = 0;
        _this.T1 = null;
        _this.T2 = null;
        _this.T3 = null;
        _this.T4 = null;
        return _this;
        // onEndContact(contact, self, other){
        //     if(other.node.group == 'player'){
        //         console.log("close Computer");
        //         this.readyWindow.active = false;
        //     }
        // }
        // update (dt) {}
    }
    computerRule.prototype.onLoad = function () {
    };
    computerRule.prototype.start = function () {
        var _this = this;
        var uid = firebase.auth().currentUser.uid;
        var current_user_number = 0;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                current_user_number = snapshot.val().player_number;
            }
        });
        this.scheduleOnce(function () {
            _this.current_user_number = current_user_number;
        }, 1.5);
        this.Text1Action();
        // buttons
        var rule_btn = new cc.Component.EventHandler();
        rule_btn.target = this.node;
        rule_btn.component = "computerRule";
        rule_btn.handler = "ruleEvent";
        console.log(cc.find("Canvas/Main Camera/RuleWindow/rule"));
        cc.find("Canvas/Main Camera/RuleWindow/rule").getComponent(cc.Button).clickEvents.push(rule_btn);
        var close_btn = new cc.Component.EventHandler();
        close_btn.target = this.node;
        close_btn.component = "computerRule";
        close_btn.handler = "closeEvent";
        cc.find("Canvas/Main Camera/RuleWindow/close").getComponent(cc.Button).clickEvents.push(close_btn);
        var btn1 = new cc.Component.EventHandler();
        btn1.target = this.node;
        btn1.component = "computerRule";
        btn1.handler = "btn1Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn1").getComponent(cc.Button).clickEvents.push(btn1);
        var btn2 = new cc.Component.EventHandler();
        btn2.target = this.node;
        btn2.component = "computerRule";
        btn2.handler = "btn2Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn2").getComponent(cc.Button).clickEvents.push(btn2);
        var btn3 = new cc.Component.EventHandler();
        btn3.target = this.node;
        btn3.component = "computerRule";
        btn3.handler = "btn3Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn3").getComponent(cc.Button).clickEvents.push(btn3);
        var btn4 = new cc.Component.EventHandler();
        btn4.target = this.node;
        btn4.component = "computerRule";
        btn4.handler = "btn4Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn4").getComponent(cc.Button).clickEvents.push(btn4);
        this.T1 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text1");
        this.T2 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text2");
        this.T3 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text3");
        this.T4 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text4");
    };
    computerRule.prototype.ruleEvent = function () {
        cc.audioEngine.playEffect(this.click, false);
        if (this.DetailRuleText.active == false) {
            this.DetailRuleText.active = true;
            this.T1.active = false;
            this.T2.active = false;
            this.T3.active = false;
            this.T4.active = false;
        }
        else {
            this.DetailRuleText.active = false;
            this.T1.active = false;
            this.T2.active = false;
            this.T3.active = false;
            this.T4.active = false;
        }
    };
    computerRule.prototype.closeEvent = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.DetailRuleText.active = false;
        this.ruleWindow.active = false;
        cc.find("Canvas/PlayerContainer/player" + this.current_user_number).getComponent(Player_1.default).moveable = true;
    };
    computerRule.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.group == 'player') {
            var str = "player" + this.current_user_number.toString();
            if (other.node.name == str) {
                console.log("open ComputerRule");
                this.ruleWindow.active = true;
                other.node.getComponent(Player_1.default).moveable = false;
                other.node.getComponent(Player_1.default).getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            }
        }
    };
    computerRule.prototype.Text1Action = function () {
        var action;
        var sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.RuleText.runAction(action);
    };
    computerRule.prototype.btn1Event = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = true;
        this.T2.active = false;
        this.T3.active = false;
        this.T4.active = false;
    };
    computerRule.prototype.btn2Event = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = false;
        this.T2.active = true;
        this.T3.active = false;
        this.T4.active = false;
    };
    computerRule.prototype.btn3Event = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = false;
        this.T2.active = false;
        this.T3.active = true;
        this.T4.active = false;
    };
    computerRule.prototype.btn4Event = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = false;
        this.T2.active = false;
        this.T3.active = false;
        this.T4.active = true;
    };
    __decorate([
        property(cc.Node)
    ], computerRule.prototype, "ruleWindow", void 0);
    __decorate([
        property(cc.AudioClip)
    ], computerRule.prototype, "click", void 0);
    __decorate([
        property(cc.Node)
    ], computerRule.prototype, "RuleText", void 0);
    __decorate([
        property(cc.Node)
    ], computerRule.prototype, "DetailRuleText", void 0);
    computerRule = __decorate([
        ccclass
    ], computerRule);
    return computerRule;
}(cc.Component));
exports.default = computerRule;

cc._RF.pop();