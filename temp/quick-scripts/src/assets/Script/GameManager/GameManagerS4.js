"use strict";
cc._RF.push(module, '427d7LXlGREOaRzwxYoAibI', 'GameManagerS4');
// Script/GameManager/GameManagerS4.ts

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
var Player_1 = require("../Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS4 = /** @class */ (function (_super) {
    __extends(GameManagerS4, _super);
    function GameManagerS4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.player_node1 = null;
        _this.player_node2 = null;
        _this.player_node3 = null;
        _this.player_node4 = null;
        _this.player_node5 = null;
        _this.physicManager = null;
        return _this;
    }
    GameManagerS4.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
    };
    GameManagerS4.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        // 一開始所有玩家都不能動
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1)
            this.player_node1.getComponent(Player_1.default).moveable = false;
        if (this.player_node2)
            this.player_node2.getComponent(Player_1.default).moveable = false;
        if (this.player_node3)
            this.player_node3.getComponent(Player_1.default).moveable = false;
        if (this.player_node4)
            this.player_node4.getComponent(Player_1.default).moveable = false;
        if (this.player_node5)
            this.player_node5.getComponent(Player_1.default).moveable = false;
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (_this.player_node1)
                _this.player_node1.getComponent(Player_1.default).moveable = true;
            if (_this.player_node2)
                _this.player_node2.getComponent(Player_1.default).moveable = true;
            if (_this.player_node3)
                _this.player_node3.getComponent(Player_1.default).moveable = true;
            if (_this.player_node4)
                _this.player_node4.getComponent(Player_1.default).moveable = true;
            if (_this.player_node5)
                _this.player_node5.getComponent(Player_1.default).moveable = true;
        }, 2.5);
        this.Init_player();
    };
    // update (dt) {}
    GameManagerS4.prototype.Init_player = function () {
        var handle = this;
        var _loop_1 = function (i) {
            firebase.database().ref("player_data/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: -656 });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -16 });
                }
            });
        };
        // initialize players        
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    __decorate([
        property(cc.Node)
    ], GameManagerS4.prototype, "loadingBG", void 0);
    GameManagerS4 = __decorate([
        ccclass
    ], GameManagerS4);
    return GameManagerS4;
}(cc.Component));
exports.default = GameManagerS4;

cc._RF.pop();