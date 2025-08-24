document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    let cursorColorIndex = 0;
    const cursorColors = ['#4169E1', '#FFFFFF', '#000000'];
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Change cursor color periodically
    setInterval(() => {
        cursorColorIndex = (cursorColorIndex + 1) % cursorColors.length;
        cursor.style.borderColor = cursorColors[cursorColorIndex];
        cursor.querySelector('::before') && (cursor.style.setProperty('--cursor-color', cursorColors[cursorColorIndex]));
    }, 2000);
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .skill-item, .chess-square');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href').slice(1) === current) {
                li.classList.add('active');
            }
        });
    });
    
    // Work Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter work items
            const filter = btn.getAttribute('data-filter');
            
            workItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Case Study Toggle
    const caseStudyToggles = document.querySelectorAll('.case-study-toggle button');
    
    caseStudyToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const caseStudyContent = toggle.closest('.work-item').querySelector('.case-study-content');
            caseStudyContent.classList.toggle('active');
            
            if (caseStudyContent.classList.contains('active')) {
                toggle.textContent = 'Hide Case Study';
            } else {
                toggle.textContent = 'View Case Study';
            }
        });
    });
    
    // Video Controls
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Autoplay muted videos
        video.muted = true;
        video.play();
        
        // Pause on hover
        video.addEventListener('mouseenter', () => {
            video.pause();
        });
        
        video.addEventListener('mouseleave', () => {
            video.play();
        });
        
        // Custom play/pause button
        const playPauseBtn = video.parentElement.querySelector('.play-pause');
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playPauseBtn.innerHTML = `
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="12" y="10" width="5" height="20" fill="#FFFFFF"/>
                            <rect x="23" y="10" width="5" height="20" fill="#FFFFFF"/>
                        </svg>
                    `;
                } else {
                    video.pause();
                    playPauseBtn.innerHTML = `
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 10L15 30L30 20Z" fill="#FFFFFF"/>
                        </svg>
                    `;
                }
            });
        }
    });
    
    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-level');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sectionsToAnimate = document.querySelectorAll('section');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const projectType = formData.get('project-type');
            const budget = formData.get('budget');
            const message = formData.get('message');
            
            // Here you would normally send the data to a server
            // For this example, we'll just log it and show a success message
            console.log({ name, email, projectType, budget, message });
            
            // Show success message
            const formSubmit = contactForm.querySelector('.form-submit');
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.color = 'var(--royal-blue)';
            successMessage.style.marginTop = '1rem';
            successMessage.style.fontWeight = '500';
            
            formSubmit.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Mini Chessboard Easter Egg
    const chessToggle = document.getElementById('chessToggle');
    const miniChessboard = document.getElementById('miniChessboard');
    
    if (chessToggle && miniChessboard) {
        // Create chessboard
        const chessPieces = {
            'black-rook': '♜',
            'black-knight': '♞',
            'black-bishop': '♝',
            'black-queen': '♛',
            'black-king': '♚',
            'black-pawn': '♟',
            'white-rook': '♖',
            'white-knight': '♘',
            'white-bishop': '♗',
            'white-queen': '♕',
            'white-king': '♔',
            'white-pawn': '♙'
        };
        
        // Initial board setup
        const initialBoard = [
            ['black-rook', 'black-knight', 'black-bishop', 'black-queen', 'black-king', 'black-bishop', 'black-knight', 'black-rook'],
            ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn'],
            ['white-rook', 'white-knight', 'white-bishop', 'white-queen', 'white-king', 'white-bishop', 'white-knight', 'white-rook']
        ];
        
        // Create chessboard squares
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = 'chess-square';
                square.dataset.row = row;
                square.dataset.col = col;
                
                // Set square color
                if ((row + col) % 2 === 0) {
                    square.style.backgroundColor = 'var(--white)';
                } else {
                    square.style.backgroundColor = 'var(--medium-gray)';
                }
                
                // Add piece if exists
                const piece = initialBoard[row][col];
                if (piece) {
                    square.textContent = chessPieces[piece];
                    square.dataset.piece = piece;
                }
                
                // Add click event
                square.addEventListener('click', () => {
                    // Simple random move for demonstration
                    if (square.dataset.piece) {
                        // Find a random empty square
                        const emptySquares = Array.from(miniChessboard.querySelectorAll('.chess-square')).filter(sq => !sq.dataset.piece);
                        if (emptySquares.length > 0) {
                            const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
                            randomSquare.textContent = square.textContent;
                            randomSquare.dataset.piece = square.dataset.piece;
                            square.textContent = '';
                            delete square.dataset.piece;
                        }
                    }
                });
                
                miniChessboard.appendChild(square);
            }
        }
        
        // Toggle chessboard visibility
        chessToggle.addEventListener('click', () => {
            if (miniChessboard.style.display === 'none') {
                miniChessboard.style.display = 'grid';
                chessToggle.textContent = 'Hide Chessboard';
            } else {
                miniChessboard.style.display = 'none';
                chessToggle.textContent = 'Mini Chessboard';
            }
        });
    }
    
    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0,
            rootMargin: '0px 0px 300px 0px'
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imgObserver.unobserve(img);
                }
            });
        }, imgOptions);
        
        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
});