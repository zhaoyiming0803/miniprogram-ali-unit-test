export default class Subscriber {
  constructor(target, type, callback, options) {
    this.type = type
    this.target = target
    this.options = options
    this.callback = callback
    this.destroyed = false
  }

  notify() {
    if (this.destroyed) return
    const { callback, options } = this
    callback.apply(null, arguments)
    options && options.once && this.off()
  }

  off() {
    if (this.destroyed) return
    const { target } = this
    target.off(this)
    this.destroy()
  }

  destroy() {
    delete this.callback
    delete this.options
    delete this.target
    delete this.type
    this.destroyed = true
  }
}
