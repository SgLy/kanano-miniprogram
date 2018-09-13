Component({
  properties: {
    height: {
      type: Number,
      value: 64,
      observer: function (height) { this.setData({ height }); }
    },
    atTop: {
      type: Boolean,
      value: true,
      observer: function (atTop) { this.setData({ atTop }); }
    }
  }
});