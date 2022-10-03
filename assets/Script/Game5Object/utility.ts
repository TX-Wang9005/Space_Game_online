// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import GameManagerS5 from "../GameManager/GameManagerS5"
declare const firebase: any;
@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.AudioClip })
    soundEffect: cc.AudioClip[] = [];
    current_user;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let press_button = new cc.Component.EventHandler();
        press_button.target = this.node;
        press_button.component = "utility";
        press_button.handler = "selection";
        cc.find(`Canvas/MapObjContainer/character_utility/${this.node.name}/Button`).getComponent(cc.Button).clickEvents.push(press_button);
    }

    selection() {
        let game_manager = cc.find('GameManager').getComponent(GameManagerS5);
        this.current_user = game_manager.current_user_node;
        console.log("finally   " + this.node.name)
        if (!game_manager.select_character) {
            switch (this.node.name) {
                case "book":
                    firebase.database().ref(`player_data/${this.current_user}/character`).set({ character: "erudite" });
                    game_manager.select_character = true;
                    game_manager.character = "erudite";
                    cc.find('Canvas/UI/Character/book').active = true;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can peak card distribution";
                    break;
                case "bomb":
                    firebase.database().ref(`player_data/${this.current_user}/character`).set({ character: "thug" });
                    game_manager.select_character = true;
                    game_manager.character = "thug";
                    //get all the irrefutable on
                    for (let i = 1; i <= 5; i++) {
                        if (`player${i}` != this.current_user) {
                            cc.find(`Canvas/PlayerContainer/player${i}/unreasonable`).active = true;
                        }
                    }
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = true;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now other can't reject your fight request";
                    break;
                case "black_clover":
                    firebase.database().ref(`player_data/${this.current_user}/character`).set({ character: "gambler" });
                    game_manager.select_character = true;
                    cc.find('Canvas/UI/Mine_info_choice/gambler_ability').active = true;
                    cc.find('Canvas/UI/Mine_info_choice/betting_multiple').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = true;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can gain more when you win";
                    game_manager.character = "gambler";
                    break;
                case "ring":
                    firebase.database().ref(`player_data/${this.current_user}/character`).set({ character: "rule_breaker" });
                    game_manager.select_character = true;
                    game_manager.character = "rule_breaker";
                    firebase.database().ref(`player_data/${this.current_user}/game2_state/reverse`).set({ reverse: "true" });
                    cc.find('Canvas/UI/Mine_info_choice/switch_result').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = false;
                    cc.find('Canvas/UI/Character/ring').active = true;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can reverse the fighting result"
                    break; // means he can swap the cards and invert the result
                case "coin":
                    firebase.database().ref(`player_data/${this.current_user}/character`).set({ character: "escaper" });
                    game_manager.select_character = true;
                    game_manager.character = "escaper";
                    cc.find('Canvas/UI/Mine_info_choice/escape').active = true;
                    cc.find('Canvas/UI/Character/book').active = false;
                    cc.find('Canvas/UI/Character/clover').active = false;
                    cc.find('Canvas/UI/Character/bomb').active = false;
                    cc.find('Canvas/UI/Character/coin').active = true;
                    cc.find('Canvas/UI/Character/ring').active = false;
                    cc.find('Canvas/UI/hint_message').getComponent(cc.Label).string = "Now you can escape from fight"
                    break; // means he can swap the cards and invert the result
            }
        }
        cc.audioEngine.playEffect(this.soundEffect[0], false);
        cc.find('Canvas/MapObjContainer/character_utility/book').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/bomb').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/black_clover').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/coin').active = false;
        cc.find('Canvas/MapObjContainer/character_utility/ring').active = false;
        let fadeout = cc.fadeOut(5.0)
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/hint_message').active = true;
            cc.find('Canvas/UI/hint_message').runAction(fadeout);
        }, 0.1)
        cc.find('Canvas/UI/hint_message').active = false;
        cc.find('Canvas/UI/hint_message').opacity = 255;
    }

    // update (dt) {}
}
