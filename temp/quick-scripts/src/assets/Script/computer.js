"use strict";
cc._RF.push(module, 'e3555OfbRVJfqVVS2aWjc+P', 'computer');
// Script/computer.ts

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
var Computer = /** @class */ (function (_super) {
    __extends(Computer, _super);
    function Computer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.readyWindow = null;
        _this.current_user_number = 0;
        return _this;
        // onEndContact(contact, self, other){
        //     if(other.node.group == 'player'){
        //         console.log("close Computer");
        //         this.readyWindow.active = false;
        //     }
        // }
        // update (dt) {}
    }
    Computer.prototype.onLoad = function () {
    };
    Computer.prototype.start = function () {
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
    };
    Computer.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.group == 'player') {
            var str = "player" + this.current_user_number.toString();
            if (other.node.name == str) {
                console.log("open Computer");
                this.readyWindow.active = true;
                other.node.getComponent(Player_1.default).moveable = false;
                other.node.getComponent(Player_1.default).getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], Computer.prototype, "readyWindow", void 0);
    Computer = __decorate([
        ccclass
    ], Computer);
    return Computer;
}(cc.Component));
exports.default = Computer;

cc._RF.pop();