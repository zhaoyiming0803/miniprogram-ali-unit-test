const app = getApp()

export function showLoading() {
  my.showLoading()
}

export function hideLoading() {
  my.hideLoading()
}

export function enhancePage(options) {
  function enhance(options) {
    const originOnLoad = options.onLoad;
    const _options = {
      ...options,
      async onLoad(onLoadOptions = {}) {
        originOnLoad && originOnLoad.call(this, onLoadOptions)
      }
    }
    return _options
  }

  options = enhance(options)

  return Page(options)
}
