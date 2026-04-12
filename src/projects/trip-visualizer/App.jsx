import React, { useState } from 'react';
import { MapPin, Car, Plane, Train, Filter, BarChart3 } from 'lucide-react';

// Import components (will be created)
import InteractiveMap from './components/InteractiveMap';
import DrivingComparison from './components/DrivingComparison';
import FlightOptions from './components/FlightOptions';
import TrainRoutes from './components/TrainRoutes';

// Import data
import { destinations } from './data/destinations';

const SECTIONS = [
  { key: 'overview', label: 'Interactive Map', icon: MapPin, component: InteractiveMap },
  { key: 'driving-comparison', label: 'Driving Analysis', icon: Car, component: DrivingComparison },
  { key: 'flight-options', label: 'Flight Comparisons', icon: Plane, component: FlightOptions },
  { key: 'train-routes', label: 'Train Possibilities', icon: Train, component: TrainRoutes },
];

export default function TripVisualizer() {
  const [activeSection, setActiveSection] = useState('overview');
  const [filters, setFilters] = useState({
    timeTolerance: 60, // minutes
    costTolerance: 100, // dollars
    travelModes: ['driving', 'flights', 'trains'],
    searchRadius: 500 // miles
  });

  const ActiveComponent = SECTIONS.find(s => s.key === activeSection)?.component || InteractiveMap;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Trip Visualizer</h1>
                <p className="text-sm text-gray-500">
                  Compare travel from Fuquay Varina, NC ↔ Farmingdale, NY
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                ±{filters.timeTolerance}min • ±${filters.costTolerance}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === section.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ActiveComponent 
          destinations={destinations}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </main>
    </div>
  );
}
