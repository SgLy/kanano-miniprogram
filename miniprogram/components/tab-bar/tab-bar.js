const TABS = [
  {
    name: 'Index',
    url: '/pages/index/index',
    showOnlyMatched: false
  },
  {
    name: 'Text',
    url: '/pages/text/text',
    showOnlyMatched: true
  },
  {
    name: 'Setting',
    url: '/pages/setting/setting',
    showOnlyMatched: false
  }
];

const currentRoute = require('../../utils/current-route');

Component({
  data: {},
  attached() {
    let route = currentRoute();
    if (route[0] !== '/') {
      route = '/' + route;
    }
    const matched = TABS.findIndex(tab => route.search(tab.url) !== -1);
    this.setData({
      tabs: TABS.filter((tab, index) => !tab.showOnlyMatched || index === matched),
      currentTab: matched
    });
  },
  methods: {
    onTabClick(e) {
      if (e.currentTarget.dataset.index === this.data.currentTab)
        return;
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      });
    }
  }
});