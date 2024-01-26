/* TASK 1 */

class EventEmitter {
  listeners = {};

  addListener(eventName, fn) {
    return this.on(eventName, fn);
  }

  on(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(fn);
  }

  removeListener(eventName, fn) {
    return this.off(eventName, fn);
  }

  off(eventName, fn) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      this.listeners[eventName] = eventListeners.filter(
        listener => listener !== fn
      );
    }
  }

  once(eventName, fn) {
    const onceWrapper = (...args) => {
      fn(...args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }

  emit(eventName, ...args) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      for (const listener of eventListeners) {
        listener(...args);
      }
    }
  }

  listenerCount(eventName) {
    const eventListeners = this.listeners[eventName];
    return eventListeners ? eventListeners.length : 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
}

const myEmitter = new EventEmitter();

function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1);
myEmitter.on('eventOne', c2);

myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

myEmitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));

myEmitter.emit('eventOne');
myEmitter.emit('eventOnce');
myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init');
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

console.log(myEmitter.listenerCount('eventOne'));
console.log(myEmitter.rawListeners('eventOne'));

myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));

myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));

module.exports = EventEmitter;
