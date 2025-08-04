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
    
    // Initialize navigation
    initNavigation();
    
    // Initialize event handlers
    initEventHandlers();
    
    // Initialize service tabs
    initServiceTabs();
    
    // Initialize modals
    initModals();
    
    // Set initial selected events
    selectedEvents = [...defaultEvents];
    
    // Load saved quotes from local storage
    loadSavedQuotes();
}

// Set default dates
function setDefaultDates() {
    const today = new Date();
    document.getElementById('wedding-date').valueAsDate = today;
    
    // Set dates for events based on wedding date
    setEventDates(today);
}

// Set event dates based on wedding date
function setEventDates(weddingDate) {
    // Engagement (1 week before wedding)
    const engagementDate = new Date(weddingDate);
    engagementDate.setDate(weddingDate.getDate() - 7);
    document.getElementById('engagement-date').valueAsDate = engagementDate;
    
    // Haldi (1 day before wedding)
    const haldiDate = new Date(weddingDate);
    haldiDate.setDate(weddingDate.getDate() - 1);
    document.getElementById('haldi-bride-date').valueAsDate = haldiDate;
    document.getElementById('haldi-groom-date').valueAsDate = haldiDate;
    
    // Wedding
    document.getElementById('wedding-event-date').valueAsDate = new Date(weddingDate);
    
    // Reception (same day as wedding)
    document.getElementById('reception-date').valueAsDate = new Date(weddingDate);
}

// Initialize navigation
function initNavigation() {
    // Progress steps navigation
    document.querySelectorAll('.progress-step').forEach(step => {
        step.addEventListener('click', function() {
            const targetStep = this.getAttribute('data-step');
            navigateToSection(targetStep);
        });
    });
    
    // Next buttons
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            const nextSection = this.getAttribute('data-next');
            navigateToSection(nextSection);
        });
    });
    
    // Previous buttons
    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', function() {
            const prevSection = this.getAttribute('data-prev');
            navigateToSection(prevSection);
        });
    });
    
    // Wedding date change
    document.getElementById('wedding-date').addEventListener('change', function() {
        setEventDates(this.valueAsDate);
    });
}

// Navigate to a specific section
function navigateToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the target section
    document.getElementById(`${sectionId}-section`).classList.add('active');
    
    // Update progress steps
    updateProgressSteps(sectionId);
    
    // Additional actions based on section
    if (sectionId === 'services') {
        updateServiceTabs();
    } else if (sectionId === 'summary') {
        updateSummary();
    }
}

// Update progress steps
function updateProgressSteps(currentStep) {
    const steps = ['client', 'events', 'services', 'summary'];
    const currentIndex = steps.indexOf(currentStep);
    
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        
        if (index === currentIndex) {
            step.classList.add('active');
        } else if (index < currentIndex) {
            step.classList.add('completed');
        }
    });
    
    document.querySelectorAll('.progress-connector').forEach((connector, index) => {
        connector.classList.remove('active');
        
        if (index < currentIndex) {
            connector.classList.add('active');
        }
    });
}

// Initialize event handlers
function initEventHandlers() {
    // Event checkboxes
    document.querySelectorAll('.event-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const eventId = this.getAttribute('data-event');
            
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
    document.getElementById('add-event-btn').addEventListener('click', function() {
        document.getElementById('add-event-modal').classList.add('active');
    });
    
    // Save custom event button
    document.getElementById('save-event-btn').addEventListener('click', saveCustomEvent);
    
    // Add custom service button
    document.getElementById('add-service-btn').addEventListener('click', function() {
        document.getElementById('add-service-modal').classList.add('active');
    });
    
    // Save custom service button
    document.getElementById('save-service-btn').addEventListener('click', saveCustomService);
    
    // Generate quotation button
    document.getElementById('generate-quote-btn').addEventListener('click', generateQuotation);
    
    // Print quotation button
    document.getElementById('print-quote-btn').addEventListener('click', printQuotation);
    
    // Download PDF button
    document.getElementById('download-pdf-btn').addEventListener('click', downloadPDF);
    
    // Back to form button
    document.getElementById('back-to-form-btn').addEventListener('click', backToForm);
    
    // Save button
    document.getElementById('save-btn').addEventListener('click', function() {
        document.getElementById('save-modal').classList.add('active');
    });
    
    // Confirm save button
    document.getElementById('confirm-save-btn').addEventListener('click', saveQuotation);
    
    // Load button
    document.getElementById('load-btn').addEventListener('click', function() {
        updateSavedQuotesList();
        document.getElementById('load-modal').classList.add('active');
    });
    
    // Generate button in top nav
    document.getElementById('generate-btn').addEventListener('click', function() {
        navigateToSection('summary');
    });
}

// Initialize service tabs
function initServiceTabs() {
    // This will be populated when the services section is shown
}

// Update service tabs
function updateServiceTabs() {
    const eventTabs = document.getElementById('event-tabs');
    const servicesContent = document.getElementById('services-content');
    
    // Clear existing tabs and content
    eventTabs.innerHTML = '';
    servicesContent.innerHTML = '';
    
    // Add tabs and content for each selected event
    selectedEvents.forEach((event, index) => {
        // Create tab
        const tab = document.createElement('div');
        tab.className = 'tab-item' + (index === 0 ? ' active' : '');
        tab.setAttribute('data-event', event.id);
        tab.innerHTML = `<i class="${event.icon}"></i> ${event.name}`;
        
        // Add click event
        tab.addEventListener('click', function() {
            // Update active tab
            document.querySelectorAll('.tab-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show corresponding panel
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            document.querySelector(`.tab-panel[data-event="${event.id}"]`).classList.add('active');
        });
        
        eventTabs.appendChild(tab);
        
        // Create panel
        const panel = document.createElement('div');
        panel.className = 'tab-panel' + (index === 0 ? ' active' : '');
        panel.setAttribute('data-event', event.id);
        
        // Add service list
        panel.innerHTML = `
            <h3>${event.name} Services</h3>
            <p>Select the services you want to include for this event:</p>
            <div class="service-list"></div>
        `;
        
        // Add services
        const serviceList = panel.querySelector('.service-list');
        
        Object.entries(serviceDefinitions).forEach(([serviceId, service]) => {
            // Check if this service is selected for this event
            const isSelected = event.services.includes(serviceId);
            
            const serviceItem = document.createElement('div');
            serviceItem.className = 'service-item';
            serviceItem.innerHTML = `
                <div class="service-item-icon">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-item-details">
                    <div class="service-item-name">${service.name}</div>
                    <div class="service-item-price">
                        <input type="number" class="service-price-input" value="${service.basePrice}" min="0" step="1000">
                    </div>
                </div>
                <div class="service-item-toggle">
                    <label class="switch">
                        <input type="checkbox" class="service-toggle" data-service="${serviceId}" ${isSelected ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
            `;
            
            // Add event listener to toggle
            const toggle = serviceItem.querySelector('.service-toggle');
            toggle.addEventListener('change', function() {
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
            
            serviceList.appendChild(serviceItem);
        });
        
        servicesContent.appendChild(panel);
    });
    
    // If no events are selected, show a message
    if (selectedEvents.length === 0) {
        eventTabs.innerHTML = '<div class="no-events-message">No events selected. Please go back and select at least one event.</div>';
    }
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

// Save custom event
function saveCustomEvent() {
    const eventName = document.getElementById('custom-event-name').value.trim();
    const eventIcon = document.getElementById('custom-event-icon').value;
    const eventDate = document.getElementById('custom-event-date').value;
    const eventTime = document.getElementById('custom-event-time').value;
    
    if (eventName) {
        // Create a unique ID for the custom event
        const eventId = 'custom-event-' + Date.now();
        
        // Create the custom event
        const customEvent = {
            id: eventId,
            name: eventName,
            icon: eventIcon,
            services: [],
            isCustom: true
        };
        
        // Add to custom events array
        customEvents.push(customEvent);
        
        // Add to selected events
        selectedEvents.push(customEvent);
        
        // Add the event to the UI
        addCustomEventToUI(customEvent, eventDate, eventTime);
        
        // Close the modal
        document.getElementById('add-event-modal').classList.remove('active');
        
        // Clear the form
        document.getElementById('custom-event-name').value = '';
        document.getElementById('custom-event-date').value = '';
    }
}

// Add custom event to UI
function addCustomEventToUI(event, eventDate, eventTime) {
    const eventsContainer = document.querySelector('.events-container');
    const addEventItem = document.querySelector('.add-event');
    
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.innerHTML = `
        <div class="event-header">
            <div class="event-icon"><i class="${event.icon}"></i></div>
            <div class="event-title">${event.name}</div>
            <div class="event-toggle">
                <label class="switch">
                    <input type="checkbox" class="event-checkbox" data-event="${event.id}" checked>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="event-details">
            <div class="event-date-time">
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="${event.id}-date" class="event-date" value="${eventDate}">
                </div>
                <div class="form-group">
                    <label>Time</label>
                    <select id="${event.id}-time" class="event-time">
                        <option value="Morning" ${eventTime === 'Morning' ? 'selected' : ''}>Morning</option>
                        <option value="Evening" ${eventTime === 'Evening' ? 'selected' : ''}>Evening</option>
                        <option value="Full Day" ${eventTime === 'Full Day' ? 'selected' : ''}>Full Day</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    
    // Add event listener to checkbox
    const checkbox = eventItem.querySelector('.event-checkbox');
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Add event to selected events if not already there
            if (!selectedEvents.find(e => e.id === event.id)) {
                selectedEvents.push(event);
            }
        } else {
            // Remove event from selected events
            selectedEvents = selectedEvents.filter(e => e.id !== event.id);
        }
    });
    
    // Insert before the "Add Event" item
    eventsContainer.insertBefore(eventItem, addEventItem);
}

// Save custom service
function saveCustomService() {
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
        
        // Add the service to the UI
        addCustomServiceToUI(customService);
        
        // Close the modal
        document.getElementById('add-service-modal').classList.remove('active');
        
        // Clear the form
        document.getElementById('custom-service-name').value = '';
        document.getElementById('custom-service-description').value = '';
        document.getElementById('custom-service-price').value = '';
    }
}

// Add custom service to UI
function addCustomServiceToUI(service) {
    const serviceOptions = document.querySelector('.service-options');
    const addServiceOption = document.querySelector('.add-service');
    
    const serviceOption = document.createElement('div');
    serviceOption.className = 'service-option';
    serviceOption.innerHTML = `
        <div class="service-option-header">
            <div class="service-icon"><i class="${service.icon}"></i></div>
            <div class="service-title">${service.name}</div>
            <div class="service-toggle">
                <label class="switch">
                    <input type="checkbox" class="service-checkbox" data-service="${service.id}" checked>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="service-details">
            <p>${service.description || 'Custom service'}</p>
            <div class="price-control">
                <label>Price:</label>
                <input type="number" class="service-price" value="${service.price}" min="0" step="1000">
            </div>
        </div>
    `;
    
    // Insert before the "Add Service" option
    serviceOptions.insertBefore(serviceOption, addServiceOption);
}

// Update summary
function updateSummary() {
    // Update client information
    document.getElementById('summary-client-name').textContent = document.getElementById('client-name').value || '-';
    document.getElementById('summary-client-phone').textContent = document.getElementById('client-phone').value || '-';
    document.getElementById('summary-client-email').textContent = document.getElementById('client-email').value || '-';
    document.getElementById('summary-event-location').textContent = document.getElementById('event-location').value || '-';
    
    const weddingDate = document.getElementById('wedding-date').value;
    document.getElementById('summary-wedding-date').textContent = weddingDate ? formatDate(weddingDate) : '-';
    
    // Update events list
    const eventsList = document.getElementById('summary-events-list');
    eventsList.innerHTML = '';
    
    selectedEvents.forEach(event => {
        const eventDate = document.getElementById(`${event.id}-date`)?.value || '-';
        const eventTime = document.getElementById(`${event.id}-time`)?.value || '-';
        
        const eventItem = document.createElement('div');
        eventItem.className = 'summary-list-item';
        eventItem.innerHTML = `
            <div class="summary-list-item-name">
                <i class="${event.icon}"></i> ${event.name}
            </div>
            <div class="summary-list-item-details">
                ${formatDate(eventDate)} | ${eventTime}
            </div>
        `;
        
        eventsList.appendChild(eventItem);
    });
    
    // Update services list
    const servicesList = document.getElementById('summary-services-list');
    servicesList.innerHTML = '';
    
    // Add event services
    const servicesCount = {};
    
    selectedEvents.forEach(event => {
        event.services.forEach(serviceId => {
            if (serviceDefinitions[serviceId]) {
                if (!servicesCount[serviceId]) {
                    servicesCount[serviceId] = 1;
                } else {
                    servicesCount[serviceId]++;
                }
            }
        });
    });
    
    Object.entries(servicesCount).forEach(([serviceId, count]) => {
        const service = serviceDefinitions[serviceId];
        
        const serviceItem = document.createElement('div');
        serviceItem.className = 'summary-list-item';
        serviceItem.innerHTML = `
            <div class="summary-list-item-name">
                <i class="${service.icon}"></i> ${service.name}
            </div>
            <div class="summary-list-item-details">
                ${count} event${count > 1 ? 's' : ''}
            </div>
        `;
        
        servicesList.appendChild(serviceItem);
    });
    
    // Add additional services
    document.querySelectorAll('.service-checkbox:checked').forEach(checkbox => {
        const serviceId = checkbox.getAttribute('data-service');
        const serviceOption = checkbox.closest('.service-option');
        const serviceName = serviceOption.querySelector('.service-title').textContent;
        const servicePrice = serviceOption.querySelector('.service-price').value;
        
        const serviceItem = document.createElement('div');
        serviceItem.className = 'summary-list-item';
        serviceItem.innerHTML = `
            <div class="summary-list-item-name">
                ${serviceName}
            </div>
            <div class="summary-list-item-details">
                ₹${formatNumber(servicePrice)}
            </div>
        `;
        
        servicesList.appendChild(serviceItem);
    });
    
    // Add custom services
    customServices.forEach(service => {
        const checkbox = document.querySelector(`.service-checkbox[data-service="${service.id}"]`);
        if (checkbox && checkbox.checked) {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'summary-list-item';
            serviceItem.innerHTML = `
                <div class="summary-list-item-name">
                    ${service.name}
                </div>
                <div class="summary-list-item-details">
                    ₹${formatNumber(service.price)}
                </div>
            `;
            
            servicesList.appendChild(serviceItem);
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
        <div class="quotation-document" style="font-family: 'Inter', Arial, sans-serif; color: #1e293b; max-width: 100%; margin: 0 auto; padding: 0;">
            <!-- Header Section -->
            <div class="quotation-header-content" style="margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 70%; vertical-align: top;">
                            <h1 style="font-family: 'Playfair Display', serif; color: #2563eb; font-size: 2.5rem; margin: 0 0 5px 0;">Sumuhurtham</h1>
                            <p style="font-style: italic; color: #1d4ed8; margin: 0 0 15px 0;">We Make Memories...</p>
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
            <div style="text-align: center; margin-bottom: 20px; background-color: #dbeafe; padding: 10px; border-radius: 8px;">
                <h2 style="color: #2563eb; margin: 0; font-size: 1.5rem;">Wedding Photography & Videography Quotation</h2>
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
            <div class="quotation-section" style="margin-bottom: 20px;">
                <h3 style="color: #2563eb; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #e2e8f0;">Event Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="background-color: #dbeafe;">
                            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; width: 25%;">Event</th>
                            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; width: 25%;">Date</th>
                            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; width: 15%;">Time</th>
                            <th style="border: 1px solid #e2e8f0; padding: 8px; text-align: left; width: 35%;">Services</th>
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
                <td style="border: 1px solid #e2e8f0; padding: 8px; font-weight: 500;">${event.name}</td>
                <td style="border: 1px solid #e2e8f0; padding: 8px;">${formatDate(eventDate)}</td>
                <td style="border: 1px solid #e2e8f0; padding: 8px;">${eventTime}</td>
                <td style="border: 1px solid #e2e8f0; padding: 8px;">${eventServices}</td>
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
                    <div class="quotation-section" style="margin-bottom: 20px;">
                        <h3 style="color: #2563eb; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #e2e8f0;">Additional Services</h3>
                        <ul style="list-style-type: none; padding-left: 5px; margin-bottom: 20px;">
    `;
    
    // Add additional services
    let additionalServicesCount = 0;
    document.querySelectorAll('.service-checkbox:checked').forEach(checkbox => {
        const serviceId = checkbox.getAttribute('data-service');
        const serviceOption = checkbox.closest('.service-option');
        const serviceName = serviceOption.querySelector('.service-title').textContent;
        
        quotationHTML += `<li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> ${serviceName}</li>`;
        additionalServicesCount++;
    });
    
    // Add custom services
    customServices.forEach(service => {
        const checkbox = document.querySelector(`.service-checkbox[data-service="${service.id}"]`);
        if (checkbox && checkbox.checked) {
            quotationHTML += `<li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> ${service.name}</li>`;
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
                    <div class="quotation-section" style="margin-bottom: 20px;">
                        <h3 style="color: #2563eb; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #e2e8f0;">Equipment Information</h3>
                        <ul style="list-style-type: none; padding-left: 5px; margin-bottom: 20px;">
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> Cameras used for video are Sony HD Cameras</li>
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> Candid videography will be done with Nikon Z8, Sony S3 or Sony FX3</li>
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> Professional equipment includes slider, steadycam, 7 lenses</li>
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> High-quality audio recording equipment</li>
                            <li style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> Professional lighting setup for all events</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Package Details Section -->
            <div class="quotation-section" style="margin-bottom: 20px; background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h3 style="color: #2563eb; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #e2e8f0;">Package Details</h3>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                    <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 8px 0; font-weight: bold; width: 70%;">Base Photography & Videography Package</td>
                        <td style="padding: 8px 0; text-align: right; width: 30%;">₹ ${packageCost}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Total Package Cost</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #2563eb; font-size: 1.1rem;">₹ ${packageCost}</td>
                    </tr>
                </table>
                
                <p style="margin-bottom: 5px; font-style: italic; color: #64748b;">(Including transport within city limits)</p>
                
                <div style="margin-top: 15px;">
                    <p style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> If couple shoot is out of Hyderabad, we will charge transport extra + accommodation + food</p>
                    <p style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> We can also refer professional makeup artists on your request</p>
                    <p style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> 50% advance payment required to confirm booking</p>
                    <p style="margin-bottom: 8px; position: relative; padding-left: 15px;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> Balance payment to be made on the day of the event</p>
                </div>
    `;
    
    // Add custom notes if any
    if (customNotes) {
        quotationHTML += `
                <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                    <h4 style="color: #2563eb; margin-bottom: 5px;">Additional Notes:</h4>
                    <p style="white-space: pre-line; padding-left: 15px;">${customNotes}</p>
                </div>
        `;
    }
    
    quotationHTML += `
            </div>
            
            <!-- Terms and Conditions Section -->
            <div class="quotation-section" style="margin-bottom: 20px;">
                <h3 style="color: #2563eb; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #e2e8f0;">Terms and Conditions</h3>
                <ol style="padding-left: 20px; margin-bottom: 20px;">
                    <li style="margin-bottom: 5px;">This quotation is valid for 30 days from the date of issue.</li>
                    <li style="margin-bottom: 5px;">Booking is confirmed only after receipt of advance payment.</li>
                    <li style="margin-bottom: 5px;">Rescheduling of events must be communicated at least 15 days in advance.</li>
                    <li style="margin-bottom: 5px;">Final deliverables will be provided within 30-45 days after the event.</li>
                    <li style="margin-bottom: 5px;">Sumuhurtham reserves the right to use selected images for portfolio and marketing purposes.</li>
                </ol>
            </div>
            
            <!-- Footer Section -->
            <div class="quotation-footer" style="margin-top: 30px; border-top: 2px solid #2563eb; padding-top: 20px;">
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
                            <p style="margin: 0 0 5px 0; font-style: italic; color: #64748b;">Date: _______________</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `;
    
    // Display quotation
    document.getElementById('quotation-content').innerHTML = quotationHTML;
    document.querySelector('.app-container').classList.add('hidden');
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
    const sections = clone.querySelectorAll('.quotation-section');
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
    document.querySelector('.app-container').classList.remove('hidden');
    document.getElementById('quotation-output').classList.add('hidden');
}

// Save quotation
function saveQuotation() {
    const quoteName = document.getElementById('save-quote-name').value.trim();
    
    if (quoteName) {
        // Get client information
        const clientName = document.getElementById('client-name').value || 'Client';
        const clientPhone = document.getElementById('client-phone').value || 'N/A';
        const clientEmail = document.getElementById('client-email').value || 'N/A';
        const eventLocation = document.getElementById('event-location').value || 'Nellore';
        const weddingDate = document.getElementById('wedding-date').value || '';
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
                location: eventLocation,
                weddingDate: weddingDate
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
        
        // Close the modal
        document.getElementById('save-modal').classList.remove('active');
        
        // Clear the form
        document.getElementById('save-quote-name').value = '';
        
        // Show success message
        alert('Quotation saved successfully!');
    }
}

// Load saved quotes from local storage
function loadSavedQuotes() {
    const savedQuotesJson = localStorage.getItem('savedQuotes');
    if (savedQuotesJson) {
        savedQuotes = JSON.parse(savedQuotesJson);
    }
}

// Update saved quotes list
function updateSavedQuotesList() {
    const savedQuotesList = document.getElementById('saved-quotes-list');
    const noQuotesMessage = document.querySelector('.no-quotes-message');
    
    if (savedQuotes.length > 0) {
        // Hide no quotes message
        if (noQuotesMessage) {
            noQuotesMessage.style.display = 'none';
        }
        
        // Clear existing quotes
        savedQuotesList.innerHTML = '';
        
        // Add each quote
        savedQuotes.forEach(quote => {
            const quoteDate = new Date(quote.date);
            const formattedDate = quoteDate.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            
            const quoteItem = document.createElement('div');
            quoteItem.className = 'saved-quote-item';
            quoteItem.innerHTML = `
                <div class="saved-quote-item-header">
                    <div class="saved-quote-item-name">${quote.name}</div>
                    <div class="saved-quote-item-date">${formattedDate}</div>
                </div>
                <div class="saved-quote-item-client">Client: ${quote.clientInfo.name}</div>
                <div class="saved-quote-item-actions">
                    <button class="btn btn-sm btn-primary load-quote-btn" data-quote-id="${quote.id}">Load</button>
                    <button class="btn btn-sm btn-danger delete-quote-btn" data-quote-id="${quote.id}">Delete</button>
                </div>
            `;
            
            // Add event listeners
            quoteItem.querySelector('.load-quote-btn').addEventListener('click', function() {
                loadQuote(quote.id);
                document.getElementById('load-modal').classList.remove('active');
            });
            
            quoteItem.querySelector('.delete-quote-btn').addEventListener('click', function() {
                deleteQuote(quote.id);
            });
            
            savedQuotesList.appendChild(quoteItem);
        });
    } else {
        // Show no quotes message
        savedQuotesList.innerHTML = '<p class="no-quotes-message">No saved quotations found.</p>';
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
        
        if (quote.clientInfo.weddingDate) {
            document.getElementById('wedding-date').value = quote.clientInfo.weddingDate;
            setEventDates(new Date(quote.clientInfo.weddingDate));
        }
        
        // Reset event checkboxes
        document.querySelectorAll('.event-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Load events
        selectedEvents = JSON.parse(JSON.stringify(quote.events));
        customEvents = JSON.parse(JSON.stringify(quote.customEvents));
        
        // Update event checkboxes
        selectedEvents.forEach(event => {
            const checkbox = document.querySelector(`.event-checkbox[data-event="${event.id}"]`);
            if (checkbox) {
                checkbox.checked = true;
            } else if (event.isCustom) {
                // Add custom event to UI
                const eventDate = document.getElementById(`${event.id}-date`)?.value || '';
                const eventTime = document.getElementById(`${event.id}-time`)?.value || 'Morning';
                addCustomEventToUI(event, eventDate, eventTime);
            }
        });
        
        // Load custom services
        customServices = JSON.parse(JSON.stringify(quote.customServices));
        
        // Add custom services to UI
        customServices.forEach(service => {
            const serviceOption = document.querySelector(`.service-option[data-service="${service.id}"]`);
            if (!serviceOption) {
                addCustomServiceToUI(service);
            }
        });
        
        // Load package cost
        document.getElementById('package-cost').value = quote.packageCost;
        
        // Load custom notes
        document.getElementById('custom-notes').value = quote.customNotes;
        
        // Navigate to client info tab
        navigateToSection('client');
        
        // Show success message
        alert('Quotation loaded successfully!');
    }
}

// Delete a saved quote
function deleteQuote(quoteId) {
    if (confirm('Are you sure you want to delete this quotation?')) {
        savedQuotes = savedQuotes.filter(quote => quote.id !== quoteId);
        
        // Save to local storage
        localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
        
        // Update UI
        updateSavedQuotesList();
    }
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString || dateString === '-') return '-';
    
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