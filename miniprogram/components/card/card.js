Component({
  properties: {
    createdTime: {
      type: String,
      value: (new Date()).toLocaleString()
    },
    title: {
      type: String,
      value: ''
    }
  }
});