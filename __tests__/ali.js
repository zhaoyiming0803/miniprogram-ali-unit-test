global.my = {
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
  showModal: jest.fn(),
  request: jest.fn(),
  getStorageSync: jest.fn(),
  showShareMenu: jest.fn(),
  showToast: jest.fn(),
  alert: jest.fn(),
  getSystemInfoSync: jest.fn()
}

const appOptions = {
  globalData: {}
}

global.getApp = jest.fn(() => appOptions)

const noop = () => {}
const isFn = fn => typeof fn === 'function'
let wId = 0

global.Page = ({ data, ...rest }) => {
  const page = {
    data,
    setData: jest.fn(function (newData, cb) {
      this.data = {
        ...this.data,
        ...newData,
      }
      cb && cb()
    }),
    ...rest
  };
  global.wxPageInstance = page
  return page
}

global.delay = timeout => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout)
  })
}