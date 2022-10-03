
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/log.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a1318oSHlxFlIBMY42EGHQD', 'log');
// Script/log.ts

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
        _this.log_forum = null;
        _this.account = null;
        _this.password = null;
        _this.close = null;
        _this.login2 = null;
        _this.signin2 = null;
        _this.player1 = null;
        _this.player2 = null;
        _this.player3 = null;
        _this.player4 = null;
        _this.player5 = null;
        _this.spaceBG = null;
        _this.LoadingBG = null;
        _this.MutiTag = null;
        _this.BGM = null;
        _this.click = null;
        _this.videoclip = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        // this.videoclip.node.on('ready-to-play', this.playvideo, this);
    };
    NewClass.prototype.start = function () {
        cc.audioEngine.playMusic(this.BGM, true);
        console.log("1");
        var log_in_this = new cc.Component.EventHandler();
        console.log("1");
        log_in_this.target = this.node;
        log_in_this.component = "log";
        log_in_this.handler = "login_forum";
        cc.find("Canvas/UI/log_in").getComponent(cc.Button).clickEvents.push(log_in_this);
        var log_out_this = new cc.Component.EventHandler();
        log_out_this.target = this.node;
        log_out_this.component = "log";
        log_out_this.handler = "signin_forum";
        console.log("2");
        cc.find("Canvas/UI/sign_in").getComponent(cc.Button).clickEvents.push(log_out_this);
        console.log("2");
        var exit_game = new cc.Component.EventHandler();
        exit_game.target = this.node;
        exit_game.component = "log";
        exit_game.handler = "gameEnd";
        console.log("3");
        cc.find("Canvas/UI/EXIT").getComponent(cc.Button).clickEvents.push(exit_game);
        console.log("3");
        // get the user info
        var email_sign = new cc.Component.EventHandler();
        email_sign.target = this.node;
        email_sign.component = "log";
        email_sign.handler = "email_signin";
        cc.find("Canvas/UI/sign_in2").getComponent(cc.Button).clickEvents.push(email_sign);
        var email_log = new cc.Component.EventHandler();
        email_log.target = this.node;
        email_log.component = "log";
        email_log.handler = "email_login";
        cc.find("Canvas/UI/log_in2").getComponent(cc.Button).clickEvents.push(email_log);
        var close_log = new cc.Component.EventHandler();
        close_log.target = this.node;
        close_log.component = "log";
        close_log.handler = "close_forum";
        cc.find("Canvas/UI/close").getComponent(cc.Button).clickEvents.push(close_log);
        this.playerMove(Math.random() * 2);
        this.backgroundMove();
    };
    NewClass.prototype.login_forum = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.log_forum.active = true;
        this.account.active = true;
        this.password.active = true;
        this.login2.active = true;
        this.close.active = true;
    };
    NewClass.prototype.signin_forum = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.log_forum.active = true;
        this.account.active = true;
        this.password.active = true;
        this.signin2.active = true;
        this.close.active = true;
    };
    NewClass.prototype.close_forum = function () {
        cc.audioEngine.playEffect(this.click, false);
        this.log_forum.active = false;
        this.account.active = false;
        this.password.active = false;
        this.signin2.active = false;
        this.login2.active = false;
        this.close.active = false;
    };
    NewClass.prototype.email_signin = function () {
        var email = this.account.getComponent(cc.EditBox).string;
        console.log(email);
        var password = this.password.getComponent(cc.EditBox).string;
        console.log(password);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function () {
            console.log("fuck yeah");
        })
            .catch(function (e) {
            console.log(e);
        });
        cc.audioEngine.playEffect(this.click, false);
        this.close_forum();
    };
    NewClass.prototype.email_login = function () {
        var email = this.account.getComponent(cc.EditBox).string;
        console.log(email);
        var password = this.password.getComponent(cc.EditBox).string;
        console.log(password);
        var t = this;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (userCredential) {
            var user_info = { email: email, uid: userCredential.user.uid, player_number: 0 };
            firebase
                .database()
                .ref("user_list")
                .on("value", function (snapshot) {
                //console.log("check1");
                var new_or_not = false;
                snapshot.forEach(function (childNodes) {
                    var obj = childNodes.val();
                    if (obj.uid == user_info.uid) {
                        new_or_not = true;
                    }
                });
                if (!new_or_not) {
                    //need to update player number
                    firebase.database().ref('player/player_number').once('value', function (snapshot) {
                        //  console.log("wtf"+snapshot.val())
                        if (snapshot.val() == null) {
                            user_info = { email: email, uid: userCredential.user.uid, player_number: 1 };
                            //console.log("p2")
                            firebase.database().ref('player/player_number').set({ player_number: 1 });
                            //also set the player info
                            firebase.database().ref("player_data/player" + 1).set(user_info);
                            firebase.database().ref("user_list").push(user_info);
                            firebase.database().ref("user_info/" + userCredential.user.uid).set(user_info);
                        }
                        else {
                            console.log(snapshot.val().player_number);
                            var number = snapshot.val().player_number;
                            var newnumber = parseInt(number, 10) + 1;
                            firebase.database().ref('player/player_number').set({ player_number: newnumber });
                            user_info = { email: email, uid: userCredential.user.uid, player_number: newnumber };
                            firebase.database().ref("player_data/player" + newnumber).set(user_info);
                            firebase.database().ref("user_list").push(user_info);
                            firebase.database().ref("user_info/" + userCredential.user.uid).set(user_info);
                        }
                    });
                    // firebase.database().ref("user_list").push(user_info);
                    // firebase.database().ref("user_info/" + userCredential.user.uid).set(user_info);
                }
            });
            // firebase.auth().onAuthStateChanged(user=>{
            //  if(user){
            //   console.log("user info uid:"+ user.uid);
            //  }
            //  })
            t.LoadingBG.active = true;
            t.scheduleOnce(function () {
                cc.director.loadScene("Lobby");
            }, 2);
        })
            .catch(function (e) {
            console.log(e);
        });
        cc.audioEngine.playEffect(this.click, false);
    };
    ;
    NewClass.prototype.playerMove = function (delayTime) {
        var _this = this;
        var easeRate = 2;
        var action1;
        var action2;
        var action3;
        var action4;
        var action5;
        var sequence1 = cc.sequence(cc.moveBy(2.5, 0, 25).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(3.5, 0, -25).easing(cc.easeInOut(easeRate)));
        var sequence2 = cc.sequence(cc.moveBy(2, -10, 25).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(2, 10, -25).easing(cc.easeInOut(easeRate)));
        var sequence3 = cc.sequence(cc.moveBy(2.5, -20, -10).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(1.5, 20, 10).easing(cc.easeInOut(easeRate)));
        var sequence4 = cc.sequence(cc.moveBy(4, 20, 15).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(4, -20, -15).easing(cc.easeInOut(easeRate)));
        var sequence5_1 = cc.sequence(cc.moveTo(0, -580, 180), cc.moveBy(10, 1200, -100), cc.delayTime(1), cc.moveTo(0, 0, -450), cc.moveBy(10, -200, 900), cc.delayTime(1), cc.moveTo(0, 260, 450), cc.moveBy(10, -1000, -900), cc.delayTime(5));
        var sequence5_2 = cc.sequence(cc.rotateBy(10, 360), cc.delayTime(1), cc.rotateBy(10, -360), cc.delayTime(1), cc.rotateBy(10, -360), cc.delayTime(5));
        var sequence5 = cc.spawn(sequence5_1, sequence5_2);
        action1 = cc.repeatForever(sequence1);
        action2 = cc.repeatForever(sequence2);
        action3 = cc.repeatForever(sequence3);
        action4 = cc.repeatForever(sequence4);
        action5 = cc.repeatForever(sequence5);
        this.scheduleOnce(function () {
            _this.player1.runAction(action1);
            _this.player2.runAction(action2);
            _this.player3.runAction(action3);
            _this.player4.runAction(action4);
            _this.player5.runAction(action5);
        }, 1);
        // ================================================
    };
    NewClass.prototype.backgroundMove = function () {
        var action;
        // var sequence = cc.sequence(cc.rotateBy(20, 360));
        // action = cc.repeatForever(sequence);
        action = cc.repeatForever(cc.rotateBy(100, 360));
        this.spaceBG.setScale(1.5, 1.5);
        this.spaceBG.runAction(action);
        var s = cc.sequence(cc.scaleTo(1.5, 0.6).easing(cc.easeInOut(2)), cc.scaleTo(1.5, 0.5).easing(cc.easeInOut(2)), cc.delayTime(1));
        action = cc.repeatForever(s);
        this.MutiTag.runAction(action);
    };
    // playvideo(event) {
    //   console.log("HI")
    //   this.videoclip.play();
    // }
    NewClass.prototype.showWindow = function () {
    };
    NewClass.prototype.gameEnd = function () {
        cc.game.end();
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "log_forum", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "account", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "password", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "close", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "login2", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "signin2", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player1", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player2", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player3", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player4", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player5", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "spaceBG", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "LoadingBG", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "MutiTag", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "BGM", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "click", void 0);
    __decorate([
        property(cc.VideoPlayer)
    ], NewClass.prototype, "videoclip", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNKLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvSixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0osSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDOUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDaEUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDbkUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckosSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFHbkQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLFlBQVksQ0FB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Q0U7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzsyQ0FDSTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOytDQUNRO0lBdkNkLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0EyUTVCO0lBQUQsZUFBQztDQTNRRCxBQTJRQyxDQTNRcUMsRUFBRSxDQUFDLFNBQVMsR0EyUWpEO2tCQTNRb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIGxvZ19mb3J1bTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIGFjY291bnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICBwYXNzd29yZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIGNsb3NlOiBjYy5Ob2RlID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICBsb2dpbjI6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHNpZ25pbjI6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjE6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjI6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjM6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHBsYXllcjU6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHNwYWNlQkc6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIExvYWRpbmdCRzogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgTXV0aVRhZzogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICBCR006IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICBjbGljazogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLlZpZGVvUGxheWVyKVxyXG4gIHZpZGVvY2xpcDogY2MuVmlkZW9QbGF5ZXIgPSBudWxsO1xyXG5cclxuXHJcblxyXG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICAvLyB0aGlzLnZpZGVvY2xpcC5ub2RlLm9uKCdyZWFkeS10by1wbGF5JywgdGhpcy5wbGF5dmlkZW8sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5CR00sIHRydWUpXHJcbiAgICBjb25zb2xlLmxvZyhcIjFcIilcclxuICAgIGxldCBsb2dfaW5fdGhpcyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIjFcIilcclxuICAgIGxvZ19pbl90aGlzLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgIGxvZ19pbl90aGlzLmNvbXBvbmVudCA9IFwibG9nXCI7XHJcbiAgICBsb2dfaW5fdGhpcy5oYW5kbGVyID0gXCJsb2dpbl9mb3J1bVwiO1xyXG4gICAgY2MuZmluZChcIkNhbnZhcy9VSS9sb2dfaW5cIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChsb2dfaW5fdGhpcyk7XHJcbiAgICBsZXQgbG9nX291dF90aGlzID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgIGxvZ19vdXRfdGhpcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICBsb2dfb3V0X3RoaXMuY29tcG9uZW50ID0gXCJsb2dcIjtcclxuICAgIGxvZ19vdXRfdGhpcy5oYW5kbGVyID0gXCJzaWduaW5fZm9ydW1cIjtcclxuICAgIGNvbnNvbGUubG9nKFwiMlwiKVxyXG4gICAgY2MuZmluZChcIkNhbnZhcy9VSS9zaWduX2luXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2gobG9nX291dF90aGlzKTtcclxuICAgIGNvbnNvbGUubG9nKFwiMlwiKVxyXG4gICAgbGV0IGV4aXRfZ2FtZSA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICBleGl0X2dhbWUudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgZXhpdF9nYW1lLmNvbXBvbmVudCA9IFwibG9nXCI7XHJcbiAgICBleGl0X2dhbWUuaGFuZGxlciA9IFwiZ2FtZUVuZFwiO1xyXG4gICAgY29uc29sZS5sb2coXCIzXCIpXHJcbiAgICBjYy5maW5kKFwiQ2FudmFzL1VJL0VYSVRcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChleGl0X2dhbWUpO1xyXG4gICAgY29uc29sZS5sb2coXCIzXCIpXHJcbiAgICAvLyBnZXQgdGhlIHVzZXIgaW5mb1xyXG4gICAgbGV0IGVtYWlsX3NpZ24gPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgZW1haWxfc2lnbi50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICBlbWFpbF9zaWduLmNvbXBvbmVudCA9IFwibG9nXCI7XHJcbiAgICBlbWFpbF9zaWduLmhhbmRsZXIgPSBcImVtYWlsX3NpZ25pblwiO1xyXG4gICAgY2MuZmluZChcIkNhbnZhcy9VSS9zaWduX2luMlwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGVtYWlsX3NpZ24pO1xyXG4gICAgbGV0IGVtYWlsX2xvZyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICBlbWFpbF9sb2cudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgZW1haWxfbG9nLmNvbXBvbmVudCA9IFwibG9nXCI7XHJcbiAgICBlbWFpbF9sb2cuaGFuZGxlciA9IFwiZW1haWxfbG9naW5cIjtcclxuICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvbG9nX2luMlwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGVtYWlsX2xvZyk7XHJcbiAgICBsZXQgY2xvc2VfbG9nID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgIGNsb3NlX2xvZy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICBjbG9zZV9sb2cuY29tcG9uZW50ID0gXCJsb2dcIjtcclxuICAgIGNsb3NlX2xvZy5oYW5kbGVyID0gXCJjbG9zZV9mb3J1bVwiO1xyXG4gICAgY2MuZmluZChcIkNhbnZhcy9VSS9jbG9zZVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGNsb3NlX2xvZyk7XHJcbiAgICB0aGlzLnBsYXllck1vdmUoTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kTW92ZSgpO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgbG9naW5fZm9ydW0oKSB7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gICAgdGhpcy5sb2dfZm9ydW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuYWNjb3VudC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5wYXNzd29yZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5sb2dpbjIuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuY2xvc2UuYWN0aXZlID0gdHJ1ZTtcclxuICB9XHJcbiAgc2lnbmluX2ZvcnVtKCkge1xyXG4gICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmNsaWNrLCBmYWxzZSlcclxuICAgIHRoaXMubG9nX2ZvcnVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLmFjY291bnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMucGFzc3dvcmQuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuc2lnbmluMi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5jbG9zZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH1cclxuICBjbG9zZV9mb3J1bSgpIHtcclxuICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICB0aGlzLmxvZ19mb3J1bS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuYWNjb3VudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMucGFzc3dvcmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNpZ25pbjIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLmxvZ2luMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuY2xvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBlbWFpbF9zaWduaW4oKSB7XHJcbiAgICB2YXIgZW1haWwgPSB0aGlzLmFjY291bnQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgIGNvbnNvbGUubG9nKGVtYWlsKTtcclxuICAgIHZhciBwYXNzd29yZCA9IHRoaXMucGFzc3dvcmQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkKTtcclxuICAgIGZpcmViYXNlXHJcbiAgICAgIC5hdXRoKClcclxuICAgICAgLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2sgeWVhaFwiKVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgfSk7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gICAgdGhpcy5jbG9zZV9mb3J1bSgpO1xyXG4gIH1cclxuXHJcbiAgZW1haWxfbG9naW4oKSB7XHJcbiAgICB2YXIgZW1haWwgPSB0aGlzLmFjY291bnQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgIGNvbnNvbGUubG9nKGVtYWlsKTtcclxuICAgIHZhciBwYXNzd29yZCA9IHRoaXMucGFzc3dvcmQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkKTtcclxuICAgIGxldCB0ID0gdGhpcztcclxuICAgIGZpcmViYXNlXHJcbiAgICAgIC5hdXRoKClcclxuICAgICAgLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZClcclxuICAgICAgLnRoZW4oXHJcbiAgICAgICAgKHVzZXJDcmVkZW50aWFsKSA9PiB7XHJcbiAgICAgICAgICB2YXIgdXNlcl9pbmZvID0geyBlbWFpbDogZW1haWwsIHVpZDogdXNlckNyZWRlbnRpYWwudXNlci51aWQsIHBsYXllcl9udW1iZXI6IDAgfTtcclxuICAgICAgICAgIGZpcmViYXNlXHJcbiAgICAgICAgICAgIC5kYXRhYmFzZSgpXHJcbiAgICAgICAgICAgIC5yZWYoXCJ1c2VyX2xpc3RcIilcclxuICAgICAgICAgICAgLm9uKFwidmFsdWVcIiwgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNoZWNrMVwiKTtcclxuICAgICAgICAgICAgICB2YXIgbmV3X29yX25vdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHNuYXBzaG90LmZvckVhY2goZnVuY3Rpb24gKGNoaWxkTm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBjaGlsZE5vZGVzLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai51aWQgPT0gdXNlcl9pbmZvLnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXdfb3Jfbm90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBpZiAoIW5ld19vcl9ub3QpIHtcclxuICAgICAgICAgICAgICAgIC8vbmVlZCB0byB1cGRhdGUgcGxheWVyIG51bWJlclxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3BsYXllci9wbGF5ZXJfbnVtYmVyJykub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gIGNvbnNvbGUubG9nKFwid3RmXCIrc25hcHNob3QudmFsKCkpXHJcbiAgICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9pbmZvID0geyBlbWFpbDogZW1haWwsIHVpZDogdXNlckNyZWRlbnRpYWwudXNlci51aWQsIHBsYXllcl9udW1iZXI6IDEgfTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicDJcIilcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3BsYXllcl9udW1iZXInKS5zZXQoeyBwbGF5ZXJfbnVtYmVyOiAxIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbHNvIHNldCB0aGUgcGxheWVyIGluZm9cclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHsxfWApLnNldCh1c2VyX2luZm8pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2VyX2xpc3RcIikucHVzaCh1c2VyX2luZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcl9pbmZvL1wiICsgdXNlckNyZWRlbnRpYWwudXNlci51aWQpLnNldCh1c2VyX2luZm8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzbmFwc2hvdC52YWwoKS5wbGF5ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXIgPSBzbmFwc2hvdC52YWwoKS5wbGF5ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdudW1iZXIgPSBwYXJzZUludChudW1iZXIsIDEwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3BsYXllci9wbGF5ZXJfbnVtYmVyJykuc2V0KHsgcGxheWVyX251bWJlcjogbmV3bnVtYmVyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9pbmZvID0geyBlbWFpbDogZW1haWwsIHVpZDogdXNlckNyZWRlbnRpYWwudXNlci51aWQsIHBsYXllcl9udW1iZXI6IG5ld251bWJlciB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke25ld251bWJlcn1gKS5zZXQodXNlcl9pbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJfbGlzdFwiKS5wdXNoKHVzZXJfaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2VyX2luZm8vXCIgKyB1c2VyQ3JlZGVudGlhbC51c2VyLnVpZCkuc2V0KHVzZXJfaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJfbGlzdFwiKS5wdXNoKHVzZXJfaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJfaW5mby9cIiArIHVzZXJDcmVkZW50aWFsLnVzZXIudWlkKS5zZXQodXNlcl9pbmZvKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgLy8gZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCh1c2VyPT57XHJcbiAgICAgICAgICAvLyAgaWYodXNlcil7XHJcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwidXNlciBpbmZvIHVpZDpcIisgdXNlci51aWQpO1xyXG4gICAgICAgICAgLy8gIH1cclxuICAgICAgICAgIC8vICB9KVxyXG4gICAgICAgICAgdC5Mb2FkaW5nQkcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIHQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTG9iYnlcIik7XHJcbiAgICAgICAgICB9LCAyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgfSk7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gIH07XHJcbiAgcGxheWVyTW92ZShkZWxheVRpbWU6IG51bWJlcikge1xyXG4gICAgbGV0IGVhc2VSYXRlOiBudW1iZXIgPSAyO1xyXG4gICAgbGV0IGFjdGlvbjE6IGNjLkFjdGlvbjtcclxuICAgIGxldCBhY3Rpb24yOiBjYy5BY3Rpb247XHJcbiAgICBsZXQgYWN0aW9uMzogY2MuQWN0aW9uO1xyXG4gICAgbGV0IGFjdGlvbjQ6IGNjLkFjdGlvbjtcclxuICAgIGxldCBhY3Rpb241OiBjYy5BY3Rpb247XHJcbiAgICB2YXIgc2VxdWVuY2UxID0gY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDIuNSwgMCwgMjUpLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSwgY2MuZGVsYXlUaW1lKDAuMiksIGNjLm1vdmVCeSgzLjUsIDAsIC0yNSkuZWFzaW5nKGNjLmVhc2VJbk91dChlYXNlUmF0ZSkpKTtcclxuICAgIHZhciBzZXF1ZW5jZTIgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMiwgLTEwLCAyNSkuZWFzaW5nKGNjLmVhc2VJbk91dChlYXNlUmF0ZSkpLCBjYy5kZWxheVRpbWUoMC4yKSwgY2MubW92ZUJ5KDIsIDEwLCAtMjUpLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSk7XHJcbiAgICB2YXIgc2VxdWVuY2UzID0gY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDIuNSwgLTIwLCAtMTApLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSwgY2MuZGVsYXlUaW1lKDAuMiksIGNjLm1vdmVCeSgxLjUsIDIwLCAxMCkuZWFzaW5nKGNjLmVhc2VJbk91dChlYXNlUmF0ZSkpKTtcclxuICAgIHZhciBzZXF1ZW5jZTQgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoNCwgMjAsIDE1KS5lYXNpbmcoY2MuZWFzZUluT3V0KGVhc2VSYXRlKSksIGNjLmRlbGF5VGltZSgwLjIpLCBjYy5tb3ZlQnkoNCwgLTIwLCAtMTUpLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSk7XHJcbiAgICB2YXIgc2VxdWVuY2U1XzEgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlVG8oMCwgLTU4MCwgMTgwKSwgY2MubW92ZUJ5KDEwLCAxMjAwLCAtMTAwKSxcclxuICAgICAgY2MuZGVsYXlUaW1lKDEpLCBjYy5tb3ZlVG8oMCwgMCwgLTQ1MCksIGNjLm1vdmVCeSgxMCwgLTIwMCwgOTAwKSxcclxuICAgICAgY2MuZGVsYXlUaW1lKDEpLCBjYy5tb3ZlVG8oMCwgMjYwLCA0NTApLCBjYy5tb3ZlQnkoMTAsIC0xMDAwLCAtOTAwKSxcclxuICAgICAgY2MuZGVsYXlUaW1lKDUpKTtcclxuICAgIHZhciBzZXF1ZW5jZTVfMiA9IGNjLnNlcXVlbmNlKGNjLnJvdGF0ZUJ5KDEwLCAzNjApLCBjYy5kZWxheVRpbWUoMSksIGNjLnJvdGF0ZUJ5KDEwLCAtMzYwKSwgY2MuZGVsYXlUaW1lKDEpLCBjYy5yb3RhdGVCeSgxMCwgLTM2MCksIGNjLmRlbGF5VGltZSg1KSk7XHJcbiAgICB2YXIgc2VxdWVuY2U1ID0gY2Muc3Bhd24oc2VxdWVuY2U1XzEsIHNlcXVlbmNlNV8yKTtcclxuXHJcblxyXG4gICAgYWN0aW9uMSA9IGNjLnJlcGVhdEZvcmV2ZXIoc2VxdWVuY2UxKTtcclxuICAgIGFjdGlvbjIgPSBjYy5yZXBlYXRGb3JldmVyKHNlcXVlbmNlMik7XHJcbiAgICBhY3Rpb24zID0gY2MucmVwZWF0Rm9yZXZlcihzZXF1ZW5jZTMpO1xyXG4gICAgYWN0aW9uNCA9IGNjLnJlcGVhdEZvcmV2ZXIoc2VxdWVuY2U0KTtcclxuICAgIGFjdGlvbjUgPSBjYy5yZXBlYXRGb3JldmVyKHNlcXVlbmNlNSk7XHJcblxyXG4gICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICB0aGlzLnBsYXllcjEucnVuQWN0aW9uKGFjdGlvbjEpO1xyXG4gICAgICB0aGlzLnBsYXllcjIucnVuQWN0aW9uKGFjdGlvbjIpO1xyXG4gICAgICB0aGlzLnBsYXllcjMucnVuQWN0aW9uKGFjdGlvbjMpO1xyXG4gICAgICB0aGlzLnBsYXllcjQucnVuQWN0aW9uKGFjdGlvbjQpO1xyXG4gICAgICB0aGlzLnBsYXllcjUucnVuQWN0aW9uKGFjdGlvbjUpO1xyXG4gICAgfSwgMSk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgfVxyXG4gIGJhY2tncm91bmRNb3ZlKCkge1xyXG4gICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgLy8gdmFyIHNlcXVlbmNlID0gY2Muc2VxdWVuY2UoY2Mucm90YXRlQnkoMjAsIDM2MCkpO1xyXG4gICAgLy8gYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzZXF1ZW5jZSk7XHJcbiAgICBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDEwMCwgMzYwKSk7XHJcbiAgICB0aGlzLnNwYWNlQkcuc2V0U2NhbGUoMS41LCAxLjUpO1xyXG4gICAgdGhpcy5zcGFjZUJHLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG5cclxuICAgIHZhciBzID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygxLjUsIDAuNikuZWFzaW5nKGNjLmVhc2VJbk91dCgyKSksIGNjLnNjYWxlVG8oMS41LCAwLjUpLmVhc2luZyhjYy5lYXNlSW5PdXQoMikpLCBjYy5kZWxheVRpbWUoMSkpO1xyXG4gICAgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzKTtcclxuICAgIHRoaXMuTXV0aVRhZy5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8vIHBsYXl2aWRlbyhldmVudCkge1xyXG4gIC8vICAgY29uc29sZS5sb2coXCJISVwiKVxyXG4gIC8vICAgdGhpcy52aWRlb2NsaXAucGxheSgpO1xyXG4gIC8vIH1cclxuICBzaG93V2luZG93KCkge1xyXG5cclxuICB9XHJcbiAgZ2FtZUVuZCgpIHtcclxuICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgfVxyXG5cclxuICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59Il19