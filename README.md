# Trip Visualizer 🗺️

A simple, self-contained HTML travel comparison tool that finds optimal meeting destinations between two locations.

## 🎯 Purpose

Trip Visualizer helps couples and friends find fair meeting points where travel times and costs are balanced. Compares travel options between:

- **Fuquay Varina, NC (27526)** 
- **Farmingdale, NY (11735)**

## ✨ Features

- � **One-click update** - Refresh all calculations instantly
- 🚗 **Driving estimates** - Time and cost calculations
- ✈️ **Flight analysis** - Cost and duration estimates
- 🚂 **Train options** - Amtrak-style routing
- 🏆 **Fairness scoring** - Ranked by how equal the travel is
- 💾 **API key storage** - Saves keys in browser localStorage

## 🏆 Top Destinations

Based on current data, the best meeting destinations include:

1. **Washington, DC** - 93% overall match
2. **Pittsburgh, PA** - 94% overall match  
3. **Luray, Virginia** - 88% overall match
4. **Baltimore, MD** - 86% overall match
5. **Richmond, VA** - 71% overall match

## � Getting Started

### Option 1: Open Locally (Easiest)
Simply double-click `index.html` - it works immediately!

### Option 2: View Online
Visit: https://rasquatch.github.io/trip_visualizer/

### Option 3: Local Server (Optional)
```bash
npx serve .
# Then open http://localhost:3000
```

## 📁 Files

- **index.html** - Main application (single self-contained file)
- **trip-visualizer-live.html** - Backup copy

## � Customization

### Adding New Destinations

Edit the `DESTINATIONS` array in `index.html`:

```javascript
const DESTINATIONS = [
  { name: "Your City, State", lat: 00.0000, lon: -00.0000, state: "XX" },
  // ... more destinations
];
```

### Changing Origin Locations

Update the `ORIGIN_A` and `ORIGIN_B` constants at the top of `index.html`:

```javascript
const ORIGIN_A = { name: "Your Location A", lat: 00.0000, lon: -00.0000 };
const ORIGIN_B = { name: "Your Location B", lat: 00.0000, lon: -00.0000 };
```

## � API Integration (Optional)

The app includes input fields for:
- **OpenRouteService API** - Real driving directions and times
- **Amadeus API** - Live flight pricing and availability

Paste your API keys in the config panel and click Update. Keys are saved to browser localStorage.

## 🗺️ Future Enhancements

- Real API integration for live data
- Interactive map visualization
- More destination options
- Mobile-responsive improvements

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
