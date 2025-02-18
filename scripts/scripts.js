// Static JSON data to simulate project data
const projects = [
    {
        title: "Odin Recipes",
        description: "A simple recipe showcase",
        image: "images/recipes.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/001-recipes/"
    },
    {
        title: "Rock, Paper, Scissors",
        description: "A classic game implementation",
        image: "images/rock-paper-scissors.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/002-rock-paper-scissors/"
    },
    {
        title: "Etch A Sketch",
        description: "A pixel drawing tool",
        image: "images/etch-a-sketch.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/003-etch-a-sketch/"
    },
    {
        title: "Calculator",
        description: "A basic web calculator",
        image: "images/calculator.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/004-calculator/"
    },
    {
        title: "Sign Up Form",
        description: "A responsive sign-up form",
        image: "images/sign-up-form.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/101-sign-up-form/"
    },
    {
        title: "Admin Dashboard",
        description: "An example admin dashboard",
        image: "images/dashboard.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/102-admin-dashboard/"
    },
    {
        title: "Library",
        description: "A simple library app",
        image: "images/library.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/201-library/"
    },
    {
        title: "Tic Tac Toe",
        description: "The classic game implemented in JavaScript",
        image: "images/tic-tac-toe.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/202-tic-tac-toe/"
    },
    {
        title: "Restaurant Page",
        description: "A website showing my restaurant. Implemented in HTML, CSS, JS",
        image: "images/restaurant.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/203-restaurant-page/"
    },
    {
        title: "To-Do List",
        description: "A task management app to keep track of daily activities",
        image: "images/todo.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/204-to-do-list/"
    },
    {
        title: "Weather App",
        description: "A weather app that fetches real-time weather data",
        image: "images/weather.png",
        url: "https://github.com/murungiallan/TOP/blob/main/projects/205-weather-app/"
    }
];

// Dynamically populate the projects container
const projectsContainer = document.getElementById("projects-container");

projects.forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("col-md-4", "project-card");

    projectCard.innerHTML = `
        <div class="card">
            <img src="${project.image}" class="card-img-top" alt="${project.title}">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.description}</p>
                <a href="${project.url}" class="btn btn-primary" target="_blank">View Project</a>
            </div>
        </div>
    `;

    projectsContainer.appendChild(projectCard);
});

// Set current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();
