class PortfolioManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.pages = document.querySelectorAll('.page-content');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navbar = document.querySelector('.navbar');
        
        this.init();
    }
    
    init() {
        this.handleNavigation();
        this.handleMobileMenu();
        this.handleScroll();
        this.initFormSubmission();
        this.initScrollAnimations();
        this.initInteractiveElements();
        this.initEasterEggs();
    }
    
    handleNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const targetPage = link.getAttribute('data-page');
                
                if (targetPage) {
                    this.showPage(targetPage);
                    this.updateActiveNav(link);
                    this.updateURL(targetPage);
                    this.closeMobileMenu();
                }
            });
        });

        const ctaButtons = document.querySelectorAll('[data-page]');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetPage = button.getAttribute('data-page');
                if (targetPage) {
                    e.preventDefault();
                    this.showPage(targetPage);
                    this.updateActiveNavByPage(targetPage);
                    this.updateURL(targetPage);
                }
            });
        });

        const footerLinks = document.querySelectorAll('a[data-page]');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                if (targetPage) {
                    this.showPage(targetPage);
                    this.updateActiveNavByPage(targetPage);
                    this.updateURL(targetPage);
                }
            });
        });
        
        this.showPage('home');
        const homeLink = document.querySelector('[data-page="home"]');
        if (homeLink) this.updateActiveNav(homeLink);
    }
    
    showPage(targetPage) {
        this.pages.forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });
        
        const targetElement = document.getElementById(targetPage);
        
        if (targetElement) {
            targetElement.style.display = 'block';
            setTimeout(() => {
                targetElement.classList.add('active');
            }, 50);
        }
        
        window.scrollTo(0, 0);
    }
    
    updateActiveNav(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateActiveNavByPage(pageName) {
        const navLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
        if (navLink) {
            this.updateActiveNav(navLink);
        }
    }
    
    updateURL(page) {
        window.history.pushState({}, '', `#${page}`);
    }

    closeMobileMenu() {
        if (this.navMenu && this.hamburger) {
            this.navMenu.classList.remove('active');
            this.hamburger.classList.remove('active');
        }
    }
    
    handleMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.hamburger.classList.toggle('active');
            });
            
            document.addEventListener('click', (e) => {
                if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }
    
    handleScroll() {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                this.navbar.style.boxShadow = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    initFormSubmission() {
        const form = document.querySelector('.form');
        if (form) {
            form.addEventListener('submit', (e) => {
                
                const formBtn = form.querySelector('.form-btn');
                if (formBtn) {
                    const originalText = formBtn.querySelector('.btn-text').textContent;
                    
                    formBtn.querySelector('.btn-text').textContent = 'Sending...';
                    const icon = formBtn.querySelector('.btn-icon');
                    if (icon) icon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    formBtn.style.pointerEvents = 'none';
                    formBtn.style.opacity = '0.7';
                    
                }
            });
        }
    }
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        const animateElements = document.querySelectorAll(
            '.work-item, .video-item, .contact-item, .about-item, .page-header'
        );
        
        animateElements.forEach(el => {
            if (!el.closest('.hero')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            }
        });
    }

    initInteractiveElements() {
        const workItems = document.querySelectorAll('.work-item');
        workItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const overlay = item.querySelector('.work-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const overlay = item.querySelector('.work-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                }
            });
        });
        
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const icon = btn.querySelector('.btn-icon');
                if (icon) {
                    icon.style.transform = 'translateX(4px)';
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                const icon = btn.querySelector('.btn-icon');
                if (icon) {
                    icon.style.transform = 'translateX(0)';
                }
            });
        });
    }

    initEasterEggs() {
        let metsSequence = '';
        const metsCode = 'mets';
        
        document.addEventListener('keydown', (e) => {
            metsSequence += e.key.toLowerCase();
            if (metsSequence.length > metsCode.length) {
                metsSequence = metsSequence.slice(-metsCode.length);
            }
            
            if (metsSequence === metsCode) {
                const metsEmoji = document.createElement('div');
                metsEmoji.textContent = '⚾ LGM! ⚾';
                metsEmoji.style.position = 'fixed';
                metsEmoji.style.top = '50%';
                metsEmoji.style.left = '50%';
                metsEmoji.style.transform = 'translate(-50%, -50%)';
                metsEmoji.style.fontSize = '3rem';
                metsEmoji.style.zIndex = '10000';
                metsEmoji.style.color = '#ff6600';
                metsEmoji.style.fontWeight = 'bold';
                metsEmoji.style.textShadow = '2px 2px 0px #1e293b';
                metsEmoji.style.animation = 'bounce 1s ease-in-out 3 alternate';
                
                document.body.appendChild(metsEmoji);
                
                setTimeout(() => {
                    metsEmoji.remove();
                }, 3000);
                
                metsSequence = '';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new PortfolioManager();
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
});

window.PortfolioManager = PortfolioManager;
