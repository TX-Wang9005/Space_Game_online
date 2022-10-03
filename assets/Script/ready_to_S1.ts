// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class NewClass extends cc.Component {


    old_time;
    servertime;
    delay;
    condition=false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let ready_press = new cc.Component.EventHandler();
        //console.log("1")
        ready_press.target = this.node;
        ready_press.component = "ready_to_S1";
        ready_press.handler = "ready_player";
        cc.find("Canvas/ready").getComponent(cc.Button).clickEvents.push(ready_press);
    }

    ready_player() {
        var user = firebase.auth().currentUser;
        firebase.database().ref(`game${1}/player_ready_number`).once('value', function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref(`game${1}/player_ready_number`).set({ number: 1 });
            }
            else if (snapshot.val().number == '1') {
                firebase.database().ref(`game${1}/player_ready_number`).set({ number: 2 });

            }
        })
       

        //get the current time
        var today = new Date();
        var time = today.getTime();
        this.old_time = time;
        console.log("old_time: " + this.old_time);
        //get every player to update the time
        var sessionsRef = firebase.database().ref("sessions");
        sessionsRef.set({
            startedAt: firebase.database.ServerValue.TIMESTAMP
        });
        var handle = this;
        firebase.database().ref("sessions").once('value', function (snapshot) {
            handle.servertime = snapshot.val().startedAt
        })
        console.log("delay from p1 to server: " + (handle.servertime - this.old_time));
        var now = new Date();
        var now_time = now.getTime();
        console.log(now_time - this.old_time);
        this.delay = (now_time - this.old_time) / 1000;
        console.log("delay from server to p1: " + (now_time - handle.servertime));
    }

    update (dt) {
        var user = firebase.auth().currentUser;
        let handle = this;
        var old = new Date();
                        var time_old = old.getTime();
        if (this.condition == false) {
            //not all the players have been assigned to ready yet
            firebase.database().ref(`game${1}/player_ready_number`).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().number == '2') {
                        handle.condition = true;
                        //read the data from firebase
                        var current_time = new Date();
                        var time = current_time.getTime();
                        //get teh delay
                        var delay = Math.abs((time - time_old) / 2000);
                        console.log("delay time: " + delay)
                        handle.scheduleOnce(function () {
                            // Here this refers to component
                            cc.director.loadScene("GameStage2");
                        }, 2 - delay);
                    }
                }
            })
        }
    }
}
