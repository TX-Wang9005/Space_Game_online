
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager/GameManagerS2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlclxcR2FtZU1hbmFnZXJTMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRiwwREFBcUQ7QUFDL0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUE4VUM7UUEzVUcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBRXhCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFMUIsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFMUIsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDO1FBRWhDLG1CQUFhLEdBQWlCLElBQUksQ0FBQztRQUduQyx1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFHcEMsY0FBUSxHQUFXLEdBQUcsQ0FBQztRQUV2QixnQkFBVSxHQUFXLEdBQUcsQ0FBQztRQUV6QixpQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUVsQixtQkFBYSxHQUFzQixJQUFJLENBQUM7UUFDaEQsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGtCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWxCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRXJCLHlCQUFtQixHQUFXLENBQUMsQ0FBQztRQUVoQyxhQUFPLEdBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNFLGlCQUFXLEdBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRS9FLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixZQUFNLEdBQVksS0FBSyxDQUFDOztJQTBScEMsQ0FBQztJQXRSRyw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNiLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBYSxHQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUN4RSxDQUFDLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQUEsaUJBc0RDO1FBbkRHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM3QixjQUFjO1FBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3BGLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNwRixJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDcEYsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3BGLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNwRixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksS0FBSSxDQUFDLFlBQVk7Z0JBQUUsS0FBSSxDQUFDLFlBQVks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ZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXJHaG9zdCBmcm9tIFwiLi4vR2FtZTJPYmplY3QvUGxheWVyR2hvc3RcIjtcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1hbmFnZXJTMiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbG9hZGluZ0JHOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU3BhY2VCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEdhbWVvdmVyQkc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUaW1lckxhYmVsOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgR2hvc3RMYWJlbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFN0YXJ0VGV4dDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIEJHTTE6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgQkdNMjogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBTY29yZVNvdW5kOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIEdhbWVPdmVyU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJlY29tZUdob3N0RWZmZWN0OiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBHYW1lVGltZTogbnVtYmVyID0gMTIwO1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIEdob3N0U3BlZWQ6IG51bWJlciA9IDIwMDtcclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBQbGF5ZXJTcGVlZDogbnVtYmVyID0gMTAwO1xyXG5cclxuICAgIHByaXZhdGUgcGh5c2ljTWFuYWdlcjogY2MuUGh5c2ljc01hbmFnZXIgPSBudWxsO1xyXG4gICAgY291bnRpbmcgPSAwO1xyXG4gICAgcGxheWVyX2FycmF5ID0gW107XHJcblxyXG4gICAgcGxheWVyX25vZGUxOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlMjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcGxheWVyX25vZGU0OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlNTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgUF9zdGF0ZTogc3RyaW5nW10gPSBbXCJcIiwgXCJwbGF5ZXJcIiwgXCJwbGF5ZXJcIiwgXCJwbGF5ZXJcIiwgXCJwbGF5ZXJcIiwgXCJwbGF5ZXJcIl07XHJcbiAgICBwcml2YXRlIFBfcHJldnN0YXRlOiBzdHJpbmdbXSA9IFtcIlwiLCBcInBsYXllclwiLCBcInBsYXllclwiLCBcInBsYXllclwiLCBcInBsYXllclwiLCBcInBsYXllclwiXTtcclxuXHJcbiAgICBwcml2YXRlIGNvb2xkb3duOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgdGltZVVwOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAwKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdWlkID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VpZH1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICB0LmN1cnJlbnRfdXNlcl9udW1iZXIgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXJfbnVtYmVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyDkuIDplovlp4vmiYDmnInnjqnlrrbpg73kuI3og73li5VcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlMSA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjFcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTIgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIyXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGUzID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyM1wiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlNCA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjRcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTUgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXI1XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMSkgdGhpcy5wbGF5ZXJfbm9kZTEuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMikgdGhpcy5wbGF5ZXJfbm9kZTIuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNCkgdGhpcy5wbGF5ZXJfbm9kZTQuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNSkgdGhpcy5wbGF5ZXJfbm9kZTUuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMSkgdGhpcy5wbGF5ZXJfbm9kZTEuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMikgdGhpcy5wbGF5ZXJfbm9kZTIuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNCkgdGhpcy5wbGF5ZXJfbm9kZTQuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNSkgdGhpcy5wbGF5ZXJfbm9kZTUuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlRpbWVyU3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRleHQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC41KSxjYy5mYWRlSW4oMC41KSxjYy5mYWRlT3V0KDAuNSksY2MuZmFkZUluKDAuNSksY2MuZmFkZU91dCgwLjUpKTtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRleHQucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTTIsIHRydWUpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSgzKTtcclxuICAgICAgICB9LCAyLjUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuSW5pdF9wbGF5ZXIoKTtcclxuXHJcbiAgICAgICAgLy8g5LqU56eS5b6M6YG45Ye66ay8XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgLy8gdGhpcy5jaG9vc2VfZ2hvc3QodGhpcy5nZXRSYW5kb21JbnQodGhpcy5wbGF5ZXJfYXJyYXkubGVuZ3RoKSk7IC8vIOavj+WAi+S6uumWi+mBiuaIsuacg3JhbmRvbeS4jeS4gOaoo++8jOaJgOS7pemAmeaWueazleS4jeihjFxyXG4gICAgICAgICAgICB0aGlzLmNob29zZV9naG9zdCgxLCAtMSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5HZXRQbGF5ZXJTdGF0ZSwgMC4zKTtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRleHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKDEgPT0gdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTTEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA1KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuVXBkYXRlR3JvdXAsIDAuMyk7XHJcbiAgICAgICAgfSwgOCk7XHJcblxyXG5cclxuICAgICAgICAvLyBTcGFjZUJHIEFjdGlvblxyXG4gICAgICAgIGxldCBhY3Rpb246Y2MuQWN0aW9uO1xyXG4gICAgICAgIGFjdGlvbiA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMTAwLDM2MCkpO1xyXG4gICAgICAgIHRoaXMuU3BhY2VCRy5ydW5BY3Rpb24oYWN0aW9uKTtcclxuXHJcbiAgICB9XHJcbiAgICBjaG9vc2VfZ2hvc3QoVG9iZWdob3N0X2lkOiBudW1iZXIsIFBlb3BsZWJhY2tfaWQ6IG51bWJlcikgeyAgLy8g6YG45a6a5LiA5Lq655W26ay844CCXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1dobyBmdWNrPyBJRDonLCBUb2JlZ2hvc3RfaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIEFSUjpcIiwgdGhpcy5wbGF5ZXJfYXJyYXkubGVuZ3RoLCB0aGlzLnBsYXllcl9hcnJheSk7XHJcbiAgICAgICAgLy9jaG9vc2UgZnJvbSBwbGF5ZXIgYXJyYXlcclxuICAgICAgICBsZXQgZ2hvc3RfaWQgPSBUb2JlZ2hvc3RfaWQ7Ly8gaW5pdGlhbGx5IHNldCBwbGF5ZXIgMSB0byBiZSBnaG9zdFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5wbGF5ZXJfYXJyYXkubGVuZ3RoKzE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBnaG9zdF9pZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZmlyZWJhc2VcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lMi9wbGF5ZXIke2l9YCkuc2V0KHsgdHlwZTogXCJnaG9zdFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBhIGdob3N0XHJcbiAgICAgICAgICAgICAgICB2YXIgR25vZGUgPSBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllciR7aX1gKTtcclxuICAgICAgICAgICAgICAgIHZhciBnaG9zdEJvcm5FZmZlY3QgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJlY29tZUdob3N0RWZmZWN0KTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfS9MYWJlbGApLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiZ2hvc3RcIjtcclxuICAgICAgICAgICAgICAgIEdub2RlLnNldFBvc2l0aW9uKC0xNzYsIDc1Mik7XHJcbiAgICAgICAgICAgICAgICBHbm9kZS5ncm91cCA9ICdnaG9zdCc7XHJcbiAgICAgICAgICAgICAgICBHbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIEdub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBHbm9kZS5zZXRQb3NpdGlvbigtMTc2LCA3NTIpO1xyXG4gICAgICAgICAgICAgICAgR25vZGUuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR25vZGUuZ2V0Q29tcG9uZW50KFBsYXllckdob3N0KS5wbGF5ZXJTcGVlZCA9IHRoaXMuR2hvc3RTcGVlZDtcclxuICAgICAgICAgICAgICAgIC8vIHBsYXkgcGFydGljbGUgZWZmZWN0XHJcbiAgICAgICAgICAgICAgICBHbm9kZS5wYXJlbnQuYWRkQ2hpbGQoZ2hvc3RCb3JuRWZmZWN0KTtcclxuICAgICAgICAgICAgICAgIGdob3N0Qm9ybkVmZmVjdC5zZXRQb3NpdGlvbihHbm9kZS5wb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlcXVlbmNlMSA9IGNjLnNlcXVlbmNlKGNjLmZhZGVUbygwLjI1LCAxMjApLCBjYy5mYWRlSW4oMC4yNSksIGNjLnNjYWxlQnkoMC4xLCAxLjEpKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IGNjLnJlcGVhdChzZXF1ZW5jZTEsIDUpO1xyXG4gICAgICAgICAgICAgICAgR25vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdub2RlLmdldENvbXBvbmVudChQbGF5ZXJHaG9zdCkubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSwgMylcclxuICAgICAgICAgICAgICAgIC8vIG1ha2UgZ2hvc3QgZW5kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihpID09IFBlb3BsZWJhY2tfaWQpe1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWUyL3BsYXllciR7aX1gKS5zZXQoeyB0eXBlOiBcInBsYXllclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9L0xhYmVsYCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJwbGF5ZXJcIjtcclxuICAgICAgICAgICAgICAgIHZhciBQbm9kZSA9IGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApO1xyXG4gICAgICAgICAgICAgICAgUG5vZGUuc2V0UG9zaXRpb24oMjQwLCAtNDgpO1xyXG4gICAgICAgICAgICAgICAgUG5vZGUuZ3JvdXAgPSAncGxheWVyJztcclxuICAgICAgICAgICAgICAgIFBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgUG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFBub2RlLmdldENvbXBvbmVudChQbGF5ZXJHaG9zdCkubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFBub2RlLmdldENvbXBvbmVudChQbGF5ZXJHaG9zdCkucGxheWVyU3BlZWQgPSB0aGlzLlBsYXllclNwZWVkO1xyXG4gICAgICAgICAgICAgICAgUG5vZGUucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4xLCAxKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VxdWVuY2UxID0gY2Muc2VxdWVuY2UoY2MuZmFkZVRvKDAuMjUsIDEyMCksIGNjLmZhZGVJbigwLjI1KSk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSBjYy5yZXBlYXQoc2VxdWVuY2UxLCA1KTtcclxuICAgICAgICAgICAgICAgIFBub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBQbm9kZS5nZXRDb21wb25lbnQoUGxheWVyR2hvc3QpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sIDIuNSlcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWUyL3BsYXllciR7aX1gKS5zZXQoeyB0eXBlOiBcInBsYXllclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9L0xhYmVsYCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJwbGF5ZXJcIjtcclxuICAgICAgICAgICAgICAgIHZhciBObm9kZSA9IGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApO1xyXG4gICAgICAgICAgICAgICAgTm5vZGUuZ3JvdXAgPSAncGxheWVyJztcclxuICAgICAgICAgICAgICAgIE5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgTm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIE5ub2RlLmdldENvbXBvbmVudChQbGF5ZXJHaG9zdCkucGxheWVyU3BlZWQgPSB0aGlzLlBsYXllclNwZWVkO1xyXG4gICAgICAgICAgICAgICAgTm5vZGUucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC41LCAxKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZ2V0UmFuZG9tSW50KG1heDogbnVtYmVyKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogbWF4KTtcclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgLy8gdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgSW5pdF9wbGF5ZXIoKXtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAvLyBpbml0aWFsaXplIHBsYXllcnMgICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyL3BsYXllciR7aX1faXNsb2dpbmApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7IC8vIOWmguaenOeOqeWutuWtmOWcqFxyXG4gICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUucGxheWVyX2FycmF5LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9YCkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvcHJlbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlYWJsZWApLnNldCh7IG1vdmVhYmxlOiBcInRydWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiAyNDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9ZYCkuc2V0KHsgeTogLTQ4IH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGluaXRpYWwgRW5kXHJcbiAgICB9XHJcbiAgICAvLyB0aW1lclxyXG4gICAgVGltZXJTdGFydCgpe1xyXG4gICAgICAgIHRoaXMudGltZXIgPSB0aGlzLkdhbWVUaW1lO1xyXG4gICAgICAgIHRoaXMuVGltZXJMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuR2FtZVRpbWUudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuVXBkYXRlVGltZXIsIDEpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlVGltZXIoKXtcclxuICAgICAgICBpZih0aGlzLnRpbWVVcCkgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMudGltZXIgPiAwKSB0aGlzLnRpbWVyICs9IC0xO1xyXG4gICAgICAgIGVsc2UgaWYodGhpcy50aW1lciA9PSAwKSB0aGlzLnRpbWVVcCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5UaW1lckxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy50aW1lci50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBpZih0aGlzLnRpbWVVcCl7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZU92ZXIoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIEdhbWVPdmVyKCl7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLkdhbWVPdmVyU291bmQsIGZhbHNlKTtcclxuICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgIHRoaXMuR2FtZW92ZXJCRy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzY29yZWJvYXJkID0gdGhpcy5HYW1lb3ZlckJHLmdldENoaWxkQnlOYW1lKFwiU2NvcmVcIik7XHJcbiAgICAgICAgbGV0IHNjb3JlcG9pbnQgPSBzY29yZWJvYXJkLmdldENoaWxkQnlOYW1lKFwiU2NvcmVwb2ludFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldCBwb2ludCA9IHNjb3JlYm9hcmQuZ2V0Q2hpbGRCeU5hbWUoXCJQb2ludFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldCBQX3N0YXRlID0gdGhpcy5QX3N0YXRlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgc2NvcmVib2FyZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IFBfc3RhdGVbMV0gKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gUF9zdGF0ZVsyXSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIHN0ciArPSBQX3N0YXRlWzNdICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgc3RyICs9IFBfc3RhdGVbNF0gKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBzdHIgKz0gUF9zdGF0ZVs1XTtcclxuICAgICAgICAgICAgc2NvcmVwb2ludC5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5TY29yZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgbGV0IGFycjIgPSBbXTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTE7aTw9NTtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoUF9zdGF0ZVtpXSA9PSAncGxheWVyJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyMi5wdXNoKDMwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKFBfc3RhdGVbaV0gPT0gJ2dob3N0Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyMi5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IFwiXFxuKyBcIiArIGFycjJbaV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwb2ludC5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5TY29yZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vIGZpcmViYXNlXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBHYW1lUmVzdWx0L1JvdW5kMmApLnNldCh7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIxOiBhcnIyWzBdLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyMjogYXJyMlsxXSxcclxuICAgICAgICAgICAgICAgIHBsYXllcjM6IGFycjJbMl0sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXI0OiBhcnIyWzNdLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyNTogYXJyMls0XSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2U0XCIpO1xyXG4gICAgICAgIH0sIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRQbGF5ZXJTdGF0ZSgpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiR2V0IHBsYXllciBzdGF0ZSFcIik7XHJcbiAgICAgICAgLy8g55yL5q+P5YCL546p5a6255qE6Lqr5YiG44CCXHJcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD01OyBpKyspe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZTIvcGxheWVyJHtpfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicGxheWVyXCIsaSwgc25hcHNob3QudmFsKCkudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5QX3ByZXZzdGF0ZVtpXSA9IHQuUF9zdGF0ZVtpXTtcclxuICAgICAgICAgICAgICAgICAgICB0LlBfc3RhdGVbaV0gPSBzbmFwc2hvdC52YWwoKS50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNuYXBzaG90LnZhbCgpLnR5cGUgPT0gJ2dob3N0Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuR2hvc3RMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiUFwiK2kudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgVXBkYXRlR3JvdXAoKXtcclxuICAgICAgICAvLyDmoLnmk5rouqvliIbmm7TmlrDjgIJcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGdob3N0X2lkID0gLTEsIGJhY2tfaWQgPSAtMTtcclxuICAgICAgICBsZXQgY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PTU7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHQuUF9wcmV2c3RhdGVbaV09PVwicGxheWVyXCIgJiYgdC5QX3N0YXRlW2ldPT1cImdob3N0XCIpeyAvLyDorormiJDprLxcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyXCIsIGksIFwiYmVjb21lIGdob3N0ISEhISEhISEhXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2hvc3RfaWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2UgaWYodC5QX3ByZXZzdGF0ZVtpXT09XCJnaG9zdFwiICYmIHQuUF9zdGF0ZVtpXT09XCJwbGF5ZXJcIil7IC8vIOiuiuWbnuS6ulxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXJcIiwgaSwgXCJiYWNrIHRvIHBsYXllciEhISEhISEhIVwiKTtcclxuICAgICAgICAgICAgICAgIGJhY2tfaWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjaGFuZ2UgJiYgIXRoaXMuY29vbGRvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5jb29sZG93biA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hvb3NlX2dob3N0KGdob3N0X2lkLCBiYWNrX2lkKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuY29vbGRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMyk7XHJcbiAgICAgICAgICAgIC8vIOmsvEJHTVxyXG4gICAgICAgICAgICBpZihnaG9zdF9pZCA9PSB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5CR00xLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDEpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihiYWNrX2lkID09IHRoaXMuY3VycmVudF91c2VyX251bWJlcil7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLkJHTTIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoMyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codC5QX3ByZXZzdGF0ZSwgdC5QX3N0YXRlKTtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19