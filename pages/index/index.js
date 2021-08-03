import { enhancePage } from '../../utils/enhancePage'

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
      // a: res1.a,
      b: res1.b
    })
    const res2 = await this.getRes2()
    this.setData({
      res2
    })
  },
  getRes1 () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          a: 'this is value a from res1',
          b: 'this is value b from res1'
        })
      })
    })
  },
  getRes2 () {
    return new Promise((resolve) => {
      if (!this.data.a) {
        resolve()
      }
      setTimeout(() => {
        resolve('res2')
      })
    })
  }
})
