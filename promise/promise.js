const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';


class MyPromise {
    constructor(exector) {
    
        this.value = null;
        this.error = null;

        this.status = PENDING;
    
        let resolve = (value) => {
            this.value = value
        };
    
        let reject = (error) => {
            this.error = error
        };

        exector(resolve, reject);

    }

    then(handler) {
        handler(this.value);
    }

    catch(handler) {
        handler(this.error)
    }
}

export default MyPromise;