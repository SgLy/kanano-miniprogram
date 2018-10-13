const app = getApp();
const { formatDatetime } = require('../utils/datetime');
const { loadData } = require('../utils/serialization');

function wrapFunction(options, name, func) {
  const origin = options[name] || (function () {});
  options[name] = function () {
    func.apply(this, arguments);
    origin.apply(this, arguments);
  };
}

function wrapPageOption(options) {
  options.scrollTop = 0;
  options.bottomScrollTop = Number.POSITIVE_INFINITY;

  wrapFunction(options, 'onLoad', function () {
    // read save data
    const data = loadData();
    data.forEach(d => d.showCreatedTime = formatDatetime(d.createdTime));

    this.setData({
      data,
      navigationBarHeight: app.navigationBarHeight
    });
  });

  wrapFunction(options, 'onPageScroll', function (e) {
    this.scrollTop = e.scrollTop;
    const atTop = !(e.scrollTop > 0);
    if (atTop !== this.data.atTop)
      this.setData({ atTop });
  });

  wrapFunction(options, 'onReachBottom', function () {
    this.bottomScrollTop = Math.max(this.bottomScrollTop, this.scrollTop);
  });

  return options;
}

module.exports = {
  p: wrapPageOption
};
