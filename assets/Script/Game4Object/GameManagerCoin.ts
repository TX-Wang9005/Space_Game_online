import PlayerCoin from "./PlayerCoin";

const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class GameManagerCoin extends cc.Component {

    @property(cc.Node)
    loadingBG: cc.Node = null; 
    @property(cc.Node)
    GameoverBG: cc.Node = null;
    @property(cc.Node)
    TimerLabel: cc.Node = null;
    @property(cc.Node)
    coinLabel: cc.Node = null;
    @property(cc.Node)
    killCountLabel: cc.Node = null;
    @property(cc.AudioClip)
    CoinSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    ThiefSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    StealCoinSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    BGM: cc.AudioClip = null;
    @property(cc.AudioClip)
    ScoreSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    GameOverSound: cc.AudioClip = null;

    @property(cc.Node)
    CoinContainer: cc.Node = null;
    @property()
    GameTime: number = 120;

    player_node1: cc.Node = null;
    player_node2: cc.Node = null;
    player_node3: cc.Node = null;
    player_node4: cc.Node = null;
    player_node5: cc.Node = null;

    private physicManager: cc.PhysicsManager = null;

    private current_user_number: number = 0;

    private timer: number = 0;
    private timeUp: boolean = false;

    current_coin: number = 0; // 用於記錄自己的Coin
    killcount: number = 0; // 用於記錄自己killcount
    killtimer: number = 0; 
    cooldown: boolean = false;

    onLoad () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        
        var uid = firebase.auth().currentUser.uid;
        let t = this;
        firebase.database().ref(`user_info/${uid}`).once('value', function (snapshot) {
            if(snapshot.val() != null){
                t.current_user_number = snapshot.val().player_number;
                console.log("Game Coin current_user_number is ", t.current_user_number);
            }
        });
    }

    start () {
        this.loadingBG.active = true;
        // 一開始所有玩家都不能動
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1) this.player_node1.getComponent(PlayerCoin).moveable = false;
        if (this.player_node2) this.player_node2.getComponent(PlayerCoin).moveable = false;
        if (this.player_node3) this.player_node3.getComponent(PlayerCoin).moveable = false;
        if (this.player_node4) this.player_node4.getComponent(PlayerCoin).moveable = false;
        if (this.player_node5) this.player_node5.getComponent(PlayerCoin).moveable = false;
        this.scheduleOnce(() => {
            this.loadingBG.active = false;
            if (this.player_node1) this.player_node1.getComponent(PlayerCoin).moveable = true;
            if (this.player_node2) this.player_node2.getComponent(PlayerCoin).moveable = true;
            if (this.player_node3) this.player_node3.getComponent(PlayerCoin).moveable = true;
            if (this.player_node4) this.player_node4.getComponent(PlayerCoin).moveable = true;
            if (this.player_node5) this.player_node5.getComponent(PlayerCoin).moveable = true;

            this.CoinContainer.active = true;
            this.TimerStart();
            cc.audioEngine.playMusic(this.BGM, true);
            cc.audioEngine.setMusicVolume(2);
        }, 3);        
        this.Init_player();
    }
    // update (dt) {}

    Init_player(){
        let handle = this;
        // initialize players  
        let arrX = [272, -672, -957, 607, 1680];
        let arrY = [96, 697, -893, -682, 433];
        for (let i = 1; i <= 5; i++) {
            firebase.database().ref(`player/player${i}_islogin`).once('value', function (snapshot) { // 如果玩家存在
                if (snapshot.val() == true) {
                    cc.find(`Canvas/PlayerContainer/player${i}`).active = true;
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirY`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/premoveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveable`).set({ moveable: "true" })
                    firebase.database().ref(`player_data/player${i}/state_value/X`).set({ x: arrX[i-1] })
                    firebase.database().ref(`player_data/player${i}/state_value/Y`).set({ y: arrY[i-1] })
                    firebase.database().ref(`GameCoin/player${i}`).set({ coin: 0, state: "player"});
                }
            })
        }
        // initial End
    }
    // timer
    TimerStart(){
        this.timer = this.GameTime;
        this.TimerLabel.getComponent(cc.Label).string = this.GameTime.toString();
        this.schedule(this.UpdateTimer, 1);
    }
    UpdateTimer(){
        if(this.timeUp) return;
        if(this.timer > 0) this.timer += -1;
        else if(this.timer == 0) this.timeUp = true;
        this.TimerLabel.getComponent(cc.Label).string = this.timer.toString();

        if(this.timeUp){
            this.GameOver();
        }        
    }
    GameOver(){
        cc.audioEngine.stopMusic();
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.GameOverSound, false);
        }, 0.5);
        this.GameoverBG.active = true;
        let scoreboard = this.GameoverBG.getChildByName("Score");
        let scorepoint = scoreboard.getChildByName("Scorepoint").getComponent(cc.Label);
        let point = scoreboard.getChildByName("Point").getComponent(cc.Label);
        let arr = [0,0,0,0,0];
        for(let i=1;i<=5;i++){
            firebase.database().ref(`GameCoin/player${i}`).once('value', function (snaphot){
                if(snaphot.val() != null){
                    console.log("player",i, "Coin",snaphot.val().coin);
                    arr[i-1] = snaphot.val().coin;
                }
            });
        }
        this.scheduleOnce(() => {
            scoreboard.active = true;
            let str = "\n";
            str += arr[0] + "\n";
            str += arr[1] + "\n";
            str += arr[2] + "\n";
            str += arr[3] + "\n";
            str += arr[4];
            scorepoint.string = str;
            cc.audioEngine.playEffect(this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(() => {
            let arr2 = [];
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
            firebase.database().ref(`GameResult/Round3`).set({
                player1: arr2[0],
                player2: arr2[1],
                player3: arr2[2],
                player4: arr2[3],
                player5: arr2[4],
            });
        }, 5);
        this.scheduleOnce(() => {
            cc.director.loadScene("GameStage5");
        }, 10);
    }

    UpdateKillCount(t: number){
        this.killcount += t;
        if(this.killcount < 0) this.killcount = 0;
        this.killCountLabel.getComponent(cc.Label).string = this.killcount.toString();
    }
    BecomeThief(player_name: string){
        let str = "player"+this.current_user_number.toString();
        if(str != player_name) return;
        if(this.killcount <= 0 || this.cooldown || this.timer < 20) {
            console.log("Can't be thief");
            return;
        }else{
            console.log("player", this.current_user_number,"BecomeThief!");
            if(this.ThiefSound) cc.audioEngine.playEffect(this.ThiefSound, false);
            this.cooldown = true;
            this.killtimer = 30;
            this.killcount += -1;
            this.killCountLabel.getComponent(cc.Label).string = this.killcount.toString();
            this.schedule(this.CooldownTimer, 1);
            // firebase
            let t = this;
            firebase.database().ref(`GameCoin/player${this.current_user_number}`).update({ state: "thief" });
            this.scheduleOnce(()=>{
                firebase.database().ref(`GameCoin/player${this.current_user_number}`).update({ state: "player" });
                // firebase
                let t = this;
                firebase.database().ref(`GameCoin/player${t.current_user_number}`).once('value', function(snaphot){
                    let c = snaphot.val().coin;
                    if(t.current_coin != c){ // 代表偷盜錢
                        if(t.StealCoinSound) cc.audioEngine.playEffect(t.StealCoinSound, false);
                    }
                    t.current_coin = c;
                    t.coinLabel.getComponent(cc.Label).string = c.toString();
                    
                });
            }, 15);
        }
    }
    CooldownTimer(){
        this.killtimer += -1;
        // console.log("BecomeThief Cooldown in", this.killtimer);
        if(this.killtimer <= 0){
            console.log("BecomeThief Cooldown!");
            this.killtimer = 0;
            this.cooldown = false;
            this.unschedule(this.CooldownTimer);
        }
    }
    UpdateCoin(coin: number, player_name: string){
        let str = "player"+this.current_user_number.toString();
        if(str != player_name) return;
        if(this.current_coin % 10 == 9) {
            this.UpdateKillCount(1);
            let p = cc.find(`Canvas/PlayerContainer/player${this.current_user_number}`);
            p.getComponent(PlayerCoin).playerSpeed *= 0.9;
            p.runAction(cc.scaleBy(0.5, 1.1));
        }
        if(this.CoinSound) cc.audioEngine.playEffect(this.CoinSound, false);
        // firebase
        let t = this;
        firebase.database().ref(`GameCoin/player${t.current_user_number}`).once('value', function(snaphot){
            let c = snaphot.val().coin;
            t.current_coin = c + coin;
            t.coinLabel.getComponent(cc.Label).string = t.current_coin.toString();
            firebase.database().ref(`GameCoin/player${t.current_user_number}`).update({ coin: t.current_coin });
        });
    }
    playerDie(player_name: string){
        let str = "player"+this.current_user_number.toString();
        if(str != player_name) return;
        // 金幣清零
        this.current_coin = 0;
        // firebase
        firebase.database().ref(`GameCoin/player${this.current_user_number}`).update({ coin: 0 });
        this.coinLabel.getComponent(cc.Label).string = this.current_coin.toString();
        // 速度 大小復原    
        let p = cc.find(`Canvas/PlayerContainer/player${this.current_user_number}`);
        p.getComponent(PlayerCoin).playerSpeed = 150;
        p.runAction(cc.scaleTo(0.1, 1));
        // 傳送復活點
        p.getComponent(PlayerCoin).rigidbody.linearVelocity = cc.v2(0, 0);
        // p.getComponent(PlayerCoin).moveable = false;
        let action: cc.Action;
        let s = cc.sequence(cc.fadeOut(0.3), cc.fadeIn(0.3));
        action = cc.repeat(s, 5);
        p.runAction(action);
        this.scheduleOnce(()=>{
            // p.getComponent(PlayerCoin).moveable = true;
        })
        // let arrX = [272, -672, -957, 607, 1680];
        // let arrY = [96, 697, -893, -682, 433];
        // p.setPosition(arrX[this.current_user_number-1], arrY[this.current_user_number-1]);
    }
}
