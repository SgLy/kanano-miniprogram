App({
  onLaunch: function () {
    const res = wx.getSystemInfoSync();
    const statusBarHeight = res.statusBarHeight || 20;
    this.navigationBarHeight = (res.model.match(/iPhone/) ? 44 : 48) + statusBarHeight;
  }
});