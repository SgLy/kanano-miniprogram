Component({
  properties: {
    height: {
      type: Number,
      value: 64,
      observer: function(height) { this.setData({ height }); }
    }
  }
});