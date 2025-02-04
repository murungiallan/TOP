import { createProject } from './project.js';
import { createTodo } from './todo.js';

const appTodo = (() => {
    const projects = [];

    const getProjects = () => projects;

    const addProject = (projectName) => {
        if (projects.some(p => p.name === projectName)) {
            throw new Error('Project name already exists');
        }
        const newProject = createProject(projectName);
        projects.push(newProject);
        saveToLocalStorage();
        return newProject;
    };

    const getProject = (projectName) => {
        return projects.find(p => p.name === projectName);
    };

    const addTodo = (projectName, todoData) => {
        const project = getProject(projectName);
        if (project) {
            const todo = createTodo(
                todoData.title,
                todoData.description,
                todoData.dueDate,
                todoData.priority
            );
            project.addTodo(todo);
            saveToLocalStorage();
            return todo;
        }
        throw new Error('Project not found');
    };

    const removeTodo = (projectName, todoTitle) => {
        const project = getProject(projectName);
        if (project) {
            project.removeTodo(todoTitle);
            saveToLocalStorage();
        }
    };

    const toggleTodoComplete = (projectName, todoTitle) => {
        const project = getProject(projectName);
        if (project) {
            const todo = project.getTodo(todoTitle);
            if (todo) {
                todo.toggleComplete();
                saveToLocalStorage();
            }
        }
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('projects', JSON.stringify(projects));
    };

    const loadFromLocalStorage = () => {
        const storedProjects = JSON.parse(localStorage.getItem('projects'));
        projects.length = 0;
        if (storedProjects && Array.isArray(storedProjects)) {
            storedProjects.forEach(projectData => {
                const project = createProject(projectData.name);
                projectData.todos.forEach(todoData => {
                    const todo = createTodo(
                        todoData.title,
                        todoData.description,
                        todoData.dueDate,
                        todoData.priority
                    );
                    todo.completed = todoData.completed;
                    project.addTodo(todo);
                });
                projects.push(project);
            });
        }
    };

    return {
        getProjects,
        addProject,
        getProject,
        addTodo,
        removeTodo,
        toggleTodoComplete,
        loadFromLocalStorage
    };
})();

export { appTodo };