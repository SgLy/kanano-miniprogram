const TABS = [
  {
    name: '列表',
    url: '/pages/index/index',
    showOnlyMatched: false
  },
  {
    name: '标注',
    url: '/pages/text/text',
    showOnlyMatched: true
  },
  {
    name: '设置',
    url: '/pages/setting/setting',
    showOnlyMatched: false
  }
];

const currentRoute = require('../../utils/current-route');

Component({
  data: {
    atBottom: true
  },
  attached() {
    let route = currentRoute();
    if (route[0] !== '/') {
      route = '/' + route;
    }
    const matched = TABS.findIndex(tab => route.search(tab.url) !== -1);
    this.setData({
      tabs: TABS,
      currentTab: matched
    });
  },
  ready() {
    // observer to switch box-shadow
    let observer = this.createIntersectionObserver();
    observer.relativeToViewport({ bottom: 0 });
    observer.observe('.this-will-be-on-bottom-of-page', res => {
      this.setData({ atBottom: res.intersectionRatio > 0 });
    });
  },
  methods: {
    onTabClick(e) {
      if (e.currentTarget.dataset.index === this.data.currentTab)
        return;
      wx.redirectTo({
        url: e.currentTarget.dataset.url
      });
    }
  }
});