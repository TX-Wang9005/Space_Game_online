// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Player from "../Player";

const { ccclass, property } = cc._decorator;
declare const firebase: any;

@ccclass
export default class GameEndManager extends cc.Component {

    @property(cc.Node)
    loadingBG: cc.Node = null;

    @property(cc.AudioClip)
    BGM: cc.AudioClip = null;

    @property(cc.Node)
    Text1: cc.Node = null;
    @property(cc.Node)
    Text2: cc.Node = null;
    @property(cc.Node)
    WinnerLabel: cc.Node = null;

    private current_user_number: number = 0;

    private physicManager: cc.PhysicsManager = null;

    private Round1_winner: number = 0;
    private Round2_winner: number = 0;
    private Round3_winner: number = 0;
    private Round4_winner: number = 0;
    

    onLoad() {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);

        var user = firebase.auth().currentUser.uid;
        let player_node_number = 0;
        firebase.database().ref(`user_info/${user}`).once('value', function (snapshot) {
            player_node_number = snapshot.val().player_number;
        }
        );
        this.scheduleOnce(() => {
            this.current_user_number = player_node_number;
        }, 2.5);

    }

    start() {
        this.loadingBG.active = true;
        let player1 = cc.find("Canvas/PlayerContainer/player1");
        let player2 = cc.find("Canvas/PlayerContainer/player2");
        let player3 = cc.find("Canvas/PlayerContainer/player3");
        let player4 = cc.find("Canvas/PlayerContainer/player4");
        let player5 = cc.find("Canvas/PlayerContainer/player5");
        if (player1) player1.getComponent(Player).moveable = false;
        if (player2) player5.getComponent(Player).moveable = false;
        if (player3) player5.getComponent(Player).moveable = false;
        if (player4) player5.getComponent(Player).moveable = false;
        if (player5) player5.getComponent(Player).moveable = false;

        this.Init_player();
        this.FindRoundWinner();
        this.scheduleOnce(() => {
            this.loadingBG.active = false;
            if (player1) player1.getComponent(Player).moveable = true;
            if (player2) player5.getComponent(Player).moveable = true;
            if (player3) player5.getComponent(Player).moveable = true;
            if (player4) player5.getComponent(Player).moveable = true;
            if (player5) player5.getComponent(Player).moveable = true;
            // 開始計時
            cc.audioEngine.playMusic(this.BGM, true);
            cc.audioEngine.setMusicVolume(0.2);
            this.Text1Action();
            this.Text2Action();
        }, 2.5);


    }

    update(dt) {

    }
    Text1Action() {
        let action: cc.Action;
        let sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.Text1.runAction(action);
    }
    Text2Action() {
        let action: cc.Action;
        let sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.Text2.runAction(action);
    }
    Init_player() {
        let handle = this;
        // initialize players
        for (let i = 1; i <= 5; i++) {
            firebase.database().ref(`player/player${i}_islogin`).once('value', function (snapshot) { // 如果玩家登入
                if (snapshot.val() == true) {
                    cc.find(`Canvas/PlayerContainer/player${i}`).active = true;
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirY`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/premoveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveable`).set({ moveable: "true" })
                    firebase.database().ref(`player_data/player${i}/state_value/X`).set({ x: -736 })
                    firebase.database().ref(`player_data/player${i}/state_value/Y`).set({ y: -176 })
                }
            })
        }
        // initial End
    }
    FindRoundWinner(){
        let t = this;
        for (let i = 1; i <= 5; i++) {
            firebase.database().ref(`GameResult/Round1/player${i}`).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if(snapshot.val() == 80){
                        t.Round1_winner = i;
                    }
                }
            })
        }
        for (let i = 1; i <= 5; i++) {
            firebase.database().ref(`GameResult/Round2/player${i}`).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if(snapshot.val() == 0){
                        t.Round2_winner = i;
                    }
                }
            })
        }
        for (let i = 1; i <= 5; i++) {
            firebase.database().ref(`GameResult/Round3/player${i}`).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if(snapshot.val() == 80){
                        t.Round3_winner = i;
                    }
                }
            })
        }
        // GameStage4
        let coin = [0,0,0,0,0]
        for(let i=1;i<=5;i++){            
            firebase.database().ref(`player_data/player${i}/game2_state/money`).once('value', function (snapshot){
                if(snapshot.val()!=null){
                    coin[i-1] = snapshot.val();
                }
            });
        }
        this.scheduleOnce(()=>{
            let cnt = 0;
            for(let i=0;i<=4;i++){
                cnt = 0;
                for(let j=0;j<=4;j++){
                    if(coin[i]>=coin[j]) cnt++;
                }
                if(cnt == 5){
                    t.Round4_winner = i+1;
                }
            }
            // print winner.
            console.log("Winner", t.Round1_winner, t.Round2_winner, t.Round3_winner, t.Round4_winner)
            let p;
            p = cc.find(`Canvas/ObjContainer/Round1/Champ/P${t.Round1_winner}`)
            if(p) p.active = true;
            p = cc.find(`Canvas/ObjContainer/Round2/Champ/P${t.Round2_winner}`)
            if(p) p.active = true;
            p = cc.find(`Canvas/ObjContainer/Round3/Champ/P${t.Round3_winner}`)
            if(p) p.active = true;
            p = cc.find(`Canvas/ObjContainer/Round4/Champ/P${t.Round4_winner}`)
            if(p) p.active = true;
            firebase.database().ref(`user_list`).once('value', function (snapshot){
                snapshot.forEach(function (s){
                    if(s.val().player_number == t.Round4_winner){
                        t.WinnerLabel.getComponent(cc.Label).string = s.val().email;
                    }
                });
            });
        }, 1.5);
    }
}
