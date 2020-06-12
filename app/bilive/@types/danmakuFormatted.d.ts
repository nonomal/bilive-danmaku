/**
 * @author Beats0 https://github.com/Beats0
 * */

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/class-name-casing */

interface Connecting {
  cmd: CmdType.CONNECTING;
}

interface DanmakuBase {
  [key: string]: any;
  roomID?: number;
  cmd: CmdType;
  fanLv: number;
  fanName: string;
  liveUp: string;
  liveRoomID: number | string;
  timesMap: number;
}

interface DanmakuUser extends DanmakuBase {
  username: string;
  userID: number;
  isAdmin: boolean;
  isVip: boolean;
  isVipM: boolean;
  isVipY: boolean;
  guardLevel: number;
  userLevel: number;
  face: string;
}

interface DanmakuGift {
  cmd: CmdType.SEND_GIFT;
  username: string;
  userID: number;
  face: string;
  giftName: string;
  giftCount: number;
  giftAction: '赠送' | '投喂';
  coinType: 'gold' | 'silver';
  totalCoin: number;
  price: number;
  giftId: number;
  batchComboId?: string;
  superGiftNum?: number;
  superBatchGiftNum?: number;
}

interface GiftSend {
  username: number;
  /** 送礼人 */
  userID: string;
  /** 连击次数 */
  comboNum: number;
  /** 礼物名 */
  giftName: string;
  /** 礼物ID */
  giftId: number;
  action: '赠送' | '投喂';
  comboId: string;
  batchComboId: string;
  comboStayTime: number;
}

interface DanmakuMsg extends DanmakuBase, DanmakuUser {
  content: string;
  repeat: number;
}

interface GuardBuyMsg {
  username: string;
  userID: number;
  guardLevel: number;
  giftName: string;
  giftCount: number;
}

interface MsgWelcomeGuard {
  username: string;
  guardLevel: number;
}

interface MsgWelcome {
  username: string;
}

type GiftBubbleMsg = COMBO_SEND | COMBO_END | DanmakuGift | GiftSend;

type DanmakuDataFormatted = Partial<
  Connecting &
    DanmakuMsg &
    POPULAR &
    GiftBubbleMsg &
    GuardBuyMsg &
    MsgWelcomeGuard &
    MsgWelcome
>;

type GiftRaw = {
  id: number;
  price: number;
  name: string;
  desc: string;
  coin_type: 'gold' | 'silver';
  frame_animation: string;
  img_basic: string;
  img_dynamic: string;
  gif: string;
  rights: string;
  webp: string;
};

type ConfigStateType = {
  // 客户端版本号
  version: string;
  // 最新版本
  latestVersion: string;
  // 语言
  languageCode: string;
  // 窗口置于顶层
  setAlwaysOnTop: 0 | 1;
  // 房间号
  roomid: number;
  // 房间短号
  shortid: number;
  // 显示头像
  showAvatar: number;
  // 头像大小
  avatarSize: number;
  // 显示粉丝头衔
  showFanLabel: 0 | 1;
  // 显示用户UL等级
  showLvLabel: 0 | 1;
  // 显示姥爷
  showVip: 0 | 1;
  // 背景颜色 0白色 1黑色
  backgroundColor: 0 | 1;
  // 背景透明度
  backgroundOpacity: number;
  // 弹幕文字字体
  fontFamily: string;
  // 弹幕文字字号缩放
  fontSize: number;
  // 弹幕文字行高
  fontLineHeight: number;
  // 弹幕文字上边距
  fontMarginTop: number;
  // 固定滚动
  blockScrollBar: 0 | 1;
  // 开启语音播放
  showVoice: 0 | 1;
  // 语音音量
  voiceVolume: number;
  // 语音播放速度
  voiceSpeed: number;
  // 是否自动翻译
  autoTranslate: 0 | 1;
  // 翻译输入语言： (auto)自动检测有时候不准确，所以建议设置指定翻译语言
  translateFrom: string;
  // 翻译输出语言
  translateTo: string;
  // 最大消息显示数量
  maxMessageCount: number;
  // 语音队列任务最大值
  taskMaxLength: number;
  // 朗读语言
  voiceTranslateTo: string;
  // 开启全局屏蔽
  blockMode: 0 | 1;
  // 屏蔽礼物弹幕[0,1]
  blockEffectItem0: 0 | 1;
  // 屏蔽抽奖弹幕[0,1]
  blockEffectItem1: 0 | 1;
  // 屏蔽进场信息[0,1]
  blockEffectItem2: 0 | 1;
  // 屏蔽醒目留言[0,1]
  blockEffectItem3: 0 | 1;
  // 屏蔽冒泡礼物[0,1]
  blockEffectItem4: 0 | 1;
  // 显示最低金瓜子
  blockMinGoldSeed: number;
  // 显示最低银瓜子
  blockMinSilverSeed: number;
  // 屏蔽弹幕列表
  blockDanmakuLists: string[];
  // 屏蔽用户列表
  blockUserLists: number[];
  // 屏蔽用户等级[0,60]
  blockUserLv: number;
  // 屏蔽非正式会员
  blockUserNotMember: 0 | 1;
  // 屏蔽非绑定手机用户
  blockUserNotBindPhone: 0 | 1;
  // 自动翻译弹幕
  showTransition: 0 | 1;
  region: 'drag' | 'no-drag';
  cursor: 'default' | 'move';
};
