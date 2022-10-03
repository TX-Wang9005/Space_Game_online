// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class GameManagerS3 extends cc.Component {

    private physicManager: cc.PhysicsManager = null;

    onLoad () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);

        // 每個player node初始化位置。
        var user = firebase.auth().currentUser.uid;
        var permited_user;
        firebase.database().ref(`player_data`).once('value', function (snapshot) {
            snapshot.forEach(function (player){
                let name = player.key;
                if(name == "player1" || name == "player2" || name == "player3" || name == "player4" || name == "player5"){
                    console.log("Initial player:", name);
                    firebase.database().ref(`player_data/${name}/state_value/moveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/${name}/state_value/moveDirY`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/${name}/state_value/premoveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/${name}/state_value/moveable`).set({ moveable: "true" })
                    firebase.database().ref(`player_data/${name}/state_value/X`).set({ x: 16 })
                    firebase.database().ref(`player_data/${name}/state_value/Y`).set({ y: -48 })
                }
            })
        })
        // 

    }

    start () {

    }

    // update (dt) {}
}
