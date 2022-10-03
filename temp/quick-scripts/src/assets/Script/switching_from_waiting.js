"use strict";
cc._RF.push(module, '84ac8kBBlNKBbKvfHIaeqHc', 'switching_from_waiting');
// Script/switching_from_waiting.ts

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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.condition = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        var ready_press = new cc.Component.EventHandler();
        //console.log("1")
        ready_press.target = this.node;
        ready_press.component = "switching_from_waiting";
        ready_press.handler = "ready_player";
        cc.find("Canvas/ready").getComponent(cc.Button).clickEvents.push(ready_press);
        var go_press = new cc.Component.EventHandler();
        //console.log("1")
        go_press.target = this.node;
        go_press.component = "switching_from_waiting";
        go_press.handler = "go_player";
        cc.find("Canvas/go").getComponent(cc.Button).clickEvents.push(go_press);
        // Stage button for test
        var Stage1_btn = new cc.Component.EventHandler();
        Stage1_btn.target = this.node;
        Stage1_btn.component = "switching_from_waiting";
        Stage1_btn.handler = "go_Stage1";
        cc.find("Canvas/Stage1").getComponent(cc.Button).clickEvents.push(Stage1_btn);
        var Stage2_btn = new cc.Component.EventHandler();
        Stage2_btn.target = this.node;
        Stage2_btn.component = "switching_from_waiting";
        Stage2_btn.handler = "go_Stage2";
        cc.find("Canvas/Stage2").getComponent(cc.Button).clickEvents.push(Stage2_btn);
        var Stage3_btn = new cc.Component.EventHandler();
        Stage3_btn.target = this.node;
        Stage3_btn.component = "switching_from_waiting";
        Stage3_btn.handler = "go_Stage3";
        cc.find("Canvas/Stage3").getComponent(cc.Button).clickEvents.push(Stage3_btn);
        var Stage4_btn = new cc.Component.EventHandler();
        Stage4_btn.target = this.node;
        Stage4_btn.component = "switching_from_waiting";
        Stage4_btn.handler = "go_Stage4";
        cc.find("Canvas/Stage4").getComponent(cc.Button).clickEvents.push(Stage4_btn);
        var Stage5_btn = new cc.Component.EventHandler();
        Stage5_btn.target = this.node;
        Stage5_btn.component = "switching_from_waiting";
        Stage5_btn.handler = "go_Stage5";
        cc.find("Canvas/Stage5").getComponent(cc.Button).clickEvents.push(Stage5_btn);
    };
    NewClass.prototype.ready_player = function () {
        var user = firebase.auth().currentUser;
        firebase.database().ref('player/player_number').once('value', function (snapshot) {
        });
        firebase.database().ref('player/ready_number').once('value', function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref('player/ready_number').set({ number: 1 });
            }
            else if (snapshot.val().number == '1') {
                firebase.database().ref('player/ready_number').set({ number: 2 });
            }
        });
    };
    NewClass.prototype.go_player = function () {
        cc.director.loadScene("Lobby");
    };
    NewClass.prototype.go_Stage1 = function () {
        cc.director.loadScene("GameStage1");
    };
    NewClass.prototype.go_Stage2 = function () {
        cc.director.loadScene("GameStage2");
    };
    NewClass.prototype.go_Stage3 = function () {
        cc.director.loadScene("GameStage3");
    };
    NewClass.prototype.go_Stage4 = function () {
        cc.director.loadScene("GameStage4");
    };
    NewClass.prototype.go_Stage5 = function () {
        cc.director.loadScene("GameStage5");
    };
    NewClass.prototype.update = function (dt) {
        var handle = this;
        if (this.condition == false) {
            //not all the players have been assigned to ready yet
            firebase.database().ref('player/ready_number').once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().number == '2') {
                        cc.find("Canvas/go").active = true;
                        console.log(handle.condition);
                        handle.condition = true;
                    }
                }
            });
        }
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();