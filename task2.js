const EventEmitter = require('./task1');

/* TASK 2 */
class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit('begin');

    const startTime = Date.now();

    try {
      const data = await asyncFunc(...args);
      const endTime = Date.now();

      this.emit('end');
      this.emit('data', data);
      console.log(`Time taken: ${endTime - startTime}ms`);
    } catch (error) {
      this.emit('end');
      this.emit('error', error);
    }
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', data => console.log('Received data:', data));
withTime.on('error', error => console.error('Error:', error));

console.log(withTime.rawListeners('end'));
console.log(withTime.rawListeners('data'));
console.log(withTime.rawListeners('error'));

const asyncFunction = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  return data;
};

withTime.execute(asyncFunction);
