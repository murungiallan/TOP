let user = {
    name: "John",
    surname: "Smith",

    // Adding a fullName property by implementing it as an accessor
    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    // Setter
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};

user.fullName = "Alice Cooper";
console.log(user.name, ",", user.surname);
console.log(user.fullName);


// Creating an accessor with defineProperty
let user1 = {
    name: "John",
    surname: "Smith"
};

Object.defineProperty(user1, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`;
    },

    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});

console.log(user1.fullName);
for (let key in user1) console.log(key);
