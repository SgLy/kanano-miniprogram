const isEmpty = s => s.replace(' ', '') === '';

Component({
  properties: {
    parsedText: {
      type: Array,
      value: [],
      observer(parsed) {
        parsed.forEach(paragraph => {
          paragraph.forEach(word => {
            if (isEmpty(word.surface_form))
              word.surface_form = '&nbsp;';
            if (word.POS.main === '記号')
              word.POS.main = '';
          });
        });
        this.setData({ parsed });
      }
    },
    title: {
      type: String,
      value: ''
    },
    vertical: {
      type: Boolean,
      value: false
    }
  }
});