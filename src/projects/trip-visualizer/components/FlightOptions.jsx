import React, { useState } from 'react';
import { Plane, Clock, DollarSign, TrendingUp, AlertCircle, MapPin } from 'lucide-react';

export default function FlightOptions({ destinations, filters }) {
  const [sortBy, setSortBy] = useState('overall');
  const [showDetails, setShowDetails] = useState({});

  // Filter destinations for flight analysis
  const flightDestinations = destinations.filter(dest => {
    const costDiff = Math.abs(dest.flights.fromFuquay.cost - dest.flights.fromFarmingdale.cost);
    const timeDiff = Math.abs(dest.flights.fromFuquay.time - dest.flights.fromFarmingdale.time);
    return costDiff <= filters.costTolerance && timeDiff <= filters.timeTolerance;
  });

  // Sort destinations
  const sortedDestinations = [...flightDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'costDiff':
        return Math.abs(a.flights.fromFuquay.cost - a.flights.fromFarmingdale.cost) - 
               Math.abs(b.flights.fromFuquay.cost - b.flights.fromFarmingdale.cost);
      case 'timeDiff':
        return Math.abs(a.flights.fromFuquay.time - a.flights.fromFarmingdale.time) - 
               Math.abs(b.flights.fromFuquay.time - b.flights.fromFarmingdale.time);
      case 'avgCost':
        return ((a.flights.fromFuquay.cost + a.flights.fromFarmingdale.cost) / 2) - 
               ((b.flights.fromFuquay.cost + b.flights.fromFarmingdale.cost) / 2);
      default:
        return b.scores.overall - a.scores.overall;
    }
  });

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getCostDifference = (dest) => {
    const diff = Math.abs(dest.flights.fromFuquay.cost - dest.flights.fromFarmingdale.cost);
    return `$${diff}`;
  };

  const getTimeDifference = (dest) => {
    const diff = Math.abs(dest.flights.fromFuquay.time - dest.flights.fromFarmingdale.time);
    return `${diff} min`;
  };

  const getMatchQuality = (score) => {
    if (score >= 0.9) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 0.8) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 0.7) return { text: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const toggleDetails = (destId) => {
    setShowDetails(prev => ({
      ...prev,
      [destId]: !prev[destId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Plane className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Flight Comparisons</h2>
              <p className="text-sm text-gray-600">
                Compare air travel options and pricing from nearby airports
              </p>
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <div className="flex space-x-2">
            {[
              { value: 'overall', label: 'Best Match' },
              { value: 'costDiff', label: 'Cost Balance' },
              { value: 'timeDiff', label: 'Time Balance' },
              { value: 'avgCost', label: 'Average Cost' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  sortBy === option.value
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Routes</p>
              <p className="text-2xl font-bold text-gray-900">{flightDestinations.length}</p>
            </div>
            <Plane className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Cost Difference</p>
              <p className="text-2xl font-bold text-gray-900">
                ${flightDestinations.length > 0 
                  ? Math.round(flightDestinations.reduce((sum, dest) => 
                      sum + Math.abs(dest.flights.fromFuquay.cost - dest.flights.fromFarmingdale.cost), 0
                    ) / flightDestinations.length)
                  : 0}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Flight Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {flightDestinations.length > 0 
                  ? Math.round(flightDestinations.reduce((sum, dest) => 
                      sum + (dest.flights.fromFuquay.time + dest.flights.fromFarmingdale.time) / 2, 0
                    ) / flightDestinations.length)
                  : 0} min
              </p>
            </div>
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Direct Flights</p>
              <p className="text-2xl font-bold text-gray-900">
                {flightDestinations.filter(dest => 
                  dest.flights.fromFuquay.connections === 0 && dest.flights.fromFarmingdale.connections === 0
                ).length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-4">
        {sortedDestinations.map((destination) => {
          const quality = getMatchQuality(destination.scores.overall);
          const costDiff = Math.abs(destination.flights.fromFuquay.cost - destination.flights.fromFarmingdale.cost);
          const timeDiff = Math.abs(destination.flights.fromFuquay.time - destination.flights.fromFarmingdale.time);
          const avgCost = (destination.flights.fromFuquay.cost + destination.flights.fromFarmingdale.cost) / 2;

          return (
            <div key={destination.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{destination.name}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${quality.bg} ${quality.color}`}>
                      {quality.text}
                    </span>
                    <span className="text-sm text-gray-500">
                      Score: {Math.round(destination.scores.overall * 100)}%
                    </span>
                    <span className="text-sm text-gray-500">
                      Avg: ${Math.round(avgCost)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleDetails(destination.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showDetails[destination.id] ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {/* Quick Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Fuquay Varina */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-green-700">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">From Fuquay Varina (RDU)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Flight Time</p>
                      <p className="font-semibold">{formatTime(destination.flights.fromFuquay.time)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Connections</p>
                      <p className="font-semibold">{destination.flights.fromFuquay.connections}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="font-semibold">${destination.flights.fromFuquay.cost}</p>
                    </div>
                  </div>
                </div>

                {/* Farmingdale */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">From Farmingdale (JFK/LGA)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Flight Time</p>
                      <p className="font-semibold">{formatTime(destination.flights.fromFarmingdale.time)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Connections</p>
                      <p className="font-semibold">{destination.flights.fromFarmingdale.connections}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="font-semibold">${destination.flights.fromFarmingdale.cost}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Cost Difference</p>
                  <p className={`text-lg font-bold ${costDiff <= 50 ? 'text-green-600' : costDiff <= 100 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {getCostDifference(destination)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Time Difference</p>
                  <p className={`text-lg font-bold ${timeDiff <= 30 ? 'text-green-600' : timeDiff <= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {getTimeDifference(destination)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${destination.flights.fromFuquay.cost + destination.flights.fromFarmingdale.cost}
                  </p>
                </div>
              </div>

              {/* Detailed Information */}
              {showDetails[destination.id] && (
                <div className="mt-6 pt-6 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Flight Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Best Airlines:</span>
                          <span className="font-medium">American, Delta, United</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Peak Season:</span>
                          <span className="font-medium">Jun-Aug, Dec</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Best Time to Book:</span>
                          <span className="font-medium">6-8 weeks ahead</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Airport Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuquay Area:</span>
                          <span className="font-medium">RDU (45 min)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Farmingdale Area:</span>
                          <span className="font-medium">JFK (30 min), LGA (25 min)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Destination Airport:</span>
                          <span className="font-medium">Regional/International</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {flightDestinations.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No flight routes match your criteria</h3>
          <p className="text-gray-600">
            Try adjusting your cost tolerance to ${filters.costTolerance + 50} or time tolerance to {filters.timeTolerance + 30} minutes
          </p>
        </div>
      )}

      {/* Information Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Flight Information</p>
            <p>
              Flight prices and times are estimates based on typical routes and seasonal averages. 
              Actual prices may vary based on booking time, airline, and availability. 
              Consider checking multiple booking sites for the best deals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
