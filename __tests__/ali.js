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
  getLocation: jest.fn(),
  getAuthCode: jest.fn((options) => {
    options.success && options.success({
      authCode: options.scopes, // mock authCode
      authErrorScopes: {},
      authSuccessScopes: []
    })
  }),
};

const appOptions = {
  globalData: {}
};

global.getApp = jest.fn(() => appOptions)

global.Page = ({ data, ...rest }) => {
  const page = {
    data,
    setData: jest.fn(function (newData, cb) {
      this.data = {
        ...this.data,
        ...newData,
      };
      cb && cb();
    }),
    ...rest,
  };
  global.wxPageInstance = page;
  return page;
};

global.delay = timeout =>
  new Promise(resolve => {
    setTimeout(() => resolve(), timeout);
  });
