
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager/GameManagerS1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da618deVopI84CxsiRz16Xc', 'GameManagerS1');
// Script/GameManager/GameManagerS1.ts

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
var ChangingGround_1 = require("../Game1Object/ChangingGround");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS1 = /** @class */ (function (_super) {
    __extends(GameManagerS1, _super);
    function GameManagerS1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.CG = null;
        _this.scorepoint = null;
        _this.loadingBG = null;
        _this.GameoverBG = null;
        _this.TimerLabel = null;
        _this.GameTime = 120;
        _this.WidthPixels = 1;
        _this.HeightPixels = 10;
        _this.BGM = null;
        _this.ScoreSound = null;
        _this.GameOverSound = null;
        _this.current_user_number = 0;
        _this.player1_score = 0;
        _this.player2_score = 0;
        _this.player3_score = 0;
        _this.player4_score = 0;
        _this.player5_score = 0;
        _this.counting = 0;
        _this.physicManager = null;
        _this.timer = 0;
        _this.timeUp = false;
        return _this;
    }
    GameManagerS1.prototype.onLoad = function () {
        var _this = this;
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        // 每個player node初始化位置。
        var user = firebase.auth().currentUser.uid;
        firebase.database().ref("player_data").once('value', function (snapshot) {
            snapshot.forEach(function (player) {
                var name = player.key;
                if (name == "player1" || name == "player2" || name == "player3" || name == "player4" || name == "player5") {
                    console.log("Initial player:", name);
                    firebase.database().ref("player_data/" + name + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/" + name + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/" + name + "/state_value/X").set({ x: 96 });
                    firebase.database().ref("player_data/" + name + "/state_value/Y").set({ y: 352 });
                }
            });
        });
        //
        var player_node_number = 0;
        firebase.database().ref("user_info/" + user).once('value', function (snapshot) {
            player_node_number = snapshot.val().player_number;
        });
        this.scheduleOnce(function () {
            _this.current_user_number = player_node_number;
            // console.log("current in S1:", this.current_user_number);
        }, 2.5);
    };
    GameManagerS1.prototype.start = function () {
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
        this.scheduleOnce(function () {
            _this.CreateCG();
        }, 1.5);
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
            _this.TimerStart();
            cc.audioEngine.playMusic(_this.BGM, true);
            cc.audioEngine.setMusicVolume(0.5);
        }, 2.5);
        // firebase
        firebase.database().ref('GameOccupyLand/playerScore').set({ player1: 0, player2: 0, player3: 0, player4: 0, player5: 0 });
        this.schedule(this.UpdateScoreOnFirebase, 0.2);
    };
    GameManagerS1.prototype.update = function (dt) {
    };
    GameManagerS1.prototype.Init_player = function () {
        var handle = this;
        var _loop_1 = function (i) {
            firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: 96 });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: 352 });
                }
            });
        };
        // initialize players
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    GameManagerS1.prototype.CreateCG = function () {
        // instantiate CG
        var x, y, x_max, y_max, xpos, ypos;
        x_max = this.WidthPixels;
        y_max = this.HeightPixels;
        var CGcontainer = cc.find("Canvas/MapObjContainer");
        for (x = 0; x < x_max; x++) {
            for (y = 0; y < y_max; y++) {
                xpos = x * 32 + 16 - 1152;
                ypos = y * 32 + 16 - 800;
                // Stage1 reburn at 96,352
                if ((xpos > -64 && xpos < 256 && ypos < 512 && ypos > 192))
                    continue;
                if ((xpos == 784 && ypos == 144) || (xpos == 816 && ypos == 144) || (xpos == 784 && ypos == -272) || (xpos == 816 && ypos == -272) || (xpos == -496 && ypos == 304) ||
                    (xpos == -464 && ypos == -496) || (xpos == -496 && ypos == -496) || (xpos == -976 && ypos == 208) || (xpos == -944 && ypos == 208) || (xpos == -784 && ypos == 48) ||
                    (xpos == -752 && ypos == 48) || (xpos == -976 && ypos == -208) || (xpos == -944 && ypos == -208) || (xpos == 0 && ypos == 0) || (xpos == 0 && ypos == 0))
                    continue;
                // console.log("Create CG in (",x,",",y,").");
                var CG = cc.instantiate(this.CG);
                CG.setPosition(xpos, ypos);
                CG.getComponent(ChangingGround_1.default).gameManager = this.node;
                CGcontainer.addChild(CG);
            }
        }
    };
    // timer
    GameManagerS1.prototype.TimerStart = function () {
        this.timer = this.GameTime;
        this.TimerLabel.getComponent(cc.Label).string = this.GameTime.toString();
        this.schedule(this.UpdateTimer, 1);
    };
    GameManagerS1.prototype.UpdateTimer = function () {
        if (this.timeUp)
            return;
        if (this.timer > 0)
            this.timer += -1;
        else if (this.timer == 0)
            this.timeUp = true;
        this.TimerLabel.getComponent(cc.Label).string = this.timer.toString();
        if (this.timeUp) {
            this.GameOver();
        }
    };
    GameManagerS1.prototype.GameOver = function () {
        var _this = this;
        cc.audioEngine.stopMusic();
        this.scheduleOnce(function () {
            cc.audioEngine.playEffect(_this.GameOverSound, false);
        }, 0.5);
        this.GameoverBG.active = true;
        var scoreboard = this.GameoverBG.getChildByName("Score");
        var scorepoint = scoreboard.getChildByName("Scorepoint").getComponent(cc.Label);
        var point = scoreboard.getChildByName("Point").getComponent(cc.Label);
        var score_p1 = 0;
        var score_p2 = 0;
        var score_p3 = 0;
        var score_p4 = 0;
        var score_p5 = 0;
        firebase.database().ref('GameOccupyLand/playerScore').once('value', function (snapshot) {
            // console.log(snapshot.val().player2);
            score_p1 = snapshot.val().player1;
            score_p2 = snapshot.val().player2;
            score_p3 = snapshot.val().player3;
            score_p4 = snapshot.val().player4;
            score_p5 = snapshot.val().player5;
        });
        this.scheduleOnce(function () {
            scoreboard.active = true;
            var str = "\n";
            str += score_p1.toString() + "\n";
            str += score_p2.toString() + "\n";
            str += score_p3.toString() + "\n";
            str += score_p4.toString() + "\n";
            str += score_p5.toString();
            scorepoint.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(function () {
            var arr = [], arr2 = [];
            arr.push(score_p1);
            arr.push(score_p2);
            arr.push(score_p3);
            arr.push(score_p4);
            arr.push(score_p5);
            var cnt = 0;
            for (var i = 0; i < 5; i++) {
                cnt = 0;
                for (var j = 0; j < 5; j++) {
                    if (arr[i] < arr[j])
                        cnt++;
                }
                if (arr[i] != 0) {
                    arr2.push(80 - 20 * cnt);
                }
                else {
                    arr2.push(0);
                }
            }
            var str = "";
            for (var i = 0; i < 5; i++) {
                str += "\n+ " + arr2[i].toString();
            }
            point.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
            // firebase
            firebase.database().ref("GameResult/Round1").set({
                player1: arr2[0],
                player2: arr2[1],
                player3: arr2[2],
                player4: arr2[3],
                player5: arr2[4],
            });
        }, 5);
        this.scheduleOnce(function () {
            cc.director.loadScene("GameStage2");
        }, 10);
    };
    //
    GameManagerS1.prototype.UpdateScore = function (player, point) {
        if (player == 1 && this.current_user_number == 1) {
            this.player1_score += point;
        }
        else if (player == 2 && this.current_user_number == 2) {
            this.player2_score += point;
        }
        else if (player == 3 && this.current_user_number == 3) {
            this.player3_score += point;
        }
        else if (player == 4 && this.current_user_number == 4) {
            this.player4_score += point;
        }
        else if (player == 5 && this.current_user_number == 5) {
            this.player5_score += point;
        }
    };
    GameManagerS1.prototype.UpdateScoreOnFirebase = function () {
        var _this = this;
        var score_p1 = this.player1_score;
        var score_p2 = this.player2_score;
        var score_p3 = this.player3_score;
        var score_p4 = this.player4_score;
        var score_p5 = this.player5_score;
        var current_user_number = this.current_user_number;
        if (current_user_number == 1) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player1: score_p1
            });
        }
        else if (current_user_number == 2) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player2: score_p2
            });
        }
        else if (current_user_number == 3) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player3: score_p3,
            });
        }
        else if (current_user_number == 4) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player4: score_p4
            });
        }
        else if (current_user_number == 5) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                player5: score_p5
            });
        }
        firebase.database().ref('GameOccupyLand/playerScore').once('value', function (snapshot) {
            // console.log(snapshot.val().player2);
            score_p1 = snapshot.val().player1;
            score_p2 = snapshot.val().player2;
            score_p3 = snapshot.val().player3;
            score_p4 = snapshot.val().player4;
            score_p5 = snapshot.val().player5;
        });
        this.scheduleOnce(function () {
            if (current_user_number == 1) {
                var string = "\n";
                string += _this.player1_score.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += score_p5.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
            else if (current_user_number == 2) {
                var string = "\n";
                string += score_p1.toString() + "\n";
                string += _this.player2_score.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += score_p5.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
            else if (current_user_number == 3) {
                var string = "\n";
                string += score_p1.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += _this.player3_score.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += score_p5.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
            else if (current_user_number == 4) {
                var string = "\n";
                string += score_p1.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += _this.player4_score.toString() + "\n";
                string += score_p5.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
            else if (current_user_number == 5) {
                var string = "\n";
                string += score_p1.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += _this.player5_score.toString();
                _this.scorepoint.getComponent(cc.Label).string = string;
            }
        }, 2);
    };
    __decorate([
        property(cc.Prefab)
    ], GameManagerS1.prototype, "CG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS1.prototype, "scorepoint", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS1.prototype, "loadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS1.prototype, "GameoverBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS1.prototype, "TimerLabel", void 0);
    __decorate([
        property()
    ], GameManagerS1.prototype, "GameTime", void 0);
    __decorate([
        property()
    ], GameManagerS1.prototype, "WidthPixels", void 0);
    __decorate([
        property()
    ], GameManagerS1.prototype, "HeightPixels", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS1.prototype, "BGM", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS1.prototype, "ScoreSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS1.prototype, "GameOverSound", void 0);
    GameManagerS1 = __decorate([
        ccclass
    ], GameManagerS1);
    return GameManagerS1;
}(cc.Component));
exports.default = GameManagerS1;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlclxcR2FtZU1hbmFnZXJTMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixvQ0FBK0I7QUFDL0IsZ0VBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBNlZDO1FBelZHLFFBQUUsR0FBYyxJQUFJLENBQUM7UUFHckIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUkzQixjQUFRLEdBQVcsR0FBRyxDQUFDO1FBRXZCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBRTFCLFNBQUcsR0FBaUIsSUFBSSxDQUFDO1FBRXpCLGdCQUFVLEdBQWlCLElBQUksQ0FBQztRQUVoQyxtQkFBYSxHQUFpQixJQUFJLENBQUM7UUFFM0IseUJBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBRWhDLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFFYixtQkFBYSxHQUFzQixJQUFJLENBQUM7UUFDeEMsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixZQUFNLEdBQVksS0FBSyxDQUFDOztJQXFUcEMsQ0FBQztJQW5URyw4QkFBTSxHQUFOO1FBQUEsaUJBZ0NDO1FBL0JHLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV6QyxzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDM0MsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUNuRSxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsTUFBTTtnQkFDN0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDdEIsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7b0JBQ3ZHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3JDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSwwQkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUNuRixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksMEJBQXVCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFDbkYsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLDZCQUEwQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQ3RGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSwwQkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO29CQUM3RixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksbUJBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDM0UsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLG1CQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7aUJBQy9FO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUU7UUFDRixJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQztRQUMzQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWEsSUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLFFBQVE7WUFDekUsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN0RCxDQUFDLENBQ0EsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsMkRBQTJEO1FBQy9ELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVaLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQUEsaUJBbUNDO1FBbENHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3hELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUN4RCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3hELElBQUksT0FBTztZQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDM0QsSUFBSSxPQUFPO1lBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMzRCxJQUFJLE9BQU87WUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzNELElBQUksT0FBTztZQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDM0QsSUFBSSxPQUFPO1lBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUUzRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDUixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksT0FBTztnQkFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzFELElBQUksT0FBTztnQkFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzFELElBQUksT0FBTztnQkFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzFELElBQUksT0FBTztnQkFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzFELElBQUksT0FBTztnQkFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzFELE9BQU87WUFDUCxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFUixXQUFXO1FBQ1gsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFMUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFbkQsQ0FBQztJQUVELDhCQUFNLEdBQU4sVUFBTyxFQUFFO0lBRVQsQ0FBQztJQUNELG1DQUFXLEdBQVg7UUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0NBRVQsQ0FBQztZQUNOLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWdCLENBQUMsYUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLFFBQVE7Z0JBQ2pGLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDeEIsRUFBRSxDQUFDLElBQUksQ0FBQyxrQ0FBZ0MsQ0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDM0QsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBcUIsQ0FBQywwQkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUN0RixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLHVCQUFxQixDQUFDLDBCQUF1QixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQ3RGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsdUJBQXFCLENBQUMsNkJBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFDekYsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBcUIsQ0FBQywwQkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO29CQUNoRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLHVCQUFxQixDQUFDLG1CQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7b0JBQzlFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsdUJBQXFCLENBQUMsbUJBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtpQkFDbEY7WUFDTCxDQUFDLENBQUMsQ0FBQTs7UUFaTixxQkFBcUI7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQWxCLENBQUM7U0FZVDtRQUNELGNBQWM7SUFDbEIsQ0FBQztJQUNELGdDQUFRLEdBQVI7UUFDSSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztRQUNuQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMxQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDcEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQ3pCLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztvQkFBRSxTQUFTO2dCQUNyRSxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUM7b0JBQy9KLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDbEssQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7b0JBQ3hKLFNBQVM7Z0JBQ2IsOENBQThDO2dCQUM5QyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN4RCxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzVCO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNSLGtDQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsbUNBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO1lBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQztZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV0RSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsZ0NBQVEsR0FBUjtRQUFBLGlCQXNFQztRQXJFRyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEYsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ2xGLHVDQUF1QztZQUN2QyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDZixHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNsQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNsQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNsQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNsQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QixHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNSLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQUUsR0FBRyxFQUFFLENBQUM7aUJBQzlCO2dCQUNELElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQzVCO3FCQUFNO29CQUNILElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hCO2FBQ0o7WUFDRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QixHQUFHLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN0QztZQUNELEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEQsV0FBVztZQUNYLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQzdDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNuQixDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELEVBQUU7SUFDRixtQ0FBVyxHQUFYLFVBQVksTUFBYyxFQUFFLEtBQWE7UUFDckMsSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUM7U0FDL0I7YUFBTSxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsRUFBRTtZQUNyRCxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQztTQUMvQjthQUFNLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUM7U0FDL0I7YUFBTSxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsRUFBRTtZQUNyRCxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFDRCw2Q0FBcUIsR0FBckI7UUFBQSxpQkF5RkM7UUF4RkcsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ2xDLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ25ELElBQUksbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQzFCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDthQUFNLElBQUksbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDthQUFNLElBQUksbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDthQUFNLElBQUksbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDthQUFNLElBQUksbUJBQW1CLElBQUksQ0FBQyxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hELE1BQU0sQ0FBQztnQkFDSixPQUFPLEVBQUUsUUFBUTthQUNwQixDQUNBLENBQUM7U0FDVDtRQUNELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUNsRix1Q0FBdUM7WUFDdkMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDbEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENB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U0FBUyxDQUFDO3FEQUNTO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0RBQ1k7SUEzQmxCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0E2VmpDO0lBQUQsb0JBQUM7Q0E3VkQsQUE2VkMsQ0E3VjBDLEVBQUUsQ0FBQyxTQUFTLEdBNlZ0RDtrQkE3Vm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllclwiO1xyXG5pbXBvcnQgQ2hhbmdpbmdHcm91bmQgZnJvbSBcIi4uL0dhbWUxT2JqZWN0L0NoYW5naW5nR3JvdW5kXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFuYWdlclMxIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIENHOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc2NvcmVwb2ludDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxvYWRpbmdCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEdhbWVvdmVyQkc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUaW1lckxhYmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIEdhbWVUaW1lOiBudW1iZXIgPSAxMjA7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgV2lkdGhQaXhlbHM6IG51bWJlciA9IDE7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgSGVpZ2h0UGl4ZWxzOiBudW1iZXIgPSAxMDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBCR006IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgU2NvcmVTb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBHYW1lT3ZlclNvdW5kOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyX251bWJlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHBsYXllcjFfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHBsYXllcjJfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHBsYXllcjNfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHBsYXllcjRfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHBsYXllcjVfc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGNvdW50aW5nID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHBoeXNpY01hbmFnZXI6IGNjLlBoeXNpY3NNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgdGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHRpbWVVcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMucGh5c2ljTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZ3Jhdml0eSA9IGNjLnYyKDAsIDApO1xyXG5cclxuICAgICAgICAvLyDmr4/lgItwbGF5ZXIgbm9kZeWIneWni+WMluS9jee9ruOAglxyXG4gICAgICAgIHZhciB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGFgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBzbmFwc2hvdC5mb3JFYWNoKGZ1bmN0aW9uIChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gcGxheWVyLmtleTtcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lID09IFwicGxheWVyMVwiIHx8IG5hbWUgPT0gXCJwbGF5ZXIyXCIgfHwgbmFtZSA9PSBcInBsYXllcjNcIiB8fCBuYW1lID09IFwicGxheWVyNFwiIHx8IG5hbWUgPT0gXCJwbGF5ZXI1XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluaXRpYWwgcGxheWVyOlwiLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7bmFtZX0vc3RhdGVfdmFsdWUvcHJlbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtuYW1lfS9zdGF0ZV92YWx1ZS9tb3ZlYWJsZWApLnNldCh7IG1vdmVhYmxlOiBcInRydWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiA5NiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke25hbWV9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAzNTIgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgbGV0IHBsYXllcl9ub2RlX251bWJlciA9IDA7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VzZXJ9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgcGxheWVyX25vZGVfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF91c2VyX251bWJlciA9IHBsYXllcl9ub2RlX251bWJlcjtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjdXJyZW50IGluIFMxOlwiLCB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIpO1xyXG4gICAgICAgIH0sIDIuNSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHBsYXllcjEgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIxXCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXIyID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMlwiKTtcclxuICAgICAgICBsZXQgcGxheWVyMyA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjNcIik7XHJcbiAgICAgICAgbGV0IHBsYXllcjQgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXI0XCIpO1xyXG4gICAgICAgIGxldCBwbGF5ZXI1ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNVwiKTtcclxuICAgICAgICBpZiAocGxheWVyMSkgcGxheWVyMS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChwbGF5ZXIyKSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHBsYXllcjMpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAocGxheWVyNCkgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChwbGF5ZXI1KSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuSW5pdF9wbGF5ZXIoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlQ0coKTtcclxuICAgICAgICB9LCAxLjUpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIxKSBwbGF5ZXIxLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHBsYXllcjIpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyMykgcGxheWVyNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXI0KSBwbGF5ZXI1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHBsYXllcjUpIHBsYXllcjUuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyDplovlp4voqIjmmYJcclxuICAgICAgICAgICAgdGhpcy5UaW1lclN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDAuNSk7XHJcbiAgICAgICAgfSwgMi41KTtcclxuXHJcbiAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignR2FtZU9jY3VweUxhbmQvcGxheWVyU2NvcmUnKS5zZXQoeyBwbGF5ZXIxOiAwLCBwbGF5ZXIyOiAwLCBwbGF5ZXIzOiAwLCBwbGF5ZXI0OiAwLCBwbGF5ZXI1OiAwIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuVXBkYXRlU2NvcmVPbkZpcmViYXNlLCAwLjIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuXHJcbiAgICB9XHJcbiAgICBJbml0X3BsYXllcigpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAvLyBpbml0aWFsaXplIHBsYXllcnNcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllci9wbGF5ZXIke2l9X2lzbG9naW5gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkgeyAvLyDlpoLmnpznjqnlrrbnmbvlhaVcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9YCkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvcHJlbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlYWJsZWApLnNldCh7IG1vdmVhYmxlOiBcInRydWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiA5NiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAzNTIgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW5pdGlhbCBFbmRcclxuICAgIH1cclxuICAgIENyZWF0ZUNHKCkge1xyXG4gICAgICAgIC8vIGluc3RhbnRpYXRlIENHXHJcbiAgICAgICAgbGV0IHgsIHksIHhfbWF4LCB5X21heCwgeHBvcywgeXBvcztcclxuICAgICAgICB4X21heCA9IHRoaXMuV2lkdGhQaXhlbHM7XHJcbiAgICAgICAgeV9tYXggPSB0aGlzLkhlaWdodFBpeGVscztcclxuICAgICAgICBsZXQgQ0djb250YWluZXIgPSBjYy5maW5kKFwiQ2FudmFzL01hcE9iakNvbnRhaW5lclwiKTtcclxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgeF9tYXg7IHgrKykge1xyXG4gICAgICAgICAgICBmb3IgKHkgPSAwOyB5IDwgeV9tYXg7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgeHBvcyA9IHggKiAzMiArIDE2IC0gMTE1MjtcclxuICAgICAgICAgICAgICAgIHlwb3MgPSB5ICogMzIgKyAxNiAtIDgwMDtcclxuICAgICAgICAgICAgICAgIC8vIFN0YWdlMSByZWJ1cm4gYXQgOTYsMzUyXHJcbiAgICAgICAgICAgICAgICBpZiAoKHhwb3MgPiAtNjQgJiYgeHBvcyA8IDI1NiAmJiB5cG9zIDwgNTEyICYmIHlwb3MgPiAxOTIpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmICgoeHBvcyA9PSA3ODQgJiYgeXBvcyA9PSAxNDQpIHx8ICh4cG9zID09IDgxNiAmJiB5cG9zID09IDE0NCkgfHwgKHhwb3MgPT0gNzg0ICYmIHlwb3MgPT0gLTI3MikgfHwgKHhwb3MgPT0gODE2ICYmIHlwb3MgPT0gLTI3MikgfHwgKHhwb3MgPT0gLTQ5NiAmJiB5cG9zID09IDMwNCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAoeHBvcyA9PSAtNDY0ICYmIHlwb3MgPT0gLTQ5NikgfHwgKHhwb3MgPT0gLTQ5NiAmJiB5cG9zID09IC00OTYpIHx8ICh4cG9zID09IC05NzYgJiYgeXBvcyA9PSAyMDgpIHx8ICh4cG9zID09IC05NDQgJiYgeXBvcyA9PSAyMDgpIHx8ICh4cG9zID09IC03ODQgJiYgeXBvcyA9PSA0OCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAoeHBvcyA9PSAtNzUyICYmIHlwb3MgPT0gNDgpIHx8ICh4cG9zID09IC05NzYgJiYgeXBvcyA9PSAtMjA4KSB8fCAoeHBvcyA9PSAtOTQ0ICYmIHlwb3MgPT0gLTIwOCkgfHwgKHhwb3MgPT0gMCAmJiB5cG9zID09IDApIHx8ICh4cG9zID09IDAgJiYgeXBvcyA9PSAwKSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3JlYXRlIENHIGluIChcIix4LFwiLFwiLHksXCIpLlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBDRyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuQ0cpO1xyXG4gICAgICAgICAgICAgICAgQ0cuc2V0UG9zaXRpb24oeHBvcywgeXBvcyk7XHJcbiAgICAgICAgICAgICAgICBDRy5nZXRDb21wb25lbnQoQ2hhbmdpbmdHcm91bmQpLmdhbWVNYW5hZ2VyID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAgICAgQ0djb250YWluZXIuYWRkQ2hpbGQoQ0cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gdGltZXJcclxuICAgIFRpbWVyU3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lciA9IHRoaXMuR2FtZVRpbWU7XHJcbiAgICAgICAgdGhpcy5UaW1lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5HYW1lVGltZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5VcGRhdGVUaW1lciwgMSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGVUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lVXApIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy50aW1lciA+IDApIHRoaXMudGltZXIgKz0gLTE7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy50aW1lciA9PSAwKSB0aGlzLnRpbWVVcCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5UaW1lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy50aW1lci50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lVXApIHtcclxuICAgICAgICAgICAgdGhpcy5HYW1lT3ZlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVPdmVyKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5HYW1lT3ZlclNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMC41KTtcclxuICAgICAgICB0aGlzLkdhbWVvdmVyQkcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2NvcmVib2FyZCA9IHRoaXMuR2FtZW92ZXJCRy5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlXCIpO1xyXG4gICAgICAgIGxldCBzY29yZXBvaW50ID0gc2NvcmVib2FyZC5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlcG9pbnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXQgcG9pbnQgPSBzY29yZWJvYXJkLmdldENoaWxkQnlOYW1lKFwiUG9pbnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXQgc2NvcmVfcDEgPSAwO1xyXG4gICAgICAgIGxldCBzY29yZV9wMiA9IDA7XHJcbiAgICAgICAgbGV0IHNjb3JlX3AzID0gMDtcclxuICAgICAgICBsZXQgc2NvcmVfcDQgPSAwO1xyXG4gICAgICAgIGxldCBzY29yZV9wNSA9IDA7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ0dhbWVPY2N1cHlMYW5kL3BsYXllclNjb3JlJykub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc25hcHNob3QudmFsKCkucGxheWVyMik7XHJcbiAgICAgICAgICAgIHNjb3JlX3AxID0gc25hcHNob3QudmFsKCkucGxheWVyMTtcclxuICAgICAgICAgICAgc2NvcmVfcDIgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXIyO1xyXG4gICAgICAgICAgICBzY29yZV9wMyA9IHNuYXBzaG90LnZhbCgpLnBsYXllcjM7XHJcbiAgICAgICAgICAgIHNjb3JlX3A0ID0gc25hcHNob3QudmFsKCkucGxheWVyNDtcclxuICAgICAgICAgICAgc2NvcmVfcDUgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXI1O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgc2NvcmVib2FyZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IHNjb3JlX3AxLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gc2NvcmVfcDIudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBzY29yZV9wMy50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IHNjb3JlX3A0LnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gc2NvcmVfcDUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgc2NvcmVwb2ludC5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5TY29yZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10sIGFycjIgPSBbXTtcclxuICAgICAgICAgICAgYXJyLnB1c2goc2NvcmVfcDEpO1xyXG4gICAgICAgICAgICBhcnIucHVzaChzY29yZV9wMik7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHNjb3JlX3AzKTtcclxuICAgICAgICAgICAgYXJyLnB1c2goc2NvcmVfcDQpO1xyXG4gICAgICAgICAgICBhcnIucHVzaChzY29yZV9wNSk7XHJcbiAgICAgICAgICAgIGxldCBjbnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY250ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycltpXSA8IGFycltqXSkgY250Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIyLnB1c2goODAgLSAyMCAqIGNudCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycjIucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN0ciArPSBcIlxcbisgXCIgKyBhcnIyW2ldLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcG9pbnQuc3RyaW5nID0gc3RyO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuU2NvcmVTb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyBmaXJlYmFzZVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgR2FtZVJlc3VsdC9Sb3VuZDFgKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgcGxheWVyMTogYXJyMlswXSxcclxuICAgICAgICAgICAgICAgIHBsYXllcjI6IGFycjJbMV0sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIzOiBhcnIyWzJdLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyNDogYXJyMlszXSxcclxuICAgICAgICAgICAgICAgIHBsYXllcjU6IGFycjJbNF0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiR2FtZVN0YWdlMlwiKTtcclxuICAgICAgICB9LCAxMCk7XHJcbiAgICB9XHJcbiAgICAvL1xyXG4gICAgVXBkYXRlU2NvcmUocGxheWVyOiBudW1iZXIsIHBvaW50OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAocGxheWVyID09IDEgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIxX3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IDIgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIyX3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IDMgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIzX3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IDQgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXI0X3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IDUgJiYgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID09IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXI1X3Njb3JlICs9IHBvaW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFVwZGF0ZVNjb3JlT25GaXJlYmFzZSgpIHtcclxuICAgICAgICBsZXQgc2NvcmVfcDEgPSB0aGlzLnBsYXllcjFfc2NvcmU7XHJcbiAgICAgICAgbGV0IHNjb3JlX3AyID0gdGhpcy5wbGF5ZXIyX3Njb3JlO1xyXG4gICAgICAgIGxldCBzY29yZV9wMyA9IHRoaXMucGxheWVyM19zY29yZTtcclxuICAgICAgICBsZXQgc2NvcmVfcDQgPSB0aGlzLnBsYXllcjRfc2NvcmU7XHJcbiAgICAgICAgbGV0IHNjb3JlX3A1ID0gdGhpcy5wbGF5ZXI1X3Njb3JlO1xyXG4gICAgICAgIGxldCBjdXJyZW50X3VzZXJfbnVtYmVyID0gdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyO1xyXG4gICAgICAgIGlmIChjdXJyZW50X3VzZXJfbnVtYmVyID09IDEpIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ0dhbWVPY2N1cHlMYW5kL3BsYXllclNjb3JlJylcclxuICAgICAgICAgICAgICAgIC51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllcjE6IHNjb3JlX3AxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudF91c2VyX251bWJlciA9PSAyKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdHYW1lT2NjdXB5TGFuZC9wbGF5ZXJTY29yZScpXHJcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIyOiBzY29yZV9wMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRfdXNlcl9udW1iZXIgPT0gMykge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignR2FtZU9jY3VweUxhbmQvcGxheWVyU2NvcmUnKVxyXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyMzogc2NvcmVfcDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudF91c2VyX251bWJlciA9PSA0KSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdHYW1lT2NjdXB5TGFuZC9wbGF5ZXJTY29yZScpXHJcbiAgICAgICAgICAgICAgICAudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXI0OiBzY29yZV9wNFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRfdXNlcl9udW1iZXIgPT0gNSkge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignR2FtZU9jY3VweUxhbmQvcGxheWVyU2NvcmUnKVxyXG4gICAgICAgICAgICAgICAgLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyNTogc2NvcmVfcDVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdHYW1lT2NjdXB5TGFuZC9wbGF5ZXJTY29yZScpLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNuYXBzaG90LnZhbCgpLnBsYXllcjIpO1xyXG4gICAgICAgICAgICBzY29yZV9wMSA9IHNuYXBzaG90LnZhbCgpLnBsYXllcjE7XHJcbiAgICAgICAgICAgIHNjb3JlX3AyID0gc25hcHNob3QudmFsKCkucGxheWVyMjtcclxuICAgICAgICAgICAgc2NvcmVfcDMgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXIzO1xyXG4gICAgICAgICAgICBzY29yZV9wNCA9IHNuYXBzaG90LnZhbCgpLnBsYXllcjQ7XHJcbiAgICAgICAgICAgIHNjb3JlX3A1ID0gc25hcHNob3QudmFsKCkucGxheWVyNTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50X3VzZXJfbnVtYmVyID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHRoaXMucGxheWVyMV9zY29yZS50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wMi50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wMy50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wNC50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wNS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZXBvaW50LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRfdXNlcl9udW1iZXIgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZyA9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDEudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gdGhpcy5wbGF5ZXIyX3Njb3JlLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3AzLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3A0LnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3A1LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlcG9pbnQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudF91c2VyX251bWJlciA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyaW5nID0gXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wMS50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wMi50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSB0aGlzLnBsYXllcjNfc2NvcmUudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDQudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVwb2ludC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cmluZztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50X3VzZXJfbnVtYmVyID09IDQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3AxLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3AyLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHNjb3JlX3AzLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IHRoaXMucGxheWVyNF9zY29yZS50b1N0cmluZygpICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIHN0cmluZyArPSBzY29yZV9wNS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZXBvaW50LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRfdXNlcl9udW1iZXIgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZyA9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDEudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDIudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDMudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gc2NvcmVfcDQudG9TdHJpbmcoKSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gdGhpcy5wbGF5ZXI1X3Njb3JlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlcG9pbnQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==