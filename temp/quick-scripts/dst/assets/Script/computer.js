
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/computer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3555OfbRVJfqVVS2aWjc+P', 'computer');
// Script/computer.ts

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
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Computer = /** @class */ (function (_super) {
    __extends(Computer, _super);
    function Computer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.readyWindow = null;
        _this.current_user_number = 0;
        return _this;
        // onEndContact(contact, self, other){
        //     if(other.node.group == 'player'){
        //         console.log("close Computer");
        //         this.readyWindow.active = false;
        //     }
        // }
        // update (dt) {}
    }
    Computer.prototype.onLoad = function () {
    };
    Computer.prototype.start = function () {
        var _this = this;
        var uid = firebase.auth().currentUser.uid;
        var current_user_number = 0;
        firebase.database().ref("user_info/" + uid).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                current_user_number = snapshot.val().player_number;
            }
        });
        this.scheduleOnce(function () {
            _this.current_user_number = current_user_number;
        }, 1.5);
    };
    Computer.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.group == 'player') {
            var str = "player" + this.current_user_number.toString();
            if (other.node.name == str) {
                console.log("open Computer");
                this.readyWindow.active = true;
                other.node.getComponent(Player_1.default).moveable = false;
                other.node.getComponent(Player_1.default).getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], Computer.prototype, "readyWindow", void 0);
    Computer = __decorate([
        ccclass
    ], Computer);
    return Computer;
}(cc.Component));
exports.default = Computer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21wdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjtBQUNsRixtQ0FBOEI7QUFDeEIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUEwQ0M7UUF2Q0csaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFcEIseUJBQW1CLEdBQVcsQ0FBQyxDQUFDOztRQThCeEMsc0NBQXNDO1FBQ3RDLHdDQUF3QztRQUN4Qyx5Q0FBeUM7UUFDekMsMkNBQTJDO1FBQzNDLFFBQVE7UUFDUixJQUFJO1FBQ1AsaUJBQWlCO0lBQ2xCLENBQUM7SUFuQ0cseUJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBQUEsaUJBWUM7UUFWRyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUMxQyxJQUFJLG1CQUFtQixHQUFHLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWEsR0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLFFBQVE7WUFDeEUsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUN4QixtQkFBbUIsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO2FBQ3REO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBQ25ELENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxpQ0FBYyxHQUFkLFVBQWUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLO1FBQy9CLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFDO1lBQzVCLElBQUksR0FBRyxHQUFHLFFBQVEsR0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkQsSUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ2pELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzthQUMxRjtTQUNKO0lBQ0wsQ0FBQztJQS9CRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNVO0lBSFgsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTBDNUI7SUFBRCxlQUFDO0NBMUNELEFBMENDLENBMUNxQyxFQUFFLENBQUMsU0FBUyxHQTBDakQ7a0JBMUNvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5kZWNsYXJlIGNvbnN0IGZpcmViYXNlOiBhbnk7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wdXRlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICByZWFkeVdpbmRvdzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50X3VzZXJfbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgICAgIGxldCB1aWQgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkO1xyXG4gICAgICAgIGxldCBjdXJyZW50X3VzZXJfbnVtYmVyID0gMDtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdXNlcl9pbmZvLyR7dWlkfWApLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24gKHNuYXBzaG90KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwc2hvdC52YWwoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfbnVtYmVyID0gc25hcHNob3QudmFsKCkucGxheWVyX251bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50X3VzZXJfbnVtYmVyID0gY3VycmVudF91c2VyX251bWJlcjtcclxuICAgICAgICB9LDEuNSk7XHJcbiAgICB9XHJcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcikge1xyXG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ3BsYXllcicpe1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCJwbGF5ZXJcIit0aGlzLmN1cnJlbnRfdXNlcl9udW1iZXIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYob3RoZXIubm9kZS5uYW1lID09IHN0cil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW4gQ29tcHV0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWR5V2luZG93LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBvdGhlci5ub2RlLmdldENvbXBvbmVudChQbGF5ZXIpLm1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBvdGhlci5ub2RlLmdldENvbXBvbmVudChQbGF5ZXIpLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIG9uRW5kQ29udGFjdChjb250YWN0LCBzZWxmLCBvdGhlcil7XHJcbiAgICAvLyAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAncGxheWVyJyl7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvc2UgQ29tcHV0ZXJcIik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucmVhZHlXaW5kb3cuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gLy8gdXBkYXRlIChkdCkge31cclxufSJdfQ==