/*
 * Asynchronous Code
 * ---------------
 * Lesson Overview
 * ---------------
 * 
 * - Explain what a callback is
 * - Explain what a promise is
 * - Explain teh circumstances under which promises are better than callbacks
 * - Explain what the .then() function does
 * 
 */

// Callbacks
// ---------------------
// A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of action.

myDiv.addEventListener("click", function() {
    // do something!
});

// Promises
// ---------------------
// A promise is an object that might produce a value at some point in the future.

const myData = getData(); // If this is refactored to return a promise

myData.then(function(data){ // .then() tells it to wait until the promise is resolved
    const pieceOfData = data['whatever']; // and THEN run the function inside
});

