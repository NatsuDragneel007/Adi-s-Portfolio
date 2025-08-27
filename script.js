// Smooth Scrolling Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Interactive Element Hover Effects
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('.card-title').textContent;
        const description = card.querySelector('.card-description').textContent;
        
        modalBody.innerHTML = `
            <h2>${title}</h2>
            <p><strong>Category:</strong> ${category.charAt(0).toUpperCase() + category.slice(1)}</p>
            <p>${description}</p>
            <div id="modalBody">
                <img src="${card.querySelector('.card-image').src}" alt="${title}" style="width: 100%; border-radius: 8px; margin-top: 20px;">
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Image Slider
const slider = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slides = document.querySelectorAll('.campaign-slide');

let currentSlide = 0;

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

// Auto-play slider
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 5000);

// Smooth Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > document.documentElement.scrollHeight * 0.3) {
        interactionCount++;
        console.log(`User scrolled ${interactionCount} times`);
    }
});