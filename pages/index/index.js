const api = require('../../utils/api');

Page({
  data: {
    text: '僕の声が響いた瞬間に始まる 命のリミット 心臓がカウントしてる'
  },
  onLoad: function() {
    api.parse(this.data.text).then(res => {
      console.log(res.data.res);
    });
  }
});
