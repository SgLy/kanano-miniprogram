const { p } = require('../base');

Page(p({
  onLoad(params) {
    this.setData({
      parsed: this.data.data.text[params.id].parsed
    });
  }
}));