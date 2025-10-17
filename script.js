class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('i');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
        this.currentTheme = theme;
    }
    
    updateThemeIcon(theme) {
        this.themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

class SmoothScrolling {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth scrolling to anchor links
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
}

class AnimationObserver {
    constructor() {
        this.init();
    }
    
    init() {
        // Create intersection observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all content cards
        document.querySelectorAll('.content-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new SmoothScrolling();
    new AnimationObserver();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Handle GitHub iframe loading
window.addEventListener('load', () => {
    const iframe = document.querySelector('.github-contributions iframe');
    if (iframe) {
        iframe.addEventListener('load', () => {
            console.log('GitHub profile loaded');
        });
        
        iframe.addEventListener('error', () => {
            // Fallback if iframe fails to load
            const container = iframe.parentElement;
            container.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
                    <p><a href="https://github.com/ashleywang1" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: none;">
                        <i class="fab fa-github" style="margin-right: 0.5rem;"></i>
                        View GitHub Profile
                    </a></p>
                </div>
            `;
        });
    }
});

// Add CSS for animations
const animationStyles = `
    .content-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .content-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    body.loaded .hero-title {
        animation: slideInUp 0.8s ease-out;
    }
    
    body.loaded .hero-subtitle {
        animation: slideInUp 0.8s ease-out 0.2s both;
    }
    
    body.loaded .contact-info {
        animation: slideInUp 0.8s ease-out 0.4s both;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);