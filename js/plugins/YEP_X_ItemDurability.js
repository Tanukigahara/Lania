//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Durability
// YEP_X_ItemDurability.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemDurability = true;

var Yanfly = Yanfly || {};
Yanfly.IDur = Yanfly.IDur || {};
Yanfly.IDur.version = 1.04;

//=============================================================================
 /*:
  * @plugindesc v1.04 (要YEP_ItemCore)装備に耐久値を持たせ耐久値が切れると破壊されるシステムを導入
 * @author Yanfly Engine Plugins
 *
 * @param ---デフォルト---
 * @text ---デフォルト---
 * @default
 *
 * @param Default Durability
 * @text 耐久値
 * @parent ---デフォルト---
 * @desc 製造時の装備のデフォルトの耐久値。耐久値を非設定にするには-1に
 * @default 100
 *
 * @param Durability Variance
 * @text 耐久値分散
 * @parent ---デフォルト---
 * @type number
 * @desc 耐久値に対するランダム分散値
 * @default 5
 *
 * @param Durability Maximum
 * @text 最大耐久値
 * @parent ---デフォルト---
 * @type number
 * @min 1
 * @desc 耐久値のデフォルトの最大値
 * @default 200
 *
 * @param ---耐久値低下---
 * @text ---耐久値低下---
 * @default
 *
 * @param Physical Action
 * @text 物理攻撃
 * @parent ---耐久値低下---
 * @desc 物理攻撃の実行時、装備している全武器の耐久値を落とす値
 * @default -1
 *
 * @param Magical Action
 * @text 魔法攻撃
 * @parent ---耐久値低下---
 * @desc 魔法攻撃の実行時、装備している全武器の耐久値を落とす値
 * @default 0
 *
 * @param Certain Action
 * @text 必中
 * @parent ---耐久値低下---
 * @desc 必中の実行時、装備している全武器の耐久値を落とす値
 * @default 0
 *
 * @param Damage All Armor
 * @text 全防具ダメージ
 * @parent ---耐久値低下---
 * @type boolean
 * @on 全て
 * @off ランダム
 * @desc ダメージを受けた時、耐久値が低下する防具
 * ランダム:false / 全て:true
 * @default false
 *
 * @param Physical Damage
 * @text 物理ダメージ
 * @parent ---耐久値低下---
 * @desc 物理攻撃の実行時、装備している全武器の耐久値を落とす値
 * @default -2
 *
 * @param Magical Damage
 * @text 魔法ダメージ
 * @parent ---耐久値低下---
 * @desc 魔法攻撃の実行時、装備している全武器の耐久値を落とす値
 * @default -1
 *
 * @param Certain Damage
 * @text 必中ダメージ
 * @parent ---耐久値低下---
 * @desc 必中の実行時、装備している全武器の耐久値を落とす値
 * @default -1
 *
 * @param ---破壊---
 * @text ---破壊---
 * @default
 *
 * @param Broken Text
 * @text 破壊テキスト
 * @parent ---破壊---
 * @desc アイテムが戦闘中に壊れた時の表示テキスト
 * %1:使用者名 / %2:アイテム名 / %3:アイコン
 * @default %1の %3%2 は壊れた!
 *
 * @param Broken Wait
 * @text 破壊ウェイト
 * @parent ---破壊---
 * @desc YEP_BattleEngineCore使用時、メッセージが待機するフレーム数
 * @default 60
 *
 * @param Break Sound
 * @text 破壊SE
 * @parent ---破壊---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc デフォルト破壊SEのファイル名。大文字と小文字を区別します。ファイル拡張子を含めないでください。
 * @default Crash
 *
 * @param Break Volume
 * @text 破壊音量
 * @parent ---破壊---
 * @desc デフォルトの破壊音量
 * @default 100
 *
 * @param Break Pitch
 * @text 破壊音ピッチ
 * @parent ---破壊---
 * @desc デフォルト破壊音ピッチ
 * @default 150
 *
 * @param Break Pan
 * @text 破壊音パン
 * @parent ---破壊---
 * @desc デフォルト破壊音パン
 * @default 0
 *
 * @param ---修復---
 * @text ---修復---
 * @default
 *
 * @param Show Repair
 * @text 修復表示
 * @parent ---修復---
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc 装備を選択時、装備修復のオプションを表示
 * 非表示:false / 表示:true
 * @default true
 *
 * @param Enable Repair
 * @text 修復有効
 * @parent ---修復---
 * @type boolean
 * @on 有効
 * @off 無効
 * @desc 装備修復オプションを有効
 * 無効:false / 有効:true
 * @default true
 *
 * @param Repair Command
 * @text 修復コマンド
 * @parent ---修復---
 * @desc 装備修復を選択時の表示テキスト
 * %1:装備名
 * @default %1 を修復
 *
 * @param Repair Sound
 * @text 修復SE
 * @parent ---修復---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc デフォルトの修復SEファイル名。大文字と小文字を区別します。ファイル拡張子を含めないでください。
 * @default Skill2
 *
 * @param Repair Volume
 * @text 修復音量
 * @parent ---修復---
 * @desc デフォルト修復音量
 * @default 100
 *
 * @param Repair Pitch
 * @text 修復音ピッチ
 * @parent ---修復---
 * @desc デフォルト修復音ピッチ
 * @default 150
 *
 * @param Repair Pan
 * @text 修復音パン
 * @parent ---修復---
 * @desc デフォルト修復音パン
 * @default 0
 *
 * @param ---情報ウィンドウ---
 * @text ---情報ウィンドウ---
 * @default
 *
 * @param Show Durability
 * @text 耐久値表示
 * @parent ---情報ウィンドウ---
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc 装備の耐久値を表示
 * 非表示:false / 表示:true
 * @default true
 *
 * @param Durability Text
 * @text 耐久値テキスト
 * @parent ---情報ウィンドウ---
 * @desc 耐久値の表示テキスト
 * @default 耐久値
 *
 * @param Durability Format
 * @text 耐久値表示形式
 * @parent ---情報ウィンドウ---
 * @desc 耐久値の表示形式
 * %1:現在の耐久値 / %2:最大の耐久値
 * @default %1
 *
 * @param Show Unbreakable
 * @text 破壊不可アイテムの耐久値表示
 * @parent ---情報ウィンドウ---
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc 壊れないアイテムの耐久値の表示
 * 非表示:false / 表示:true
 * @default true
 *
 * @param Unbreakable Text
 * @text 破壊不可のテキスト
 * @parent ---情報ウィンドウ---
 * @desc 壊れないアイテムの表示テキスト
 * @default 破壊不可
 *
 * @param ---耐久値色---
 * @text ---耐久値色---
 * @default
 *
 * @param Unbreakable
 * @text 破壊不可
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 破壊不可アイテムのテキスト色
 * @default 23
 *
 * @param Max Durability
 * @text 最大耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値が最大値のテキスト色
 * @default 29
 *
 * @param 190% Durability
 * @text 190% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの190%を超えたテキスト色
 * @default 29
 *
 * @param 175% Durability
 * @text 175% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの175%を超えたテキスト色
 * @default 24
 *
 * @param 150% Durability
 * @text 150% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの150%を超えたテキスト色
 * @default 24
 *
 * @param 120% Durability
 * @text 120% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの120%を超えたテキスト色
 * @default 4
 *
 * @param 110% Durability
 * @text 110% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの110%を超えたテキスト色
 * @default 0
 *
 * @param 100% Durability
 * @text 100% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの100%を超えたテキスト色
 * @default 0
 *
 * @param 80% Durability
 * @text 80% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの80%を超えたテキスト色
 * @default 0
 *
 * @param 50% Durability
 * @text 50% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの50%を超えたテキスト色
 * @default 6
 *
 * @param 25% Durability
 * @text 25% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの25%を超えたテキスト色
 * @default 17
 *
 * @param 10% Durability
 * @text 10% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの10%を超えたテキスト色
 * @default 2
 *
 * @param 1% Durability
 * @text 1% 耐久値
 * @parent ---耐久値色---
 * @type number
 * @max 31
 * @desc 耐久値がデフォルトの1%を超えたテキスト色
 * @default 18
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * ===========================================================================
 * 導入
 * ===========================================================================
 *
 * このプラグインはYEP_ItemCoreを必要とします。
 * プラグイン管理でYEP_ItemCoreの下にこのプラグインを配置してください。
 *
 * 独立武器と防具は、耐久値を持ちます。
 * 戦闘の過程で、装備の耐久値は実行された行動、
 * 受けた攻撃などに基づいて低下します。
 * 装備の耐久値が0になると、装備は壊れます。
 * 耐久値はアイテムによって修復され、スキルによっても向上します。
 *
 * ===========================================================================
 * メモタグ
 * ===========================================================================
 *
 * 以下のメモタグは、装備の耐久値を調整するために使用します。
 *
 * 武器、防具のメモタグ
 *
 *   <Durability: x>
 *   装備のデフォルトの耐久値をxに設定します。
 *   装備の初期耐久値です。
 *   このメモタグが使用されていない場合、
 *   独立した装備はプラグインパラメータの値を参照します。
 *
 *   <Durability Variance: x>
 *   xの分散で初期の耐久値を変更します。
 *   耐久値の開始値に-xから+xまでの変動があることを意味します。
 *
 *   <Durability Maximum: x>
 *   独立した装備が持つことができる最大の耐久値です。
 *   耐久値を修復する時、
 *   装備の耐久値はこの量を超えることができません。
 *   この量は基本の耐久値に依存します。
 *
 *   <Bypass Durability>
 *   <Unbreakable>
 *   装備が壊れなくなります。
 *
 *   <Break Sound Name: filename>
 *   <Break Sound Volume: x>
 *   <Break Sound Pitch: x>
 *   <Break Sound Pan: +x>
 *   <Break Sound Pan: -x>
 *   戦闘中に装備を使用して壊れた時に再生される効果音が変わります。
 *   ファイル名は大文字と小文字が区別され、ファイル拡張子を含めません。
 *
 * アイテム、武器、防具のメモタグ
 *
 *   <Repair Durability: x>
 *   耐久値がx倍になります。
 *   修復効果は、武器や防具のアクションメニューからアクセスできます。
 *
 *   <Repair Weapon: x>
 *   <Repair Armor: x>
 *   特に武器や防具だけをxの量で修復します。
 *   修復効果は、武器や防具のアクションメニューからアクセスできます。
 *
 *   <Repair WType x: y>
 *   <Repair AType x: y>
 *   特に武器タイプや防具タイプだけをxの量で修復します。
 *   修復効果は、武器や防具のアクションメニューからアクセスできます。
 *
 *   <Repair Sound Name: filename>
 *   <Repair Sound Volume: x>
 *   <Repair Sound Pitch: x>
 *   <Repair Sound Pan: +x>
 *   <Repair Sound Pan: -x>
 *   このアイテムを使用して他のアイテムの耐久値を修復する時、
 *   再生される効果音を変更します。
 *
 *   <Unbreakable Durability>
 *   壊れなくなります。
 *
 *   <Unbreakable Weapon>
 *   <Unbreakable Armor>
 *   武器や防具の耐久値を取り除き、壊れなくなります。
 *
 *   <Unbreakable WType x>
 *   <Unbreakable AType x>
 *   特に武器タイプのx防具タイプのxの耐久値を取り除き、
 *   壊れなくなります。
 *   ファイル名は大文字と小文字を区別し、ファイル拡張子を含めません。
 *
 * スキル、アイテムのメモタグ
 *
 *   <User Weapon Durability: +x>
 *   <User Weapon Durability: -x>
 *   このスキル/アイテムが命中する度に、
 *   全ての使用者の武器の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、武器は壊れます。
 *
 *   <User All Weapon Durability: +x>
 *   <User All Weapon Durability: -x>
 *   このスキル/アイテムが命中する度に、
 *   全ての使用者の武器の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、武器は壊れます。
 *
 *   <User Random Weapon Durability: +x>
 *   <User Random Weapon Durability: -x>
 *   このスキル/アイテムが命中する度に、
 *   使用者が装備したランダムな武器の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、武器は壊れます。
 *
 *   <User Armor Durability: +x>
 *   <User Armor Durability: -x>
 *   このスキル/アイテムが命中する度に、
 *   使用者の防具の耐久値が+x・-x変更されます。
 *   'DamageAll'プラグインパラメータに応じて、
 *   全ての防具に影響を与えるか、
 *   ランダムな防具に影響を与えます。
 *   アイテムが0以下になると、防具は破壊されます。
 *
 *   <User All Armor Durability: +x>
 *   <User All Armor Durability: -x>
 *   このスキル/アイテムが命中する度に、
 *   全ての使用者の防具の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、防具は壊れます。
 *
 *   <User Random Armor Durability: +x>
 *   <User Random Armor Durability: -x>
 *   このスキル/アイテムを命中する度に、
 *   使用者が装備したランダムな防具の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、防具は壊れます。
 *
 *   <Target Weapon Durability: +x>
 *   <Target Weapon Durability: -x>
 *   このスキル/アイテムを命中する度に、
 *   対象の武器の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、武器は壊れます。
 *
 *   <Target All Weapon Durability: +x>
 *   <Target All Weapon Durability: -x>
 *   このスキル/アイテムを命中する度に、
 *   対象の全武器の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、武器は壊れます。
 *
 *   <Target Random Weapon Durability: +x>
 *   <Target Random Weapon Durability: -x>
 *   このスキル/アイテムが命中する度に、
 *   対象のランダムな武器の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、武器は壊れます。
 *
 *   <Target Armor Durability: +x>
 *   <Target Armor Durability: -x>
 *   このスキル/アイテムが命中する度に、
 *   対象の防具の耐久値が+x・-x変更されます。
 *   'DamageAll'プラグインパラメータに応じて、
 *   全ての防具か、ランダムな防具に影響を与えます。
 *   耐久値が0以下になると、防具は破壊されます。
 *
 *   <Target All Armor Durability: +x>
 *   <Target All Armor Durability: -x>
 *   このスキル/アイテムが命中する度に、
 *   対象の全防具の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、防具は壊れます。
 *
 *   <Target Random Armor Durability: +x>
 *   <Target Random Armor Durability: -x>
 *   このスキル/アイテムが命中する度に、
 *   対象のランダムな防具の耐久値が+x・-x変更されます。
 *   耐久値が0以下になると、防具は壊れます。
 *
 * ===========================================================================
 * ルナティックモード - カスタム破壊効果
 * ===========================================================================
 *
 * JavaScriptと下記のメモタグで、武器や防具を壊した時、
 * 特殊効果を持たせることができます。
 *
 * 武器、防具のメモタグ
 *
 *   <Custom Break Effect>
 *    var newItem = $dataitems[1];
 *    $gameParty.gainItem(newItem, 1);
 *   </Custom Break Effect>
 *   この効果は、耐久値がアクションから0以下になり
 *   装備が壊れた場合のみ発生します。
 *
 * ===========================================================================
 * ルナティックモード - カスタム修復効果
 * ===========================================================================
 *
 * JavaScriptと下記のメモタグで、装備の修復に使用された時、
 * 修復アイテムにカスタム効果を実行させることができます。
 *
 * アイテム、武器、防具のメモタグ
 *
 *   <Custom Repair Effect>
 *    item.price += 200;
 *   </Custom Repair Effect>
 *   'item'変数は修復されているアイテムを参照します。
 *   それに対する変更は、独立アイテムに保存されます。
 *
 * ===========================================================================
 * ルナティックモード - カスタム装備耐久値変更
 * ===========================================================================
 *
 * JavaScriptと下記のメモタグで、
 * スキルとアイテムのアクションで対象の装備の耐久値を変更することができます。
 *
 * スキル、アイテムのメモタグ
 *
 *   ---
 *
 *   <Custom User All Weapon Durability>
 *    value -= user.atk;
 *   </Custom User All Weapon Durability>
 *
 *   <Custom User Random Weapon Durability>
 *    value -= user.atk;
 *   </Custom User Random Weapon Durability>
 *
 *   <Custom User All Armor Durability>
 *    value -= user.atk;
 *   </Custom User All Armor Durability>
 *
 *   <Custom User Random Armor Durability>
 *    value -= user.atk;
 *   </Custom User Random Armor Durability>
 *   'value'変数は使用者の武器/防具に与える影響を決定します。
 *   'value'がマイナスの場合、耐久値は低下します。
 *   'value'が正の値であれば、耐久値は向上します。
 *   耐久値が0以下になると、装備は壊れます。
 *
 *   ---
 *
 *   <Custom Target All Weapon Durability>
 *    value -= user.atk;
 *   </Custom Target All Weapon Durability>
 *
 *   <Custom Target Random Weapon Durability>
 *    value -= user.atk;
 *   </Custom Target Random Weapon Durability>
 *
 *   <Custom Target All Armor Durability>
 *    value -= user.atk;
 *   </Custom Target All Armor Durability>
 *
 *   <Custom Target Random Armor Durability>
 *    value -= user.atk;
 *   </Custom Target Random Armor Durability>
 *   'value'変数は対象の武器/防具に与える影響を決定します。
 *   'value'がマイナスの場合、耐久値は低下します。
 *   'value'が正の値であれば、耐久値は向上します。
 *   耐久値が0以下になると、装備は壊れます。
 *
 * ===========================================================================
 * プラグインコマンド
 * ===========================================================================
 *
 * アイテムアクションウィンドウで修復オプションを表示/非表示にしたり、
 * 有効/無効にするために利用できるプラグインコマンドがあります。
 *
 * プラグインコマンド
 *
 *   ShowRepairDurability
 *   HideRepairDurability
 *   - アイテムアクションウィンドウに修復コマンドを表示/非表示にします。
 *
 *   EnableRepairDurability
 *   DisableRepairDurability
 *   - アイテムアクションウィンドウの修復コマンドを有効/無効にします。
 *
 * ===========================================================================
 * Changelog
 * ===========================================================================
 *
 * Version 1.04:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.02:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.01a:
 * - Updated for RPG Maker MV version 1.1.0.
 * - Optimization update.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_ItemCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ItemDurability');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IDurDefaultDur = Number(Yanfly.Parameters['Default Durability']);
Yanfly.Param.IDurDefaultVar = Number(Yanfly.Parameters['Durability Variance']);
Yanfly.Param.IDurDefaultMax = Number(Yanfly.Parameters['Durability Maximum']);
Yanfly.Param.IDurDefaultMax = Math.max(1, Yanfly.Param.IDurDefaultMax);

Yanfly.Param.IDurPhysicalAction = Number(Yanfly.Parameters['Physical Action']);
Yanfly.Param.IDurMagicalAction = Number(Yanfly.Parameters['Magical Action']);
Yanfly.Param.IDurCertainAction = Number(Yanfly.Parameters['Certain Action']);
Yanfly.Param.IDurDamageAllArmor = String(Yanfly.Parameters['Damage All Armor']);
Yanfly.Param.IDurDamageAllArmor = eval(Yanfly.Param.IDurDamageAllArmor);
Yanfly.Param.IDurPhysicalDmg = Number(Yanfly.Parameters['Physical Damage']);
Yanfly.Param.IDurMagicalDmg = Number(Yanfly.Parameters['Magical Damage']);
Yanfly.Param.IDurCertainDmg = Number(Yanfly.Parameters['Certain Damage']);

Yanfly.Param.IDurBrokenText = String(Yanfly.Parameters['Broken Text']);
Yanfly.Param.IDurBrokenWait = Number(Yanfly.Parameters['Broken Wait']);
Yanfly.Param.IDurBreakName = String(Yanfly.Parameters['Break Sound']);
Yanfly.Param.IDurBreakVol = Number(Yanfly.Parameters['Break Volume']);
Yanfly.Param.IDurBreakPitch = Number(Yanfly.Parameters['Break Pitch']);
Yanfly.Param.IDurBreakPan = Number(Yanfly.Parameters['Break Pan']);

Yanfly.Param.IDurShowRepair = eval(String(Yanfly.Parameters['Show Repair']));
Yanfly.Param.IDurEnRepair = eval(String(Yanfly.Parameters['Enable Repair']));
Yanfly.Param.IDurCmdRepair = String(Yanfly.Parameters['Repair Command']);
Yanfly.Param.IDurRepairName = String(Yanfly.Parameters['Repair Sound']);
Yanfly.Param.IDurRepairVol = Number(Yanfly.Parameters['Repair Volume']);
Yanfly.Param.IDurRepairPitch = Number(Yanfly.Parameters['Repair Pitch']);
Yanfly.Param.IDurRepairPan = Number(Yanfly.Parameters['Repair Pan']);

Yanfly.Param.IDurShowDur = eval(String(Yanfly.Parameters['Show Durability']));
Yanfly.Param.IDurText = String(Yanfly.Parameters['Durability Text']);
Yanfly.Param.IDurFmt = String(Yanfly.Parameters['Durability Format']);
Yanfly.Param.IDurShowUnbr = eval(String(Yanfly.Parameters['Show Unbreakable']));
Yanfly.Param.IDurUnbreakable = String(Yanfly.Parameters['Unbreakable Text']);

Yanfly.Param.IDurColor = {
  unbreak: Number(Yanfly.Parameters['Unbreakable']),
      max: Number(Yanfly.Parameters['Max Durability']),
  rate190: Number(Yanfly.Parameters['190% Durability']),
  rate175: Number(Yanfly.Parameters['175% Durability']),
  rate150: Number(Yanfly.Parameters['150% Durability']),
  rate120: Number(Yanfly.Parameters['120% Durability']),
  rate110: Number(Yanfly.Parameters['110% Durability']),
  rate100: Number(Yanfly.Parameters['100% Durability']),
   rate80: Number(Yanfly.Parameters['80% Durability']),
   rate50: Number(Yanfly.Parameters['50% Durability']),
   rate25: Number(Yanfly.Parameters['25% Durability']),
   rate10: Number(Yanfly.Parameters['10% Durability']),
    rate1: Number(Yanfly.Parameters['1% Durability']),
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.IDur.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.IDur.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_ItemDurability) {
    this.processIDurNotetags1($dataWeapons);
    this.processIDurNotetags1($dataArmors);
    this.processIDurNotetags2($dataItems);
    this.processIDurNotetags2($dataWeapons);
    this.processIDurNotetags2($dataArmors);
    this.processIDurNotetags3($dataSkills);
    this.processIDurNotetags3($dataItems);
    Yanfly._loaded_YEP_X_ItemDurability = true;
  }
  return true;
};

DataManager.processIDurNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.durability = Yanfly.Param.IDurDefaultDur;
    obj.durVariance = Yanfly.Param.IDurDefaultVar;
    obj.durMax = Yanfly.Param.IDurDefaultMax;
    obj.breakSound = {
      name:   Yanfly.Param.IDurBreakName,
      volume: Yanfly.Param.IDurBreakVol,
      pitch:  Yanfly.Param.IDurBreakPitch,
      pan:    Yanfly.Param.IDurBreakPan
    };
    var evalMode = 'none';
    obj.breakEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<DURABILITY:[ ](\d+)>/i)) {
        obj.durability = Math.max(1, parseInt(RegExp.$1));
      } else if (line.match(/<DURABILITY VARIANCE:[ ](\d+)>/i)) {
        obj.durVariance = parseInt(RegExp.$1);
      } else if (line.match(/<DURABILITY MAXIMUM:[ ](\d+)>/i)) {
        obj.durMax = parseInt(RegExp.$1);
      } else if (line.match(/<(?:UNBREAKABLE|BYPASS DURABILITY)>/i)) {
        obj.durability = -1;
      } else if (line.match(/<BREAK SOUND NAME:[ ](.*)>/i)) {
        obj.breakSound['name'] = String(RegExp.$1);
      } else if (line.match(/<BREAK SOUND VOLUME:[ ](\d+)>/i)) {
        obj.breakSound['volume'] = parseInt(RegExp.$1);
      } else if (line.match(/<BREAK SOUND PITCH:[ ](\d+)>/i)) {
        obj.breakSound['pitch'] = parseInt(RegExp.$1);
      } else if (line.match(/<BREAK SOUND PAN:[ ]([\+\-]\d+)>/i)) {
        obj.breakSound['pan'] = parseInt(RegExp.$1);
      } else if (line.match(/<CUSTOM BREAK EFFECT>/i)) {
        evalMode = 'custom break effect';
      } else if (line.match(/<\/CUSTOM BREAK EFFECT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom break effect') {
        obj.breakEval = obj.breakEval + line + '\n';
      }
    }
  }
};

DataManager.processIDurNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.repairWeaponType = [0];
    obj.repairArmorType = [0];
    obj.repairSound = {
      name:   Yanfly.Param.IDurRepairName,
      volume: Yanfly.Param.IDurRepairVol,
      pitch:  Yanfly.Param.IDurRepairPitch,
      pan:    Yanfly.Param.IDurRepairPan
    };
    obj.repairWeaponUnbreakable = [false];
    obj.repairArmorUnbreakable = [false];
    var evalMode = 'none';
    obj.repairDurabilityEval = ''

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<REPAIR WEAPON:[ ](\d+)>/i)) {
        obj.repairWeaponType[0] = parseInt(RegExp.$1);
      } else if (line.match(/<REPAIR ARMOR:[ ](\d+)>/i)) {
        obj.repairArmorType[0] = parseInt(RegExp.$1);
      } else if (line.match(/<REPAIR DURABILITY:[ ](\d+)>/i)) {
        var value = parseInt(RegExp.$1);
        obj.repairWeaponType[0] = value;
        obj.repairArmorType[0] = value;
      } else if (line.match(/<REPAIR WTYPE[ ](\d+):[ ](\d+)>/i)) {
        obj.repairWeaponType[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<REPAIR ATYPE[ ](\d+):[ ](\d+)>/i)) {
        obj.repairArmorType[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<UNBREAKABLE WEAPON>/i)) {
        obj.repairWeaponUnbreakable[0] = true;
      } else if (line.match(/<UNBREAKABLE ARMOR>/i)) {
        obj.repairArmorUnbreakable[0] = true;
      } else if (line.match(/<UNBREAKABLE DURABILITY>/i)) {
        obj.repairWeaponUnbreakable[0] = true;
        obj.repairArmorUnbreakable[0] = true;
      } else if (line.match(/<UNBREAKABLE WTYPE[ ](\d+)>/i)) {
        obj.repairWeaponUnbreakable[parseInt(RegExp.$1)] = true;
      } else if (line.match(/<UNBREAKABLE ATYPE[ ](\d+)>/i)) {
        obj.repairArmorUnbreakable[parseInt(RegExp.$1)] = true;
      } else if (line.match(/<REPAIR SOUND NAME:[ ](.*)>/i)) {
        obj.repairSound['name'] = String(RegExp.$1);
      } else if (line.match(/<REPAIR SOUND VOLUME:[ ](\d+)>/i)) {
        obj.repairSound['volume'] = parseInt(RegExp.$1);
      } else if (line.match(/<REPAIR SOUND PITCH:[ ](\d+)>/i)) {
        obj.repairSound['pitch'] = parseInt(RegExp.$1);
      } else if (line.match(/<REPAIR SOUND PAN:[ ]([\+\-]\d+)>/i)) {
        obj.repairSound['pan'] = parseInt(RegExp.$1);
      } else if (line.match(/<CUSTOM REPAIR EFFECT>/i)) {
        evalMode = 'custom repair eval';
      } else if (line.match(/<\/CUSTOM REPAIR EFFECT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom repair eval') {
        obj.repairDurabilityEval = obj.repairDurabilityEval + line + '\n';
      }
    }
  }
};

DataManager.processIDurNotetags3 = function(group) {
  var noteA1 = /<USER WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteA2 = /<USER ALL WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteA3 = /<USER RANDOM WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteB1 = /<USER ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteB2 = /<USER ALL ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteB3 = /<USER RANDOM ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteC1 = /<TARGET WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteC2 = /<TARGET ALL WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteC3 = /<TARGET RANDOM WEAPON DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteD1 = /<TARGET ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteD2 = /<TARGET ALL ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  var noteD3 = /<TARGET RANDOM ARMOR DURABILITY:[ ]([\+\-]\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.userAllWeaponDurability = 0;
    obj.userRandomWeaponDurability = 0;
    obj.userAllArmorDurability = 0;
    obj.userRandomArmorDurability = 0;
    obj.targetAllWeaponDurability = 0;
    obj.targetRandomWeaponDurability = 0;
    obj.targetAllArmorDurability = 0;
    obj.targetRandomArmorDurability = 0;
    if ([1, 2, 3, 4, 5, 6].contains(obj.scope)) {
      if (obj.hitType === Game_Action.HITTYPE_PHYSICAL) {
        obj.userAllWeaponDurability = Yanfly.Param.IDurPhysicalAction;
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.targetAllArmorDurability = Yanfly.Param.IDurPhysicalDmg;
        } else {
          obj.targetRandomArmorDurability = Yanfly.Param.IDurPhysicalDmg;
        }
      } else if (obj.hitType === Game_Action.HITTYPE_MAGICAL) {
        obj.userAllWeaponDurability = Yanfly.Param.IDurMagicalAction;
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.targetAllArmorDurability = Yanfly.Param.IDurMagicalDmg;
        } else {
          obj.targetRandomArmorDurability = Yanfly.Param.IDurMagicalDmg;
        }
      } else if (obj.hitType === Game_Action.HITTYPE_CERTAIN) {
        obj.userAllWeaponDurability = Yanfly.Param.IDurCertainAction;
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.targetAllArmorDurability = Yanfly.Param.IDurCertainDmg;
        } else {
          obj.targetRandomArmorDurability = Yanfly.Param.IDurCertainDmg;
        }
      }
    }
    var evalMode = 'none';
    var evalKey = '';
    obj.durabilityEval = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteA1)) {
        obj.userAllWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteA2)) {
        obj.userAllWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteA3)) {
        obj.userRandomWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteB1)) {
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.userAllArmorDurability = parseInt(RegExp.$1);
        } else {
          obj.userRandomArmorDurability = parseInt(RegExp.$1);
        }
      } else if (line.match(noteB2)) {
        obj.userAllArmorDurability = parseInt(RegExp.$1);
      } else if (line.match(noteB3)) {
        obj.userRandomArmorDurability = parseInt(RegExp.$1);
      } else if (line.match(noteC1)) {
        obj.targetAllWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteC2)) {
        obj.targetAllWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteC3)) {
        obj.targetRandomWeaponDurability = parseInt(RegExp.$1);
      } else if (line.match(noteD1)) {
        if (Yanfly.Param.IDurDamageAllArmor) {
          obj.targetAllArmorDurability = parseInt(RegExp.$1);
        } else {
          obj.targetRandomArmorDurability = parseInt(RegExp.$1);
        }
      } else if (line.match(noteD2)) {
        obj.targetAllArmorDurability = parseInt(RegExp.$1);
      } else if (line.match(noteD3)) {
        obj.targetRandomArmorDurability = parseInt(RegExp.$1);
      } else if (line.match(/<CUSTOM[ ](.*)[ ](.*)[ ](.*)[ ]DURABILITY>/i)) {
        var target = String(RegExp.$1).toLowerCase();
        var type = String(RegExp.$2).toLowerCase();
        var equip = String(RegExp.$3).toLowerCase();
        if (!['user', 'target'].contains(target)) continue;
        if (!['all', 'random'].contains(type)) continue;
        if (!['weapon', 'armor'].contains(equip)) continue;
        evalMode = 'custom durability';
        evalKey = target + type + equip;
        obj.durabilityEval[evalKey] = '';
      } else if (line.match(/<\/CUSTOM[ ](.*)[ ](.*)[ ](.*)[ ]DURABILITY>/i)) {
        evalMode = 'none';
        evalKey = '';
      } else if (evalMode === 'custom durability') {
        obj.durabilityEval[evalKey] = obj.durabilityEval[evalKey] + line + '\n';
      }
    }
  }
};

DataManager.getDurability = function(item) {
    if (this.isItem(item)) return -1;
    if (!this.isIndependent(item)) return -1;
    if (item.durability === undefined) ItemManager.makeDurability(item);
    return item.durability;
};

DataManager.getMaxDurability = function(item) {
    if (this.isItem(item)) return -1;
    if (!this.isIndependent(item)) return -1;
    var baseItem = this.getBaseItem(item);
    return baseItem.durMax;
};

//=============================================================================
// ItemManager
//=============================================================================

Yanfly.IDur.ItemManager_setNewIndependentItem =
    ItemManager.setNewIndependentItem;
ItemManager.setNewIndependentItem = function(baseItem, newItem) {
  Yanfly.IDur.ItemManager_setNewIndependentItem.call(this, baseItem, newItem);
  var variance = $gameTemp.varianceStock() ? 0 : baseItem.durVariance;
  this.makeDurability(newItem, variance);
};

ItemManager.makeDurability = function(item, variance) {
    if (DataManager.isItem(item)) return;
    variance = variance || 0;
    var baseItem = DataManager.getBaseItem(item);
    item.durability = baseItem.durability;
    if (item.durability <= 0) return;
    if (variance >= 0) this.makeDurabilityVariance(item, variance);
    this.clampDurability(item);
};

ItemManager.makeDurabilityVariance = function(item, variance) {
    var randomValue = variance * 2 + 1;
    var offset = variance;
    item.durability += Math.floor(Math.random() * randomValue - offset);
};

ItemManager.clampDurability = function(item) {
    var baseItem = DataManager.getBaseItem(item);
    item.durability = item.durability.clamp(0, baseItem.durMax);
};

ItemManager.applyRepairDurabilityEffects = function(item, effectItem) {
    this.setUnbreakableRepairDurability(item, effectItem);
    this.addRepairDurability(item, effectItem);
};

ItemManager.setUnbreakableRepairDurability = function(item, effectItem) {
    if (DataManager.isWeapon(item)) {
      var type = item.wtypeId;
      var array1 = effectItem.repairWeaponUnbreakable;
    } else {
      var type = item.atypeId;
      var array1 = effectItem.repairArmorUnbreakable;
    }
    if (array1) {
      if (array1[0] || array1[type]) item.durability = -1;
    }
};

ItemManager.addRepairDurability = function(item, effectItem) {
    if (item.durability < 0) return;
    if (DataManager.isWeapon(item)) {
      var type = item.wtypeId;
      var array1 = effectItem.repairWeaponType;
    } else {
      var type = item.atypeId;
      var array1 = effectItem.repairArmorType;
    }
    if (array1) {
      item.durability += array1[0] || 0;
      if (array1[type] && array1[type] > 0) item.durability += array1[type];
    }
    this.clampDurability(item);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.IDur.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.IDur.Game_System_initialize.call(this);
    this.initItemDurabilitySettings();
};

Game_System.prototype.initItemDurabilitySettings = function() {
    this._showRepairDurability = Yanfly.Param.IDurShowRepair;
    this._enableRepairDurability = Yanfly.Param.IDurEnRepair;
};

Game_System.prototype.isShowRepairDurability = function() {
    if (this._showRepairDurability === undefined) {
      this.initItemDurabilitySettings();
    }
    return this._showRepairDurability;
};

Game_System.prototype.setShowRepairDurability = function(value) {
    if (this._showRepairDurability === undefined) {
      this.initItemDurabilitySettings();
    }
    this._showRepairDurability = value;
};

Game_System.prototype.isEnableRepairDurability = function() {
    if (this._enableRepairDurability === undefined) {
      this.initItemDurabilitySettings();
    }
    return this._enableRepairDurability;
};

Game_System.prototype.setEnableRepairDurability = function(value) {
    if (this._enableRepairDurability === undefined) {
      this.initItemDurabilitySettings();
    }
    this._enableRepairDurability = value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.durabilityBreakItem = function(obj) {
    if (!obj) return;
    this.discardEquip(obj);
    this.playDurabilityBreakSound(obj);
    this.customDurabilityBreakEval(obj);
    var scene = SceneManager._scene;
    var win = scene._logWindow;
    if (!win) return;
    var fmt = Yanfly.Param.IDurBrokenText;
    var text = fmt.format(this.name(), obj.name, '\\i[' + obj.iconIndex + ']');
    if (Imported.YEP_BattleEngineCore) text = '<CENTER>' + text;
    win._lines.push(text);
    win.refresh();
    if (!Imported.YEP_BattleEngineCore) return;
    if (this._waitEnabled) return;
    this._waitEnabled = true;
    var frames = Yanfly.Param.IDurBrokenWait;
    if (frames > 0) BattleManager._actionList.push(['WAIT', [frames]]);
};

Game_Actor.prototype.customDurabilityBreakEval = function(item) {
    var baseItem = DataManager.getBaseItem(item);
    var effect = item.breakEval || baseItem.breakEval;
    if (!effect) return;
    if (effect === '') return;
    var a = this;
    var user = this;
    var subject = this;
    var b = this;
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(effect);
    } catch (e) {
      Yanfly.Util.displayError(e, effect, 'DURABILITY BREAK SCRIPT ERROR');
    }
};

Game_Actor.prototype.playDurabilityBreakSound = function(obj) {
    var sound = obj.breakSound;
    if (!sound) {
      sound = {
        name:   Yanfly.Param.IDurBreakName,
        volume: Yanfly.Param.IDurBreakVol,
        pitch:  Yanfly.Param.IDurBreakPitch,
        pan:    Yanfly.Param.IDurBreakPan
      }
    }
    AudioManager.playSe(sound);
};

Game_Actor.prototype.damageAllWeaponDurability = function(value) {
    this.damageAllDurability(value, this.weapons());
};

Game_Actor.prototype.damageAllArmorDurability = function(value) {
    this.damageAllDurability(value, this.armors());
};

Game_Actor.prototype.damageAllDurability = function(value, group) {
    if (value === 0) return;
    var length = group.length;
    var removed = [];
    for (var i = 0; i < length; ++i) {
      var obj = group[i];
      if (!obj) continue;
      if (!obj.baseItemId) continue;
      if (obj.durability < 0) continue;
      obj.durability += value;
      if (obj.durability <= 0) removed.push(obj);
    }
    length = removed.length;
    for (var i = 0; i < length; ++i) {
      var obj = removed[i];
      this.durabilityBreakItem(obj);
    }
};

Game_Actor.prototype.damageRandomWeaponDurability = function(value) {
    this.damageRandomDurability(value, this.weapons());
};

Game_Actor.prototype.damageRandomArmorDurability = function(value) {
    this.damageRandomDurability(value, this.armors());
};

Game_Actor.prototype.damageRandomDurability = function(value, group) {
    if (value === 0) return;
    var length = group.length;
    var valid = [];
    for (var i = 0; i < length; ++i) {
      var obj = group[i];
      if (!obj) continue;
      if (!obj.baseItemId) continue;
      if (obj.durability < 0) continue;
      valid.push(obj)
    }
    var item = valid[Math.floor(Math.random() * valid.length)];
    if (!item) return;
    item.durability += value;
    if (item.durability <= 0) this.durabilityBreakItem(item);
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.IDur.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.IDur.Game_Action_applyItemUserEffect.call(this, target);
    if (this.isApplyDurabilityEffects()) this.applyDurabilityEffects(target);
};

Game_Action.prototype.isApplyDurabilityEffects = function() {
    return true;
};

Game_Action.prototype.applyDurabilityEffects = function(target) {
    if (this.subject().isActor()) {
      var value = this.item().userAllWeaponDurability;
      value = this.durabilityEval('userallweapon', target, value);
      this.subject().damageAllWeaponDurability(value);
      var value = this.item().userRandomWeaponDurability;
      value = this.durabilityEval('userrandomweapon', target, value);
      this.subject().damageRandomWeaponDurability(value);
      var value = this.item().userAllArmorDurability;
      value = this.durabilityEval('userallarmor', target, value);
      this.subject().damageAllArmorDurability(value);
      var value = this.item().userRandomArmorDurability;
      value = this.durabilityEval('userrandomarmor', target, value);
      this.subject().damageRandomArmorDurability(value);
      this.subject()._waitEnabled = false;
    }
    if (target && target.isActor()) {
      var value = this.item().targetAllWeaponDurability;
      value = this.durabilityEval('targetallweapon', target, value);
      target.damageAllWeaponDurability(value);
      var value = this.item().targetRandomWeaponDurability;
      value = this.durabilityEval('targetrandomweapon', target, value);
      target.damageRandomWeaponDurability(value);
      var value = this.item().targetAllArmorDurability;
      value = this.durabilityEval('targetallarmor', target, value);
      target.damageAllArmorDurability(value);
      var value = this.item().targetRandomArmorDurability;
      value = this.durabilityEval('targetrandomarmor', target, value);
      target.damageRandomArmorDurability(value);
      target._waitEnabled = false;
    }
};

Game_Action.prototype.durabilityEval = function(type, target, value) {
    var formula = this.item().durabilityEval[type];
    if (!formula) return value;
    if (formula === '') return value;
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var item = this.item();
    var skill = this.item();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(formula);
    } catch (e) {
      Yanfly.Util.displayError(e, formula, 'DURABILITY FORMULA ERROR');
    }
    return value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.IDur.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.IDur.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowRepairDurability') {
    $gameSystem.setShowRepairDurability(true);
  } else if (command === 'HideRepairDurability') {
    $gameSystem.setShowRepairDurability(false);
  } else if (command === 'EnableRepairDurability') {
    $gameSystem.setEnableRepairDurability(true);
  } else if (command === 'DisableRepairDurability') {
    $gameSystem.setEnableRepairDurability(false);
  }
};

//=============================================================================
// Window_ItemInfo
//=============================================================================

Yanfly.IDur.Window_ItemInfo_drawItemInfoC =
    Window_ItemInfo.prototype.drawItemInfoC;
Window_ItemInfo.prototype.drawItemInfoC = function(dy) {
    dy = Yanfly.IDur.Window_ItemInfo_drawItemInfoC.call(this, dy);
    if (this.isDrawDurability()) dy = this.drawItemDurability(dy);
    return dy;
};

Window_ItemInfo.prototype.isDrawDurability = function() {
    if (DataManager.isItem(this._item)) return false;
    if (!Yanfly.Param.IDurShowUnbr) {
      if (DataManager.getDurability(this._item) < 0) return false;
    }
    return Yanfly.Param.IDurShowDur;
};

Window_ItemInfo.prototype.drawItemDurability = function(dy) {
    this.resetFontSettings();
    this.changeTextColor(this.systemColor());
    var text = Yanfly.Param.IDurText;
    var dx = this.textPadding();
    var dw = this.contents.width - this.textPadding() * 2;
    this.drawText(text, dx, dy, dw);
    var fmt = Yanfly.Param.IDurFmt;
    var cur = DataManager.getDurability(this._item);
    var max = DataManager.getMaxDurability(this._item);
    if (cur > 0) {
      this.changeTextColor(this.textColor(this.durabilityColor(cur, max)));
      text = fmt.format(cur, max)
    } else {
      this.changeTextColor(this.textColor(Yanfly.Param.IDurColor['unbreak']));
      text = Yanfly.Param.IDurUnbreakable;
    }
    this.drawText(text, dx, dy, dw, 'right');
    this.resetFontSettings();
    dy += this.lineHeight();
    return dy;
};

Window_ItemInfo.prototype.durabilityColor = function(cur, max) {
    var value = DataManager.getBaseItem(this._item).durability;
    if (cur === max) {
      return Yanfly.Param.IDurColor['max'];
    } else if (cur >= 1.90 * value) {
      return Yanfly.Param.IDurColor['rate190'];
    } else if (cur >= 1.75 * value) {
      return Yanfly.Param.IDurColor['rate175'];
    } else if (cur >= 1.50 * value) {
      return Yanfly.Param.IDurColor['rate150'];
    } else if (cur >= 1.20 * value) {
      return Yanfly.Param.IDurColor['rate120'];
    } else if (cur >= 1.10 * value) {
      return Yanfly.Param.IDurColor['rate110'];
    } else if (cur >= 1.00 * value) {
      return Yanfly.Param.IDurColor['rate100'];
    } else if (cur >= 0.80 * value) {
      return Yanfly.Param.IDurColor['rate80'];
    } else if (cur >= 0.50 * value) {
      return Yanfly.Param.IDurColor['rate50'];
    } else if (cur >= 0.25 * value) {
      return Yanfly.Param.IDurColor['rate25'];
    } else if (cur >= 0.10 * value) {
      return Yanfly.Param.IDurColor['rate10'];
    } else {
      return Yanfly.Param.IDurColor['rate1'];
    }
};

//=============================================================================
// Window_ItemActionCommand
//=============================================================================

Yanfly.IDur.Window_ItemActionCommand_addCustomCommandsC =
    Window_ItemActionCommand.prototype.addCustomCommandsC;
Window_ItemActionCommand.prototype.addCustomCommandsC = function() {
    Yanfly.IDur.Window_ItemActionCommand_addCustomCommandsC.call(this);
    this.addRepairCommand();
};

Window_ItemActionCommand.prototype.addRepairCommand = function() {
    if (Yanfly.Param.IDurCmdRepair === '') return;
    if (!$gameSystem.isShowRepairDurability()) return;
    var enabled = DataManager.isIndependent(this._item);
    if (!enabled) return;
    enabled = this.isRepairDurabilityEnabled();
    var fmt = Yanfly.Param.IDurCmdRepair;
    text = '\\i[' + this._item.iconIndex + ']';
    if (this._item.textColor !== undefined) {
      text += '\\c[' + this._item.textColor + ']';
    }
    text += this._item.name;
    text = fmt.format(text);
    this.addCommand(text, 'repair', enabled);
};

Window_ItemActionCommand.prototype.isRepairDurabilityEnabled = function() {
    if (this._item.durability < 0) return false;
    return $gameSystem.isEnableRepairDurability();
};

//=============================================================================
// Window_RepairItemList
//=============================================================================

function Window_RepairItemList() {
    this.initialize.apply(this, arguments);
}

Window_RepairItemList.prototype = Object.create(Window_ItemList.prototype);
Window_RepairItemList.prototype.constructor = Window_RepairItemList;

Window_RepairItemList.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this.hide();
    this.deactivate();
};

Window_RepairItemList.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
    this.select(0);
};

Window_RepairItemList.prototype.includes = function(item) {
    if (!item) return false;
    if (!this.containsType(item)) return false;
    return true;
};

Window_RepairItemList.prototype.containsType = function(item) {
    if (item.repairDurabilityEval !== '') return true;
    if (DataManager.isWeapon(this._item)) {
      var type = this._item.wtypeId;
      var array1 = item.repairWeaponType;
      var array2 = item.repairWeaponUnbreakable;
    } else if (DataManager.isArmor(this._item)) {
      var type = this._item.atypeId;
      var array1 = item.repairArmorType;
      var array2 = item.repairArmorUnbreakable;
    } else {
      return false;
    }
    if (array1) {
      if (array1[0] && array1[0] > 0) return true;
      if (array1[type] && array1[type] > 0) return true;
    }
    if (array2) {
      if (array2[0]) return true;
      if (array2[type]) return true;
    }
    return false;
};

Window_RepairItemList.prototype.isEnabled = function(item) {
    if (!item) return false;
    if (item.repairDurabilityEval !== '') return true;
    if (DataManager.isWeapon(this._item)) {
      var arr = item.repairWeaponUnbreakable;
      var type = this._item.wtypeId;
    } else if (DataManager.isArmor(this._item)) {
      var arr = item.repairArmorUnbreakable;
      var type = this._item.atypeId;
    }
    if (arr) {
      if (arr[0]) return true;
      if (arr[type]) return true;
    }
    var cur = DataManager.getDurability(this._item);
    var max = DataManager.getMaxDurability(this._item);
    if (cur < 0) return false;
    return cur < max;
};

Window_RepairItemList.prototype.selectLast = function() {
};

Window_RepairItemList.prototype.playOkSound = function() {
    if (!this.item()) return;
    var sound = this.item().repairSound;
    if (!sound) {
      sound = {
        name:   Yanfly.Param.IDurRepairName,
        volume: Yanfly.Param.IDurRepairVol,
        pitch:  Yanfly.Param.IDurRepairPitch,
        pan:    Yanfly.Param.IDurRepairPan
      }
    }
    AudioManager.playSe(sound);
};

Window_RepairItemList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) this._data.push(null);
};

//=============================================================================
// Scene_Item
//=============================================================================

Yanfly.IDur.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function() {
    Yanfly.IDur.Scene_Item_createItemWindow.call(this);
    this.createRepairListWindow();
};

Yanfly.IDur.Scene_Item_createActionWindow =
    Scene_Item.prototype.createActionWindow;
Scene_Item.prototype.createActionWindow = function() {
    Yanfly.IDur.Scene_Item_createActionWindow.call(this);
    this._itemActionWindow.setHandler('repair', this.onActionRepair.bind(this));
};

Scene_Item.prototype.createRepairListWindow = function() {
    var wy = this._itemWindow.y;
    var ww = this._itemWindow.width;
    var wh = this._itemWindow.height;
    this._repairListWindow = new Window_RepairItemList(0, wy, ww, wh);
    this._repairListWindow.setHelpWindow(this._helpWindow);
    this._repairListWindow.setHandler('ok', this.onRepairListOk.bind(this));
    this._repairListWindow.setHandler('cancel',
      this.onRepairListCancel.bind(this));
    this.addWindow(this._repairListWindow);
};

Scene_Item.prototype.onActionRepair = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    this._repairListWindow.show();
    this._repairListWindow.activate();
    this._repairListWindow.setItem(this.item());
};

Scene_Item.prototype.onRepairListOk = function() {
    var effectItem = this._repairListWindow.item();
    ItemManager.applyRepairDurabilityEffects(this.item(), effectItem);
    this.onRepairEval(effectItem);
    if (effectItem.consumable) $gameParty.loseItem(effectItem, 1);
    this._repairListWindow.refresh();
    this._repairListWindow.activate();
    this._statusWindow.refresh();
    this._infoWindow.refresh();
    this._itemWindow.refresh();
    this._itemActionWindow.refresh();
    var index = this._repairListWindow.index();
    if (this._repairListWindow.maxItems() <= index) {
      index = this._repairListWindow.maxItems() - 1;
      this._repairListWindow.select(index);
    }
};

Scene_Item.prototype.onRepairListCancel = function() {
    this._repairListWindow.hide();
    this._repairListWindow.deactivate();
    this._itemActionWindow.show();
    this._itemActionWindow.activate();
    this._helpWindow.setItem(this.item());
};

Scene_Item.prototype.onRepairEval = function(effectItem) {
    var effect = effectItem.repairDurabilityEval;
    if (!effect) return;
    if (effect === '') return;
    var item = this.item();
    var code = effectItem.repairDurabilityEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'REPAIR CUSTOM EFFECT ERROR');
    }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
};