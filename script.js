document.addEventListener('DOMContentLoaded', function() {
    // Set default dates (current date + next few days)
    setDefaultDates();
    
    // Event listeners
    document.getElementById('generate-quote').addEventListener('click', function() {
        console.log('Generate quotation button clicked');
        generateQuotation();
    });
    document.getElementById('reset-form').addEventListener('click', resetForm);
    document.getElementById('print-quote').addEventListener('click', printQuotation);
    document.getElementById('back-to-form').addEventListener('click', backToForm);
});

// Set default dates for events
function setDefaultDates() {
    const today = new Date();
    
    // Format date to YYYY-MM-DD for input[type="date"]
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Set engagement date (today)
    document.getElementById('engagement-date').value = formatDate(today);
    
    // Set haldi bride date (today + 1 day)
    const haldiBrideDate = new Date(today);
    haldiBrideDate.setDate(today.getDate() + 1);
    document.getElementById('haldi-bride-date').value = formatDate(haldiBrideDate);
    
    // Set haldi groom date (today + 1 day)
    document.getElementById('haldi-groom-date').value = formatDate(haldiBrideDate);
    
    // Set wedding date (today + 2 days)
    const weddingDate = new Date(today);
    weddingDate.setDate(today.getDate() + 2);
    document.getElementById('wedding-date').value = formatDate(weddingDate);
    
    // Set reception date (today + 2 days)
    document.getElementById('reception-date').value = formatDate(weddingDate);
}

// Generate quotation
function generateQuotation() {
    console.log('generateQuotation function called');
    
    const clientName = document.getElementById('client-name').value || 'Client';
    const clientPhone = document.getElementById('client-phone').value || 'N/A';
    const clientEmail = document.getElementById('client-email').value || 'N/A';
    const eventLocation = document.getElementById('event-location').value || 'Nellore';
    const packageCost = document.getElementById('package-cost').value || '3,50,000';
    
    // Get current date for quotation
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    
    // Format date for display
    function formatDisplayDate(dateString) {
        if (!dateString) return 'TBD';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }
    
    // Get event details
    const events = [
        {
            name: 'Engagement',
            date: formatDisplayDate(document.getElementById('engagement-date').value),
            time: document.getElementById('engagement-time').value,
            services: getSelectedServices('engagement')
        },
        {
            name: 'Haldi @ Bride',
            date: formatDisplayDate(document.getElementById('haldi-bride-date').value),
            time: document.getElementById('haldi-bride-time').value,
            services: getSelectedServices('haldi-bride')
        },
        {
            name: 'Haldi @ Groom',
            date: formatDisplayDate(document.getElementById('haldi-groom-date').value),
            time: document.getElementById('haldi-groom-time').value,
            services: getSelectedServices('haldi-groom')
        },
        {
            name: 'Wedding',
            date: formatDisplayDate(document.getElementById('wedding-date').value),
            time: document.getElementById('wedding-time').value,
            services: getSelectedServices('wedding')
        },
        {
            name: 'Reception',
            date: formatDisplayDate(document.getElementById('reception-date').value),
            time: document.getElementById('reception-time').value,
            services: getSelectedServices('reception')
        }
    ];
    
    // Get additional services
    const additionalServices = [];
    if (document.getElementById('albums').checked) {
        additionalServices.push('Premium Albums (100 sheets for groom + 100 sheets for bride)');
    }
    if (document.getElementById('full-length-videos').checked) {
        additionalServices.push('Full Length Videos for All Events');
    }
    if (document.getElementById('pre-post-shoot').checked) {
        additionalServices.push('Pre/Post Wedding Shoot (Complimentary)');
    }
    if (document.getElementById('invitations').checked) {
        additionalServices.push('Invitations for Engagement, Wedding and Reception');
    }
    if (document.getElementById('engagement-promo').checked) {
        additionalServices.push('Engagement Promo Video');
    }
    if (document.getElementById('haldi-promo').checked) {
        additionalServices.push('Haldi Promo Video');
    }
    if (document.getElementById('wedding-promo').checked) {
        additionalServices.push('Wedding Promo Video');
    }
    if (document.getElementById('reception-promo').checked) {
        additionalServices.push('Reception Promo Video');
    }
    
    // Generate HTML for quotation
    let quotationHTML = `
        <div class="quotation-header-content">
            <div class="quotation-logo">
                <h1 style="font-family: 'Dancing Script', cursive; color: #d32f2f; font-size: 2.5rem; text-align: center;">Sumuhurtham</h1>
                <p style="text-align: center; font-style: italic; color: #b71c1c;">We Make Memories...</p>
            </div>
            <h2 style="text-align: center; margin: 20px 0; color: #d32f2f;">Wedding Photography & Videography Quotation</h2>
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div>
                    <p><strong>Client:</strong> ${clientName}</p>
                    <p><strong>Phone:</strong> ${clientPhone}</p>
                    <p><strong>Email:</strong> ${clientEmail}</p>
                    <p><strong>Location:</strong> ${eventLocation}</p>
                </div>
                <div>
                    <p><strong>Quotation Date:</strong> ${formattedDate}</p>
                    <p><strong>Quotation #:</strong> SUM-${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
                </div>
            </div>
        </div>
        
        <div class="quotation-events">
            <h3 style="color: #b71c1c; margin-bottom: 10px;">Event Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #ffcdd2;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Event</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Time</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Services</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Add event rows
    events.forEach(event => {
        quotationHTML += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${event.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${event.date}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${event.time}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${event.services.join(', ')}</td>
            </tr>
        `;
    });
    
    quotationHTML += `
                </tbody>
            </table>
        </div>
        
        <div class="quotation-additional">
            <h3 style="color: #b71c1c; margin-bottom: 10px;">Additional Services</h3>
            <ul style="list-style-type: disc; padding-left: 20px; margin-bottom: 20px;">
    `;
    
    // Add additional services
    additionalServices.forEach(service => {
        quotationHTML += `<li style="margin-bottom: 5px;">${service}</li>`;
    });
    
    quotationHTML += `
            </ul>
        </div>
        
        <div class="quotation-equipment">
            <h3 style="color: #b71c1c; margin-bottom: 10px;">Equipment Information</h3>
            <ul style="list-style-type: disc; padding-left: 20px; margin-bottom: 20px;">
                <li style="margin-bottom: 5px;">Cameras used for video are Sony HD Cameras</li>
                <li style="margin-bottom: 5px;">Candid videography will be done with Nikon Z8, Sony S3 or Sony FX3 (which contains slider, steadycam, 7 lenses)</li>
            </ul>
        </div>
        
        <div class="quotation-package">
            <h3 style="color: #b71c1c; margin-bottom: 10px;">Package Details</h3>
            <p style="font-size: 1.2rem; margin-bottom: 10px;"><strong>Total Package Cost:</strong> ₹ ${packageCost} (Including transport)</p>
            <p style="margin-bottom: 5px;">• If couple shoot is out of Hyderabad, we will charge transport extra + accommodation + food</p>
            <p style="margin-bottom: 5px;">• We can also refer professional makeup artists on your request</p>
        </div>
        
        <div class="quotation-footer" style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px;">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p><strong>Sumuhurtham Wedding Photography & Videography</strong></p>
                    <p>Experienced, Creative & Professional Photographers</p>
                    <p>Hyderabad | With Over 10 Years of Experience</p>
                </div>
                <div style="text-align: right;">
                    <p><strong>Client Signature</strong></p>
                    <p style="margin-top: 30px;">_______________________</p>
                    <p>${clientName}</p>
                </div>
            </div>
        </div>
    `;
    
    // Display quotation
    console.log('Displaying quotation');
    document.getElementById('quotation-content').innerHTML = quotationHTML;
    
    // Hide form and show quotation
    const quoteForm = document.querySelector('.quote-form');
    const quotationOutput = document.getElementById('quotation-output');
    
    console.log('Quote form element:', quoteForm);
    console.log('Quotation output element:', quotationOutput);
    
    if (quoteForm) {
        quoteForm.classList.add('hidden');
    } else {
        console.error('Quote form element not found');
    }
    
    if (quotationOutput) {
        quotationOutput.classList.remove('hidden');
    } else {
        console.error('Quotation output element not found');
    }
}

// Get selected services for an event
function getSelectedServices(eventPrefix) {
    const services = [];
    
    if (document.getElementById(`${eventPrefix}-traditional`).checked) {
        services.push('Traditional Still Camera');
    }
    if (document.getElementById(`${eventPrefix}-candid`).checked) {
        services.push('Candid Photography');
    }
    if (document.getElementById(`${eventPrefix}-4k`).checked) {
        services.push('4K Video');
    }
    if (document.getElementById(`${eventPrefix}-led`).checked) {
        services.push('LED Screens');
    }
    if (document.getElementById(`${eventPrefix}-drone`).checked) {
        services.push('Drone');
    }
    if (document.getElementById(`${eventPrefix}-cinematic`).checked) {
        services.push('Cinematic Video');
    }
    
    return services.length > 0 ? services : ['None'];
}

// Reset form
function resetForm() {
    // Reset client information
    document.getElementById('client-name').value = '';
    document.getElementById('client-phone').value = '';
    document.getElementById('client-email').value = '';
    document.getElementById('event-location').value = 'Nellore';
    
    // Reset dates
    setDefaultDates();
    
    // Reset checkboxes to default values based on CSV data
    resetCheckboxes();
}

// Reset checkboxes to default values
function resetCheckboxes() {
    // Engagement
    document.getElementById('engagement-traditional').checked = true;
    document.getElementById('engagement-candid').checked = true;
    document.getElementById('engagement-4k').checked = true;
    document.getElementById('engagement-led').checked = false;
    document.getElementById('engagement-drone').checked = false;
    document.getElementById('engagement-cinematic').checked = true;
    
    // Haldi Bride
    document.getElementById('haldi-bride-traditional').checked = true;
    document.getElementById('haldi-bride-candid').checked = false;
    document.getElementById('haldi-bride-4k').checked = true;
    document.getElementById('haldi-bride-led').checked = false;
    document.getElementById('haldi-bride-drone').checked = false;
    document.getElementById('haldi-bride-cinematic').checked = false;
    
    // Haldi Groom
    document.getElementById('haldi-groom-traditional').checked = true;
    document.getElementById('haldi-groom-candid').checked = false;
    document.getElementById('haldi-groom-4k').checked = true;
    document.getElementById('haldi-groom-led').checked = false;
    document.getElementById('haldi-groom-drone').checked = false;
    document.getElementById('haldi-groom-cinematic').checked = false;
    
    // Wedding
    document.getElementById('wedding-traditional').checked = true;
    document.getElementById('wedding-candid').checked = true;
    document.getElementById('wedding-4k').checked = true;
    document.getElementById('wedding-led').checked = true;
    document.getElementById('wedding-drone').checked = true;
    document.getElementById('wedding-cinematic').checked = true;
    
    // Reception
    document.getElementById('reception-traditional').checked = true;
    document.getElementById('reception-candid').checked = true;
    document.getElementById('reception-4k').checked = true;
    document.getElementById('reception-led').checked = false;
    document.getElementById('reception-drone').checked = false;
    document.getElementById('reception-cinematic').checked = true;
    
    // Additional services
    document.getElementById('albums').checked = true;
    document.getElementById('full-length-videos').checked = true;
    document.getElementById('pre-post-shoot').checked = true;
    document.getElementById('invitations').checked = true;
    document.getElementById('engagement-promo').checked = true;
    document.getElementById('haldi-promo').checked = true;
    document.getElementById('wedding-promo').checked = true;
    document.getElementById('reception-promo').checked = true;
    
    // Package cost
    document.getElementById('package-cost').value = '3,50,000';
}

// Print quotation
function printQuotation() {
    window.print();
}

// Back to form
function backToForm() {
    console.log('Back to form clicked');
    const quoteForm = document.querySelector('.quote-form');
    const quotationOutput = document.getElementById('quotation-output');
    
    if (quoteForm) {
        quoteForm.classList.remove('hidden');
    } else {
        console.error('Quote form element not found');
    }
    
    if (quotationOutput) {
        quotationOutput.classList.add('hidden');
    } else {
        console.error('Quotation output element not found');
    }
}