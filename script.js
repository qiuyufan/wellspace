document.addEventListener('DOMContentLoaded', function() {
    // Mode Toggle Functionality
    const toggleOptions = document.querySelectorAll('.toggle-option');
    
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update app theme based on mode
            const mode = this.getAttribute('data-mode');
            if (mode === 'work') {
                document.documentElement.style.setProperty('--primary-green', '#5E9E8F');
            } else {
                document.documentElement.style.setProperty('--primary-green', '#3B7D6F'); // Darker teal for recovery mode
            }
        });
    });
    
    // Mood Tracker Functionality
    const moodEmojis = document.querySelectorAll('.mood-emoji');
    const moodRange = document.querySelector('.mood-range');
    
    if (moodEmojis.length > 0 && moodRange) {
        moodEmojis.forEach(emoji => {
            emoji.addEventListener('click', function() {
                // Remove active class from all emojis
                moodEmojis.forEach(e => e.classList.remove('active'));
                
                // Add active class to clicked emoji
                this.classList.add('active');
                
                // Update range value
                const moodValue = this.getAttribute('data-mood');
                moodRange.value = moodValue;
            });
        });
        
        moodRange.addEventListener('input', function() {
            // Update active emoji based on range value
            moodEmojis.forEach(emoji => {
                emoji.classList.remove('active');
                if (emoji.getAttribute('data-mood') === this.value) {
                    emoji.classList.add('active');
                }
            });
        });
    }
    
    // Show notification after 3 seconds for demo purposes
    setTimeout(() => {
        const notification = document.getElementById('notification');
        notification.classList.add('show');
    }, 3000);
    
    // Close notification
    const notificationClose = document.querySelector('.notification-close');
    const notificationBtns = document.querySelectorAll('.notification-btn');
    
    function closeNotification() {
        const notification = document.getElementById('notification');
        notification.classList.remove('show');
    }
    
    notificationClose.addEventListener('click', closeNotification);
    
    notificationBtns.forEach(btn => {
        btn.addEventListener('click', closeNotification);
    });
    
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding screen
            screens.forEach(screen => screen.style.display = 'none');
            
            // Simple mapping for demo purposes
            if (index === 0) { // Home
                document.getElementById('home-screen').style.display = 'block';
            } else if (index === 1) { // Explore/Map
                document.getElementById('map-screen').style.display = 'block';
            }
            // Other screens would be added here
        });
    });
    
    // API Settings button functionality
    const apiSettingsBtn = document.getElementById('api-settings');
    apiSettingsBtn.addEventListener('click', function() {
        // Show API settings screen
        screens.forEach(screen => screen.style.display = 'none');
        document.getElementById('api-settings-screen').style.display = 'block';
        
        // Update active nav item (none in this case as it's a separate screen)
        navItems.forEach(nav => nav.classList.remove('active'));
    });
    
    // Refresh data button functionality
    const refreshDataBtn = document.querySelector('.refresh-data-btn');
    refreshDataBtn.addEventListener('click', function() {
        // Simulate data refresh with animation
        this.classList.add('refreshing');
        
        // In a real app, this would fetch data from Copernicus API
        setTimeout(() => {
            this.classList.remove('refreshing');
            
            // Show break recommendation screen after refresh
            screens.forEach(screen => screen.style.display = 'none');
            document.getElementById('break-recommendation-screen').style.display = 'block';
            
            // Update active nav item (none in this case as it's a separate screen)
            navItems.forEach(nav => nav.classList.remove('active'));
        }, 1500);
    });
    
    // Find Park button functionality
    const findParkBtn = document.getElementById('find-park');
    findParkBtn.addEventListener('click', function() {
        // Show map screen
        screens.forEach(screen => screen.style.display = 'none');
        document.getElementById('map-screen').style.display = 'block';
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        navItems[1].classList.add('active'); // Explore tab
    });
    
    // Back button functionality
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', function() {
        // Go back to home screen
        screens.forEach(screen => screen.style.display = 'none');
        document.getElementById('home-screen').style.display = 'block';
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        navItems[0].classList.add('active'); // Home tab
    });
    
    // Park marker interaction
    const parkMarkers = document.querySelectorAll('.park-marker');
    
    parkMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            // In a real app, this would update the park details card
            // For demo, we'll just highlight the marker
            parkMarkers.forEach(m => m.style.zIndex = 1);
            this.style.zIndex = 10;
        });
    });
    
    // Filter buttons functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would filter the map markers
        });
    });
    
    // Simulate recovery score animation
    const progressFill = document.querySelector('.progress-fill');
    const scoreText = document.querySelector('.score-text');
    
    // Calculate stroke-dashoffset based on percentage (75%)
    const circle = progressFill;
    const radius = circle.getAttribute('r');
    const circumference = 2 * Math.PI * radius;
    const scorePercent = 75;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (scorePercent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    // For demo purposes, animate the score changing
    let currentScore = 70;
    const targetScore = 75;
    
    function updateScore() {
        if (currentScore < targetScore) {
            currentScore++;
            scoreText.textContent = `${currentScore}%`;
            
            const newOffset = circumference - (currentScore / 100) * circumference;
            circle.style.strokeDashoffset = newOffset;
            
            setTimeout(updateScore, 50);
        }
    }
    
    // Start the animation after a short delay
    setTimeout(updateScore, 1000);
});