import { appTodo } from './app.js';

const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'No Due Date';
};

const getPriorityBadgeClass = (priority) => {
    const classes = {
        low: 'bg-success',
        medium: 'bg-warning',
        high: 'bg-danger'
    };
    return classes[priority] || 'bg-secondary';
};

const showProjectModal = (project) => {
    const modalHtml = `
        <div class="modal fade" id="projectModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${project.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <h6>Project Status: 
                                <span class="badge ${project.completed ? 'bg-success' : 'bg-warning'}">
                                    ${project.completed ? 'Completed' : 'In Progress'}
                                </span>
                            </h6>
                            <p>Required Tasks to Complete: ${project.requiredTasks}</p>
                            <p>Completed Tasks: ${project.todos.filter(t => t.completed).length}</p>
                        </div>
                        <h6>Tasks:</h6>
                        <ul class="list-group">
                            ${project.todos.map(todo => `
                                <li class="list-group-item">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 class="${todo.completed ? 'text-decoration-line-through' : ''}">${todo.title}</h6>
                                            <p class="mb-1">${todo.description}</p>
                                            <small class="text-muted">Due: ${formatDate(todo.dueDate)}</small>
                                        </div>
                                        <span class="badge ${getPriorityBadgeClass(todo.priority)}">${todo.priority}</span>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('projectModal')?.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
};

export const renderProjects = () => {
    const projectList = document.getElementById('project-list');
    if (!projectList) return;

    projectList.innerHTML = '';

    const projects = appTodo.getProjects();

    if (projects.length === 0) {
        projectList.innerHTML = `
            <div class="col-12">
                <p class="text-center text-muted">No projects yet. Add a new project to get started!</p>
            </div>`;
        return;
    }

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-12 mb-3';
        projectCard.innerHTML = `
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">
                        ${project.name}
                        <span class="badge ms-2 ${project.completed ? 'bg-success' : 'bg-warning'}">
                            ${project.completed ? 'Completed' : 'In Progress'}
                        </span>
                    </h5>
                    <div>
                        <button class="btn btn-sm btn-primary view-project" data-project="${project.name}">View</button>
                        <button class="btn btn-sm btn-danger delete-project" data-project="${project.name}">Delete</button>
                    </div>
                </div>
                <div class="card-body collapse" id="project-${project.name.replace(/\s+/g, '-')}">
                    <div class="mb-3">
                        <h6>Add New Task</h6>
                        <form class="row g-3">
                            <div class="col-md-6">
                                <input type="text" class="form-control new-todo-title" placeholder="Task Title">
                            </div>
                            <div class="col-md-6">
                                <input type="text" class="form-control new-todo-description" placeholder="Description">
                            </div>
                            <div class="col-md-4">
                                <input type="date" class="form-control new-todo-due-date">
                            </div>
                            <div class="col-md-4">
                                <select class="form-select new-todo-priority">
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-success w-100 add-todo" data-project="${project.name}">
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                    <h6>Tasks</h6>
                    <ul class="list-group list-group-flush">
                        ${project.todos.map(todo => `
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="form-check">
                                    <input class="form-check-input todo-checkbox" type="checkbox" 
                                        ${todo.completed ? 'checked' : ''} 
                                        data-project="${project.name}" 
                                        data-todo="${todo.title}">
                                    <label class="form-check-label ${todo.completed ? 'text-decoration-line-through' : ''}">
                                        ${todo.title}
                                    </label>
                                </div>
                                <div>
                                    <span class="badge ${getPriorityBadgeClass(todo.priority)}">${todo.priority}</span>
                                    <small class="text-muted ms-2">${formatDate(todo.dueDate)}</small>
                                    <button class="btn btn-sm btn-danger ms-2 delete-todo" 
                                        data-project="${project.name}" 
                                        data-todo="${todo.title}">×</button>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        projectList.appendChild(projectCard);
    });

    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectName = e.target.dataset.project;
            const project = appTodo.getProject(projectName);
            if (project) showProjectModal(project);
        });
    });

    document.querySelectorAll('.delete-project').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectName = e.target.dataset.project;
            if (confirm(`Are you sure you want to delete project "${projectName}"?`)) {
                appTodo.removeProject(projectName);
                renderProjects();
            }
        });
    });

    document.querySelectorAll('.add-todo').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectName = e.target.dataset.project;
            const projectCard = e.target.closest('.card');
            if (!projectCard) return;

            const titleInput = projectCard.querySelector('.new-todo-title');
            const descriptionInput = projectCard.querySelector('.new-todo-description');
            const dueDateInput = projectCard.querySelector('.new-todo-due-date');
            const priorityInput = projectCard.querySelector('.new-todo-priority');

            if (!titleInput || !dueDateInput) return;

            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();
            const dueDate = dueDateInput.value;
            const priority = priorityInput.value;

            if (!title || !dueDate) {
                alert('Please fill in at least the title and due date');
                return;
            }

            appTodo.addTodo(projectName, { title, description, dueDate, priority });

            titleInput.value = '';
            descriptionInput.value = '';
            dueDateInput.value = '';
            priorityInput.value = 'low';

            renderProjects();
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    appTodo.loadFromLocalStorage();
    renderProjects();
});