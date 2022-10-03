import PlayerCoin from "./PlayerCoin";
import GameManagerCoin from "./GameManagerCoin";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CoinManager extends cc.Component {

    private GameMgr: cc.Node = null;

    onLoad () {

    }

    start () {
        this.GameMgr = cc.find("GameManager");
    }

    // update (dt) {}
    
    onBeginContact(contact, self, other) {
        if(other.node.group == 'Coinplayer'){
            // console.log("Coin!!");
            this.GameMgr.getComponent(GameManagerCoin).UpdateCoin(1, other.node.name);
            self.node.destroy();
        }
    }
}
