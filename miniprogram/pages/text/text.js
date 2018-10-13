const { p } = require('../base');

Page(p({
  onLoad(params) {
    this.setData({
      parsed: this.data.data[params.id].parsed
    });
  }
}));