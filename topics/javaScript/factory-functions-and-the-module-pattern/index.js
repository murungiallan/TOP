/*
Lesson Overview
---------------
- Describe the scope of a variable
- Explore what closures are
- Briefly consider the disadvantages of using constructors
- Discuss factory functions with examples
- discuss private variables and functions concerning factory functions
- Showcase object inheritance with the help of factory functions
- Describe what module and IIFEs are
- Discuss encapsulation and how the module pattern helps with namespacing
*/

// Factory Functions
// ------------------
const User = function (name) {
    this.name = name;
    this.discordName = "@" + name;
}

// The above is a constructor
// It can be refactored into a factory function

function createUser(name) {
    const discordName = "@" + name;
    return {
        name,
        discordName
    };
}

// The object shorthand notation
// ----------------------------------
const bobName = "Bob";
const age = 28;
const color = "red";

const thatObject = {bobName, age, color};
console.log(bobName, age, color);
console.log({bobName, age, color});

// Destructuring
// -----------------------------------
const obj = {a: 1, b: 2};
const {a, b} = obj;

/*
The above creates 2 variables: a and b
const a = obj.a;
const b = obj.b;
*/

const array = [1, 2, 3, 4, 5];
const [zeroth, first] = array;

// This creates zeroth and first, both of which point to the elements i the 0th and 1st indices of the array
console.log({zeroth, first, array});

// Private variables and functions
// -----------------------------
function createUser1(name) {
    const discordName = "@" + name;

    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;
    return {name, discordName, getReputation, giveReputation};

}

const allan = createUser1("Allan");
allan.giveReputation();
allan.giveReputation();

console.log({
    discordName: allan.discordName,
    reputation: allan.getReputation()
});

// Prototypal inheritance with factories
// ---------------------------------------
function createPlayer (name, level) {
    const {getReputation, giveReputation} = createUser1(name);
    const increaseLevel = () => level++;
    return { name, getReputation, giveReputation, increaseLevel };
}

// using the Object.assign() method
function createPlayer1 (name, level) {
    const user = createUser1(name);
    const increaseLevel = () => level++;
    return Object.assign({}, user, { increaseLevel });
}


// The module pattern: IIFEs
// -------------------------------
const calculator = (() => {
    const add = (a, b) => {
        return a + b;
    };

    const sub = (a, b) => {
        return a - b;
    };

    const mul = (a, b) => {
        return a * b;
    };

    const div = (a, b) => {
        return a / b;
    };

    return {add, sub, mul, div};
})();

const results = {
    add: calculator.add(3,5),
    sub: calculator.sub(6,2),
    mul: calculator.mul(14,7),
    div: calculator.div(14,7)
};
console.log(results);