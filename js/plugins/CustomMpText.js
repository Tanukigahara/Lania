//=============================================================================
// CustomMpText.js
//=============================================================================

/*:ja
 * @plugindesc ステータス画面やバトルログの「ＭＰ」「MP」表示を、バトラーごとに任意のテキストに変更します。
 * @author 奏ねこま（おとぶきねこま）
 *
 * @help
 * 「ＭＰ」「MP」の表示を変更したいアクター、または敵キャラのメモ欄に、以下のよう
 * に、カンマ区切りで2つ記述してください。
 *
 * <custom_mp_text:魔力,魔>
 *
 * 前者は、MPダメージ時のバトルログ表示に使用されます。後者はステータス画面の表示
 * に使用されます。
 *
 * *このプラグインには、プラグインコマンドはありません。      
 *
 * [ 利用規約 ] .................................................................
 *  本プラグインの利用者は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  商用、非商用、ゲームの内容（年齢制限など）を問わず利用可能です。
 *  ゲームへの利用の際、報告や出典元の記載等は必須ではありません。
 *  二次配布や転載、ソースコードURLやダウンロードURLへの直接リンクは禁止します。
 *  （プラグインを利用したゲームに同梱する形での結果的な配布はOKです）
 *  不具合対応以外のサポートやリクエストは受け付けておりません。
 *  本プラグインにより生じたいかなる問題においても、一切の責任を負いかねます。
 * [ 改訂履歴 ] .................................................................
 *   Version 1.00  2016/09/05  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://i.gmobb.jp/nekoma/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */


(function () {
    'use strict';
    
    var _Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
    Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
        var  mpA = '';
        var _mpA = '';
        if (actor.actor().meta.custom_mp_text) {
            mpA = actor.actor().meta.custom_mp_text.trim().split(/ *, */)[1] || '';
        }
        if (mpA) {
            _mpA = $dataSystem.terms.basic[5];
            $dataSystem.terms.basic[5] = mpA;
        }
        _Window_Base_drawActorMp.call(this, actor, x, y, width);
        if (mpA) {
            $dataSystem.terms.basic[5] = _mpA;
        }
    };

    var _Window_BattleLog_makeMpDamageText = Window_BattleLog.prototype.makeMpDamageText;
    Window_BattleLog.prototype.makeMpDamageText = function(target) {
        var  mp = '';
        var _mp = '';
        var data = (target instanceof Game_Actor) ? target.actor() : target.enemy();
        if (data.meta.custom_mp_text) {
            mp = data.meta.custom_mp_text.trim().split(/ *, */)[0] || '';
        }
        if (mp) {
            _mp = $dataSystem.terms.basic[4];
            $dataSystem.terms.basic[4] = mp;
        }
        var ret = _Window_BattleLog_makeMpDamageText.call(this, target);
        if (mp) {
            $dataSystem.terms.basic[4] = _mp;
        }
        return ret;
    };

}());
