import MyPromise from './promise';

const promiseInstance = new MyPromise((resolve, reject) => {
    // resolve('resolve');
    reject('reject');
})

promiseInstance.then((value) => {
    console.log('MyPromise', value)
})

promiseInstance.catch((error) => {
    console.log('MyPromise', error)
})