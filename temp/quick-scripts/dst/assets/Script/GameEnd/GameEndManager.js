
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameEnd/GameEndManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f429aoC+2VCaocysDVrkRXi', 'GameEndManager');
// Script/GameEnd/GameEndManager.ts

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
var GameEndManager = /** @class */ (function (_super) {
    __extends(GameEndManager, _super);
    function GameEndManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.BGM = null;
        _this.Text1 = null;
        _this.Text2 = null;
        _this.WinnerLabel = null;
        _this.current_user_number = 0;
        _this.physicManager = null;
        _this.Round1_winner = 0;
        _this.Round2_winner = 0;
        _this.Round3_winner = 0;
        _this.Round4_winner = 0;
        return _this;
    }
    GameEndManager.prototype.onLoad = function () {
        var _this = this;
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        var user = firebase.auth().currentUser.uid;
        var player_node_number = 0;
        firebase.database().ref("user_info/" + user).once('value', function (snapshot) {
            player_node_number = snapshot.val().player_number;
        });
        this.scheduleOnce(function () {
            _this.current_user_number = player_node_number;
        }, 2.5);
    };
    GameEndManager.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        var player1 = cc.find("Canvas/PlayerContainer/player1");
        var player2 = cc.find("Canvas/PlayerContainer/player2");
        var player3 = cc.find("Canvas/PlayerContainer/player3");
        var player4 = cc.find("Canvas/PlayerContainer/player4");
        var player5 = cc.find("Canvas/PlayerContainer/player5");
        if (player1)
            player1.getComponent(Player_1.default).moveable = false;
        if (player2)
            player5.getComponent(Player_1.default).moveable = false;
        if (player3)
            player5.getComponent(Player_1.default).moveable = false;
        if (player4)
            player5.getComponent(Player_1.default).moveable = false;
        if (player5)
            player5.getComponent(Player_1.default).moveable = false;
        this.Init_player();
        this.FindRoundWinner();
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (player1)
                player1.getComponent(Player_1.default).moveable = true;
            if (player2)
                player5.getComponent(Player_1.default).moveable = true;
            if (player3)
                player5.getComponent(Player_1.default).moveable = true;
            if (player4)
                player5.getComponent(Player_1.default).moveable = true;
            if (player5)
                player5.getComponent(Player_1.default).moveable = true;
            // 開始計時
            cc.audioEngine.playMusic(_this.BGM, true);
            cc.audioEngine.setMusicVolume(0.2);
            _this.Text1Action();
            _this.Text2Action();
        }, 2.5);
    };
    GameEndManager.prototype.update = function (dt) {
    };
    GameEndManager.prototype.Text1Action = function () {
        var action;
        var sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.Text1.runAction(action);
    };
    GameEndManager.prototype.Text2Action = function () {
        var action;
        var sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.Text2.runAction(action);
    };
    GameEndManager.prototype.Init_player = function () {
        var handle = this;
        var _loop_1 = function (i) {
            firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: -736 });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -176 });
                }
            });
        };
        // initialize players
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    GameEndManager.prototype.FindRoundWinner = function () {
        var t = this;
        var _loop_2 = function (i) {
            firebase.database().ref("GameResult/Round1/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val() == 80) {
                        t.Round1_winner = i;
                    }
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_2(i);
        }
        var _loop_3 = function (i) {
            firebase.database().ref("GameResult/Round2/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val() == 0) {
                        t.Round2_winner = i;
                    }
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_3(i);
        }
        var _loop_4 = function (i) {
            firebase.database().ref("GameResult/Round3/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val() == 80) {
                        t.Round3_winner = i;
                    }
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_4(i);
        }
        // GameStage4
        var coin = [0, 0, 0, 0, 0];
        var _loop_5 = function (i) {
            firebase.database().ref("player_data/player" + i + "/game2_state/money").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    coin[i - 1] = snapshot.val();
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_5(i);
        }
        this.scheduleOnce(function () {
            var cnt = 0;
            for (var i = 0; i <= 4; i++) {
                cnt = 0;
                for (var j = 0; j <= 4; j++) {
                    if (coin[i] >= coin[j])
                        cnt++;
                }
                if (cnt == 5) {
                    t.Round4_winner = i + 1;
                }
            }
            // print winner.
            console.log("Winner", t.Round1_winner, t.Round2_winner, t.Round3_winner, t.Round4_winner);
            var p;
            p = cc.find("Canvas/ObjContainer/Round1/Champ/P" + t.Round1_winner);
            if (p)
                p.active = true;
            p = cc.find("Canvas/ObjContainer/Round2/Champ/P" + t.Round2_winner);
            if (p)
                p.active = true;
            p = cc.find("Canvas/ObjContainer/Round3/Champ/P" + t.Round3_winner);
            if (p)
                p.active = true;
            p = cc.find("Canvas/ObjContainer/Round4/Champ/P" + t.Round4_winner);
            if (p)
                p.active = true;
            firebase.database().ref("user_list").once('value', function (snapshot) {
                snapshot.forEach(function (s) {
                    if (s.val().player_number == t.Round4_winner) {
                        t.WinnerLabel.getComponent(cc.Label).string = s.val().email;
                    }
                });
            });
        }, 1.5);
    };
    __decorate([
        property(cc.Node)
    ], GameEndManager.prototype, "loadingBG", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameEndManager.prototype, "BGM", void 0);
    __decorate([
        property(cc.Node)
    ], GameEndManager.prototype, "Text1", void 0);
    __decorate([
        property(cc.Node)
    ], GameEndManager.prototype, "Text2", void 0);
    __decorate([
        property(cc.Node)
    ], GameEndManager.prototype, "WinnerLabel", void 0);
    GameEndManager = __decorate([
        ccclass
    ], GameEndManager);
    return GameEndManager;
}(cc.Component));
exports.default = GameEndManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lRW5kXFxHYW1lRW5kTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixvQ0FBK0I7QUFFekIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFnTEM7UUE3S0csZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixTQUFHLEdBQWlCLElBQUksQ0FBQztRQUd6QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBRXRCLFdBQUssR0FBWSxJQUFJLENBQUM7UUFFdEIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFcEIseUJBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBRWhDLG1CQUFhLEdBQXNCLElBQUksQ0FBQztRQUV4QyxtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixtQkFBYSxHQUFXLENBQUMsQ0FBQzs7SUEwSnRDLENBQUM7SUF2SkcsK0JBQU0sR0FBTjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFX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Q0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO3FCQUMvRDtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQTVLRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7K0NBQ0U7SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDSTtJQUV0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1U7SUFiWCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBZ0xsQztJQUFELHFCQUFDO0NBaExELEFBZ0xDLENBaEwyQyxFQUFFLENBQUMsU0FBUyxHQWdMdkQ7a0JBaExvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9QbGF5ZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVFbmRNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxvYWRpbmdCRzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIEJHTTogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRleHQxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgVGV4dDI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBXaW5uZXJMYWJlbDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgcGh5c2ljTWFuYWdlcjogY2MuUGh5c2ljc01hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgUm91bmQxX3dpbm5lcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgUm91bmQyX3dpbm5lcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgUm91bmQzX3dpbm5lcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgUm91bmQ0X3dpbm5lcjogbnVtYmVyID0gMDtcclxuICAgIFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMucGh5c2ljTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZ3Jhdml0eSA9IGNjLnYyKDAsIDApO1xyXG5cclxuICAgICAgICB2YXIgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQ7XHJcbiAgICAgICAgbGV0IHBsYXllcl9ub2RlX251bWJlciA9IDA7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VzZXJ9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgcGxheWVyX25vZGVfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF91c2VyX251bWJlciA9IHBsYXllcl9ub2RlX251bWJlcjtcclxuICAgICAgICB9LCAyLjUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmdCRy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBwbGF5ZXIxID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMVwiKTtcclxuICAgICAgICBsZXQgcGxheWVyMiA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjJcIik7XHJcbiAgICAgICAgbGV0IHBsYXllcjMgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIzXCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXI0ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNFwiKTtcclxuICAgICAgICBsZXQgcGxheWVyNSA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjVcIik7XHJcbiAgICAgICAgaWYgKHBsYXllcjEpIHBsYXllcjEuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAocGxheWVyMikgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChwbGF5ZXIzKSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHBsYXllcjQpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAocGxheWVyNSkgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLkluaXRfcGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5GaW5kUm91bmRXaW5uZXIoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyMSkgcGxheWVyMS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIyKSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHBsYXllcjMpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyNCkgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXI1KSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8g6ZaL5aeL6KiI5pmCXHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDAuMik7XHJcbiAgICAgICAgICAgIHRoaXMuVGV4dDFBY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0MkFjdGlvbigpO1xyXG4gICAgICAgIH0sIDIuNSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuXHJcbiAgICB9XHJcbiAgICBUZXh0MUFjdGlvbigpIHtcclxuICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDEuMSksIGNjLnNjYWxlVG8oMC41LCAxKSk7XHJcbiAgICAgICAgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzZXF1ZW5jZSk7XHJcbiAgICAgICAgdGhpcy5UZXh0MS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuICAgIFRleHQyQWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBhY3Rpb246IGNjLkFjdGlvbjtcclxuICAgICAgICBsZXQgc2VxdWVuY2UgPSBjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuNSwgMS4xKSwgY2Muc2NhbGVUbygwLjUsIDEpKTtcclxuICAgICAgICBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKHNlcXVlbmNlKTtcclxuICAgICAgICB0aGlzLlRleHQyLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgSW5pdF9wbGF5ZXIoKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBwbGF5ZXJzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHsgLy8g5aaC5p6c546p5a6255m75YWlXHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogLTczNiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAtMTc2IH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGluaXRpYWwgRW5kXHJcbiAgICB9XHJcbiAgICBGaW5kUm91bmRXaW5uZXIoKXtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lUmVzdWx0L1JvdW5kMS9wbGF5ZXIke2l9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc25hcHNob3QudmFsKCkgPT0gODApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LlJvdW5kMV93aW5uZXIgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lUmVzdWx0L1JvdW5kMi9wbGF5ZXIke2l9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc25hcHNob3QudmFsKCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuUm91bmQyX3dpbm5lciA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYEdhbWVSZXN1bHQvUm91bmQzL3BsYXllciR7aX1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzbmFwc2hvdC52YWwoKSA9PSA4MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuUm91bmQzX3dpbm5lciA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBHYW1lU3RhZ2U0XHJcbiAgICAgICAgbGV0IGNvaW4gPSBbMCwwLDAsMCwwXVxyXG4gICAgICAgIGZvcihsZXQgaT0xO2k8PTU7aSsrKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vZ2FtZTJfc3RhdGUvbW9uZXlgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCl7XHJcbiAgICAgICAgICAgICAgICBpZihzbmFwc2hvdC52YWwoKSE9bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29pbltpLTFdID0gc25hcHNob3QudmFsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBsZXQgY250ID0gMDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTw9NDtpKyspe1xyXG4gICAgICAgICAgICAgICAgY250ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8PTQ7aisrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb2luW2ldPj1jb2luW2pdKSBjbnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGNudCA9PSA1KXtcclxuICAgICAgICAgICAgICAgICAgICB0LlJvdW5kNF93aW5uZXIgPSBpKzE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcHJpbnQgd2lubmVyLlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldpbm5lclwiLCB0LlJvdW5kMV93aW5uZXIsIHQuUm91bmQyX3dpbm5lciwgdC5Sb3VuZDNfd2lubmVyLCB0LlJvdW5kNF93aW5uZXIpXHJcbiAgICAgICAgICAgIGxldCBwO1xyXG4gICAgICAgICAgICBwID0gY2MuZmluZChgQ2FudmFzL09iakNvbnRhaW5lci9Sb3VuZDEvQ2hhbXAvUCR7dC5Sb3VuZDFfd2lubmVyfWApXHJcbiAgICAgICAgICAgIGlmKHApIHAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcCA9IGNjLmZpbmQoYENhbnZhcy9PYmpDb250YWluZXIvUm91bmQyL0NoYW1wL1Ake3QuUm91bmQyX3dpbm5lcn1gKVxyXG4gICAgICAgICAgICBpZihwKSBwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHAgPSBjYy5maW5kKGBDYW52YXMvT2JqQ29udGFpbmVyL1JvdW5kMy9DaGFtcC9QJHt0LlJvdW5kM193aW5uZXJ9YClcclxuICAgICAgICAgICAgaWYocCkgcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwID0gY2MuZmluZChgQ2FudmFzL09iakNvbnRhaW5lci9Sb3VuZDQvQ2hhbXAvUCR7dC5Sb3VuZDRfd2lubmVyfWApXHJcbiAgICAgICAgICAgIGlmKHApIHAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfbGlzdGApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KXtcclxuICAgICAgICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goZnVuY3Rpb24gKHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHMudmFsKCkucGxheWVyX251bWJlciA9PSB0LlJvdW5kNF93aW5uZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Lldpbm5lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcy52YWwoKS5lbWFpbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMS41KTtcclxuICAgIH1cclxufVxyXG4iXX0=