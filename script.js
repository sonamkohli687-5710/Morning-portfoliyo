// =========================================
// Custom Cursor
// =========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Only run on non-touch devices
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth follow for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    });

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll('a, button, .skill-card, .service-card, .project-card, .highlight-card');
    
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// =========================================
// Scroll Progress Bar
// =========================================
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}%`;
    scrollProgress.style.width = scroll;
});

// =========================================
// Mobile Menu Toggle
// =========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =========================================
// Navbar Scroll & Active Link
// =========================================
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// =========================================
// Typing Animation
// =========================================
const typingText = document.querySelector('.typing-text');
const words = ['Web Applications', 'RESTful APIs', 'Modern UIs', 'End-to-End Solutions'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    if (!typingText) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if(typingText) setTimeout(typeEffect, 1000);
});

// =========================================
// Scroll Reveal Animation (Intersection Observer)
// =========================================
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Removing active class ensures the animation triggers again (infinite)
            entry.target.classList.remove('active');
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// =========================================
// Vanilla 3D Tilt Effect for Cards
// =========================================
const tiltElements = document.querySelectorAll('.skill-card, .service-card, .project-card, .highlight-card');

if (window.matchMedia("(pointer: fine)").matches) {
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
            const rotateY = ((x - centerX) / centerX) * 15;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}
