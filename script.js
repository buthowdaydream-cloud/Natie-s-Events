// Mock events data
const eventsData = [
    {
        id: 1,
        title: "Elegant Wedding Package",
        location: "Harare",
        description: "Complete wedding planning service including venue, catering, decoration, and coordination.",
        price: "$1,200",
        category: "wedding",
        image: "wedding"
    },
    {
        id: 2,
        title: "Corporate Gala Dinner",
        location: "Bulawayo",
        description: "Professional corporate event planning with premium catering and entertainment options.",
        price: "$2,500",
        category: "corporate",
        image: "corporate"
    },
    {
        id: 3,
        title: "Children's Birthday Party",
        location: "Harare",
        description: "Fun-filled birthday celebration with games, entertainment, and themed decorations.",
        price: "$450",
        category: "birthday",
        image: "birthday"
    },
    {
        id: 4,
        title: "Anniversary Celebration",
        location: "Mutare",
        description: "Romantic anniversary dinner planning with personalized touches and memorable experiences.",
        price: "$800",
        category: "anniversary",
        image: "anniversary"
    },
    {
        id: 5,
        title: "Engagement Party Planning",
        location: "Harare",
        description: "Stunning engagement party setup with elegant decorations and coordination services.",
        price: "$600",
        category: "engagement",
        image: "engagement"
    },
    {
        id: 6,
        title: "Baby Shower Event",
        location: "Gweru",
        description: "Charming baby shower planning with themed decorations and coordination.",
        price: "$350",
        category: "baby",
        image: "baby"
    }
];

// Function to render events
function renderEvents(events) {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-image">
                ${event.image.toUpperCase()} EVENT
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-price">From ${event.price}</div>
                <a href="booking.html?event=${event.id}" class="cta-button">
                    <i class="fas fa-book"></i> Book Event
                </a>
            </div>
        `;
        container.appendChild(eventCard);
    });
}

// Search function with advanced filtering
function searchEvents(searchTerm = '', category = '', maxPrice = Infinity) {
    const term = searchTerm || document.getElementById('eventSearch').value.toLowerCase();
    
    const filteredEvents = eventsData.filter(event => {
        const matchesSearch = 
            event.title.toLowerCase().includes(term) ||
            event.location.toLowerCase().includes(term) ||
            event.description.toLowerCase().includes(term) ||
            event.category.toLowerCase().includes(term);
        
        const matchesCategory = !category || event.category === category;
        
        const eventPrice = parseInt(event.price.replace(/[^0-9]/g, ''));
        const matchesPrice = eventPrice <= maxPrice;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    renderEvents(filteredEvents.length > 0 ? filteredEvents : eventsData);
}

// Initialize events on page load
document.addEventListener('DOMContentLoaded', function() {
    renderEvents(eventsData);
    
    // Add event listener for search input
    document.getElementById('eventSearch').addEventListener('input', function() {
        searchEvents();
    });
    
    // Mobile menu functionality with smooth animation and accessibility
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('#nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when a link is clicked
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    /* --- Hero carousel functionality --- */
    (function initHeroCarousel(){
        const carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;

        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = Array.from(carousel.querySelectorAll('.indicator'));
        let current = slides.findIndex(s => s.classList.contains('active')) || 0;
        let timer = null;
        const delay = 5000; // 5s

        function goTo(index){
            slides.forEach((s,i)=> s.classList.toggle('active', i===index));
            indicators.forEach((t,i)=>{
                t.classList.toggle('active', i===index);
                t.setAttribute('aria-selected', i===index ? 'true' : 'false');
            });
            current = index;
        }

        function next(){ goTo((current+1) % slides.length); }
        function prev(){ goTo((current-1 + slides.length) % slides.length); }

        // Controls
        nextBtn && nextBtn.addEventListener('click', ()=>{ next(); resetTimer(); });
        prevBtn && prevBtn.addEventListener('click', ()=>{ prev(); resetTimer(); });

        // Indicators
        indicators.forEach((btn,i)=> btn.addEventListener('click', ()=>{ goTo(i); resetTimer(); }));

        // Keyboard navigation
        carousel.addEventListener('keydown', (e)=>{
            if (e.key === 'ArrowRight') { next(); resetTimer(); }
            if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
        });

        // Auto play
        function startTimer(){ timer = setInterval(next, delay); }
        function stopTimer(){ if (timer) clearInterval(timer); }
        function resetTimer(){ stopTimer(); startTimer(); }

        // Pause on hover/focus
        carousel.addEventListener('mouseenter', stopTimer);
        carousel.addEventListener('focusin', stopTimer);
        carousel.addEventListener('mouseleave', startTimer);
        carousel.addEventListener('focusout', startTimer);

        // Initialize
        carousel.setAttribute('tabindex', '0');
        goTo(current);
        startTimer();
    })();
});
