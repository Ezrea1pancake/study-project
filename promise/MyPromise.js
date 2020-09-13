const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';


class MyPromise {
    constructor(exector) {
    
        this.value = null;
        this.error = null;

        this.status = PENDING;

        this.fulFilledCallbackList = [];
        this.rejectedCallbackList = [];
    
        let resolve = (value) => {
            if(this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
                this.fulFilledCallbackList.forEach(fn => fn());
            }
        };
    
        let reject = (error) => {
            if(this.status === PENDING) {
                this.error = error;
                this.status = REJECTED;
                this.rejectedCallbackList.forEach(fn => fn());
            }
        };

        // 增加错误捕获
        try {
            exector(resolve, reject);
        } catch (error) {
            reject(error);
        }

    }

    then(onFulfilled, onRejected) {
        if(this.status === FULFILLED) {
            onFulfilled(this.value);
        } else if (this.status === REJECTED) {
            onRejected(this.error);
        } else {
            this.fulFilledCallbackList.push(() => onFulfilled(this.value));
            this.rejectedCallbackList.push(() => onRejected(this.error));
        }
    }

}

export default MyPromise;