// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import battle_field from "./battle_field";
import GameManagerS5 from "../GameManager/GameManagerS5";
declare const firebase: any;
@ccclass
export default class fight_forum extends cc.Component {
    @property(cc.Node)
    opponent_info_choice: cc.Node = null;
    @property(cc.Node)
    Mine_info_choice: cc.Node = null;
    @property(cc.Node)
    battle_field: cc.Node = null;
    @property(cc.AudioClip)
    click: cc.AudioClip = null;

    current_user;
    opponent;

    fight = false;
    being_rude = false;
    updated = true;




    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        //this.current_user = cc.find("GameManager").getComponent(GameManagerS2).current_user_node;
        let fight_forum_accept = new cc.Component.EventHandler();
        fight_forum_accept.target = this.node;
        fight_forum_accept.component = "fight_forum";
        fight_forum_accept.handler = "accept";
        cc.find(`Canvas/UI/fight_forum/accept`).getComponent(cc.Button).clickEvents.push(fight_forum_accept);
        let fight_forum_reject = new cc.Component.EventHandler();
        fight_forum_reject.target = this.node;
        fight_forum_reject.component = "fight_forum";
        fight_forum_reject.handler = "reject";
        cc.find(`Canvas/UI/fight_forum/reject`).getComponent(cc.Button).clickEvents.push(fight_forum_reject);
    }
    accept() {
        cc.audioEngine.playEffect(this.click, false)
        let handle = this;
        this.fight = true;
        console.log("accept challenge");
        firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ fighting: "true" });
        firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ challenged: "false" });
        firebase.database().ref(`player_data/${this.current_user}/game2_state`).once('value', function (snapshot) {
            handle.opponent = snapshot.val().opponent;
            //console.log("you: " + handle.current_user + "  opponent: " + handle.opponent)
            firebase.database().ref(`player_data/${handle.opponent}/game2_state`).update({ opponent: handle.current_user, fighting: "true" });
            let game_manager = cc.find('GameManager').getComponent(GameManagerS5);
            handle.Mine_info_choice.active = true;
            handle.opponent_info_choice.active = true;
            handle.battle_field.active = true;
            handle.battle_field.getComponent(battle_field).opponent = handle.opponent;
            game_manager.opponent_user_node = handle.opponent;
            game_manager.fighting = true;
            console.log("game manager fighting: " + game_manager.fighting)
            if (handle.being_rude) {
                cc.find(`Canvas/UI/fight_forum/reject`).active = true;
                handle.being_rude = false;
            }
            cc.find(`Canvas/UI/fight_forum`).active = false;
        })
        //open up the battle field and both info_choice


    }
    reject() {
        cc.audioEngine.playEffect(this.click, false)
        firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ opponent: "null" });
        cc.find(`Canvas/UI/fight_forum`).active = false;
    }

    update(dt) {




    }

}
