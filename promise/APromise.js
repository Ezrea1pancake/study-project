const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class APromise {
    constructor(exector) {
        this.value = null;
        this.error = null;

        this.state = PENDING;

        this.fulfilledCallbacks = [];
        this.rejectedCallbacks = [];

        const resolve = value => {
            if(this.state === PENDING) {
                this.value = value;
                this.state = FULFILLED;
                this.fulfilledCallbacks.forEach(fn => fn());
            }
        }

        const reject = error => {
            if(this.state === PENDING) {
                this.error = error;
                this.state = REJECTED;
                this.rejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            exector(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    resolvePromise(promise, x, resolve, reject) {
        if(promise === x) {
            reject(new TypeError('then方法返回的值不能是本身'));
            return;
        } else if (x instanceof APromise) {
            // 返回值本身就是promise实例
            if(x.state === PENDING) {
                x.fulfilledCallbacks.push(() => resolve(x.value));
                x.rejectedCallbacks.push(() => reject(x.error));
            } else if (x.state === FULFILLED) {
                resolve(x.value);
            } else {
                reject(x.error);
            }
        } else if (typeof x === 'object' || typeof x === 'function') {
            try {
                const then = x.then;
                if(typeof then === 'function') {
                    then.call(x, y => {
                        this.resolvePromise(promise, y, resolve, reject);
                    }, e => {
                        reject(e);
                    })
                } else {
                    resolve(x);
                }
            } catch (error) {
                reject(error);
            }
        } else {
            resolve(x);
        }
    }

    then(onFulfilled, onRejected) {
        const thenPromise = new APromise((resolve, reject) => {
            if(this.state === FULFILLED) {
                try {
                    if(typeof onFulfilled === 'function') {
                        const x = onFulfilled(this.value);
                        this.resolvePromise(thenPromise, x, resolve, reject);
                    } else {
                        // 如果传入的onFulfilled不是一个方法，那么直接将promise的值往下传递
                        this.resolvePromise(thenPromise, this.value, resolve, reject);
                    }
                } catch (error) {
                    reject(error);
                }
            } else if (this.state === REJECTED) {
                try {
                    if(typeof onRejected === 'function') {
                        const x = onRejected(this.error);
                        this.resolvePromise(thenPromise, x, resolve, reject);
                    } else {
                        // 如果传入的onRejected不是一个方法，那么直接将error往下传递
                        this.resolvePromise(thenPromise, this.error, resolve, reject);
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                try {
                    this.fulfilledCallbacks.push(() => {
                        if(typeof onFulfilled === 'function') {
                            const x = onFulfilled(this.value);
                            this.resolvePromise(thenPromise, x, resolve, reject);
                        } else {
                            // 如果传入的onFulfilled不是一个方法，那么直接将promise的值往下传递
                            this.resolvePromise(thenPromise, this.value, resolve, reject);
                        }
                    });
                    this.rejectedCallbacks.push(() => {
                        if(typeof onRejected === 'function') {
                            const x = onRejected(this.error);
                            this.resolvePromise(thenPromise, x, resolve, reject);
                        } else {
                            // 如果传入的onRejected不是一个方法，那么直接将error往下传递
                            this.resolvePromise(thenPromise, this.error, resolve, reject);
                        }
                    });
                } catch (error) {
                    reject(error);
                }
            }
        })
        return thenPromise;
    }
}

export default APromise;