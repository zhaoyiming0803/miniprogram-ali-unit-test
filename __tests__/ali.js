global.my = {
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
  showModal: jest.fn(),
  request: jest.fn(),
  getStorageSync: jest.fn(),
  showShareMenu: jest.fn()
}

global.getApp = jest.fn()

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
    onLoad: noop,
    onReady: noop,
    onUnLoad: noop,
    __wxWebviewId__: wId++,
    ...rest,
  };
  global.wxPageInstance = page
  return page
}
