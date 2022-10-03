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
export default class computerRule extends cc.Component {

    @property(cc.Node)
    ruleWindow: cc.Node = null;
    @property(cc.AudioClip)
    click: cc.AudioClip = null;
    @property(cc.Node)
    RuleText: cc.Node = null;
    @property(cc.Node)
    DetailRuleText: cc.Node = null;

    private current_user_number: number = 0;
    private T1: cc.Node = null;
    private T2: cc.Node = null;
    private T3: cc.Node = null;
    private T4: cc.Node = null;

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
        this.Text1Action();

        // buttons
        let rule_btn = new cc.Component.EventHandler();
        rule_btn.target = this.node;
        rule_btn.component = "computerRule";
        rule_btn.handler = "ruleEvent";
        console.log(cc.find("Canvas/Main Camera/RuleWindow/rule"));
        cc.find("Canvas/Main Camera/RuleWindow/rule").getComponent(cc.Button).clickEvents.push(rule_btn);
        let close_btn = new cc.Component.EventHandler();
        close_btn.target = this.node;
        close_btn.component = "computerRule";
        close_btn.handler = "closeEvent";
        cc.find("Canvas/Main Camera/RuleWindow/close").getComponent(cc.Button).clickEvents.push(close_btn);
        let btn1 = new cc.Component.EventHandler();
        btn1.target = this.node;
        btn1.component = "computerRule";
        btn1.handler = "btn1Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn1").getComponent(cc.Button).clickEvents.push(btn1);
        let btn2 = new cc.Component.EventHandler();
        btn2.target = this.node;
        btn2.component = "computerRule";
        btn2.handler = "btn2Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn2").getComponent(cc.Button).clickEvents.push(btn2);
        let btn3 = new cc.Component.EventHandler();
        btn3.target = this.node;
        btn3.component = "computerRule";
        btn3.handler = "btn3Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn3").getComponent(cc.Button).clickEvents.push(btn3);
        let btn4 = new cc.Component.EventHandler();
        btn4.target = this.node;
        btn4.component = "computerRule";
        btn4.handler = "btn4Event";
        cc.find("Canvas/Main Camera/RuleWindow/Message/btn4").getComponent(cc.Button).clickEvents.push(btn4);
        
        this.T1 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text1");
        this.T2 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text2");
        this.T3 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text3");
        this.T4 = cc.find("Canvas/Main Camera/RuleWindow/Message/Text4");

    }
    ruleEvent(){
        cc.audioEngine.playEffect(this.click, false);
        if(this.DetailRuleText.active == false){
            this.DetailRuleText.active = true;
            this.T1.active = false;
            this.T2.active = false;
            this.T3.active = false;
            this.T4.active = false;
        }else{
            this.DetailRuleText.active = false;
            this.T1.active = false;
            this.T2.active = false;
            this.T3.active = false;
            this.T4.active = false;
        }

    }
    closeEvent(){
        cc.audioEngine.playEffect(this.click, false);
        this.DetailRuleText.active = false;
        this.ruleWindow.active = false;
        cc.find(`Canvas/PlayerContainer/player${this.current_user_number}`).getComponent(Player).moveable = true;

    }
    onBeginContact(contact, self, other) {
        if(other.node.group == 'player'){
            let str = "player"+this.current_user_number.toString();
            if(other.node.name == str){
                console.log("open ComputerRule");
                this.ruleWindow.active = true;
                other.node.getComponent(Player).moveable = false;
                other.node.getComponent(Player).getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            }
        }
    }
    Text1Action() {
        let action: cc.Action;
        let sequence = cc.sequence(cc.scaleTo(0.5, 1.1), cc.scaleTo(0.5, 1));
        action = cc.repeatForever(sequence);
        this.RuleText.runAction(action);
    }
    btn1Event(){
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = true;
        this.T2.active = false;
        this.T3.active = false;
        this.T4.active = false;
    }
    btn2Event(){
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = false;
        this.T2.active = true;
        this.T3.active = false;
        this.T4.active = false;
    }
    btn3Event(){
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = false;
        this.T2.active = false;
        this.T3.active = true;
        this.T4.active = false;
    }
    btn4Event(){
        cc.audioEngine.playEffect(this.click, false);
        this.T1.active = false;
        this.T2.active = false;
        this.T3.active = false;
        this.T4.active = true;
    }
    // onEndContact(contact, self, other){
    //     if(other.node.group == 'player'){
    //         console.log("close Computer");
    //         this.readyWindow.active = false;
    //     }
    // }
 // update (dt) {}
}