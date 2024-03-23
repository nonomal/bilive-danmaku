import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserInfoDao, { UserInfoDaoNS } from '../../../dao/UesrInfoDao';
import { getSessionInfoData } from '../../../api';
import Notification from 'rc-notification';
import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification';

const userInfoSessionStr = UserInfoDao.get(UserInfoDaoNS.UserInfoSession);

let notificationInstance: RCNotificationInstance | null = null;
Notification.newInstance(
  {
    style: { top: 60, left: 0 },
    maxCount: 1,
  },
  (n) => {
    notificationInstance = n;
  }
);
interface LiveRoomListsProps {
  refresh: (e: null) => void;
}

export default function CustomStyledPanel(props: LiveRoomListsProps) {
  const { t } = useTranslation();
  const { refresh } = props;
  const [userSession, setUserSession] = useState(userInfoSessionStr);

  const onNotificationMessage = (msg: NoticeData) => {
    const noticeOption = {
      className: 'warning',
      content: (
        <span>
          <span className="icon-font icon-item warning icon-report" />
          {msg.msg}
        </span>
      ),
      duration: 6,
    };
    notificationInstance.notice(noticeOption);
  };

  const handleRefresh = async () => {
    if (!userSession) {
      UserInfoDao.clear();
      refresh(null);
      return;
    }
    const sessionInfo = await getSessionInfoData(userSession);
    if (!sessionInfo.uid) {
      const warning = {
        msg: t('SessionError'),
      };
      onNotificationMessage(warning);
      return;
    }

    UserInfoDao.save(UserInfoDaoNS.UserInfoUid, String(sessionInfo.uid));
    UserInfoDao.save(UserInfoDaoNS.UserInfoSession, userSession);
    refresh(null);
  };

  return (
    <div className="container">
      <h1 className="title">{t('ParameterDescription')}</h1>
      <div className="danmaku-adjust-row3">
        <div>{t('ParameterDescriptionText')}</div>
        <img src="data:image/png;base64,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"
             style={{width: '100%', marginTop: '6px'}} />
      </div>
      <h1 className="title title-sub">{t('Parameter')}</h1>
      <div className="danmaku-adjust-row3 flex">
        <span className="danmaku-adjust-label-small v-middle dp-i-block">
          Value
        </span>
        <input
          type="text"
          value={userSession}
          onChange={(e) => setUserSession(e.target.value)}
          className="link-input t-center v-middle border-box level-input custom-style"
        />
      </div>
      <div className="danmaku-adjust-row">
        <span className="danmaku-adjust-label v-middle dp-i-block">{t('Refresh')} <span onClick={() => handleRefresh()} className="icon-font icon-item icon-replace icon-config-reset" /></span>
      </div>
    </div>
  );
}
