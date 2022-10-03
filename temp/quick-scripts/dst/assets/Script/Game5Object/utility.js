
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/utility.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7b61V4ulNIU6pnoc0mNIWa', 'utility');
// Script/Game5Object/utility.ts

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
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundEffect = [];
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        var press_button = new cc.Component.EventHandler();
        press_button.target = this.node;
        press_button.component = "utility";
        press_button.handler = "selection";
        cc.find("Canvas/MapObjContainer/character_utility/" + this.node.name + "/Button").getComponent(cc.Button).clickEvents.push(press_button);
    };
    NewClass.prototype.selection = function () {
        var game_manager = cc.find('GameManager').getComponent(GameManagerS5_1.default);
        this.current_user = game_manager.current_user_node;
        console.log("finally   " + this.node.name);
        if (!game_manager.select_character) {
            switch (this.node.name) {
                case "book":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "erudite" });
                    game_manager.select_character = true;
                    game_manager.character = "erudite";
                    cc.find('Canvas/UI/Character/book').active = true;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can peak card distribution";
                    break;
                case "bomb":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "thug" });
                    game_manager.select_character = true;
                    game_manager.character = "thug";
                    //get all the irrefutable on
                    for (var i = 1; i <= 5; i++) {
                        if ("player" + i != this.current_user) {
                            cc.find("Canvas/PlayerContainer/player" + i + "/unreasonable").active = true;
                        }
                    }
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = true;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now other can't reject your fight request";
                    break;
                case "black_clover":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "gambler" });
                    game_manager.select_character = true;
                    cc.find('Canvas/UI/Mine_info_choice/gambler_ability').active = true;
                    cc.find('Canvas/UI/Mine_info_choice/betting_multiple').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = true;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can gain more when you win";
                    game_manager.character = "gambler";
                    break;
                case "ring":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "rule_breaker" });
                    game_manager.select_character = true;
                    game_manager.character = "rule_breaker";
                    firebase.database().ref("player_data/" + this.current_user + "/game2_state/reverse").set({ reverse: "true" });
                    cc.find('Canvas/UI/Mine_info_choice/switch_result').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = true;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can reverse the fighting result";
                    break; // means he can swap the cards and invert the result
                case "coin":
                    firebase.database().ref("player_data/" + this.current_user + "/character").set({ character: "escaper" });
                    game_manager.select_character = true;
                    game_manager.character = "escaper";
                    cc.find('Canvas/UI/Mine_info_choice/escape').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = true;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can escape from fight";
                    break; // means he can swap the cards and invert the result
            }
        }
        cc.audioEngine.playEffect(this.soundEffect[0], false);
        cc.find('Canvas/MapObjContainer/character_utility/book').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/bomb').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/black_clover').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/coin').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/ring').active = false;
        var fadeout = cc.fadeOut(5.0);
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1);
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "soundEffect", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcdXRpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1Qyw4REFBd0Q7QUFHeEQ7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUE0R0M7UUF6R0csaUJBQVcsR0FBbUIsRUFBRSxDQUFDOztRQXdHakMsaUJBQWlCO0lBQ3JCLENBQUM7SUF0R0csd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix3QkFBSyxHQUFMO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNoQyxZQUFZLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxFQUFFLENBQUMsSUFBSSxDQUFDLDhDQUE0QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksWUFBUyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hJLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0ksSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1FBQ25ELE9B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ZCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNoRCxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNQLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ3BELENBQUM7SUF0R0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lEQUNBO0lBSGhCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E0RzVCO0lBQUQsZUFBQztDQTVHRCxBQTRHQyxDQTVHcUMsRUFBRSxDQUFDLFNBQVMsR0E0R2pEO2tCQTVHb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmltcG9ydCBHYW1lTWFuYWdlclM1IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclM1XCJcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQXVkaW9DbGlwIH0pXHJcbiAgICBzb3VuZEVmZmVjdDogY2MuQXVkaW9DbGlwW10gPSBbXTtcclxuICAgIGN1cnJlbnRfdXNlcjtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgcHJlc3NfYnV0dG9uID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBwcmVzc19idXR0b24udGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHByZXNzX2J1dHRvbi5jb21wb25lbnQgPSBcInV0aWxpdHlcIjtcclxuICAgICAgICBwcmVzc19idXR0b24uaGFuZGxlciA9IFwic2VsZWN0aW9uXCI7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL01hcE9iakNvbnRhaW5lci9jaGFyYWN0ZXJfdXRpbGl0eS8ke3RoaXMubm9kZS5uYW1lfS9CdXR0b25gKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHByZXNzX2J1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBnYW1lX21hbmFnZXIgPSBjYy5maW5kKCdHYW1lTWFuYWdlcicpLmdldENvbXBvbmVudChHYW1lTWFuYWdlclM1KTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdXNlciA9IGdhbWVfbWFuYWdlci5jdXJyZW50X3VzZXJfbm9kZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFsbHkgICBcIiArIHRoaXMubm9kZS5uYW1lKVxyXG4gICAgICAgIGlmICghZ2FtZV9tYW5hZ2VyLnNlbGVjdF9jaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLm5vZGUubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2tcIjpcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vY2hhcmFjdGVyYCkuc2V0KHsgY2hhcmFjdGVyOiBcImVydWRpdGVcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lX21hbmFnZXIuc2VsZWN0X2NoYXJhY3RlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9tYW5hZ2VyLmNoYXJhY3RlciA9IFwiZXJ1ZGl0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9vaycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9jbG92ZXInKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2JvbWInKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2NvaW4nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL3JpbmcnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIk5vdyB5b3UgY2FuIHBlYWsgY2FyZCBkaXN0cmlidXRpb25cIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJib21iXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2NoYXJhY3RlcmApLnNldCh7IGNoYXJhY3RlcjogXCJ0aHVnXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9tYW5hZ2VyLnNlbGVjdF9jaGFyYWN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfbWFuYWdlci5jaGFyYWN0ZXIgPSBcInRodWdcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL2dldCBhbGwgdGhlIGlycmVmdXRhYmxlIG9uXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChgcGxheWVyJHtpfWAgIT0gdGhpcy5jdXJyZW50X3VzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfS91bnJlYXNvbmFibGVgKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9vaycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvY2xvdmVyJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9ib21iJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2NvaW4nKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL3JpbmcnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIk5vdyBvdGhlciBjYW4ndCByZWplY3QgeW91ciBmaWdodCByZXF1ZXN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYmxhY2tfY2xvdmVyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2NoYXJhY3RlcmApLnNldCh7IGNoYXJhY3RlcjogXCJnYW1ibGVyXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9tYW5hZ2VyLnNlbGVjdF9jaGFyYWN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9NaW5lX2luZm9fY2hvaWNlL2dhbWJsZXJfYWJpbGl0eScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvYmV0dGluZ19tdWx0aXBsZScpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9ib29rJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9jbG92ZXInKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9tYicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvY29pbicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvcmluZycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTm93IHlvdSBjYW4gZ2FpbiBtb3JlIHdoZW4geW91IHdpblwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfbWFuYWdlci5jaGFyYWN0ZXIgPSBcImdhbWJsZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyaW5nXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2NoYXJhY3RlcmApLnNldCh7IGNoYXJhY3RlcjogXCJydWxlX2JyZWFrZXJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lX21hbmFnZXIuc2VsZWN0X2NoYXJhY3RlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9tYW5hZ2VyLmNoYXJhY3RlciA9IFwicnVsZV9icmVha2VyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlL3JldmVyc2VgKS5zZXQoeyByZXZlcnNlOiBcInRydWVcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvTWluZV9pbmZvX2Nob2ljZS9zd2l0Y2hfcmVzdWx0JykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2Jvb2snKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2Nsb3ZlcicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9tYicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvY29pbicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvcmluZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJOb3cgeW91IGNhbiByZXZlcnNlIHRoZSBmaWdodGluZyByZXN1bHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBtZWFucyBoZSBjYW4gc3dhcCB0aGUgY2FyZHMgYW5kIGludmVydCB0aGUgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29pblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9jaGFyYWN0ZXJgKS5zZXQoeyBjaGFyYWN0ZXI6IFwiZXNjYXBlclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfbWFuYWdlci5zZWxlY3RfY2hhcmFjdGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lX21hbmFnZXIuY2hhcmFjdGVyID0gXCJlc2NhcGVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL01pbmVfaW5mb19jaG9pY2UvZXNjYXBlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2Jvb2snKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvQ2hhcmFjdGVyL2Nsb3ZlcicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvYm9tYicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9DaGFyYWN0ZXIvY29pbicpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL0NoYXJhY3Rlci9yaW5nJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJOb3cgeW91IGNhbiBlc2NhcGUgZnJvbSBmaWdodFwiXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIG1lYW5zIGhlIGNhbiBzd2FwIHRoZSBjYXJkcyBhbmQgaW52ZXJ0IHRoZSByZXN1bHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc291bmRFZmZlY3RbMF0sIGZhbHNlKTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTWFwT2JqQ29udGFpbmVyL2NoYXJhY3Rlcl91dGlsaXR5L2Jvb2snKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTWFwT2JqQ29udGFpbmVyL2NoYXJhY3Rlcl91dGlsaXR5L2JvbWInKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvTWFwT2JqQ29udGFpbmVyL2NoYXJhY3Rlcl91dGlsaXR5L2JsYWNrX2Nsb3ZlcicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9NYXBPYmpDb250YWluZXIvY2hhcmFjdGVyX3V0aWxpdHkvY29pbicpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9NYXBPYmpDb250YWluZXIvY2hhcmFjdGVyX3V0aWxpdHkvcmluZycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBmYWRlb3V0ID0gY2MuZmFkZU91dCg1LjApXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvVUkvaGludF9tZXNzYWdlJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLnJ1bkFjdGlvbihmYWRlb3V0KTtcclxuICAgICAgICB9LCAwLjEpXHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL1VJL2hpbnRfbWVzc2FnZScpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9VSS9oaW50X21lc3NhZ2UnKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19