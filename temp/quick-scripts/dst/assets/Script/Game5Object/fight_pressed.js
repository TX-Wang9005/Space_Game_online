
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/fight_pressed.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2fbf79NN7BPYbI2p3WXvVNz', 'fight_pressed');
// Script/Game5Object/fight_pressed.ts

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
var fight_forum_1 = require("./fight_forum");
var fight_pressed = /** @class */ (function (_super) {
    __extends(fight_pressed, _super);
    function fight_pressed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.click = null;
        _this.fight_forum = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    fight_pressed.prototype.start = function () {
        this.parent_name = this.node.parent.name;
        var fight_this = new cc.Component.EventHandler();
        fight_this.target = this.node;
        fight_this.component = "fight_pressed";
        fight_this.handler = "fight_forum_open";
        cc.find("Canvas/PlayerContainer/" + this.parent_name + "/fight").getComponent(cc.Button).clickEvents.push(fight_this);
        var rude_this = new cc.Component.EventHandler();
        rude_this.target = this.node;
        rude_this.component = "fight_pressed";
        rude_this.handler = "rude_forum_open";
        cc.find("Canvas/PlayerContainer/" + this.parent_name + "/unreasonable").getComponent(cc.Button).clickEvents.push(rude_this);
    };
    fight_pressed.prototype.fight_forum_open = function () {
        cc.audioEngine.playEffect(this.click, false);
        var handle = this;
        //upload to firebase
        var currentUser = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        firebase.database().ref("player_data/" + this.parent_name + "/game2_state").once('value', function (snapshot) {
            if (snapshot.val().opponent == "null") {
                firebase.database().ref("player_data/" + handle.parent_name + "/game2_state").update({ opponent: currentUser, challenged: "true" });
                handle.fight_forum.getComponent(fight_forum_1.default).being_rude = false;
            }
        });
    };
    fight_pressed.prototype.rude_forum_open = function () {
        cc.audioEngine.playEffect(this.click, false);
        var handle = this;
        //upload to firebase
        var currentUser = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        firebase.database().ref("player_data/" + this.parent_name + "/game2_state").once('value', function (snapshot) {
            if (snapshot.val().opponent == "null") {
                firebase.database().ref("player_data/" + handle.parent_name + "/game2_state").update({ opponent: currentUser, challenged: "absolute" });
            }
        });
    };
    __decorate([
        property(cc.AudioClip)
    ], fight_pressed.prototype, "click", void 0);
    __decorate([
        property(cc.Node)
    ], fight_pressed.prototype, "fight_forum", void 0);
    fight_pressed = __decorate([
        ccclass
    ], fight_pressed);
    return fight_pressed;
}(cc.Component));
exports.default = fight_pressed;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcZmlnaHRfcHJlc3NlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1Qyw4REFBeUQ7QUFDekQsNkNBQXdDO0FBR3hDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBcURDO1FBakRHLFdBQUssR0FBaUIsSUFBSSxDQUFDO1FBRTNCLGlCQUFXLEdBQVksSUFBSSxDQUFDOztRQThDNUIsaUJBQWlCO0lBQ3JCLENBQUM7SUE3Q0csd0JBQXdCO0lBRXhCLGVBQWU7SUFFZiw2QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2pELFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixVQUFVLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxVQUFVLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxJQUFJLENBQUMsNEJBQTBCLElBQUksQ0FBQyxXQUFXLFdBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqSCxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDaEQsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDdEMsRUFBRSxDQUFDLElBQUksQ0FBQyw0QkFBMEIsSUFBSSxDQUFDLFdBQVcsa0JBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUczSCxDQUFDO0lBRUQsd0NBQWdCLEdBQWhCO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsb0JBQW9CO1FBQ3BCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLHVCQUFhLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztRQUN2RixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksQ0FBQyxXQUFXLGlCQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUNuRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLElBQUksTUFBTSxFQUFFO2dCQUNuQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLE1BQU0sQ0FBQyxXQUFXLGlCQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUMvSCxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUNuRTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELHVDQUFlLEdBQWY7UUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixvQkFBb0I7UUFDcEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3ZGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsSUFBSSxDQUFDLFdBQVcsaUJBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxRQUFRO1lBQ25HLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsSUFBSSxNQUFNLEVBQUU7Z0JBQ25DLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWUsTUFBTSxDQUFDLFdBQVcsaUJBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDdEk7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUE5Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztnREFDSTtJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNVO0lBTlgsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXFEakM7SUFBRCxvQkFBQztDQXJERCxBQXFEQyxDQXJEMEMsRUFBRSxDQUFDLFNBQVMsR0FxRHREO2tCQXJEb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmltcG9ydCBHYW1lTWFuYWdlclM1IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclM1XCI7XHJcbmltcG9ydCBmaWdodF9mb3J1bSBmcm9tIFwiLi9maWdodF9mb3J1bVwiO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpZ2h0X3ByZXNzZWQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHBhcmVudF9uYW1lO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIGNsaWNrOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmaWdodF9mb3J1bTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRfbmFtZSA9IHRoaXMubm9kZS5wYXJlbnQubmFtZTtcclxuICAgICAgICBsZXQgZmlnaHRfdGhpcyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgZmlnaHRfdGhpcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZmlnaHRfdGhpcy5jb21wb25lbnQgPSBcImZpZ2h0X3ByZXNzZWRcIjtcclxuICAgICAgICBmaWdodF90aGlzLmhhbmRsZXIgPSBcImZpZ2h0X2ZvcnVtX29wZW5cIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyLyR7dGhpcy5wYXJlbnRfbmFtZX0vZmlnaHRgKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGZpZ2h0X3RoaXMpO1xyXG4gICAgICAgIGxldCBydWRlX3RoaXMgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIHJ1ZGVfdGhpcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcnVkZV90aGlzLmNvbXBvbmVudCA9IFwiZmlnaHRfcHJlc3NlZFwiO1xyXG4gICAgICAgIHJ1ZGVfdGhpcy5oYW5kbGVyID0gXCJydWRlX2ZvcnVtX29wZW5cIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvUGxheWVyQ29udGFpbmVyLyR7dGhpcy5wYXJlbnRfbmFtZX0vdW5yZWFzb25hYmxlYCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChydWRlX3RoaXMpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZmlnaHRfZm9ydW1fb3BlbigpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAvL3VwbG9hZCB0byBmaXJlYmFzZVxyXG4gICAgICAgIGxldCBjdXJyZW50VXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5wYXJlbnRfbmFtZX0vZ2FtZTJfc3RhdGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkub3Bwb25lbnQgPT0gXCJudWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5wYXJlbnRfbmFtZX0vZ2FtZTJfc3RhdGVgKS51cGRhdGUoeyBvcHBvbmVudDogY3VycmVudFVzZXIsIGNoYWxsZW5nZWQ6IFwidHJ1ZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmZpZ2h0X2ZvcnVtLmdldENvbXBvbmVudChmaWdodF9mb3J1bSkuYmVpbmdfcnVkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJ1ZGVfZm9ydW1fb3BlbigpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKTtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICAvL3VwbG9hZCB0byBmaXJlYmFzZVxyXG4gICAgICAgIGxldCBjdXJyZW50VXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5wYXJlbnRfbmFtZX0vZ2FtZTJfc3RhdGVgKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xyXG4gICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkub3Bwb25lbnQgPT0gXCJudWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke2hhbmRsZS5wYXJlbnRfbmFtZX0vZ2FtZTJfc3RhdGVgKS51cGRhdGUoeyBvcHBvbmVudDogY3VycmVudFVzZXIsIGNoYWxsZW5nZWQ6IFwiYWJzb2x1dGVcIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=