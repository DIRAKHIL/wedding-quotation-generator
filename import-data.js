// CSV Import Script for Sumuhurtham Wedding Quotation Generator

document.addEventListener('DOMContentLoaded', function() {
    // Function to parse CSV data
    async function parseCSV() {
        try {
            const response = await fetch('Ashok wedding quote - 2.csv');
            const csvText = await response.text();
            const rows = csvText.split('\n').map(row => row.split(','));
            
            // Extract client information
            const clientName = "Ashok Kumar"; // Default name from filename
            const clientPhone = "";
            const clientEmail = "";
            const eventLocation = rows[8][9] || "Nellore"; // Location from Engagement row
            
            // Parse events
            const events = [];
            
            // Engagement (row 8)
            if (rows[8] && rows[8].length > 8) {
                events.push({
                    name: "Engagement",
                    date: convertDateFormat(rows[8][0]), // Aug 10th
                    time: convertTimeFormat(rows[8][1]),
                    services: {
                        traditional: rows[8][3] === "1",
                        candid: rows[8][4] === "1",
                        video4k: rows[8][5] === "1",
                        ledScreens: rows[8][6] === "1",
                        drone: rows[8][7] === "1",
                        cinematic: rows[8][8] === "1"
                    }
                });
            }
            
            // Haldi @ Bride (row 10)
            if (rows[10] && rows[10].length > 8) {
                events.push({
                    name: "Haldi @ Bride",
                    date: convertDateFormat(rows[10][0]),
                    time: convertTimeFormat(rows[10][1]),
                    services: {
                        traditional: rows[10][3] === "1",
                        candid: rows[10][4] === "1",
                        video4k: rows[10][5] === "1",
                        ledScreens: rows[10][6] === "1",
                        drone: rows[10][7] === "1",
                        cinematic: rows[10][8] === "1"
                    }
                });
            }
            
            // Haldi @ Groom (row 12)
            if (rows[12] && rows[12].length > 8) {
                events.push({
                    name: "Haldi @ Groom",
                    date: convertDateFormat(rows[12][0]),
                    time: convertTimeFormat(rows[12][1]),
                    services: {
                        traditional: rows[12][3] === "1",
                        candid: rows[12][4] === "1",
                        video4k: rows[12][5] === "1",
                        ledScreens: rows[12][6] === "1",
                        drone: rows[12][7] === "1",
                        cinematic: rows[12][8] === "1"
                    }
                });
            }
            
            // Wedding (row 14)
            if (rows[14] && rows[14].length > 8) {
                events.push({
                    name: "Wedding",
                    date: convertDateFormat(rows[14][0]),
                    time: convertTimeFormat(rows[14][1]),
                    services: {
                        traditional: rows[14][3] === "1",
                        candid: rows[14][4] === "1",
                        video4k: rows[14][5] === "1",
                        ledScreens: rows[14][6] === "1",
                        drone: rows[14][7] === "1",
                        cinematic: rows[14][8] === "1"
                    }
                });
            }
            
            // Reception (row 16)
            if (rows[16] && rows[16].length > 8) {
                events.push({
                    name: "Reception",
                    date: convertDateFormat(rows[16][0]),
                    time: convertTimeFormat(rows[16][1]),
                    services: {
                        traditional: rows[16][3] === "1",
                        candid: rows[16][4] === "1",
                        video4k: rows[16][5] === "1",
                        ledScreens: rows[16][6] === "1",
                        drone: rows[16][7] === "1",
                        cinematic: rows[16][8] === "1"
                    }
                });
            }
            
            // Additional services
            const additionalServices = {
                albums: true, // Row 18-19
                fullLengthVideos: true, // Row 22
                prePostShoot: true, // Row 24
                invitations: true, // Row 26
                engagementPromo: true, // Row 29
                haldiPromo: true, // Row 31
                weddingPromo: true, // Row 33
                receptionPromo: true // Row 35
            };
            
            // Package cost (row 52)
            let packageCost = "3,50,000";
            if (rows[52] && rows[52].length > 1) {
                const costText = rows[52][1];
                if (costText.includes("3.50")) {
                    packageCost = "3,50,000";
                }
            }
            
            return {
                clientName,
                clientPhone,
                clientEmail,
                eventLocation,
                weddingDate: convertDateFormat(rows[8][0]) || "2025-08-10", // Use engagement date as wedding date
                events,
                additionalServices,
                packageCost
            };
        } catch (error) {
            console.error("Error parsing CSV:", error);
            // Return default data if CSV parsing fails
            return {
                clientName: "Ashok Kumar",
                clientPhone: "",
                clientEmail: "",
                eventLocation: "Nellore",
                weddingDate: "2025-08-10",
                events: [],
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
        }
    }
    
    // Helper function to convert date format from "Aug 10th" to "2025-08-10"
    function convertDateFormat(dateStr) {
        if (!dateStr) return "";
        
        const months = {
            "jan": "01", "feb": "02", "mar": "03", "apr": "04", "may": "05", "jun": "06",
            "jul": "07", "aug": "08", "sep": "09", "oct": "10", "nov": "11", "dec": "12"
        };
        
        try {
            const parts = dateStr.toLowerCase().trim().split(' ');
            if (parts.length >= 2) {
                const month = months[parts[0].substring(0, 3)];
                let day = parts[1].replace(/[^0-9]/g, '');
                day = day.padStart(2, '0');
                
                if (month && day) {
                    return `2025-${month}-${day}`;
                }
            }
        } catch (e) {
            console.error("Date conversion error:", e);
        }
        
        return "";
    }
    
    // Helper function to convert time format from "mor" to "Morning"
    function convertTimeFormat(timeStr) {
        if (!timeStr) return "Morning";
        
        const time = timeStr.toLowerCase().trim();
        if (time.includes("mor")) return "Morning";
        if (time.includes("eve")) return "Evening";
        if (time.includes("full")) return "Full Day";
        
        return "Morning"; // Default
    }
    
    // Parse CSV and populate form
    let csvData = null;
    
    parseCSV().then(data => {
        csvData = data;
        populateForm();
    });

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