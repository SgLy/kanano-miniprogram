const isEmpty = s => s.replace(' ', '') === '';

Component({
  properties: {
    parsedText: {
      type: Array,
      value: []
    },
    vertical: {
      type: Boolean,
      value: false
    }
  },
  ready() {
    const parsed = this.data.parsedText;
    parsed.forEach(p => {
      if (isEmpty(p.surface_form))
        p.surface_form = '&nbsp;';
    });
    this.setData({ parsedText: parsed });
  }
});