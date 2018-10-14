Component({
  data: {
    checked: false
  },
  properties: {
    initValue: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    name: {
      type: String,
      value: ''
    }
  },
  ready() {
    this.setData({
      checked: this.data.initValue
    });
  },
  methods: {
    onTap() {
      const newVal = !this.data.checked;
      this.setData({
        checked: newVal
      });
      this.triggerEvent('ValueChanged', {
        value: newVal,
        name: this.data.name
      }, {
        bubbles: true,
        composed: true
      });
    }
  }  
});
