import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, DollarSign, Star, Filter, Car, Plane, Train } from 'lucide-react';

// Sample destination data - will be expanded with API integration
const sampleDestinations = [
  {
    id: 'luray-va',
    name: 'Luray, Virginia',
    coordinates: [38.6635, -78.4330],
    driving: {
      fromFuquay: { time: 195, distance: 180, cost: 25 }, // time in minutes
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
  },
  {
    id: 'richmond-va',
    name: 'Richmond, Virginia',
    coordinates: [37.5407, -77.4360],
    driving: {
      fromFuquay: { time: 150, distance: 135, cost: 20 },
      fromFarmingdale: { time: 360, distance: 350, cost: 45 }
    },
    flights: {
      fromFuquay: { time: 90, cost: 160, connections: 1 },
      fromFarmingdale: { time: 75, cost: 140, connections: 0 }
    },
    trains: {
      fromFuquay: { time: 360, cost: 65, connections: 1 },
      fromFarmingdale: { time: 480, cost: 95, connections: 2 }
    },
    scores: {
      timeEquality: 0.65,
      costEquality: 0.78,
      overall: 0.71
    }
  },
  {
    id: 'washington-dc',
    name: 'Washington, DC',
    coordinates: [38.9072, -77.0369],
    driving: {
      fromFuquay: { time: 240, distance: 260, cost: 35 },
      fromFarmingdale: { time: 300, distance: 250, cost: 32 }
    },
    flights: {
      fromFuquay: { time: 75, cost: 200, connections: 0 },
      fromFarmingdale: { time: 60, cost: 180, connections: 0 }
    },
    trains: {
      fromFuquay: { time: 420, cost: 120, connections: 1 },
      fromFarmingdale: { time: 240, cost: 85, connections: 0 }
    },
    scores: {
      timeEquality: 0.92,
      costEquality: 0.95,
      overall: 0.93
    }
  }
];

export default function InteractiveMap({ destinations = sampleDestinations, filters, onFiltersChange }) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]); // Center of US
  const [mapZoom, setMapZoom] = useState(4);
  const [showRoutes, setShowRoutes] = useState(true);

  // Filter destinations based on tolerances
  const filteredDestinations = destinations.filter(dest => {
    const timeDiff = Math.abs(dest.driving.fromFuquay.time - dest.driving.fromFarmingdale.time);
    const costDiff = Math.abs(dest.driving.fromFuquay.cost - dest.driving.fromFarmingdale.cost);
    
    return timeDiff <= filters.timeTolerance && costDiff <= filters.costTolerance;
  });

  const getMarkerColor = (score) => {
    if (score >= 0.9) return 'bg-green-500';
    if (score >= 0.8) return 'bg-blue-500';
    if (score >= 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Interactive Map</h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showRoutes}
                onChange={(e) => setShowRoutes(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Show Routes</span>
            </label>
            <button
              onClick={() => setMapZoom(mapZoom + 1)}
              className="p-2 text-gray-600 hover:text-gray-900 border rounded"
            >
              +
            </button>
            <button
              onClick={() => setMapZoom(Math.max(2, mapZoom - 1))}
              className="p-2 text-gray-600 hover:text-gray-900 border rounded"
            >
              -
            </button>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">Time Tolerance</span>
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div className="mt-1">
              <input
                type="range"
                min="15"
                max="180"
                step="15"
                value={filters.timeTolerance}
                onChange={(e) => onFiltersChange({...filters, timeTolerance: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="text-xs text-blue-700 mt-1">±{filters.timeTolerance} minutes</div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-900">Cost Tolerance</span>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="mt-1">
              <input
                type="range"
                min="25"
                max="300"
                step="25"
                value={filters.costTolerance}
                onChange={(e) => onFiltersChange({...filters, costTolerance: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="text-xs text-green-700 mt-1">±${filters.costTolerance}</div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-900">Matching Destinations</span>
              <MapPin className="h-4 w-4 text-purple-600" />
            </div>
            <div className="mt-1">
              <div className="text-2xl font-bold text-purple-700">{filteredDestinations.length}</div>
              <div className="text-xs text-purple-600">of {destinations.length} total</div>
            </div>
          </div>
        </div>

        {/* Simple Map Visualization */}
        <div className="bg-gray-100 rounded-lg h-96 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
            {/* Map placeholder - in real implementation would use Leaflet or similar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Interactive Map</p>
                <p className="text-sm text-gray-500">Showing {filteredDestinations.length} destinations</p>
              </div>
            </div>

            {/* Origin markers */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-red-500 rounded-full p-2 shadow-lg">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white rounded px-2 py-1 text-xs font-medium mt-1 shadow">Fuquay Varina</div>
            </div>

            <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-500 rounded-full p-2 shadow-lg">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white rounded px-2 py-1 text-xs font-medium mt-1 shadow">Farmingdale</div>
            </div>

            {/* Destination markers */}
            {filteredDestinations.map((dest, index) => (
              <div
                key={dest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  top: `${30 + (index * 15)}%`,
                  left: `${40 + (index * 10)}%`
                }}
                onClick={() => setSelectedDestination(dest)}
              >
                <div className={`${getMarkerColor(dest.scores.overall)} rounded-full p-2 shadow-lg`}>
                  <Star className="h-3 w-3 text-white" />
                </div>
                <div className="bg-white rounded px-2 py-1 text-xs font-medium mt-1 shadow whitespace-nowrap">
                  {dest.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Destination Details */}
      {selectedDestination && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{selectedDestination.name}</h3>
            <button
              onClick={() => setSelectedDestination(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Driving */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-green-700">
                <Car className="h-5 w-5" />
                <span className="font-medium">Driving</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">From Fuquay:</span>
                  <span className="font-medium">{formatTime(selectedDestination.driving.fromFuquay.time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">From Farmingdale:</span>
                  <span className="font-medium">{formatTime(selectedDestination.driving.fromFarmingdale.time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Difference:</span>
                  <span className="font-medium">
                    {Math.abs(selectedDestination.driving.fromFuquay.time - selectedDestination.driving.fromFarmingdale.time)} min
                  </span>
                </div>
              </div>
            </div>

            {/* Flights */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-blue-700">
                <Plane className="h-5 w-5" />
                <span className="font-medium">Flights</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">From Fuquay:</span>
                  <span className="font-medium">${selectedDestination.flights.fromFuquay.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">From Farmingdale:</span>
                  <span className="font-medium">${selectedDestination.flights.fromFarmingdale.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost Difference:</span>
                  <span className="font-medium">
                    ${Math.abs(selectedDestination.flights.fromFuquay.cost - selectedDestination.flights.fromFarmingdale.cost)}
                  </span>
                </div>
              </div>
            </div>

            {/* Trains */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-purple-700">
                <Train className="h-5 w-5" />
                <span className="font-medium">Trains</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">From Fuquay:</span>
                  <span className="font-medium">${selectedDestination.trains.fromFuquay.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">From Farmingdale:</span>
                  <span className="font-medium">${selectedDestination.trains.fromFarmingdale.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost Difference:</span>
                  <span className="font-medium">
                    ${Math.abs(selectedDestination.trains.fromFuquay.cost - selectedDestination.trains.fromFarmingdale.cost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Overall Match Score:</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${selectedDestination.scores.overall * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-green-600">
                  {Math.round(selectedDestination.scores.overall * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Match Quality</h4>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Excellent (90%+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Good (80-89%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Fair (70-79%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Poor (&lt;70%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
