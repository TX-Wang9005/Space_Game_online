// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Player from "../Game5Object/special_player";
import battle_field from "../Game5Object/battle_field";
import Mine_info_choice from "../Game5Object/Mine_info_choice";
import panel_info from "../Game5Object/panel_info";


const { ccclass, property } = cc._decorator;
declare const firebase: any;

@ccclass
export default class GameManagerS5 extends cc.Component {

    @property(cc.Node)
    loadingBG: cc.Node = null;
    @property(cc.Node)
    GameoverBG: cc.Node = null;
    @property(cc.Node)
    TimerLabel: cc.Node = null;

    @property()
    GameTime: number = 120;

    @property(cc.Node)
    opponent_info_choice: cc.Node = null;
    @property(cc.Node)
    Mine_info_choice: cc.Node = null;
    @property(cc.Node)
    battle_field: cc.Node = null;
    @property({ type: cc.AudioClip })
    BGM: cc.AudioClip = null;
    @property(cc.AudioClip)
    ScoreSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    GameOverSound: cc.AudioClip = null;

    @property(cc.Node)
    panel: cc.Node = null;

    private physicManager: cc.PhysicsManager = null;
    private flag = false;
    counting = 0;
    player_array = [];

    player_node1: cc.Node = null;
    player_node2: cc.Node = null;
    player_node3: cc.Node = null;
    player_node4: cc.Node = null;
    player_node5: cc.Node = null;

    current_user_node;
    opponent_user_node;
    fighting = false;

    reset = false;

    select_character = false;
    character;

    private timer: number = 0;
    private timeUp: boolean = false;


    onLoad() {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);

        // 每個player node初始化位置。
        var user = firebase.auth().currentUser.uid;
        var permited_user;
        var handle = this;
        //
    }

    start() {

        this.loadingBG.active = true;
        //choose the initial ghost
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1) this.player_node1.getComponent(Player).moveable = false;
        if (this.player_node2) this.player_node2.getComponent(Player).moveable = false;
        if (this.player_node3) this.player_node3.getComponent(Player).moveable = false;
        if (this.player_node4) this.player_node4.getComponent(Player).moveable = false;
        if (this.player_node5) this.player_node5.getComponent(Player).moveable = false;
        this.scheduleOnce(() => {
            this.loadingBG.active = false;
            if (this.player_node1) this.player_node1.getComponent(Player).moveable = true;
            if (this.player_node2) this.player_node2.getComponent(Player).moveable = true;
            if (this.player_node3) this.player_node3.getComponent(Player).moveable = true;
            if (this.player_node4) this.player_node4.getComponent(Player).moveable = true;
            if (this.player_node5) this.player_node5.getComponent(Player).moveable = true;
            cc.audioEngine.playMusic(this.BGM, true)
            cc.audioEngine.setMusicVolume(0.5)
            // 開始計時
            this.TimerStart();
        }, 2.5);

    }
    // getRandomInt(max) {
    //     return Math.floor(Math.random() * max);
    // }
    // timer
    TimerStart() {
        this.timer = this.GameTime;
        this.TimerLabel.getComponent(cc.Label).string = this.GameTime.toString();
        this.schedule(this.UpdateTimer, 1);
    }
    UpdateTimer() {
        if (this.timeUp) return;
        if (this.timer > 0) this.timer += -1;
        else if (this.timer == 0) this.timeUp = true;
        this.TimerLabel.getComponent(cc.Label).string = this.timer.toString();

        if (this.timeUp) {
            this.GameOver();
        }
    }
    GameOver() {
        cc.audioEngine.stopMusic();
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.GameOverSound, false);
        }, 0.5);
        this.GameoverBG.active = true;
        let scoreboard = this.GameoverBG.getChildByName("Score");
        let scorepoint = scoreboard.getChildByName("Scorepoint").getComponent(cc.Label);
        let coin = [0,0,0,0,0]
        for(let i=1;i<=5;i++){            
            firebase.database().ref(`player_data/player${i}/game2_state/money`).once('value', function (snapshot){
                if(snapshot.val()!=null){
                    coin[i-1] = snapshot.val();
                }
            });
        }
        this.scheduleOnce(() => {
            scoreboard.active = true;
            let str = "\n";
            str += coin[0].toString() + "  B" + "\n";
            str += coin[1].toString() + "  B" + "\n";
            str += coin[2].toString() + "  B" + "\n";
            str += coin[3].toString() + "  B" + "\n";
            str += coin[4].toString() + "  B";
            scorepoint.string = str;
            cc.audioEngine.playEffect(this.ScoreSound, false);            
        }, 3);
        this.scheduleOnce(() => {
            cc.director.loadScene("GameEnd");
        }, 10);
    }
    //


    update(dt) {
        let handle = this;
        if (this.counting < 5) {
            for (let i = 1; i <= 5; i++) {
                if (cc.find(`Canvas/PlayerContainer/player${i}`).active == true) {
                    continue;
                }
                else {
                    firebase.database().ref(`player_data/player${i}`).once('value', function (snapshot) {
                        firebase.database().ref(`GameResult`).once('value', function (childshot) {
                            if (snapshot.val() != null) {
                                let new_money = 0;
                                childshot.forEach(element => {
                                    if (element.val() != null) {
                                        if (i == 1) {
                                            new_money += element.val().player1 / 10;
                                        }
                                        else if (i == 2) {
                                            new_money += element.val().player2 / 10;
                                        }
                                        else if (i == 3) {
                                            new_money += element.val().player3 / 10;
                                        }
                                        else if (i == 4) {
                                            new_money += element.val().player4 / 10;
                                        }
                                        else if (i == 5) {
                                            new_money += element.val().player5 / 10;
                                        }
                                    }
                                });
                                handle.counting += 1;
                                handle.player_array.push(i);
                                cc.find(`Canvas/PlayerContainer/player${i}`).active = true;
                                firebase.database().ref(`player_data/player${i}/state_value/moveDirX`).set({ Dir: 0 })
                                firebase.database().ref(`player_data/player${i}/state_value/moveDirY`).set({ Dir: 0 })
                                firebase.database().ref(`player_data/player${i}/state_value/premoveDirX`).set({ Dir: 0 })
                                firebase.database().ref(`player_data/player${i}/state_value/moveable`).set({ moveable: "true" })
                                firebase.database().ref(`player_data/player${i}/state_value/X`).set({ x: 240 })
                                firebase.database().ref(`player_data/player${i}/state_value/Y`).set({ y: -48 })
                                firebase.database().ref(`player_data/player${i}/game2_state`).set({ money: new_money, paper: 2, scissor: 2, stone: 2, fighting: "false", opponent: "null", card: "null", challenged: "false" });
                            }
                        })
                    })
                }
            }
        }
        if (this.reset) {
            firebase.database().ref(`player_data/${this.current_user_node}/game2_state`).update({ card: "null", challenged: "false", fighting: "false", opponent: "null" });
            this.reset = false;
        }
        if (!this.fighting && !handle.Mine_info_choice.active && !handle.opponent_info_choice.active && !handle.battle_field.active) {
            firebase.database().ref(`player_data/${this.current_user_node}/game2_state`).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    if (snapshot.val().fighting == 'true') {
                        handle.fighting = true;
                        handle.Mine_info_choice.active = true;
                        handle.Mine_info_choice.getComponent(Mine_info_choice).opponent = handle.opponent_user_node;
                        handle.Mine_info_choice.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = String(snapshot.val().paper);
                        handle.Mine_info_choice.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = String(snapshot.val().scissor);
                        handle.Mine_info_choice.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = String(snapshot.val().stone);
                        handle.opponent_info_choice.active = true;
                        handle.opponent_info_choice.getChildByName("title").getComponent(cc.RichText).string = snapshot.val().opponent;
                        handle.battle_field.active = true;
                        handle.battle_field.getComponent(battle_field).me_ready = false;
                        handle.battle_field.getComponent(battle_field).opponent_ready = false;
                        handle.battle_field.getComponent(battle_field).opponent = snapshot.val().opponent;
                        handle.opponent_user_node = snapshot.val().opponent;
                        if (handle.character == "erudite") {
                            firebase.database().ref(`player_data/${snapshot.val().opponent}/game2_state`).once('value', function (childshot) {
                                let paper = childshot.val().paper;
                                let scissor = childshot.val().scissor;
                                let stone = childshot.val().stone;
                                let total = paper + scissor + stone;
                                handle.opponent_info_choice.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = `${(paper / total).toFixed(2)}%`
                                handle.opponent_info_choice.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = `${(scissor / total).toFixed(2)}%`
                                handle.opponent_info_choice.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = `${(stone / total).toFixed(2)}%`
                            })
                        }
                        else {
                            handle.opponent_info_choice.getChildByName("paper").getChildByName("card_number").getComponent(cc.RichText).string = "??";
                            handle.opponent_info_choice.getChildByName("scissor").getChildByName("card_number").getComponent(cc.RichText).string = "??";
                            handle.opponent_info_choice.getChildByName("stone").getChildByName("card_number").getComponent(cc.RichText).string = "??"
                        }
                    }
                }
            })
        }
    }
}

