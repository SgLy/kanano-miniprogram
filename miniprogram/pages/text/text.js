const { p } = require('../base');

Page(p({
  data: {
    atTop: true,
  },
  onLoad(params) {
    this.setData({
      parsed: this.data.data[params.id].parsed
    });
  }
}));