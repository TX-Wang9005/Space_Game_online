// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Player from "../Player";
import ChangingGround from "../Game1Object/ChangingGround";

const { ccclass, property } = cc._decorator;
declare const firebase: any;

@ccclass
export default class GameManagerS1 extends cc.Component {


    @property(cc.Prefab)
    CG: cc.Prefab = null;

    @property(cc.Node)
    scorepoint: cc.Node = null;
    @property(cc.Node)
    loadingBG: cc.Node = null;
    @property(cc.Node)
    GameoverBG: cc.Node = null;
    @property(cc.Node)
    TimerLabel: cc.Node = null;


    @property()
    GameTime: number = 120;
    @property()
    WidthPixels: number = 1;
    @property()
    HeightPixels: number = 10;
    @property(cc.AudioClip)
    BGM: cc.AudioClip = null;
    @property(cc.AudioClip)
    ScoreSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    GameOverSound: cc.AudioClip = null;

    private current_user_number: number = 0;

    private player1_score: number = 0;
    private player2_score: number = 0;
    private player3_score: number = 0;
    private player4_score: number = 0;
    private player5_score: number = 0;
    private counting = 0;

    private physicManager: cc.PhysicsManager = null;
    private timer: number = 0;
    private timeUp: boolean = false;

    onLoad() {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);

        // 每個player node初始化位置。
        var user = firebase.auth().currentUser.uid;
        firebase.database().ref(`player_data`).once('value', function (snapshot) {
            snapshot.forEach(function (player) {
                let name = player.key;
                if (name == "player1" || name == "player2" || name == "player3" || name == "player4" || name == "player5") {
                    console.log("Initial player:", name);
                    firebase.database().ref(`player_data/${name}/state_value/moveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/${name}/state_value/moveDirY`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/${name}/state_value/premoveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/${name}/state_value/moveable`).set({ moveable: "true" })
                    firebase.database().ref(`player_data/${name}/state_value/X`).set({ x: 96 })
                    firebase.database().ref(`player_data/${name}/state_value/Y`).set({ y: 352 })
                }
            })
        })
        //
        let player_node_number = 0;
        firebase.database().ref(`user_info/${user}`).once('value', function (snapshot) {
            player_node_number = snapshot.val().player_number;
        }
        );
        this.scheduleOnce(() => {
            this.current_user_number = player_node_number;
            // console.log("current in S1:", this.current_user_number);
        }, 2.5);

    }

    start() {
        this.loadingBG.active = true;
        let player1 = cc.find("Canvas/PlayerContainer/player1");
        let player2 = cc.find("Canvas/PlayerContainer/player2");
        let player3 = cc.find("Canvas/PlayerContainer/player3");
        let player4 = cc.find("Canvas/PlayerContainer/player4");
        let player5 = cc.find("Canvas/PlayerContainer/player5");
        if (player1) player1.getComponent(Player).moveable = false;
        if (player2) player5.getComponent(Player).moveable = false;
        if (player3) player5.getComponent(Player).moveable = false;
        if (player4) player5.getComponent(Player).moveable = false;
        if (player5) player5.getComponent(Player).moveable = false;

        this.Init_player();
        this.scheduleOnce(() => {
            this.CreateCG();
        }, 1.5);
        this.scheduleOnce(() => {
            this.loadingBG.active = false;
            if (player1) player1.getComponent(Player).moveable = true;
            if (player2) player5.getComponent(Player).moveable = true;
            if (player3) player5.getComponent(Player).moveable = true;
            if (player4) player5.getComponent(Player).moveable = true;
            if (player5) player5.getComponent(Player).moveable = true;
            // 開始計時
            this.TimerStart();
            cc.audioEngine.playMusic(this.BGM, true);
            cc.audioEngine.setMusicVolume(0.5);
        }, 2.5);

        // firebase
        firebase.database().ref('GameOccupyLand/playerScore').set({ player1: 0, player2: 0, player3: 0, player4: 0, player5: 0 });

        this.schedule(this.UpdateScoreOnFirebase, 0.2);

    }

    update(dt) {

    }
    Init_player() {
        let handle = this;
        // initialize players
        for (let i = 1; i <= 5; i++) {
            firebase.database().ref(`player/player${i}_islogin`).once('value', function (snapshot) { // 如果玩家登入
                if (snapshot.val() == true) {
                    cc.find(`Canvas/PlayerContainer/player${i}`).active = true;
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirY`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/premoveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveable`).set({ moveable: "true" })
                    firebase.database().ref(`player_data/player${i}/state_value/X`).set({ x: 96 })
                    firebase.database().ref(`player_data/player${i}/state_value/Y`).set({ y: 352 })
                }
            })
        }
        // initial End
    }
    CreateCG() {
        // instantiate CG
        let x, y, x_max, y_max, xpos, ypos;
        x_max = this.WidthPixels;
        y_max = this.HeightPixels;
        let CGcontainer = cc.find("Canvas/MapObjContainer");
        for (x = 0; x < x_max; x++) {
            for (y = 0; y < y_max; y++) {
                xpos = x * 32 + 16 - 1152;
                ypos = y * 32 + 16 - 800;
                // Stage1 reburn at 96,352
                if ((xpos > -64 && xpos < 256 && ypos < 512 && ypos > 192)) continue;
                if ((xpos == 784 && ypos == 144) || (xpos == 816 && ypos == 144) || (xpos == 784 && ypos == -272) || (xpos == 816 && ypos == -272) || (xpos == -496 && ypos == 304) ||
                    (xpos == -464 && ypos == -496) || (xpos == -496 && ypos == -496) || (xpos == -976 && ypos == 208) || (xpos == -944 && ypos == 208) || (xpos == -784 && ypos == 48) ||
                    (xpos == -752 && ypos == 48) || (xpos == -976 && ypos == -208) || (xpos == -944 && ypos == -208) || (xpos == 0 && ypos == 0) || (xpos == 0 && ypos == 0))
                    continue;
                // console.log("Create CG in (",x,",",y,").");
                let CG = cc.instantiate(this.CG);
                CG.setPosition(xpos, ypos);
                CG.getComponent(ChangingGround).gameManager = this.node;
                CGcontainer.addChild(CG);
            }
        }
    }
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
        let point = scoreboard.getChildByName("Point").getComponent(cc.Label);
        let score_p1 = 0;
        let score_p2 = 0;
        let score_p3 = 0;
        let score_p4 = 0;
        let score_p5 = 0;
        firebase.database().ref('GameOccupyLand/playerScore').once('value', function (snapshot) {
            // console.log(snapshot.val().player2);
            score_p1 = snapshot.val().player1;
            score_p2 = snapshot.val().player2;
            score_p3 = snapshot.val().player3;
            score_p4 = snapshot.val().player4;
            score_p5 = snapshot.val().player5;
        });
        this.scheduleOnce(() => {
            scoreboard.active = true;
            let str = "\n";
            str += score_p1.toString() + "\n";
            str += score_p2.toString() + "\n";
            str += score_p3.toString() + "\n";
            str += score_p4.toString() + "\n";
            str += score_p5.toString();
            scorepoint.string = str;
            cc.audioEngine.playEffect(this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(() => {
            let arr = [], arr2 = [];
            arr.push(score_p1);
            arr.push(score_p2);
            arr.push(score_p3);
            arr.push(score_p4);
            arr.push(score_p5);
            let cnt = 0;
            for (let i = 0; i < 5; i++) {
                cnt = 0;
                for (let j = 0; j < 5; j++) {
                    if (arr[i] < arr[j]) cnt++;
                }
                if (arr[i] != 0) {
                    arr2.push(80 - 20 * cnt);
                } else {
                    arr2.push(0);
                }
            }
            let str = "";
            for (let i = 0; i < 5; i++) {
                str += "\n+ " + arr2[i].toString();
            }
            point.string = str;
            cc.audioEngine.playEffect(this.ScoreSound, false);
            // firebase
            firebase.database().ref(`GameResult/Round1`).set({
                player1: arr2[0],
                player2: arr2[1],
                player3: arr2[2],
                player4: arr2[3],
                player5: arr2[4],
            });
        }, 5);
        this.scheduleOnce(() => {
            cc.director.loadScene("GameStage2");
        }, 10);
    }
    //
    UpdateScore(player: number, point: number) {
        if (player == 1 && this.current_user_number == 1) {
            this.player1_score += point;
        } else if (player == 2 && this.current_user_number == 2) {
            this.player2_score += point;
        } else if (player == 3 && this.current_user_number == 3) {
            this.player3_score += point;
        } else if (player == 4 && this.current_user_number == 4) {
            this.player4_score += point;
        } else if (player == 5 && this.current_user_number == 5) {
            this.player5_score += point;
        }
    }
    UpdateScoreOnFirebase() {
        let score_p1 = this.player1_score;
        let score_p2 = this.player2_score;
        let score_p3 = this.player3_score;
        let score_p4 = this.player4_score;
        let score_p5 = this.player5_score;
        let current_user_number = this.current_user_number;
        if (current_user_number == 1) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                    player1: score_p1
                }
                );
        } else if (current_user_number == 2) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                    player2: score_p2
                }
                );
        } else if (current_user_number == 3) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                    player3: score_p3,
                }
                );
        } else if (current_user_number == 4) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                    player4: score_p4
                }
                );
        } else if (current_user_number == 5) {
            firebase.database().ref('GameOccupyLand/playerScore')
                .update({
                    player5: score_p5
                }
                );
        }
        firebase.database().ref('GameOccupyLand/playerScore').once('value', function (snapshot) {
            // console.log(snapshot.val().player2);
            score_p1 = snapshot.val().player1;
            score_p2 = snapshot.val().player2;
            score_p3 = snapshot.val().player3;
            score_p4 = snapshot.val().player4;
            score_p5 = snapshot.val().player5;
        });
        this.scheduleOnce(() => {
            if (current_user_number == 1) {
                let string = "\n";
                string += this.player1_score.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += score_p5.toString();
                this.scorepoint.getComponent(cc.Label).string = string;
            } else if (current_user_number == 2) {
                let string = "\n";
                string += score_p1.toString() + "\n";
                string += this.player2_score.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += score_p5.toString();
                this.scorepoint.getComponent(cc.Label).string = string;
            } else if (current_user_number == 3) {
                let string = "\n";
                string += score_p1.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += this.player3_score.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += score_p5.toString();
                this.scorepoint.getComponent(cc.Label).string = string;
            } else if (current_user_number == 4) {
                let string = "\n";
                string += score_p1.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += this.player4_score.toString() + "\n";
                string += score_p5.toString();
                this.scorepoint.getComponent(cc.Label).string = string;
            } else if (current_user_number == 5) {
                let string = "\n";
                string += score_p1.toString() + "\n";
                string += score_p2.toString() + "\n";
                string += score_p3.toString() + "\n";
                string += score_p4.toString() + "\n";
                string += this.player5_score.toString();
                this.scorepoint.getComponent(cc.Label).string = string;
            }
        }, 2)
    }
}
