/**
 * ASYNC AND AWAIT
 * 
 * -------------
 * Lesson Overview
 * -------------
 * - Explain what the async keyword does
 * - Explain what the await keyword does
 * - Explain what an async function does
 * - Explain what happens when an error is thrown inside an async function
 * - Explain how you can handle errors inside an async function 
 * 
 */

// The async keyword
/**
 * - The async keyword is what lets the JS engine know that you are declaring an asynchronous function. This is required to use await inside any function
 * - When a function is declared with async, it automatically returns a promise
 * - Returning in an async function is the same as resolving a promise. Likewise, throwing an error will reject the promise
 * - It is valid to use an async function anywhere you can use a normal function
 * 
 */ 

// The await keyword
/**
 * - await does the following: it tells JavaScript to wait for an asynchronous action to finish before continuing the function. It's like a 'pause until done' keyword.
 * - The await keyword is used to get a value from a function where you would normally use .then(). Instead of calling .then() after the asynchronous function, you would assign a variable to the result using await. Then you can use the result in your code as you would in your synchronous code.
 * 
 */

// Error handling
/**
 * - Promises have the .catch() method for handling rejected promises, and since async functions just return a promise, you can call the function, and append a .catch() method to the end.
 */

asyncFunctionCall().catch(err => {
    console.error(err);
});

// Code

const server = {
    people: [
        {name: "Odin", age: 40},
        {name: "Thor", age: 26},
        {name: "Freyja", age: 18},
        {name: "Aladdin", age: 34},
    ],
    getPeople() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.people);
            }, 2000);
        });
    },
};

async function getPersonsInfo(name) {
    try {
        const people = await server.getPeople();
        const person = people.find(person => { return person.name === name });
        return person;
    } catch (error) {
        console.log(`${error}`);
    }
}