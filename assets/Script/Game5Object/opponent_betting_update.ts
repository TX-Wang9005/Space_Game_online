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
export default class NewClass extends cc.Component {

    current_user;
    opponent;
    @property(cc.Node)
    opponent_bet: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5).current_user_node;
        this.opponent = cc.find("GameManager").getComponent(GameManagerS5).opponent_user_node;

    }

    update(dt) {
        let handle = this;
        firebase.database().ref(`player_data/${this.opponent}/game2_state/bet`).once('value', function (snapshot) {
            if (snapshot.val() == null) {
                handle.opponent_bet.getComponent(cc.RichText).string = "1";
            } else {
                handle.opponent_bet.getComponent(cc.RichText).string = snapshot.val().bet;
            }

        })
    }
}
