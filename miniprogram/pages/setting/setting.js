const { p } = require('../base');
const { saveData } = require('../../utils/data');

Page(p({
  onValueChanged(e) {
    const data = this.data.data;
    const key = e.detail.name;
    const value = e.detail.value;
    data.options[key] = value;
    this.setData({ data });
    saveData(data);
  }
}));