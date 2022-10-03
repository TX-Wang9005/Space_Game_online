"use strict";
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