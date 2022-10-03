// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
declare const firebase: any;


@ccclass
export default class NewClass extends cc.Component {

  @property(cc.Node)
  log_forum: cc.Node = null;

  @property(cc.Node)
  account: cc.Node = null;

  @property(cc.Node)
  password: cc.Node = null;

  @property(cc.Node)
  close: cc.Node = null;
  @property(cc.Node)
  login2: cc.Node = null;
  @property(cc.Node)
  signin2: cc.Node = null;
  @property(cc.Node)
  player1: cc.Node = null;
  @property(cc.Node)
  player2: cc.Node = null;
  @property(cc.Node)
  player3: cc.Node = null;
  @property(cc.Node)
  player4: cc.Node = null;
  @property(cc.Node)
  player5: cc.Node = null;
  @property(cc.Node)
  spaceBG: cc.Node = null;
  @property(cc.Node)
  LoadingBG: cc.Node = null;
  @property(cc.Node)
  MutiTag: cc.Node = null;
  @property(cc.AudioClip)
  BGM: cc.AudioClip = null;
  @property(cc.AudioClip)
  click: cc.AudioClip = null;

  @property(cc.VideoPlayer)
  videoclip: cc.VideoPlayer = null;



  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // this.videoclip.node.on('ready-to-play', this.playvideo, this);
  }

  start() {
    cc.audioEngine.playMusic(this.BGM, true)
    console.log("1")
    let log_in_this = new cc.Component.EventHandler();
    console.log("1")
    log_in_this.target = this.node;
    log_in_this.component = "log";
    log_in_this.handler = "login_forum";
    cc.find("Canvas/UI/log_in").getComponent(cc.Button).clickEvents.push(log_in_this);
    let log_out_this = new cc.Component.EventHandler();
    log_out_this.target = this.node;
    log_out_this.component = "log";
    log_out_this.handler = "signin_forum";
    console.log("2")
    cc.find("Canvas/UI/sign_in").getComponent(cc.Button).clickEvents.push(log_out_this);
    console.log("2")
    let exit_game = new cc.Component.EventHandler();
    exit_game.target = this.node;
    exit_game.component = "log";
    exit_game.handler = "gameEnd";
    console.log("3")
    cc.find("Canvas/UI/EXIT").getComponent(cc.Button).clickEvents.push(exit_game);
    console.log("3")
    // get the user info
    let email_sign = new cc.Component.EventHandler();
    email_sign.target = this.node;
    email_sign.component = "log";
    email_sign.handler = "email_signin";
    cc.find("Canvas/UI/sign_in2").getComponent(cc.Button).clickEvents.push(email_sign);
    let email_log = new cc.Component.EventHandler();
    email_log.target = this.node;
    email_log.component = "log";
    email_log.handler = "email_login";
    cc.find("Canvas/UI/log_in2").getComponent(cc.Button).clickEvents.push(email_log);
    let close_log = new cc.Component.EventHandler();
    close_log.target = this.node;
    close_log.component = "log";
    close_log.handler = "close_forum";
    cc.find("Canvas/UI/close").getComponent(cc.Button).clickEvents.push(close_log);
    this.playerMove(Math.random() * 2);
    this.backgroundMove();


  }


  login_forum() {
    cc.audioEngine.playEffect(this.click, false)
    this.log_forum.active = true;
    this.account.active = true;
    this.password.active = true;
    this.login2.active = true;
    this.close.active = true;
  }
  signin_forum() {
    cc.audioEngine.playEffect(this.click, false)
    this.log_forum.active = true;
    this.account.active = true;
    this.password.active = true;
    this.signin2.active = true;
    this.close.active = true;
  }
  close_forum() {
    cc.audioEngine.playEffect(this.click, false)
    this.log_forum.active = false;
    this.account.active = false;
    this.password.active = false;
    this.signin2.active = false;
    this.login2.active = false;
    this.close.active = false;
  }

  email_signin() {
    var email = this.account.getComponent(cc.EditBox).string;
    console.log(email);
    var password = this.password.getComponent(cc.EditBox).string;
    console.log(password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("fuck yeah")
      })
      .catch((e) => {
        console.log(e);
      });
    cc.audioEngine.playEffect(this.click, false)
    this.close_forum();
  }

  email_login() {
    var email = this.account.getComponent(cc.EditBox).string;
    console.log(email);
    var password = this.password.getComponent(cc.EditBox).string;
    console.log(password);
    let t = this;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        (userCredential) => {
          var user_info = { email: email, uid: userCredential.user.uid, player_number: 0 };
          firebase
            .database()
            .ref("user_list")
            .on("value", function (snapshot) {
              //console.log("check1");
              var new_or_not = false;
              snapshot.forEach(function (childNodes) {
                var obj = childNodes.val();
                if (obj.uid == user_info.uid) {
                  new_or_not = true;
                }
              });
              if (!new_or_not) {
                //need to update player number
                firebase.database().ref('player/player_number').once('value', function (snapshot) {
                  //  console.log("wtf"+snapshot.val())
                  if (snapshot.val() == null) {
                    user_info = { email: email, uid: userCredential.user.uid, player_number: 1 };
                    //console.log("p2")
                    firebase.database().ref('player/player_number').set({ player_number: 1 })
                    //also set the player info
                    firebase.database().ref(`player_data/player${1}`).set(user_info)
                    firebase.database().ref("user_list").push(user_info);
                    firebase.database().ref("user_info/" + userCredential.user.uid).set(user_info);

                  }
                  else {
                    console.log(snapshot.val().player_number)
                    var number = snapshot.val().player_number;
                    let newnumber = parseInt(number, 10) + 1;
                    firebase.database().ref('player/player_number').set({ player_number: newnumber })
                    user_info = { email: email, uid: userCredential.user.uid, player_number: newnumber };
                    firebase.database().ref(`player_data/player${newnumber}`).set(user_info);
                    firebase.database().ref("user_list").push(user_info);
                    firebase.database().ref("user_info/" + userCredential.user.uid).set(user_info);
                  }
                })
                // firebase.database().ref("user_list").push(user_info);
                // firebase.database().ref("user_info/" + userCredential.user.uid).set(user_info);
              }
            });
          // firebase.auth().onAuthStateChanged(user=>{
          //  if(user){
          //   console.log("user info uid:"+ user.uid);
          //  }
          //  })
          t.LoadingBG.active = true;
          t.scheduleOnce(() => {
            cc.director.loadScene("Lobby");
          }, 2);
        })
      .catch((e) => {
        console.log(e);
      });
    cc.audioEngine.playEffect(this.click, false)
  };
  playerMove(delayTime: number) {
    let easeRate: number = 2;
    let action1: cc.Action;
    let action2: cc.Action;
    let action3: cc.Action;
    let action4: cc.Action;
    let action5: cc.Action;
    var sequence1 = cc.sequence(cc.moveBy(2.5, 0, 25).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(3.5, 0, -25).easing(cc.easeInOut(easeRate)));
    var sequence2 = cc.sequence(cc.moveBy(2, -10, 25).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(2, 10, -25).easing(cc.easeInOut(easeRate)));
    var sequence3 = cc.sequence(cc.moveBy(2.5, -20, -10).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(1.5, 20, 10).easing(cc.easeInOut(easeRate)));
    var sequence4 = cc.sequence(cc.moveBy(4, 20, 15).easing(cc.easeInOut(easeRate)), cc.delayTime(0.2), cc.moveBy(4, -20, -15).easing(cc.easeInOut(easeRate)));
    var sequence5_1 = cc.sequence(cc.moveTo(0, -580, 180), cc.moveBy(10, 1200, -100),
      cc.delayTime(1), cc.moveTo(0, 0, -450), cc.moveBy(10, -200, 900),
      cc.delayTime(1), cc.moveTo(0, 260, 450), cc.moveBy(10, -1000, -900),
      cc.delayTime(5));
    var sequence5_2 = cc.sequence(cc.rotateBy(10, 360), cc.delayTime(1), cc.rotateBy(10, -360), cc.delayTime(1), cc.rotateBy(10, -360), cc.delayTime(5));
    var sequence5 = cc.spawn(sequence5_1, sequence5_2);


    action1 = cc.repeatForever(sequence1);
    action2 = cc.repeatForever(sequence2);
    action3 = cc.repeatForever(sequence3);
    action4 = cc.repeatForever(sequence4);
    action5 = cc.repeatForever(sequence5);

    this.scheduleOnce(() => {
      this.player1.runAction(action1);
      this.player2.runAction(action2);
      this.player3.runAction(action3);
      this.player4.runAction(action4);
      this.player5.runAction(action5);
    }, 1);

    // ================================================
  }
  backgroundMove() {
    let action: cc.Action;
    // var sequence = cc.sequence(cc.rotateBy(20, 360));
    // action = cc.repeatForever(sequence);
    action = cc.repeatForever(cc.rotateBy(100, 360));
    this.spaceBG.setScale(1.5, 1.5);
    this.spaceBG.runAction(action);

    var s = cc.sequence(cc.scaleTo(1.5, 0.6).easing(cc.easeInOut(2)), cc.scaleTo(1.5, 0.5).easing(cc.easeInOut(2)), cc.delayTime(1));
    action = cc.repeatForever(s);
    this.MutiTag.runAction(action);
  }

  // playvideo(event) {
  //   console.log("HI")
  //   this.videoclip.play();
  // }
  showWindow() {

  }
  gameEnd() {
    cc.game.end();
  }

  // update (dt) {}
}