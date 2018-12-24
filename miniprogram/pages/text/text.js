const { p } = require('../base');
const { saveData } = require('../../utils/data');
const TabBar = require('../../components/tab-bar/tab-bar');

let lastOpenedTextId;

Page(p({
  onLoad(params) {
    this.id = (params && params.id) || lastOpenedTextId;

    this.setData({
      parsed: this.data.data.text[this.id].parsed,
      title: this.data.data.text[this.id].title,
    });

    lastOpenedTextId = this.id;
    TabBar.showTab(1);
  },
  onTitleChanged(e) {
    this.data.data.text[this.id].title = e.detail;
    this.setData({
      title: e.detail,
      [`data.text[${this.id}].title`]: e.detail
    });
    saveData(this.data.data);
  }
}));