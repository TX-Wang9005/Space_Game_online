
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/CameraManager');
require('./assets/Script/Game1Object/ChangingGround');
require('./assets/Script/Game2Object/PlayerGhost');
require('./assets/Script/Game2Object/TransGround');
require('./assets/Script/Game4Object/GameManagerCoin');
require('./assets/Script/Game4Object/PlayerCoin');
require('./assets/Script/Game4Object/coinManager');
require('./assets/Script/Game5Object/Mine_info_choice');
require('./assets/Script/Game5Object/TranGround_special');
require('./assets/Script/Game5Object/battle_field');
require('./assets/Script/Game5Object/fight_forum');
require('./assets/Script/Game5Object/fight_pressed');
require('./assets/Script/Game5Object/opponent_betting_update');
require('./assets/Script/Game5Object/panel_info');
require('./assets/Script/Game5Object/special_player');
require('./assets/Script/Game5Object/utility');
require('./assets/Script/GameEnd/GameEndManager');
require('./assets/Script/GameManager/GameManagerS1');
require('./assets/Script/GameManager/GameManagerS2');
require('./assets/Script/GameManager/GameManagerS3');
require('./assets/Script/GameManager/GameManagerS4');
require('./assets/Script/GameManager/GameManagerS5');
require('./assets/Script/InteractWall');
require('./assets/Script/LobbyManager');
require('./assets/Script/Player');
require('./assets/Script/UImanager');
require('./assets/Script/computer');
require('./assets/Script/computerRule');
require('./assets/Script/log');
require('./assets/Script/ready_to_S1');
require('./assets/Script/switching_from_waiting');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();