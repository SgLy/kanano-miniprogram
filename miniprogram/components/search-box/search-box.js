Component({
  properties: {
    height: {
      type: Number,
      value: 64
    }
  },
  data: {
    atTop: true
  },
  ready() {
    let observer = this.createIntersectionObserver();
    observer.relativeToViewport({ top: 0 });
    observer.observe('.this-will-be-on-top-of-page', res => {
      this.setData({ atTop: res.intersectionRatio < 1 });
    });
  }
});