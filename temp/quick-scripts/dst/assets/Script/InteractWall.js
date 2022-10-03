
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/InteractWall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxJbnRlcmFjdFdhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFJMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFxR0M7UUFsR0csYUFBTyxHQUFjLElBQUksQ0FBQztRQUUxQixXQUFLLEdBQWlCLElBQUksQ0FBQztRQUUzQixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFFaEMsaUJBQVcsR0FBaUIsSUFBSSxDQUFDO1FBRXpCLFVBQUksR0FBaUIsSUFBSSxDQUFDO1FBRTFCLHlCQUFtQixHQUFXLENBQUMsQ0FBQztRQUVoQyxlQUFTLEdBQUcsS0FBSyxDQUFDOztJQXNGOUIsQ0FBQztJQXBGRyxlQUFlO0lBRWYsNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFakIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2IsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFhLEdBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ3hFLElBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBQztnQkFDdEIsQ0FBQyxDQUFD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VGhCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FxR2hDO0lBQUQsbUJBQUM7Q0FyR0QsQUFxR0MsQ0FyR3lDLEVBQUUsQ0FBQyxTQUFTLEdBcUdyRDtrQkFyR29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3RXYWxsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgVG9wT2ZJVzogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBHaG9zdDogY2MuQXVkaW9DbGlwID0gbnVsbDsgICAgXHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgUGxheWVyT3BlbjogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBQbGF5ZXJDbG9zZTogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGFuaW06IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcbiAgICBcclxuICAgIHByaXZhdGUgY3VycmVudF91c2VyX251bWJlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGlzVG91Y2hlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgdGhpcy5hbmltLnBsYXkoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdWlkID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHVzZXJfaW5mby8ke3VpZH1gKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZihzbmFwc2hvdC52YWwoKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHQuY3VycmVudF91c2VyX251bWJlciA9IHNuYXBzaG90LnZhbCgpLnBsYXllcl9udW1iZXI7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIklXIGN1cnJlbnRfdXNlcl9udW1iZXJcIiwgdC5jdXJyZW50X3VzZXJfbnVtYmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBsZXQgdG9wID0gY2MuaW5zdGFudGlhdGUodGhpcy5Ub3BPZklXKTtcclxuICAgICAgICB0b3Auc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uLngsIHRoaXMubm9kZS5wb3NpdGlvbi55KzEyKTtcclxuICAgICAgICBpZih0aGlzLm5vZGUubmFtZSA9PSBcIklXIHgxXCIpXHJcbiAgICAgICAgICAgIHRvcC5zZXRTY2FsZSgwLjUsMSk7XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLm5vZGUubmFtZSA9PSBcIklXIHgyIHgyXCIpe1xyXG4gICAgICAgICAgICB0b3Auc2V0U2NhbGUoMiwyKTtcclxuICAgICAgICAgICAgdG9wLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbi54LCB0aGlzLm5vZGUucG9zaXRpb24ueSsyNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyXCIpLmFkZENoaWxkKHRvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgfVxyXG5cclxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3QsIHNlbGYsIG90aGVyKXtcclxuICAgICAgICBpZih0aGlzLmlzVG91Y2hlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmKG90aGVyLm5vZGUubmFtZSA9PSBcInBsYXllcjFcIiB8fCBvdGhlci5ub2RlLm5hbWUgPT0gXCJwbGF5ZXIyXCIgfHwgb3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyM1wiIHx8IG90aGVyLm5vZGUubmFtZSA9PSBcInBsYXllcjRcIiB8fCBvdGhlci5ub2RlLm5hbWUgPT0gXCJwbGF5ZXI1XCIpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIklXIEJlZ2luXCIpO1xyXG4gICAgICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdwbGF5ZXInIHx8IG90aGVyLm5vZGUuZ3JvdXAgPT0gJ0NvaW5wbGF5ZXInKXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUEJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5hbmltLmdldEFuaW1hdGlvblN0YXRlKCdPcGVuJykuaXNQbGF5aW5nKSB0aGlzLmFuaW0ucGxheSgnT3BlbicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyID0gXCJwbGF5ZXJcIit0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzdHIgPT0gb3RoZXIubm9kZS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJPcGVuKSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuUGxheWVyT3BlbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDAuNCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3QuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSwgMC44KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYob3RoZXIubm9kZS5ncm91cCA9PSAnZ2hvc3QnKXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiR0JcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uOiBjYy5BY3Rpb247XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSBjYy5mYWRlVG8oMC4yLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgb3RoZXIubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNUb3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnRhY3QuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IFwicGxheWVyXCIrdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZihzdHIgPT0gb3RoZXIubm9kZS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkdob3N0KSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuR2hvc3QsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uRW5kQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcil7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyMVwiIHx8IG90aGVyLm5vZGUubmFtZSA9PSBcInBsYXllcjJcIiB8fCBvdGhlci5ub2RlLm5hbWUgPT0gXCJwbGF5ZXIzXCIgfHwgb3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyNFwiIHx8IG90aGVyLm5vZGUubmFtZSA9PSBcInBsYXllcjVcIil7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSVcgRW5kXCIpO1xyXG4gICAgICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdwbGF5ZXInIHx8IG90aGVyLm5vZGUuZ3JvdXAgPT0gJ0NvaW5wbGF5ZXInKXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUEVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnQ2xvc2UnKS5pc1BsYXlpbmcpIHRoaXMuYW5pbS5wbGF5KCdDbG9zZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IFwicGxheWVyXCIrdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZihzdHIgPT0gb3RoZXIubm9kZS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckNsb3NlKSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuUGxheWVyQ2xvc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnSWRsZScpLmlzUGxheWluZykgdGhpcy5hbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDAuNCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ2dob3N0Jyl7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdFXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gY2MuZmFkZVRvKDAuMiwgMjU1KTtcclxuICAgICAgICAgICAgICAgIG90aGVyLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==