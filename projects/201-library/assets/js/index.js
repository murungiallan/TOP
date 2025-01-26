class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
  
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    }
}
const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    console.log(myLibrary);
}

function displayBooks() {
    const table = document.getElementById("bookTable").querySelector("tbody");
    table.innerHTML = "";

    myLibrary.forEach((book) => {
        const newRow = document.createElement("tr");

        // Author
        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        newRow.appendChild(authorCell);

        // Title
        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;
        newRow.appendChild(titleCell);

        // Pages
        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;
        newRow.appendChild(pagesCell);

        // Read
        const readCell = document.createElement("td");
        readCell.textContent = book.read ? "Yes" : "No";
        newRow.appendChild(readCell);

        table.appendChild(newRow); // Fixed this line
    });
}

document.getElementById("dataForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // form data
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pages = parseInt(document.getElementById("pages").value, 10);
    const read = document.querySelector('input[name="read"]:checked')?.value === "yes";

    if (!title || !author || isNaN(pages)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    // Add book to library
    addBookToLibrary(title, author, pages, read);

    // Update table
    console.log("Calling displayBooks...");
    displayBooks();

    document.getElementById("dataForm").reset();
});