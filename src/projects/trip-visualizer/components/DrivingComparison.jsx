import React, { useState } from 'react';
import { Car, Clock, DollarSign, Navigation, TrendingUp, MapPin } from 'lucide-react';

export default function DrivingComparison({ destinations, filters }) {
  const [sortBy, setSortBy] = useState('overall'); // overall, timeDiff, costDiff, distance
  
  // Filter destinations for driving analysis
  const drivingDestinations = destinations.filter(dest => {
    const timeDiff = Math.abs(dest.driving.fromFuquay.time - dest.driving.fromFarmingdale.time);
    const costDiff = Math.abs(dest.driving.fromFuquay.cost - dest.driving.fromFarmingdale.cost);
    return timeDiff <= filters.timeTolerance && costDiff <= filters.costTolerance;
  });

  // Sort destinations
  const sortedDestinations = [...drivingDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'timeDiff':
        return Math.abs(a.driving.fromFuquay.time - a.driving.fromFarmingdale.time) - 
               Math.abs(b.driving.fromFuquay.time - b.driving.fromFarmingdale.time);
      case 'costDiff':
        return Math.abs(a.driving.fromFuquay.cost - a.driving.fromFarmingdale.cost) - 
               Math.abs(b.driving.fromFuquay.cost - b.driving.fromFarmingdale.cost);
      case 'distance':
        return Math.min(a.driving.fromFuquay.distance, a.driving.fromFarmingdale.distance) - 
               Math.min(b.driving.fromFuquay.distance, b.driving.fromFarmingdale.distance);
      default:
        return b.scores.overall - a.scores.overall;
    }
  });

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getTimeDifference = (dest) => {
    const diff = Math.abs(dest.driving.fromFuquay.time - dest.driving.fromFarmingdale.time);
    return `${diff} min`;
  };

  const getCostDifference = (dest) => {
    const diff = Math.abs(dest.driving.fromFuquay.cost - dest.driving.fromFarmingdale.cost);
    return `$${diff}`;
  };

  const getMatchQuality = (score) => {
    if (score >= 0.9) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 0.8) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 0.7) return { text: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-green-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Driving Analysis</h2>
              <p className="text-sm text-gray-600">
                Compare road trip destinations with balanced travel times
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
              { value: 'timeDiff', label: 'Time Balance' },
              { value: 'costDiff', label: 'Cost Balance' },
              { value: 'distance', label: 'Distance' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  sortBy === option.value
                    ? 'bg-green-100 text-green-700 border border-green-200'
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
              <p className="text-sm font-medium text-gray-600">Total Destinations</p>
              <p className="text-2xl font-bold text-gray-900">{drivingDestinations.length}</p>
            </div>
            <MapPin className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Time Difference</p>
              <p className="text-2xl font-bold text-gray-900">
                {drivingDestinations.length > 0 
                  ? Math.round(drivingDestinations.reduce((sum, dest) => 
                      sum + Math.abs(dest.driving.fromFuquay.time - dest.driving.fromFarmingdale.time), 0
                    ) / drivingDestinations.length)
                  : 0} min
              </p>
            </div>
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Cost Difference</p>
              <p className="text-2xl font-bold text-gray-900">
                ${drivingDestinations.length > 0 
                  ? Math.round(drivingDestinations.reduce((sum, dest) => 
                      sum + Math.abs(dest.driving.fromFuquay.cost - dest.driving.fromFarmingdale.cost), 0
                    ) / drivingDestinations.length)
                  : 0}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Excellent Matches</p>
              <p className="text-2xl font-bold text-gray-900">
                {drivingDestinations.filter(dest => dest.scores.overall >= 0.9).length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Destination Cards */}
      <div className="space-y-4">
        {sortedDestinations.map((destination) => {
          const quality = getMatchQuality(destination.scores.overall);
          const timeDiff = Math.abs(destination.driving.fromFuquay.time - destination.driving.fromFarmingdale.time);
          const costDiff = Math.abs(destination.driving.fromFuquay.cost - destination.driving.fromFarmingdale.cost);

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
                      Overall Score: {Math.round(destination.scores.overall * 100)}%
                    </span>
                  </div>
                </div>
                <Navigation className="h-5 w-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fuquay Varina */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-green-700">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">From Fuquay Varina, NC</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Time</p>
                      <p className="font-semibold">{formatTime(destination.driving.fromFuquay.time)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Distance</p>
                      <p className="font-semibold">{destination.driving.fromFuquay.distance} mi</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Est. Cost</p>
                      <p className="font-semibold">${destination.driving.fromFuquay.cost}</p>
                    </div>
                  </div>
                </div>

                {/* Farmingdale */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">From Farmingdale, NY</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Time</p>
                      <p className="font-semibold">{formatTime(destination.driving.fromFarmingdale.time)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Distance</p>
                      <p className="font-semibold">{destination.driving.fromFarmingdale.distance} mi</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Est. Cost</p>
                      <p className="font-semibold">${destination.driving.fromFarmingdale.cost}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Metrics */}
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Time Difference</p>
                    <p className={`text-lg font-bold ${timeDiff <= 30 ? 'text-green-600' : timeDiff <= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {getTimeDifference(destination)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Cost Difference</p>
                    <p className={`text-lg font-bold ${costDiff <= 25 ? 'text-green-600' : costDiff <= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {getCostDifference(destination)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Distance</p>
                    <p className="text-lg font-bold text-gray-900">
                      {destination.driving.fromFuquay.distance + destination.driving.fromFarmingdale.distance} mi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {drivingDestinations.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations match your criteria</h3>
          <p className="text-gray-600">
            Try adjusting your time tolerance to {filters.timeTolerance + 30} minutes or cost tolerance to ${filters.costTolerance + 50}
          </p>
        </div>
      )}
    </div>
  );
}
