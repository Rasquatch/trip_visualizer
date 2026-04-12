// Trip Visualizer Destination Data
// Contains travel information for destinations between Fuquay Varina, NC and Farmingdale, NY

export const destinations = [
  {
    id: 'luray-va',
    name: 'Luray, Virginia',
    coordinates: [38.6635, -78.4330],
    description: 'Scenic town known for Luray Caverns and Shenandoah National Park',
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
    description: 'Historic capital city with museums, dining, and riverfront',
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
    description: 'Nation\'s capital with monuments, museums, and free attractions',
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
  },
  {
    id: 'baltimore-md',
    name: 'Baltimore, Maryland',
    coordinates: [39.2904, -76.6122],
    description: 'Charm City with harbor, aquarium, and historic neighborhoods',
    driving: {
      fromFuquay: { time: 270, distance: 290, cost: 38 },
      fromFarmingdale: { time: 240, distance: 200, cost: 28 }
    },
    flights: {
      fromFuquay: { time: 90, cost: 190, connections: 1 },
      fromFarmingdale: { time: 60, cost: 160, connections: 0 }
    },
    trains: {
      fromFuquay: { time: 450, cost: 110, connections: 1 },
      fromFarmingdale: { time: 180, cost: 70, connections: 0 }
    },
    scores: {
      timeEquality: 0.88,
      costEquality: 0.85,
      overall: 0.86
    }
  },
  {
    id: 'philadelphia-pa',
    name: 'Philadelphia, Pennsylvania',
    coordinates: [39.9526, -75.1652],
    description: 'City of Brotherly Love with history, food, and culture',
    driving: {
      fromFuquay: { time: 330, distance: 380, cost: 50 },
      fromFarmingdale: { time: 150, distance: 120, cost: 18 }
    },
    flights: {
      fromFuquay: { time: 90, cost: 220, connections: 1 },
      fromFarmingdale: { time: 45, cost: 140, connections: 0 }
    },
    trains: {
      fromFuquay: { time: 480, cost: 130, connections: 1 },
      fromFarmingdale: { time: 90, cost: 60, connections: 0 }
    },
    scores: {
      timeEquality: 0.45,
      costEquality: 0.62,
      overall: 0.53
    }
  },
  {
    id: 'charleston-wv',
    name: 'Charleston, West Virginia',
    coordinates: [38.3498, -81.6326],
    description: 'Mountain city with outdoor activities and state capital',
    driving: {
      fromFuquay: { time: 240, distance: 220, cost: 30 },
      fromFarmingdale: { time: 420, distance: 450, cost: 55 }
    },
    flights: {
      fromFuquay: { time: 150, cost: 280, connections: 2 },
      fromFarmingdale: { time: 120, cost: 240, connections: 1 }
    },
    trains: {
      fromFuquay: { time: 600, cost: 150, connections: 3 },
      fromFarmingdale: { time: 540, cost: 140, connections: 2 }
    },
    scores: {
      timeEquality: 0.55,
      costEquality: 0.88,
      overall: 0.71
    }
  },
  {
    id: 'roanoke-va',
    name: 'Roanoke, Virginia',
    coordinates: [37.2710, -79.9414],
    description: 'Mountain city with outdoor recreation and cultural attractions',
    driving: {
      fromFuquay: { time: 180, distance: 160, cost: 22 },
      fromFarmingdale: { time: 420, distance: 400, cost: 50 }
    },
    flights: {
      fromFuquay: { time: 120, cost: 240, connections: 1 },
      fromFarmingdale: { time: 90, cost: 200, connections: 1 }
    },
    trains: {
      fromFuquay: { time: 540, cost: 120, connections: 2 },
      fromFarmingdale: { time: 600, cost: 160, connections: 3 }
    },
    scores: {
      timeEquality: 0.42,
      costEquality: 0.85,
      overall: 0.63
    }
  },
  {
    id: 'norfolk-va',
    name: 'Norfolk, Virginia',
    coordinates: [36.8468, -76.2852],
    description: 'Coastal city with naval base, beaches, and maritime history',
    driving: {
      fromFuquay: { time: 165, distance: 150, cost: 20 },
      fromFarmingdale: { time: 420, distance: 380, cost: 48 }
    },
    flights: {
      fromFuquay: { time: 90, cost: 170, connections: 0 },
      fromFarmingdale: { time: 75, cost: 180, connections: 1 }
    },
    trains: {
      fromFuquay: { time: 420, cost: 90, connections: 1 },
      fromFarmingdale: { time: 540, cost: 130, connections: 2 }
    },
    scores: {
      timeEquality: 0.38,
      costEquality: 0.92,
      overall: 0.65
    }
  },
  {
    id: 'pittsburgh-pa',
    name: 'Pittsburgh, Pennsylvania',
    coordinates: [40.4406, -79.9959],
    description: 'Steel City with bridges, sports, and cultural districts',
    driving: {
      fromFuquay: { time: 360, distance: 400, cost: 52 },
      fromFarmingdale: { time: 360, distance: 370, cost: 45 }
    },
    flights: {
      fromFuquay: { time: 120, cost: 260, connections: 1 },
      fromFarmingdale: { time: 90, cost: 220, connections: 0 }
    },
    trains: {
      fromFuquay: { time: 600, cost: 140, connections: 2 },
      fromFarmingdale: { time: 480, cost: 110, connections: 1 }
    },
    scores: {
      timeEquality: 1.00,
      costEquality: 0.88,
      overall: 0.94
    }
  },
  {
    id: 'atlanta-ga',
    name: 'Atlanta, Georgia',
    coordinates: [33.7490, -84.3880],
    description: 'Major Southern city with attractions, dining, and history',
    driving: {
      fromFuquay: { time: 390, distance: 380, cost: 48 },
      fromFarmingdale: { time: 900, distance: 850, cost: 110 }
    },
    flights: {
      fromFuquay: { time: 75, cost: 150, connections: 0 },
      fromFarmingdale: { time: 120, cost: 200, connections: 0 }
    },
    trains: {
      fromFuquay: { time: 480, cost: 100, connections: 1 },
      fromFarmingdale: { time: 720, cost: 180, connections: 2 }
    },
    scores: {
      timeEquality: 0.25,
      costEquality: 0.75,
      overall: 0.50
    }
  }
];

// Helper functions for data processing
export const getDestinationsByMode = (mode, filters) => {
  return destinations.filter(dest => {
    const timeDiff = Math.abs(dest[mode].fromFuquay.time - dest[mode].fromFarmingdale.time);
    const costDiff = Math.abs(dest[mode].fromFuquay.cost - dest[mode].fromFarmingdale.cost);
    return timeDiff <= filters.timeTolerance && costDiff <= filters.costTolerance;
  });
};

export const getBestMatches = (filters, limit = 5) => {
  return destinations
    .filter(dest => {
      const drivingTimeDiff = Math.abs(dest.driving.fromFuquay.time - dest.driving.fromFarmingdale.time);
      const drivingCostDiff = Math.abs(dest.driving.fromFuquay.cost - dest.driving.fromFarmingdale.cost);
      return drivingTimeDiff <= filters.timeTolerance && drivingCostDiff <= filters.costTolerance;
    })
    .sort((a, b) => b.scores.overall - a.scores.overall)
    .slice(0, limit);
};

export const getDestinationById = (id) => {
  return destinations.find(dest => dest.id === id);
};
