// -------------------------------------------
// The object literal syntax
console.log('\n----\nThe Object Literal Syntax\n----\n');
const object = {
    property: 'Value!',
    otherProperty: 77,
    "obnoxious property": function() {
        return 'I am a function inside a key value pair';
    }
};

const value = object['obnoxious property'](); // bracket notation
const property = object.property; // dot notation
console.log(value);
console.log(property);

// ------------------------------------------
// Objects as a design pattern
console.log('\n----\nObjects as a design pattern\n----\n')

const playerOneName = 'tim';
const playerTwoName = 'jenn';
const playerOneMarker = 'X';
const playerTwoMarker = 'O';

const playerOne = {
    name: 'tim',
    marker: 'X'
};

const playerTwo = {
    name: 'jenn',
    marker: 'O'
};

function printName(player) {
    console.log(player.name);
}

printName(playerOne);

// -----------------------
// Object Constructors
console.log('\n----\nObject Constructors\n----\n');

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.sayName = function() {
        console.log(this.name);
    };
}

const player = new Player('steve', 'X');
console.log(player.name);
player.sayName();

// ------------------------------
// The Prototype
// The prototype is another object that the original object inherits from. The original object has access to all of its prototype's methods and properties

console.log('\n-----\nThe Prototype\n----\n');
Player.prototype.sayHello = function() {
    console.log("Hello, I'm a player!");
};

player.sayHello();

// Prototypal inheritance
function Person(name) {
    this.name = name;
}

Person.prototype.sayName = function() {
    console.log(`Hello, I'm ${this.name}`);
};

Player.prototype.getMarker = () => {
    console.log(`My marker is ${this.marker}`);
};

Object.getPrototypeOf(Player.prototype); // returns Object.prototype

// Making Player objects inherit from Person
Object.setPrototypeOf(Player.prototype, Person.prototype);
Object.getPrototypeOf(Player.prototype); // returns Person.prototype

const player1 = new Player('Steve', 'X');
const player2 = new Player('also steve', 'O');

player1.sayName(); // Hello, I'm steve
player2.sayName(); // Hello, I'm also steve

player1.getMarker();
player2.getMarker();