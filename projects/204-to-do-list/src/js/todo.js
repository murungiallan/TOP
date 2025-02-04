// Create and export the todo factory function
const createTodo = (title, description, dueDate, priority) => {
    return {
        title,
        description,
        dueDate,
        priority,
        completed: false,
        toggleComplete() {
            this.completed = !this.completed;
        }
    };
};

export { createTodo };