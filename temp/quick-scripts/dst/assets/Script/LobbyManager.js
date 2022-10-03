
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/LobbyManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '56e87Na+PxPrLTXUo0zsY0w', 'LobbyManager');
// Script/LobbyManager.ts

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
var LobbyManager = /** @class */ (function (_super) {
    __extends(LobbyManager, _super);
    function LobbyManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LoadingBG = null;
        _this.startingBG = null;
        _this.JoinGameText = null;
        _this.ReadyLabel = null;
        _this.ReadyCountLabel = null;
        _this.readyWindow = null;
        _this.click = null;
        _this.physicManager = null;
        _this.initialization = false;
        _this.counting = 0;
        _this.current_user_number = 0;
        _this.Max_player_ready_number = 5; // 玩家應該要多少人準備才會開始。
        return _this;
    }
    LobbyManager.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
    };
    LobbyManager.prototype.start = function () {
        var _this = this;
        this.LoadingBG.active = true;
        var uid = firebase.auth().currentUser.uid;
        var current_user_number = 0;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                current_user_number = snapshot.val().player_number;
            }
        });
        this.scheduleOnce(function () {
            // console.log("now is:", current_user_number);
            _this.current_user_number = current_user_number;
            if (current_user_number != 0) {
                firebase.database().ref("player/player" + current_user_number + "_isReady").set(false);
                firebase.database().ref("player/player" + current_user_number + "_islogin").set(true);
            }
            switch (current_user_number) {
                case 1:
                    firebase.database().ref('player/player1_islogin').onDisconnect().set(false);
                    break;
                case 2:
                    firebase.database().ref('player/player2_islogin').onDisconnect().set(false);
                    break;
                case 3:
                    firebase.database().ref('player/player3_islogin').onDisconnect().set(false);
                    break;
                case 4:
                    firebase.database().ref('player/player4_islogin').onDisconnect().set(false);
                    break;
                case 5:
                    firebase.database().ref('player/player5_islogin').onDisconnect().set(false);
                    break;
            }
            _this.schedule(_this.UpdateUser, 1);
            _this.schedule(_this.UpdateMaxReady, 1);
        }, 1);
        this.scheduleOnce(function () {
            _this.LoadingBG.active = false;
            _this.Text1Action();
            _this.schedule(_this.CheckReadyState, 0.2);
        }, 3);
        // buttons
        var ready_btn = new cc.Component.EventHandler();
        ready_btn.target = this.node;
        ready_btn.component = "LobbyManager";
        ready_btn.handler = "readyEvent";
        cc.find("Canvas/Main Camera/readyWindow/ready").getComponent(cc.Button).clickEvents.push(ready_btn);
        var close_btn = new cc.Component.EventHandler();
        close_btn.target = this.node;
        close_btn.component = "LobbyManager";
        close_btn.handler = "closeEvent";
        cc.find("Canvas/Main Camera/readyWindow/close").getComponent(cc.Button).clickEvents.push(close_btn);
    };
    LobbyManager.prototype.update = function (dt) {
    };
    LobbyManager.prototype.UpdateUser = function () {
        var handle = this;
        if (this.counting < 5) {
            var _loop_1 = function (i) {
                if (cc.find("Canvas/PlayerContainer/player" + i).active == true) {
                    return "continue";
                }
                else {
                    firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                        if (snapshot.val() == true) {
                            console.log("Welcome! Player", i);
                            handle.counting += 1;
                            cc.find("Canvas/PlayerContainer/player" + i).active = true;
                            firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                            firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                            firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                            firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                            firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: 16 });
                            firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -48 });
                        }
                    });
                }
            };
            for (var i = 1; i <= 5; i++) {
                _loop_1(i);
            }
        }
    };
    LobbyManager.prototype.Text1Action = function () {
        var action;
        var sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.JoinGameText.runAction(action);
    };
    LobbyManager.prototype.readyEvent = function () {
        var t = this;
        cc.audioEngine.playEffect(this.click, false);
        // console.log("Player", this.current_user_number, "is ready");
        firebase.database().ref("player/player" + t.current_user_number + "_isReady").set(true);
        this.ReadyLabel.runAction(cc.fadeTo(0.1, 255));
    };
    LobbyManager.prototype.closeEvent = function () {
        var t = this;
        cc.audioEngine.playEffect(this.click, false);
        // console.log("Player", this.current_user_number, "is Not ready");
        firebase.database().ref("player/player" + t.current_user_number + "_isReady").set(false);
        console.log("close Computer");
        this.readyWindow.active = false;
        cc.find("Canvas/PlayerContainer/player" + this.current_user_number).getComponent(Player_1.default).moveable = true;
        this.ReadyLabel.runAction(cc.fadeTo(0.1, 100));
    };
    LobbyManager.prototype.CheckReadyState = function () {
        var _this = this;
        var ready_count = 0;
        var _loop_2 = function (i) {
            firebase.database().ref("player/player" + i + "_isReady").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                        if (snapshot.val() == true) {
                            // console.log("Check",i, "isReady");
                            ready_count++;
                        }
                    });
                }
            });
        };
        for (var i = 1; i <= 5; i++) {
            _loop_2(i);
        }
        this.scheduleOnce(function () {
            var str = "(";
            str += ready_count.toString();
            str += "/";
            str += _this.Max_player_ready_number.toString();
            str += ")";
            _this.ReadyCountLabel.getComponent(cc.Label).string = str;
            if (ready_count == _this.Max_player_ready_number) {
                _this.scheduleOnce(function () {
                    if (ready_count != 1)
                        _this.startingBG.active = true;
                }, 1);
                _this.scheduleOnce(function () {
                    if (ready_count != 1)
                        cc.director.loadScene("GameStage1");
                    // cc.director.loadScene("GameEnd");
                }, 2);
            }
        }, 1);
    };
    LobbyManager.prototype.UpdateMaxReady = function () {
        var _this = this;
        var login_count = 0;
        for (var i = 1; i <= 5; i++) {
            firebase.database().ref("player/player" + i + "_islogin").once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    // console.log("Check",i, "isReady");
                    login_count++;
                }
            });
        }
        this.scheduleOnce(function () {
            if (login_count == 0) {
                _this.Max_player_ready_number = 5;
            }
            else {
                _this.Max_player_ready_number = login_count;
            }
        }, 0.5);
    };
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "LoadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "startingBG", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "JoinGameText", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "ReadyLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "ReadyCountLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LobbyManager.prototype, "readyWindow", void 0);
    __decorate([
        property(cc.AudioClip)
    ], LobbyManager.prototype, "click", void 0);
    LobbyManager = __decorate([
        ccclass
    ], LobbyManager);
    return LobbyManager;
}(cc.Component));
exports.default = LobbyManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2JieU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsbUNBQThCO0FBRXhCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBZ01DO1FBN0xHLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFN0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFFaEMsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsV0FBSyxHQUFpQixJQUFJLENBQUM7UUFFbkIsbUJBQWEsR0FBc0IsSUFBSSxDQUFDO1FBQ2hELG9CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFFTCx5QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFDaEMsNkJBQXVCLEdBQVcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCOztJQTBLbkUsQ0FBQztJQXhLRyw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBQUEs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LENBQUM7U0FDTjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFHLFdBQVcsSUFBSSxDQUFDLEVBQUM7Z0JBQ2hCLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7YUFDcEM7aUJBQUk7Z0JBQ0QsS0FBSSxDQUFDLHVCQUF1QixHQUFHLFdBQVcsQ0FBQzthQUM5QztRQUNMLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNYLENBQUM7SUE1TEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDUTtJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNTO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1c7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUztJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNjO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzsrQ0FDSTtJQWZWLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FnTWhDO0lBQUQsbUJBQUM7Q0FoTUQsQUFnTUMsQ0FoTXlDLEVBQUUsQ0FBQyxTQUFTLEdBZ01yRDtrQkFoTW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2JieU1hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTG9hZGluZ0JHOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc3RhcnRpbmdCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEpvaW5HYW1lVGV4dDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFJlYWR5TGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBSZWFkeUNvdW50TGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICByZWFkeVdpbmRvdzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgY2xpY2s6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBwaHlzaWNNYW5hZ2VyOiBjYy5QaHlzaWNzTWFuYWdlciA9IG51bGw7XHJcbiAgICBpbml0aWFsaXphdGlvbiA9IGZhbHNlO1xyXG4gICAgY291bnRpbmcgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyX251bWJlcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgTWF4X3BsYXllcl9yZWFkeV9udW1iZXI6IG51bWJlciA9IDU7IC8vIOeOqeWutuaHieipsuimgeWkmuWwkeS6uua6luWCmeaJjeacg+mWi+Wni+OAglxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMucGh5c2ljTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZ3Jhdml0eSA9IGNjLnYyKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuTG9hZGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCB1aWQgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgICAgIGxldCBjdXJyZW50X3VzZXJfbnVtYmVyID0gMDtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdXNlcl9pbmZvLyR7dWlkfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm5vdyBpczpcIiwgY3VycmVudF91c2VyX251bWJlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF91c2VyX251bWJlciA9IGN1cnJlbnRfdXNlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50X3VzZXJfbnVtYmVyICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtjdXJyZW50X3VzZXJfbnVtYmVyfV9pc1JlYWR5YCkuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtjdXJyZW50X3VzZXJfbnVtYmVyfV9pc2xvZ2luYCkuc2V0KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY3VycmVudF91c2VyX251bWJlcikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdwbGF5ZXIvcGxheWVyMV9pc2xvZ2luJykub25EaXNjb25uZWN0KCkuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3BsYXllcjJfaXNsb2dpbicpLm9uRGlzY29ubmVjdCgpLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3BsYXllci9wbGF5ZXIzX2lzbG9naW4nKS5vbkRpc2Nvbm5lY3QoKS5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdwbGF5ZXIvcGxheWVyNF9pc2xvZ2luJykub25EaXNjb25uZWN0KCkuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3BsYXllcjVfaXNsb2dpbicpLm9uRGlzY29ubmVjdCgpLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLlVwZGF0ZVVzZXIsIDEpOyBcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLlVwZGF0ZU1heFJlYWR5LCAxKTtcclxuICAgICAgICB9LCAxKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkxvYWRpbmdCRy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0MUFjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuQ2hlY2tSZWFkeVN0YXRlLCAwLjIpO1xyXG4gICAgICAgIH0sIDMpO1xyXG5cclxuICAgICAgICAvLyBidXR0b25zXHJcbiAgICAgICAgbGV0IHJlYWR5X2J0biA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgcmVhZHlfYnRuLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICByZWFkeV9idG4uY29tcG9uZW50ID0gXCJMb2JieU1hbmFnZXJcIjtcclxuICAgICAgICByZWFkeV9idG4uaGFuZGxlciA9IFwicmVhZHlFdmVudFwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmEvcmVhZHlXaW5kb3cvcmVhZHlcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChyZWFkeV9idG4pO1xyXG4gICAgICAgIGxldCBjbG9zZV9idG4gPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIGNsb3NlX2J0bi50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgY2xvc2VfYnRuLmNvbXBvbmVudCA9IFwiTG9iYnlNYW5hZ2VyXCI7XHJcbiAgICAgICAgY2xvc2VfYnRuLmhhbmRsZXIgPSBcImNsb3NlRXZlbnRcIjtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL01haW4gQ2FtZXJhL3JlYWR5V2luZG93L2Nsb3NlXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goY2xvc2VfYnRuKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcblxyXG4gICAgfVxyXG4gICAgVXBkYXRlVXNlcigpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5jb3VudGluZyA8IDUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke2l9YCkuYWN0aXZlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2VsY29tZSEgUGxheWVyXCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmNvdW50aW5nICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllciR7aX1gKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL21vdmVEaXJZYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9wcmVtb3ZlRGlyWGApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1hgKS5zZXQoeyB4OiAxNiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvWWApLnNldCh7IHk6IC00OCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBUZXh0MUFjdGlvbigpIHtcclxuICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDEuMSksIGNjLnNjYWxlVG8oMC41LCAxKSk7XHJcbiAgICAgICAgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzZXF1ZW5jZSk7XHJcbiAgICAgICAgdGhpcy5Kb2luR2FtZVRleHQucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcbiAgICByZWFkeUV2ZW50KCkge1xyXG4gICAgICAgIGxldCB0ID0gdGhpcztcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBsYXllclwiLCB0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIsIFwiaXMgcmVhZHlcIik7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllci9wbGF5ZXIke3QuY3VycmVudF91c2VyX251bWJlcn1faXNSZWFkeWApLnNldCh0cnVlKTtcclxuICAgICAgICB0aGlzLlJlYWR5TGFiZWwucnVuQWN0aW9uKGNjLmZhZGVUbygwLjEsIDI1NSkpO1xyXG4gICAgfVxyXG4gICAgY2xvc2VFdmVudCgpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJQbGF5ZXJcIiwgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLCBcImlzIE5vdCByZWFkeVwiKTtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyL3BsYXllciR7dC5jdXJyZW50X3VzZXJfbnVtYmVyfV9pc1JlYWR5YCkuc2V0KGZhbHNlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIENvbXB1dGVyXCIpO1xyXG4gICAgICAgIHRoaXMucmVhZHlXaW5kb3cuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIke3RoaXMuY3VycmVudF91c2VyX251bWJlcn1gKS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5SZWFkeUxhYmVsLnJ1bkFjdGlvbihjYy5mYWRlVG8oMC4xLCAxMDApKTtcclxuICAgIH1cclxuICAgIENoZWNrUmVhZHlTdGF0ZSgpIHsgLy8g5a6a5pyf5qqi5p+l5q+P5L2N546p5a625piv5ZCmcmVhZHnvvIzpg73mupblgpnlpb3lsLHplovlp4vjgIJcclxuICAgICAgICBsZXQgcmVhZHlfY291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyL3BsYXllciR7aX1faXNSZWFkeWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2hlY2tcIixpLCBcImlzUmVhZHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkeV9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBcIihcIjtcclxuICAgICAgICAgICAgc3RyICs9IHJlYWR5X2NvdW50LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHN0ciArPSBcIi9cIjtcclxuICAgICAgICAgICAgc3RyICs9IHRoaXMuTWF4X3BsYXllcl9yZWFkeV9udW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgc3RyICs9IFwiKVwiO1xyXG4gICAgICAgICAgICB0aGlzLlJlYWR5Q291bnRMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN0cjtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWFkeV9jb3VudCA9PSB0aGlzLk1heF9wbGF5ZXJfcmVhZHlfbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVhZHlfY291bnQgIT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZWFkeV9jb3VudCAhPSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2UxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lRW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZU1heFJlYWR5KCl7XHJcbiAgICAgICAgbGV0IGxvZ2luX2NvdW50ID0gMDtcclxuICAgICAgICBmb3IobGV0IGk9MTtpPD01O2krKyl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXIvcGxheWVyJHtpfV9pc2xvZ2luYCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDaGVja1wiLGksIFwiaXNSZWFkeVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpbl9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgaWYobG9naW5fY291bnQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1heF9wbGF5ZXJfcmVhZHlfbnVtYmVyID0gNTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1heF9wbGF5ZXJfcmVhZHlfbnVtYmVyID0gbG9naW5fY291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LDAuNSk7XHJcbiAgICB9XHJcbn1cclxuIl19