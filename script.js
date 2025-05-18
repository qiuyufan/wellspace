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
                document.documentElement.style.setProperty('--primary-green', '#9cf3ff');
            } else {
                document.documentElement.style.setProperty('--primary-green', '#9cf3ff'); // Darker teal for recovery mode
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
    //    const notification = document.getElementById('notification');
    //    notification.classList.add('show');
    //}, 3000);
    
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

// Initialize basemap layers
var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  );
  
  var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });
  
  // Center map on fallback location (Tikkurila, Finland)
  var map = L.map("map-container", {
    center: [60.2936799449855, 25.03791060213742],
    zoom: 15,
    layers: [Esri_WorldImagery],
  });
  
  // Basemap switch control
  var baseMaps = {
    OpenStreetMap: osm,
    "Esri Imagery": Esri_WorldImagery,
  };
  
  L.control.layers(baseMaps).addTo(map);
  
  // Handle successful geolocation
  function onLocationFound(e) {
    console.log(e);
    L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
  }
  
  // Handle location error (fallback to Tikkurila)
  function onLocationError(e) {
    console.log("Location error, using fallback.");
    L.marker({ lat: 60.2936799449855, lng: 25.03791060213742 })
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();
  }
  
  map.on("locationerror", onLocationError);
  map.on("locationfound", onLocationFound);
  map.locate({ setView: true, maxZoom: 15 });
  
  // Example mock green area marker (for demo purposes)
  var marker = L.marker([60.295909, 25.054193])
    .bindPopup("Green Area (mock)")
    .addTo(map);

  // ---
  // If Sentinel-2 NDVI data were used:
  // 1. Send POST request to Copernicus Dataspace API
  // 2. Use Evalscript to calculate NDVI (index(B08, B04))
  // 3. Parse GeoTIFF to extract NDVI values and coordinates
  // 4. Filter highest NDVI areas and display as green markers
  //
  // This is mocked for the demo since full NDVI analysis requires more time and backend processing.
  // ---
});