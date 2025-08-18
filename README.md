# DataChannel ROI Calculator

A modern, interactive ROI calculator that compares DataChannel's ETL pricing with Fivetran's pricing model.

## Features

- **Interactive Sliders**: Adjust number of connectors and monthly rows with real-time updates
- **Additional Needs**: Toggle add-ons like Reverse ETL, Ask Neo (AI Data Analyst), and Managed Data Warehouse
- **Real-time Calculations**: See cost comparisons and annual savings update instantly
- **Modern UI**: Clean, responsive design with smooth animations
- **Mobile Responsive**: Works perfectly on desktop and mobile devices

## Pricing Model

### Fivetran Pricing
- $2 per connector
- $0.5 per million rows

### DataChannel Pricing
- $1.5 per million rows
- Add-ons:
  - Reverse ETL: $200/month
  - Ask Neo (AI Data Analyst): $300/month
  - Managed Data Warehouse: $400/month

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ROI-Calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with modern CSS features
- **Inter Font**: Clean, readable typography

## Project Structure

```
src/
├── components/
│   ├── Slider.jsx          # Custom slider component
│   ├── Slider.css
│   ├── Checkbox.jsx        # Custom checkbox component
│   ├── Checkbox.css
│   ├── SavingsCard.jsx     # Savings display component
│   └── SavingsCard.css
├── App.jsx                 # Main application component
├── App.css                 # Main application styles
├── main.jsx               # React entry point
└── index.css              # Global styles
```

## Customization

### Pricing Model
You can easily modify the pricing calculations in `src/App.jsx`:

```javascript
const calculateFivetranCost = () => {
  // Modify Fivetran pricing logic here
  const connectorCost = connectors * 2
  const rowCost = (monthlyRows / 100) * 0.5
  return Math.round(connectorCost + rowCost)
}

const calculateDataChannelCost = () => {
  // Modify DataChannel pricing logic here
  let baseCost = (monthlyRows / 100) * 1.5
  
  // Modify add-ons pricing here
  if (additionalNeeds.reverseETL) baseCost += 200
  if (additionalNeeds.askNeo) baseCost += 300
  if (additionalNeeds.managedDataWarehouse) baseCost += 400
  
  return Math.round(baseCost)
}
```

### Styling
The application uses modern CSS with CSS custom properties. You can customize colors, fonts, and layout by modifying the CSS files.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License. 