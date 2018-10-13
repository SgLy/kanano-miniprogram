const app = getApp();

Component({
  data: {
    atTop: true
  },
  ready() {
    // observer to switch box-shadow
    let observer = this.createIntersectionObserver();
    observer.relativeToViewport({ top: 0 });
    observer.observe('.this-will-be-on-top-of-page', res => {
      this.setData({ atTop: res.intersectionRatio < 1 });
    });

    // height
    this.setData({ height: app.navigationBarHeight });
  }
});