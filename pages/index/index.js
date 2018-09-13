const app = getApp();
const api = require('../../utils/api');
const { wx } = require('../../utils/wx_promisify');

Page({
  data: {
    text: '勝利のときは来た！この俺はあらゆる陰謀に屈せず、己の信念を貫き、ついに最終決戦を戦い抜いたのだ！この勝利のため、我が手足となって戦ってくれた仲間たちに感謝を！訪れるのは、俺が望んだ世界なり！全ては運命石の扉の選択である！',
    parsed: [],
    atTop: true
  },
  onLoad: function () {
    api.parse(this.data.text).then(res => {
      this.setData({
        parsed: res.data.res
      });
    });
    this.setData({ navigationBarHeight: app.navigationBarHeight });
  },
  onPageScroll: function (e) {
    const atTop = !(e.scrollTop > 0);
    if (atTop !== this.data.atTop)
      this.setData({ atTop });
  }
});
