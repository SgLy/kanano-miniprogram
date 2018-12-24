const api = require('../../utils/api');
const noop = require('../../utils/noop');
const { formatDatetime } = require('../../utils/datetime');
const { saveData } = require('../../utils/data');
const { wx } = require('../../utils/wx_promisify');
const { p } = require('../base');

Page(p({
  data: {
    data: {},
  },
  onAdd() {
    let text = '';
    wx.getClipboardData().then(res => {
      if (!res.data || res.data.length === 0) {
        return wx.showModal({
          content: '剪贴板中没有内容'
        });
      }
      text = res.data;
      let comment = '';

      // netease cloud music
      const ncmMatch = text.match(/分享歌词：\n(.+?)分享.+?/);
      if (ncmMatch && ncmMatch.length && ncmMatch.length > 1) {
        text = ncmMatch[1];
        comment = '（网易云音乐歌词）';
      }

      const len = text.length;
      const short = text.slice(0, 17) + (len > 17 ? '...' : '');
      return wx.showModal({
        title: '从剪贴板导入',
        content: `共「${short}」${len}字${comment}`,
        cancelText: '不导入',
        confirmText: '导入',
        confirmColor: '#1973e6',
      });
    }).then(res => {
      if (res.confirm === true && text.length > 0)
        return api.parse(text);
      else
        return Promise.reject('');
    }).then(res => {
      // save to storage
      const data = this.data.data;
      data.text.push({
        title: text.slice(0, 5),
        createdTime: Date.now(),
        showCreatedTime: formatDatetime(Date.now()),
        parsed: res.data.res
      });
      saveData(data);
      this.viewText(this.data.data.text.length - 1);
    }).catch(noop);
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