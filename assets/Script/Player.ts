// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import CameraManager from "./CameraManager";

const { ccclass, property } = cc._decorator;
declare const firebase: any;

@ccclass
export default class Player extends cc.Component {


    @property()
    playerSpeed: number = 0;

    private child_node: cc.Node = null;
    private child_label: cc.Node = null;

    private this_node_user;
    //change 
    private current_user;

    private rigidbody: cc.RigidBody = null;
    private anim: cc.Animation = null;
    private child_anim: cc.Animation = null;
    //
    private permited_user;

    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private upDown: boolean = false;
    private downDown: boolean = false;
    private premoveDirX = 0;
    private moveDirX = 0;
    private moveDirY = 0;
    private premoveDirX_firebase = 0;
    private moveDirX_firebase = 0;
    private moveDirY_firebase = 0;
    private logged_in_or_not = false;
    moveable: boolean = true;
    moveableKey: boolean = true;



    onLoad() {
        let handle = this;

        // 每個player node都會對應一個user
        let name = this.node.name;
        var user = firebase.auth().currentUser.uid;
        this.current_user = user;

        firebase.database().ref(`player_data/${name}`).once('value', function (snapshot) {
            handle.permited_user = snapshot.val().uid;
            if (snapshot.val() != null) {
                // console.log('fuck im innnnnnnnnnnnnnnnnnn')
                handle.node.active = true;
                handle.logged_in_or_not = true;
            }
            if (user == handle.permited_user) {
                firebase.database().ref(`player_data/${name}/state_value/moveDirX`).set({ Dir: 0 })
                firebase.database().ref(`player_data/${name}/state_value/moveDirY`).set({ Dir: 0 })
                firebase.database().ref(`player_data/${name}/state_value/moveable`).set({ moveable: "true" })
                firebase.database().ref(`player_data/${name}/state_value/moveableKey`).set({ moveableKey: "true" })
                firebase.database().ref(`player_data/${name}/state_value/premoveDirX`).set({ Dir: 0 })
                firebase.database().ref(`player_data/${name}/state_value/X`).set({ x: 0 })
                firebase.database().ref(`player_data/${name}/state_value/Y`).set({ y: 0 })
                // firebase.database().ref(`player_data/${name}/state_value/IsLogin`).set({ bool: true })
            }
        })
        this.scheduleOnce(() => {
            this.this_node_user = handle.permited_user;
            console.log("nodeuser:", this.node.name, this.this_node_user);
            console.log("currentuser:", this.current_user);
            if (this.current_user == this.this_node_user) cc.find("Canvas/Main Camera").getComponent(CameraManager).FollowTarget = this.node;
        }, 0.5);
    }

    get_current_user_uid() {
        return this.permited_user;
    }

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rigidbody = this.node.getComponent(cc.RigidBody);


        this.child_node = this.node.getChildByName(this.node.name);
        this.child_label = this.node.getChildByName('Label');
        this.child_anim = this.child_node.getComponent(cc.Animation);
        this.child_anim.play('Idle');
        this.schedule(this.updateOthersCurrentPos, 1);
    }

    update(dt) {
        //if the player is logged now we active the node 
        if (!this.logged_in_or_not) {
            let handle = this;
            firebase.database().ref(`player_data/${this.node.name}`).once('value', function (snaphot) {
                if (snaphot.val() != null) {
                    handle.node.active = true;
                }
            })
        }

        // firebase
        let name = this.node.name;
        let DirX = this.moveDirX_firebase;
        let DirY = this.moveDirY_firebase;
        let preDirX = this.premoveDirX_firebase;
        let posX = this.node.position.x;
        let posY = this.node.position.y;
        // write firebase realtime database
        if (this.current_user == this.this_node_user) {
            firebase.database().ref(`player_data/${name}/state_value/moveDirX`).set({ Dir: DirX })
            firebase.database().ref(`player_data/${name}/state_value/moveDirY`).set({ Dir: DirY })
            firebase.database().ref(`player_data/${name}/state_value/premoveDirX`).set({ Dir: preDirX })
            firebase.database().ref(`player_data/${name}/state_value/X`).set({ x: posX })
            firebase.database().ref(`player_data/${name}/state_value/Y`).set({ y: posY })
        }
        // read firebase realtime database
        DirX = 0, DirY = 0, preDirX = 0;
        firebase.database().ref(`player_data/${name}/state_value`).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                preDirX = snapshot.val().premoveDirX.Dir;
            }
        });
        this.scheduleOnce(() => {
            this.moveDirX = DirX;
            this.moveDirY = DirY;
            this.premoveDirX = preDirX;
        }, 0.2);

        // Scale
        this.child_node.scaleX = (this.moveDirX >= 0) ? 1 : -1;
        if (this.moveDirX == 0) this.child_node.scaleX = (this.premoveDirX >= 0) ? 1 : -1;

        // Move
        if (this.moveDirX == 0) {
            if(this.moveable) this.rigidbody.linearVelocity = cc.v2(0, this.playerSpeed * this.moveDirY);
        } else if (this.moveDirY == 0) {
            if(this.moveable) this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX, 0);
        } else {
            if(this.moveable) this.rigidbody.linearVelocity = cc.v2(this.playerSpeed * this.moveDirX * 0.7, this.playerSpeed * this.moveDirY * 0.7);
        }

        // Animation
        if ((this.moveDirX == 0 && this.moveDirY == 0) || !this.moveable) {
            if (!this.child_anim.getAnimationState('Idle').isPlaying) this.child_anim.play('Idle');
        } else {
            if (!this.child_anim.getAnimationState('Move').isPlaying) this.child_anim.play('Move');
        }
    }

    onKeyDown(event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = true;
                this.playerMoveX(-1);
                break;
            case cc.macro.KEY.d:
                this.rightDown = true;
                this.playerMoveX(1);
                break;
            case cc.macro.KEY.w:
                this.upDown = true;
                this.playerMoveY(1);
                break;
            case cc.macro.KEY.s:
                this.downDown = true;
                this.playerMoveY(-1);
                break;
        }
    }
    onKeyUp(event) {
        // console.log("KeyDown", event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = false;
                if (this.rightDown)
                    this.playerMoveX(1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.d:
                this.rightDown = false;
                if (this.leftDown)
                    this.playerMoveX(-1);
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.w:
                this.upDown = false;
                if (this.downDown)
                    this.playerMoveY(-1);
                else
                    this.playerMoveY(0);
                break;
            case cc.macro.KEY.s:
                this.downDown = false;
                if (this.upDown)
                    this.playerMoveY(1);
                else
                    this.playerMoveY(0);
                break;
        }
    }
    playerMoveX(moveDirX: number) {
        if (this.current_user != this.this_node_user) return;
        if (!this.moveableKey) return;
        this.premoveDirX_firebase = this.moveDirX_firebase;
        this.moveDirX_firebase = moveDirX;
    }
    playerMoveY(moveDirY: number) {
        if (this.current_user != this.this_node_user) return;
        if (!this.moveableKey) return;
        this.moveDirY_firebase = moveDirY;
    }

    updateOthersCurrentPos() { // 定期自動修正其他玩家正確位置
        if (this.current_user == this.this_node_user) return; // 不更新自己的node
        let name = this.node.name;
        // console.log("refresh Pos:", name);
        let posX = -1487, DirX;
        let posY = -1487, DirY;
        // let IsLogin: boolean;
        firebase.database().ref(`player_data/${name}/state_value`).once('value', function (snapshot) {
            if (snapshot.val() != null) {
                posX = snapshot.val().X.x;
                posY = snapshot.val().Y.y;
                DirX = snapshot.val().moveDirX.Dir;
                DirY = snapshot.val().moveDirY.Dir;
                // IsLogin = snapshot.val().IsLogin.bool;
            }
        });
        this.scheduleOnce(() => {
            if (posX == -1487 && posY == -1487) return; // 如果firebase database沒有抓到資料，就不要更新。
            let action: cc.Action;
            action = cc.moveTo(0.5, posX, posY); // 修正並平滑移動到正確位置
            if(Math.abs(this.node.position.x-posX)>320 || Math.abs(this.node.position.y-posY)>320){ // 如果位置差太多就直接閃現。
                this.node.setPosition(posX,posY);
            }
            this.node.runAction(action);
        }, 0.20);
    }
}
