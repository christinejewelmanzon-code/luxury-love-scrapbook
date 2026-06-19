// =============== PAGE NAVIGATION ===============
let currentPage = 1;
const totalPages = 7;

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const currentPageSpan = document.getElementById('currentPage');
const pageIndicator = document.querySelector('.page-indicator');

nextBtn.addEventListener('click', goToNextPage);
prevBtn.addEventListener('click', goToPreviousPage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToNextPage();
    if (e.key === 'ArrowLeft') goToPreviousPage();
});

function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

function showPage(pageNum) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    // Show current page
    const currentPageEl = document.getElementById(`page${pageNum}`);
    currentPageEl.style.display = 'flex';
    setTimeout(() => {
        currentPageEl.classList.add('active');
    }, 10);

    // Update page indicator
    currentPageSpan.textContent = pageNum;
    updateDots(pageNum);
    updateNavButtons();

    // Trigger scroll animations for timeline and memories
    if (pageNum === 3 || pageNum === 4) {
        animatePageContent();
    }

    // Trigger letter animation
    if (pageNum === 5) {
        animateTypewriter();
    }

    // Window scroll to top
    window.scrollTo(0, 0);
}

function updateDots(pageNum) {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index + 1 === pageNum) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateNavButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    if (currentPage === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    if (currentPage === totalPages) {
        nextBtn.textContent = 'The End ❤️';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

// Dot navigation
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
        currentPage = parseInt(dot.dataset.page);
        showPage(currentPage);
    });
});

// =============== PAGE 1: ENVELOPE ANIMATION ===============
const envelope = document.getElementById('envelope');
const openEnvelopeBtn = document.getElementById('openEnvelope');
const ambientMusic = document.getElementById('ambientMusic');
const musicToggle = document.getElementById('musicToggle');

openEnvelopeBtn.addEventListener('click', () => {
    envelope.classList.add('opened');
    
    // Create floating hearts
    createFloatingHearts();
    
    // Show next button and auto-play music
    setTimeout(() => {
        openEnvelopeBtn.style.display = 'none';
        if (ambientMusic.paused) {
            ambientMusic.play();
            musicToggle.classList.add('playing');
        }
    }, 800);
});

function createFloatingHearts() {
    const container = document.getElementById('page1');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-20px';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.opacity = '0.7';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatUp ${Math.random() * 2 + 2}s ease-in forwards`;
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(heart);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotateZ(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotateZ(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Music toggle
musicToggle.addEventListener('click', () => {
    if (ambientMusic.paused) {
        ambientMusic.play();
        musicToggle.classList.add('playing');
    } else {
        ambientMusic.pause();
        musicToggle.classList.remove('playing');
    }
});

// =============== PAGE 2: PARALLAX EFFECT ===============
const parallaxImage = document.getElementById('storyImage');

document.addEventListener('scroll', () => {
    if (currentPage === 2 && parallaxImage) {
        const scrolled = window.pageYOffset;
        parallaxImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Trigger parallax animation when page appears
function animateParallax() {
    if (parallaxImage) {
        parallaxImage.classList.add('active');
    }
}

// =============== PAGE 3 & 4: CONTENT ANIMATIONS ===============
function animatePageContent() {
    // This triggers the CSS animations defined in styles.css
    // The animations are set to activate when the page is displayed
}

// =============== PAGE 5: TYPEWRITER EFFECT ===============
function animateTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.animation = 'none';

    let index = 0;
    const speed = 50; // milliseconds per character

    function type() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    setTimeout(type, 300);
}

// =============== PAGE 6: REASON CARDS INTERACTION ===============
const reasonCards = document.querySelectorAll('.reason-card');

reasonCards.forEach(card => {
    card.addEventListener('click', () => {
        // Create heart burst animation
        createHeartBurst(card);
    });

    card.addEventListener('mouseenter', () => {
        // Optional: add any additional hover effects
    });
});

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const container = element.parentElement;

    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + 'px';
        heart.style.fontSize = '1.5em';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';

        const angle = (i / 6) * Math.PI * 2;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        document.body.appendChild(heart);

        let x = rect.left + rect.width / 2;
        let y = rect.top;
        let velocityY = vy;

        const animate = () => {
            x += vx * 0.02;
            y += velocityY * 0.02;
            velocityY += 1; // gravity

            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.opacity = '1';

            if (y < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };

        animate();

        // Fade out
        setTimeout(() => {
            heart.style.transition = 'opacity 0.5s ease';
            heart.style.opacity = '0';
            setTimeout(() => heart.remove(), 500);
        }, 1000);
    }
}

// =============== SCROLL-TRIGGERED ANIMATIONS ===============
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// =============== INITIALIZE ===============
showPage(1);

// Add parallax movement on scroll
window.addEventListener('scroll', () => {
    if (currentPage === 2) {
        animateParallax();
    }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left - go to next
        goToNextPage();
    }
    if (touchEndX > touchStartX + 50) {
        // Swiped right - go to previous
        goToPreviousPage();
    }
}

// =============== DYNAMIC BACKGROUND COLORS PER PAGE ===============
function updatePageBackground() {
    const colors = {
        1: 'linear-gradient(180deg, #faf6f1 0%, #f5f0eb 100%)',
        2: 'linear-gradient(180deg, #000 0%, #1a1a1a 100%)',
        3: 'linear-gradient(135deg, #faf6f1 0%, #f5f0eb 100%)',
        4: 'linear-gradient(135deg, #faf6f1 0%, #f5f0eb 100%)',
        5: 'radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.2), rgba(0, 0, 0, 0.5))',
        6: 'linear-gradient(135deg, #faf6f1 0%, #f5f0eb 100%)',
        7: 'linear-gradient(180deg, #0a0e27 0%, #1a1a3e 50%, #0a0e27 100%)'
    };

    // Background colors are already set via CSS, but this provides dynamic control if needed
}

// =============== ACCESSIBILITY ===============
// Announce page changes to screen readers
function announcePageChange() {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `Page ${currentPage} of ${totalPages}`;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 1000);
}

// Call announcePageChange whenever page changes
const originalShowPage = showPage;
showPage = function(pageNum) {
    originalShowPage(pageNum);
    announcePageChange();
};

// =============== PAGE-SPECIFIC INTERACTIONS ===============

// Page 3 - Memories: Add tap to enlarge functionality
reasonCards.forEach(card => {
    card.addEventListener('click', function() {
        // Reason cards already have heart burst
    });
});

const polaroids = document.querySelectorAll('.polaroid');
polaroids.forEach(polaroid => {
    polaroid.addEventListener('click', function() {
        // Create heart burst for memories too
        createHeartBurst(this);
    });
});

// Timeline items - add hover glow effect
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 10px rgba(216, 27, 96, 0.5))';
    });

    item.addEventListener('mouseleave', function() {
        this.style.filter = 'drop-shadow(0 0 0px rgba(216, 27, 96, 0))';
    });
});

console.log('Scrapbook loaded! 💕');
