"use strict";
cc._RF.push(module, '6c5315gzDRHgb+CuJr61tW8', 'GameManagerS2');
// Script/GameManager/GameManagerS2.ts

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
var PlayerGhost_1 = require("../Game2Object/PlayerGhost");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS2 = /** @class */ (function (_super) {
    __extends(GameManagerS2, _super);
    function GameManagerS2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.SpaceBG = null;
        _this.GameoverBG = null;
        _this.TimerLabel = null;
        _this.GhostLabel = null;
        _this.StartText = null;
        _this.BGM1 = null;
        _this.BGM2 = null;
        _this.ScoreSound = null;
        _this.GameOverSound = null;
        _this.becomeGhostEffect = null;
        _this.GameTime = 120;
        _this.GhostSpeed = 200;
        _this.PlayerSpeed = 100;
        _this.physicManager = null;
        _this.counting = 0;
        _this.player_array = [];
        _this.player_node1 = null;
        _this.player_node2 = null;
        _this.player_node3 = null;
        _this.player_node4 = null;
        _this.player_node5 = null;
        _this.current_user_number = 0;
        _this.P_state = ["", "player", "player", "player", "player", "player"];
        _this.P_prevstate = ["", "player", "player", "player", "player", "player"];
        _this.cooldown = false;
        _this.timer = 0;
        _this.timeUp = false;
        return _this;
    }
    GameManagerS2.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        var uid = firebase.auth().currentUser.uid;
        var t = this;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            t.current_user_number = snapshot.val().player_number;
        });
    };
    GameManagerS2.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        // 一開始所有玩家都不能動
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1)
            this.player_node1.getComponent(PlayerGhost_1.default).moveable = false;
        if (this.player_node2)
            this.player_node2.getComponent(PlayerGhost_1.default).moveable = false;
        if (this.player_node3)
            this.player_node3.getComponent(PlayerGhost_1.default).moveable = false;
        if (this.player_node4)
            this.player_node4.getComponent(PlayerGhost_1.default).moveable = false;
        if (this.player_node5)
            this.player_node5.getComponent(PlayerGhost_1.default).moveable = false;
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (_this.player_node1)
                _this.player_node1.getComponent(PlayerGhost_1.default).moveable = true;
            if (_this.player_node2)
                _this.player_node2.getComponent(PlayerGhost_1.default).moveable = true;
            if (_this.player_node3)
                _this.player_node3.getComponent(PlayerGhost_1.default).moveable = true;
            if (_this.player_node4)
                _this.player_node4.getComponent(PlayerGhost_1.default).moveable = true;
            if (_this.player_node5)
                _this.player_node5.getComponent(PlayerGhost_1.default).moveable = true;
            _this.TimerStart();
            _this.StartText.active = true;
            var action = cc.sequence(cc.fadeOut(0.5), cc.fadeIn(0.5), cc.fadeOut(0.5), cc.fadeIn(0.5), cc.fadeOut(0.5));
            _this.StartText.runAction(action);
            cc.audioEngine.playMusic(_this.BGM2, true);
            cc.audioEngine.setMusicVolume(3);
        }, 2.5);
        this.Init_player();
        // 五秒後選出鬼
        this.scheduleOnce(function () {
            // this.choose_ghost(this.getRandomInt(this.player_array.length)); // 每個人開遊戲會random不一樣，所以這方法不行
            _this.choose_ghost(1, -1);
            _this.schedule(_this.GetPlayerState, 0.3);
            _this.StartText.active = false;
            if (1 == _this.current_user_number) {
                cc.audioEngine.playMusic(_this.BGM1, true);
                cc.audioEngine.setMusicVolume(1);
            }
        }, 5);
        this.scheduleOnce(function () {
            _this.schedule(_this.UpdateGroup, 0.3);
        }, 8);
        // SpaceBG Action
        var action;
        action = cc.repeatForever(cc.rotateBy(100, 360));
        this.SpaceBG.runAction(action);
    };
    GameManagerS2.prototype.choose_ghost = function (Tobeghost_id, Peopleback_id) {
        console.log('Who fuck? ID:', Tobeghost_id);
        console.log("Player ARR:", this.player_array.length, this.player_array);
        //choose from player array
        var ghost_id = Tobeghost_id; // initially set player 1 to be ghost
        for (var i = 1; i < this.player_array.length + 1; i++) {
            if (i == ghost_id) {
                // firebase
                firebase.database().ref("game2/player" + i).set({ type: "ghost" });
                // Make a ghost
                var Gnode = cc.find("Canvas/PlayerContainer/player" + i);
                var ghostBornEffect = cc.instantiate(this.becomeGhostEffect);
                cc.find("Canvas/PlayerContainer/player" + i + "/Label").getComponent(cc.Label).string = "ghost";
                Gnode.setPosition(-176, 752);
                Gnode.group = 'ghost';
                Gnode.active = false;
                Gnode.active = true;
                Gnode.setPosition(-176, 752);
                Gnode.getComponent(PlayerGhost_1.default).moveable = false;
                Gnode.getComponent(PlayerGhost_1.default).playerSpeed = this.GhostSpeed;
                // play particle effect
                Gnode.parent.addChild(ghostBornEffect);
                ghostBornEffect.setPosition(Gnode.position);
                var action = void 0;
                var sequence1 = cc.sequence(cc.fadeTo(0.25, 120), cc.fadeIn(0.25), cc.scaleBy(0.1, 1.1));
                action = cc.repeat(sequence1, 5);
                Gnode.runAction(action);
                this.scheduleOnce(function () {
                    Gnode.getComponent(PlayerGhost_1.default).moveable = true;
                }, 3);
                // make ghost end
            }
            else if (i == Peopleback_id) {
                firebase.database().ref("game2/player" + i).set({ type: "player" });
                cc.find("Canvas/PlayerContainer/player" + i + "/Label").getComponent(cc.Label).string = "player";
                var Pnode = cc.find("Canvas/PlayerContainer/player" + i);
                Pnode.setPosition(240, -48);
                Pnode.group = 'player';
                Pnode.active = false;
                Pnode.active = true;
                Pnode.getComponent(PlayerGhost_1.default).moveable = false;
                Pnode.getComponent(PlayerGhost_1.default).playerSpeed = this.PlayerSpeed;
                Pnode.runAction(cc.scaleTo(0.1, 1));
                var action = void 0;
                var sequence1 = cc.sequence(cc.fadeTo(0.25, 120), cc.fadeIn(0.25));
                action = cc.repeat(sequence1, 5);
                Pnode.runAction(action);
                this.scheduleOnce(function () {
                    Pnode.getComponent(PlayerGhost_1.default).moveable = true;
                }, 2.5);
            }
            else {
                firebase.database().ref("game2/player" + i).set({ type: "player" });
                cc.find("Canvas/PlayerContainer/player" + i + "/Label").getComponent(cc.Label).string = "player";
                var Nnode = cc.find("Canvas/PlayerContainer/player" + i);
                Nnode.group = 'player';
                Nnode.active = false;
                Nnode.active = true;
                Nnode.getComponent(PlayerGhost_1.default).playerSpeed = this.PlayerSpeed;
                Nnode.runAction(cc.scaleTo(0.5, 1));
            }
        }
    };
    // getRandomInt(max: number) {
    //     return Math.ceil(Math.random() * max);
    // }
    // update(dt) {
    // }
    GameManagerS2.prototype.Init_player = function () {
        var handle = this;
        var _loop_1 = function (i) {
            firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    handle.player_array.push(i);
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: 240 });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -48 });
                }
            });
        };
        // initialize players        
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    // timer
    GameManagerS2.prototype.TimerStart = function () {
        this.timer = this.GameTime;
        this.TimerLabel.getComponent(cc.Label).string = this.GameTime.toString();
        this.schedule(this.UpdateTimer, 1);
    };
    GameManagerS2.prototype.UpdateTimer = function () {
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
    GameManagerS2.prototype.GameOver = function () {
        var _this = this;
        cc.audioEngine.stopMusic();
        this.scheduleOnce(function () {
            cc.audioEngine.playEffect(_this.GameOverSound, false);
        }, 0.5);
        this.GameoverBG.active = true;
        var scoreboard = this.GameoverBG.getChildByName("Score");
        var scorepoint = scoreboard.getChildByName("Scorepoint").getComponent(cc.Label);
        var point = scoreboard.getChildByName("Point").getComponent(cc.Label);
        var P_state = this.P_state;
        this.scheduleOnce(function () {
            scoreboard.active = true;
            var str = "\n";
            str += P_state[1] + "\n";
            str += P_state[2] + "\n";
            str += P_state[3] + "\n";
            str += P_state[4] + "\n";
            str += P_state[5];
            scorepoint.string = str;
            cc.audioEngine.playEffect(_this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(function () {
            var arr2 = [];
            for (var i = 1; i <= 5; i++) {
                if (P_state[i] == 'player') {
                    arr2.push(30);
                }
                else if (P_state[i] == 'ghost') {
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
            firebase.database().ref("GameResult/Round2").set({
                player1: arr2[0],
                player2: arr2[1],
                player3: arr2[2],
                player4: arr2[3],
                player5: arr2[4],
            });
        }, 5);
        this.scheduleOnce(function () {
            cc.director.loadScene("GameStage4");
        }, 10);
    };
    GameManagerS2.prototype.GetPlayerState = function () {
        // console.log("Get player state!");
        // 看每個玩家的身分。
        var t = this;
        var _loop_2 = function (i) {
            firebase.database().ref("game2/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    // console.log("player",i, snapshot.val().type);
                    t.P_prevstate[i] = t.P_state[i];
                    t.P_state[i] = snapshot.val().type;
                    if (snapshot.val().type == 'ghost') {
                        t.GhostLabel.getComponent(cc.Label).string = "P" + i.toString();
                    }
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_2(i);
        }
    };
    GameManagerS2.prototype.UpdateGroup = function () {
        var _this = this;
        // 根據身分更新。
        var t = this;
        var ghost_id = -1, back_id = -1;
        var change = false;
        for (var i = 1; i <= 5; i++) {
            if (t.P_prevstate[i] == "player" && t.P_state[i] == "ghost") { // 變成鬼
                console.log("player", i, "become ghost!!!!!!!!!");
                ghost_id = i;
                change = true;
            }
            else if (t.P_prevstate[i] == "ghost" && t.P_state[i] == "player") { // 變回人
                console.log("player", i, "back to player!!!!!!!!!");
                back_id = i;
                change = true;
            }
        }
        if (change && !this.cooldown) {
            this.cooldown = true;
            this.choose_ghost(ghost_id, back_id);
            this.scheduleOnce(function () {
                _this.cooldown = false;
            }, 3);
            // 鬼BGM
            if (ghost_id == this.current_user_number) {
                cc.audioEngine.stopMusic();
                cc.audioEngine.playMusic(this.BGM1, true);
                cc.audioEngine.setMusicVolume(1);
            }
            else if (back_id == this.current_user_number) {
                cc.audioEngine.stopMusic();
                cc.audioEngine.playMusic(this.BGM2, true);
                cc.audioEngine.setMusicVolume(3);
            }
        }
        // console.log(t.P_prevstate, t.P_state);
    };
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "loadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "SpaceBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "GameoverBG", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "TimerLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "GhostLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameManagerS2.prototype, "StartText", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS2.prototype, "BGM1", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS2.prototype, "BGM2", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS2.prototype, "ScoreSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameManagerS2.prototype, "GameOverSound", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameManagerS2.prototype, "becomeGhostEffect", void 0);
    __decorate([
        property()
    ], GameManagerS2.prototype, "GameTime", void 0);
    __decorate([
        property()
    ], GameManagerS2.prototype, "GhostSpeed", void 0);
    __decorate([
        property()
    ], GameManagerS2.prototype, "PlayerSpeed", void 0);
    GameManagerS2 = __decorate([
        ccclass
    ], GameManagerS2);
    return GameManagerS2;
}(cc.Component));
exports.default = GameManagerS2;

cc._RF.pop();