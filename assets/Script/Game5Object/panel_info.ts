// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import GameManagerS5 from "../GameManager/GameManagerS5";
declare const firebase: any;
@ccclass
export default class panel_info extends cc.Component {

    paper_left;
    scissor_left;
    stone_left
    money_left;
    current_user;

    private flag = false;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let handle = this;
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5).current_user_node;
        handle.paper_left = 2;
        handle.scissor_left = 2;
        handle.stone_left = 2;
        handle.money_left = 5;
        cc.find("Canvas/UI/TopPanel/paper/number").getComponent(cc.Label).string = String(handle.paper_left);
        cc.find("Canvas/UI/TopPanel/scissor/number").getComponent(cc.Label).string = String(handle.scissor_left);
        cc.find("Canvas/UI/TopPanel/stone/number").getComponent(cc.Label).string = String(handle.stone_left);
        cc.find("Canvas/UI/TopPanel/life/number").getComponent(cc.Label).string = String(handle.money_left);
    }
    update_info(type: string, new_number: number) {
        let handle = this;
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5).current_user_node;
        if (type == "paper") {
            firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ paper: new_number });
            cc.find("Canvas/UI/TopPanel/paper/number").getComponent(cc.Label).string = String(new_number);
            handle.paper_left = new_number;
        }
        else if (type == "scissor") {
            firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ scissor: new_number });
            cc.find("Canvas/UI/TopPanel/scissor/number").getComponent(cc.Label).string = String(new_number);
            this.scissor_left = new_number;
        }
        else if (type == "stone") {
            firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ stone: new_number });
            cc.find("Canvas/UI/TopPanel/stone/number").getComponent(cc.Label).string = String(new_number);
            handle.stone_left = new_number;
        }
        else if (type == "money") {
            firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ money: new_number });
            cc.find("Canvas/UI/TopPanel/life/number").getComponent(cc.Label).string = String(new_number);
            handle.money_left = new_number;
        }
    }

    update(dt) {
        if (this.flag == false) {
            let handle = this;
            this.current_user = cc.find("GameManager").getComponent(GameManagerS5).current_user_node;
            if (this.current_user != null) {
                this.flag = true
                firebase.database().ref(`player_data/${this.current_user}/game2_state`).once('value', function (snapshot) {
                    cc.find("Canvas/UI/TopPanel/life/number").getComponent(cc.Label).string = String(snapshot.val().money);
                    handle.money_left = snapshot.val().money;
                })
            }
        }
    }
}
