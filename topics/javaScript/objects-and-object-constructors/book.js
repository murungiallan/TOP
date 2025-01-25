function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295);
console.log(theHobbit.info());