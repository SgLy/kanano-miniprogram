const PREFIX = '../../assets/images/tab-icons';
const TABS = [
  {
    name: '列表',
    url: '/pages/index/index',
    showOnlyMatched: false,
    icon: `${PREFIX}/list.svg`,
    matchedIcon: `${PREFIX}/list-matched.svg`
  },
  {
    name: '标注',
    url: '/pages/text/text',
    showOnlyMatched: true,
    icon: `${PREFIX}/text.svg`,
    matchedIcon: `${PREFIX}/text-matched.svg`
  },
  {
    name: '设置',
    url: '/pages/setting/setting',
    showOnlyMatched: false,
    icon: `${PREFIX}/setting.svg`,
    matchedIcon: `${PREFIX}/setting-matched.svg`
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
    TABS.forEach(t => t.matched = false);
    TABS[matched].matched = true;
    this.setData({
      tabs: TABS,
      currentTab: matched
    });
  },
  ready() {
    // observer to switch box-shadow
    let observer = this.createIntersectionObserver({
      initialRatio: 1
    });
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