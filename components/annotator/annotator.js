const observerFactory = prop => {
  return function(value) {
    this.setData({ [prop]: value });
  };
}

Component({
  properties: {
    parsedText: {
      type: Array,
      value: [],
      observer: observerFactory('parsedText')
    },
    vertical: {
      type: Boolean,
      value: false,
      observer: observerFactory('vertical')
    }
  }
});