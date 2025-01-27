import '../css/index.css'
import dishesImg from '../images/dishes.jpg';
import res1Img from '../images/res1.jpg';
import res2Img from '../images/res2.jpg';
import { menuItems } from './menu.js';

// Group Items by Category
const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
  };
  
// Render Menu
const renderMenu = () => {
    const menuDiv = document.getElementById('menu');
    const groupedMenu = groupByCategory(menuItems);
  
    menuDiv.innerHTML = `
      <div class="menu-container my-3">
        <h2 class="menu-title mt-3">Menu</h2>
        <p class="menu-subtitle">~ Open Daily 9:30 AM - 11 PM ~</p>
        <div class="menu-grid">
          ${Object.keys(groupedMenu)
            .map(
              (category) => `
            <div class="menu-card">
              <h4>${category}</h4>
              <ul>
                ${groupedMenu[category]
                  .map(
                    (item) => `
                  <li class="menu-items-list">
                    <span style="display: block;">${item.name} ${item.price}</span>
                    <small style="color: lightgray; display: block;">${item.description}</small>
                  </li>
                `
                  )
                  .join('')}
              </ul>
            </div>
          `
            )
            .join('')}
        </div>
        <p class="footer-note">Open Daily 9:30 AM - 11 PM</p>
      </div>
    `;
};

// Render About Section using JS
const renderAboutSection = () => {
    const aboutDiv = document.getElementById('about');
  
    aboutDiv.innerHTML = ''; // Clear any existing content
    const aboutContainer = document.createElement('div');
    aboutContainer.classList.add('about-container');
  
    const aboutHeading = document.createElement('h2');
    aboutHeading.innerText = 'About Us';
    aboutContainer.appendChild(aboutHeading);
  
    const aboutParagraph = document.createElement('p');
    aboutParagraph.innerText = 'Welcome to our Coffee Shop, where we serve the finest coffee and delicious meals in a cozy atmosphere. Our mission is to provide a warm and inviting space for friends and family to gather, enjoy great food, and create lasting memories. Our team is dedicated to quality, sourcing the best ingredients, and crafting each dish with love.';
    aboutContainer.appendChild(aboutParagraph);
  
    aboutDiv.appendChild(aboutContainer);
  };
  
// Render Contact Form Section using JS
const renderContactForm = () => {
    const contactDiv = document.getElementById('contact');
  
    contactDiv.innerHTML = ''; // Clear any existing content
    const contactContainer = document.createElement('div');
    contactContainer.classList.add('contact-container');
  
    const contactHeading = document.createElement('h2');
    contactHeading.innerText = 'Contact Us';
    contactContainer.appendChild(contactHeading);
  
    const form = document.createElement('form');
    form.id = 'contactForm';
  
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.innerText = 'Name:';
    form.appendChild(nameLabel);
  
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name';
    nameInput.required = true;
    nameInput.placeholder = 'Your Name';
    form.appendChild(nameInput);
  
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.innerText = 'Email:';
    form.appendChild(emailLabel);
  
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.required = true;
    emailInput.placeholder = 'Your Email';
    form.appendChild(emailInput);
  
    const messageLabel = document.createElement('label');
    messageLabel.setAttribute('for', 'message');
    messageLabel.innerText = 'Message:';
    form.appendChild(messageLabel);
  
    const messageTextarea = document.createElement('textarea');
    messageTextarea.id = 'message';
    messageTextarea.name = 'message';
    messageTextarea.required = true;
    messageTextarea.placeholder = 'Your Message';
    form.appendChild(messageTextarea);
  
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Send Message';
    form.appendChild(submitButton);
  
    contactContainer.appendChild(form);
    contactDiv.appendChild(contactContainer);
  
    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    });
};
  
// Call the functions to render the sections
renderAboutSection();
renderContactForm();
renderMenu();

document.addEventListener('DOMContentLoaded', () => {
    // Images with attribution
    const images = [
        {
          url: dishesImg,
          credit: `Photo by <a href="https://unsplash.com/@jaywennington?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer">Jay Wennington</a> on <a href="https://unsplash.com/photos/dish-on-white-ceramic-plate-N_Y88TWmGwA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer">Unsplash</a>`
        },
        {
            url: res1Img,
            credit: `Photo by <a href="https://unsplash.com/@ninjason?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jason Leung</a> on <a href="https://unsplash.com/photos/photo-of-pub-set-in-room-during-daytime-poI7DelFiVA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>`
          },
        {
          url: res2Img,
          credit: `Photo by <a href="https://unsplash.com/@vardarious?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Volkan Vardar</a> on <a href="https://unsplash.com/photos/people-sitting-on-chairs-inside-restaurant-1H30uRC1plc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>`
        }
      ];      
  
    const welcomeDiv = document.querySelector('.welcome-div');
  
    // Create an overlay
    const overlay = document.createElement('div');
    overlay.classList.add('welcome-overlay');
    welcomeDiv.appendChild(overlay);
  
    // Create image divs for slideshow
    images.forEach((image, index) => {
      const imgDiv = document.createElement('div');
      imgDiv.classList.add('slideshow-images');
      imgDiv.style.backgroundImage = `url('${image.url}')`;
      if (index === 0) imgDiv.classList.add('active');
      welcomeDiv.appendChild(imgDiv);
    });
  
    // Attribution section
    const attribution = document.createElement('div');
    attribution.classList.add('image-attribution');
    attribution.style.position = 'absolute';
    attribution.style.bottom = '10px';
    attribution.style.right = '10px';
    attribution.style.color = 'white';
    attribution.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    attribution.style.padding = '5px 10px';
    attribution.style.borderRadius = '5px';
    attribution.style.fontSize = '12px';
    attribution.innerText = images[0].credit;
    welcomeDiv.appendChild(attribution);
  
    // Slideshow functionality
    let currentIndex = 0;
    setInterval(() => {
      const slides = document.querySelectorAll('.slideshow-images');
      slides[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add('active');
  
      // Update attribution
      attribution.innerText = images[currentIndex].credit;
    }, 5000); // Change image every 5 seconds
}); 
  