// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import panel_info from "./panel_info";
import battle_field from "./battle_field";
import GameManagerS5 from "../GameManager/GameManagerS5";
declare const firebase: any;
@ccclass
export default class Mine_info_choice extends cc.Component {

    @property(cc.Node)
    panel: cc.Node = null;
    @property(cc.Node)
    bet: cc.Node = null;
    @property(cc.Node)
    multiple: cc.Node = null;
    @property(cc.Node)
    battle_field: cc.Node = null;
    @property(cc.AudioClip)
    click: cc.AudioClip = null;

    current_user;
    opponent;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        //this.current_user = cc.find("GameManager").getComponent(GameManagerS2).current_user_node;
        let paper_click = new cc.Component.EventHandler();
        paper_click.target = this.node;
        paper_click.component = "Mine_info_choice";
        paper_click.handler = "paper";
        cc.find(`Canvas/UI/Mine_info_choice/paper`).getComponent(cc.Button).clickEvents.push(paper_click);
        let stone_click = new cc.Component.EventHandler();
        stone_click.target = this.node;
        stone_click.component = "Mine_info_choice";
        stone_click.handler = "stone";
        cc.find(`Canvas/UI/Mine_info_choice/stone`).getComponent(cc.Button).clickEvents.push(stone_click);
        let scissor_click = new cc.Component.EventHandler();
        scissor_click.target = this.node;
        scissor_click.component = "Mine_info_choice";
        scissor_click.handler = "scissor";
        cc.find(`Canvas/UI/Mine_info_choice/scissor`).getComponent(cc.Button).clickEvents.push(scissor_click);
        let bet_confirm = new cc.Component.EventHandler();
        bet_confirm.target = this.node;
        bet_confirm.component = "Mine_info_choice";
        bet_confirm.handler = "betting";
        cc.find(`Canvas/UI/Mine_info_choice/bet_confirm`).getComponent(cc.Button).clickEvents.push(bet_confirm);
        let gamble_this = new cc.Component.EventHandler();
        gamble_this.target = this.node;
        gamble_this.component = "Mine_info_choice";
        gamble_this.handler = "betting_multiple";
        cc.find(`Canvas/UI/Mine_info_choice/gambler_ability`).getComponent(cc.Button).clickEvents.push(gamble_this);
        let reverse_this = new cc.Component.EventHandler();
        reverse_this.target = this.node;
        reverse_this.component = "Mine_info_choice";
        reverse_this.handler = "switch_result";
        cc.find(`Canvas/UI/Mine_info_choice/switch_result`).getComponent(cc.Button).clickEvents.push(reverse_this);
        let escape_this = new cc.Component.EventHandler();
        escape_this.target = this.node;
        escape_this.component = "Mine_info_choice";
        escape_this.handler = "escape_battle";
        cc.find(`Canvas/UI/Mine_info_choice/escape`).getComponent(cc.Button).clickEvents.push(escape_this);
        cc.find(`Canvas/UI/Mine_info_choice/paper`).getComponent(cc.Button).interactable = false;
        cc.find(`Canvas/UI/Mine_info_choice/scissor`).getComponent(cc.Button).interactable = false;
        cc.find(`Canvas/UI/Mine_info_choice/stone`).getComponent(cc.Button).interactable = false;
    }
    escape_battle() {
        cc.audioEngine.playEffect(this.click, false)
        this.battle_field.getComponent(battle_field).escape = true;
        firebase.database().ref(`player_data/${this.opponent}/game2_state/escape`).set({ escape: "absolute" });
        let fadeout = cc.fadeOut(5.0)
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Escape active";
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1)
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    }
    switch_result() {
        cc.audioEngine.playEffect(this.click, false)
        this.battle_field.getComponent(battle_field).reverse = true;
        firebase.database().ref(`player_data/${this.opponent}/game2_state/reverse`).set({ reverse: "absolute" });
        let fadeout = cc.fadeOut(5.0)
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Reverse active";
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1)
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    }

    betting_multiple() {
        cc.audioEngine.playEffect(this.click, false)
        let str = this.multiple.getComponent(cc.EditBox).string;
        if (Number(str) >= 5)
            str = "5";
        firebase.database().ref(`player_data/${this.current_user}/game2_state/multiple`).set({ multiple: str });
        this.battle_field.getComponent(battle_field).multiple_on = true;
        cc.find('Canvas/UI/Mine_info_choice/gambler_ability').getComponent(cc.Button).interactable = false;
    }
    betting() {
        cc.audioEngine.playEffect(this.click, false)
        // let str = this.bet.getComponent(cc.EditBox).string;
        // if (Number(str) > this.panel.getComponent(panel_info).money_left) {
        //     let fadeout = cc.fadeOut(5.0)
        //     this.scheduleOnce(function () {
        //         cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Not enough money";
        //         cc.find('Canvas/UI/hint_message').active = true;
        //         cc.find('Canvas/UI/hint_message').runAction(fadeout);
        //     }, 0.1)
        //     cc.find('Canvas/UI/hint_message').active = false;
        //     cc.find('Canvas/UI/hint_message').opacity = 255;
        //     return;
        // }
        firebase.database().ref(`player_data/${this.current_user}/game2_state/bet`).set({ bet: this.bet.getComponent(cc.EditBox).string });
        cc.find('Canvas/UI/Mine_info_choice/bet_confirm').getComponent(cc.Button).interactable = false;
        cc.find(`Canvas/UI/Mine_info_choice/paper`).getComponent(cc.Button).interactable = true;
        cc.find(`Canvas/UI/Mine_info_choice/scissor`).getComponent(cc.Button).interactable = true;
        cc.find(`Canvas/UI/Mine_info_choice/stone`).getComponent(cc.Button).interactable = true;
    }
    paper() {
        cc.audioEngine.playEffect(this.click, false)
        let new_paper = this.panel.getComponent(panel_info).paper_left - 1;
        console.log(new_paper)
        console.log("qwer")
        if (new_paper >= 0) {
            this.panel.getComponent(panel_info).update_info("paper", new_paper);
            cc.find("Canvas/UI/battle_field/Mine_paper").active = true;
            cc.find("Canvas/UI/battle_field").getComponent(battle_field).my_choice = "paper";
            cc.find("Canvas/UI/battle_field").getComponent(battle_field).show_card('paper', "Mine");
            cc.find("Canvas/UI/battle_field").getComponent(battle_field).me_ready = true;
            firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ card: "paper" });
            this.node.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = String(new_paper)
            cc.find(`Canvas/UI/Mine_info_choice/paper`).getComponent(cc.Button).interactable = false;
            cc.find(`Canvas/UI/Mine_info_choice/scissor`).getComponent(cc.Button).interactable = false;
            cc.find(`Canvas/UI/Mine_info_choice/stone`).getComponent(cc.Button).interactable = false;
        }
        else {
            //can't select paper because you don't have paper card anymore
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "No Paper"
            let fadeout = cc.fadeOut(2.0)
            this.scheduleOnce(function () {
                cc.find('Canvas/UI/hint_message').active = true;
                cc.find('Canvas/UI/hint_message').runAction(fadeout);
            }, 0.1)
            cc.find('Canvas/UI/hint_message').active = false;
            cc.find('Canvas/UI/hint_message').opacity = 255;
        }
        //get the paper info

    }
    scissor() {
        cc.audioEngine.playEffect(this.click, false)
        let new_scissor = this.panel.getComponent(panel_info).scissor_left - 1;
        if (new_scissor >= 0) {
            this.panel.getComponent(panel_info).update_info("scissor", new_scissor);
            cc.find("Canvas/UI/battle_field/Mine_scissor").active = true;
            cc.find("Canvas/UI/battle_field").getComponent(battle_field).my_choice = "scissor";
            cc.find("Canvas/UI/battle_field").getComponent(battle_field).show_card('scissor', "Mine");
            cc.find("Canvas/UI/battle_field").getComponent(battle_field).me_ready = true;
            firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ card: "scissor" });
            this.node.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = String(new_scissor)
            cc.find(`Canvas/UI/Mine_info_choice/paper`).getComponent(cc.Button).interactable = false;
            cc.find(`Canvas/UI/Mine_info_choice/scissor`).getComponent(cc.Button).interactable = false;
            cc.find(`Canvas/UI/Mine_info_choice/stone`).getComponent(cc.Button).interactable = false;
        }
        else {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "No Scissors"
            let fadeout = cc.fadeOut(2.0)
            this.scheduleOnce(function () {
                cc.find('Canvas/UI/hint_message').active = true;
                cc.find('Canvas/UI/hint_message').runAction(fadeout);
            }, 0.1)
            cc.find('Canvas/UI/hint_message').active = false;
            cc.find('Canvas/UI/hint_message').opacity = 255;
        }
        cc.find(`Canvas/UI/Mine_info_choice/paper`).getComponent(cc.Button).interactable = false;
        cc.find(`Canvas/UI/Mine_info_choice/scissor`).getComponent(cc.Button).interactable = false;
        cc.find(`Canvas/UI/Mine_info_choice/stone`).getComponent(cc.Button).interactable = false;
        //get scissor info
    }
    stone() {
        cc.audioEngine.playEffect(this.click, false)
        let new_stone = this.panel.getComponent(panel_info).stone_left - 1;
        if (new_stone >= 0) {
            this.panel.getComponent(panel_info).update_info("stone", new_stone);
            cc.find("Canvas/UI/battle_field/Mine_stone").active = true;
            cc.find("Canvas/UI/battle_field").getComponent(battle_field).my_choice = "stone";
            cc.find("Canvas/UI/battle_field").getComponent(battle_field).show_card('stone', "Mine");
            cc.find("Canvas/UI/battle_field").getComponent(battle_field).me_ready = true;
            firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ card: "stone" });
            this.node.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = String(new_stone)
            cc.find(`Canvas/UI/Mine_info_choice/paper`).getComponent(cc.Button).interactable = false;
            cc.find(`Canvas/UI/Mine_info_choice/scissor`).getComponent(cc.Button).interactable = false;
            cc.find(`Canvas/UI/Mine_info_choice/stone`).getComponent(cc.Button).interactable = false;
        }
        else {
            cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "No Stone"
            let fadeout = cc.fadeOut(2.0)
            this.scheduleOnce(function () {
                cc.find('Canvas/UI/hint_message').active = true;
                cc.find('Canvas/UI/hint_message').runAction(fadeout);
            }, 0.1)
            cc.find('Canvas/UI/hint_message').active = false;
            cc.find('Canvas/UI/hint_message').opacity = 255;
        }
        cc.find(`Canvas/UI/Mine_info_choice/paper`).getComponent(cc.Button).interactable = false;
        cc.find(`Canvas/UI/Mine_info_choice/scissor`).getComponent(cc.Button).interactable = false;
        cc.find(`Canvas/UI/Mine_info_choice/stone`).getComponent(cc.Button).interactable = false;
        //get stone info
    }

    // update(dt) {

    // }
}
