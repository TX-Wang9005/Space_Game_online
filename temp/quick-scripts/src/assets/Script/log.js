"use strict";
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