// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Load campaigns data
    loadCampaigns();
    
    // Initialize portfolio filters
    initPortfolioFilters();
    
    // Initialize smooth scrolling and active nav
    initSmoothScrolling();
    
    // Initialize WhatsApp chatbot
    initWhatsAppChatbot();
    
    // Initialize parallax hero pieces
    initParallaxHero();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize easter egg
    initEasterEgg();
    
    // Initialize animations on scroll
    initAnimationsOnScroll();
});

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-theme', currentTheme === 'light');
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    // Only show cursor on non-touch devices
    if (!('ontouchstart' in window)) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseout', function() {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseover', function() {
            cursor.style.opacity = '0.7';
        });
        
        // Add pulse effect
        setInterval(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 200);
        }, 2000);
    }
}

// Load Campaigns Data
async function loadCampaigns() {
    try {
        const response = await fetch('assets/data/campaigns.json');
        const campaigns = await response.json();
        
        // Populate hero carousel
        populateHeroCarousel(campaigns);
        
        // Populate portfolio grid
        populatePortfolioGrid(campaigns);
        
        // Store campaigns globally for modals
        window.campaignsData = campaigns;
    } catch (error) {
        console.error('Error loading campaigns data:', error);
    }
}

// Populate Hero Carousel
function populateHeroCarousel(campaigns) {
    const carouselInner = document.querySelector('#campaignCarousel .carousel-inner');
    const carouselIndicators = document.querySelector('#campaignCarousel .carousel-indicators');
    
    // Clear existing content
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    // Create carousel items and indicators
    campaigns.forEach((campaign, index) => {
        // Create carousel item
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        
        const img = document.createElement('img');
        img.src = `assets/images/${campaign.images[0]}`;
        img.className = 'd-block w-100';
        img.alt = campaign.title;
        img.loading = index === 0 ? 'eager' : 'lazy';
        
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
        
        // Create indicator
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#campaignCarousel');
        indicator.setAttribute('data-bs-slide-to', index);
        if (index === 0) {
            indicator.classList.add('active');
            indicator.setAttribute('aria-current', 'true');
        }
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        
        carouselIndicators.appendChild(indicator);
    });
    
    // Set up slide change event to update content
    const carousel = document.getElementById('campaignCarousel');
    carousel.addEventListener('slide.bs.carousel', function(event) {
        updateCampaignContent(campaigns[event.to]);
    });
    
    // Initialize with first campaign content
    updateCampaignContent(campaigns[0]);
}

// Update Campaign Content
function updateCampaignContent(campaign) {
    const contentContainer = document.getElementById('campaign-content');
    
    // Create HTML for campaign content
    let contentHTML = `
        <h3>${campaign.title}</h3>
        <div class="campaign-meta">
            <span>${campaign.client}</span>
            <span>${campaign.year}</span>
        </div>
        
        <div class="campaign-section">
            <h4>Problem</h4>
            <p>${campaign.problem}</p>
        </div>
        
        <div class="campaign-section">
            <h4>Strategy</h4>
            <p>${campaign.strategy}</p>
        </div>
        
        <div class="campaign-section">
            <h4>Execution</h4>
            <p>${campaign.execution}</p>
        </div>
        
        <div class="campaign-results">
            ${campaign.results.engagement_increase_percent ? `
            <div class="result-item">
                <div class="result-number" data-count="${campaign.results.engagement_increase_percent}">0</div>
                <div class="result-label">Engagement Increase</div>
            </div>` : ''}
            
            ${campaign.results.ctr_increase_percent ? `
            <div class="result-item">
                <div class="result-number" data-count="${campaign.results.ctr_increase_percent}">0</div>
                <div class="result-label">CTR Increase</div>
            </div>` : ''}
            
            ${campaign.results.meeting_success_rate_percent ? `
            <div class="result-item">
                <div class="result-number" data-count="${campaign.results.meeting_success_rate_percent}">0</div>
                <div class="result-label">Success Rate</div>
            </div>` : ''}
        </div>
        
        <div class="campaign-section">
            <p>${campaign.results.notes}</p>
        </div>
        
        <a href="case-studies/${campaign.slug}.html" class="btn btn-primary">${campaign.cta_text}</a>
    `;
    
    contentContainer.innerHTML = contentHTML;
    
    // Animate counters
    animateCounters();
}

// Animate Counters
function animateCounters() {
    const counters = document.querySelectorAll('.result-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '%';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '%';
            }
        };
        
        updateCounter();
    });
}

// Populate Portfolio Grid
function populatePortfolioGrid(campaigns) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    // Clear existing content
    portfolioGrid.innerHTML = '';
    
    // Create portfolio cards
    campaigns.forEach(campaign => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.dataset.category = campaign.category;
        
        const categoryIcon = getCategoryIcon(campaign.category);
        
        card.innerHTML = `
            <img src="assets/images/${campaign.images[0]}" alt="${campaign.title}" class="portfolio-card-image" loading="lazy">
            <div class="portfolio-card-overlay">
                <h3 class="portfolio-card-title">
                    <span class="filter-icon">${categoryIcon}</span>
                    ${campaign.title}
                </h3>
                <div class="portfolio-card-category">${campaign.category}</div>
                <p class="portfolio-card-blurb">${campaign.problem.substring(0, 100)}...</p>
                <a href="#" class="portfolio-card-link" data-slug="${campaign.slug}">Open case study</a>
            </div>
        `;
        
        // Add click event to open modal
        const cardLink = card.querySelector('.portfolio-card-link');
        cardLink.addEventListener('click', function(e) {
            e.preventDefault();
            openCaseStudyModal(campaign.slug);
        });
        
        portfolioGrid.appendChild(card);
    });
}

// Get Category Icon
function getCategoryIcon(category) {
    const icons = {
        '360 Campaign': '♖',
        'Logos & Brand Identity': '♘',
        'Print': '♗',
        'Social Media Designs': '♙',
        'Brochures': '♗'
    };
    
    return icons[category] || '♙';
}

// Initialize Portfolio Filters
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio cards
            const filterValue = this.getAttribute('data-filter');
            const portfolioCards = document.querySelectorAll('.portfolio-card');
            
            portfolioCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Open Case Study Modal
function openCaseStudyModal(slug) {
    const campaign = window.campaignsData.find(c => c.slug === slug);
    
    if (!campaign) {
        console.error('Campaign not found:', slug);
        return;
    }
    
    // Update modal content
    const modalTitle = document.getElementById('caseStudyModalLabel');
    const modalBody = document.getElementById('caseStudyModalBody');
    const modalLink = document.getElementById('caseStudyModalLink');
    
    modalTitle.textContent = campaign.title;
    
    let modalContent = `
        <div class="case-study-modal-content">
            <div class="case-study-meta">
                <span>${campaign.client}</span> • <span>${campaign.year}</span> • <span>${campaign.category}</span>
            </div>
            
            <div class="case-study-section">
                <h4>Problem</h4>
                <p>${campaign.problem}</p>
            </div>
            
            <div class="case-study-section">
                <h4>Strategy</h4>
                <p>${campaign.strategy}</p>
            </div>
            
            <div class="case-study-section">
                <h4>Execution</h4>
                <p>${campaign.execution}</p>
            </div>
            
            <div class="case-study-section">
                <h4>Results</h4>
                <p>${campaign.results.notes}</p>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    modalLink.href = `case-studies/${campaign.slug}.html`;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('caseStudyModal'));
    modal.show();
}

// Initialize Smooth Scrolling and Active Nav
function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav
                updateActiveNav(targetId);
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNav(`#${sectionId}`);
            }
        });
    });
}

// Update Active Nav
function updateActiveNav(activeId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

// Initialize WhatsApp Chatbot
function initWhatsAppChatbot() {
    const whatsappToggle = document.getElementById('whatsapp-toggle');
    const whatsappOffcanvas = document.getElementById('whatsapp-offcanvas');
    const chatOptions = document.querySelectorAll('.chat-option');
    const chatResponse = document.getElementById('chat-response');
    
    // Open WhatsApp chatbot
    whatsappToggle.addEventListener('click', function() {
        const offcanvas = new bootstrap.Offcanvas(whatsappOffcanvas);
        offcanvas.show();
    });
    
    // Handle chat option selection
    chatOptions.forEach(option => {
        option.addEventListener('click', function() {
            const optionType = this.getAttribute('data-option');
            let responseHTML = '';
            
            // Add user message
            responseHTML += `
                <div class="chat-message user-message">
                    <p>${this.textContent.trim()}</p>
                </div>
            `;
            
            // Add bot response based on option
            switch(optionType) {
                case 'quote':
                    responseHTML += `
                        <div class="chat-message bot-message">
                            <p>I'd be happy to provide a quick quote! To give you an accurate estimate, I'll need some details about your project. Could you tell me a bit about what you're looking for?</p>
                            <div class="chat-actions">
                                <a href="mailto:hello@adityapathak.dev?subject=Project Quote Request" class="btn btn-primary btn-sm">Send Email</a>
                                <a href="https://wa.me/15551234567?text=Hi%20Aditya,%20I'd%20like%20to%20request%20a%20quote%20for%20a%20project." class="btn btn-outline-secondary btn-sm">WhatsApp</a>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'brief':
                    responseHTML += `
                        <div class="chat-message bot-message">
                            <p>Great! I love discussing new project briefs. You can share your brief with me via email, and I'll get back to you within 24 hours with my thoughts and initial ideas.</p>
                            <div class="chat-actions">
                                <a href="mailto:hello@adityapathak.dev?subject=Project Brief Discussion" class="btn btn-primary btn-sm">Share Brief</a>
                                <a href="https://wa.me/15551234567?text=Hi%20Aditya,%20I'd%20like%20to%20discuss%20a%20project%20brief." class="btn btn-outline-secondary btn-sm">WhatsApp</a>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'call':
                    responseHTML += `
                        <div class="chat-message bot-message">
                            <p>I'd be happy to schedule a call with you! Please use the link below to book a time that works for you. I typically respond within 24 hours to confirm.</p>
                            <div class="chat-actions">
                                <a href="https://calendly.com/adityapathak/30min" class="btn btn-primary btn-sm" target="_blank">Book a Call</a>
                                <a href="mailto:hello@adityapathak.dev?subject=Call Request" class="btn btn-outline-secondary btn-sm">Email Me</a>
                            </div>
                        </div>
                    `;
                    break;
            }
            
            // Update chat response
            chatResponse.innerHTML = responseHTML;
            
            // Disable options after selection
            chatOptions.forEach(opt => {
                opt.disabled = true;
                opt.style.opacity = '0.5';
                opt.style.cursor = 'not-allowed';
            });
        });
    });
}

// Initialize Parallax Hero
function initParallaxHero() {
    // Only enable parallax on non-touch devices and if not preferring reduced motion
    if (!('ontouchstart' in window) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const heroPieces = document.querySelectorAll('.hero-piece');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            heroPieces.forEach(piece => {
                const speed = piece.getAttribute('data-speed');
                const yPos = -(scrolled * speed);
                piece.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }
}

// Initialize Form Submission
function initFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // For Formspree integration, the form will submit normally
            // This is just to show a success message
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData);
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            
            // Replace form with success message
            contactForm.parentNode.replaceChild(successMessage, contactForm);
            
            // Log form data (in a real implementation, this would be submitted to Formspree)
            console.log('Form submitted:', formValues);
        });
    }
}

// Initialize Easter Egg
function initEasterEgg() {
    const brandIcon = document.querySelector('.brand-icon');
    let clickCount = 0;
    
    if (brandIcon) {
        brandIcon.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 3) {
                // Show easter egg modal
                const easterEggModal = new bootstrap.Modal(document.getElementById('easterEggModal'));
                easterEggModal.show();
                
                // Reset click count
                clickCount = 0;
            }
        });
    }
}

// Initialize Animations on Scroll
function initAnimationsOnScroll() {
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.skill-item, .portfolio-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Set initial styles and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Case Study Page Functionality
function initCaseStudyPage() {
    // This function is for the case study template page
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (slug && window.campaignsData) {
        const campaign = window.campaignsData.find(c => c.slug === slug);
        
        if (campaign) {
            populateCaseStudyPage(campaign);
        } else {
            console.error('Campaign not found:', slug);
        }
    }
}

// Populate Case Study Page
function populateCaseStudyPage(campaign) {
    // Update page title and meta tags
    document.title = `${campaign.title} - Aditya Pathak`;
    document.getElementById('page-description').setAttribute('content', `Case study: ${campaign.title} by Aditya Pathak`);
    
    // Update Open Graph tags
    document.getElementById('og-title').setAttribute('content', campaign.title);
    document.getElementById('og-description').setAttribute('content', `Case study: ${campaign.title} by Aditya Pathak`);
    document.getElementById('og-url').setAttribute('content', window.location.href);
    document.getElementById('og-image').setAttribute('content', `assets/images/${campaign.images[0]}`);
    
    // Update Twitter tags
    document.getElementById('twitter-title').setAttribute('content', campaign.title);
    document.getElementById('twitter-description').setAttribute('content', `Case study: ${campaign.title} by Aditya Pathak`);
    document.getElementById('twitter-url').setAttribute('content', window.location.href);
    document.getElementById('twitter-image').setAttribute('content', `assets/images/${campaign.images[0]}`);
    
    // Update page content
    document.getElementById('case-study-category').textContent = campaign.category;
    document.getElementById('case-study-title').textContent = campaign.title;
    document.getElementById('case-study-client').textContent = campaign.client;
    document.getElementById('case-study-year').textContent = campaign.year;
    
    // Update hero carousel
    const carouselInner = document.querySelector('#case-study-hero-carousel .carousel-inner');
    const carouselIndicators = document.querySelector('#case-study-hero-carousel .carousel-indicators');
    
    // Clear existing content
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    // Create carousel items and indicators
    campaign.images.forEach((image, index) => {
        // Create carousel item
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        
        const img = document.createElement('img');
        img.src = `assets/images/${image}`;
        img.className = 'd-block w-100';
        img.alt = `${campaign.title} - Image ${index + 1}`;
        img.loading = index === 0 ? 'eager' : 'lazy';
        
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
        
        // Create indicator
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#case-study-hero-carousel');
        indicator.setAttribute('data-bs-slide-to', index);
        if (index === 0) {
            indicator.classList.add('active');
            indicator.setAttribute('aria-current', 'true');
        }
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        
        carouselIndicators.appendChild(indicator);
    });
    
    // Update case study sections
    document.getElementById('case-study-problem').innerHTML = `<p>${campaign.problem}</p>`;
    document.getElementById('case-study-objective').innerHTML = `<p>To address the challenges outlined above and create a cohesive, effective campaign that would resonate with the target audience.</p>`;
    document.getElementById('case-study-strategy').innerHTML = `<p>${campaign.strategy}</p>`;
    document.getElementById('case-study-execution').innerHTML = `<p>${campaign.execution}</p>`;
    
    // Update results section
    let resultsHTML = '';
    if (campaign.results.engagement_increase_percent) {
        resultsHTML += `<p>Engagement increased by ${campaign.results.engagement_increase_percent}%.</p>`;
    }
    if (campaign.results.ctr_increase_percent) {
        resultsHTML += `<p>Click-through rate improved by ${campaign.results.ctr_increase_percent}%.</p>`;
    }
    if (campaign.results.meeting_success_rate_percent) {
        resultsHTML += `<p>Meeting success rate reached ${campaign.results.meeting_success_rate_percent}%.</p>`;
    }
    resultsHTML += `<p>${campaign.results.notes}</p>`;
    
    document.getElementById('case-study-results').innerHTML = resultsHTML;
    
    // Update takeaways section
    document.getElementById('case-study-takeaways').innerHTML = `
        <p>This project demonstrated the importance of a unified creative strategy across all channels. By focusing on clear messaging and consistent visual identity, we were able to significantly improve engagement and achieve the client's objectives.</p>
        <p>Key takeaways include the value of thorough research, the power of simplicity in design, and the importance of aligning creative execution with business goals.</p>
    `;
    
    // Update JSON-LD structured data
    const jsonLdScript = document.getElementById('case-study-json-ld');
    const jsonLdData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": campaign.title,
        "description": `Case study: ${campaign.title} by Aditya Pathak`,
        "datePublished": `${campaign.year}-01-01`,
        "author": {
            "@type": "Person",
            "name": "Aditya Pathak"
        },
        "provider": {
            "@type": "Organization",
            "name": "Aditya Pathak Creative"
        },
        "genre": "Case Study"
    };
    
    jsonLdScript.textContent = JSON.stringify(jsonLdData);
}

// Check if we're on a case study page
if (window.location.pathname.includes('/case-studies/')) {
    // Load campaigns data and initialize case study page
    fetch('../assets/data/campaigns.json')
        .then(response => response.json())
        .then(campaigns => {
            window.campaignsData = campaigns;
            initCaseStudyPage();
        })
        .catch(error => {
            console.error('Error loading campaigns data:', error);
        });
}