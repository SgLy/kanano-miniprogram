Component({
  data: {
    list: [],
    movingIndex: -1
  },
  attached: function() {
    this.setData({
      list: Array(10).fill(0).map((v, i) => {
        return {
          index: i,
          data: `Item ${i}`
        };
      })
    });
  },
  methods: {
    onTouchStart: function (e) {
      this.p = new Promise(resolve => {
        this.createSelectorQuery()
          .selectAll('.item')
          .boundingClientRect(rects => {
            const positions = rects.sort((a, b) => a.dataset.index - b.dataset.index);
            this.currentIndex = e.currentTarget.dataset.index;
            this.offset = e.currentTarget.offsetTop - e.changedTouches[0].pageY;
            this.setData({
              positions,
              tops: positions.map(p => p.top),
              moving: true,
              movingIndex: e.currentTarget.dataset.index,
              currentTop: e.currentTarget.offsetTop
            }, resolve);
          }).exec();
      });
    },
    onTouchMove: function (e) {
      this.p = this.p.then(() => new Promise(resolve => {
        const currentTop = this.offset + e.changedTouches[0].pageY;
        let i = this.currentIndex;
        const mi = this.data.movingIndex;
        const t = currentTop, tops = this.data.tops;
        if (i + 1 < tops.length && t > tops[i + 1]) {
          [tops[mi], tops[i + 1]] = [tops[i + 1], tops[mi]];
          i = i + 1;
        } else if (i > 0 && t < tops[i]) {
          [tops[mi], tops[i]] = [tops[i], tops[mi]];
          i = i - 1;
        }
        this.currentIndex = i;
        this.setData({
          currentTop, tops
        }, resolve);
      }));
    },
    onTouchEnd: function (e) {
      this.p = this.p.then(() => new Promise(resolve => {
        const list = this.data.list, tops = this.data.tops;
        list.sort((a, b) => tops[a.index] - tops[b.index]);
        list.forEach((l, i) => { l.index = i });
        this.setData({
          list,
          movingIndex: -1,
          moving: false
        }, resolve);
      }));
    }
  }
});
