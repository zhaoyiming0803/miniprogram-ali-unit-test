import { enhancePage } from '../../utils/enhancePage'
import { mixinEmitter } from '../../utils/emitter'
import { request } from '../../utils/request'

const app = getApp()

Page(mixinEmitter({
  data: {
    a: '',
    b: '',
    res2: '',
    globalData: app.globalData,
    isAllowSubmit: true
  },
  async onLoad (options) {
    // my.getAuthCode({
    //   scopes: 'order_service',
    //   success: res => {
    //     console.log('getAuthCode success res: ', res)
    //   }
    // })
    this.on('changeA', (payload) => {
      console.log('changeA payload in index page: ', payload)
    });
    const { merchtypeId } = options
    this.setData({
      merchtypeId
    })
    this.init()
    return

    my.navigateTo({
      url: '/pages/list/list',
      complete: ({error, errorMessage}) => {
        console.log('navigate to list1 page: ', error, errorMessage)
      }
    });
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
    // return getRes1()
    return request({
      url: 'getRes1'
    })
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
    return request({
      url: 'getRes2'
    })
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
}))
