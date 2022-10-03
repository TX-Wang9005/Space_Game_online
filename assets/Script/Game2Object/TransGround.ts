// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import PlayerGhost from "./PlayerGhost";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TransGround extends cc.Component {

    @property()
    TransDir: number = 2; // 1up, 2down, 3left, 4right, 5rightdown, 6leftup.

    @property()
    TransSpeed: number = 150;

    private playerSpeed: number = 0;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.playerSpeed = cc.find('Canvas/PlayerContainer/player1').getComponent(PlayerGhost).playerSpeed;

    }

    // update (dt) {}
    onBeginContact(contact, self, other){
        // console.log("TransGround");
        // console.log(other.node.group)
        if(other.node.group == 'player'){
            console.log("TransGroundPP Pspeed", this.playerSpeed);
            other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            let p = other.node.getComponent(PlayerGhost);
            p.playerSpeed = this.TransSpeed;
            p.moveableKey = false;
            if(this.TransDir == 1){
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,this.TransSpeed);
                p.moveDirX_firebase = 0;
                p.moveDirY_firebase = 1;
            }else if(this.TransDir == 2){
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,-this.TransSpeed);
                p.moveDirX_firebase = 0;
                p.moveDirY_firebase = -1;
            }else if(this.TransDir == 3){
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.TransSpeed,0);
                p.moveDirX_firebase = -1;
                p.moveDirY_firebase = 0;
            }else if(this.TransDir == 4){
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.TransSpeed,0);
                p.moveDirX_firebase = 1;
                p.moveDirY_firebase = 0;
            }else if(this.TransDir == 5){
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.TransSpeed, -this.TransSpeed);
                p.playerSpeed = this.TransSpeed*1.4;
                p.moveDirX_firebase = 1;
                p.moveDirY_firebase = -1;
            }else if(this.TransDir == 6){
                // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.TransSpeed, this.TransSpeed);
                p.playerSpeed = this.TransSpeed*1.4;
                p.moveDirX_firebase = -1;
                p.moveDirY_firebase = 1;
            }
        }
    }
    // onPreSolve(contact, self, other){
    //     if(other.node.group == "player1" || other.node.group == 'ghost'){
    //         console.log("TransGround");
    //         let x = other.node.getComponent(cc.RigidBody).linearVelocity.x;
    //         let y = other.node.getComponent(cc.RigidBody).linearVelocity.y;
    //         if(this.TransDir == 1){
    //             other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(x,this.TransSpeed);
    //         }else if(this.TransDir == 2){
    //             other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(x,-this.TransSpeed);
    //         }else if(this.TransDir == 3){
    //             other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.TransSpeed,y);
    //         }else if(this.TransDir == 4){
    //             other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.TransSpeed,y);
    //         }
    //     }
    // }
    onEndContact(contact, self, other){
        if(other.node.group == "player"){
            console.log("TransGroundEE");
            // other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);            
            let p = other.node.getComponent(PlayerGhost);
            p.moveableKey = true;
            p.moveDirX_firebase = 0;
            p.moveDirY_firebase = 0;
            p.playerSpeed = this.playerSpeed;
        }
    }
}
