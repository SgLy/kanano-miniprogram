const noop = require('../../utils/noop');

Component({
  properties: {
    active: {
      type: Boolean,
      value: false,
    },
    top: {
      type: String,
      value: '100rpx',
      observer(top) { this.setData({ top }); }
    },
  },
  methods: {
    noop,
    onHide() {
      this.setData({ active: false });
      this.triggerEvent('Hide');
    }
  }
});
