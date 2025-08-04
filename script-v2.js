document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Global variables
let selectedEvents = [];
let customEvents = [];
let customServices = [];
let savedQuotes = [];

// Service definitions
const serviceDefinitions = {
    'traditional': { name: 'Traditional Still Camera', basePrice: 10000, icon: 'fas fa-camera' },
    'candid': { name: 'Candid Photography', basePrice: 15000, icon: 'fas fa-camera-retro' },
    '4k': { name: '4K Video', basePrice: 20000, icon: 'fas fa-video' },
    'led': { name: 'LED Screens', basePrice: 25000, icon: 'fas fa-tv' },
    'drone': { name: 'Drone', basePrice: 30000, icon: 'fas fa-drone' },
    'cinematic': { name: 'Cinematic Video', basePrice: 35000, icon: 'fas fa-film' }
};

// Default events
const defaultEvents = [
    { id: 'engagement', name: 'Engagement', icon: 'fas fa-ring', services: ['traditional', 'candid', '4k', 'cinematic'] },
    { id: 'haldi-bride', name: 'Haldi @ Bride', icon: 'fas fa-spa', services: ['traditional', '4k'] },
    { id: 'haldi-groom', name: 'Haldi @ Groom', icon: 'fas fa-spa', services: ['traditional', '4k'] },
    { id: 'wedding', name: 'Wedding', icon: 'fas fa-heart', services: ['traditional', 'candid', '4k', 'led', 'drone', 'cinematic'] },
    { id: 'reception', name: 'Reception', icon: 'fas fa-glass-cheers', services: ['traditional', 'candid', '4k', 'cinematic'] }
];

// Initialize the application
function initApp() {
    // Set default dates
    setDefaultDates();
    
    // Initialize tab navigation
    initTabNavigation();
    
    // Initialize event selection
    initEventSelection();
    
    // Initialize service configuration
    initServiceConfig();
    
    // Initialize additional services
    initAdditionalServices();
    
    // Initialize modals
    initModals();
    
    // Initialize buttons
    initButtons();
    
    // Load saved quotes from local storage
    loadSavedQuotes();
}

// Set default dates
function setDefaultDates() {
    const today = new Date();
    document.getElementById('wedding-date').valueAsDate = today;
}

// Initialize tab navigation
function initTabNavigation() {
    // Tab navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab in sidebar
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show the selected tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            
            // If service-config tab is selected, update the event tabs
            if (tabId === 'service-config') {
                updateEventTabs();
            }
            
            // If package-details tab is selected, update the summary
            if (tabId === 'package-details') {
                updatePackageSummary();
            }
        });
    });
    
    // Next/Previous buttons
    document.querySelectorAll('.next-tab').forEach(button => {
        button.addEventListener('click', function() {
            const nextTabId = this.getAttribute('data-next');
            document.querySelector(`.nav-item[data-tab="${nextTabId}"]`).click();
        });
    });
    
    document.querySelectorAll('.prev-tab').forEach(button => {
        button.addEventListener('click', function() {
            const prevTabId = this.getAttribute('data-prev');
            document.querySelector(`.nav-item[data-tab="${prevTabId}"]`).click();
        });
    });
}

// Initialize event selection
function initEventSelection() {
    // Set initial selected events
    selectedEvents = [...defaultEvents];
    
    // Event toggle listeners
    document.querySelectorAll('.event-toggle').forEach((toggle, index) => {
        toggle.addEventListener('change', function() {
            const eventCard = this.closest('.event-card');
            const eventId = eventCard.getAttribute('data-event');
            
            if (this.checked) {
                // Add event to selected events if not already there
                if (!selectedEvents.find(event => event.id === eventId)) {
                    const defaultEvent = defaultEvents.find(event => event.id === eventId);
                    if (defaultEvent) {
                        selectedEvents.push({...defaultEvent});
                    }
                }
            } else {
                // Remove event from selected events
                selectedEvents = selectedEvents.filter(event => event.id !== eventId);
            }
        });
    });
    
    // Add custom event button
    document.getElementById('add-custom-event-btn').addEventListener('click', function() {
        document.getElementById('custom-event-modal').classList.add('active');
    });
    
    // Save custom event
    document.getElementById('save-custom-event').addEventListener('click', function() {
        const eventName = document.getElementById('custom-event-name').value.trim();
        const eventDescription = document.getElementById('custom-event-description').value.trim();
        const eventIcon = document.getElementById('custom-event-icon').value;
        
        if (eventName) {
            // Create a unique ID for the custom event
            const eventId = 'custom-event-' + Date.now();
            
            // Create the custom event
            const customEvent = {
                id: eventId,
                name: eventName,
                description: eventDescription,
                icon: eventIcon,
                services: [],
                isCustom: true
            };
            
            // Add to custom events array
            customEvents.push(customEvent);
            
            // Add to selected events
            selectedEvents.push(customEvent);
            
            // Add the event card to the UI
            addCustomEventCard(customEvent);
            
            // Close the modal
            document.getElementById('custom-event-modal').classList.remove('active');
            
            // Clear the form
            document.getElementById('custom-event-name').value = '';
            document.getElementById('custom-event-description').value = '';
            document.getElementById('custom-event-icon').selectedIndex = 0;
        }
    });
}

// Add custom event card to UI
function addCustomEventCard(customEvent) {
    const eventSelectionContainer = document.querySelector('.event-selection-container');
    const addCustomEventCard = document.querySelector('.add-custom-event');
    
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.setAttribute('data-event', customEvent.id);
    
    eventCard.innerHTML = `
        <div class="event-card-header">
            <i class="${customEvent.icon}"></i>
            <h3>${customEvent.name}</h3>
        </div>
        <div class="event-card-body">
            <p>${customEvent.description || 'Custom event'}</p>
        </div>
        <div class="event-card-footer">
            <label class="toggle">
                <input type="checkbox" class="event-toggle" checked>
                <span class="slider"></span>
            </label>
        </div>
    `;
    
    // Add event listener to the toggle
    const toggle = eventCard.querySelector('.event-toggle');
    toggle.addEventListener('change', function() {
        if (this.checked) {
            // Add event to selected events if not already there
            if (!selectedEvents.find(event => event.id === customEvent.id)) {
                selectedEvents.push(customEvent);
            }
        } else {
            // Remove event from selected events
            selectedEvents = selectedEvents.filter(event => event.id !== customEvent.id);
        }
    });
    
    // Insert before the "Add Custom Event" card
    eventSelectionContainer.insertBefore(eventCard, addCustomEventCard);
}

// Initialize service configuration
function initServiceConfig() {
    // This will be populated when the service-config tab is selected
}

// Update event tabs in service configuration
function updateEventTabs() {
    const eventTabsContainer = document.querySelector('.event-tabs');
    const eventServiceConfig = document.querySelector('.event-service-config');
    
    // Clear existing tabs
    eventTabsContainer.innerHTML = '';
    eventServiceConfig.innerHTML = '';
    
    // Add tabs for each selected event
    selectedEvents.forEach((event, index) => {
        // Create event tab
        const eventTab = document.createElement('div');
        eventTab.className = 'event-tab' + (index === 0 ? ' active' : '');
        eventTab.setAttribute('data-event', event.id);
        eventTab.innerHTML = `<i class="${event.icon}"></i> ${event.name}`;
        
        // Add click event to tab
        eventTab.addEventListener('click', function() {
            // Update active tab
            document.querySelectorAll('.event-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show the corresponding event config
            document.querySelectorAll('.event-config-form').forEach(form => {
                form.classList.remove('active');
            });
            document.querySelector(`.event-config-form[data-event="${event.id}"]`).classList.add('active');
        });
        
        eventTabsContainer.appendChild(eventTab);
        
        // Create event config form
        const eventConfigForm = document.createElement('div');
        eventConfigForm.className = 'event-config-form' + (index === 0 ? ' active' : '');
        eventConfigForm.setAttribute('data-event', event.id);
        
        // Date and time configuration
        const dateTimeConfig = document.createElement('div');
        dateTimeConfig.className = 'date-time-config';
        
        // Calculate default date based on wedding date
        const weddingDate = new Date(document.getElementById('wedding-date').value);
        let eventDate = new Date(weddingDate);
        
        // Set different dates for different events
        if (event.id === 'engagement') {
            eventDate.setDate(weddingDate.getDate() - 7); // 1 week before
        } else if (event.id === 'haldi-bride' || event.id === 'haldi-groom') {
            eventDate.setDate(weddingDate.getDate() - 1); // 1 day before
        } else if (event.id === 'reception') {
            eventDate.setDate(weddingDate.getDate()); // Same day
        }
        
        // Format date for input
        const formattedDate = eventDate.toISOString().split('T')[0];
        
        dateTimeConfig.innerHTML = `
            <div class="form-group">
                <label for="${event.id}-date">Date:</label>
                <input type="date" id="${event.id}-date" value="${formattedDate}">
            </div>
            <div class="form-group">
                <label for="${event.id}-time">Time:</label>
                <select id="${event.id}-time">
                    <option value="Morning" ${event.id === 'reception' ? '' : 'selected'}>Morning</option>
                    <option value="Evening" ${event.id === 'reception' ? 'selected' : ''}>Evening</option>
                    <option value="Full Day">Full Day</option>
                </select>
            </div>
        `;
        
        eventConfigForm.appendChild(dateTimeConfig);
        
        // Service options
        const serviceOptionsTitle = document.createElement('h3');
        serviceOptionsTitle.textContent = 'Services';
        serviceOptionsTitle.style.marginBottom = '15px';
        eventConfigForm.appendChild(serviceOptionsTitle);
        
        // Add service options
        Object.entries(serviceDefinitions).forEach(([serviceId, service]) => {
            const serviceOption = document.createElement('div');
            serviceOption.className = 'service-option';
            
            // Check if this service is selected for this event
            const isSelected = event.services.includes(serviceId);
            
            serviceOption.innerHTML = `
                <div class="service-option-info">
                    <div class="service-option-name"><i class="${service.icon}"></i> ${service.name}</div>
                </div>
                <div class="service-option-price">
                    <input type="number" id="${event.id}-${serviceId}-price" value="${service.basePrice}" min="0" step="1000" class="service-price-input">
                </div>
                <div class="service-option-toggle">
                    <label class="toggle">
                        <input type="checkbox" id="${event.id}-${serviceId}-toggle" class="service-option-checkbox" ${isSelected ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
            `;
            
            // Add event listener to the checkbox
            serviceOption.querySelector('.service-option-checkbox').addEventListener('change', function() {
                const eventObj = selectedEvents.find(e => e.id === event.id);
                if (eventObj) {
                    if (this.checked) {
                        // Add service if not already there
                        if (!eventObj.services.includes(serviceId)) {
                            eventObj.services.push(serviceId);
                        }
                    } else {
                        // Remove service
                        eventObj.services = eventObj.services.filter(s => s !== serviceId);
                    }
                }
            });
            
            eventConfigForm.appendChild(serviceOption);
        });
        
        eventServiceConfig.appendChild(eventConfigForm);
    });
    
    // If no events are selected, show a message
    if (selectedEvents.length === 0) {
        eventTabsContainer.innerHTML = '<p>No events selected. Please go back to Event Selection and select at least one event.</p>';
    }
}

// Initialize additional services
function initAdditionalServices() {
    // Add custom service button
    document.getElementById('add-custom-service-btn').addEventListener('click', function() {
        document.getElementById('custom-service-modal').classList.add('active');
    });
    
    // Save custom service
    document.getElementById('save-custom-service').addEventListener('click', function() {
        const serviceName = document.getElementById('custom-service-name').value.trim();
        const serviceDescription = document.getElementById('custom-service-description').value.trim();
        const servicePrice = document.getElementById('custom-service-price').value;
        const serviceIcon = document.getElementById('custom-service-icon').value;
        
        if (serviceName && servicePrice) {
            // Create a unique ID for the custom service
            const serviceId = 'custom-service-' + Date.now();
            
            // Create the custom service
            const customService = {
                id: serviceId,
                name: serviceName,
                description: serviceDescription,
                price: servicePrice,
                icon: serviceIcon
            };
            
            // Add to custom services array
            customServices.push(customService);
            
            // Add the service card to the UI
            addCustomServiceCard(customService);
            
            // Close the modal
            document.getElementById('custom-service-modal').classList.remove('active');
            
            // Clear the form
            document.getElementById('custom-service-name').value = '';
            document.getElementById('custom-service-description').value = '';
            document.getElementById('custom-service-price').value = '';
            document.getElementById('custom-service-icon').selectedIndex = 0;
        }
    });
}

// Add custom service card to UI
function addCustomServiceCard(customService) {
    const servicesContainer = document.querySelector('.additional-services-container');
    const addCustomServiceCard = document.querySelector('.add-custom-service');
    
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.setAttribute('data-service', customService.id);
    
    serviceCard.innerHTML = `
        <div class="service-card-header">
            <i class="${customService.icon}"></i>
            <h3>${customService.name}</h3>
        </div>
        <div class="service-card-body">
            <p>${customService.description || 'Custom service'}</p>
            <div class="price-control">
                <label>Price:</label>
                <input type="number" class="service-price" value="${customService.price}" min="0" step="1000">
            </div>
        </div>
        <div class="service-card-footer">
            <label class="toggle">
                <input type="checkbox" class="service-toggle" checked>
                <span class="slider"></span>
            </label>
        </div>
    `;
    
    // Insert before the "Add Custom Service" card
    servicesContainer.insertBefore(serviceCard, addCustomServiceCard);
}

// Initialize modals
function initModals() {
    // Close modal buttons
    document.querySelectorAll('.close-modal, .close-modal-btn').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

// Initialize buttons
function initButtons() {
    // Generate quotation button
    const generateQuoteBtn = document.getElementById('generate-quote');
    if (generateQuoteBtn) {
        generateQuoteBtn.addEventListener('click', generateQuotation);
    }
    
    // Print quotation button
    const printQuoteBtn = document.getElementById('print-quote');
    if (printQuoteBtn) {
        printQuoteBtn.addEventListener('click', printQuotation);
    }
    
    // Download PDF button
    const downloadPdfBtn = document.getElementById('download-pdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', downloadPDF);
    }
    
    // Back to form button
    const backToFormBtn = document.getElementById('back-to-form');
    if (backToFormBtn) {
        backToFormBtn.addEventListener('click', backToForm);
    }
    
    // Save quotation button
    const saveQuoteBtn = document.getElementById('save-quote');
    if (saveQuoteBtn) {
        saveQuoteBtn.addEventListener('click', function() {
            document.getElementById('save-quote-modal').classList.add('active');
        });
    }
    
    // Confirm save quotation button
    const confirmSaveBtn = document.getElementById('confirm-save-quote');
    if (confirmSaveBtn) {
        confirmSaveBtn.addEventListener('click', saveQuotation);
    }
}

// Update package summary
function updatePackageSummary() {
    // Update selected events summary
    const selectedEventsSummary = document.getElementById('selected-events-summary');
    selectedEventsSummary.innerHTML = '';
    
    selectedEvents.forEach(event => {
        const eventDate = document.getElementById(`${event.id}-date`)?.value || 'TBD';
        const eventTime = document.getElementById(`${event.id}-time`)?.value || 'TBD';
        
        const eventItem = document.createElement('li');
        eventItem.innerHTML = `<strong>${event.name}</strong> - ${formatDate(eventDate)} (${eventTime})`;
        selectedEventsSummary.appendChild(eventItem);
    });
    
    // Update selected services summary
    const selectedServicesSummary = document.getElementById('selected-services-summary');
    selectedServicesSummary.innerHTML = '';
    
    // Create a map to count services across all events
    const serviceCount = {};
    
    selectedEvents.forEach(event => {
        event.services.forEach(serviceId => {
            if (serviceDefinitions[serviceId]) {
                if (!serviceCount[serviceId]) {
                    serviceCount[serviceId] = 1;
                } else {
                    serviceCount[serviceId]++;
                }
            }
        });
    });
    
    // Add services to the summary
    Object.entries(serviceCount).forEach(([serviceId, count]) => {
        const service = serviceDefinitions[serviceId];
        const serviceItem = document.createElement('li');
        serviceItem.innerHTML = `<strong>${service.name}</strong> - ${count} event${count > 1 ? 's' : ''}`;
        selectedServicesSummary.appendChild(serviceItem);
    });
    
    // Update additional services summary
    const additionalServicesSummary = document.getElementById('additional-services-summary');
    additionalServicesSummary.innerHTML = '';
    
    // Get all checked additional services
    document.querySelectorAll('.service-card:not(.add-custom-service) .service-toggle:checked').forEach(toggle => {
        const serviceCard = toggle.closest('.service-card');
        const serviceId = serviceCard.getAttribute('data-service');
        const serviceName = serviceCard.querySelector('h3').textContent;
        const servicePrice = serviceCard.querySelector('.service-price').value;
        
        const serviceItem = document.createElement('li');
        serviceItem.innerHTML = `<strong>${serviceName}</strong> - ₹${formatNumber(servicePrice)}`;
        additionalServicesSummary.appendChild(serviceItem);
    });
    
    // Add custom services to the summary
    customServices.forEach(service => {
        const serviceToggle = document.querySelector(`.service-card[data-service="${service.id}"] .service-toggle`);
        if (serviceToggle && serviceToggle.checked) {
            const serviceItem = document.createElement('li');
            serviceItem.innerHTML = `<strong>${service.name}</strong> - ₹${formatNumber(service.price)}`;
            additionalServicesSummary.appendChild(serviceItem);
        }
    });
}

// Generate quotation
function generateQuotation() {
    // Get client information
    const clientName = document.getElementById('client-name').value || 'Client';
    const clientPhone = document.getElementById('client-phone').value || 'N/A';
    const clientEmail = document.getElementById('client-email').value || 'N/A';
    const eventLocation = document.getElementById('event-location').value || 'Nellore';
    const packageCost = document.getElementById('package-cost').value || '3,50,000';
    const customNotes = document.getElementById('custom-notes').value || '';
    
    // Get current date for quotation
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate.toISOString().split('T')[0]);
    const quotationNumber = `SUM-${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    // Generate HTML for quotation with improved layout for printing
    let quotationHTML = `
        <div class="quotation-document" style="font-family: 'Poppins', Arial, sans-serif; color: #333; max-width: 100%; margin: 0 auto; padding: 0;">
            <!-- Header Section -->
            <div class="quotation-header-content" style="margin-bottom: 20px; border-bottom: 2px solid #d32f2f; padding-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 70%; vertical-align: top;">
                            <h1 style="font-family: 'Dancing Script', cursive; color: #d32f2f; font-size: 2.5rem; margin: 0 0 5px 0;">Sumuhurtham</h1>
                            <p style="font-style: italic; color: #b71c1c; margin: 0 0 15px 0;">We Make Memories...</p>
                            <p style="margin: 2px 0;">Experienced, Creative & Professional Photographers</p>
                            <p style="margin: 2px 0;">Hyderabad | With Over 10 Years of Experience</p>
                        </td>
                        <td style="width: 30%; vertical-align: top; text-align: right;">
                            <img src="logo.png" alt="Sumuhurtham Logo" style="width: 100px; height: auto; margin-bottom: 10px;">
                        </td>
                    </tr>
                </table>
            </div>
            
            <!-- Title Section -->
            <div style="text-align: center; margin-bottom: 20px; background-color: #ffcdd2; padding: 10px; border-radius: 5px;">
                <h2 style="color: #d32f2f; margin: 0; font-size: 1.5rem;">Wedding Photography & Videography Quotation</h2>
            </div>
            
            <!-- Client and Quotation Info Section -->
            <div style="margin-bottom: 20px; display: flex; justify-content: space-between;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 50%; vertical-align: top; padding-right: 15px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 5px 0; font-weight: bold; width: 100px;">Client:</td>
                                    <td style="padding: 5px 0;">${clientName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; font-weight: bold;">Phone:</td>
                                    <td style="padding: 5px 0;">${clientPhone}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; font-weight: bold;">Email:</td>
                                    <td style="padding: 5px 0;">${clientEmail}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; font-weight: bold;">Location:</td>
                                    <td style="padding: 5px 0;">${eventLocation}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="width: 50%; vertical-align: top; padding-left: 15px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 5px 0; font-weight: bold; width: 150px;">Quotation Date:</td>
                                    <td style="padding: 5px 0;">${formattedDate}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; font-weight: bold;">Quotation #:</td>
                                    <td style="padding: 5px 0;">${quotationNumber}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; font-weight: bold;">Valid Until:</td>
                                    <td style="padding: 5px 0;">${formatDate(new Date(currentDate.setDate(currentDate.getDate() + 30)).toISOString().split('T')[0])}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            
            <!-- Event Details Section -->
            <div class="quotation-events" style="margin-bottom: 20px;">
                <h3 style="color: #d32f2f; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #ddd;">Event Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="background-color: #ffcdd2;">
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 25%;">Event</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 25%;">Date</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 15%;">Time</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 35%;">Services</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    // Add event rows
    selectedEvents.forEach(event => {
        const eventDate = document.getElementById(`${event.id}-date`)?.value || 'TBD';
        const eventTime = document.getElementById(`${event.id}-time`)?.value || 'TBD';
        
        // Get services for this event
        const eventServices = event.services.map(serviceId => {
            return serviceDefinitions[serviceId]?.name || 'Unknown Service';
        }).join(', ');
        
        quotationHTML += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: 500;">${event.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${formatDate(eventDate)}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${eventTime}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${eventServices}</td>
            </tr>
        `;
    });
    
    quotationHTML += `
                    </tbody>
                </table>
            </div>
            
            <!-- Services Section -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div style="width: 48%;">
                    <div class="quotation-additional" style="margin-bottom: 20px;">
                        <h3 style="color: #d32f2f; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #ddd;">Additional Services</h3>
                        <ul style="list-style-type: none; padding-left: 5px; margin-bottom: 20px;">
    `;
    
    // Add additional services
    let additionalServicesCount = 0;
    document.querySelectorAll('.service-card:not(.add-custom-service) .service-toggle:checked').forEach(toggle => {
        const serviceCard = toggle.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        
        quotationHTML += `<li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> ${serviceName}</li>`;
        additionalServicesCount++;
    });
    
    // Add custom services
    customServices.forEach(service => {
        const serviceToggle = document.querySelector(`.service-card[data-service="${service.id}"] .service-toggle`);
        if (serviceToggle && serviceToggle.checked) {
            quotationHTML += `<li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> ${service.name}</li>`;
            additionalServicesCount++;
        }
    });
    
    // Add placeholder items if needed
    if (additionalServicesCount < 5) {
        for (let i = 0; i < 5 - additionalServicesCount; i++) {
            quotationHTML += `<li style="margin-bottom: 8px; visibility: hidden;">Placeholder</li>`;
        }
    }
    
    quotationHTML += `
                        </ul>
                    </div>
                </div>
                <div style="width: 48%;">
                    <div class="quotation-equipment" style="margin-bottom: 20px;">
                        <h3 style="color: #d32f2f; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #ddd;">Equipment Information</h3>
                        <ul style="list-style-type: none; padding-left: 5px; margin-bottom: 20px;">
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> Cameras used for video are Sony HD Cameras</li>
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> Candid videography will be done with Nikon Z8, Sony S3 or Sony FX3</li>
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> Professional equipment includes slider, steadycam, 7 lenses</li>
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> High-quality audio recording equipment</li>
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> Professional lighting setup for all events</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Package Details Section -->
            <div class="quotation-package" style="margin-bottom: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
                <h3 style="color: #d32f2f; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #ddd;">Package Details</h3>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 8px 0; font-weight: bold; width: 70%;">Base Photography & Videography Package</td>
                        <td style="padding: 8px 0; text-align: right; width: 30%;">₹ ${packageCost}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Total Package Cost</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #d32f2f; font-size: 1.1rem;">₹ ${packageCost}</td>
                    </tr>
                </table>
                
                <p style="margin-bottom: 5px; font-style: italic; color: #666;">(Including transport within city limits)</p>
                
                <div style="margin-top: 15px;">
                    <p style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> If couple shoot is out of Hyderabad, we will charge transport extra + accommodation + food</p>
                    <p style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> We can also refer professional makeup artists on your request</p>
                    <p style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> 50% advance payment required to confirm booking</p>
                    <p style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #d32f2f;">•</span> Balance payment to be made on the day of the event</p>
                </div>
    `;
    
    // Add custom notes if any
    if (customNotes) {
        quotationHTML += `
                <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #ddd;">
                    <h4 style="color: #d32f2f; margin-bottom: 5px;">Additional Notes:</h4>
                    <p style="white-space: pre-line; padding-left: 15px;">${customNotes}</p>
                </div>
        `;
    }
    
    quotationHTML += `
            </div>
            
            <!-- Terms and Conditions Section -->
            <div style="margin-bottom: 20px;">
                <h3 style="color: #d32f2f; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #ddd;">Terms and Conditions</h3>
                <ol style="padding-left: 20px; margin-bottom: 20px;">
                    <li style="margin-bottom: 5px;">This quotation is valid for 30 days from the date of issue.</li>
                    <li style="margin-bottom: 5px;">Booking is confirmed only after receipt of advance payment.</li>
                    <li style="margin-bottom: 5px;">Rescheduling of events must be communicated at least 15 days in advance.</li>
                    <li style="margin-bottom: 5px;">Final deliverables will be provided within 30-45 days after the event.</li>
                    <li style="margin-bottom: 5px;">Sumuhurtham reserves the right to use selected images for portfolio and marketing purposes.</li>
                </ol>
            </div>
            
            <!-- Footer Section -->
            <div class="quotation-footer" style="margin-top: 30px; border-top: 2px solid #d32f2f; padding-top: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 50%; vertical-align: top; padding-right: 15px;">
                            <p style="margin: 0 0 5px 0;"><strong>Sumuhurtham Wedding Photography & Videography</strong></p>
                            <p style="margin: 0 0 5px 0;">Experienced, Creative & Professional Photographers</p>
                            <p style="margin: 0 0 5px 0;">Hyderabad | With Over 10 Years of Experience</p>
                            <p style="margin: 0 0 5px 0;">Contact: +91 XXXXXXXXXX</p>
                        </td>
                        <td style="width: 50%; vertical-align: top; padding-left: 15px; text-align: right;">
                            <p style="margin: 0 0 5px 0;"><strong>Client Acceptance</strong></p>
                            <p style="margin: 30px 0 5px 0;">_______________________</p>
                            <p style="margin: 0 0 5px 0;">${clientName}</p>
                            <p style="margin: 0 0 5px 0; font-style: italic; color: #666;">Date: _______________</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `;
    
    // Display quotation
    document.getElementById('quotation-content').innerHTML = quotationHTML;
    document.querySelector('.main-content').classList.add('hidden');
    document.getElementById('quotation-output').classList.remove('hidden');
}

// Print quotation
function printQuotation() {
    window.print();
}

// Download PDF
function downloadPDF() {
    const element = document.getElementById('quotation-content');
    const clientName = document.getElementById('client-name').value || 'Client';
    const filename = `Sumuhurtham_Quotation_${clientName.replace(/\s+/g, '_')}.pdf`;
    
    // Create a clone of the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Apply specific styles for PDF generation
    clone.style.padding = '20mm';
    clone.style.fontSize = '10pt';
    clone.style.backgroundColor = 'white';
    clone.style.color = 'black';
    
    // Ensure tables have proper width
    const tables = clone.querySelectorAll('table');
    tables.forEach(table => {
        table.style.width = '100%';
        table.style.maxWidth = '100%';
        table.style.tableLayout = 'fixed';
        table.style.pageBreakInside = 'avoid';
    });
    
    // Ensure sections don't break across pages
    const sections = clone.querySelectorAll('.quotation-events, .quotation-additional, .quotation-equipment, .quotation-package');
    sections.forEach(section => {
        section.style.pageBreakInside = 'avoid';
    });
    
    // Configure PDF options
    const opt = {
        margin: [15, 10, 15, 10], // [top, right, bottom, left] in mm
        filename: filename,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true,
            precision: 2
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Generate and save the PDF
    html2pdf()
        .set(opt)
        .from(clone)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
            // Add page numbers
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.setTextColor(100, 100, 100);
                pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.getWidth() - 25, pdf.internal.pageSize.getHeight() - 10);
            }
        })
        .save();
}

// Back to form
function backToForm() {
    document.querySelector('.main-content').classList.remove('hidden');
    document.getElementById('quotation-output').classList.add('hidden');
}

// Save quotation
function saveQuotation() {
    const quoteName = document.getElementById('quote-name').value.trim();
    
    if (quoteName) {
        // Get client information
        const clientName = document.getElementById('client-name').value || 'Client';
        const clientPhone = document.getElementById('client-phone').value || 'N/A';
        const clientEmail = document.getElementById('client-email').value || 'N/A';
        const eventLocation = document.getElementById('event-location').value || 'Nellore';
        const packageCost = document.getElementById('package-cost').value || '3,50,000';
        const customNotes = document.getElementById('custom-notes').value || '';
        
        // Create quote object
        const quote = {
            id: 'quote-' + Date.now(),
            name: quoteName,
            date: new Date().toISOString(),
            clientInfo: {
                name: clientName,
                phone: clientPhone,
                email: clientEmail,
                location: eventLocation
            },
            events: JSON.parse(JSON.stringify(selectedEvents)),
            customEvents: JSON.parse(JSON.stringify(customEvents)),
            customServices: JSON.parse(JSON.stringify(customServices)),
            packageCost: packageCost,
            customNotes: customNotes
        };
        
        // Add to saved quotes
        savedQuotes.push(quote);
        
        // Save to local storage
        localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
        
        // Update saved quotes UI
        updateSavedQuotesUI();
        
        // Close the modal
        document.getElementById('save-quote-modal').classList.remove('active');
        
        // Clear the form
        document.getElementById('quote-name').value = '';
        
        // Show success message
        alert('Quotation saved successfully!');
        
        // Navigate to saved quotes tab
        document.querySelector('.nav-item[data-tab="saved-quotes"]').click();
    }
}

// Load saved quotes from local storage
function loadSavedQuotes() {
    const savedQuotesJson = localStorage.getItem('savedQuotes');
    if (savedQuotesJson) {
        savedQuotes = JSON.parse(savedQuotesJson);
        updateSavedQuotesUI();
    }
}

// Update saved quotes UI
function updateSavedQuotesUI() {
    const quotesList = document.querySelector('.quotes-list');
    const noQuotesMessage = document.querySelector('.no-quotes-message');
    
    if (savedQuotes.length > 0) {
        // Hide no quotes message
        if (noQuotesMessage) {
            noQuotesMessage.style.display = 'none';
        }
        
        // Clear existing quotes
        quotesList.innerHTML = '';
        
        // Add each quote
        savedQuotes.forEach(quote => {
            const quoteCard = document.createElement('div');
            quoteCard.className = 'quote-card';
            quoteCard.setAttribute('data-quote-id', quote.id);
            
            const quoteDate = new Date(quote.date);
            const formattedDate = quoteDate.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            
            quoteCard.innerHTML = `
                <div class="quote-card-header">
                    <h3>${quote.name}</h3>
                    <p>Client: ${quote.clientInfo.name}</p>
                    <p>Date: ${formattedDate}</p>
                </div>
                <div class="quote-card-body">
                    <p>Events: ${quote.events.length}</p>
                    <p>Package Cost: ₹${quote.packageCost}</p>
                </div>
                <div class="quote-card-actions">
                    <button class="btn-primary btn-sm load-quote" data-quote-id="${quote.id}">Load</button>
                    <button class="btn-danger btn-sm delete-quote" data-quote-id="${quote.id}">Delete</button>
                </div>
            `;
            
            // Add event listeners
            quoteCard.querySelector('.load-quote').addEventListener('click', function() {
                loadQuote(quote.id);
            });
            
            quoteCard.querySelector('.delete-quote').addEventListener('click', function() {
                deleteQuote(quote.id);
            });
            
            quotesList.appendChild(quoteCard);
        });
    } else {
        // Show no quotes message
        if (noQuotesMessage) {
            noQuotesMessage.style.display = 'block';
        } else {
            quotesList.innerHTML = '<p class="no-quotes-message">No saved quotations yet.</p>';
        }
    }
}

// Load a saved quote
function loadQuote(quoteId) {
    const quote = savedQuotes.find(q => q.id === quoteId);
    
    if (quote) {
        // Load client information
        document.getElementById('client-name').value = quote.clientInfo.name;
        document.getElementById('client-phone').value = quote.clientInfo.phone;
        document.getElementById('client-email').value = quote.clientInfo.email;
        document.getElementById('event-location').value = quote.clientInfo.location;
        
        // Load events
        selectedEvents = JSON.parse(JSON.stringify(quote.events));
        customEvents = JSON.parse(JSON.stringify(quote.customEvents));
        
        // Load custom services
        customServices = JSON.parse(JSON.stringify(quote.customServices));
        
        // Load package cost
        document.getElementById('package-cost').value = quote.packageCost;
        
        // Load custom notes
        document.getElementById('custom-notes').value = quote.customNotes;
        
        // Update UI
        updateEventSelectionUI();
        
        // Navigate to client info tab
        document.querySelector('.nav-item[data-tab="client-info"]').click();
        
        // Show success message
        alert('Quotation loaded successfully!');
    }
}

// Update event selection UI based on loaded quote
function updateEventSelectionUI() {
    // Reset event toggles
    document.querySelectorAll('.event-toggle').forEach(toggle => {
        toggle.checked = false;
    });
    
    // Set toggles for selected events
    selectedEvents.forEach(event => {
        const eventCard = document.querySelector(`.event-card[data-event="${event.id}"]`);
        if (eventCard) {
            const toggle = eventCard.querySelector('.event-toggle');
            if (toggle) {
                toggle.checked = true;
            }
        } else if (event.isCustom) {
            // Add custom event card
            addCustomEventCard(event);
        }
    });
    
    // Add custom service cards
    customServices.forEach(service => {
        const serviceCard = document.querySelector(`.service-card[data-service="${service.id}"]`);
        if (!serviceCard) {
            addCustomServiceCard(service);
        }
    });
}

// Delete a saved quote
function deleteQuote(quoteId) {
    if (confirm('Are you sure you want to delete this quotation?')) {
        savedQuotes = savedQuotes.filter(quote => quote.id !== quoteId);
        
        // Save to local storage
        localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
        
        // Update UI
        updateSavedQuotesUI();
    }
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString || dateString === 'TBD') return 'TBD';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

// Helper function to format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}