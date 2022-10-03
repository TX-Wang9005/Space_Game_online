
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/switching_from_waiting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84ac8kBBlNKBbKvfHIaeqHc', 'switching_from_waiting');
// Script/switching_from_waiting.ts

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
        ready_press.component = "switching_from_waiting";
        ready_press.handler = "ready_player";
        cc.find("Canvas/ready").getComponent(cc.Button).clickEvents.push(ready_press);
        var go_press = new cc.Component.EventHandler();
        //console.log("1")
        go_press.target = this.node;
        go_press.component = "switching_from_waiting";
        go_press.handler = "go_player";
        cc.find("Canvas/go").getComponent(cc.Button).clickEvents.push(go_press);
        // Stage button for test
        var Stage1_btn = new cc.Component.EventHandler();
        Stage1_btn.target = this.node;
        Stage1_btn.component = "switching_from_waiting";
        Stage1_btn.handler = "go_Stage1";
        cc.find("Canvas/Stage1").getComponent(cc.Button).clickEvents.push(Stage1_btn);
        var Stage2_btn = new cc.Component.EventHandler();
        Stage2_btn.target = this.node;
        Stage2_btn.component = "switching_from_waiting";
        Stage2_btn.handler = "go_Stage2";
        cc.find("Canvas/Stage2").getComponent(cc.Button).clickEvents.push(Stage2_btn);
        var Stage3_btn = new cc.Component.EventHandler();
        Stage3_btn.target = this.node;
        Stage3_btn.component = "switching_from_waiting";
        Stage3_btn.handler = "go_Stage3";
        cc.find("Canvas/Stage3").getComponent(cc.Button).clickEvents.push(Stage3_btn);
        var Stage4_btn = new cc.Component.EventHandler();
        Stage4_btn.target = this.node;
        Stage4_btn.component = "switching_from_waiting";
        Stage4_btn.handler = "go_Stage4";
        cc.find("Canvas/Stage4").getComponent(cc.Button).clickEvents.push(Stage4_btn);
        var Stage5_btn = new cc.Component.EventHandler();
        Stage5_btn.target = this.node;
        Stage5_btn.component = "switching_from_waiting";
        Stage5_btn.handler = "go_Stage5";
        cc.find("Canvas/Stage5").getComponent(cc.Button).clickEvents.push(Stage5_btn);
    };
    NewClass.prototype.ready_player = function () {
        var user = firebase.auth().currentUser;
        firebase.database().ref('player/player_number').once('value', function (snapshot) {
        });
        firebase.database().ref('player/ready_number').once('value', function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref('player/ready_number').set({ number: 1 });
            }
            else if (snapshot.val().number == '1') {
                firebase.database().ref('player/ready_number').set({ number: 2 });
            }
        });
    };
    NewClass.prototype.go_player = function () {
        cc.director.loadScene("Lobby");
    };
    NewClass.prototype.go_Stage1 = function () {
        cc.director.loadScene("GameStage1");
    };
    NewClass.prototype.go_Stage2 = function () {
        cc.director.loadScene("GameStage2");
    };
    NewClass.prototype.go_Stage3 = function () {
        cc.director.loadScene("GameStage3");
    };
    NewClass.prototype.go_Stage4 = function () {
        cc.director.loadScene("GameStage4");
    };
    NewClass.prototype.go_Stage5 = function () {
        cc.director.loadScene("GameStage5");
    };
    NewClass.prototype.update = function (dt) {
        var handle = this;
        if (this.condition == false) {
            //not all the players have been assigned to ready yet
            firebase.database().ref('player/ready_number').once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().number == '2') {
                        cc.find("Canvas/go").active = true;
                        console.log(handle.condition);
                        handle.condition = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzd2l0Y2hpbmdfZnJvbV93YWl0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBd0dDO1FBbkdHLGVBQVMsR0FBRyxLQUFLLENBQUM7O0lBbUd0QixDQUFDO0lBbEdHLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYsd0JBQUssR0FBTDtRQUNJLElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxrQkFBa0I7UUFDbEIsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7UUFDakQsV0FBVyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDckMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9DLGtCQUFrQjtRQUNsQixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUIsUUFBUSxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztRQUM5QyxRQUFRLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUMvQixFQUFFLENB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QUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLEVBQUU7WUFDekIscURBQXFEO1lBQ3JELFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsUUFBUTtnQkFDM0UsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUN4QixJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO3dCQUM5QixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO3dCQUM3QixNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztxQkFDM0I7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQXZHZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXdHNUI7SUFBRCxlQUFDO0NBeEdELEFBd0dDLENBeEdxQyxFQUFFLENBQUMsU0FBUyxHQXdHakQ7a0JBeEdvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuZGVjbGFyZSBjb25zdCBmaXJlYmFzZTogYW55O1xyXG5cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgIFxyXG5cclxuXHJcbiAgICBjb25kaXRpb24gPSBmYWxzZTtcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGxldCByZWFkeV9wcmVzcyA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIjFcIilcclxuICAgICAgICByZWFkeV9wcmVzcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgcmVhZHlfcHJlc3MuY29tcG9uZW50ID0gXCJzd2l0Y2hpbmdfZnJvbV93YWl0aW5nXCI7XHJcbiAgICAgICAgcmVhZHlfcHJlc3MuaGFuZGxlciA9IFwicmVhZHlfcGxheWVyXCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9yZWFkeVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKHJlYWR5X3ByZXNzKTtcclxuICAgICAgICBsZXQgZ29fcHJlc3MgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIxXCIpXHJcbiAgICAgICAgZ29fcHJlc3MudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGdvX3ByZXNzLmNvbXBvbmVudCA9IFwic3dpdGNoaW5nX2Zyb21fd2FpdGluZ1wiO1xyXG4gICAgICAgIGdvX3ByZXNzLmhhbmRsZXIgPSBcImdvX3BsYXllclwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvZ29cIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChnb19wcmVzcyk7XHJcblxyXG4gICAgICAgIC8vIFN0YWdlIGJ1dHRvbiBmb3IgdGVzdFxyXG4gICAgICAgIGxldCBTdGFnZTFfYnRuID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBTdGFnZTFfYnRuLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBTdGFnZTFfYnRuLmNvbXBvbmVudCA9IFwic3dpdGNoaW5nX2Zyb21fd2FpdGluZ1wiO1xyXG4gICAgICAgIFN0YWdlMV9idG4uaGFuZGxlciA9IFwiZ29fU3RhZ2UxXCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9TdGFnZTFcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChTdGFnZTFfYnRuKTtcclxuICAgICAgICBsZXQgU3RhZ2UyX2J0biA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgU3RhZ2UyX2J0bi50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgU3RhZ2UyX2J0bi5jb21wb25lbnQgPSBcInN3aXRjaGluZ19mcm9tX3dhaXRpbmdcIjtcclxuICAgICAgICBTdGFnZTJfYnRuLmhhbmRsZXIgPSBcImdvX1N0YWdlMlwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvU3RhZ2UyXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goU3RhZ2UyX2J0bik7XHJcbiAgICAgICAgbGV0IFN0YWdlM19idG4gPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIFN0YWdlM19idG4udGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIFN0YWdlM19idG4uY29tcG9uZW50ID0gXCJzd2l0Y2hpbmdfZnJvbV93YWl0aW5nXCI7XHJcbiAgICAgICAgU3RhZ2UzX2J0bi5oYW5kbGVyID0gXCJnb19TdGFnZTNcIjtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1N0YWdlM1wiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKFN0YWdlM19idG4pO1xyXG4gICAgICAgIGxldCBTdGFnZTRfYnRuID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBTdGFnZTRfYnRuLnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICBTdGFnZTRfYnRuLmNvbXBvbmVudCA9IFwic3dpdGNoaW5nX2Zyb21fd2FpdGluZ1wiO1xyXG4gICAgICAgIFN0YWdlNF9idG4uaGFuZGxlciA9IFwiZ29fU3RhZ2U0XCI7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9TdGFnZTRcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChTdGFnZTRfYnRuKTtcclxuICAgICAgICBsZXQgU3RhZ2U1X2J0biA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgU3RhZ2U1X2J0bi50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgU3RhZ2U1X2J0bi5jb21wb25lbnQgPSBcInN3aXRjaGluZ19mcm9tX3dhaXRpbmdcIjtcclxuICAgICAgICBTdGFnZTVfYnRuLmhhbmRsZXIgPSBcImdvX1N0YWdlNVwiO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvU3RhZ2U1XCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goU3RhZ2U1X2J0bik7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVhZHlfcGxheWVyKCkge1xyXG4gICAgICAgIHZhciB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdwbGF5ZXIvcGxheWVyX251bWJlcicpLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3JlYWR5X251bWJlcicpLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3JlYWR5X251bWJlcicpLnNldCh7IG51bWJlcjogMSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzbmFwc2hvdC52YWwoKS5udW1iZXIgPT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigncGxheWVyL3JlYWR5X251bWJlcicpLnNldCh7IG51bWJlcjogMiB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdvX3BsYXllcigpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJMb2JieVwiKVxyXG4gICAgfVxyXG4gICAgZ29fU3RhZ2UxKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTdGFnZTFcIilcclxuICAgIH1cclxuICAgIGdvX1N0YWdlMigpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2UyXCIpXHJcbiAgICB9XHJcbiAgICBnb19TdGFnZTMoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiR2FtZVN0YWdlM1wiKVxyXG4gICAgfVxyXG4gICAgZ29fU3RhZ2U0KCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTdGFnZTRcIilcclxuICAgIH1cclxuICAgIGdvX1N0YWdlNSgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU3RhZ2U1XCIpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZGl0aW9uID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8vbm90IGFsbCB0aGUgcGxheWVycyBoYXZlIGJlZW4gYXNzaWduZWQgdG8gcmVhZHkgeWV0XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdwbGF5ZXIvcmVhZHlfbnVtYmVyJykub25jZSgndmFsdWUnLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBzaG90LnZhbCgpLm51bWJlciA9PSAnMicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9nb1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhoYW5kbGUuY29uZGl0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUuY29uZGl0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==