const APP = 'app'
const PAGE = 'page'
const ON_UNLOAD = 'onUnload'
const DID_UNMOUNT = 'didUnmount'

export function isComponent(target) {
  return !!(
    target.$page ||
    target.props ||
    target.methods ||
    target.didMount ||
    target.didUpdate ||
    target.didUnmount
  )
}

export function mixinDestroy(target, component) {
  const method = component ? DID_UNMOUNT : ON_UNLOAD
  const origin = target[method]
  target[method] = function () {
    origin && origin.apply(this, arguments)
    this.emitter && this.emitter.destroy()
  }
  return target
}

export function getHost(emitter, src, Emitter) {
  let host = null

  if (src === PAGE) {
    host = emitter.$page || (my.getPageEmitter && my.getPageEmitter())
  } else if (src === APP) {
    // 小程序插件里不支持 getApp 方法
    host =
      (typeof getApp === 'function' && getApp()) ||
      (my.getAppEmitter && my.getAppEmitter())
  }

  if (
    host &&
    Emitter &&
    !host.emitter && // this.emitter = new Emitter
    !(host.emit && host.subscribe) // mixinEmitter(host)
  ) {
    host.emitter = new Emitter(host)
  }

  return host
}

function isValidPage(page) {
  // page.__proto__.route is undefined in Koubei App
  return !!(page && typeof page.setData === 'function')
}

export function bindHost(host, emitter) {
  if (host) {
    emitter.$host = host
    if (isComponent(host)) {
      if (isValidPage(host.$page)) {
        emitter.$page = host.$page
      }
      emitter.$isComponent = true
    }
  }
}

export function bubbling(emitter, type, payload, to, Emitter) {
  // to page
  emitter.$isComponent &&
    (to === PAGE || to === APP) &&
    bubblingTo(emitter, PAGE, type, payload, Emitter)

  // to app
  to === APP && bubblingTo(emitter, APP, type, payload, Emitter)
}

export function bubblingTo(emitter, to, type, payload, Emitter) {
  const host = getHost(emitter, to, Emitter)
  if (host && host !== emitter) {
    if (host.emitter) {
      host.emitter.emit(type, payload)
    } else if (host.emit) {
      host.emit(type, payload)
    }
  }
}

export function parseType(origin) {
  const match = origin.match(/([^|]+)(\|[^|]+)?/)
  const bubbles = (match && match[2] && match[2].replace('|', '')) || ''
  const type = (match && match[1]) || ''
  const capture = bubbles
  return { type, bubbles, capture }
}

export function onCapture(emitter, type, callback, options, capture, Emitter) {
  const host = getHost(emitter, capture, Emitter)
  let sub = null
  if (host) {
    if (host.emitter) {
      sub = host.emitter.subscribe(type, callback, options)
    } else if (host.subscribe) {
      sub = host.subscribe(type, callback, options)
    }
    if (sub) {
      emitter._captureSubs = emitter._captureSubs || []
      emitter._captureSubs.push(sub)
    }
  }
  return sub
}

export function offCapture(emitter, type, callback) {
  const subs = emitter._captureSubs || []
  let length = subs.length
  let index = 0
  let sub

  if (type && type.off) {
    sub = type
    index = subs.indexOf(sub)
    if (index > -1) {
      subs.splice(index, 1)
      sub.off()
    }
  } else {
    while (index < length) {
      sub = subs[index]
      if (
        !type ||
        (sub.type === type && (!callback || sub.callback === callback))
      ) {
        subs.splice(index, 1)
        sub.off()
        length--
      } else {
        index++
      }
    }
  }
}
