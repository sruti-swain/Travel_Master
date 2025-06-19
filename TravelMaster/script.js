// Global variables
let statisticsAnimated = false;
let testimonialsSwiper = null;

// Travel keywords for floating animation
const KEYWORDS = [
    'Adventure', 'Explore', 'Discover', 'Journey', 'Wanderlust', 'Travel', 'Vacation', 
    'Paradise', 'Destination', 'Experience', 'Culture', 'Nature', 'Mountains', 'Beach',
    'City', 'Safari', 'Temple', 'Ocean', 'Forest', 'Desert', 'Island', 'Heritage',
    'Luxury', 'Budget', 'Family', 'Solo', 'Romance', 'Backpacking', 'Cruise'
];

// Gallery images
const GALLERY_IMAGES = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Northern Lights"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "African Safari"
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Mountain Lake"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Ancient Temple"
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Coral Reef"
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1464822759844-d150baec843a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Snow Mountain"
    }
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Initialize all components
    initFloatingKeywords();
    initNavbar();
    initHeroSection();
    initSearchForm();
    initGallery();
    initLightbox();
    initNewsletterForm();
    initScrollAnimations();
    
    // Load data from API
    loadDestinations();
    loadTestimonials();
    loadStatistics();
});

// Floating Keywords Animation
function initFloatingKeywords() {
    const container = document.getElementById('floating-keywords');
    let mousePosition = { x: 0, y: 0 };

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
        updateKeywordBlur();
    });

    function createKeyword() {
        const keyword = document.createElement('div');
        keyword.className = 'keyword';
        keyword.textContent = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
        
        const x = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 10 + 10;
        
        keyword.style.left = `${x}%`;
        keyword.style.animationDelay = `${delay}s`;
        keyword.style.animationDuration = `${duration}s`;
        
        container.appendChild(keyword);
        
        // Remove keyword after animation
        setTimeout(() => {
            if (keyword.parentNode) {
                keyword.parentNode.removeChild(keyword);
            }
        }, (duration + delay) * 1000);
    }

    function updateKeywordBlur() {
        const keywords = container.querySelectorAll('.keyword');
        keywords.forEach(keyword => {
            const rect = keyword.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mousePosition.x - (rect.left + rect.width / 2), 2) + 
                Math.pow(mousePosition.y - (rect.top + rect.height / 2), 2)
            );
            
            const blur = distance < 150 ? Math.max(0, 150 - distance) / 30 : 0;
            keyword.style.filter = `blur(${blur}px)`;
        });
    }

    // Create keywords periodically
    setInterval(createKeyword, 2000);
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Hero section effects
function initHeroSection() {
    const heroVideo = document.querySelector('.hero-video');
    const exploreBtn = document.getElementById('explore-btn');

    // Parallax effect for video
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const speed = scrolled * 0.5;
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${speed}px)`;
        }
    });

    // Ripple effect for explore button
    exploreBtn.addEventListener('click', function(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Scroll to destinations
        document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    });
}

// Search form handling
function initSearchForm() {
    const searchForm = document.getElementById('search-form');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const destination = document.getElementById('destination-select').value;
        const date = document.getElementById('checkin-date').value;
        const type = document.getElementById('travel-type').value;
        
        if (!destination || !date || !type) {
            showNotification('Please fill in all search fields', 'error');
            return;
        }

        showNotification(`Searching for ${type} packages to ${destination}`, 'success');
        document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    });
}

// Gallery initialization
function initGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    
    GALLERY_IMAGES.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'col-lg-4 col-md-6';
        galleryItem.setAttribute('data-aos', 'fade-up');
        galleryItem.setAttribute('data-aos-delay', 200 + index * 100);
        
        galleryItem.innerHTML = `
            <div class="gallery-item" data-src="${image.src}" data-alt="${image.alt}">
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `;
        
        galleryContainer.appendChild(galleryItem);
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Open lightbox when gallery item is clicked
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const src = galleryItem.getAttribute('data-src');
            const alt = galleryItem.getAttribute('data-alt');
            
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on backdrop click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
}

// Newsletter form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const subscribeText = document.getElementById('subscribe-text');
    const successAlert = document.getElementById('newsletter-success');

    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        subscribeText.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...';
        
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                emailInput.value = '';
                successAlert.style.display = 'block';
                showNotification('Successfully subscribed to newsletter!', 'success');
                
                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 5000);
            } else {
                showNotification(data.message || 'Subscription failed', 'error');
            }
        } catch (error) {
            showNotification('Network error. Please try again.', 'error');
        } finally {
            subscribeText.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Subscribe';
        }
    });
}

// Scroll animations for statistics
function initScrollAnimations() {
    const statsSection = document.getElementById('statistics-section');
    
    window.addEventListener('scroll', () => {
        if (!statisticsAnimated && statsSection) {
            const rect = statsSection.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                statisticsAnimated = true;
                animateStatistics();
            }
        }
    });
}

// Load destinations from API
async function loadDestinations() {
    const container = document.getElementById('destinations-container');
    
    try {
        // Show loading skeleton
        container.innerHTML = Array(6).fill(0).map((_, index) => `
            <div class="col-lg-4 col-md-6">
                <div class="destination-card">
                    <div class="skeleton" style="height: 250px;"></div>
                    <div class="card-body">
                        <div class="skeleton" style="height: 1rem; margin-bottom: 0.5rem;"></div>
                        <div class="skeleton" style="height: 1.5rem; margin-bottom: 0.5rem;"></div>
                        <div class="skeleton" style="height: 1rem; margin-bottom: 0.5rem;"></div>
                        <div class="skeleton" style="height: 1rem;"></div>
                    </div>
                </div>
            </div>
        `).join('');

        const response = await fetch('/api/destinations');
        const destinations = await response.json();
        
        if (response.ok) {
            container.innerHTML = destinations.map((destination, index) => `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${200 + index * 100}">
                    <div class="card destination-card">
                        <img src="${destination.imageUrl}" alt="${destination.name}" class="card-img-top" loading="lazy">
                        <div class="card-body">
                            <div class="destination-rating">
                                ${Array(5).fill(0).map((_, i) => 
                                    `<i class="fas fa-star ${i < Math.floor(parseFloat(destination.rating)) ? '' : 'text-muted'}"></i>`
                                ).join('')}
                                <span class="ms-1">${destination.rating}</span>
                            </div>
                            <h5 class="card-title">${destination.name}</h5>
                            <p class="card-text">${destination.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="destination-price">From $${destination.price}</span>
                                <small class="text-muted">${destination.duration}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Refresh AOS for new elements
            AOS.refresh();
        } else {
            throw new Error('Failed to load destinations');
        }
    } catch (error) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center">
                    <p class="text-danger">Failed to load destinations. Please try again later.</p>
                </div>
            </div>
        `;
    }
}

// Load testimonials and initialize swiper
async function loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    
    try {
        // Show loading skeleton
        container.innerHTML = Array(3).fill(0).map(() => `
            <div class="swiper-slide">
                <div class="testimonial-card">
                    <div class="skeleton testimonial-avatar mx-auto mb-3"></div>
                    <div class="skeleton" style="height: 1rem; margin-bottom: 0.5rem;"></div>
                    <div class="skeleton" style="height: 1rem; margin-bottom: 0.5rem;"></div>
                    <div class="skeleton" style="height: 1rem; margin-bottom: 0.5rem;"></div>
                    <div class="skeleton" style="height: 1rem;"></div>
                </div>
            </div>
        `).join('');

        const response = await fetch('/api/testimonials');
        const testimonials = await response.json();
        
        if (response.ok) {
            container.innerHTML = testimonials.map(testimonial => `
                <div class="swiper-slide">
                    <div class="testimonial-card">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar" loading="lazy">
                        <div class="testimonial-text">"${testimonial.text}"</div>
                        <div class="testimonial-author">${testimonial.name}</div>
                        <div class="testimonial-rating">
                            ${Array(5).fill(0).map((_, i) => 
                                `<i class="fas fa-star ${i < testimonial.rating ? '' : 'text-muted'}"></i>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `).join('');

            // Initialize Swiper
            testimonialsSwiper = new Swiper('.testimonials-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }
            });
        } else {
            throw new Error('Failed to load testimonials');
        }
    } catch (error) {
        container.innerHTML = `
            <div class="swiper-slide">
                <div class="text-center">
                    <p class="text-danger">Failed to load testimonials. Please try again later.</p>
                </div>
            </div>
        `;
    }
}

// Load and animate statistics
async function loadStatistics() {
    const container = document.getElementById('stats-container');
    const chartCanvas = document.getElementById('satisfaction-chart');
    const satisfactionPercentage = document.getElementById('satisfaction-percentage');
    
    try {
        // Show loading skeleton
        container.innerHTML = Array(4).fill(0).map(() => `
            <div class="col-lg-3 col-md-6">
                <div class="stat-card">
                    <div class="skeleton" style="height: 3rem; margin-bottom: 0.5rem; background: rgba(255,255,255,0.2);"></div>
                    <div class="skeleton" style="height: 1.5rem; background: rgba(255,255,255,0.2);"></div>
                </div>
            </div>
        `).join('');

        const response = await fetch('/api/statistics');
        const stats = await response.json();
        
        if (response.ok) {
            container.innerHTML = `
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="stat-card">
                        <span class="stat-number" id="happy-customers">0+</span>
                        <div class="stat-label">Happy Customers</div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="stat-card">
                        <span class="stat-number" id="destinations-count">0+</span>
                        <div class="stat-label">Destinations</div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
                    <div class="stat-card">
                        <span class="stat-number" id="years-experience">0+</span>
                        <div class="stat-label">Years Experience</div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
                    <div class="stat-card">
                        <span class="stat-number" id="awards-count">0+</span>
                        <div class="stat-label">Awards Won</div>
                    </div>
                </div>
            `;

            // Store stats for animation
            window.statsData = stats;
            satisfactionPercentage.textContent = `${stats.customerSatisfaction}%`;
            
            // Create chart
            createSatisfactionChart(stats.customerSatisfaction);
            
            // Refresh AOS
            AOS.refresh();
        } else {
            throw new Error('Failed to load statistics');
        }
    } catch (error) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center">
                    <p class="text-white">Failed to load statistics. Please try again later.</p>
                </div>
            </div>
        `;
    }
}

// Animate statistics numbers
function animateStatistics() {
    if (!window.statsData) return;
    
    const stats = window.statsData;
    const elements = {
        'happy-customers': stats.happyCustomers,
        'destinations-count': stats.destinations,
        'years-experience': stats.yearsExperience,
        'awards-count': stats.awards
    };
    
    Object.entries(elements).forEach(([id, target]) => {
        const element = document.getElementById(id);
        if (!element) return;
        
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }, 30);
    });
}

// Create satisfaction chart
function createSatisfactionChart(satisfaction) {
    const ctx = document.getElementById('satisfaction-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Customer Satisfaction', 'Remaining'],
            datasets: [{
                data: [satisfaction, 100 - satisfaction],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(255, 255, 255, 0.2)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: '70%'
        }
    });
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} me-2"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);