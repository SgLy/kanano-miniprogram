const api = require('../../utils/api');
const noop = require('../../utils/noop');
const { formatDatetime } = require('../../utils/datetime');
const { saveData } = require('../../utils/serialization');
const { wx } = require('../../utils/wx_promisify');
const { p } = require('../base');

Page(p({
  data: {
    data: {},
  },
  onLoad() {
    // try to read clipboard
    if (this.data.data.options.clipboard)
      this.getClipboard();
  },
  getClipboard() {
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
        // save to storage
        const data = this.data.data;
        data.text.push({
          title: text.slice(0, 5),
          createdTime: Date.now(),
          shownCreatedTime: formatDatetime(Date.now()),
          parsed: res.data.res
        });
        saveData(data);
        this.viewText(this.data.data.text.length - 1);
      }).catch(noop);
    }
  },
  onCardTap(e) {
    const index = e.currentTarget.dataset.index;
    this.viewText(index);
  },
  viewText(id) {
    wx.navigateTo({
      url: `/pages/text/text?id=${id}`
    });
  }
}));