/*
Lesson Overview
---------------
- Explain what ES6 modules are and how to import and export from them
- Describe the difference between default and named exports
- Explain the main differences between CommonJS modules and ES6 modules
*/

/**
 * Import and export
 * ---------------------
 * There are two types of importing and exporting: default and named
 * 
 * Named exports
 * ============== * 
 * // one.js
 * export const greeting = "Hello, Odinite!";
 * export const farewell = "Bye bye, Odinite!";
 * 
 * The above can also be done on a separate line: 
 * // one.js
 * const greeting = "Hello!";
 * const farewell = "Bye bye!";
 * export { greeting, farewell };
 * 
 * // two.js
 * import { greeting, farewell } from "./one.js";
 * console.log(greeting);
 * console.log(farewell);
 * 
 * Default exports
 * =============== *
 * In contrast to named exports, a file can only default export a single thing. Something exported this way does not have a name attached to it, so when you import it somewhere, you can decide what name to give it
 * 
 * // one.js
 * export default "Hello, Odinite!";
 * 
 * // two.js
 * import helloOdinite from "./one.js";
 * 
 * console.log(helloOdinite);
 */

// You can use both default and named exports in the same file.
// A file can have multiple named exports but only one default export.

/**
 * Using both in the same file
 * ============
 * // one.js
 * export default "Hello, Odinite!";
 * export const farewell = "By bye, Odinite!";
 * 
 * //two.js
 * import greeting, { farewell } from "./one.js";
 * 
 * console.log(greeting);
 * console.log(farewell);
 * 
 */

// <script src="index.js" type="module">
/**
 *  type="module" allows the browser to see that it depends on one.js and load the code from that file as well.
 * 
 * Script execution is automatically deferred as well
 * 
*/