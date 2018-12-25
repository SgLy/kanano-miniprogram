const noop = require('../../utils/noop');

Component({
  properties: {
    active: {
      type: Boolean,
      value: false,
    },
    left: {
      type: Number,
      value: 0,
      observer(left) { this.setData({ left }); }
    },
    top: {
      type: Number,
      value: 0,
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
