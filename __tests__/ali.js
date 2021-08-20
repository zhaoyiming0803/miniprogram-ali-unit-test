global.my = {
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
  showModal: jest.fn(),
  request: jest.fn(),
  getStorageSync: jest.fn(() => ({})),
  showShareMenu: jest.fn(),
  showToast: jest.fn(),
  alert: jest.fn(),
  getSystemInfoSync: jest.fn(),
  removeStorageSync: jest.fn(),
  reLaunch: jest.fn(),
  redirectTo: jest.fn(),
  canIUse: jest.fn(),
  setNavigationBar: jest.fn(),
  setCanPullDown: jest.fn(),
  getLocation: jest.fn(({cacheTimeout, type, success, fail, complete}) => {
    success && success({
      longitude: '经度',
      latitude: '纬度',
      accuracy: '精确度',
      horizontalAccuracy: '水平精确度',
      country: '国家',
      countryCode: '国家编号',
      province: '省份',
      city: '城市',
      cityAdcode: '城市级别的地区编号',
      district: '区县',
      districtAdcode: '区县级别的地区编号',
      streetNumber: {},
      pois: []
    })
    fail && fail({
      error: 'error',
      errorMessage: 'errorMessage'
    })
  }),
  getAuthCode: jest.fn(({scopes, success, fail, complete}) => {
    success && success({
      authCode: scopes, // mock authCode
      authErrorScopes: {},
      authSuccessScopes: []
    })
    fail && fail({
      errorMessage: 'this is errorMessage'
    })
    complete && complete()
  }),
  navigateTo: jest.fn(({url, complete, success, fail}) => {
    complete && complete({
      error: undefined,
      errorMessage: undefined
    })
    success && success()
  }),
  navigateBack: jest.fn(),
  setStorageSync: jest.fn(),
  authorize: jest.fn(({scopes}) => ({})),
  tb: {
    chooseAddress: ({addAddress, searchAddress, locateAddress, success, fail}) => {
      success && success({
        type: 'locationAddress',
        name: 'my.tb.chooseAddress',
        latitude: '111',
        longitude: '222'
      })
    }
  },
  chooseLocation: jest.fn(({success, fail}) => {
    success && success({
      latitude: '12',
      longitude: '345',
      address: 'chooseLocation address',
      name: 'chooseLocation name'
    })
  }),
  showAuthGuide: jest.fn(),
  stopPullDownRefresh: jest.fn()
};

const appOptions = {
  globalData: {
    version: '9.17.0'
  },
  onLaunch: jest.fn()
};

global.getApp = jest.fn(() => appOptions)

global.Page = ({ data, ...rest }) => {
  const page = {
    data,
    /**
     * mock ali miniprogram this.setData function
     * https://opendocs.alipay.com/mini/framework/page-detail#Page.prototype.setData(data%3A%20Object%2C%20callback%3A%20Function)
     */
    setData: jest.fn(function setData(newData, cb) {
      const keys = Object.keys(newData)
      keys.forEach(key => {
        const arr = []
        const _keys = key.split('.')
        _keys.forEach(_key => {
          const reg = /(\w+)?(\[(\d+)\])/g
          let matched
          let mark = false
          while (matched = reg.exec(_key)) {
            mark = true
            if (matched[1]) {
              arr.push(matched[1])
            }
            if (matched[3]) {
              arr.push(+matched[3])
            }
          }
          if (!mark) {
            arr.push(_key)
          }
        })
        arr.reduce((obj, prop, index) => {
          if (index === arr.length - 1) {
            return (obj[prop] = newData[key])
          }
          if (obj[prop]) {
            return obj[prop]
          }
          if (typeof arr[index + 1] === 'number') {
            obj[prop] = []
            return obj[prop]
          }
          return (obj[prop] = {})
        }, this.data)
      })
      cb && cb()
    }),
    /**
     * mock ali miniprogram this.$spliceData function
     * https://opendocs.alipay.com/mini/framework/page-detail#Page.prototype.%24spliceData(data%3A%20Object%2C%20callback%3A%20Function)
     */
    $spliceData: jest.fn(function $spliceData(data, cb) {
      const keys = Object.keys(data)
      keys.forEach(key => {
        let _obj
        const _keys = key.split('.')
        const arr = _keys.reduce((cur, pre) => {
          _obj = cur
          const reg = /(\w+)?(\[(\d+)\])/g
          let matched
          let mark = false
          while (matched = reg.exec(pre)) {
            mark = true
            if (matched[1]) {
              _obj = _obj[matched[1]]
            }
            if (matched[3]) {
              _obj = _obj[matched[3]]
            }
          }
          if (mark) return _obj
          return _obj[pre]
        }, this.data)
        arr.splice(data[key][0], data[key][1], ...data[key].slice(2))
      })
      cb && cb()
    }),
    ...rest,
  };
  global.pageInstance = page;
  return page;
}

global.getCurrentPages = jest.fn(() => [])

global.delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}