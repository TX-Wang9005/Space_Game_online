"use strict";
cc._RF.push(module, '9d81azu9dZAO7GUnWK5LBUa', 'GameManagerS3');
// Script/GameManager/GameManagerS3.ts

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
var GameManagerS3 = /** @class */ (function (_super) {
    __extends(GameManagerS3, _super);
    function GameManagerS3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.physicManager = null;
        return _this;
        // update (dt) {}
    }
    GameManagerS3.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        // 每個player node初始化位置。
        var user = firebase.auth().currentUser.uid;
        var permited_user;
        firebase.database().ref("player_data").once('value', function (snapshot) {
            snapshot.forEach(function (player) {
                var name = player.key;
                if (name == "player1" || name == "player2" || name == "player3" || name == "player4" || name == "player5") {
                    console.log("Initial player:", name);
                    firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: 16 });
                    firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: -48 });
                }
            });
        });
        // 
    };
    GameManagerS3.prototype.start = function () {
    };
    GameManagerS3 = __decorate([
        ccclass
    ], GameManagerS3);
    return GameManagerS3;
}(cc.Component));
exports.default = GameManagerS3;

cc._RF.pop();