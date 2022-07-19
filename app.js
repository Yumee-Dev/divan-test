// define modules object
const modules = {
    define: (moduleName, dependencies, provide) => {
        this[moduleName] = new Promise(provide);
    },
    require: (dependencies, successCallback, errorCallback = undefined) => {
        Promise.all(dependencies.map(dependency => this[dependency])).then((results) => {
            successCallback(...results);
        }).catch((error) => errorCallback(error));
    }
};

// app.js
// объявление модуля A
modules.define('A', [], (provide) => {
    provide(1);
});
// объявление модуля B
modules.define('B', [], (provide) => {
    setTimeout(() => {
        provide(2);
    }, 1000);
});
// Полезная логика
modules.require(['A', 'B'], (A, B) => {
    console.log(A + B); // 1 + 2 = 3
});
// define module C
modules.define('C', [], (provide) => {
    setTimeout(() => {
        provide(3);
    }, 2000);
});
// define error-generating module D
modules.define('D', [], (provide) => {
    throw new Error('HERE\'S ERROR MESSAGE OUTPUT BY ERROR CALLBACK');
});
// test working with 3 modules
modules.require(['A', 'B', 'C'], (A, B, C) => {
    console.log(`A * B * C = ${A} * ${B} * ${C} = ${A * B * C}`);
});
// test working with error callback
modules.require(['A', 'B', 'D'], (A, B, D) => {
    console.log(`A * B * D = ${A} * ${B} * ${D} = ${A * B * D}`);
}, (error) => console.log(error));

// вывод для проверки асинхронности require
console.log(4); // 4