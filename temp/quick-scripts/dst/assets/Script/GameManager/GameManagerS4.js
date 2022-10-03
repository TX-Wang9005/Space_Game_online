
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager/GameManagerS4.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '427d7LXlGREOaRzwxYoAibI', 'GameManagerS4');
// Script/GameManager/GameManagerS4.ts

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
var Player_1 = require("../Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManagerS4 = /** @class */ (function (_super) {
    __extends(GameManagerS4, _super);
    function GameManagerS4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBG = null;
        _this.player_node1 = null;
        _this.player_node2 = null;
        _this.player_node3 = null;
        _this.player_node4 = null;
        _this.player_node5 = null;
        _this.physicManager = null;
        return _this;
    }
    GameManagerS4.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
    };
    GameManagerS4.prototype.start = function () {
        var _this = this;
        this.loadingBG.active = true;
        // 一開始所有玩家都不能動
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1)
            this.player_node1.getComponent(Player_1.default).moveable = false;
        if (this.player_node2)
            this.player_node2.getComponent(Player_1.default).moveable = false;
        if (this.player_node3)
            this.player_node3.getComponent(Player_1.default).moveable = false;
        if (this.player_node4)
            this.player_node4.getComponent(Player_1.default).moveable = false;
        if (this.player_node5)
            this.player_node5.getComponent(Player_1.default).moveable = false;
        this.scheduleOnce(function () {
            _this.loadingBG.active = false;
            if (_this.player_node1)
                _this.player_node1.getComponent(Player_1.default).moveable = true;
            if (_this.player_node2)
                _this.player_node2.getComponent(Player_1.default).moveable = true;
            if (_this.player_node3)
                _this.player_node3.getComponent(Player_1.default).moveable = true;
            if (_this.player_node4)
                _this.player_node4.getComponent(Player_1.default).moveable = true;
            if (_this.player_node5)
                _this.player_node5.getComponent(Player_1.default).moveable = true;
        }, 2.5);
        this.Init_player();
    };
    // update (dt) {}
    GameManagerS4.prototype.Init_player = function () {
        var handle = this;
        var _loop_1 = function (i) {
            firebase.database().ref("player_data/player" + i).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    cc.find("Canvas/PlayerContainer/player" + i).active = true;
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveDirY").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/premoveDirX").set({ Dir: 0 });
                    firebase.database().ref("player_data/player" + i + "/state_value/moveable").set({ moveable: "true" });
                    firebase.database().ref("player_data/player" + i + "/state_value/X").set({ x: -656 });
                    firebase.database().ref("player_data/player" + i + "/state_value/Y").set({ y: -16 });
                }
            });
        };
        // initialize players        
        for (var i = 1; i <= 5; i++) {
            _loop_1(i);
        }
        // initial End
    };
    __decorate([
        property(cc.Node)
    ], GameManagerS4.prototype, "loadingBG", void 0);
    GameManagerS4 = __decorate([
        ccclass
    ], GameManagerS4);
    return GameManagerS4;
}(cc.Component));
exports.default = GameManagerS4;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlclxcR2FtZU1hbmFnZXJTNC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixvQ0FBK0I7QUFFekIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFJMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUFrRUM7UUE5REcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUVyQixtQkFBYSxHQUFzQixJQUFJLENBQUM7O0lBc0RwRCxDQUFDO0lBcERHLDhCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFBQSxpQkF1QkM7UUFyQkcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzdCLGNBQWM7UUFDZCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5RCxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDL0UsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQy9FLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMvRSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDL0UsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQy9FLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxLQUFJLENBQUMsWUFBWTtnQkFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZ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ZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9QbGF5ZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFuYWdlclM0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsb2FkaW5nQkc6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHBsYXllcl9ub2RlMTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcGxheWVyX25vZGUzOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBsYXllcl9ub2RlNDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwbGF5ZXJfbm9kZTU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgcGh5c2ljTWFuYWdlcjogY2MuUGh5c2ljc01hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZ0JHLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8g5LiA6ZaL5aeL5omA5pyJ546p5a626YO95LiN6IO95YuVXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTEgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXIxXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGUyID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyMlwiKTtcclxuICAgICAgICB0aGlzLnBsYXllcl9ub2RlMyA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyQ29udGFpbmVyL3BsYXllcjNcIik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfbm9kZTQgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllckNvbnRhaW5lci9wbGF5ZXI0XCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyX25vZGU1ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyNVwiKTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTEpIHRoaXMucGxheWVyX25vZGUxLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUyKSB0aGlzLnBsYXllcl9ub2RlMi5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMykgdGhpcy5wbGF5ZXJfbm9kZTMuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTQpIHRoaXMucGxheWVyX25vZGU0LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGU1KSB0aGlzLnBsYXllcl9ub2RlNS5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQkcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlMSkgdGhpcy5wbGF5ZXJfbm9kZTEuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTIpIHRoaXMucGxheWVyX25vZGUyLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyX25vZGUzKSB0aGlzLnBsYXllcl9ub2RlMy5nZXRDb21wb25lbnQoUGxheWVyKS5tb3ZlYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcl9ub2RlNCkgdGhpcy5wbGF5ZXJfbm9kZTQuZ2V0Q29tcG9uZW50KFBsYXllcikubW92ZWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJfbm9kZTUpIHRoaXMucGxheWVyX25vZGU1LmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gdHJ1ZTtcclxuICAgICAgICB9LCAyLjUpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5Jbml0X3BsYXllcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcblxyXG4gICAgXHJcbiAgICBJbml0X3BsYXllcigpe1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgcGxheWVycyAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9YCkub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHsgLy8g5aaC5p6c546p5a625a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoYENhbnZhcy9QbGF5ZXJDb250YWluZXIvcGxheWVyJHtpfWApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZURpclhgKS5zZXQoeyBEaXI6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9tb3ZlRGlyWWApLnNldCh7IERpcjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL3ByZW1vdmVEaXJYYCkuc2V0KHsgRGlyOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHBsYXllcl9kYXRhL3BsYXllciR7aX0vc3RhdGVfdmFsdWUvbW92ZWFibGVgKS5zZXQoeyBtb3ZlYWJsZTogXCJ0cnVlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgcGxheWVyX2RhdGEvcGxheWVyJHtpfS9zdGF0ZV92YWx1ZS9YYCkuc2V0KHsgeDogLTY1NiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBwbGF5ZXJfZGF0YS9wbGF5ZXIke2l9L3N0YXRlX3ZhbHVlL1lgKS5zZXQoeyB5OiAtMTYgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW5pdGlhbCBFbmRcclxuICAgIH1cclxufVxyXG4iXX0=