// Campaigns Data
const campaignsData = [
    {
        id: "campaign-chess-360-1",
        slug: "play-to-win-360",
        title: "Play to Win — 360° Product Campaign",
        client: "Brand Co.",
        year: 2024,
        category: "360 Campaign",
        images: ["https://via.placeholder.com/800x600/0B0B0C/FFFFFF?text=Campaign+1", "https://via.placeholder.com/800x600/0B0B0C/FFFFFF?text=Campaign+1b"],
        problem: "Low engagement & no unified creative direction across channels.",
        strategy: "Introduce a motion-led hero film + simplified brand kit for scalable social cutdowns.",
        execution: "Led creative direction; produced hero film; created templated social edits. Tools: After Effects, Figma, Premiere, Midjourney.",
        results: {
            engagement_increase_percent: 42,
            ctr_increase_percent: 37,
            notes: "Campaign increased month-over-month engagement by 42% and reduced CPA by 18%."
        },
        cta_text: "View full case study"
    },
    {
        id: "campaign-print-1",
        slug: "paper-strategy",
        title: "Paper Strategy — Print & Environmental Brochure",
        client: "Local Studio",
        year: 2023,
        category: "Print",
        images: ["https://via.placeholder.com/800x600/0B0B0C/FFFFFF?text=Print+Campaign"],
        problem: "Client needed premium brand collateral for investor meetings.",
        strategy: "Minimal layout, tactile paper choices, bold typography.",
        execution: "Designed prints, organized printing specs, supervised proofing.",
        results: {
            meeting_success_rate_percent: 90,
            notes: "Helped secure two new partnerships."
        },
        cta_text: "Download print spec PDF"
    },
    {
        id: "campaign-logo-1",
        slug: "regal-identity",
        title: "Regal Identity — Logo & Brand System",
        client: "Tech Startup",
        year: 2023,
        category: "Logos & Brand Identity",
        images: ["https://via.placeholder.com/800x600/0B0B0C/FFFFFF?text=Logo+Design"],
        problem: "Startup needed a distinctive brand identity to stand out in a crowded market.",
        strategy: "Create a modern, versatile logo system that communicates innovation and trust.",
        execution: "Developed multiple logo concepts, refined based on client feedback, created comprehensive brand guidelines.",
        results: {
            brand_recognition_percent: 65,
            notes: "Brand recognition increased by 65% within the first quarter of launch."
        },
        cta_text: "View brand guidelines"
    },
    {
        id: "campaign-social-1",
        slug: "social-checkmate",
        title: "Social Checkmate — Social Media Campaign",
        client: "E-commerce Brand",
        year: 2024,
        category: "Social Media Designs",
        images: ["https://via.placeholder.com/800x600/0B0B0C/FFFFFF?text=Social+Media"],
        problem: "Low engagement on social media platforms and inconsistent brand presence.",
        strategy: "Develop a chess-themed campaign with interactive content to boost engagement.",
        execution: "Created a series of chess-themed posts, stories, and interactive content for Instagram, Facebook, and Twitter.",
        results: {
            engagement_increase_percent: 78,
            follower_growth_percent: 45,
            notes: "Achieved 78% increase in engagement and 45% growth in followers over three months."
        },
        cta_text: "View campaign report"
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Show loading animation
    showLoadingAnimation();
    
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
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Hide loading animation after a short delay
    setTimeout(() => {
        hideLoadingAnimation();
    }, 1000);
});

// Loading Animation
function showLoadingAnimation() {
    // Check if loading overlay already exists
    if (!document.querySelector('.loading-overlay')) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="chess-loader">
                <div class="chess-piece">♜</div>
                <div class="chess-piece">♞</div>
                <div class="chess-piece">♝</div>
                <div class="chess-piece">♛</div>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }
}

function hideLoadingAnimation() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }
}

// Load Campaigns Data
function loadCampaigns() {
    // Populate hero carousel
    populateHeroCarousel(campaignsData);
    
    // Populate portfolio grid
    populatePortfolioGrid(campaignsData);
    
    // Add staggered animation to portfolio cards
    setTimeout(() => {
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach((card, index) => {
            card.style.animationDelay = `${0.6 + (index * 0.1)}s`;
        });
    }, 100);
    
    // Ensure loading animation is hidden after campaigns load
    setTimeout(() => {
        hideLoadingAnimation();
    }, 500);
}

// Loading Animation
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="chess-loader">
            <div class="chess-piece">♜</div>
            <div class="chess-piece">♞</div>
            <div class="chess-piece">♝</div>
            <div class="chess-piece">♛</div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
}

function hideLoadingAnimation() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }
}

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
        
        // Add a small animation effect
        themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
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
        
        // Add active class when hovering over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .filter-btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('active');
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('active');
            });
        });
        
        // Add pulse effect
        setInterval(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 200);
        }, 2000);
        
        // Add color shift effect
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            cursor.style.backgroundColor = `hsl(${hue}, 80%, 60%)`;
        }, 100);
    }
}

// Load Campaigns Data
function loadCampaigns() {
    // Populate hero carousel
    populateHeroCarousel(campaignsData);
    
    // Populate portfolio grid
    populatePortfolioGrid(campaignsData);
    
    // Add staggered animation to portfolio cards
    setTimeout(() => {
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach((card, index) => {
            card.style.animationDelay = `${0.6 + (index * 0.1)}s`;
        });
    }, 100);
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
        img.src = campaign.images[0];
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
        
        // Add animation to the new content
        const contentContainer = document.getElementById('campaign-content');
        contentContainer.style.animation = 'none';
        setTimeout(() => {
            contentContainer.style.animation = 'fadeInUp 0.8s ease forwards';
        }, 10);
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
        
        <a href="#" class="btn btn-primary" data-slug="${campaign.slug}">${campaign.cta_text}</a>
    `;
    
    contentContainer.innerHTML = contentHTML;
    
    // Animate counters
    setTimeout(() => {
        animateCounters();
    }, 300);
    
    // Add click event to CTA button
    const ctaButton = contentContainer.querySelector('.btn-primary');
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        openCaseStudyModal(campaign.slug);
    });
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
                
                // Add a small pulse animation when counter completes
                counter.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    counter.style.animation = '';
                }, 500);
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
    campaigns.forEach((campaign, index) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.dataset.category = campaign.category;
        card.style.animationDelay = `${0.6 + (index * 0.1)}s`;
        
        const categoryIcon = getCategoryIcon(campaign.category);
        
        card.innerHTML = `
            <img src="${campaign.images[0]}" alt="${campaign.title}" class="portfolio-card-image" loading="lazy">
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
        
        // Add 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            if (!('ontouchstart' in window)) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
        
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
            
            portfolioCards.forEach((card, index) => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    // Add staggered animation
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, index * 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Open Case Study Modal
function openCaseStudyModal(slug) {
    const campaign = campaignsData.find(c => c.slug === slug);
    
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
                <4>Results</h4>
                <p>${campaign.results.notes}</p>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    modalLink.href = '#';
    
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
    
    // Add pulse animation to WhatsApp button
    setInterval(() => {
        whatsappToggle.style.animation = 'pulse 2s infinite';
    }, 5000);
    
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
            
            // Update chat response with animation
            chatResponse.innerHTML = responseHTML;
            const botMessage = chatResponse.querySelector('.bot-message');
            botMessage.style.animation = 'messageIn 0.5s ease forwards';
            
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
            successMessage.style.animation = 'fadeInUp 0.5s ease forwards';
            
            // Replace form with success message
            contactForm.parentNode.replaceChild(successMessage, contactForm);
            
            // Log form data (in a real implementation, this would be submitted to Formspree)
            console.log('Form submitted:', formValues);
        });
        
        // Add input focus effects
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
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
            
            // Add a small animation on each click
            brandIcon.style.transform = `rotate(${clickCount * 45}deg) scale(1.2)`;
            setTimeout(() => {
                brandIcon.style.transform = '';
            }, 300);
            
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

// Initialize Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        // Add shadow to header when scrolled
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Add pulse animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);