// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Player from "../Player";

const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class GameManagerS4 extends cc.Component {


    @property(cc.Node)
    loadingBG: cc.Node = null;

    player_node1: cc.Node = null;
    player_node2: cc.Node = null;
    player_node3: cc.Node = null;
    player_node4: cc.Node = null;
    player_node5: cc.Node = null;

    private physicManager: cc.PhysicsManager = null;

    onLoad () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
    }

    start () {

        this.loadingBG.active = true;
        // 一開始所有玩家都不能動
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1) this.player_node1.getComponent(Player).moveable = false;
        if (this.player_node2) this.player_node2.getComponent(Player).moveable = false;
        if (this.player_node3) this.player_node3.getComponent(Player).moveable = false;
        if (this.player_node4) this.player_node4.getComponent(Player).moveable = false;
        if (this.player_node5) this.player_node5.getComponent(Player).moveable = false;
        this.scheduleOnce(() => {
            this.loadingBG.active = false;
            if (this.player_node1) this.player_node1.getComponent(Player).moveable = true;
            if (this.player_node2) this.player_node2.getComponent(Player).moveable = true;
            if (this.player_node3) this.player_node3.getComponent(Player).moveable = true;
            if (this.player_node4) this.player_node4.getComponent(Player).moveable = true;
            if (this.player_node5) this.player_node5.getComponent(Player).moveable = true;
        }, 2.5);        
        this.Init_player();
    }

    // update (dt) {}

    
    Init_player(){
        let handle = this;
        // initialize players        
        for (let i = 1; i <= 5; i++) {
            firebase.database().ref(`player_data/player${i}`).once('value', function (snapshot) { // 如果玩家存在
                if (snapshot.val() != null) {
                    cc.find(`Canvas/PlayerContainer/player${i}`).active = true;
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirY`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/premoveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveable`).set({ moveable: "true" })
                    firebase.database().ref(`player_data/player${i}/state_value/X`).set({ x: -656 })
                    firebase.database().ref(`player_data/player${i}/state_value/Y`).set({ y: -16 })
                }
            })
        }
        // initial End
    }
}
