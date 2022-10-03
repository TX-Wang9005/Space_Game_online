"use strict";
cc._RF.push(module, 'ab0aeUex1hCEZENd0Yns22t', 'ready_to_S1');
// Script/ready_to_S1.ts

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
        ready_press.component = "ready_to_S1";
        ready_press.handler = "ready_player";
        cc.find("Canvas/ready").getComponent(cc.Button).clickEvents.push(ready_press);
    };
    NewClass.prototype.ready_player = function () {
        var user = firebase.auth().currentUser;
        firebase.database().ref("game" + 1 + "/player_ready_number").once('value', function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref("game" + 1 + "/player_ready_number").set({ number: 1 });
            }
            else if (snapshot.val().number == '1') {
                firebase.database().ref("game" + 1 + "/player_ready_number").set({ number: 2 });
            }
        });
        //get the current time
        var today = new Date();
        var time = today.getTime();
        this.old_time = time;
        console.log("old_time: " + this.old_time);
        //get every player to update the time
        var sessionsRef = firebase.database().ref("sessions");
        sessionsRef.set({
            startedAt: firebase.database.ServerValue.TIMESTAMP
        });
        var handle = this;
        firebase.database().ref("sessions").once('value', function (snapshot) {
            handle.servertime = snapshot.val().startedAt;
        });
        console.log("delay from p1 to server: " + (handle.servertime - this.old_time));
        var now = new Date();
        var now_time = now.getTime();
        console.log(now_time - this.old_time);
        this.delay = (now_time - this.old_time) / 1000;
        console.log("delay from server to p1: " + (now_time - handle.servertime));
    };
    NewClass.prototype.update = function (dt) {
        var user = firebase.auth().currentUser;
        var handle = this;
        var old = new Date();
        var time_old = old.getTime();
        if (this.condition == false) {
            //not all the players have been assigned to ready yet
            firebase.database().ref("game" + 1 + "/player_ready_number").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().number == '2') {
                        handle.condition = true;
                        //read the data from firebase
                        var current_time = new Date();
                        var time = current_time.getTime();
                        //get teh delay
                        var delay = Math.abs((time - time_old) / 2000);
                        console.log("delay time: " + delay);
                        handle.scheduleOnce(function () {
                            // Here this refers to component
                            cc.director.loadScene("GameStage2");
                        }, 2 - delay);
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