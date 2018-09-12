const api = require('../../utils/api');

Page({
  data: {
    text: '勝利のときは来た！この俺はあらゆる陰謀に屈せず、己の信念を貫き、ついに最終決戦を戦い抜いたのだ！この勝利のため、我が手足となって戦ってくれた仲間たちに感謝を！訪れるのは、俺が望んだ世界なり！全ては運命石の扉の選択である！',
    parsed: []
  },
  onLoad: function() {
    api.parse(this.data.text).then(res => {
      this.setData({
        parsed: res.data.res
      })
    });
  }
});
