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
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 60) {
                this.navbar.style.background = 'rgba(13, 14, 17, 0.95)';
            } else {
                this.navbar.style.background = 'rgba(13, 14, 17, 0.82)';
            }
        });
    }
    
    initFormSubmission() {
        const form = document.querySelector('.form');
        if (form) {
            form.addEventListener('submit', (e) => {
                
                const formBtn = form.querySelector('.form-btn');
                if (formBtn) {
                    const textEl = formBtn.querySelector('.btn-text');
                    if (textEl) textEl.textContent = 'Sending...';
                    formBtn.style.pointerEvents = 'none';
                    formBtn.style.opacity = '0.7';
                }
            });
        }
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
                metsEmoji.textContent = 'LGM';
                metsEmoji.style.position = 'fixed';
                metsEmoji.style.top = '50%';
                metsEmoji.style.left = '50%';
                metsEmoji.style.transform = 'translate(-50%, -50%)';
                metsEmoji.style.fontFamily = "'Fraunces', serif";
                metsEmoji.style.fontStyle = 'italic';
                metsEmoji.style.fontSize = '3rem';
                metsEmoji.style.zIndex = '10000';
                metsEmoji.style.color = '#5b8def';
                metsEmoji.style.letterSpacing = '0.05em';
                
                document.body.appendChild(metsEmoji);
                
                setTimeout(() => {
                    metsEmoji.remove();
                }, 2000);
                
                metsSequence = '';
            }
        });
    }
}
 
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new PortfolioManager();
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 80);
});
 
window.PortfolioManager = PortfolioManager;
