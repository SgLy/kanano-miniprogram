const app = getApp();
const api = require('../../utils/api');
const { formatDatetime } = require('../../utils/datetime');
const { wx } = require('../../utils/wx_promisify');

const TABS = {
  CARD_LIST: 1,
  TEXT: 2,
  SETTING: 3
};

Page({
  data: {
    text: '',
    parsed: [],
    atTop: true,
    cards: [],
    TABS, tabs: TABS.CARD_LIST,
  },
  onLoad: function () {
    // set navigation bar height
    this.setData({ navigationBarHeight: app.navigationBarHeight });

    // try to read clipboard
    if (wx.getClipboardData !== undefined) {
      wx.getClipboardData().then(res => {
        if (res.data && res.data.length > 0) {
          const text = res.data, len = text.length;
          const short = text.slice(0, 17) + (len > 17 ? '...' : '');
          wx.showModal({
            title: '从剪贴板导入',
            content: `共「${short}」${len}字`,
            cancelText: '不导入',
            confirmText: '查看'
          }).then(res => {
            if (!res.confirm)
              return;

            // parse text
            api.parse(text).then(res => {
              this.setData({
                tabs: TABS.TEXT,
                parsed: res.data.res
              });
            });
          });
        }
      });
    }

    // mock cards
    this.setData({
      cards: Array(10).fill(0).map(() => {
        return {
          createdTime: formatDatetime(Date.now() - Math.random() * 1000000),
          text: 'this is a hello world test'
        };
      })
    });
  },
  onPageScroll: function (e) {
    const atTop = !(e.scrollTop > 0);
    if (atTop !== this.data.atTop)
      this.setData({ atTop });
  }
});
