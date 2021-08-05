import { enhancePage } from '../../utils/enhancePage'
import apis from '../../apis'

enhancePage({
  data: {
    a: '',
    b: '',
    res2: ''
  },
  async onLoad () {
    this.init()
  },
  async init () {
    const res1 = await this.getRes1()
    this.setData({
      a: res1.a,
      b: res1.b
    })
    const res2 = await this.getRes2()
    this.setData({
      res2
    })
  },
  async getRes1 () {
    return apis.getRes1()
  },
  getRes2 () {
    if (!this.data.a) {
      my.showToast({
        type: 'success',
        content: '操作成功',
        duration: 3000,
        success: () => {
          my.alert({
            title: 'toast 消失了',
          });
        }
      })
      return Promise.resolve()
    }
    return apis.getRes2()
  }
})
