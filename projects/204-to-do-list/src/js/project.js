// Create and export the project factory function
const createProject = (projectName, requiredTasks = 1) => {
    return {
        name: projectName,
        todos: [],
        requiredTasks,
        completed: false,
        addTodo(todo) {
            this.todos.push(todo);
            this.updateProjectStatus();
        },
        removeTodo(todoTitle) {
            this.todos = this.todos.filter(todo => todo.title !== todoTitle);
            this.updateProjectStatus();
        },
        getTodo(todoTitle) {
            return this.todos.find(todo => todo.title === todoTitle);
        },
        updateProjectStatus() {
            const completedTasks = this.todos.filter(todo => todo.completed).length;
            this.completed = completedTasks >= this.requiredTasks;
        }
    };
};

export { createProject }