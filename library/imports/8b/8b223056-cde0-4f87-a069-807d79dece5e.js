"use strict";
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