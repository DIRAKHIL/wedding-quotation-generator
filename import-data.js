// CSV Import Script for Sumuhurtham Wedding Quotation Generator

document.addEventListener('DOMContentLoaded', function() {
    // Sample data from CSV
    const csvData = {
        clientName: "Ashok Kumar",
        clientPhone: "",
        clientEmail: "",
        eventLocation: "Nellore",
        weddingDate: "2025-08-10", // Aug 10th
        events: [
            {
                name: "Engagement",
                date: "2025-08-10", // Aug 10th
                time: "Morning",
                services: {
                    traditional: true,
                    candid: true,
                    video4k: true,
                    ledScreens: false,
                    drone: false,
                    cinematic: true
                }
            },
            {
                name: "Haldi @ Bride",
                date: "", // Date not specified
                time: "Morning",
                services: {
                    traditional: true,
                    candid: false,
                    video4k: true,
                    ledScreens: false,
                    drone: false,
                    cinematic: false
                }
            },
            {
                name: "Haldi @ Groom",
                date: "", // Date not specified
                time: "Morning",
                services: {
                    traditional: true,
                    candid: false,
                    video4k: true,
                    ledScreens: false,
                    drone: false,
                    cinematic: false
                }
            },
            {
                name: "Wedding",
                date: "", // Date not specified
                time: "Morning",
                services: {
                    traditional: true,
                    candid: true,
                    video4k: true,
                    ledScreens: true,
                    drone: true,
                    cinematic: true
                }
            },
            {
                name: "Reception",
                date: "", // Date not specified
                time: "Evening",
                services: {
                    traditional: true,
                    candid: true,
                    video4k: true,
                    ledScreens: false,
                    drone: false,
                    cinematic: true
                }
            }
        ],
        additionalServices: {
            albums: true,
            fullLengthVideos: true,
            prePostShoot: true,
            invitations: true,
            engagementPromo: true,
            haldiPromo: true,
            weddingPromo: true,
            receptionPromo: true
        },
        packageCost: "3,50,000"
    };

    // Function to populate form with CSV data
    function populateForm() {
        // Client Information
        if (document.getElementById('client-name'))
            document.getElementById('client-name').value = csvData.clientName;
        if (document.getElementById('client-phone'))
            document.getElementById('client-phone').value = csvData.clientPhone;
        if (document.getElementById('client-email'))
            document.getElementById('client-email').value = csvData.clientEmail;
        if (document.getElementById('event-location'))
            document.getElementById('event-location').value = csvData.eventLocation;
        if (document.getElementById('wedding-date'))
            document.getElementById('wedding-date').value = csvData.weddingDate;
    }

    // Call the function to populate the form
    populateForm();
});