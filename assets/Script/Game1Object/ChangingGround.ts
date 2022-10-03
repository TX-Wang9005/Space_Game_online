import GameManagerS1 from "../GameManager/GameManagerS1";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChangingGround extends cc.Component {

    
    @property(cc.Node)
    gameManager: cc.Node = null;
    @property(cc.SpriteFrame)
    FrameDefault: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    Frame1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    Frame2: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    Frame3: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    Frame4: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    Frame5: cc.SpriteFrame = null;

    private SpriteComponent: cc.Sprite;
    private GameComponent: GameManagerS1;

    private gamestart: boolean = false;

    private owner: number = 0;

    private fadeOuttime: number = 0.05;
    private fadeIntime: number = 0.2;

    // onLoad () {}

    start () {
        this.GameComponent = this.gameManager.getComponent(GameManagerS1);
        this.SpriteComponent = this.node.getComponent(cc.Sprite);
        // console.log(this.SpriteComponent.spriteFrame);
        this.SpriteComponent.spriteFrame = this.FrameDefault;
        
        // this.SpriteComponent.spriteFrame = this.Frame1;
        // let action: cc.Action;
        // action = cc.sequence(cc.fadeTo(this.fadeOuttime,0), cc.fadeTo(this.fadeIntime,75), cc.fadeTo(this.fadeIntime*10,175));
        // this.node.runAction(action);
    }

    // update (dt) {}
    onBeginContact(contact, self, other){
        // if(!this.gamestart) return;
        let action: cc.Action;
        action = cc.sequence(cc.fadeTo(this.fadeOuttime,0), cc.fadeTo(this.fadeIntime,75), cc.fadeTo(this.fadeIntime*10,175));
        if(other.node.name == "player1"){
            if(this.owner != 1){
                this.node.runAction(action);
                this.GameComponent.UpdateScore(1, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 1;
            this.scheduleOnce(()=>{
                this.SpriteComponent.spriteFrame = this.Frame1;
            }, this.fadeOuttime);

        }else if(other.node.name == "player2"){
            if(this.owner != 2){
                this.node.runAction(action);
                this.GameComponent.UpdateScore(2, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 2;
            this.scheduleOnce(()=>{
                this.SpriteComponent.spriteFrame = this.Frame2;
            }, this.fadeOuttime);

        }else if(other.node.name == "player3"){
            if(this.owner != 3){
                this.node.runAction(action);
                this.GameComponent.UpdateScore(3, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 3;
            this.scheduleOnce(()=>{
                this.SpriteComponent.spriteFrame = this.Frame3;
            }, this.fadeOuttime);

        }else if(other.node.name == "player4"){
            if(this.owner != 4){
                this.node.runAction(action);
                this.GameComponent.UpdateScore(4, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 4;
            this.scheduleOnce(()=>{
                this.SpriteComponent.spriteFrame = this.Frame4;
            }, this.fadeOuttime);

        }else if(other.node.name == "player5"){
            if(this.owner != 5){
                this.node.runAction(action);
                this.GameComponent.UpdateScore(5, 1);
                this.GameComponent.UpdateScore(this.owner, -1);
            }
            this.owner = 5;
            this.scheduleOnce(()=>{
                this.SpriteComponent.spriteFrame = this.Frame5;
            }, this.fadeOuttime);
        }
    }
}
