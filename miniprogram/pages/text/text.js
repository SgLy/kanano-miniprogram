const app = getApp();
const { wxSync } = require('../../utils/wx_promisify');
const { loadData, saveData } = require('../../utils/serialization');

Page({
  data: {
    atTop: true,
  },
  onLoad(params) {
    // set navigation bar height
    this.setData({ navigationBarHeight: app.navigationBarHeight });

    // load data
    const data = loadData();
    this.setData({
      parsed: data[params.id].parsed
    });
  },
  onPageScroll(e) {
    const atTop = !(e.scrollTop > 0);
    if (atTop !== this.data.atTop)
      this.setData({ atTop });
  }
});