
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game5Object/panel_info.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8b223BWzeBPh6BpgH153s5e', 'panel_info');
// Script/Game5Object/panel_info.ts

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
var panel_info = /** @class */ (function (_super) {
    __extends(panel_info, _super);
    function panel_info() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flag = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    panel_info.prototype.start = function () {
        var handle = this;
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        handle.paper_left = 2;
        handle.scissor_left = 2;
        handle.stone_left = 2;
        handle.money_left = 5;
        cc.find("Canvas/UI/TopPanel/paper/number").getComponent(cc.Label).string = String(handle.paper_left);
        cc.find("Canvas/UI/TopPanel/scissor/number").getComponent(cc.Label).string = String(handle.scissor_left);
        cc.find("Canvas/UI/TopPanel/stone/number").getComponent(cc.Label).string = String(handle.stone_left);
        cc.find("Canvas/UI/TopPanel/life/number").getComponent(cc.Label).string = String(handle.money_left);
    };
    panel_info.prototype.update_info = function (type, new_number) {
        var handle = this;
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
        if (type == "paper") {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ paper: new_number });
            cc.find("Canvas/UI/TopPanel/paper/number").getComponent(cc.Label).string = String(new_number);
            handle.paper_left = new_number;
        }
        else if (type == "scissor") {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ scissor: new_number });
            cc.find("Canvas/UI/TopPanel/scissor/number").getComponent(cc.Label).string = String(new_number);
            this.scissor_left = new_number;
        }
        else if (type == "stone") {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ stone: new_number });
            cc.find("Canvas/UI/TopPanel/stone/number").getComponent(cc.Label).string = String(new_number);
            handle.stone_left = new_number;
        }
        else if (type == "money") {
            firebase.database().ref("player_data/" + this.current_user + "/game2_state").update({ money: new_number });
            cc.find("Canvas/UI/TopPanel/life/number").getComponent(cc.Label).string = String(new_number);
            handle.money_left = new_number;
        }
    };
    panel_info.prototype.update = function (dt) {
        if (this.flag == false) {
            var handle_1 = this;
            this.current_user = cc.find("GameManager").getComponent(GameManagerS5_1.default).current_user_node;
            if (this.current_user != null) {
                this.flag = true;
                firebase.database().ref("player_data/" + this.current_user + "/game2_state").once('value', function (snapshot) {
                    cc.find("Canvas/UI/TopPanel/life/number").getComponent(cc.Label).string = String(snapshot.val().money);
                    handle_1.money_left = snapshot.val().money;
                });
            }
        }
    };
    panel_info = __decorate([
        ccclass
    ], panel_info);
    return panel_info;
}(cc.Component));
exports.default = panel_info;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lNU9iamVjdFxccGFuZWxfaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1Qyw4REFBeUQ7QUFHekQ7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUErREM7UUF2RFcsVUFBSSxHQUFHLEtBQUssQ0FBQzs7SUF1RHpCLENBQUM7SUF0REcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZiwwQkFBSyxHQUFMO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3pGLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFB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QyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQ3pGLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO2dCQUNoQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksQ0FBQyxZQUFZLGlCQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtvQkFDcEcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZHLFFBQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLENBQUE7YUFDTDtTQUNKO0lBQ0wsQ0FBQztJQTlEZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQStEOUI7SUFBRCxpQkFBQztDQS9ERCxBQStEQyxDQS9EdUMsRUFBRSxDQUFDLFNBQVMsR0ErRG5EO2tCQS9Eb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbmltcG9ydCBHYW1lTWFuYWdlclM1IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclM1XCI7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGFuZWxfaW5mbyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcGFwZXJfbGVmdDtcclxuICAgIHNjaXNzb3JfbGVmdDtcclxuICAgIHN0b25lX2xlZnRcclxuICAgIG1vbmV5X2xlZnQ7XHJcbiAgICBjdXJyZW50X3VzZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBmbGFnID0gZmFsc2U7XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgaGFuZGxlLnBhcGVyX2xlZnQgPSAyO1xyXG4gICAgICAgIGhhbmRsZS5zY2lzc29yX2xlZnQgPSAyO1xyXG4gICAgICAgIGhhbmRsZS5zdG9uZV9sZWZ0ID0gMjtcclxuICAgICAgICBoYW5kbGUubW9uZXlfbGVmdCA9IDU7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9Ub3BQYW5lbC9wYXBlci9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcoaGFuZGxlLnBhcGVyX2xlZnQpO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvVG9wUGFuZWwvc2Npc3Nvci9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcoaGFuZGxlLnNjaXNzb3JfbGVmdCk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9Ub3BQYW5lbC9zdG9uZS9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcoaGFuZGxlLnN0b25lX2xlZnQpO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvVG9wUGFuZWwvbGlmZS9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcoaGFuZGxlLm1vbmV5X2xlZnQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlX2luZm8odHlwZTogc3RyaW5nLCBuZXdfbnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gdGhpcztcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdXNlciA9IGNjLmZpbmQoXCJHYW1lTWFuYWdlclwiKS5nZXRDb21wb25lbnQoR2FtZU1hbmFnZXJTNSkuY3VycmVudF91c2VyX25vZGU7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJwYXBlclwiKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IHBhcGVyOiBuZXdfbnVtYmVyIH0pO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL1RvcFBhbmVsL3BhcGVyL251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFN0cmluZyhuZXdfbnVtYmVyKTtcclxuICAgICAgICAgICAgaGFuZGxlLnBhcGVyX2xlZnQgPSBuZXdfbnVtYmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwic2Npc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IHNjaXNzb3I6IG5ld19udW1iZXIgfSk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvVG9wUGFuZWwvc2Npc3Nvci9udW1iZXJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBTdHJpbmcobmV3X251bWJlcik7XHJcbiAgICAgICAgICAgIHRoaXMuc2Npc3Nvcl9sZWZ0ID0gbmV3X251bWJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcInN0b25lXCIpIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhLyR7dGhpcy5jdXJyZW50X3VzZXJ9L2dhbWUyX3N0YXRlYCkudXBkYXRlKHsgc3RvbmU6IG5ld19udW1iZXIgfSk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvVUkvVG9wUGFuZWwvc3RvbmUvbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKG5ld19udW1iZXIpO1xyXG4gICAgICAgICAgICBoYW5kbGUuc3RvbmVfbGVmdCA9IG5ld19udW1iZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJtb25leVwiKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLnVwZGF0ZSh7IG1vbmV5OiBuZXdfbnVtYmVyIH0pO1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL1RvcFBhbmVsL2xpZmUvbnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKG5ld19udW1iZXIpO1xyXG4gICAgICAgICAgICBoYW5kbGUubW9uZXlfbGVmdCA9IG5ld19udW1iZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZsYWcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF91c2VyID0gY2MuZmluZChcIkdhbWVNYW5hZ2VyXCIpLmdldENvbXBvbmVudChHYW1lTWFuYWdlclM1KS5jdXJyZW50X3VzZXJfbm9kZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudF91c2VyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS8ke3RoaXMuY3VycmVudF91c2VyfS9nYW1lMl9zdGF0ZWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9VSS9Ub3BQYW5lbC9saWZlL251bWJlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFN0cmluZyhzbmFwc2hvdC52YWwoKS5tb25leSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLm1vbmV5X2xlZnQgPSBzbmFwc2hvdC52YWwoKS5tb25leTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19