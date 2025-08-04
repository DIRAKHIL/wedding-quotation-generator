# Sumuhurtham Wedding Photography & Videography Quotation Generator

A professional web application for creating customized wedding photography and videography quotations for Sumuhurtham.

## Features

- **Client Information Management**: Easily input and manage client details
- **Event Selection & Configuration**: Customize events and their details
- **Service Configuration**: Select and customize services for each event
- **Additional Services**: Add extra services to enhance the package
- **Package Customization**: Adjust package details and pricing
- **Quotation Generation**: Create professional, print-ready quotations
- **Save & Load**: Save quotations for later use and load them when needed
- **PDF Export**: Download quotations as PDF files
- **Print Optimization**: Properly formatted for A4 printing

## Getting Started

### Prerequisites

- Node.js (for running the server)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sumuhurtham-quotation-generator.git
   ```

2. Navigate to the project directory:
   ```
   cd sumuhurtham-quotation-generator
   ```

3. Start the server:
   ```
   node server.js
   ```

4. Open your browser and go to:
   ```
   http://localhost:12000
   ```

## Usage Guide

### 1. Client Information

- Fill in the client's details (name, phone, email, location)
- Set the wedding date
- Click "Next: Event Selection" to proceed

### 2. Event Selection

- Toggle events you want to include in the package
- Add custom events if needed
- Click "Next: Service Configuration" to proceed

### 3. Service Configuration

- Select the tab for each event
- Configure date and time for the event
- Select services for each event
- Customize pricing for each service
- Click "Next: Additional Services" to proceed

### 4. Additional Services

- Toggle additional services you want to include
- Customize pricing for each service
- Add custom services if needed
- Click "Next: Package Details" to proceed

### 5. Package Details

- Review the package summary
- Adjust the total package cost if needed
- Add custom notes if required
- Click "Generate Quotation" to create the quotation
- Click "Save Quotation" to save for later use

### 6. Quotation Output

- Review the generated quotation
- Print the quotation or download as PDF
- Click "Back to Form" to make changes

### 7. Saved Quotes

- View all saved quotations
- Load a saved quotation to edit
- Delete unwanted quotations

## Customization

### Adding New Default Events

Edit the `defaultEvents` array in `script-v2.js`:

```javascript
const defaultEvents = [
    { id: 'new-event', name: 'New Event', icon: 'fas fa-icon', services: ['traditional', 'candid'] },
    // other events...
];
```

### Adding New Service Types

Edit the `serviceDefinitions` object in `script-v2.js`:

```javascript
const serviceDefinitions = {
    'new-service': { name: 'New Service', basePrice: 10000, icon: 'fas fa-icon' },
    // other services...
};
```

## Printing & PDF Generation

The application is optimized for A4 printing with proper page breaks and formatting. When generating PDFs, page numbers are automatically added for multi-page documents.

## Technical Details

- Built with HTML5, CSS3, and JavaScript
- Uses Font Awesome for icons
- Google Fonts for typography
- HTML2PDF.js for PDF generation
- Local Storage for saving quotations
- Responsive design for all device sizes
- Print-optimized styling

## Running the Application

The application can be run by using the included Node.js server:

```bash
node server.js
```

Then open your browser and navigate to: http://localhost:12000

## Browser Compatibility

The application is compatible with all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Credits

- Developed for Sumuhurtham Wedding Photography & Videography
- Based on the service offerings and pricing from Sumuhurtham
- Logo and branding elements from Sumuhurtham's official materials