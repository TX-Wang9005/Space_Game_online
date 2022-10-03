// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import PlayerGhost from "../Game2Object/PlayerGhost";
const { ccclass, property } = cc._decorator;
declare const firebase: any;

@ccclass
export default class GameManagerS2 extends cc.Component {
    
    @property(cc.Node)
    loadingBG: cc.Node = null;
    @property(cc.Node)
    SpaceBG: cc.Node = null;
    @property(cc.Node)
    GameoverBG: cc.Node = null;
    @property(cc.Node)
    TimerLabel: cc.Node = null;
    @property(cc.Node)
    GhostLabel: cc.Node = null;
    @property(cc.Node)
    StartText: cc.Node = null;

    @property(cc.AudioClip)
    BGM1: cc.AudioClip = null;
    @property(cc.AudioClip)
    BGM2: cc.AudioClip = null;
    @property(cc.AudioClip)
    ScoreSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    GameOverSound: cc.AudioClip = null;

    @property(cc.Prefab)
    becomeGhostEffect: cc.Prefab = null;

    @property()
    GameTime: number = 120;
    @property()
    GhostSpeed: number = 200;
    @property()
    PlayerSpeed: number = 100;

    private physicManager: cc.PhysicsManager = null;
    counting = 0;
    player_array = [];

    player_node1: cc.Node = null;
    player_node2: cc.Node = null;
    player_node3: cc.Node = null;
    player_node4: cc.Node = null;
    player_node5: cc.Node = null;

    private current_user_number: number = 0;

    private P_state: string[] = ["", "player", "player", "player", "player", "player"];
    private P_prevstate: string[] = ["", "player", "player", "player", "player", "player"];

    private cooldown: boolean = false;

    private timer: number = 0;
    private timeUp: boolean = false;



    onLoad() {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, 0);
        
        var uid = firebase.auth().currentUser.uid;
        let t = this;
        firebase.database().ref(`user_info/${uid}`).once('value', function (snapshot) {
            t.current_user_number = snapshot.val().player_number;
        });
    }

    start() {


        this.loadingBG.active = true;
        // 一開始所有玩家都不能動
        this.player_node1 = cc.find("Canvas/PlayerContainer/player1");
        this.player_node2 = cc.find("Canvas/PlayerContainer/player2");
        this.player_node3 = cc.find("Canvas/PlayerContainer/player3");
        this.player_node4 = cc.find("Canvas/PlayerContainer/player4");
        this.player_node5 = cc.find("Canvas/PlayerContainer/player5");
        if (this.player_node1) this.player_node1.getComponent(PlayerGhost).moveable = false;
        if (this.player_node2) this.player_node2.getComponent(PlayerGhost).moveable = false;
        if (this.player_node3) this.player_node3.getComponent(PlayerGhost).moveable = false;
        if (this.player_node4) this.player_node4.getComponent(PlayerGhost).moveable = false;
        if (this.player_node5) this.player_node5.getComponent(PlayerGhost).moveable = false;
        this.scheduleOnce(() => {
            this.loadingBG.active = false;
            if (this.player_node1) this.player_node1.getComponent(PlayerGhost).moveable = true;
            if (this.player_node2) this.player_node2.getComponent(PlayerGhost).moveable = true;
            if (this.player_node3) this.player_node3.getComponent(PlayerGhost).moveable = true;
            if (this.player_node4) this.player_node4.getComponent(PlayerGhost).moveable = true;
            if (this.player_node5) this.player_node5.getComponent(PlayerGhost).moveable = true;

            this.TimerStart();
            this.StartText.active = true;
            let action = cc.sequence(cc.fadeOut(0.5),cc.fadeIn(0.5),cc.fadeOut(0.5),cc.fadeIn(0.5),cc.fadeOut(0.5));
            this.StartText.runAction(action);
            cc.audioEngine.playMusic(this.BGM2, true);
            cc.audioEngine.setMusicVolume(3);
        }, 2.5);
        
        this.Init_player();

        // 五秒後選出鬼
        this.scheduleOnce(()=>{
            // this.choose_ghost(this.getRandomInt(this.player_array.length)); // 每個人開遊戲會random不一樣，所以這方法不行
            this.choose_ghost(1, -1);
            this.schedule(this.GetPlayerState, 0.3);
            this.StartText.active = false;
            if(1 == this.current_user_number){
                cc.audioEngine.playMusic(this.BGM1, true);
                cc.audioEngine.setMusicVolume(1);
            }
        }, 5);
        this.scheduleOnce(()=>{
            this.schedule(this.UpdateGroup, 0.3);
        }, 8);


        // SpaceBG Action
        let action:cc.Action;
        action = cc.repeatForever(cc.rotateBy(100,360));
        this.SpaceBG.runAction(action);

    }
    choose_ghost(Tobeghost_id: number, Peopleback_id: number) {  // 選定一人當鬼。
        console.log('Who fuck? ID:', Tobeghost_id);
        console.log("Player ARR:", this.player_array.length, this.player_array);
        //choose from player array
        let ghost_id = Tobeghost_id;// initially set player 1 to be ghost
        for (let i = 1; i < this.player_array.length+1; i++) {
            if (i == ghost_id) {
                // firebase
                firebase.database().ref(`game2/player${i}`).set({ type: "ghost" });
                // Make a ghost
                var Gnode = cc.find(`Canvas/PlayerContainer/player${i}`);
                var ghostBornEffect = cc.instantiate(this.becomeGhostEffect);
                cc.find(`Canvas/PlayerContainer/player${i}/Label`).getComponent(cc.Label).string="ghost";
                Gnode.setPosition(-176, 752);
                Gnode.group = 'ghost';
                Gnode.active = false;
                Gnode.active = true;
                Gnode.setPosition(-176, 752);
                Gnode.getComponent(PlayerGhost).moveable = false;
                Gnode.getComponent(PlayerGhost).playerSpeed = this.GhostSpeed;
                // play particle effect
                Gnode.parent.addChild(ghostBornEffect);
                ghostBornEffect.setPosition(Gnode.position);

                let action: cc.Action;
                var sequence1 = cc.sequence(cc.fadeTo(0.25, 120), cc.fadeIn(0.25), cc.scaleBy(0.1, 1.1));
                action = cc.repeat(sequence1, 5);
                Gnode.runAction(action);
                this.scheduleOnce(()=>{
                    Gnode.getComponent(PlayerGhost).moveable = true;
                }, 3)
                // make ghost end
            }
            else if(i == Peopleback_id){
                firebase.database().ref(`game2/player${i}`).set({ type: "player" });
                cc.find(`Canvas/PlayerContainer/player${i}/Label`).getComponent(cc.Label).string="player";
                var Pnode = cc.find(`Canvas/PlayerContainer/player${i}`);
                Pnode.setPosition(240, -48);
                Pnode.group = 'player';
                Pnode.active = false;
                Pnode.active = true;
                Pnode.getComponent(PlayerGhost).moveable = false;
                Pnode.getComponent(PlayerGhost).playerSpeed = this.PlayerSpeed;
                Pnode.runAction(cc.scaleTo(0.1, 1));
                let action: cc.Action;
                var sequence1 = cc.sequence(cc.fadeTo(0.25, 120), cc.fadeIn(0.25));
                action = cc.repeat(sequence1, 5);
                Pnode.runAction(action);
                this.scheduleOnce(()=>{
                    Pnode.getComponent(PlayerGhost).moveable = true;
                }, 2.5)
            }else {
                firebase.database().ref(`game2/player${i}`).set({ type: "player" });
                cc.find(`Canvas/PlayerContainer/player${i}/Label`).getComponent(cc.Label).string="player";
                var Nnode = cc.find(`Canvas/PlayerContainer/player${i}`);
                Nnode.group = 'player';
                Nnode.active = false;
                Nnode.active = true;
                Nnode.getComponent(PlayerGhost).playerSpeed = this.PlayerSpeed;
                Nnode.runAction(cc.scaleTo(0.5, 1));
            }

        }
    }
    // getRandomInt(max: number) {
    //     return Math.ceil(Math.random() * max);
    // }


    // update(dt) {
        
    // }

    Init_player(){
        let handle = this;
        // initialize players        
        for (let i = 1; i <= 5; i++) {
            firebase.database().ref(`player/player${i}_islogin`).once('value', function (snapshot) { // 如果玩家存在
                if (snapshot.val() == true) {
                    handle.player_array.push(i);
                    cc.find(`Canvas/PlayerContainer/player${i}`).active = true;
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveDirY`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/premoveDirX`).set({ Dir: 0 })
                    firebase.database().ref(`player_data/player${i}/state_value/moveable`).set({ moveable: "true" })
                    firebase.database().ref(`player_data/player${i}/state_value/X`).set({ x: 240 })
                    firebase.database().ref(`player_data/player${i}/state_value/Y`).set({ y: -48 })
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
        let P_state = this.P_state;
        this.scheduleOnce(() => {
            scoreboard.active = true;
            let str = "\n";
            str += P_state[1] + "\n";
            str += P_state[2] + "\n";
            str += P_state[3] + "\n";
            str += P_state[4] + "\n";
            str += P_state[5];
            scorepoint.string = str;
            cc.audioEngine.playEffect(this.ScoreSound, false);
        }, 3);
        this.scheduleOnce(()=>{
            let arr2 = [];
            for(let i=1;i<=5;i++){
                if(P_state[i] == 'player'){
                    arr2.push(30);
                }else if(P_state[i] == 'ghost'){
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
            firebase.database().ref(`GameResult/Round2`).set({
                player1: arr2[0],
                player2: arr2[1],
                player3: arr2[2],
                player4: arr2[3],
                player5: arr2[4],
            });
        }, 5);
        this.scheduleOnce(() => {
            cc.director.loadScene("GameStage4");
        }, 10);
    }

    GetPlayerState(){
        // console.log("Get player state!");
        // 看每個玩家的身分。
        let t = this;
        for(let i=1; i<=5; i++){
            firebase.database().ref(`game2/player${i}`).once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    // console.log("player",i, snapshot.val().type);
                    t.P_prevstate[i] = t.P_state[i];
                    t.P_state[i] = snapshot.val().type;
                    if(snapshot.val().type == 'ghost'){
                        t.GhostLabel.getComponent(cc.Label).string = "P"+i.toString();
                    }
                }
            })
        }
    }
    UpdateGroup(){
        // 根據身分更新。
        let t = this;
        let ghost_id = -1, back_id = -1;
        let change = false;
        for(let i=1; i<=5; i++){
            if(t.P_prevstate[i]=="player" && t.P_state[i]=="ghost"){ // 變成鬼
                console.log("player", i, "become ghost!!!!!!!!!");
                ghost_id = i;
                change = true;
            }else if(t.P_prevstate[i]=="ghost" && t.P_state[i]=="player"){ // 變回人
                console.log("player", i, "back to player!!!!!!!!!");
                back_id = i;
                change = true;
            }
        }
        if(change && !this.cooldown) {
            this.cooldown = true;
            this.choose_ghost(ghost_id, back_id);
            this.scheduleOnce(()=>{
                this.cooldown = false;
            }, 3);
            // 鬼BGM
            if(ghost_id == this.current_user_number){
                cc.audioEngine.stopMusic();
                cc.audioEngine.playMusic(this.BGM1, true);
                cc.audioEngine.setMusicVolume(1);
            }else if(back_id == this.current_user_number){
                cc.audioEngine.stopMusic();
                cc.audioEngine.playMusic(this.BGM2, true);
                cc.audioEngine.setMusicVolume(3);
            }
        }
        // console.log(t.P_prevstate, t.P_state);

    }
}
