// Fetch projects from the 'projects' folder
fetchProjects();

function fetchProjects() {
    // Make an AJAX request to fetch the projects data
    // Replace 'projects-data.json' with the actual path to your JSON file
    fetch('projects-data.json')
        .then(response => response.json())
        .then(data => {
            // Loop through the projects data and create project cards
            data.forEach(project => {
                createProjectCard(project);
            });
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
        });
}

function createProjectCard(project) {
    // Create a project card element
    const projectCard = document.createElement('div');
    projectCard.classList.add('col-md-4', 'project-card');

    // Create the card content
    const cardContent = `
        <div class="card">
            <img src="${project.image}" class="card-img-top" alt="${project.title}">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.description}</p>
                <a href="${project.url}" class="btn btn-primary">View Project</a>
            </div>
        </div>
    `;

    // Set the card content as the inner HTML of the project card
    projectCard.innerHTML = cardContent;

    // Append the project card to the projects container
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.appendChild(projectCard);
}