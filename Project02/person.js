
// Module Wrapper Function
// (function (exports, require, module, __filename, __dirname) {

// })

// console.log(__filename, __dirname);




class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greeting() {
        console.log(`My Name is ${this.name} and I am ${this.age}`);        
    }
}

module.exports = Person;