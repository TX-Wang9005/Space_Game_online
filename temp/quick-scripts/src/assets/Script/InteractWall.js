"use strict";
cc._RF.push(module, '4d7c6/5pCVIGLp5xl05F7N8', 'InteractWall');
// Script/InteractWall.ts

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
var InteractWall = /** @class */ (function (_super) {
    __extends(InteractWall, _super);
    function InteractWall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TopOfIW = null;
        _this.Ghost = null;
        _this.PlayerOpen = null;
        _this.PlayerClose = null;
        _this.anim = null;
        _this.current_user_number = 0;
        _this.isTouched = false;
        return _this;
    }
    // onLoad () {}
    InteractWall.prototype.start = function () {
        this.anim = this.node.getComponent(cc.Animation);
        this.anim.play();
        var uid = firebase.auth().currentUser.uid;
        var t = this;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                t.current_user_number = snapshot.val().player_number;
                // console.log("IW current_user_number", t.current_user_number);
            }
        });
        var top = cc.instantiate(this.TopOfIW);
        top.setPosition(this.node.position.x, this.node.position.y + 12);
        if (this.node.name == "IW x1")
            top.setScale(0.5, 1);
        else if (this.node.name == "IW x2 x2") {
            top.setScale(2, 2);
            top.setPosition(this.node.position.x, this.node.position.y + 24);
        }
        cc.find("Canvas/PlayerContainer").addChild(top);
    };
    InteractWall.prototype.update = function (dt) {
    };
    InteractWall.prototype.onBeginContact = function (contact, self, other) {
        var _this = this;
        if (this.isTouched)
            return;
        if (other.node.name == "player1" || other.node.name == "player2" || other.node.name == "player3" || other.node.name == "player4" || other.node.name == "player5") {
            // console.log("IW Begin");
            if (other.node.group == 'player' || other.node.group == 'Coinplayer') {
                // console.log("PB");
                this.isTouched = true;
                if (!this.anim.getAnimationState('Open').isPlaying)
                    this.anim.play('Open');
                this.scheduleOnce(function () {
                    var str = "player" + _this.current_user_number.toString();
                    if (str == other.node.name) {
                        if (_this.PlayerOpen)
                            cc.audioEngine.playEffect(_this.PlayerOpen, false);
                    }
                }, 0.4);
                this.scheduleOnce(function () {
                    contact.disabled = true;
                }, 0.8);
            }
            else if (other.node.group == 'ghost') {
                // console.log("GB");
                var action = void 0;
                action = cc.fadeTo(0.2, 100);
                other.node.runAction(action);
                this.isTouched = true;
                contact.disabled = true;
                var str = "player" + this.current_user_number.toString();
                if (str == other.node.name) {
                    if (this.Ghost)
                        cc.audioEngine.playEffect(this.Ghost, false);
                }
            }
        }
    };
    InteractWall.prototype.onEndContact = function (contact, self, other) {
        var _this = this;
        if (other.node.name == "player1" || other.node.name == "player2" || other.node.name == "player3" || other.node.name == "player4" || other.node.name == "player5") {
            // console.log("IW End");
            if (other.node.group == 'player' || other.node.group == 'Coinplayer') {
                // console.log("PE");
                this.isTouched = false;
                if (!this.anim.getAnimationState('Close').isPlaying)
                    this.anim.play('Close');
                var str = "player" + this.current_user_number.toString();
                if (str == other.node.name) {
                    if (this.PlayerClose)
                        cc.audioEngine.playEffect(this.PlayerClose, false);
                }
                this.scheduleOnce(function () {
                    if (!_this.anim.getAnimationState('Idle').isPlaying)
                        _this.anim.play();
                }, 0.4);
            }
            else if (other.node.group == 'ghost') {
                // console.log("GE");
                var action = void 0;
                action = cc.fadeTo(0.2, 255);
                other.node.runAction(action);
                this.isTouched = false;
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], InteractWall.prototype, "TopOfIW", void 0);
    __decorate([
        property(cc.AudioClip)
    ], InteractWall.prototype, "Ghost", void 0);
    __decorate([
        property(cc.AudioClip)
    ], InteractWall.prototype, "PlayerOpen", void 0);
    __decorate([
        property(cc.AudioClip)
    ], InteractWall.prototype, "PlayerClose", void 0);
    InteractWall = __decorate([
        ccclass
    ], InteractWall);
    return InteractWall;
}(cc.Component));
exports.default = InteractWall;

cc._RF.pop();