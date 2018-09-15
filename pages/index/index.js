const app = getApp();
const api = require('../../utils/api');
const { formatDatetime } = require('../../utils/datetime');
const { wx } = require('../../utils/wx_promisify');

Page({
  data: {
    text: '勝利のときは来た！この俺はあらゆる陰謀に屈せず、己の信念を貫き、ついに最終決戦を戦い抜いたのだ！この勝利のため、我が手足となって戦ってくれた仲間たちに感謝を！訪れるのは、俺が望んだ世界なり！全ては運命石の扉の選択である！',
    parsed: [],
    atTop: true,
    cards: []
  },
  onLoad: function () {
    // set navigation bar height
    this.setData({ navigationBarHeight: app.navigationBarHeight });

    // mock text
    api.parse(this.data.text).then(res => {
      this.setData({
        parsed: res.data.res
      });
    });

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
