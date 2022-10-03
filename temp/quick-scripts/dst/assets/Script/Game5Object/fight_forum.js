
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/fight_forum.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ff61iG8iRKVLLASJ34EDGb', 'fight_forum');
// Script/Game5Object/fight_forum.ts

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
var battle_field_1 = require("./battle_field");
var GameManagerS5_1 = require("../GameManager/GameManagerS5");
var fight_forum = /** @class */ (function (_super) {
    __extends(fight_forum, _super);
    function fight_forum() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.opponent_info_choice = null;
        _this.Mine_info_choice = null;
        _this.battle_field = null;
        _this.click = null;
        _this.fight = false;
        _this.being_rude = false;
        _this.updated = true;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    fight_forum.prototype.start = function () {
        //this.current_user = cc.find("GameManager").getComponent(GameManagerS2).current_user_node;
        var fight_forum_accept = new cc.Component.EventHandler();
        fight_forum_accept.target = this.node;
        fight_forum_accept.component = "fight_forum";
        fight_forum_accept.handler = "accept";
        cc.find("Canvas/UI/fight_forum/accept").getComponent(cc.Button).clickEvents.push(fight_forum_accept);
        var fight_forum_reject = new cc.Component.EventHandler();
        fight_forum_reject.target = this.node;
        fight_forum_reject.component = "fight_forum";
        fight_forum_reject.handler = "reject";
        cc.find("Canvas/UI/fight_forum/reject").getComponent(cc.Button).clickEvents.push(fight_forum_reject);
    };
    fight_forum.prototype.accept = function () {
        cc.audioEngine.playEffect(this.click, false);
        var handle = this;
        this.fight = true;
        console.log("accept challenge");
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ fighting: "true" });
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ challenged: "false" });
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").once('value', function (snapshot) {
            handle.opponent = snapshot.val().opponent;
            //console.log("you: " + handle.current_user + "  opponent: " + handle.opponent)
            firebase.database().ref("player_data/" + handle.opponent + "/game2_state").update({ opponent: handle.current_user, fighting: "true" });
            var game_manager = cc.find('GameManager').getComponent(GameManagerS5_1.default);
            handle.Mine_info_choice.active = true;
            handle.opponent_info_choice.active = true;
            handle.battle_field.active = true;
            handle.battle_field.getComponent(battle_field_1.default).opponent = handle.opponent;
            game_manager.opponent_user_node = handle.opponent;
            game_manager.fighting = true;
            console.log("game manager fighting: " + game_manager.fighting);
            if (handle.being_rude) {
                cc.find("Canvas/UI/fight_forum/reject").active = true;
                handle.being_rude = false;
            }
            cc.find("Canvas/UI/fight_forum").active = false;
        });
        //open up the battle field and both info_choice
    };
    fight_forum.prototype.reject = function () {
        cc.audioEngine.playEffect(this.click, false);
        firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ opponent: "null" });
        cc.find("Canvas/UI/fight_forum").active = false;
    };
    fight_forum.prototype.update = function (dt) {
    };
    __decorate([
        property(cc.Node)
    ], fight_forum.prototype, "opponent_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], fight_forum.prototype, "Mine_info_choice", void 0);
    __decorate([
        property(cc.Node)
    ], fight_forum.prototype, "battle_field", void 0);
    __decorate([
        property(cc.AudioClip)
    ], fight_forum.prototype, "click", void 0);
    fight_forum = __decorate([
        ccclass
    ], fight_forum);
    return fight_forum;
}(cc.Component));
exports.default = fight_forum;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxcZmlnaHRfZm9ydW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsK0NBQTBDO0FBQzFDLDhEQUF5RDtBQUd6RDtJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQStFQztRQTdFRywwQkFBb0IsR0FBWSxJQUFJLENBQUM7UUFFckMsc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBRWpDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQUssR0FBaUIsSUFBSSxDQUFDO1FBSzNCLFdBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFPLEdBQUcsSUFBSSxDQUFDOztJQWdFbkIsQ0FBQztJQTNERyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLDJCQUFLLEdBQUw7UUFDSSwyRkFBMkY7UUFDM0YsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekQsa0JBQWtCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEMsa0JBQWtCLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztRQUM3QyxrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRyxJ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LEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDNUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLENBQUMsWUFBWSxpQkFBYyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDcEQsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxFQUFFO0lBS1QsQ0FBQztJQTNFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZEQUNtQjtJQUVyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNlO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1c7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzs4Q0FDSTtJQVJWLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0ErRS9CO0lBQUQsa0JBQUM7Q0EvRUQsQUErRUMsQ0EvRXdDLEVBQUUsQ0FBQyxTQUFTLEdBK0VwRDtrQkEvRW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5pbXBvcnQgYmF0dGxlX2ZpZWxkIGZyb20gXCIuL2JhdHRsZV9maWVsZFwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXJTNSBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJTNVwiO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpZ2h0X2ZvcnVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgb3Bwb25lbnRfaW5mb19jaG9pY2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBNaW5lX2luZm9fY2hvaWNlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmF0dGxlX2ZpZWxkOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBjbGljazogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBjdXJyZW50X3VzZXI7XHJcbiAgICBvcHBvbmVudDtcclxuXHJcbiAgICBmaWdodCA9IGZhbHNlO1xyXG4gICAgYmVpbmdfcnVkZSA9IGZhbHNlO1xyXG4gICAgdXBkYXRlZCA9IHRydWU7XHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgLy90aGlzLmN1cnJlbnRfdXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTMikuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgbGV0IGZpZ2h0X2ZvcnVtX2FjY2VwdCA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgZmlnaHRfZm9ydW1fYWNjZXB0LnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBmaWdodF9mb3J1bV9hY2NlcHQuY29tcG9uZW50ID0gXCJmaWdodF9mb3J1bVwiO1xyXG4gICAgICAgIGZpZ2h0X2ZvcnVtX2FjY2VwdC5oYW5kbGVyID0gXCJhY2NlcHRcIjtcclxuICAgICAgICBjYy5maW5kKGBDYW52YXMvVUkvZmlnaHRfZm9ydW0vYWNjZXB0YCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChmaWdodF9mb3J1bV9hY2NlcHQpO1xyXG4gICAgICAgIGxldCBmaWdodF9mb3J1bV9yZWplY3QgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIGZpZ2h0X2ZvcnVtX3JlamVjdC50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgZmlnaHRfZm9ydW1fcmVqZWN0LmNvbXBvbmVudCA9IFwiZmlnaHRfZm9ydW1cIjtcclxuICAgICAgICBmaWdodF9mb3J1bV9yZWplY3QuaGFuZGxlciA9IFwicmVqZWN0XCI7XHJcbiAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL2ZpZ2h0X2ZvcnVtL3JlamVjdGApLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goZmlnaHRfZm9ydW1fcmVqZWN0KTtcclxuICAgIH1cclxuICAgIGFjY2VwdCgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuY2xpY2ssIGZhbHNlKVxyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZmlnaHQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWNjZXB0IGNoYWxsZW5nZVwiKTtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHt0aGlzLmN1cnJlbnRfdXNlcn0vZ2FtZTJfc3RhdGVgKS51cGRhdGUoeyBmaWdodGluZzogXCJ0cnVlXCIgfSk7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgY2hhbGxlbmdlZDogXCJmYWxzZVwiIH0pO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGhhbmRsZS5vcHBvbmVudCA9IHNuYXBzaG90LnZhbCgpLm9wcG9uZW50O1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwieW91OiBcIiArIGhhbmRsZS5jdXJyZW50X3VzZXIgKyBcIiAgb3Bwb25lbnQ6IFwiICsgaGFuZGxlLm9wcG9uZW50KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvJHtoYW5kbGUub3Bwb25lbnR9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgb3Bwb25lbnQ6IGhhbmRsZS5jdXJyZW50X3VzZXIsIGZpZ2h0aW5nOiBcInRydWVcIiB9KTtcclxuICAgICAgICAgICAgbGV0IGdhbWVfbWFuYWdlciA9IGNjLmZpbmQoJ0dhbWVNYW5hZ2VyJykuZ2V0Q29tcG9uZW50KEdhbWVNYW5hZ2VyUzUpO1xyXG4gICAgICAgICAgICBoYW5kbGUuTWluZV9pbmZvX2Nob2ljZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBoYW5kbGUub3Bwb25lbnRfaW5mb19jaG9pY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaGFuZGxlLmJhdHRsZV9maWVsZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBoYW5kbGUuYmF0dGxlX2ZpZWxkLmdldENvbXBvbmVudChiYXR0bGVfZmllbGQpLm9wcG9uZW50ID0gaGFuZGxlLm9wcG9uZW50O1xyXG4gICAgICAgICAgICBnYW1lX21hbmFnZXIub3Bwb25lbnRfdXNlcl9ub2RlID0gaGFuZGxlLm9wcG9uZW50O1xyXG4gICAgICAgICAgICBnYW1lX21hbmFnZXIuZmlnaHRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgbWFuYWdlciBmaWdodGluZzogXCIgKyBnYW1lX21hbmFnZXIuZmlnaHRpbmcpXHJcbiAgICAgICAgICAgIGlmIChoYW5kbGUuYmVpbmdfcnVkZSkge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChgQ2FudmFzL1VJL2ZpZ2h0X2ZvcnVtL3JlamVjdGApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGUuYmVpbmdfcnVkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9maWdodF9mb3J1bWApLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9vcGVuIHVwIHRoZSBiYXR0bGUgZmllbGQgYW5kIGJvdGggaW5mb19jaG9pY2VcclxuXHJcblxyXG4gICAgfVxyXG4gICAgcmVqZWN0KCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jbGljaywgZmFsc2UpXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgb3Bwb25lbnQ6IFwibnVsbFwiIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoYENhbnZhcy9VSS9maWdodF9mb3J1bWApLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19