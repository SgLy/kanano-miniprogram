const isEmpty = s => s.replace(' ', '') === '';

const transpose = table => {
  const ret = Array(table[0].length).fill(0).map(() => Array(table.length));
  for (let i = 0; i < table.length; ++i)
    for (let j = 0; j < table[i].length; ++j)
      ret[j][i] = table[i][j];
  return ret;
};

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
  },
  data: {
    titleModalActive: false,
    wordDetailActive: false,
  },
  methods: {
    showTitleModal() {
      this.setData({ titleModalActive: true });
    },
    hideTitleModal() {
      this.setData({ titleModalActive: false });
    },
    showWordDetail(e) {
      const {wid, pid} = e.currentTarget.dataset;
      const word = this.data.parsed[pid][wid];
      const wordDetail = [
        ['单词', word.surface_form], // 表層形
        ['基本形', word.basic_form], // 基本形
        ['注音', word.reading], // 読み
        ['发音', word.pronunciation], // 発音
        ['词性', word.POS.main], // 品詞
        ['', word.POS.detail[0]], // 品詞細分類1
        ['', word.POS.detail[1]], // 品詞細分類2
        ['', word.POS.detail[2]], // 品詞細分類3
        // ['', word.conjugated_type], // 活用型
        // ['', word.conjugated_form], // 活用形
      ].filter(row => !!row[1]);
      this.setData({
        wordDetailActive: true,
        wordDetailLeft: e.detail.x,
        wordDetailTop: e.detail.y,
        wordDetail: transpose(wordDetail),
      });
    },
    hideWordDetail() {
      this.setData({ wordDetailActive: false });
    },
    changeTitle(e) {
      this.setData({ title: e.detail });
      this.triggerEvent('TitleChange', e.detail);
    }
  }
});