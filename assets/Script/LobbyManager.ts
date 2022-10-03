// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Player from "./Player";

const { ccclass, property } = cc._decorator;
declare const firebase: any;

@ccclass
export default class LobbyManager extends cc.Component {

    @property(cc.Node)
    LoadingBG: cc.Node = null;
    @property(cc.Node)
    startingBG: cc.Node = null;
    @property(cc.Node)
    JoinGameText: cc.Node = null;
    @property(cc.Node)
    ReadyLabel: cc.Node = null;
    @property(cc.Node)
    ReadyCountLabel: cc.Node = null;
    @property(cc.Node)
    readyWindow: cc.Node = null;
    @property(cc.AudioClip)
    click: cc.AudioClip = null;

    private physicManager: cc.PhysicsManager = null;
    initialization = false;
    counting = 0;

    private current_user_number: number = 0;
    private Max_player_ready_number: number = 5; // 玩家應該要多少人準備才會開始。

    onLoad() {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
    }

    start() {
        this.LoadingBG.active = true;

        let uid = firebase.auth().currentUser.uid;
        let current_user_number = 0;
        firebase.database().ref(`user_info/${uid}`).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                current_user_number = snapshot.val().player_number;
            }
        })
        this.scheduleOnce(() => {
            // console.log("now is:", current_user_number);
            this.current_user_number = current_user_number;
            if (current_user_number != 0) {
                firebase.database().ref(`player/player${current_user_number}_isReady`).set(false);
                firebase.database().ref(`player/player${current_user_number}_islogin`).set(true);
            }
            switch (current_user_number) {
                case 1:
                    firebase.database().ref('player/player1_islogin').onDisconnect().set(false);
                    break;
                case 2:
                    firebase.database().ref('player/player2_islogin').onDisconnect().set(false);
                    break;
                case 3:
                    firebase.database().ref('player/player3_islogin').onDisconnect().set(false);
                    break;
                case 4:
                    firebase.database().ref('player/player4_islogin').onDisconnect().set(false);
                    break;
                case 5:
                    firebase.database().ref('player/player5_islogin').onDisconnect().set(false);
                    break;
            }
            this.schedule(this.UpdateUser, 1); 
            this.schedule(this.UpdateMaxReady, 1);
        }, 1);

        this.scheduleOnce(() => {
            this.LoadingBG.active = false;
            this.Text1Action();
            this.schedule(this.CheckReadyState, 0.2);
        }, 3);

        // buttons
        let ready_btn = new cc.Component.EventHandler();
        ready_btn.target = this.node;
        ready_btn.component = "LobbyManager";
        ready_btn.handler = "readyEvent";
        cc.find("Canvas/Main Camera/readyWindow/ready").getComponent(cc.Button).clickEvents.push(ready_btn);
        let close_btn = new cc.Component.EventHandler();
        close_btn.target = this.node;
        close_btn.component = "LobbyManager";
        close_btn.handler = "closeEvent";
        cc.find("Canvas/Main Camera/readyWindow/close").getComponent(cc.Button).clickEvents.push(close_btn);

    }

    update(dt) {

    }
    UpdateUser() {
        let handle = this;
        if (this.counting < 5) {
            for (let i = 1; i <= 5; i++) {
                if (cc.find(`Canvas/PlayerContainer/player${i}`).active == true) {
                    continue;
                }
                else {
                    firebase.database().ref(`player/player${i}_islogin`).once('value', function (snapshot) {
                        if (snapshot.val() == true) {
                            console.log("Welcome! Player", i);
                            handle.counting += 1;
                            cc.find(`Canvas/PlayerContainer/player${i}`).active = true;
                            firebase.database().ref(`player_data/player${i}/state_value/moveDirX`).set({ Dir: 0 })
                            firebase.database().ref(`player_data/player${i}/state_value/moveDirY`).set({ Dir: 0 })
                            firebase.database().ref(`player_data/player${i}/state_value/premoveDirX`).set({ Dir: 0 })
                            firebase.database().ref(`player_data/player${i}/state_value/moveable`).set({ moveable: "true" })
                            firebase.database().ref(`player_data/player${i}/state_value/X`).set({ x: 16 })
                            firebase.database().ref(`player_data/player${i}/state_value/Y`).set({ y: -48 })
                        }
                    });
                }
            }
        }
    }
    Text1Action() {
        let action: cc.Action;
        let sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.JoinGameText.runAction(action);
    }
    readyEvent() {
        let t = this;
        cc.audioEngine.playEffect(this.click, false);
        // console.log("Player", this.current_user_number, "is ready");
        firebase.database().ref(`player/player${t.current_user_number}_isReady`).set(true);
        this.ReadyLabel.runAction(cc.fadeTo(0.1, 255));
    }
    closeEvent() {
        let t = this;
        cc.audioEngine.playEffect(this.click, false);
        // console.log("Player", this.current_user_number, "is Not ready");
        firebase.database().ref(`player/player${t.current_user_number}_isReady`).set(false);
        console.log("close Computer");
        this.readyWindow.active = false;
        cc.find(`Canvas/PlayerContainer/player${this.current_user_number}`).getComponent(Player).moveable = true;
        this.ReadyLabel.runAction(cc.fadeTo(0.1, 100));
    }
    CheckReadyState() { // 定期檢查每位玩家是否ready，都準備好就開始。
        let ready_count = 0;
        for (let i = 1; i <= 5; i++) {
            firebase.database().ref(`player/player${i}_isReady`).once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    firebase.database().ref(`player/player${i}_islogin`).once('value', function (snapshot) {
                        if (snapshot.val() == true) {
                            // console.log("Check",i, "isReady");
                            ready_count++;
                        }
                    });
                }
            });
        }
        this.scheduleOnce(() => {
            let str = "(";
            str += ready_count.toString();
            str += "/";
            str += this.Max_player_ready_number.toString();
            str += ")";
            this.ReadyCountLabel.getComponent(cc.Label).string = str;

            if (ready_count == this.Max_player_ready_number) {
                this.scheduleOnce(() => {
                    if(ready_count != 1)
                        this.startingBG.active = true;
                }, 1);
                this.scheduleOnce(() => {
                    if(ready_count != 1)
                        cc.director.loadScene("GameStage1");
                        // cc.director.loadScene("GameEnd");
                }, 2);
            }
        }, 1);
    }
    UpdateMaxReady(){
        let login_count = 0;
        for(let i=1;i<=5;i++){
            firebase.database().ref(`player/player${i}_islogin`).once('value', function (snapshot) {
                if (snapshot.val() == true) {
                    // console.log("Check",i, "isReady");
                    login_count++;
                }
            });
        }
        this.scheduleOnce(()=>{
            if(login_count == 0){
                this.Max_player_ready_number = 5;
            }else{
                this.Max_player_ready_number = login_count;
            }
        },0.5);
    }
}
