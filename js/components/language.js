class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('site_lang') || 'en';
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.setLanguage(this.currentLang);
            this.setupToggle();
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('site_lang', lang);
        
        if (!translations[lang]) return;

        const texts = translations[lang];

        // Update standard text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (texts[key]) {
                el.innerHTML = texts[key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (texts[key]) {
                el.placeholder = texts[key];
            }
        });

        // Update data attributes for team cards
        document.querySelectorAll('.team-card').forEach(card => {
            const name = card.getAttribute('data-name');
            if (name) {
                const lowerName = name.toLowerCase();
                const roleKey = `role_${lowerName}`;
                const bioKey = `bio_${lowerName}`;
                
                if (texts[roleKey]) card.setAttribute('data-role', texts[roleKey]);
                if (texts[bioKey]) card.setAttribute('data-bio', texts[bioKey]);
            }
        });

        // Update the active state of language buttons if they exist
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update document lang attribute
        document.documentElement.lang = lang;
    }

    setupToggle() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }
}

// Initialize
const languageManager = new LanguageManager();
