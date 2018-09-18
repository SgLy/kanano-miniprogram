const app = getApp();
const api = require('../../utils/api');
const noop = require('../../utils/noop');
const { formatDatetime } = require('../../utils/datetime');
const { parse, stringify } = require('../../utils/serialization');
const { wx, wxSync } = require('../../utils/wx_promisify');

const TABS = {
  CARD_LIST: 1,
  TEXT: 2,
  SETTING: 3
};

Page({
  data: {
    atTop: true,
    data: [],
    TABS, tabs: TABS.CARD_LIST,
  },
  onLoad: function () {
    // set navigation bar height
    this.setData({ navigationBarHeight: app.navigationBarHeight });

    // read save data
    const data = parse(wxSync.getStorageSync('data'));
    data.forEach(d => d.createdTime = formatDatetime(d.createdTime));
    this.setData({ data });

    // try to read clipboard
    if (wx.getClipboardData !== undefined) {
      let text;
      wx.getClipboardData().then(res => {
        if (res.data && res.data.length > 0) {
          text = res.data;
          const len = text.length;
          const short = text.slice(0, 17) + (len > 17 ? '...' : '');
          return wx.showModal({
            title: '从剪贴板导入',
            content: `共「${short}」${len}字`,
            cancelText: '不导入',
            confirmText: '查看'
          });
        }
      }).then(res => {
        if (res.confirm === true)
          return api.parse(text);
        else
          return Promise.reject('');
      }).then(res => {
        this.setData({
          tabs: TABS.TEXT,
          parsed: res.data.res
        });
        // save to storage
        const data = this.data.data;
        data.push({
          title: text.slice(0, 5),
          createdTime: Date.now(),
          parsed: res.data.res
        });
        wxSync.setStorageSync('data', stringify(data));
      }).catch(noop);
    }
  },
  onCardTap: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      tabs: TABS.TEXT,
      parsed: this.data.data[index].parsed
    });
  },
  onPageScroll: function (e) {
    const atTop = !(e.scrollTop > 0);
    if (atTop !== this.data.atTop)
      this.setData({ atTop });
  }
});
