//=============================================================================
// NGT_MpDamageEffect.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// Version
//
// 1.0.0 2018/04/29 ・初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================

/*:ja
 * @plugindesc MPダメージを受けた場合もヒットエフェクトを表示します。
 * プラグイン管理では、YEP_BattleEngineCore.jsよりも下に設定してください。
 * 
 * @help 当該プラグインの状態をONにすると、
 * MPダメージ時にヒットエフェクトを表示するようになります。
 * 
 * @author ベルファーレ長田（゜∀゜）◆AHYA/HaiA.
 */
( function() {
    'use strict';
    var pluginName = 'NGT_MpDamageEffect';
    
	var _Game_Battler_performResultEffects = Game_Battler.prototype.performResultEffects;
    Game_Battler.prototype.performResultEffects = function() {
        _Game_Battler_performResultEffects.apply( this, arguments );
        var result = this.result();
        if (this.isAlive() && result.mpDamage !== 0 && result.mpDamage > 0) {
            this.performDamage();
        }
    };

	var _Window_BattleLog_displayMpDamage = Window_BattleLog.prototype.displayMpDamage;
    Window_BattleLog.prototype.displayMpDamage = function(target) {
        if (target.isAlive() && target.result().mpDamage !== 0) {
            if (target.result().mpDamage > 0) {
                this.push('performDamage', target);
            }
        }
        _Window_BattleLog_displayMpDamage.apply( this, arguments );
    };
})();