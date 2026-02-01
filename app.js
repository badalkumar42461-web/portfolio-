// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navbar link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Projects data (customize with your info)
const projects = [
    {
        id: 1,
        img: 'https://via.placeholder.com/500x300/4ECDC4/FFFFFF?text=E-Commerce',
        title: 'E-Commerce Platform',
        desc: 'Fullstack e-commerce with React, Node.js & Stripe integration.',
        tags: ['react', 'web', 'node'],
        github: 'https://github.com/yourusername/ecommerce',
        live: 'https://ecommerce.yourdomain.com'
    },
    {
        id: 2,
        img: 'https://via.placeholder.com/500x300/FF6B6B/FFFFFF?text=Dashboard',
        title: 'Analytics Dashboard',
        desc: 'Interactive dashboard with Chart.js and real-time data.',
        tags: ['react', 'web'],
        github: 'https://github.com/yourusername/dashboard',
        live: 'https://dashboard.yourdomain.com'
    },
    {
        id: 3,
        img: 'https://via.placeholder.com/500x300/45B7D1/FFFFFF?text=Mobile+App',
        title: 'Task Management App',
        desc: 'React Native mobile app with offline sync capability.',
        tags: ['mobile', 'react'],
        github: 'https://github.com/yourusername/taskapp',
        live: 'https://play.google.com/store/apps/taskapp'
    }
];

// Render projects
const projectsGrid = document.getElementById('projects-grid');
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-filter', project.tags[0]);
    projectCard.innerHTML = `
        <img src="${project.img}" alt="${project.title}" class="project-img">
        <div class="project-content">
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag.toUpperCase()}</span>`).join('')}
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.desc}</p>
            <div class="project-links">
                <a href="${project.github}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> Code</a>
                <a href="${project.live}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live</a>
            </div>
        </div>
    `;
    projectsGrid.appendChild(projectCard);
});

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.filter === filter) {
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
            } else {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0.5';
            }
        });
    });
});

// Animate skill progress bars
const animateProgress = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width;
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills-section')) {
                animateProgress();
            }
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here (EmailJS, etc.)
    alert('Thank you! Your message has been sent. 🚀');
    e.target.reset();
});

// Typing effect for hero title (optional)
const textElement = document.querySelector('.hero-title');
const text = textElement.textContent;
textElement.textContent = '';
let i = 0;
function typeWriter() {
    if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
window.addEventListener('load', typeWriter);
