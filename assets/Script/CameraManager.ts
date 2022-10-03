// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraManager extends cc.Component {

    @property(cc.Node)
    FollowTarget: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if(this.FollowTarget){
            let End = cc.find("End");
            if(End != null){
                let x = this.FollowTarget.position.x;
                if(x<-480){
                    x = -480;
                }else if(x>480){
                    x = 480;
                }
                this.node.setPosition(x, 0);
            }else{
                this.node.setPosition(this.FollowTarget.position.x, this.FollowTarget.position.y);
            }
        }
    }
}
