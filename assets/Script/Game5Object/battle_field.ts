// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import GameManagerS5 from "../GameManager/GameManagerS5";
import panel_info from "./panel_info";
declare const firebase: any;
@ccclass
export default class battle_field extends cc.Component {
    @property(cc.Node)
    panel: cc.Node = null;
    @property(cc.Node)
    gamemanager: cc.Node = null;
    @property(cc.Node)
    opponent_info_choice: cc.Node = null;
    @property(cc.Node)
    Mine_info_choice: cc.Node = null;
    @property(cc.Node)
    bet: cc.Node = null;
    @property(cc.Node)
    multiple: cc.Node = null;
    @property(cc.Node)
    message: cc.Node = null;
    @property({ type: cc.AudioClip })
    soundEffect: cc.AudioClip[] = [];

    current_user;
    opponent = "null";
    my_choice = "null";
    opponent_choice = "null";
    opponent_ready = false;
    me_ready = false;
    win_lose = "null";
    multiple_on = false;
    reverse = false;
    escape = false;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.current_user = cc.find("GameManager").getComponent(GameManagerS5).current_user_node;
    }
    show_card(type: string, person: string) {
        console.log(this.opponent_ready + " " + this.me_ready)
        cc.find(`Canvas/UI/battle_field/${person}_${type}`).active = true;
        //this.me_ready = true;
    }
    match_result() {
        console.log(this.my_choice + " the fuck " + this.opponent_choice)
        let handle = this;

        if (!this.escape) {
            firebase.database().ref(`player_data/${this.current_user}/game2_state/reverse`).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().reverse == 'absolute') {
                        handle.reverse = true;
                    }
                    firebase.database().ref(`player_data/${this.current_user}/game2_state/reverse`).update({ reverse: "false" });
                }
            })
            switch (this.my_choice) {
                case "paper":
                    if (this.opponent_choice == "paper") {
                        //draw
                        cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `Draw`;
                        //nothing happens
                    }
                    else if (this.opponent_choice == "scissor") {
                        //lose
                        this.lose();
                    }
                    else if (this.opponent_choice == "stone") {
                        //win
                        this.win();
                    }
                    break;
                case "scissor":
                    if (this.opponent_choice == "paper") {
                        //win
                        this.win();
                    }
                    else if (this.opponent_choice == "scissor") {
                        //draw
                        //nothing happens
                        cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `Draw`;
                    }
                    else if (this.opponent_choice == "stone") {
                        //lose
                        this.lose();
                    }
                    break;
                case "stone":
                    if (this.opponent_choice == "paper") {
                        //lose
                        this.lose();
                    }
                    else if (this.opponent_choice == "scissor") {
                        //win
                        this.win();
                    }
                    else if (this.opponent_choice == "stone") {
                        //draw
                        //nothing happens
                        cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `Draw`;
                    }
                    break;
            }
        }
        else {
            //reverse the score
            console.log('escape reverse')
            switch (this.my_choice) {
                case "paper":
                    let paper = this.panel.getComponent(panel_info).paper_left + 1;
                    this.panel.getComponent(panel_info).update_info("paper", paper);
                    firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ paper: paper });
                    break;
                case "scissor":
                    let scissor = this.panel.getComponent(panel_info).scissor_left + 1;
                    this.panel.getComponent(panel_info).update_info("scissor", scissor);
                    firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ scissor: scissor });
                    break;
                case "stone":
                    let stone = this.panel.getComponent(panel_info).stone_left + 1;
                    this.panel.getComponent(panel_info).update_info("stone", stone);
                    firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ stone: stone });
                    break;
            }
            cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = 'Someone escape';
            this.escape = false;
        }

        this.bet.getComponent(cc.EditBox).string = "1";
        this.multiple.getComponent(cc.EditBox).string = "1";
        this.reverse = false;
        this.scheduleOnce(function () {
            cc.find('Canvas/UI/WLMessage').active = true;
        }, 0.5)

        //also reset all the variable in other script
        firebase.database().ref(`player_data/${this.current_user}/game2_state/escape`).update({ escape: "false" });
        firebase.database().ref(`player_data/${this.current_user}/game2_state`).update({ card: "null", challenged: "false", fighting: "false", opponent: "null" });
        handle.gamemanager.getComponent(GameManagerS5).fighting = false;
        handle.gamemanager.getComponent(GameManagerS5).reset = true;
        handle.Mine_info_choice.active = false;
        handle.opponent_info_choice.active = false;
        this.scheduleOnce(function () {
            cc.find(`Canvas/UI/battle_field/opponent_${this.opponent_choice}`).active = false;
            cc.find(`Canvas/UI/battle_field/Mine_${this.my_choice}`).active = false;
            cc.find('Canvas/UI/Mine_info_choice/gambler_ability').getComponent(cc.Button).interactable = true;
            cc.find('Canvas/UI/Mine_info_choice/bet_confirm').getComponent(cc.Button).interactable = true;
            this.opponent = "null";
            this.my_choice = "null";
            this.opponent_choice = "null";
            cc.find('Canvas/UI/WLMessage').active = false;
            this.multiple_on = false;
            this.node.active = false;
        }, 3)

    }
    win() {
        if (this.reverse) {
            this.reverse = false;
            this.lose();
        }
        else {

            //life +1
            console.log("win")
            let handle = this;

            firebase.database().ref(`player_data/${this.opponent}/game2_state/bet`).once('value', function (snapshot) {
                firebase.database().ref(`player_data/${handle.current_user}/game2_state/bet`).once('value', function (smallsnapshot) {
                    let bet_money = Math.max(parseInt(snapshot.val().bet, 10), parseInt(smallsnapshot.val().bet, 10))
                    if (handle.multiple_on) {
                        firebase.database().ref(`player_data/${handle.current_user}/game2_state/multiple`).once('value', function (snap) {
                            if (snap.val() == null) {
                                let new_money = handle.panel.getComponent(panel_info).money_left + bet_money;
                                handle.panel.getComponent(panel_info).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `${handle.current_user} win \n Gain ${bet_money} money`
                            }
                            else {
                                let multiple = snap.val().multiple;
                                let new_money = handle.panel.getComponent(panel_info).money_left + bet_money * parseInt(multiple, 10);
                                console.log("win " + bet_money * parseInt(multiple, 10))
                                handle.panel.getComponent(panel_info).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `${handle.current_user} win \n Gain ${bet_money * parseInt(multiple, 10)} money`
                            }
                        })
                    }
                    else {
                        firebase.database().ref(`player_data/${handle.opponent}/game2_state/multiple`).once('value', function (snap) {
                            if (snap.val() == null) {
                                let new_money = handle.panel.getComponent(panel_info).money_left + bet_money;
                                handle.panel.getComponent(panel_info).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `${handle.current_user} win \n Gain ${bet_money} money`
                            }
                            else {
                                let multiple = snap.val().multiple;
                                let new_money = handle.panel.getComponent(panel_info).money_left + bet_money * parseInt(multiple, 10);
                                handle.panel.getComponent(panel_info).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `${handle.current_user} win \n Gain ${bet_money * parseInt(multiple, 10)} money`
                            }
                        })
                    }
                })
            })
            cc.audioEngine.playEffect(this.soundEffect[0], false);
        }
    }
    lose() {
        if (this.reverse) {
            this.reverse = false;
            this.win();
        }
        else {
            console.log("lose")
            let handle = this;
            firebase.database().ref(`player_data/${this.opponent}/game2_state/bet`).once('value', function (snapshot) {
                firebase.database().ref(`player_data/${handle.current_user}/game2_state/bet`).once('value', function (smallsnapshot) {
                    let bet_money = Math.max(parseInt(snapshot.val().bet, 10), parseInt(smallsnapshot.val().bet, 10))
                    console.log(parseInt(snapshot.val().bet, 10))
                    console.log(parseInt(smallsnapshot.val().bet, 10))
                    console.log(`bet_money = ${bet_money} `)
                    if (handle.multiple_on) {
                        console.log("multiple on lose")
                        firebase.database().ref(`player_data/${handle.current_user}/game2_state/multiple`).once('value', function (snap) {
                            if (snap.val() == null) {
                                let new_money = handle.panel.getComponent(panel_info).money_left - bet_money;
                                handle.panel.getComponent(panel_info).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `You lose \n Loss ${bet_money} money`
                            }
                            else {
                                let multiple = snap.val().multiple;
                                let new_money = handle.panel.getComponent(panel_info).money_left - bet_money * parseInt(multiple, 10);
                                handle.panel.getComponent(panel_info).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `You lose \n Loss ${bet_money * parseInt(multiple, 10)} money`
                            }
                        })
                    }
                    else {
                        firebase.database().ref(`player_data/${handle.opponent}/game2_state/multiple`).once('value', function (snap) {
                            if (snap.val() == null) {
                                let new_money = handle.panel.getComponent(panel_info).money_left - bet_money;
                                handle.panel.getComponent(panel_info).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `You lose \n Loss ${bet_money} money`
                            }
                            else {
                                let multiple = snap.val().multiple;
                                let new_money = handle.panel.getComponent(panel_info).money_left - bet_money * parseInt(multiple, 10);
                                handle.panel.getComponent(panel_info).update_info("money", new_money);
                                cc.find('Canvas/UI/WLMessage').getComponent(cc.Label).string = `You lose \n Loss ${bet_money * parseInt(multiple, 10)} money`
                            }
                        })
                    }
                })
            })
            cc.audioEngine.playEffect(this.soundEffect[1], false);
        }
    }

    update(dt) {
        //console.log(this.opponent_ready +" "+ this.opponent)
        if (this.opponent_ready == false && this.opponent != 'null') {
            let handle = this;
            //console.log('not start?? '+this.opponent)
            firebase.database().ref(`player_data/${this.opponent}/game2_state`).once('value', function (snapshot) {
                let choice = snapshot.val().card;
                if (choice != 'null') {
                    console.log("choice: " + choice)
                    handle.opponent_choice = choice;
                    handle.opponent_ready = true;
                    console.log("only here is true: " + handle.opponent_ready)
                }
            })
        }

        if (this.opponent_ready == true && this.me_ready == true) {
            console.log("???" + this.opponent_ready + " " + this.me_ready)
            this.opponent_ready = false;
            this.me_ready = false;

            this.show_card(this.opponent_choice, "opponent");
            //get the match result;
            this.scheduleOnce(function () {
                this.match_result();
            }, 2)
        }

        if (this.opponent == "null") {
            let handle = this;
            firebase.database().ref(`player_data/${this.current_user}/game2_state`).once('value', function (snapshot) {
                handle.opponent = snapshot.val().opponent;
            })
        }

        if (this.escape == false) {
            let handle = this;
            firebase.database().ref(`player_data/${this.current_user}/game2_state/escape`).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().escape == 'absolute') {
                        console.log("absolute???????????????")
                        handle.escape = true;
                    }
                }
            })
        }

    }
}
