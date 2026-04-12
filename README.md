# Trip Visualizer 🗺️

A travel comparison tool that helps find optimal meeting destinations between two locations by comparing travel times and costs across different transportation modes.

## 🎯 Purpose

Trip Visualizer was designed to help couples and friends find fair meeting points where travel times and costs are balanced between two starting locations. The initial use case compares travel options between:

- **Fuquay Varina, NC (27526)** 
- **Farmingdale, NY (11735)**

With customizable tolerances for:
- **Time difference**: ±1 hour (adjustable)
- **Cost difference**: ±$100 (adjustable)

## ✨ Features

### 🗺️ Interactive Map
- Visual exploration of destinations with color-coded match quality
- Adjustable time and cost tolerance filters
- Real-time destination filtering
- Click destinations for detailed travel breakdowns

### 🚗 Driving Analysis
- Comprehensive road trip comparisons
- Time and cost balancing between both locations
- Distance and estimated fuel costs
- Sort by best match, time balance, or cost balance

### ✈️ Flight Comparisons
- Air travel options with pricing analysis
- Connection information and flight durations
- Multiple airport considerations
- Real-time cost difference calculations

### 🚂 Train Routes
- Amtrak route analysis and recommendations
- Connection details and travel times
- Regional rail service information
- Cost-effective travel alternatives

## 🏆 Top Destinations

Based on current data, the best meeting destinations include:

1. **Washington, DC** - 93% overall match
2. **Pittsburgh, PA** - 94% overall match  
3. **Luray, Virginia** - 88% overall match
4. **Baltimore, MD** - 86% overall match
5. **Richmond, VA** - 71% overall match

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tools**: Vite, PostCSS, Autoprefixer

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Rasquatch/trip_visualizer.git
cd trip_visualizer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
# Start dev server (http://localhost:3000)
npm run dev

# Run validation and build
npm run validate

# Preview production build
npm run preview
```

## 📊 Data Structure

Destinations are structured with travel information for each mode:

```javascript
{
  id: 'destination-id',
  name: 'Destination Name',
  coordinates: [lat, lng],
  driving: {
    fromFuquay: { time: 195, distance: 180, cost: 25 },
    fromFarmingdale: { time: 270, distance: 280, cost: 35 }
  },
  flights: {
    fromFuquay: { time: 120, cost: 180, connections: 1 },
    fromFarmingdale: { time: 90, cost: 150, connections: 0 }
  },
  trains: {
    fromFuquay: { time: 480, cost: 85, connections: 2 },
    fromFarmingdale: { time: 420, cost: 75, connections: 1 }
  },
  scores: {
    timeEquality: 0.85,
    costEquality: 0.92,
    overall: 0.88
  }
}
```

## 🔧 Customization

### Adding New Destinations

1. Edit `src/data/destinations.js`
2. Add new destination objects following the structure above
3. Include coordinates for map visualization
4. Update scores based on your equality criteria

### Adjusting Tolerances

Modify the default filters in `src/App.jsx`:

```javascript
const [filters, setFilters] = useState({
  timeTolerance: 60,    // minutes
  costTolerance: 100,   // dollars
  travelModes: ['driving', 'flights', 'trains'],
  searchRadius: 500     // miles
});
```

### Changing Origin Locations

Update destination data calculations in `src/data/destinations.js` to use different starting points.

## 🗺️ Future Enhancements

- **Real-time APIs**: OpenRouteService for driving, Amadeus for flights, Amtrak for trains
- **Interactive Maps**: Leaflet integration with true zoom/pan functionality
- **Route Visualization**: Show actual travel paths on map
- **Weather Integration**: Add weather considerations for travel planning
- **Booking Integration**: Direct links to booking platforms
- **Mobile App**: React Native version for on-the-go planning

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created by [Rasquatch](https://github.com/Rasquatch) - helping couples and friends find perfect meeting spots! 🎯

---

**Made with ❤️ for fair travel planning**
