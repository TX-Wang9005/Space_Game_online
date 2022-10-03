
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/computerRule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21wdXRlclJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsbUNBQThCO0FBQ3hCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBc0pDO1FBbkpHLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLFdBQUssR0FBaUIsSUFBSSxDQUFDO1FBRTNCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFFdkIseUJBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBQ2hDLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFDbkIsUUFBRSxHQUFZLElBQUksQ0FBQztRQUNuQixRQUFFLEdBQVksSUFBSSxDQUFDO1FBQ25CLFFBQUUsR0FBWSxJQUFJLENBQUM7O1FBZ0kzQixzQ0FBc0M7UUFDdEMsd0NBQXdDO1FBQ3hDLHlDQUF5QztRQUN6QywyQ0FBMkM7UUFDM0MsUUFBUTtRQUNSLElBQUk7UUFDUCxpQkFBaUI7SUFDbEIsQ0FBQztJQXJJRyw2QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDRCQUFLLEdBQUw7UUFBQSxpQkFvREM7UUFsREcsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDMUMsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7UUFDNUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFhLEdBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ3hF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QVRkLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FzSmhDO0lBQUQsbUJBQUM7Q0F0SkQsQUFzSkMsQ0F0SnlDLEVBQUUsQ0FBQyxTQUFTLEdBc0pyRDtrQkF0Sm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbXB1dGVyUnVsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBydWxlV2luZG93OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBjbGljazogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgUnVsZVRleHQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBEZXRhaWxSdWxlVGV4dDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBUMTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIFQyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgVDM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBUNDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICAgICAgbGV0IHVpZCA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRfdXNlcl9udW1iZXIgPSAwO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB1c2VyX2luZm8vJHt1aWR9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRfdXNlcl9udW1iZXIgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIgPSBjdXJyZW50X3VzZXJfbnVtYmVyO1xyXG4gICAgICAgIH0sMS41KTtcclxuICAgICAgICB0aGlzLlRleHQxQWN0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIGJ1dHRvbnNcclxuICAgICAgICBsZXQgcnVsZV9idG4gPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIHJ1bGVfYnRuLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBydWxlX2J0bi5jb21wb25lbnQgPSBcImNvbXB1dGVyUnVsZVwiO1xyXG4gICAgICAgIHJ1bGVfYnRuLmhhbmRsZXIgPSBcInJ1bGVFdmVudFwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmEvUnVsZVdpbmRvdy9ydWxlXCIpKTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL1J1bGVXaW5kb3cvcnVsZVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHJ1bGVfYnRuKTtcclxuICAgICAgICBsZXQgY2xvc2VfYnRuID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBjbG9zZV9idG4udGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGNsb3NlX2J0bi5jb21wb25lbnQgPSBcImNvbXB1dGVyUnVsZVwiO1xyXG4gICAgICAgIGNsb3NlX2J0bi5oYW5kbGVyID0gXCJjbG9zZUV2ZW50XCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYS9SdWxlV2luZG93L2Nsb3NlXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goY2xvc2VfYnRuKTtcclxuICAgICAgICBsZXQgYnRuMSA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgYnRuMS50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYnRuMS5jb21wb25lbnQgPSBcImNvbXB1dGVyUnVsZVwiO1xyXG4gICAgICAgIGJ0bjEuaGFuZGxlciA9IFwiYnRuMUV2ZW50XCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYS9SdWxlV2luZG93L01lc3NhZ2UvYnRuMVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGJ0bjEpO1xyXG4gICAgICAgIGxldCBidG4yID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBidG4yLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBidG4yLmNvbXBvbmVudCA9IFwiY29tcHV0ZXJSdWxlXCI7XHJcbiAgICAgICAgYnRuMi5oYW5kbGVyID0gXCJidG4yRXZlbnRcIjtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL1J1bGVXaW5kb3cvTWVzc2FnZS9idG4yXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goYnRuMik7XHJcbiAgICAgICAgbGV0IGJ0bjMgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIGJ0bjMudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGJ0bjMuY29tcG9uZW50ID0gXCJjb21wdXRlclJ1bGVcIjtcclxuICAgICAgICBidG4zLmhhbmRsZXIgPSBcImJ0bjNFdmVudFwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmEvUnVsZVdpbmRvdy9NZXNzYWdlL2J0bjNcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChidG4zKTtcclxuICAgICAgICBsZXQgYnRuNCA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgYnRuNC50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgYnRuNC5jb21wb25lbnQgPSBcImNvbXB1dGVyUnVsZVwiO1xyXG4gICAgICAgIGJ0bjQuaGFuZGxlciA9IFwiYnRuNEV2ZW50XCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYS9SdWxlV2luZG93L01lc3NhZ2UvYnRuNFwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGJ0bjQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuVDEgPSBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL1J1bGVXaW5kb3cvTWVzc2FnZS9UZXh0MVwiKTtcclxuICAgICAgICB0aGlzLlQyID0gY2MuZmluZChcIkNhbnZhcy9NYWluIENhbWVyYS9SdWxlV2luZG93L01lc3NhZ2UvVGV4dDJcIik7XHJcbiAgICAgICAgdGhpcy5UMyA9IGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmEvUnVsZVdpbmRvdy9NZXNzYWdlL1RleHQzXCIpO1xyXG4gICAgICAgIHRoaXMuVDQgPSBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL1J1bGVXaW5kb3cvTWVzc2FnZS9UZXh0NFwiKTtcclxuXHJcbiAgICB9XHJcbiAgICBydWxlRXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICBpZih0aGlzLkRldGFpbFJ1bGVUZXh0LmFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuRGV0YWlsUnVsZVRleHQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5UMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UNC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5EZXRhaWxSdWxlVGV4dC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UMy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UNC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2xvc2VFdmVudCgpe1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuRGV0YWlsUnVsZVRleHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ydWxlV2luZG93LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHt0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXJ9YCkuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG5cclxuICAgIH1cclxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3QsIHNlbGYsIG90aGVyKSB7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAncGxheWVyJyl7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcInBsYXllclwiK3RoaXMuY3VycmVudF91c2VyX251bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZihvdGhlci5ub2RlLm5hbWUgPT0gc3RyKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BlbiBDb21wdXRlclJ1bGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGVXaW5kb3cuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KFBsYXllcikuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgVGV4dDFBY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC41LCAxLjEpLCBjYy5zY2FsZVRvKDAuNSwgMSkpO1xyXG4gICAgICAgIGFjdGlvbiA9IGNjLnJlcGVhdEZvcmV2ZXIoc2VxdWVuY2UpO1xyXG4gICAgICAgIHRoaXMuUnVsZVRleHQucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcbiAgICBidG4xRXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB0aGlzLlQxLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5UMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlQzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBidG4yRXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB0aGlzLlQxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlQzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBidG4zRXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB0aGlzLlQxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5UMy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuVDQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBidG40RXZlbnQoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICB0aGlzLlQxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVDIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5UMy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlQ0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyBvbkVuZENvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpe1xyXG4gICAgLy8gICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ3BsYXllcicpe1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIENvbXB1dGVyXCIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnJlYWR5V2luZG93LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn0iXX0=