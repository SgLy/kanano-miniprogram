const { p } = require('../base');
const { saveData, getRawSize } = require('../../utils/data');

Page(p({
  onLoad() {
    let size = getRawSize();
    let unit = 'Byte';
    if (size > 1024) {
      size /= 1024;
      unit = 'KiB';
      if (size >= 1024) {
        size /= 1024;
        unit = 'MiB';
      }
    }
    this.setData({ rawSize: `${size.toFixed(0)} ${unit}` });
  },
  onValueChanged(e) {
    const data = this.data.data;
    const key = e.detail.name;
    const value = e.detail.value;
    data.options[key] = value;
    this.setData({ data });
    saveData(data);
  }
}));