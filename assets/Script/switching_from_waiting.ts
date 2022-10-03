// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
declare const firebase: any;


@ccclass
export default class NewClass extends cc.Component {

   


    condition = false;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let ready_press = new cc.Component.EventHandler();
        //console.log("1")
        ready_press.target = this.node;
        ready_press.component = "switching_from_waiting";
        ready_press.handler = "ready_player";
        cc.find("Canvas/ready").getComponent(cc.Button).clickEvents.push(ready_press);
        let go_press = new cc.Component.EventHandler();
        //console.log("1")
        go_press.target = this.node;
        go_press.component = "switching_from_waiting";
        go_press.handler = "go_player";
        cc.find("Canvas/go").getComponent(cc.Button).clickEvents.push(go_press);

        // Stage button for test
        let Stage1_btn = new cc.Component.EventHandler();
        Stage1_btn.target = this.node;
        Stage1_btn.component = "switching_from_waiting";
        Stage1_btn.handler = "go_Stage1";
        cc.find("Canvas/Stage1").getComponent(cc.Button).clickEvents.push(Stage1_btn);
        let Stage2_btn = new cc.Component.EventHandler();
        Stage2_btn.target = this.node;
        Stage2_btn.component = "switching_from_waiting";
        Stage2_btn.handler = "go_Stage2";
        cc.find("Canvas/Stage2").getComponent(cc.Button).clickEvents.push(Stage2_btn);
        let Stage3_btn = new cc.Component.EventHandler();
        Stage3_btn.target = this.node;
        Stage3_btn.component = "switching_from_waiting";
        Stage3_btn.handler = "go_Stage3";
        cc.find("Canvas/Stage3").getComponent(cc.Button).clickEvents.push(Stage3_btn);
        let Stage4_btn = new cc.Component.EventHandler();
        Stage4_btn.target = this.node;
        Stage4_btn.component = "switching_from_waiting";
        Stage4_btn.handler = "go_Stage4";
        cc.find("Canvas/Stage4").getComponent(cc.Button).clickEvents.push(Stage4_btn);
        let Stage5_btn = new cc.Component.EventHandler();
        Stage5_btn.target = this.node;
        Stage5_btn.component = "switching_from_waiting";
        Stage5_btn.handler = "go_Stage5";
        cc.find("Canvas/Stage5").getComponent(cc.Button).clickEvents.push(Stage5_btn);



    }

    ready_player() {
        var user = firebase.auth().currentUser;
        firebase.database().ref('player/player_number').once('value', function (snapshot) {
        })
        firebase.database().ref('player/ready_number').once('value', function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref('player/ready_number').set({ number: 1 });
            }
            else if (snapshot.val().number == '1') {
                firebase.database().ref('player/ready_number').set({ number: 2 });

            }
        })
    }

    go_player() {
        cc.director.loadScene("Lobby")
    }
    go_Stage1() {
        cc.director.loadScene("GameStage1")
    }
    go_Stage2() {
        cc.director.loadScene("GameStage2")
    }
    go_Stage3() {
        cc.director.loadScene("GameStage3")
    }
    go_Stage4() {
        cc.director.loadScene("GameStage4")
    }
    go_Stage5() {
        cc.director.loadScene("GameStage5")
    }

    update(dt) {
        let handle = this;
        if (this.condition == false) {
            //not all the players have been assigned to ready yet
            firebase.database().ref('player/ready_number').once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().number == '2') {
                        cc.find("Canvas/go").active = true;
                        console.log(handle.condition)
                        handle.condition = true;
                    }
                }
            })
        }
    }
}
