// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class InteractWall extends cc.Component {

    @property(cc.Prefab)
    TopOfIW: cc.Prefab = null;
    @property(cc.AudioClip)
    Ghost: cc.AudioClip = null;    
    @property(cc.AudioClip)
    PlayerOpen: cc.AudioClip = null;
    @property(cc.AudioClip)
    PlayerClose: cc.AudioClip = null;

    private anim: cc.Animation = null;
    
    private current_user_number: number = 0;

    private isTouched = false;

    // onLoad () {}

    start () {
        this.anim = this.node.getComponent(cc.Animation);
        this.anim.play();
        
        var uid = firebase.auth().currentUser.uid;
        let t = this;
        firebase.database().ref(`user_info/${uid}`).once('value', function (snapshot) {
            if(snapshot.val() != null){
                t.current_user_number = snapshot.val().player_number;
                // console.log("IW current_user_number", t.current_user_number);
            }
        });
        

        let top = cc.instantiate(this.TopOfIW);
        top.setPosition(this.node.position.x, this.node.position.y+12);
        if(this.node.name == "IW x1")
            top.setScale(0.5,1);
        else if(this.node.name == "IW x2 x2"){
            top.setScale(2,2);
            top.setPosition(this.node.position.x, this.node.position.y+24);
        }
        cc.find("Canvas/PlayerContainer").addChild(top);
    }

    update (dt) {
    }

    onBeginContact(contact, self, other){
        if(this.isTouched) return;
        if(other.node.name == "player1" || other.node.name == "player2" || other.node.name == "player3" || other.node.name == "player4" || other.node.name == "player5"){
            // console.log("IW Begin");
            if(other.node.group == 'player' || other.node.group == 'Coinplayer'){
                // console.log("PB");
                this.isTouched = true;
                if(!this.anim.getAnimationState('Open').isPlaying) this.anim.play('Open');
                this.scheduleOnce(()=>{
                    let str = "player"+this.current_user_number.toString();
                    if(str == other.node.name){
                        if(this.PlayerOpen) cc.audioEngine.playEffect(this.PlayerOpen, false);
                    }
                }, 0.4);
                this.scheduleOnce(()=>{
                    contact.disabled = true;
                }, 0.8);
            }else if(other.node.group == 'ghost'){
                // console.log("GB");
                let action: cc.Action;
                action = cc.fadeTo(0.2, 100);
                other.node.runAction(action);
                this.isTouched = true;
                contact.disabled = true;
                let str = "player"+this.current_user_number.toString();
                if(str == other.node.name){
                    if(this.Ghost) cc.audioEngine.playEffect(this.Ghost, false);
                }
            }
        }
    }
    onEndContact(contact, self, other){
        if(other.node.name == "player1" || other.node.name == "player2" || other.node.name == "player3" || other.node.name == "player4" || other.node.name == "player5"){
            // console.log("IW End");
            if(other.node.group == 'player' || other.node.group == 'Coinplayer'){
                // console.log("PE");
                this.isTouched = false;
                if(!this.anim.getAnimationState('Close').isPlaying) this.anim.play('Close');
                let str = "player"+this.current_user_number.toString();
                if(str == other.node.name){
                    if(this.PlayerClose) cc.audioEngine.playEffect(this.PlayerClose, false);
                }
                this.scheduleOnce(()=>{
                    if(!this.anim.getAnimationState('Idle').isPlaying) this.anim.play();
                }, 0.4);
            }else if(other.node.group == 'ghost'){
                // console.log("GE");
                let action: cc.Action;
                action = cc.fadeTo(0.2, 255);
                other.node.runAction(action);
                this.isTouched = false;
            }
        }
    }
}
