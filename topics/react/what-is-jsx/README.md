# What is JSX?

## Lesson Overview

- What JSX is
- Differences between JSX and HTML

### What is JSX

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.

Essentially, JSX is syntactic sugar for the React **createElement function**.

### Why do we use JSX?

JSX allows React to separate concerns by containing both rendering logic and content in the same place (a component).

### Rules of JSX

1. Return a single root element. If you wish to return multiple elements in a component, you can do so by wrapping them in a parent tag.
2. Close all tags. In JSX, we must explicitly close and wrap these tags. `<input>` would become `<input />` and `<li>` would become `<li></li>`

    ```JavaScript
    function App(){
        return (
            <>
                <input />
                <li></li>
            </>
        );
    }

    ```

3. camelCase most things. JSX turns into JavaScript, and attributes of elements become keys of JavaScript objects, so you can’t use dashes or reserved words such as `class`. Because of this, many HTML attributes are written in camelCase. Instead of `stroke-width`, you’d use `strokeWidth`, and instead of `class` you’d use `className`.

    ```javascript
        function App() {
        return (
        <div className="container">
            <svg>
            <circle cx="25" cy="75" r="20" stroke="green" strokeWidth="2" />
            </svg>
        </div>
        );
        }
    ```
