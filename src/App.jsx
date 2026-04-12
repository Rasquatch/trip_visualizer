import React, { useState } from 'react';
import { MapPin, BarChart3, Users, Settings } from 'lucide-react';
import TripVisualizer from './projects/trip-visualizer/App.jsx';

// Main Research Hub App
export default function App() {
  const [currentProject, setCurrentProject] = useState('trip-visualizer');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hub Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Research Hub</h1>
                <p className="text-sm text-gray-500">Interactive Data Visualization Platform</p>
              </div>
            </div>
            <nav className="flex space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Users className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Project Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentProject('trip-visualizer')}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                currentProject === 'trip-visualizer'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>Trip Visualizer</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentProject === 'trip-visualizer' && <TripVisualizer />}
      </main>
    </div>
  );
}
