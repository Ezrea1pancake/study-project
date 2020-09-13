import MyPromise from './MyPromise';
import APromise from './APromise';


// MyPromise使用
const myPromiseInstance = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolve');
    }, 1000);
    // setTimeout(() => {
    //     reject('reject');
    // }, 1000);
})

const myPromiseNext = myPromiseInstance.then(value => {
    console.log('MyPromise', value);
    return 'next Promise';
}, error => {
    console.log('MyPromise', error);
});

// myPromiseNext.then(value => {
//     console.log('MyPromiseNext', value);
// }, error => {
//     console.log('MyPromiseNext', error);
// })


// MyPromise使用
const aPromiseInstance = new APromise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolve');
    }, 1000);
    // setTimeout(() => {
    //     reject('reject');
    // }, 1000);
})

const aPromiseNext = aPromiseInstance.then(value => {
    // console.log('APromise', value);
    // return 'next Promise';
    // return new APromise((resolve, reject) => {
    //     setTimeout(() => {
    //         // resolve('next Promise');
    //         reject('next Promise');
    //     }, 1000);
    // })
    return {
        value: 'next Promise',
        // then: 'error',
        then(onFulfilled, onRejected) {
            // console.log('thenFn');
            // onFulfilled(this.value);
            onRejected('error');
        }
    }
}, error => {
    console.log('APromise', error);
});

aPromiseNext.then(value => {
    console.log('APromiseNext', value);
}, error => {
    console.log('APromiseNext', error);
});

aPromiseInstance.then().then(value => {
    console.log('APromise', value);
}, error => {
    console.log('APromise', error);
})
