import { enhancePage } from '../../utils/enhancePage'
import apis from '../../apis'

const app = getApp()

enhancePage({
  data: {
    a: '',
    b: '',
    res2: '',
    globalData: app.globalData,
    isAllowSubmit: true
  },
  async onLoad (options) {
    const { merchtypeId } = options
    this.setData({
      merchtypeId
    })
    this.init()
  },
  async init () {
    const res1 = await this.getRes1()
    this.setData({
      a: res1.a,
      b: res1.b
    })
    const res2 = await this.getRes2()
    if (res2) {
      this.setData({
        res2
      })
    }
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
  },
  onRefresh () {
    getApp().globalData.token = 'this is token'
    getApp().globalData.userId = 'this is userId'
    getApp().globalData.openId = 'this is openId'
    getApp().globalData.commonPartnerData = 'this is commonPartnerData'
  },
  submit () {
    if (!this.data.isAllowSubmit) {
      return my.alert({
        content: '请勿重复提交订单'
      })
    }
    this.data.isAllowSubmit = false
    setTimeout(() => {
      console.log('mock sumit order......')
      this.data.isAllowSubmit = true
    }, 3000)
  }
})
