Page({
  data: {
    a: 100,
    b: 200
  },
  onLoad() {
    this.setData({
      a: this.data.a * 10,
      b: this.data.b * 100
    })
  }
});
