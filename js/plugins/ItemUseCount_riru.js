//=============================================================================
// ItemUseCount_riru.js
//=============================================================================
/*:
 * @plugindesc アイテムに使用回数を設定できます。
 * @author riru
 *
 * @help 
 *＜使い方＞
 *アイテムのメモ欄に下記のように記入する
 *<itemusecount:使用回数>
 *使用例：<itemusecount:3>
 *
 *
 * ＜規約＞
 * 有償無償問わず使用できます。改変もご自由にどうぞ。使用報告もいりません。２次配布は作成者を偽らなければOKです（ただし素材単品を有償でやりとりするのはNG）。
 *著作権は放棄していません。使用する場合は以下の作者とURLをreadmeなどどこかに記載してください
 *
 * ＜作者情報＞
 *作者：riru 
 *HP：ガラス細工の夢幻
 *URL：http://garasuzaikunomugen.web.fc2.com/index.html
 *＜更新履歴＞
 *11月11日　Ver1.03。使用回数のあるアイテムを買ってからすぐその場でそのアイテムを売り、再び同じアイテムを購入しようとすると、アイテムに使用回数が表示されない不具合を修正。
 *10月26日　Ver1.02。ゲームをリセットすると使用回数もリセットされる不具合を修正。購入画面では使用回数を反映しないように、売却個数決定画面では使用回数を表示しないように改造。
 *2016年10月7日　Ver1.01。アイテム使用回数を指定していないアイテムが消耗されてない、ショップ画面では回数の表示がなくなる不具合を修正。
 */

(function() {
item_use_count = [];

var _riru_loseItem = Game_Party.prototype.loseItem;
Game_Party.prototype.loseItem = function(item, amount, includeEquip) {
  _riru_loseItem.call(this,item, amount, includeEquip);
    //アイテムがない場合使用回数を0に
  /*  if (DataManager.isItem(item) && item.consumable && this.numItems(item) == 0){
      $gameParty.setItemuseCount(item,0);
      }*/
    if (DataManager.isItem(item) && item.consumable && this.numItems(item) == 0){
      $gameParty.setItemuseCount(item,item.meta.itemusecount);
      }
};
var _riru_consumeItem = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function(item) {
    if (DataManager.isItem(item) && item.consumable){
      if (item.meta.itemusecount == null){
       item.meta.itemusecount = 0;
      }
      if ($gameParty._item_use_count[item.id] == null){
        $gameParty.setItemuseCount(item,item.meta.itemusecount);
      }
    $gameParty._item_use_count[item.id] -= 1;
      // 使用回数が 0 の場合のみ消耗
      if ($gameParty._item_use_count[item.id] <= 0||item.meta.itemusecount<=0){
        _riru_consumeItem.call(this,item);
      $gameParty._item_use_count[item.id] = Number(item.meta.itemusecount);
      }
    }else{
        _riru_consumeItem.call(this,item);
    }
};
Game_Party.prototype.ItemuseCount = function(item) {
if (this._item_use_count == null)this._item_use_count = [];
      if (this._item_use_count[item.id] == null){
        this._item_use_count[item.id] = Number(item.meta.itemusecount);
      }
return this._item_use_count[item.id];
};
Game_Party.prototype.setItemuseCount = function(item,number) {
    this._item_use_count[item.id] = Number(number);
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
      if (DataManager.isItem(item) && item.consumable && $gameParty.ItemuseCount(item)>=1){
        this.drawText("("+$gameParty.ItemuseCount(item)+")"+item.name, x + iconBoxWidth, y, width - iconBoxWidth);
      }else{
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
      }  
    }
};
Window_ShopBuy.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
      if (DataManager.isItem(item) && item.consumable && $gameParty.ItemuseCount(item)>=1){
        this.drawText("("+item.meta.itemusecount+")"+item.name, x + iconBoxWidth, y, width - iconBoxWidth);
      }else{
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
      }  
    }
};
Window_ShopNumber.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};
})();

