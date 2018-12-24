const { p } = require('../base');
const TabBar = require('../../components/tab-bar/tab-bar');

let lastOpenedTextId;

Page(p({
  onLoad(params) {
    const id = (params && params.id) || lastOpenedTextId;

    this.setData({
      parsed: this.data.data.text[id].parsed,
      title: this.data.data.text[id].title,
    });

    lastOpenedTextId = id;
    TabBar.showTab(1);
  }
}));