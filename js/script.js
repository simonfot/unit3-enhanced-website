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

// Content Templates and Mock Data
const mockData = {
    'map': {
        activeSpaces: [
            { name: 'Café', status: 'open', activity: 'Coffee and light bites' },
            { name: 'Exhibition Space', status: 'open', activity: 'Digital Arts Showcase' },
            { name: 'Workshop Room', status: 'busy', activity: 'Woodworking Workshop' },
            { name: 'Fungi Room', status: 'quiet', activity: 'Open for viewing' }
        ]
    },
    'events': {
        title: 'Digital Arts Showcase',
        date: 'Mar 5, 2025',
        location: 'Exhibition Space',
        description: 'Explore digital artworks created by local artists using innovative techniques and technologies. Interactive installations and discussions with the creators.',
        tags: ['digital', 'art', 'interactive', 'exhibition'],
        host: {
            name: 'Emma Chen',
            role: 'Digital Artist, Curator'
        }
    },
    'workshops': {
        icon: '🔨',
        title: 'Introduction to Woodworking',
        duration: '3 hours',
        difficulty: 'Beginner',
        participants: 8,
        description: 'Learn the basics of woodworking in this hands-on workshop. You\'ll create a simple wooden object to take home while learning essential techniques and safety practices.',
        spots: 3,
        price: '£45',
        rating: '4.8/5',
        tags: ['woodworking', 'craft', 'beginner', 'hands-on']
    },
    'fungi': {
        fungi: [
            { name: 'Lion\'s Mane', type: 'Medicinal' },
            { name: 'Pink Oyster', type: 'Culinary' },
            { name: 'Reishi', type: 'Medicinal' },
            { name: 'King Oyster', type: 'Culinary' }
        ],
        tags: ['fungi', 'growing', 'sustainable', 'food']
    },
    'menu': {
        date: 'Wednesday, February 26, 2025',
        categories: {
            'Coffee': [
                { name: 'Espresso', price: '£2.50' },
                { name: 'Flat White', price: '£3.20' },
                { name: 'V60 Pour Over', price: '£4.00' },
                { name: 'Cold Brew', price: '£3.50' }
            ],
            'Food': [
                { name: 'Avocado Toast', price: '£6.50' },
                { name: 'Mushroom Focaccia', price: '£7.00' },
                { name: 'Seasonal Salad', price: '£5.50' },
                { name: 'House Granola', price: '£4.50' }
            ]
        }
    },
    'day': {
        hours: '9am - 5pm, Monday to Friday',
        features: [
            { title: 'Workspace', description: 'Free WiFi, plenty of power outlets, and natural light make this an ideal place to work remotely.' },
            { title: 'Coffee & Food', description: 'Specialty coffee and seasonal, locally-sourced food to keep you energized.' },
            { title: 'Community', description: 'Connect with like-minded individuals and potential collaborators.' }
        ]
    },
    'night': {
        hours: '6pm - 11pm, Thursday to Saturday',
        events: [
            { time: '6:30pm', title: 'Sound Bath Meditation' },
            { time: '7:45pm', title: 'Community Dinner' },
            { time: '9:00pm', title: 'Live Jazz Session' }
        ]
    },
    'community': {
        memberCount: 245,
        eventCount: 12,
        workshopCount: 8,
        featuredMembers: [
            { name: 'Alex Wong' },
            { name: 'Sophia Kim' },
            { name: 'Marcus Johnson' },
            { name: 'Priya Patel' }
        ]
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
    const themeColorPicker = document.getElementById('themeColor');
    if (themeColorPicker) {
        themeColorPicker.value = state.themeColor;
        
        // Theme color picker
        themeColorPicker.addEventListener('change', (e) => {
            const color = e.target.value;
            document.documentElement.style.setProperty('--theme-color', color);
            state.themeColor = color;
            localStorage.setItem('themeColor', color);
            console.log('Theme color updated:', color);
        });
    }
    
    // Dark/light mode toggle
    const viewModeToggle = document.querySelector('.view-mode-toggle');
    if (viewModeToggle) {
        viewModeToggle.addEventListener('click', () => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            document.body.classList.toggle('dark-mode', state.theme === 'dark');
            localStorage.setItem('theme', state.theme);
            console.log('Theme toggled to:', state.theme);
        });
    }
    
    // Layout toggle
    const layoutToggle = document.querySelector('.layout-toggle');
    if (layoutToggle) {
        layoutToggle.addEventListener('click', () => {
            state.layoutMode = state.layoutMode === 'grid' ? 'list' : 'grid';
            document.querySelector('.content-area').classList.toggle('fullwidth', state.layoutMode === 'list');
            localStorage.setItem('layoutMode', state.layoutMode);
            console.log('Layout mode changed to:', state.layoutMode);
        });
    }
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

// Open section
function openSection(sectionId) {
    console.log(`Opening section: ${sectionId}`);
    
    // Check if section is already open
    if (state.activeSections.includes(sectionId)) {
        console.log(`Section ${sectionId} already open, focusing`);
        focusSection(sectionId);
        return;
    }
    
    // Add to active sections
    state.activeSections.push(sectionId);
    
    // Create section element
    const section = createSectionElement(sectionId);
    
    // Add to content area
    document.getElementById('contentArea').appendChild(section);
    
    // Update tabs
    updateSectionTabs();
    
    // Add animation
    section.classList.add('fadeIn');
    
    // Focus the new section
    focusSection(sectionId);
    
    // Find and suggest related content
    setTimeout(() => suggestRelatedContent(sectionId), 3000);
}

// Create section element
function createSectionElement(sectionId) {
    // Determine section type for layout
    let sectionType = 'standard';
    if (['map', 'exhibitions'].includes(sectionId)) sectionType = 'map';
    if (['workshops', 'fungi', 'climate'].includes(sectionId)) sectionType = 'workshop';
    if (['events', 'night', 'day', 'community'].includes(sectionId)) sectionType = 'event';
    
    // Create section element
    const section = document.createElement('div');
    section.className = 'section';
    section.id = `section-${sectionId}`;
    section.setAttribute('data-section-id', sectionId);
    section.setAttribute('data-type', sectionType);
    
    // Generate content
    const content = generateSectionContent(sectionId);
    
    section.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">${formatSectionTitle(sectionId)}</h2>
            <div class="section-controls">
                <button class="section-control-button minimize-btn" aria-label="Minimize Section">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <button class="section-control-button expand-btn" aria-label="Expand Section">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                    </svg>
                </button>
                <button class="section-control-button close-btn" aria-label="Close Section">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div class="section-content">
            ${content}
        </div>
    `;
    
    // Add event listeners for the section controls
    setupSectionControls(section);
    
    // Make draggable
    makeDraggable(section);
    
    return section;
}

// Format section title
function formatSectionTitle(sectionId) {
    return sectionId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Generate section content
function generateSectionContent(sectionId) {
    const data = mockData[sectionId] || {};
    
    // Content templates based on section type
    if (sectionId === 'map') {
        return `
            <div class="interactive-map">
                <div class="map-header">
                    <h3>UNIT3 Interactive Map</h3>
                    <p>Explore our spaces and discover what's happening now</p>
                </div>
                <div class="map-view">
                    <div class="active-spaces">
                        <h4>Active Spaces</h4>
                        <ul>
                            ${data.activeSpaces.map(space => `
                                <li>
                                    <span class="space-indicator ${space.status}"></span>
                                    <span class="space-name">${space.name}</span>
                                    <span class="space-activity">${space.activity}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <button class="view-full-map-btn">View Full Interactive Map</button>
            </div>
        `;
    } else if (sectionId === 'events') {
        return `
            <div class="event-card">
                <div class="event-image"></div>
                <div class="event-details">
                    <span class="event-date">${data.date}</span>
                    <span class="event-location">${data.location}</span>
                </div>
                <h3 class="event-title">${data.title}</h3>
                <p class="event-description">${data.description}</p>
                <div class="section-tags">
                    ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                ${data.host ? `
                    <div class="profile-card">
                        <div class="profile-avatar">${data.host.name.charAt(0)}</div>
                        <div class="profile-info">
                            <div class="profile-name">${data.host.name}</div>
                            <div class="profile-role">${data.host.role}</div>
                            <div class="profile-actions">
                                <button class="profile-action primary-action">Connect</button>
                                <button class="profile-action secondary-action">View Profile</button>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    } else if (sectionId === 'workshops') {
        return `
            <div class="workshop-card">
                <div class="workshop-header">
                    <div class="workshop-icon">${data.icon}</div>
                    <div class="workshop-info">
                        <h3 class="workshop-title">${data.title}</h3>
                        <div class="workshop-meta">
                            <span>${data.duration}</span>
                            <span>•</span>
                            <span>${data.difficulty}</span>
                            <span>•</span>
                            <span>${data.participants} participants</span>
                        </div>
                    </div>
                </div>
                <p class="workshop-description">${data.description}</p>
                <div class="workshop-stats">
                    <div class="workshop-stat">
                        <div class="stat-value">${data.spots}</div>
                        <div class="stat-label">Spots Left</div>
                    </div>
                    <div class="workshop-stat">
                        <div class="stat-value">${data.price}</div>
                        <div class="stat-label">Price</div>
                    </div>
                    <div class="workshop-stat">
                        <div class="stat-value">${data.rating}</div>
                        <div class="stat-label">Rating</div>
                    </div>
                </div>
                <div class="section-tags">
                    ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    } else if (sectionId === 'fungi') {
        return `
            <div class="fungi-card">
                <h3>Current Fungi Projects</h3>
                <div class="fungi-grid">
                    ${data.fungi.map(fungus => `
                        <div class="fungi-item">
                            <div class="fungi-image"></div>
                            <div class="fungi-name">${fungus.name}</div>
                            <div class="fungi-type">${fungus.type}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="section-tags mt-md">
                    ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // Default placeholder content
    return `
        <div class="placeholder-content">
            <h3>${formatSectionTitle(sectionId)}</h3>
            <p>Content for ${sectionId} section is being developed...</p>
        </div>
    `;
}