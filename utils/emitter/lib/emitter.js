import Subscriber from './subscriber'

const undef = undefined
const ARRAY = 'array'
const OBJECT = 'object'
const STRING = 'string'
const FUNCTION = 'function'

function typeOf(v) {
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
}

function forEach(a, c) {
  const t = typeOf(a)
  if (t === OBJECT) {
    for (let k in a) {
      if (a.hasOwnProperty(k)) {
        c(a[k], k, a)
      }
    }
  } else if (t === ARRAY) {
    a.forEach(c)
  }
}

function getSubs(target, type, create) {
  const events = target.events
  return events[type] || (create ? (events[type] = []) : undef)
}

function getSub(target, type, callback) {
  if (type instanceof Subscriber) return type

  const events = target.events
  const subs = events[type]

  if (subs && subs.length) {
    let sub = null

    subs.some(function (s) {
      if (s.callback === callback) {
        sub = s
        return true
      }
    })

    return sub
  }

  return null
}

export default class Emitter {
  constructor() {
    this.events = {}
    this.destroyed = false
  }

  on(type, callback, options) {
    const t = typeOf(type)

    if (t === ARRAY) {
      forEach(type, (tp) => this.subscribe(tp, callback, options))
    } else if (t === OBJECT) {
      forEach(type, (cb, tp) => this.subscribe(tp, cb, callback))
    } else {
      this.subscribe(type, callback, options)
    }

    return this
  }

  once(type, callback, options) {
    return typeOf(type) === OBJECT
      ? this.on(type, {
          ...callback,
          once: true,
        })
      : this.on(type, callback, {
          ...options,
          once: true,
        })
  }

  emit(type, payload) {
    !this.destroyed &&
      (getSubs(this, type) || []).forEach((sub) => {
        sub && sub.notify(payload)
      })

    return this
  }

  off(type, callback) {
    if (!type) {
      // this.off();
      this.events = {}
    } else if (typeOf(type) === STRING && !callback) {
      // this.off('click');
      delete this.events[type]
    } else {
      // this.off(subscriber);
      // this.off('click', callback);
      const sub = getSub(this, type, callback)
      const subs = sub && getSubs(this, sub.type)
      subs && sub && this.unsubscribe(sub)
    }

    return this
  }

  subscribe(type, callback, options) {
    let sub = getSub(this, type, callback)

    if (sub) {
      sub.options = options
    } else if (typeOf(callback) === FUNCTION) {
      sub = new Subscriber(this, type, callback, options)
      getSubs(this, type, true).push(sub)
    }

    return sub
  }

  unsubscribe(sub) {
    const type = sub.type
    const subs = getSubs(this, type)
    const index = subs.indexOf(sub)

    if (index > -1) {
      sub.destroy()
      subs.splice(index, 1)
    }

    if (!subs.length) {
      delete this.events[type]
    }
  }

  destroy() {
    this.off()
    this.events = {}
    this.destroyed = true
    return this
  }
}
