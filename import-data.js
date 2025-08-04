// CSV Import Script for Sumuhurtham Wedding Quotation Generator

document.addEventListener('DOMContentLoaded', function() {
    // Sample data from CSV
    const csvData = {
        clientName: "Ashok Kumar",
        clientPhone: "",
        clientEmail: "",
        eventLocation: "Nellore",
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
        document.getElementById('client-name').value = csvData.clientName;
        document.getElementById('client-phone').value = csvData.clientPhone;
        document.getElementById('client-email').value = csvData.clientEmail;
        document.getElementById('event-location').value = csvData.eventLocation;

        // Events
        csvData.events.forEach(event => {
            switch(event.name) {
                case "Engagement":
                    if (document.getElementById('engagement-date')) {
                        document.getElementById('engagement-date').value = event.date;
                        document.getElementById('engagement-time').value = event.time;
                        
                        if (document.getElementById('engagement-traditional'))
                            document.getElementById('engagement-traditional').checked = event.services.traditional;
                        if (document.getElementById('engagement-candid'))
                            document.getElementById('engagement-candid').checked = event.services.candid;
                        if (document.getElementById('engagement-4k'))
                            document.getElementById('engagement-4k').checked = event.services.video4k;
                        if (document.getElementById('engagement-led'))
                            document.getElementById('engagement-led').checked = event.services.ledScreens;
                        if (document.getElementById('engagement-drone'))
                            document.getElementById('engagement-drone').checked = event.services.drone;
                        if (document.getElementById('engagement-cinematic'))
                            document.getElementById('engagement-cinematic').checked = event.services.cinematic;
                    }
                    break;
                case "Haldi @ Bride":
                    if (document.getElementById('haldi-bride-date')) {
                        document.getElementById('haldi-bride-date').value = event.date;
                        document.getElementById('haldi-bride-time').value = event.time;
                        
                        if (document.getElementById('haldi-bride-traditional'))
                            document.getElementById('haldi-bride-traditional').checked = event.services.traditional;
                        if (document.getElementById('haldi-bride-candid'))
                            document.getElementById('haldi-bride-candid').checked = event.services.candid;
                        if (document.getElementById('haldi-bride-4k'))
                            document.getElementById('haldi-bride-4k').checked = event.services.video4k;
                        if (document.getElementById('haldi-bride-led'))
                            document.getElementById('haldi-bride-led').checked = event.services.ledScreens;
                        if (document.getElementById('haldi-bride-drone'))
                            document.getElementById('haldi-bride-drone').checked = event.services.drone;
                        if (document.getElementById('haldi-bride-cinematic'))
                            document.getElementById('haldi-bride-cinematic').checked = event.services.cinematic;
                    }
                    break;
                case "Haldi @ Groom":
                    if (document.getElementById('haldi-groom-date')) {
                        document.getElementById('haldi-groom-date').value = event.date;
                        document.getElementById('haldi-groom-time').value = event.time;
                        
                        if (document.getElementById('haldi-groom-traditional'))
                            document.getElementById('haldi-groom-traditional').checked = event.services.traditional;
                        if (document.getElementById('haldi-groom-candid'))
                            document.getElementById('haldi-groom-candid').checked = event.services.candid;
                        if (document.getElementById('haldi-groom-4k'))
                            document.getElementById('haldi-groom-4k').checked = event.services.video4k;
                        if (document.getElementById('haldi-groom-led'))
                            document.getElementById('haldi-groom-led').checked = event.services.ledScreens;
                        if (document.getElementById('haldi-groom-drone'))
                            document.getElementById('haldi-groom-drone').checked = event.services.drone;
                        if (document.getElementById('haldi-groom-cinematic'))
                            document.getElementById('haldi-groom-cinematic').checked = event.services.cinematic;
                    }
                    break;
                case "Wedding":
                    if (document.getElementById('wedding-date')) {
                        document.getElementById('wedding-date').value = event.date;
                        document.getElementById('wedding-time').value = event.time;
                        
                        if (document.getElementById('wedding-traditional'))
                            document.getElementById('wedding-traditional').checked = event.services.traditional;
                        if (document.getElementById('wedding-candid'))
                            document.getElementById('wedding-candid').checked = event.services.candid;
                        if (document.getElementById('wedding-4k'))
                            document.getElementById('wedding-4k').checked = event.services.video4k;
                        if (document.getElementById('wedding-led'))
                            document.getElementById('wedding-led').checked = event.services.ledScreens;
                        if (document.getElementById('wedding-drone'))
                            document.getElementById('wedding-drone').checked = event.services.drone;
                        if (document.getElementById('wedding-cinematic'))
                            document.getElementById('wedding-cinematic').checked = event.services.cinematic;
                    }
                    break;
                case "Reception":
                    if (document.getElementById('reception-date')) {
                        document.getElementById('reception-date').value = event.date;
                        document.getElementById('reception-time').value = event.time;
                        
                        if (document.getElementById('reception-traditional'))
                            document.getElementById('reception-traditional').checked = event.services.traditional;
                        if (document.getElementById('reception-candid'))
                            document.getElementById('reception-candid').checked = event.services.candid;
                        if (document.getElementById('reception-4k'))
                            document.getElementById('reception-4k').checked = event.services.video4k;
                        if (document.getElementById('reception-led'))
                            document.getElementById('reception-led').checked = event.services.ledScreens;
                        if (document.getElementById('reception-drone'))
                            document.getElementById('reception-drone').checked = event.services.drone;
                        if (document.getElementById('reception-cinematic'))
                            document.getElementById('reception-cinematic').checked = event.services.cinematic;
                    }
                    break;
            }
        });

        // Additional Services
        if (document.getElementById('albums'))
            document.getElementById('albums').checked = csvData.additionalServices.albums;
        if (document.getElementById('full-length-videos'))
            document.getElementById('full-length-videos').checked = csvData.additionalServices.fullLengthVideos;
        if (document.getElementById('pre-post-shoot'))
            document.getElementById('pre-post-shoot').checked = csvData.additionalServices.prePostShoot;
        if (document.getElementById('invitations'))
            document.getElementById('invitations').checked = csvData.additionalServices.invitations;
        if (document.getElementById('engagement-promo'))
            document.getElementById('engagement-promo').checked = csvData.additionalServices.engagementPromo;
        if (document.getElementById('haldi-promo'))
            document.getElementById('haldi-promo').checked = csvData.additionalServices.haldiPromo;
        if (document.getElementById('wedding-promo'))
            document.getElementById('wedding-promo').checked = csvData.additionalServices.weddingPromo;
        if (document.getElementById('reception-promo'))
            document.getElementById('reception-promo').checked = csvData.additionalServices.receptionPromo;

        // Package Cost
        if (document.getElementById('package-cost'))
            document.getElementById('package-cost').value = csvData.packageCost;
    }

    // Call the function to populate the form
    populateForm();
});