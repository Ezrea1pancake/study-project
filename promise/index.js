import MyPromise from './promise';

const promiseInstance = new MyPromise((resolve, reject) => {
    // resolve('resolve');
    setTimeout(() => {
        reject('reject');
    }, 1000);
})

promiseInstance.then((value) => {
    console.log('MyPromise', value);
}, (error) => {
    console.log('MyPromise', error);
});