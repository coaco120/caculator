const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];            // 十天干
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']; // 十二地支

const MEN = ['休門', '生門', '傷門', '杜門', '景門', '死門', '驚門', '開門'];          // 八門
const XING = ['天蓬', '天任', '天沖', '天輔', '天英', '天芮', '天柱', '天心'];         // 八星
const SHEN = ['值符', '騰蛇', '太陰', '六合', '白虎', '玄武', '九地', '九天'];         // 八神
const GONG = ['坎', '艮', '震', '巽', '離', '坤', '兌', '乾'];                      // 八宮
const WUXIN = ['金', '木', '水', '火', '土'];                                      // 五行

const gongs_order_clockwise = [1, 8, 3, 4, 9, 2, 7, 6];                          // 順時針數八宮
const gongs_order_anticlockwise = [1, 6, 7, 2, 9, 4, 3, 8];                      // 逆時針數八宮

// 八宮屬性
function getGongDescription(gong)
{
  const gongMap = {
    '坎' : '坎 -【⽔】，其意為【陷】，落宮狀態：艱難險阻、勞苦波折、陷入迷失',
    '艮' : '艮 -【山】，其意為【止】，落宮狀態：停止不前、阻隔、困難',
    '震' : '震 -【雷】，其意為【動】，落宮狀態：急動、突然的、意想不到、身不由己',
    '巽' : '巽 -【風】，其意為【入】，落宮狀態：慢慢滲透、沒有方向、拿不定主意、徘徊不定、走走停停',
    '離' : '離 -【火】，其意為【麗】，落宮狀態：璀燦亮麗、虎頭蛇尾、先盛後衰',
    '坤' : '坤 -【地】，其意為【順】，落宮狀態：平穩平順、牽扯人多事多、拖拖拉拉、慢',
    '兌' : '兌 -【澤】，其意為【悅】，落宮狀態：口舌、說、不完美、缺憾',
    '乾' : '乾 -【天】，其意為【健】，落宮狀態：積極主動、高人一等、居高臨下'
  };

  return gongMap[gong] || '';
}

// 檢查五不遇時
function checkWuBuYueShi(riGan, shiZhu)
{
  const wuBuYueShiMap = {
    '甲' : '庚午',
    '乙' : '辛巳',
    '丙' : '壬辰',
    '丁' : '癸卯',
    '戊' : '甲寅',
    '己' : '乙丑',
    '庚' : '丙子',
    '辛' : '丁酉',
    '壬' : '戊申',
    '癸' : '己未'
  };

  return wuBuYueShiMap[riGan] === shiZhu;
}


// 天干組合
function getJuDescription(gan)
{

  const juMap = {
    '乙乙' : '乙乙 - (日奇伏吟) 宜靜宜守 不利謁貴 不利求名',
    '乙丙' : '乙丙 - (奇儀順遂) 吉星升遷 兇星離別 紅杏出牆',
    '乙丁' : '乙丁 - (奇儀相佐) 文書事吉 利於合作 百事可為',
    '乙戊' : '乙戊 - (利陰害陽) 門兇墓迫 破財傷人 不利公開',
    '乙己' : '乙己 - (日奇入墓) 被土闇昧 門凶事兇 門吉有救',
    '乙庚' : '乙庚 - (日奇被刑) 爭訟財產 夫妻懷私 未婚同居',
    '乙辛' : '乙辛 - (青龍逃走) 奴僕拐帶 六畜皆傷 女人棄婚',
    '乙壬' : '乙壬 - (日奇天羅) 尊卑悖亂 官災是非 有人謀害',
    '乙癸' : '乙癸 - (日奇地網) 遁跡隱形 躲災避難 退吉進兇',

    '丙乙' : '丙乙 - (日月並行) 陰陽得位 剛柔結合 謀為皆吉',
    '丙丙' : '丙丙 - (月奇悖師) 文書逼迫 票據文章 破耗遺失',
    '丙丁' : '丙丁 - (星奇朱雀) 文書吉利 常人宜靜 炎症病變',
    '丙戊' : '丙戊 - (飛鳥跌穴) 謀為洞徹 迫墓擊刑 減吉至兇',
    '丙己' : '丙己 - (火悖入刑) 囚人刑杖 文書不行 吉凶看門',
    '丙庚' : '丙庚 - (熒入太白) 門戶破財 盗耗遺失 賊病皆去',
    '丙辛' : '丙辛 - (月奇相合) 兇象被合 謀事成就 病人不兇',
    '丙壬' : '丙壬 - (火入天網) 為客不利 是非頗多 越來越亂',
    '丙癸' : '丙癸 - (月奇地網) 闇味不明 陰人害事 災禍頗多',

    '丁乙' : '丁乙 - (玉女生奇) 加官進祿 婚姻財喜 利於文章',
    '丁丙' : '丁丙 - (星隨月轉) 小人得志 貴人高升 常人生悲',
    '丁丁' : '丁丁 - (星奇伏吟) 文書即至 喜事遂心 萬事如意',
    '丁戊' : '丁戊 - (青龍轉光) 官人升遷 常人威昌 利婚求學',
    '丁己' : '丁己 - (火人勾陳) 奸私仇冤 事因女人 謀為不利',
    '丁庚' : '丁庚 - (星奇受阻) 文書阻隔 消息不通 行人必歸',
    '丁辛' : '丁辛 - (朱雀入獄) 罪人釋囚 官人失位 牢獄之災',
    '丁壬' : '丁壬 - (奇儀相合) 凡事能成 貴人輔助 測婚苟合',
    '丁癸' : '丁癸 - (朱雀投江) 文書口舌 音信沉溺 官府詞訟',

    '戊乙' : '戊乙 - (青龍合會) 有貴人助 合主病多 吉凶看門',
    '戊丙' : '戊丙 - (青龍返首) 大吉大利 墓迫擊刑 吉事成兇',
    '戊丁' : '戊丁 - (青龍耀明) 謁貴求名 墓迫擊刑 減吉至兇',
    '戊戊' : '戊戊 - (青龍伏吟) 凡事閉塞 靜守為吉 六甲可謀',
    '戊己' : '戊己 - (貴人入獄) 公私不利 衝出墓庫 方有轉機',
    '戊庚' : '戊庚 - (值符飛宮) 吉事不吉 兇事更兇 移換逃遷',
    '戊辛' : '戊辛 - (青龍折足) 吉門可謀 凶門災破 足疾折傷',
    '戊壬' : '戊壬 - (青龍天牢) 諸事不利 投資虧本 測病主兇',
    '戊癸' : '戊癸 - (青龍華蓋) 為利而合 事有合絆 吉凶看門',

    '己乙' : '己乙 - (地戶逢星) 基神不明 遁跡隱形 前途渺茫',
    '己丙' : '己丙 - (火悖地戶) 男被冤害 女被淫污 感情出軌',
    '己丁' : '己丁 - (朱雀人墓) 文書詞訟 先曲後直 撥雲見日',
    '己戊' : '己戊 - (犬遇青龍) 門吉可謀 門兇徒勞 吉凶看門',
    '己己' : '己己 - (地戶逢鬼) 病者必死 百事不遂 不可謀為',
    '己庚' : '己庚 - (刑格反名) 謀為徒勞 先動不利 謹防謀害',
    '己辛' : '己辛 - (遊魂入墓) 人鬼相侵 鬼魅作祟 凡事謹慎',
    '己壬' : '己壬 - (地網高張) 狡童佚女 姦情傷殺 事多變動',
    '己癸' : '己癸 - (地刑玄武) 疾病垂危 囚獄詞訟 事關私慾',

    '庚乙' : '庚乙 - (太白逢星) 流連牽絆 退吉進兇 夫妻不和',
    '庚丙' : '庚丙 - (太白入熒) 佔賊必來 為客進利 為主破財',
    '庚丁' : '庚丁 - (金屋藏嬌) 婚外有情 私匿官司 門吉有救',
    '庚戊' : '庚戊 - (值符伏宮) 破財傷人 不利合作 百事皆兇',
    '庚己' : '庚己 - (官府刑格) 私慾傷害 官訟判刑 主客不利',
    '庚庚' : '庚庚 - (太白同宮) 官災橫禍 兄弟不和 變動爭財',
    '庚辛' : '庚辛 - (白虎幹格) 遠行不利 車折馬死 諸事災殃',
    '庚壬' : '庚壬 - (移蕩之格) 遠行迷失 音信皆阻 多主變動',
    '庚癸' : '庚癸 - (反吟大格) 行人不至 官司破財 生產皆傷',

    '辛乙' : '辛乙 - (白虎猖狂) 家破人亡 遠行多殃 男人棄婚',
    '辛丙' : '辛丙 - (幹合悖師) 閤中有亂 因財致訟 吉凶看門',
    '辛丁' : '辛丁 - (獄神得奇) 經商倍利 囚人赦免 意外收穫',
    '辛戊' : '辛戊 - (困龍被傷) 屈抑守分 妄動禍殃 官司破財',
    '辛己' : '辛己 - (人獄自刑) 奴僕背主 獄訟難伸 自錯破財',
    '辛庚' : '辛庚 - (白虎出力) 主客相殘 強進血衫 退避尚可',
    '辛辛' : '辛辛 - (伏吟天庭) 公廢私就 訟獄由己 自罹罪名',
    '辛壬' : '辛壬 - (兇蛇入獄) 兩男爭女 訟獄不息 先動失理',
    '辛癸' : '辛癸 - (天牢華蓋) 日月失明 誤入天網 動輒乖張',


    '壬乙' : '(小蛇得勢) 女子溫柔 男子發達 佔孕生子',
    '壬丙' : '(水蛇人火) 官災刑禁 絡繹不絕 兩敗俱傷',
    '王丁' : '(幹合蛇刑) 文書牽連 貴人匆匆 男吉女兇',
    '壬戊' : '(小蛇化龍) 升龍得勢 男人發達 女產嬰童',
    '壬己' : '(反吟蛇刑) 官司敗訴 大禍將至 願守可吉',
    '王庚' : '(太白擒蛇) 難以發展 刑獄公平 立判邪正',
    '壬辛' : '(騰蛇相纏) 瑣事纏繞 動盪不安 被人欺瞞',
    '壬王' : '(天獄自刑) 求謀無成 內起禍患 諸事破敗',
    '王癸' : '(幼女姦淫) 奸私隱情 家醜外揚 測婚亂搞',

    '癸乙' : '(華蓋逢星) 貴人祿位 常人平安 吉凶石門',
    '癸丙' : '(華蓋悖師) 貴賤不利 因勢利導 反兇為吉',
    '癸丁' : '(騰蛇夭矯) 又舌是非 文書官司 火焚難逃',
    '癸戊' : '(天乙合會) 婚姻財喜 合作投資 吉門可行',
    '癸己' : '(華蓋地戶) 陰陽不和 音信皆阻 躲避為吉',
    '癸庚' : '(太白入網) 吉事成空 暴力爭訟 自罹罪責',
    '癸辛' : '(網蓋天牢) 官司敗訴 死罪難逃 測病大凶',
    '癸壬' : '(復見騰蛇) 嫁娶重婚 後嫁無子 不保年華',
    '癸癸' : '(天網四張) 行人失伴 病訟皆傷 不可謀為'
  };

  return juMap[gan] || '';
}

// 天干屬性
function getGanDescription(gan)
{

  const ganMap = {
    '甲' : '甲 - (陽木)頭兒、主導、掌控、尊貴、貴人',
    '乙' : '乙 - (陰木)機會、希望、光明、情人、軟弱',
    '丙' : '丙 - (陽火)機會、希望、光明、情人、亂子、悖逆',
    '丁' : '丁 - (陰火)機會、希望、光明、情人',
    '戊' : '戊 - (陽土)錢(本金)、仲介、天門',
    '己' : '己 - (陰土)慾望、念頭、想法、策劃、陷阱、詭計、地戶',
    '庚' : '庚 - (陽金)阻隔(對頭人、敵人)、打鬥、災害',
    '辛' : '辛 - (陰金)錯誤',
    '壬' : '壬 - (陽水)動、走、困(天羅)、迷惘',
    '癸' : '癸 - (陰水)動(足)、走(下半身)、困(地網)、性'
  }

  return ganMap[gan] || '';
}

// 八門屬性
function getMenDescription(men)
{
  const menMap = {
    '休門' : '休門 - 陽水。狀態：休閒愉悅、休息、休止、謁貴。人物：性格閒散、懶散、無鬥志之人，離職退休者，戀人，貴人。代表：戀愛、婚姻家庭。',
    '生門' : '生門 - 陽土。狀態：生機勃勃、生龍活虎、有生氣、活著的、生長。人物：生意人、從事生產、經營、管理之人，有生氣、樂觀向上之人。代表：生意、求財、房屋、陽宅、錢財(利息、利潤)。',
    '傷門' : '傷門 - 陽木。狀態：受傷、傷心傷身、破壞損傷、殘缺不完整。人物：受傷者、傷心人、傷害對方的人、軍警捕盜之人、討債人。代表：意外傷災、傷害、受傷部位、軍警捕盜、討債人、汽車。',
    '杜門' : '杜門 - 陰木。狀態：堵住、阻塞不通、阻隔、限制、隱藏躲藏。人物：軍警、檢察官、性格內向之人、關起門來研究學問的技術人員。',
    '景門' : '景門 - 陰火。狀態：景色亮麗、前景光明、喜慶宴席、文書訊息、流血、血光、發炎。人物：從事表演、影視、廣告、文化藝術、電子通訊、美容化妝、餐飲娛樂之人。代表：光景、風景、圖片、照片、計劃、文書、證件、考卷、合約、起訴書、消息、宴席酒店、血光。',
    '死門' : '死門 - 陰土。狀態：死亡、不動、受困、處於低潮、沒有生氣、死氣沈沈、死心、不開心、生悶氣、死板固執、結束。人物：屠戶、獵戶、行刑之人、吊喪之人、醫務人員。代表：地皮、地基、墳墓、陰宅。',
    '驚門' : '驚門 - 陰金。狀態：受驚、驚慌、驚恐不安、吵架爭吵、發出聲響。人物：律師、外交官、教師、歌星、檢調、監察部門工作者。代表：官司訴訟、口舌是非、爭吵吵架。',
    '開門' : '開門 - 陽金。狀態：開拓開展、開始、公開、開朗外向。人物：文官、法官、性格開朗外向、有開拓精神之人。代表：工作、開店、店面、工廠、飛機。'
  }
  return menMap[men] || '';
}

// 八星屬性
function getXingDescription(xing)
{
  const xingMap = {
    '天蓬' : '天蓬 - 陽水。特徵：膽大、妄為、貪、好色、聰明。人物：黑社會老大、兇犯、做大生意的商人。個性：膽大妄為，具有智慧，敢冒風險，喜暗中行事，貪酒色之人。',
    '天任' : '天任 - 陽土。特徵：快速敏捷、勇往直前、衝動、衝突、沖擊。人物：登山者、負重者、老實人。個性：任勞任怨、忠厚誠實、保守固執、做事不知變通、不敢放手大幹。',
    '天沖' : '天沖 - 陽木。特徵：任勞任怨、負重承受、一步一腳印。人物：武士、軍人、警察、消防員、運動員。個性：敢衝敢撞、衝動、性急易怒、做事爽快果斷、工作雷厲風行。',
    '天輔' : '天輔 - 陰木。特徵：輔佐指導、關愛保護、考試、文化教育、藝術。人物：教師、宰相、助理助手、文化詩人作家、心理輔導、社工。個性：有教養、有文化、有個人氣質、有奉獻精神、能關愛照顧別人、仁慈。',
    '天英' : '天英 - 陰火。特徵：熱情、急躁、聰明有才華、喜展現、社交。人物：演藝、公關社交、化妝美容、服裝設計、電子電器人員。個性：熱情好勝、喜展現、性燥易怒、聰明有才華、社交力佳。',
    '天芮' : '天芮 - 陰土。特徵：疾病、有問題的、學習、交友。人物：病人、學生、教師、仙佛、農民(底層民眾)、孕婦。個性：遲鈍、反應慢、固執、懦弱、愛交朋友、情慾。',
    '天柱' : '天柱 - 陰金。特徵：能言善辯、違逆唱反調、破壞、中流砥柱。人物：律師、檢察官、軍警、外交官、教師、演說人員、銷售員。個性：能言善辯、善唱反調、破壞折毀、怪異獨特、中流砥柱、力挽狂瀾。',
    '天心' : '天心 - 陽金。特徵：核心、領導、主管、醫生、醫藥。人物：領導人、主管、醫生、參謀長、軍師。個性：聰明能幹、心思縝密、富有領導才能、善於組織策劃管理。'
  }
  return xingMap[xing] || '';
}

// 八神屬性
function getShenDescription(shen)
{
  const shenMap = {
    '值符' : '值符 - 陽木。特徵：頭兒、老闊、喜掌控操縱、得神庇佑、多得能人幫助、有靠山、升遷、高檔名貴。人物：性格閒散、懶散、無鬥志之人，離職退休者，戀人，貴人。個性：掌控操縱、不屈居人下、有組織領導能力、有影響力、高尚華貴、氣度非凡。',
    '騰蛇' : '騰蛇 - 陰火。特徵：變化、反覆、纏繞、彎曲、虛詐虛假、驚恐怪異、虛驚、惡夢。人物：精神病人、作噩夢之人、耀眼妖艷的美女、狡猾虛詐之人。個性：變來變去、反反覆覆、虛詐不實、拐彎抹角、閃爍不定、死纏爛打、三心二意、陰陽怪氣。',
    '太陰' : '太陰 - 陰金。特徵：提升護佑、貴人暗中幫助、升遷、密謀策劃、陰謀詭計、與女人私事有關。人物：神佛、觀音、貴人、策劃師、暗中行事之人、文人、漂亮的女人。個性：性情溫順、助人、會照顧人、思想感情細膩、善密謀策劃、喜暗中行事，感情易暗戀、內心陰暗、愛哭。',
    '六合' : '六合 - 陰木。特徵：開心歡樂、喜慶、利於交易媒合、婚姻嫁娶、合作、口講業、數量多。人物：彌勒佛、媒人、仲介人、經紀人、證人證物、歌星、售貨員。個性：隨和開朗、歡樂人緣佳、愛笑可愛、討喜、喜做說合之事。',
    '白虎' : '白虎 - 陽金。特徵：道路、血光、災害、阻隔、爭鬥刑傷、官司、殘暴、威嚴霸氣、本領高強、技術硬。人物：軍人、警察、保鏢、有權勢之人、病人、遇災害之人。個性：兇猛、威權霸道、強硬、脾氣暴躁、本領過人、技術能力厲害。',
    '玄武' : '玄武 - 陽水。特徵：小偷竊盜、貪污行賄受賄、暗有私情、頭暈迷糊、不清楚、謊言虛假、愛騙人、暗昧之事、玄學。人物：貪污之人、竊盜小偷、頭暈迷糊之人、與玄學有關之人。個性：愛偷(偷人偷情)、聰明多智、巧言善變、神秘不可捉摸、虛偽狡猾、詐騙謊言、愛騙人、喜暗有私情。',
    '九地' : '九地 - 陰土。特徵：長久、緩慢、低處、地下、矮小、低調、穩定、堅牢、包容、不積極進取。人物：敦厚之人、不積極之人、矮小之人、為人低調之人。個性：性喜靜、穩定厚重、消極、缺乏上進心、不敢大膽進取、吝嗇節儉。',
    '九天' : '九天 - 陽金。特徵：快速、高處、天空、高大、高調張揚、志向遠大、好高騖遠、變動、遠走高飛、發展空間大、飛行。人物：爭勝高調之人、志向遠大之人、好高騖遠之人。個性：高調張揚、志向高遠、性剛好動、好強爭勝、好高騖遠、心高氣傲、虛幻。'
  }
  return shenMap[shen] || '';
}


// 干支顏色
function getGanColor(gan) {
    const colorMap = {
        '甲': 1, '寅': 1, '傷門': 1, '天沖': 1, '值符': 1, '震': 1,
        '乙': 2, '卯': 2, '杜門': 2, '天輔': 2, '六合': 2, '巽': 2,
        '丙': 3, '午': 3,
        '丁': 4, '巳': 4, '景門': 4, '天英': 4, '騰蛇': 4, '離': 4,
        '戊': 5, '戌': 5, '辰': 5, '生門': 5, '天任': 5, '艮': 5,
        '己': 6, '丑': 6, '未': 6, '死門': 6, '天芮': 6, '九地': 6, '坤': 6,
        '庚': 7, '申': 7, '開門': 7, '天心': 7, '白虎': 7, '九天': 7, '乾': 7,
        '辛': 8, '酉': 8, '驚門': 8, '天柱': 8, '太陰': 8, '兌': 8,
        '壬': 9, '子': 9, '休門': 9, '天蓬': 9, '玄武': 9, '坎': 9,
        '癸': 10, '亥': 10
    };
    return colorMap[gan] || 1;
}

// 五行顏色
function getWuxinColor(input) {
    const colorMap = {
        '金': 7, '驚門': 1, '開門': 1, '天柱': 1, '天心': 1, '太陰': 1, '白虎': 1, '九天': 1, '兌': 1,  '乾': 1,
        '木': 1, '傷門': 2, '杜門': 2, '天沖': 2, '天輔': 2, '值符': 2, '六合': 2, '震': 2,  '巽': 2,
        '水': 9, '休門': 3, '天蓬': 3, '坎': 3, '玄武': 3,
        '火': 3, '景門': 4, '天英': 4, '騰蛇': 4, '離': 4,
        '土': 5, '生門': 5, '死門': 5, '天任': 5, '天芮': 5, '九地': 5, '艮': 5, '坤': 5
    };
    if(input === '金' || input === '木' || input === '水' || input === '火' || input === '土') {
      return colorMap[input] || 1;
    } else {
      return getGanColor(input) || 1;
    }
}

// 找空亡與旬首
function getKongWangAndXunShou(hourGan) {

  const hourGanRank = {
      '甲子': 1, '乙丑': 1, '丙寅': 1, '丁卯': 1, '戊辰': 1, '己巳': 1, '庚午': 1, '辛未': 1, '壬申': 1, '癸酉': 1,
      '甲戌': 2, '乙亥': 2, '丙子': 2, '丁丑': 2, '戊寅': 2, '己卯': 2, '庚辰': 2, '辛巳': 2, '壬午': 2, '癸未': 2,
      '甲申': 3, '乙酉': 3, '丙戌': 3, '丁亥': 3, '戊子': 3, '己丑': 3, '庚寅': 3, '辛卯': 3, '壬辰': 3, '癸巳': 3,
      '甲午': 4, '乙未': 4, '丙申': 4, '丁酉': 4, '戊戌': 4, '己亥': 4, '庚子': 4, '辛丑': 4, '壬寅': 4, '癸卯': 4,
      '甲辰': 5, '乙巳': 5, '丙午': 5, '丁未': 5, '戊申': 5, '己酉': 5, '庚戌': 5, '辛亥': 5, '壬子': 5, '癸丑': 5,
      '甲寅': 6, '乙卯': 6, '丙辰': 6, '丁巳': 6, '戊午': 6, '己未': 6, '庚申': 6, '辛酉': 6, '壬戌': 6, '癸亥': 6
  };

  // 旬
  const XunMap = {
      1 : '甲子',
      2 : '甲戌',
      3 : '甲申',
      4 : '甲午',
      5 : '甲辰',
      6 : '甲寅'
  };

  // 旬首
  const XunShouMap = {
      1 : '戊',
      2 : '己',
      3 : '庚',
      4 : '辛',
      5 : '壬',
      6 : '癸'
  };

  // 空亡
  const KongWangMap = {
      1 : [6],      // 乾
      2 : [2, 7],   // 坤兌
      3 : [9, 2],   // 坤離
      4 : [4],      // 巽
      5 : [8, 3],   // 艮震
      6 : [1, 8]    // 坎艮
  };

  rank = hourGanRank[hourGan];

  return { '旬' : XunMap[rank], '旬首' : XunShouMap[rank], '空亡' : KongWangMap[rank] };
}


// 轉換阿拉伯數字為中文數字
function convertToChinese(number) {
    const cnNums = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    return number.toString().split('').map(digit => cnNums[parseInt(digit)]).join('');
}

// 計算時干
function getHourGan(dayGan, hourIndex) {
    const subHourGanRules = {
        '甲': '甲', '乙': '丙', '丙': '戊',
        '丁': '庚', '戊': '壬', '己': '甲',
        '庚': '丙', '辛': '戊', '壬': '庚', '癸': '壬'
    };

    const subHourGan = subHourGanRules[dayGan];
    const hourGanSequence = ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'];
    const subHourGanIndex = hourGanSequence.indexOf(subHourGan);

    return hourGanSequence[(subHourGanIndex + hourIndex) % 10];
}

// 計算奇門局數
function calculateQimenJu(yearZhi, monthZhi, day, hourZhi, month) {
    // 原始地支對應數字（保持不變）
    const originalZhiToNumber = {
        '子': 1, '丑': 2, '寅': 3, '卯': 4, '辰': 5,
        '巳': 6, '午': 7, '未': 8, '申': 9, '酉': 10,
        '戌': 11, '亥': 12
    };

    // 月支特殊對應數字
    const monthZhiToNumber = {
        '子': 11, '丑': 12, '寅': 1, '卯': 2, '辰': 3,
        '巳': 4, '午': 5, '未': 6, '申': 7, '酉': 8,
        '戌': 9, '亥': 10
    };

    const A = originalZhiToNumber[yearZhi];
    const B = monthZhiToNumber[monthZhi];  // 使用特殊的月支對應
    const C = day;
    const D = originalZhiToNumber[hourZhi];

    const total = A + B + C + D;
    const ju = total % 9 === 0 ? 9 : total % 9;

    return { ju, originalZhiToNumber, monthZhiToNumber, A, B, C, D, total };
}

function determineDunType(year, month, day, hour, minute, second) {

  const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);
  const lunar = solar.getLunar();

  const xiaZhiDate = lunar._getJieQiSolar(I18n.getMessage('jq.xiaZhi'));
  const dongZhiDate = lunar._getJieQiSolar("DONG_ZHI");

  // 夏至以前或冬至以後為陽遁，否則為陰遁
  if (solar.isBefore(xiaZhiDate) || solar.isAfter(dongZhiDate)) {
    return '陽遁';
  }
  else {
    return '陰遁';
  }
}


// 找值符星及值使門
function setZhiFuXing_ZhiShiMen(gong)
{
  // 中宮：值符星 - 芮，值使門 - 死
  if(gong === 5)
  {
    pan.set('值符星', '天芮');
    pan.set('值使門', '死門');
  }

  else
  {
    // 其他宮：找出原宮是那一個，再設值符星及值使門
    for(let i = 0; i < gongs_order_clockwise.length; ++i)
    {
      if(gong === gongs_order_clockwise[i])
      {
        pan.set('值符星', XING[i]);
        pan.set('值使門', MEN[i]);
        break;
      }
    }
  }
}

// 03 04 - 設地盤天干、旬首、值符星及值使門
function setDiPanTianGan_ZhiFuXing_ZhiShiMen(dunType, ju, xunShou) {

  const diPanTianGanArray = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
  var j = 0;
  var start = 0;
  var finish = 0;
  var change = 0;

  // Need to consider both directions for 陽遁 & 陰遁
  if(dunType === '陽遁')
  {
    start = ju;
    finish = ju + 8;
    change = 1;
  }
  else {
    start = ju + 9;
    finish = ju;
    change = -1;
  }

  for(let i = start; ; i += change, ++j)
  {
    if(dunType === '陽遁' && i > ju + 8)
    {
      break;
    }
    if(dunType === '陰遁' && i <= ju)
    {
      break;
    }

    gongs[(i - 1) % 9 + 1].set('地盤天干', [diPanTianGanArray[j]]);
    otherMessage += '第 ' + ((i - 1) % 9 + 1).toString() + ' 宮設地盤天干 ' + diPanTianGanArray[j] + '\n';

    if(diPanTianGanArray[j] === xunShou)
    {
      setZhiFuXing_ZhiShiMen((i - 1) % 9 + 1);
    }
  }

  gongs[2].set('地盤天干', [gongs[2].get('地盤天干')[0], gongs[5].get('地盤天干')[0]]);
  otherMessage += '第 2 宮設地盤天干 ' + gongs[2].get('地盤天干') + '\n';

  // Clear 中宮地盤天干
  gongs[5].set('地盤天干', []);

}

// 05 - 設定九星
function setJiaoXing(hourGan) {

  let startGong = 0;
  let startIndex = 0;
  let startXing = 0;

  if(hourGan === '甲')
  {
    hourGan = pan.get('旬首');
  }

  // 先找出值符星由第幾宮開始
  for(let i = 1; i < gongs.length; ++i) {

    let diPanTianGan = gongs[i].get('地盤天干');

    for(let j = 0; j < diPanTianGan.length; ++j) {
      if(diPanTianGan[j] === hourGan) {
        startGong = i;
        otherMessage += '值符星 ' + pan.get('值符星') + ' 始於第 ' + startGong.toString() + ' 宮\n';
        break;
      }
    }

    if(startGong > 0)
    {
      break;
    }
  }

  if(startGong === 5) {
    startGong = 2;
  }

  for(let i = 0; i < gongs_order_clockwise.length; ++i) {
    // 找出八宮順序的 index
    if(gongs_order_clockwise[i] === startGong)
    {
      startIndex = i;
    }

    // 找出值符星的 index
    if(pan.get('值符星') === XING[i])
    {
      startXing = i;
    }
  }

  // 從值符星開始設到不同的宮
  for(let i = 0; i < gongs_order_clockwise.length; ++i) {
    gongIndex = gongs_order_clockwise[(i + startIndex) % 8];
    gongs[gongIndex].set('星', XING[(i + startXing) % 8]);
    otherMessage += '第 ' + gongIndex.toString() + ' 宮設星 ' + XING[(i + startXing) % 8] + ' \n';
  }
}




// 06 - 設定天盤天干
function setTianPanTianGan() {

  let diPanTianGan = gongs[1].get('地盤天干');
  let startGong = 0;
  let destGongIndex = 0;

  // 先找出值符星由第幾宮開始
  for(let i = 1; i < gongs.length; ++i) {

    if(gongs[i].get('星') === '天蓬') {
      startDestGong = i;
      break;
    }
  }

  otherMessage += diPanTianGan + ' 設到第 ' + startDestGong.toString() + ' 宮\n';

  for(let i = 0; i < gongs_order_clockwise.length; ++i)
  {
    if(startDestGong === gongs_order_clockwise[i]) {
      destGongIndex = i;
      break;
    }
  }

  for(let i = 0; i < gongs_order_clockwise.length; ++i)
  {
      gongs[gongs_order_clockwise[(destGongIndex + i) % 8]].set('天盤天干', gongs[gongs_order_clockwise[i]].get('地盤天干'));
      otherMessage += '第 ' + gongs_order_clockwise[(destGongIndex + i) % 8].toString() + ' 宮設天盤天干 ' + JSON.stringify(gongs[gongs_order_clockwise[i]].get('地盤天干')) + ' \n';
  }
}


// 06-2 - 中宮地盤天干從二宮搬回中宮
function moveZhongGongDiPanTianGanBack() {

  gongs[5].set('地盤天干', [gongs[2].get('地盤天干')[1]]);
  gongs[2].set('地盤天干', [gongs[2].get('地盤天干')[0]]);
}


// 07 - 設定八門
function setBaMen() {

  var xunZhi = pan.get('旬支');
  var xunShou = pan.get('旬首');
  var hourGan = pan.get('時干');
  var hourZhi = pan.get('時支');

  const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  var zhiDiff = 0;
  var hourZhiLocation = 0;
  var zunZhiLocation = 0;
  let startGong = 0;
  let startGongIndex = 0;
  let startMenIndex = 0;

  // 先找出旬支數到時支有多少個支，陽遁順數，陰遁逆數
  // 找出旬支排多少個支
  while(ZHI[zunZhiLocation] != xunZhi) {
    zunZhiLocation++;
  }

  while(ZHI[hourZhiLocation] != hourZhi) {
    hourZhiLocation++;
  }

  otherMessage += '旬支' + xunZhi + '排第 ' + zunZhiLocation.toString() + '\n';
  otherMessage += '時支' + hourZhi + '排第 ' + hourZhiLocation.toString() + '\n';

  if(hourZhiLocation < zunZhiLocation)
  {
      hourZhiLocation += 12;
  }

  // 支數差
  zhiDiff = hourZhiLocation - zunZhiLocation;

  otherMessage += "支差：" + zhiDiff.toString() + '\n';
  otherMessage += "旬首：" + xunShou + '\n';

  // 先找出值符星由第幾宮開始
  for(let i = 1; i < gongs.length; ++i) {

    let diPanTianGan = gongs[i].get('地盤天干');

    for(let j = 0; j < diPanTianGan.length; ++j) {
      if(diPanTianGan[j] === xunShou) {
        startGong = i;
        otherMessage += '第 ' + startGong.toString() + ' 宮開始數\n';
        break;
      }
    }
  }

  if(pan.get('遁類') === '陽遁') {
    // 順數
    startGong = startGong + zhiDiff;
    if(startGong > 9)
    {
      startGong = startGong - 9;
    }
  } else {
    // 逆數
    startGong = startGong - zhiDiff;
    if(startGong < 1)
    {
      startGong = startGong + 9;
    }
  }

  if(startGong === 5)
  {
    startGong = 2;
  }

  otherMessage += '值使門 ' + pan.get('值使門') + ' 始於第 ' + startGong.toString() + ' 宮\n';

  for(let i = 0; i < gongs_order_clockwise.length; ++i) {

    if(gongs_order_clockwise[i] === startGong) {
      startGongIndex = i;
    }

    if(MEN[i] === pan.get('值使門')) {
      startMenIndex = i;
    }
  }

  for(let i = 0; i < gongs_order_clockwise.length; ++i) {

    gongs[gongs_order_clockwise[(i + startGongIndex) % 8]].set('門', MEN[(i + startMenIndex) % 8]);
    otherMessage += '第 ' + gongs_order_clockwise[(i + startGongIndex) % 8].toString() + ' 宮設 ' + MEN[(i + startMenIndex) % 8] + ' 門\n';

  }
}



// 08 - 設定八神
function setBaShen(panType) {

  var xunShou = pan.get('旬首');
  var startGong = 0;
  var startShenIndex = 0;

  // 先找出值符星由第幾宮開始
  for(let i = 1; i < gongs.length; ++i) {

    let tianGan = gongs[i].get(panType + '天干');

    for(let j = 0; tianGan && j < tianGan.length; ++j) {
      if(tianGan[j] === xunShou) {
        startGong = i;
        otherMessage += '第 ' + startGong.toString() + ' 宮開始數\n';
        break;
      }
    }

  }

  // 如果數到第五宮，由第二宮開始排
  if(startGong === 5) {
    startGong = 2;
  }

  if(pan.get('遁類') === '陽遁') {
    // 順數
    for(let i = 0; i < gongs_order_clockwise.length; ++i) {
      if(gongs_order_clockwise[i] === startGong) {
        startGongIndex = i;
      }
    }
  } else {
    // 逆數
    for(let i = 0; i < gongs_order_anticlockwise.length; ++i) {
      if(gongs_order_anticlockwise[i] === startGong) {
        startGongIndex = i;
      }
    }
  }

  otherMessage += '值符 始於第 ' + startGong.toString() + ' 宮\n';

  for(let i = 0; i < gongs_order_clockwise.length; ++i) {
      if(pan.get('遁類') === '陽遁') {
        gongs[gongs_order_clockwise[(i + startGongIndex) % 8]].set(panType + '神', SHEN[i]);
        otherMessage += '第 ' + gongs_order_clockwise[(i + startGongIndex) % 8].toString() + ' 宮設 ' + SHEN[i] + ' 神\n';
      }
      else {
        gongs[gongs_order_anticlockwise[(i + startGongIndex) % 8]].set(panType + '神', SHEN[i]);
        otherMessage += '第 ' + gongs_order_anticlockwise[(i + startGongIndex) % 8].toString() + ' 宮設 ' + SHEN[i] + ' 神\n';
      }
  }
}

// 08-2 - 設定隱干
function setYinGan() {

  const tianGanArray = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
  let diPanTianGan = gongs[1].get('地盤天干');
  let startGong = 0;
  let startDestGong = 0;
  let destGongIndex = 0;

//  let ju = qimenJu;

  if(pan.get('時干') === '甲') {

    startGong = 5;
    startGan = pan.get('旬首');

  } else {

    var menGong = 0;
    var xingGong = 0;

    // 先找出值使門在第幾宮
    for(let i = 1; i < gongs.length; ++i) {

      if(gongs[i].get('門') === pan.get('值使門')) {
        menGong = i;
      }

      if(gongs[i].get('星') === pan.get('值符星')) {
        xingGong = i;
      }

      if(menGong > 0 && xingGong > 0) {
        break;
      }
    }

    if(menGong === xingGong) {

      startGong = 5;
      startGan = pan.get('旬首');

    } else {

      // 先找出值使門在第幾宮
      for(let i = 1; i < gongs.length; ++i) {

        if(gongs[i].get('門') === pan.get('值使門')) {
          startGong = i;
          break;
        }
      }
    }
  }

  otherMessage += '時干 ' + pan.get('時干') + ' 設到第 ' + startGong.toString() + ' 宮' + pan.get('值使門') + '\n';

  // 先找出時干是由第幾宮的地盤天干
  for(let i = 1; i < gongs.length; ++i) {

    if(gongs[i].get('地盤天干') === pan.get('時干')) {
      startGong = i;
      break;
    }
  }

  for(let i = 0; i < gongs_order_clockwise.length; ++i)
  {
    if(startDestGong === gongs_order_clockwise[i]) {
      destGongIndex = i;
      break;
    }
  }
  destGongIndex = 0;
  for(let i = 0; i < gongs_order_clockwise.length; ++i)
  {
      gongs[gongs_order_clockwise[(destGongIndex + i) % 8]].set('引干', gongs[gongs_order_clockwise[i]].get('地盤天干'));
      otherMessage += '第 ' + gongs_order_clockwise[(destGongIndex + i) % 8].toString() + ' 宮設引干 ' + gongs[gongs_order_clockwise[i]].get('地盤天干') + ' \n';
  }

}


// 09 - 找擊刑
function setJiXing()
{
  // Case 1
  // 8 宮 ～ 庚
  // 9 宮 ～ 辛
  // 3 宮 ～ 戊
  // 2 宮 ～ 己
  // 4 宮 ～ 壬癸
  var jiXingMap = {
    '庚' : 8,
    '辛' : 9,
    '戊' : 3,
    '己' : 2,
    '壬' : 4,
    '癸' : 4
  };

  for(let gan in jiXingMap)
  {
    // 先找出值符星由第幾宮開始
    let tianPanTianGan = gongs[jiXingMap[gan]].get('天盤天干');
    let diPanTianGan = gongs[jiXingMap[gan]].get('地盤天干');
    var jiXing = false;

    for(let j = 0; tianPanTianGan && j < tianPanTianGan.length; ++j) {
      if(tianPanTianGan[j] === gan) {
        gongs[jiXingMap[gan]].set('擊刑', true);
        otherMessage += '第 ' + jiXingMap[gan].toString() + ' 宮設 擊刑 - ' + gan + '\n';
        break;
      }
    }
    for(let j = 0; diPanTianGan && j < diPanTianGan.length; ++j) {
      if(diPanTianGan[j] === gan) {
        gongs[jiXingMap[gan]].set('擊刑', true);
        otherMessage += '第 ' + jiXingMap[gan].toString() + ' 宮設 擊刑 - ' + gan + '\n';
        break;
      }
    }
  }

  // Case 2
  // 辛 ＋ 辛
  // 壬 ＋ 壬
  for(let i = 1; i < 10; i++)
  {
    // 先找出值符星由第幾宮開始
    let tianPanTianGan = gongs[i].get('天盤天干');
    let diPanTianGan = gongs[i].get('地盤天干');

    var tian_xin = false;
    var di_xin = false;
    var tian_ren = false;
    var di_ren = false;

    for(let j = 0; tianPanTianGan && j < tianPanTianGan.length; ++j) {
      if(tianPanTianGan[j] === '辛') {
        tian_xin = true;
      } else if(tianPanTianGan[j] === '壬') {
        tian_ren = true;
      }
    }

    for(let j = 0; diPanTianGan && j < diPanTianGan.length; ++j) {
      if(diPanTianGan[j] === '辛') {
        di_xin = true;
      } else if(diPanTianGan[j] === '壬') {
        di_ren = true;
      }
    }

    if(tian_xin && di_xin)
    {
      gongs[i].set('自刑', true);
      otherMessage += '第 ' + i.toString() + ' 宮設 自刑 - 天地辛\n';
    }

    if(tian_ren && di_ren)
    {
      gongs[i].set('自刑', true);
      otherMessage += '第 ' + i.toString() + ' 宮設 自刑 - 天地壬\n';
    }
  }
}

// 10 - 找入墓
function setRuWu()
{
  // 8 宮 ～ 丁，己，庚
  // 6 宮 ～ 乙，丙，戊
  // 4 宮 ～ 辛，壬
  // 2 宮 ～ 乙，癸

  var ruWuMap = {
    '丁' : [8],
    '己' : [8],
    '庚' : [8],
    '辛' : [4],
    '壬' : [4],
    '丙' : [6],
    '戊' : [6],
    '癸' : [2],
    '乙' : [2, 6]
  };

  for(let gan in ruWuMap)
  {

    for(let i = 0; i < ruWuMap[gan].length; ++i)
    {
      let gong = ruWuMap[gan][i];

      // 先找出值符星由第幾宮開始
      let tianPanTianGan = gongs[gong].get('天盤天干');
      let diPanTianGan = gongs[gong].get('地盤天干');
      var ruWu = false;

      for(let j = 0; tianPanTianGan && j < tianPanTianGan.length; ++j) {
        if(tianPanTianGan[j] === gan) {
          gongs[gong].set('入墓', true);
          otherMessage += '第 ' + gong.toString() + ' 宮設 入墓 - ' + gan + '\n';
          break;
        }
      }
      for(let j = 0; diPanTianGan && j < diPanTianGan.length; ++j) {
        if(diPanTianGan[j] === gan) {
          gongs[gong].set('入墓', true);
          otherMessage += '第 ' + gong.toString() + ' 宮設 入墓 - ' + gan + '\n';
          break;
        }
      }

    }
  }
}

// 11 - 找門迫
function setMenBi()
{
  // 生，死 於 1 宮
  // 傷，杜 於 2 宮
  // 驚，開 於 3 宮
  // 驚，開 於 4 宮
  // 景 於 6 宮
  // 景 於 7 宮
  // 傷，杜 於 8 宮
  // 休 於 9 宮

  var menBiMap = {
    '休門' : [9],
    '生門' : [1],
    '傷門' : [8, 2],
    '杜門' : [8, 2],
    '景門' : [6, 7],
    '死門' : [1],
    '驚門' : [3, 4],
    '開門' : [3, 4]
  };

  for(let men in menBiMap)
  {
    for(let i = 0; i < menBiMap[men].length; ++i)
    {
      let gong = menBiMap[men][i];

      if(men === gongs[gong].get('門')) {
          gongs[gong].set('門迫', true);
          otherMessage += '第 ' + gong.toString() + ' 宮設 門迫 - ' + men + '\n';
          break;
      }
    }
  }
}


// 12 - 找馬星
function setMaXing()
{
  // 2 宮 ～ 寅、午、戌
  // 4 宮 ～ 亥、卯、未
  // 6 宮 ～ 巳、酉、丑
  // 8 宮 ～ 申、子、辰

  var maXingMap = {
    '寅' : 2,
    '午' : 2,
    '戌' : 2,
    '亥' : 4,
    '卯' : 4,
    '未' : 4,
    '巳' : 6,
    '酉' : 6,
    '丑' : 6,
    '申' : 8,
    '子' : 8,
    '辰' : 8
  };

  var hourZhi = pan.get('時支');

  for(let zhi in maXingMap)
  {
    if(zhi === hourZhi) {
        gongs[maXingMap[zhi]].set('馬星', true);
        otherMessage += '第 ' + maXingMap[zhi].toString() + ' 宮設 馬星 - ' + zhi + '\n';
        break;
    }
  }
}

// 盤
var pan = new Map();

// 九宮
var gongs = [];

for(let i = 1; i < 10; ++i)
{
  gongs[i] = new Map();
}

var otherMessage = '\n';

// assign names to 九宮
for(let i = 0; i < gongs_order_clockwise.length; ++i)
{
  gongs[gongs_order_clockwise[i]].set('宮', GONG[i]);
}

gongs[5].set('宮', '中');




// 定義五行對應的地支
const fiveElementBranches = {
    木: ["寅", "卯"],
    火: ["巳", "午"],
    土: ["辰", "戌", "丑", "未"],
    金: ["申", "酉"],
    水: ["亥", "子"]
};

// 定義五行旺衰規律表
const elementSeason = {
    "木": { 旺: "木", 相: "火", 休: "水", 囚: "金", 死: "土" },
    "土": { 旺: "土", 相: "金", 休: "火", 囚: "木", 死: "水" },
    "火": { 旺: "火", 相: "土", 休: "木", 囚: "水", 死: "金" },
    "金": { 旺: "金", 相: "水", 休: "土", 囚: "火", 死: "木" },
    "水": { 旺: "水", 相: "木", 休: "金", 囚: "火", 死: "土" }
};

// 判定地支所在的季節
function getElementFromBranch(branch) {
    if (["寅", "卯"].includes(branch)) return "木";
    if (["辰", "戌", "丑", "未"].includes(branch)) return "土";
    if (["巳", "午"].includes(branch)) return "火";
    if (["申", "酉"].includes(branch)) return "金";
    if (["亥", "子"].includes(branch)) return "水";
    return null;
}

function getElement(stem) {
    if (["甲", "乙"].includes(stem)) return "木";
    if (["丙", "丁"].includes(stem)) return "火";
    if (["戊", "己"].includes(stem)) return "土";
    if (["庚", "辛"].includes(stem)) return "金";
    if (["庚", "辛"].includes(stem)) return "水";
    return null;
}

// 推算五行的旺衰狀態
function calculateElementState(dayElement, monthBranch) {
    const season = getElementFromBranch(monthBranch); // 判斷季節
    if (!season) {
        throw new Error("無效的地支: " + monthBranch);
    }

    const rules = elementSeason[season]; // 獲取該季節的五行規律

    // 返回日干五行在該季節中的旺衰狀態
    for (const state in rules) {
        if (rules[state] === dayElement) {
            return state; // 返回狀態（旺、相、休、囚、死）
        }
    }

    return null; // 若無法匹配，返回null
}


// 後天八掛對應先天八掛宮位
const baGuaMap = {

  "坎" : 2,
  "艮" : 3,
  "震" : 9,
  "巽" : 7,
  "離" : 6,
  "坤" : 4,
  "兌" : 1,
  "乾" : 8
};


// 推算 3412
function calculate3412(gan, order) {

  otherMessage += '找 ' + gan + '在第幾宮\n';

  for(let i = 1; i < gongs.length; ++i) {

    // 要找值符星
    if(gan === '甲') {

    }

    if(i === 5) {
      continue;
    }

    if(gongs[i].get('順序') === 0) {
      if(gongs[i].get('天盤天干')[0] === gan || gongs[i].get('天盤天干')[1] === gan) {
        gongs[i].set('順序',  order);
        otherMessage += '順序：' + order + '加到第' + i + '宮（天盤天干）\n';
        return;
      }
    }
  }

  for(let i = 1; i < gongs.length; ++i) {
    if(i === 5) {
      continue;
    }

    if(gongs[i].get('順序') === 0) {
      otherMessage += gongs[i].get('地盤天干') + '\n';
      if(gongs[i].get('地盤天干') === gan) {
        gongs[i].set('順序',  order);
        otherMessage += '順序：' + order + '加到第' + i + '宮（地盤天干）\n';
        return;
      }
    }
  }

  for(let i = 1; i < gongs.length; ++i) {
    if(i === 5) {
      continue;
    }

    if(gongs[i].get('順序') === 0) {
      if(gongs[i].get('隱干') === gan) {
        gongs[i].set('順序',  order);
        otherMessage += '順序：' + order + '加到第' + i + '宮（隱干）\n';
        return;
      }
    }
  }

}



function calculate() {

    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);
    const day = parseInt(document.getElementById('day').value);
    const hourIndex = parseInt(document.getElementById('time').value);

    if (!year || !month || !day) {
        alert('請完整填寫所有資料');
        return;
    }

    otherMessage = '';

    // 使用 Solar 類建立日期
    const solar = Solar.fromYmd(year, month, day);

    // 獲取農曆
    const lunar = solar.getLunar();

    // 農曆日期轉換
    const dayString = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
        '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
        '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

    const lunarYear = convertToChinese(lunar.getYear());
    const lunarMonth = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '臘'][lunar.getMonth() - 1];
    const lunarDay = dayString[lunar._p.day - 1];
    const lunarDateStr = `農曆${lunarYear}年${lunarMonth}月${lunarDay}`;

    // 干支計算
    const yearGan = GAN[lunar._p.yearGanIndex];
    const yearZhi = ZHI[lunar._p.yearZhiIndex];
    const monthGan = GAN[lunar._p.monthGanIndex];
    const monthZhi = ZHI[lunar._p.monthZhiIndex];
    const dayGan = GAN[lunar._p.dayGanIndex];
    const dayZhi = ZHI[lunar._p.dayZhiIndex];
    const hourGan = getHourGan(dayGan, hourIndex);
    const hourZhi = ZHI[hourIndex];

    // 奇門局數計算
    const qimenJu = calculateQimenJu(yearZhi, monthZhi, lunar._p.day, hourZhi, month);

    // 為了計算方便，子時為 12：00, 丑時為 2：00, etc
    const dunType = determineDunType(year, month, day, hourIndex * 2, 0, 0);

    // 計旬首及空亡
    const kongWangAndXunShou = getKongWangAndXunShou(hourGan + hourZhi);
    pan.set('旬', kongWangAndXunShou['旬'] + kongWangAndXunShou['旬首']);
    pan.set('旬首', kongWangAndXunShou['旬首']);
    pan.set('旬支', kongWangAndXunShou['旬'].at(1));
    pan.set('時干', hourGan);
    pan.set('時支', hourZhi);
    pan.set('遁類', dunType);
    pan.set('局數', qimenJu.ju);
    pan.set('五不遇時', checkWuBuYueShi(dayGan, hourGan + hourZhi));

    for(let i = 1; i < 10; ++i)
    {
      gongs[i].set('空亡', false);
      gongs[i].set('擊刑', false);
      gongs[i].set('自刑', false);
      gongs[i].set('入墓', false);
      gongs[i].set('馬星', false);
      gongs[i].set('門迫', false);
      gongs[i].set('順序', 0);
    }

    // 設定空亡
    for(let i = 0; i < kongWangAndXunShou['空亡'].length; ++i) {

      gongs[kongWangAndXunShou['空亡'][i]].set('空亡',  true);
      otherMessage += '第 ' + kongWangAndXunShou['空亡'][i].toString() + ' 宮設空亡\n';
    }

    otherMessage += dunType + '\n';

    // 設定地盤天干
    otherMessage += '找地盤天干：\n';
    setDiPanTianGan_ZhiFuXing_ZhiShiMen(dunType, qimenJu.ju, kongWangAndXunShou['旬首']);
    otherMessage += '\n';

    otherMessage += '找旬首、值符星、值使門：\n';
    otherMessage += '旬：' + pan.get('旬') + '\n';
    otherMessage += '旬首：' + pan.get('旬首') + '\n';
    otherMessage += '旬支：' + pan.get('旬支') + '\n';
    otherMessage += '時干：' + pan.get('時干') + '\n';
    otherMessage += '時支：' + pan.get('時支') + '\n';
    otherMessage += '值符星：' + pan.get('值符星') + '\n';
    otherMessage += '值使門：' + pan.get('值使門') + '\n';
    otherMessage += '\n';

    // 設九星跟時干走，不用天禽
    otherMessage += '找九星：\n';
    setJiaoXing(hourGan);
    otherMessage += '\n';

    // 設天盤天干跟九星
    otherMessage += '找天盤天干：\n';
    setTianPanTianGan();
    otherMessage += '\n';

    otherMessage += '將中宮地盤天干從二宮移回中宮：\n';
    moveZhongGongDiPanTianGanBack();
    otherMessage += '\n';

    // 設八門
    otherMessage += '找八門：\n';
    setBaMen();
    otherMessage += '\n';

    // 設八神
    otherMessage += '找八神：\n';
    setBaShen('天盤');
    setBaShen('地盤');
    otherMessage += '\n';

    // 設引干
    otherMessage += '找引干：\n';
    setYinGan();
    otherMessage += '\n';

    // 設擊刑
    otherMessage += '找擊刑：\n';
    setJiXing();
    otherMessage += '\n';

    // 設入墓
    otherMessage += '找入墓：\n';
    setRuWu();
    otherMessage += '\n';

    // 設門迫
    otherMessage += '找門迫：\n';
    setMenBi();
    otherMessage += '\n';

    // 設門迫
    otherMessage += '找馬星：\n';
    setMaXing();
    otherMessage += '\n';

    var hotGong = new Map();
    // 找旺相休囚死
    otherMessage += '找旺相休囚死：\n';
    otherMessage += '木：' + calculateElementState('木', monthZhi) + '\n';
    hotGong.set(calculateElementState('木', monthZhi), '木');
    otherMessage += '火：' + calculateElementState('火', monthZhi) + '\n';
    hotGong.set(calculateElementState('火', monthZhi), '火');
    otherMessage += '土：' + calculateElementState('土', monthZhi) + '\n';
    hotGong.set(calculateElementState('土', monthZhi), '土');
    otherMessage += '水：' + calculateElementState('水', monthZhi) + '\n';
    hotGong.set(calculateElementState('水', monthZhi), '水');
    otherMessage += '金：' + calculateElementState('金', monthZhi) + '\n';
    hotGong.set(calculateElementState('金', monthZhi), '金');
    otherMessage += '\n';

    const hotGongResultDiv = document.getElementById('hotGongResult');
    hotGongResultDiv.innerHTML = `
        <div class="eight-characters">
            <div>
                <span class="chars wang-1">旺</span>
                <span class="chars wang-2">相</span>
                <span class="chars wang-3">休</span>
                <span class="chars wang-4">囚</span>
                <span class="chars wang-5">死</span>
            </div>
            <div>
                <span class="chars gan-${getWuxinColor(hotGong.get('旺'))}">${hotGong.get('旺')}</span>
                <span class="chars gan-${getWuxinColor(hotGong.get('相'))}">${hotGong.get('相')}</span>
                <span class="chars gan-${getWuxinColor(hotGong.get('休'))}">${hotGong.get('休')}</span>
                <span class="chars gan-${getWuxinColor(hotGong.get('囚'))}">${hotGong.get('囚')}</span>
                <span class="chars gan-${getWuxinColor(hotGong.get('死'))}">${hotGong.get('死')}</span>
            </div>
        </div>
        `;


    // 找 3412
    otherMessage += '找 3412：\n';
    calculate3412(dayGan, 3);
    calculate3412(hourGan, 4);
    calculate3412(yearGan, 1);
    calculate3412(monthGan, 2);

//    for(let i = 1; i < gongs.length; ++i)
//    {
//      otherMessage += gongs[gongs_order_clockwise[i]].get('宮') + '\n';
//    }

    // 結果顯示
    const qimenJuResultDiv = document.getElementById('qimenJuResult');
    qimenJuResultDiv.innerHTML = `
        <div class="qimen-ju">
            <b><span class="${dunType === '陽遁' ? 'yang-dun' : 'yin-dun'}">
            ${dunType}${convertToChinese(qimenJu.ju)}局</span></b>
        </div>
        <div class="eight-characters">
            <div>
                <span class="header">年</span>
                <span class="header">月</span>
                <span class="header">日</span>
                <span class="header">時</span>
            </div>
            <div>
                <span class="chars gan-${getGanColor(yearGan)}">${yearGan}</span>
                <span class="chars gan-${getGanColor(monthGan)}">${monthGan}</span>
                <span class="chars gan-${getGanColor(dayGan)}">${dayGan}</span>
                <span class="chars gan-${getGanColor(hourGan)}">${hourGan}</span>
            </div>
            <div>
                <span class="chars gan-${getGanColor(yearZhi)}">${yearZhi}</span>
                <span class="chars gan-${getGanColor(monthZhi)}">${monthZhi}</span>
                <span class="chars gan-${getGanColor(dayZhi)}">${dayZhi}</span>
                <span class="chars gan-${getGanColor(hourZhi)}">${hourZhi}</span>
            </div>
        </div>
        <p>${lunarDateStr}</p>
        `;

    // 顯示盤
    const qimenPanResultDiv = document.getElementById('qimenPanResult');
    qimenPanResultDiv.innerHTML = `
        <div class="grid-container">
            ${[4,9,2,3,5,7,8,1,6].map(i => {
                // 獲取當前宮位的天干
                const tianPanGan = gongs[i].get('天盤天干') || '';
                const diPanGan = gongs[i].get('地盤天干') || '';
                const yinGan = gongs[i].get('引干') || '';

                var marks = '';
                marks = gongs[i].get('空亡') ? '空' : '';
                marks += gongs[i].get('擊刑') ? '刑' : '';
                marks += gongs[i].get('自刑') ? '自' : '';
                marks += gongs[i].get('入墓') ? '墓' : '';
                marks += gongs[i].get('馬星') ? '馬' : '';
                marks += gongs[i].get('門迫') ? '迫' : '';

                const bazi = [dayGan];  // 這裡應該是實際的八字天干
                if (!bazi.includes('甲')) {
                    bazi.push('戊');  // 如果沒有甲，加入戊
                }
                const matchingGans = [yearGan, monthGan, dayGan, hourGan];
                const isTianPanMatch = matchingGans.includes(tianPanGan) || tianPanGan === '戊';
                const isDiPanMatch = matchingGans.includes(diPanGan) || diPanGan === '戊';
              if(i != 5)
              {
                return `
                    <div class="grid-item palace-${i}" id="palace-${i}">
                        <div class="gong gan-${getWuxinColor(gongs[i].get('宮'))}">
                          第${convertToChinese(i)}宮（${gongs[i].get('宮')})
                          <span class='gong_desc'>
                            ${getGongDescription(gongs[i].get('宮'))}
                          </span>
                        </div>
                        <div class="grid-content">

                            <div class="shen">
                                <span class="shen gan-${getWuxinColor(gongs[i].get('天盤神'))}">${gongs[i].get('天盤神') || ''}
                                  <span class='shen_desc'>
                                    ${getShenDescription(gongs[i].get('天盤神'))}
                                  </span>
                                </span>
                                <span class="gan gan-${getGanColor(tianPanGan[1])} ${isTianPanMatch ? 'grid-gan-bold' : ''}">${tianPanGan[1] || ''}
                                  <span class='gan_desc'>
                                    ${getGanDescription(tianPanGan[1]) || ''}
                                  </span>
                                </span>
                                <span class="gan gan-${getGanColor(tianPanGan[0])} ${isTianPanMatch ? 'grid-gan-bold' : ''}">${tianPanGan[0] || ''}
                                  <span class='gan_desc'>
                                    ${getGanDescription(tianPanGan[0]) || ''}:
                                    ${getGanDescription(diPanGan) || ''}:
                                    ${getJuDescription(tianPanGan[0] + diPanGan[0]) || ''}
                                  </span>
                                </span>
                            </div>

                            <div class="xing">
                                <span class ="xing gan-${getWuxinColor(gongs[i].get('星'))}">${gongs[i].get('星') || ''}
                                  <span class='xing_desc'>
                                    ${getXingDescription(gongs[i].get('星'))}
                                  </span>
                                </span>
                                <span class="gan gan-${getGanColor(diPanGan)} ${isDiPanMatch ? 'grid-gan-bold' : ''}">${diPanGan}
                                  <span class='gan_desc'>
                                    ${getGanDescription(tianPanGan[0]) || ''}:
                                    ${getGanDescription(diPanGan) || ''}:
                                    ${getJuDescription(tianPanGan[0] + diPanGan[0]) || ''}
                                  </span>
                                </span>
                            </div>

                            <div class='men'>
                                <span class="men gan-${getWuxinColor(gongs[i].get('門'))}">
                                  ${gongs[i].get('門') || ''}
                                  <span class='men_desc'>
                                    ${getMenDescription(gongs[i].get('門'))}
                                  </span>
                                </span>
                            </div>

                            <div class="shen">
                                <span class="shen gan-${getWuxinColor(gongs[i].get('地盤神'))}">${gongs[i].get('地盤神') || ''}</span>
                                <span class='shen_desc'>
                                  ${getShenDescription(gongs[i].get('地盤神'))}
                                </span>
                                <span class="marks">
                                    ${marks}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
              }
              else {

                var menFuYin = false;
                var menFanYin = false;

                var TianGanFuYin = false;
                var TianGanFanYin = false;

                const tianPanGan = gongs[1].get('天盤天干');
                const diPanGan1 = gongs[1].get('地盤天干');
                const diPanGan9 = gongs[9].get('地盤天干');

                if(gongs[1].get('門') === '休門') {
                  menFuYin = true;
                } else if(gongs[1].get('門') === '景門') {
                  menFanYin = true;
                }

                if(tianPanGan[0] && tianPanGan[0] === diPanGan1[0]) {
                  TianGanFuYin = true;
                } else if(tianPanGan[0] && tianPanGan[0] === diPanGan9[0]) {
                  TianGanFanYin = true;
                }

                return `
                    <div class="grid-item palace-${i}" id="palace-${i}">
                        <div class="grid-title">第${convertToChinese(i)}宮（${gongs[i].get('宮')}）</div>
                        <div class="grid-content">
                            <div class="label">
                              旬：${pan.get('旬')}
                            </div>
                            <div class="label">
                              時柱：${pan.get('時干')+pan.get('時支')}
                            </div>
                            <div class="label">
                              值符星：${pan.get('值符星')}
                            </div>
                            <div class="label">
                              值使門：${pan.get('值使門')}
                            </div>

                            <div class="marks">
                              ${menFuYin ? '門伏吟' : ''}
                            </div>
                            <div class="marks">
                              ${menFanYin ? '門反吟' : ''}
                            </div>
                            <div class="marks">
                              ${TianGanFuYin ? '天干伏吟' : ''}
                            </div>
                            <div class="marks">
                              ${TianGanFanYin ? '天干反吟' : ''}
                            </div>
                            <div class="marks">
                              ${pan.get('五不遇時') ? '五不遇時' : ''}
                            </div>
                        </div>
                    </div>
                `;
              }
            }).join('')}
        </div>
    `;

  const debugMessageDiv = document.getElementById('debugMessage');
  debugMessageDiv.innerHTML = `

          <details>
            <summary>演算</summary>
            <pre>${
`偵錯資訊：
(年支): ${yearZhi} -> ${qimenJu.A}
(月支): ${monthZhi} -> ${qimenJu.B}
(日期): ${lunar._p.day}
(時支): ${hourZhi} -> ${qimenJu.D}
(時): ${hourIndex * 2}
總計: ${qimenJu.A} + ${qimenJu.B} + ${lunar._p.day} + ${qimenJu.D} = ${qimenJu.total}
餘數: ${qimenJu.total} % 9 = ${qimenJu.total % 9}
夏至: ${lunar._getJieQiSolar(I18n.getMessage('jq.xiaZhi')).toYmdHms()}
冬至: ${lunar._getJieQiSolar("DONG_ZHI").toYmdHms()}
遁類: ${dunType}
其他: ${otherMessage}
-------------------------------
created by Jess Poon, Antonio Yu
any inquiry please contact: jpoon120@gmail.com`
            }</pre>
        </details>
    `;
}
