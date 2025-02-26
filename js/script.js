/**
 * UNIT3 Interactive Website
 * Enhanced User Experience with Content Relationships
 */

// State Management
const state = {
    activeSections: [],
    sectionContent: {},
    theme: localStorage.getItem('theme') || 'light',
    themeColor: localStorage.getItem('themeColor') || '#ffd62e',
    layoutMode: localStorage.getItem('layoutMode') || 'grid',
    sidebarVisible: localStorage.getItem('sidebarVisible') !== 'false',
    spatialMapVisible: false,
    relatedContent: {
        'cafe': ['events', 'menu'],
        'workshops': ['skillshare', 'workroom', 'events'],
        'fungi': ['climate', 'events', 'workshops'],
        'events': ['exhibitions', 'night', 'community'],
        'marketplace': ['directory', 'workshops'],
        'climate': ['fungi', 'directory', 'events'],
        'zine': ['directory', 'opportunities', 'events'],
        'exhibitions': ['events', 'curates']
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing UNIT3 application...');
    initTheme();
    initDropdowns();
    initSectionButtons();
    initWorkspaceControls();
    initSpatialMap();
    initLogoAnimation();
    
    // Open default section
    openSection('map');
});

// Logo Animation
function initLogoAnimation() {
    const logoNumber = document.querySelector('.logo-number');
    let isUnit3 = true;

    logoNumber.addEventListener('click', () => {
        logoNumber.classList.add('rotating');
        
        setTimeout(() => {
            if (isUnit3) {
                logoNumber.textContent = 'E';
                isUnit3 = false;
            } else {
                logoNumber.textContent = '3';
                isUnit3 = true;
            }
        }, 300);

        setTimeout(() => {
            logoNumber.classList.remove('rotating');
        }, 600);
    });
}

// Theme Management
function initTheme() {
    console.log('Initializing theme system...');
    
    // Apply saved theme
    document.body.classList.toggle('dark-mode', state.theme === 'dark');
    
    // Apply saved color
    document.documentElement.style.setProperty('--theme-color', state.themeColor);
    document.getElementById('themeColor').value = state.themeColor;
    
    // Theme color picker
    document.getElementById('themeColor').addEventListener('change', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--theme-color', color);
        state.themeColor = color;
        localStorage.setItem('themeColor', color);
        console.log('Theme color updated:', color);
    });
    
    // Dark/light mode toggle
    document.querySelector('.view-mode-toggle').addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.body.classList.toggle('dark-mode', state.theme === 'dark');
        localStorage.setItem('theme', state.theme);
        console.log('Theme toggled to:', state.theme);
    });
    
    // Layout toggle
    document.querySelector('.layout-toggle').addEventListener('click', () => {
        state.layoutMode = state.layoutMode === 'grid' ? 'list' : 'grid';
        document.querySelector('.content-area').classList.toggle('fullwidth', state.layoutMode === 'list');
        localStorage.setItem('layoutMode', state.layoutMode);
        console.log('Layout mode changed to:', state.layoutMode);
    });
}

// Dropdown Management
function initDropdowns() {
    console.log('Initializing dropdown menus...');
    
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = e.target.closest('.dropdown');
            
            console.log('Dropdown clicked:', dropdown);
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown.open').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('open');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('open');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.open').forEach(d => {
                d.classList.remove('open');
            });
        }
    });
}

// Section Management
function initSectionButtons() {
    console.log('Initializing section buttons...');
    const buttons = document.querySelectorAll('.section-button');
    console.log(`Found ${buttons.length} section buttons`);
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = button.getAttribute('data-section');
            console.log(`Section button clicked: ${sectionId}`);
            
            openSection(sectionId);
            
            // Close dropdown if opened from dropdown
            const dropdown = button.closest('.dropdown');
            if (dropdown) dropdown.classList.remove('open');
        });
    });
}