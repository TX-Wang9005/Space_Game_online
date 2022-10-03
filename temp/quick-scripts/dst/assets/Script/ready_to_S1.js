
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ready_to_S1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab0aeUex1hCEZENd0Yns22t', 'ready_to_S1');
// Script/ready_to_S1.ts

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
        _this.condition = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        var ready_press = new cc.Component.EventHandler();
        //console.log("1")
        ready_press.target = this.node;
        ready_press.component = "ready_to_S1";
        ready_press.handler = "ready_player";
        cc.find("Canvas/ready").getComponent(cc.Button).clickEvents.push(ready_press);
    };
    NewClass.prototype.ready_player = function () {
        var user = firebase.auth().currentUser;
        firebase.database().ref("game" + 1 + "/player_ready_number").once('value', function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref("game" + 1 + "/player_ready_number").set({ number: 1 });
            }
            else if (snapshot.val().number == '1') {
                firebase.database().ref("game" + 1 + "/player_ready_number").set({ number: 2 });
            }
        });
        //get the current time
        var today = new Date();
        var time = today.getTime();
        this.old_time = time;
        console.log("old_time: " + this.old_time);
        //get every player to update the time
        var sessionsRef = firebase.database().ref("sessions");
        sessionsRef.set({
            startedAt: firebase.database.ServerValue.TIMESTAMP
        });
        var handle = this;
        firebase.database().ref("sessions").once('value', function (snapshot) {
            handle.servertime = snapshot.val().startedAt;
        });
        console.log("delay from p1 to server: " + (handle.servertime - this.old_time));
        var now = new Date();
        var now_time = now.getTime();
        console.log(now_time - this.old_time);
        this.delay = (now_time - this.old_time) / 1000;
        console.log("delay from server to p1: " + (now_time - handle.servertime));
    };
    NewClass.prototype.update = function (dt) {
        var user = firebase.auth().currentUser;
        var handle = this;
        var old = new Date();
        var time_old = old.getTime();
        if (this.condition == false) {
            //not all the players have been assigned to ready yet
            firebase.database().ref("game" + 1 + "/player_ready_number").once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().number == '2') {
                        handle.condition = true;
                        //read the data from firebase
                        var current_time = new Date();
                        var time = current_time.getTime();
                        //get teh delay
                        var delay = Math.abs((time - time_old) / 2000);
                        console.log("delay time: " + delay);
                        handle.scheduleOnce(function () {
                            // Here this refers to component
                            cc.director.loadScene("GameStage2");
                        }, 2 - delay);
                    }
                }
            });
        }
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxyZWFkeV90b19TMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUkxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQWtGQztRQTVFRyxlQUFTLEdBQUMsS0FBSyxDQUFDOztJQTRFcEIsQ0FBQztJQTFFRyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLHdCQUFLLEdBQUw7UUFDSSxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsa0JBQWtCO1FBQ2xCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvQixXQUFXLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztRQUN0QyxXQUFXLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsK0JBQVksR0FBWjtRQUNJLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdkMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFPLENBQUMseUJBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtZQUNwRixJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxJQUFJ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NkJBQTZCO3dCQUM3QixJQUFJLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUM5QixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2xDLGVBQWU7d0JBQ2YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzt3QkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUE7d0JBQ25DLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQ2hCLGdDQUFnQzs0QkFDaEMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3hDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7cUJBQ2pCO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFqRmdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FrRjVCO0lBQUQsZUFBQztDQWxGRCxBQWtGQyxDQWxGcUMsRUFBRSxDQUFDLFNBQVMsR0FrRmpEO2tCQWxGb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIG9sZF90aW1lO1xyXG4gICAgc2VydmVydGltZTtcclxuICAgIGRlbGF5O1xyXG4gICAgY29uZGl0aW9uPWZhbHNlO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICBsZXQgcmVhZHlfcHJlc3MgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIxXCIpXHJcbiAgICAgICAgcmVhZHlfcHJlc3MudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHJlYWR5X3ByZXNzLmNvbXBvbmVudCA9IFwicmVhZHlfdG9fUzFcIjtcclxuICAgICAgICByZWFkeV9wcmVzcy5oYW5kbGVyID0gXCJyZWFkeV9wbGF5ZXJcIjtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3JlYWR5XCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2gocmVhZHlfcHJlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWR5X3BsYXllcigpIHtcclxuICAgICAgICB2YXIgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlcjtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZSR7MX0vcGxheWVyX3JlYWR5X251bWJlcmApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZSR7MX0vcGxheWVyX3JlYWR5X251bWJlcmApLnNldCh7IG51bWJlcjogMSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzbmFwc2hvdC52YWwoKS5udW1iZXIgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZSR7MX0vcGxheWVyX3JlYWR5X251bWJlcmApLnNldCh7IG51bWJlcjogMiB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIC8vZ2V0IHRoZSBjdXJyZW50IHRpbWVcclxuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHZhciB0aW1lID0gdG9kYXkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMub2xkX3RpbWUgPSB0aW1lO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib2xkX3RpbWU6IFwiICsgdGhpcy5vbGRfdGltZSk7XHJcbiAgICAgICAgLy9nZXQgZXZlcnkgcGxheWVyIHRvIHVwZGF0ZSB0aGUgdGltZVxyXG4gICAgICAgIHZhciBzZXNzaW9uc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwic2Vzc2lvbnNcIik7XHJcbiAgICAgICAgc2Vzc2lvbnNSZWYuc2V0KHtcclxuICAgICAgICAgICAgc3RhcnRlZEF0OiBmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVBcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgaGFuZGxlID0gdGhpcztcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInNlc3Npb25zXCIpLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGhhbmRsZS5zZXJ2ZXJ0aW1lID0gc25hcHNob3QudmFsKCkuc3RhcnRlZEF0XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRlbGF5IGZyb20gcDEgdG8gc2VydmVyOiBcIiArIChoYW5kbGUuc2VydmVydGltZSAtIHRoaXMub2xkX3RpbWUpKTtcclxuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICB2YXIgbm93X3RpbWUgPSBub3cuZ2V0VGltZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5vd190aW1lIC0gdGhpcy5vbGRfdGltZSk7XHJcbiAgICAgICAgdGhpcy5kZWxheSA9IChub3dfdGltZSAtIHRoaXMub2xkX3RpbWUpIC8gMTAwMDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRlbGF5IGZyb20gc2VydmVyIHRvIHAxOiBcIiArIChub3dfdGltZSAtIGhhbmRsZS5zZXJ2ZXJ0aW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIHZhciB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB0aGlzO1xyXG4gICAgICAgIHZhciBvbGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGltZV9vbGQgPSBvbGQuZ2V0VGltZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmRpdGlvbiA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvL25vdCBhbGwgdGhlIHBsYXllcnMgaGF2ZSBiZWVuIGFzc2lnbmVkIHRvIHJlYWR5IHlldFxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZSR7MX0vcGxheWVyX3JlYWR5X251bWJlcmApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QudmFsKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKS5udW1iZXIgPT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZS5jb25kaXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlYWQgdGhlIGRhdGEgZnJvbSBmaXJlYmFzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudF90aW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWUgPSBjdXJyZW50X3RpbWUuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dldCB0ZWggZGVsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGF5ID0gTWF0aC5hYnMoKHRpbWUgLSB0aW1lX29sZCkgLyAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWxheSB0aW1lOiBcIiArIGRlbGF5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhlcmUgdGhpcyByZWZlcnMgdG8gY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2UyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyIC0gZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19