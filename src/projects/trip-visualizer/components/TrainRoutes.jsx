import React, { useState } from 'react';
import { Train, Clock, DollarSign, TrendingUp, AlertCircle, MapPin, Users } from 'lucide-react';

export default function TrainRoutes({ destinations, filters }) {
  const [sortBy, setSortBy] = useState('overall');
  const [showDetails, setShowDetails] = useState({});

  // Filter destinations for train analysis
  const trainDestinations = destinations.filter(dest => {
    const costDiff = Math.abs(dest.trains.fromFuquay.cost - dest.trains.fromFarmingdale.cost);
    const timeDiff = Math.abs(dest.trains.fromFuquay.time - dest.trains.fromFarmingdale.time);
    return costDiff <= filters.costTolerance && timeDiff <= filters.timeTolerance;
  });

  // Sort destinations
  const sortedDestinations = [...trainDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'costDiff':
        return Math.abs(a.trains.fromFuquay.cost - a.trains.fromFarmingdale.cost) - 
               Math.abs(b.trains.fromFuquay.cost - b.trains.fromFarmingdale.cost);
      case 'timeDiff':
        return Math.abs(a.trains.fromFuquay.time - a.trains.fromFarmingdale.time) - 
               Math.abs(b.trains.fromFuquay.time - b.trains.fromFarmingdale.time);
      case 'avgTime':
        return ((a.trains.fromFuquay.time + a.trains.fromFarmingdale.time) / 2) - 
               ((b.trains.fromFuquay.time + b.trains.fromFarmingdale.time) / 2);
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
    const diff = Math.abs(dest.trains.fromFuquay.cost - dest.trains.fromFarmingdale.cost);
    return `$${diff}`;
  };

  const getTimeDifference = (dest) => {
    const diff = Math.abs(dest.trains.fromFuquay.time - dest.trains.fromFarmingdale.time);
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

  const getRouteType = (connections) => {
    if (connections === 0) return { text: 'Direct', color: 'text-green-600', bg: 'bg-green-100' };
    if (connections === 1) return { text: '1 Connection', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: `${connections} Connections`, color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Train className="h-8 w-8 text-purple-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Train Possibilities</h2>
              <p className="text-sm text-gray-600">
                Rail travel analysis and Amtrak route recommendations
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
              { value: 'avgTime', label: 'Average Time' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  sortBy === option.value
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
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
              <p className="text-2xl font-bold text-gray-900">{trainDestinations.length}</p>
            </div>
            <Train className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Cost Difference</p>
              <p className="text-2xl font-bold text-gray-900">
                ${trainDestinations.length > 0 
                  ? Math.round(trainDestinations.reduce((sum, dest) => 
                      sum + Math.abs(dest.trains.fromFuquay.cost - dest.trains.fromFarmingdale.cost), 0
                    ) / trainDestinations.length)
                  : 0}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Travel Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {trainDestinations.length > 0 
                  ? Math.round(trainDestinations.reduce((sum, dest) => 
                      sum + (dest.trains.fromFuquay.time + dest.trains.fromFarmingdale.time) / 2, 0
                    ) / trainDestinations.length)
                  : 0} min
              </p>
            </div>
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Direct Routes</p>
              <p className="text-2xl font-bold text-gray-900">
                {trainDestinations.filter(dest => 
                  dest.trains.fromFuquay.connections === 0 || dest.trains.fromFarmingdale.connections === 0
                ).length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Train Route Cards */}
      <div className="space-y-4">
        {sortedDestinations.map((destination) => {
          const quality = getMatchQuality(destination.scores.overall);
          const costDiff = Math.abs(destination.trains.fromFuquay.cost - destination.trains.fromFarmingdale.cost);
          const timeDiff = Math.abs(destination.trains.fromFuquay.time - destination.trains.fromFarmingdale.time);
          const avgTime = (destination.trains.fromFuquay.time + destination.trains.fromFarmingdale.time) / 2;
          const fuquayRoute = getRouteType(destination.trains.fromFuquay.connections);
          const farmingdaleRoute = getRouteType(destination.trains.fromFarmingdale.connections);

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
                      Avg: {formatTime(Math.round(avgTime))}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleDetails(destination.id)}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  {showDetails[destination.id] ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {/* Quick Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Fuquay Varina */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-purple-700">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">From Fuquay Varina</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Travel Time</p>
                      <p className="font-semibold">{formatTime(destination.trains.fromFuquay.time)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Connections</p>
                      <p className="font-semibold">{destination.trains.fromFuquay.connections}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="font-semibold">${destination.trains.fromFuquay.cost}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${fuquayRoute.bg} ${fuquayRoute.color}`}>
                      {fuquayRoute.text}
                    </span>
                  </div>
                </div>

                {/* Farmingdale */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-purple-700">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">From Farmingdale</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Travel Time</p>
                      <p className="font-semibold">{formatTime(destination.trains.fromFarmingdale.time)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Connections</p>
                      <p className="font-semibold">{destination.trains.fromFarmingdale.connections}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="font-semibold">${destination.trains.fromFarmingdale.cost}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${farmingdaleRoute.bg} ${farmingdaleRoute.color}`}>
                      {farmingdaleRoute.text}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comparison Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Cost Difference</p>
                  <p className={`text-lg font-bold ${costDiff <= 25 ? 'text-green-600' : costDiff <= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {getCostDifference(destination)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Time Difference</p>
                  <p className={`text-lg font-bold ${timeDiff <= 60 ? 'text-green-600' : timeDiff <= 120 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {getTimeDifference(destination)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${destination.trains.fromFuquay.cost + destination.trains.fromFarmingdale.cost}
                  </p>
                </div>
              </div>

              {/* Detailed Information */}
              {showDetails[destination.id] && (
                <div className="mt-6 pt-6 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Route Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuquay Station:</span>
                          <span className="font-medium">Raleigh (RUG) - 45 min drive</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Farmingdale Station:</span>
                          <span className="font-medium">NY Penn (NYP) - 45 min train</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Destination Station:</span>
                          <span className="font-medium">Regional Amtrak Station</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Type:</span>
                          <span className="font-medium">Regional, Northeast Corridor</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Travel Tips</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Best Booking:</span>
                          <span className="font-medium">2-3 weeks ahead</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discounts:</span>
                          <span className="font-medium">Student, Senior, AAA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amenities:</span>
                          <span className="font-medium">WiFi, Cafe, Business Class</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Luggage:</span>
                          <span className="font-medium">2 bags free</span>
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

      {trainDestinations.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Train className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No train routes match your criteria</h3>
          <p className="text-gray-600">
            Train travel has limited routes and longer travel times. Consider adjusting your time tolerance to {filters.timeTolerance + 60} minutes or cost tolerance to ${filters.costTolerance + 50}
          </p>
        </div>
      )}

      {/* Information Note */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5" />
          <div className="text-sm text-purple-800">
            <p className="font-medium mb-1">Train Travel Information</p>
            <p>
              Train travel offers scenic routes and comfortable seating but typically takes longer than flying. 
              Amtrak serves most major cities but has limited coverage in rural areas. 
              Book early for better prices and consider the Northeast Corridor for the best service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
