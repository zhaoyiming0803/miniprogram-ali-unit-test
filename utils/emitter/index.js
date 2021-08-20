import Emitter from './lib/emitter.js';
import {
  isComponent,
  mixinDestroy,
  parseType,
  bindHost,
  bubbling,
  onCapture,
  offCapture,
} from './lib/utils.js';

const STRING = 'string';
const MIXIN_METHODS = ['on', 'once', 'off', 'emit', 'subscribe'];

class MiniAppEmitter extends Emitter {
  constructor(host) {
    super();
    bindHost(host, this);
  }

  emit(type, payload) {
    if (this.destroyed) {
      return this;
    }

    const parsed = parseType(type);
    super.emit.call(this, parsed.type, payload);
    parsed.bubbles &&
      bubbling(this, parsed.type, payload, parsed.bubbles, MiniAppEmitter);
    return this;
  }

  subscribe(type, callback, options) {
    if (this.destroyed) {
      return null;
    }

    const parsed = parseType(type);
    if (parsed.capture) {
      return onCapture(
        this,
        parsed.type,
        callback,
        options,
        parsed.capture,
        MiniAppEmitter
      );
    }

    return super.subscribe.call(this, parsed.type, callback, options);
  }

  off(type, callback) {
    if (this.destroyed) {
      return this;
    }

    if (!type) {
      // This.off();
      offCapture(this);
      Reflect.apply(super.off, this, arguments);
    } else if (typeof type === STRING) {
      // This.off('xxx') || this.off('xxx', callback);
      const parsed = parseType(type);
      if (parsed.capture) {
        offCapture(this, parsed.type, callback);
      } else {
        Reflect.apply(super.off, this, arguments);
      }
    } else {
      // This.off(sub);
      offCapture(this, type, callback);
      Reflect.apply(super.off, this, arguments);
    }

    return this;
  }
}

export function mixinEmitter(target) {
  let receiver = target;

  if (isComponent(target)) {
    receiver = target.methods || (target.methods = {});
    mixinDestroy(target, true);
  } else {
    mixinDestroy(target);
  }

  for (const k of MIXIN_METHODS) {
    receiver[k] = function () {
      const emitter = this.getEmitter();
      emitter[k].apply(emitter, arguments);
      return this;
    };
  }

  receiver.getEmitter = function () {
    !this.emitter && (this.emitter = new MiniAppEmitter(this));
    return this.emitter;
  };

  return target;
}

MiniAppEmitter.Global = new MiniAppEmitter();

export default MiniAppEmitter;
