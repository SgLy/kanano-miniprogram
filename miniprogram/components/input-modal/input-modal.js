const noop = require('../../utils/noop');

Component({
  properties: {
    active: {
      type: Boolean,
      value: false,
      observer(newValue) {
        this.setData({
          value: this.data.initValue,
          focus: newValue
        });
      }
    },
    label: {
      type: String,
      value: ''
    },
    initValue: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    }
  },
  data: {
    focus: false
  },
  methods: {
    noop,
    onInput(e) {
      this.setData({ value: e.detail.value });
    },
    onCancel() {
      this.setData({ active: false });
    },
    onConfirm() {
      this.triggerEvent('Submit', this.data.value);
      this.setData({ active: false });
    }
  }
});
