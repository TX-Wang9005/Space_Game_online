// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import GameManagerS5 from "../GameManager/GameManagerS5";
import fight_forum from "./fight_forum";
declare const firebase: any;
@ccclass
export default class fight_pressed extends cc.Component {

    parent_name;
    @property(cc.AudioClip)
    click: cc.AudioClip = null;
    @property(cc.Node)
    fight_forum: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.parent_name = this.node.parent.name;
        let fight_this = new cc.Component.EventHandler();
        fight_this.target = this.node;
        fight_this.component = "fight_pressed";
        fight_this.handler = "fight_forum_open";
        cc.find(`Canvas/PlayerContainer/${this.parent_name}/fight`).getComponent(cc.Button).clickEvents.push(fight_this);
        let rude_this = new cc.Component.EventHandler();
        rude_this.target = this.node;
        rude_this.component = "fight_pressed";
        rude_this.handler = "rude_forum_open";
        cc.find(`Canvas/PlayerContainer/${this.parent_name}/unreasonable`).getComponent(cc.Button).clickEvents.push(rude_this);


    }

    fight_forum_open() {
        cc.audioEngine.playEffect(this.click, false);
        let handle = this;
        //upload to firebase
        let currentUser = cc.find("GameManager").getComponent(GameManagerS5).current_user_node;
        firebase.database().ref(`player_data/${this.parent_name}/game2_state`).once('value', function (snapshot) {
            if (snapshot.val().opponent == "null") {
                firebase.database().ref(`player_data/${handle.parent_name}/game2_state`).update({ opponent: currentUser, challenged: "true" });
                handle.fight_forum.getComponent(fight_forum).being_rude = false;
            }
        })
    }
    rude_forum_open() {
        cc.audioEngine.playEffect(this.click, false);
        let handle = this;
        //upload to firebase
        let currentUser = cc.find("GameManager").getComponent(GameManagerS5).current_user_node;
        firebase.database().ref(`player_data/${this.parent_name}/game2_state`).once('value', function (snapshot) {
            if (snapshot.val().opponent == "null") {
                firebase.database().ref(`player_data/${handle.parent_name}/game2_state`).update({ opponent: currentUser, challenged: "absolute" });
            }
        })
    }

    // update (dt) {}
}
