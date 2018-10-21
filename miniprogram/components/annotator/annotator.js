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
          });
        });
        this.setData({ parsed });
      }
    },
    vertical: {
      type: Boolean,
      value: false
    }
  }
});