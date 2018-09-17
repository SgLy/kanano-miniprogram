Component({
  properties: {
    createdTime: {
      type: String,
      value: (new Date()).toLocaleString()
    },
    text: {
      type: String,
      value: ''
    }
  }
});