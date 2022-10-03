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
export default class Computer extends cc.Component {

    @property(cc.Node)
    readyWindow: cc.Node = null;

    private current_user_number: number = 0;

    onLoad() {

    }

    start() {

        let uid = firebase.auth().currentUser.uid;
        let current_user_number = 0;
        firebase.database().ref(`user_info/${uid}`).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                current_user_number = snapshot.val().player_number;
            }
        })
        this.scheduleOnce(()=>{
            this.current_user_number = current_user_number;
        },1.5);
    }
    onBeginContact(contact, self, other) {
        if(other.node.group == 'player'){
            let str = "player"+this.current_user_number.toString();
            if(other.node.name == str){
                console.log("open Computer");
                this.readyWindow.active = true;
                other.node.getComponent(Player).moveable = false;
                other.node.getComponent(Player).getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            }
        }
    }
    // onEndContact(contact, self, other){
    //     if(other.node.group == 'player'){
    //         console.log("close Computer");
    //         this.readyWindow.active = false;
    //     }
    // }
 // update (dt) {}
}