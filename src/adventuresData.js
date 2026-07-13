export const travelLog = [
  {
    id: 'greece-sailing-trip',
    title: 'Greece sailing trip',
    timeframe: 'Ionian sailing + London night',
    color: '#4f97d6',
    provisional: false,
    summary: 'Boat nights in the Ionian, then one final hotel night in London.',
    stops: [
      {
        id: 'lefkada-start',
        name: 'Lefkada',
        coordinates: [20.71136, 38.82891],
        note: 'Lefkas Marina start.',
      },
      {
        id: 'vathy',
        name: 'Vathy',
        coordinates: [20.71864, 38.3643],
        note: 'Ithaca harbor.',
      },
      {
        id: 'kioni',
        name: 'Kioni',
        coordinates: [20.68924, 38.4502],
        note: 'Kioni harbor.',
      },
      {
        id: 'filiatro',
        name: 'Filiatro',
        coordinates: [20.6995, 38.4395],
        note: 'Approximate anchorage near the entrance of the Gulf of Kioni.',
      },
      {
        id: 'fiskardo-1',
        name: 'Fiskardo',
        coordinates: [20.581, 38.4565],
        note: 'First night in Fiskardo.',
      },
      {
        id: 'fiskardo-2',
        name: 'Fiskardo',
        coordinates: [20.581, 38.4565],
        note: 'Second night in Fiskardo.',
      },
      {
        id: 'lefkada-finish',
        name: 'Lefkada',
        coordinates: [20.71136, 38.82891],
        note: 'Back to Lefkas Marina.',
      },
      {
        id: 'london',
        name: 'London',
        coordinates: [-0.1276, 51.5072],
        note: 'One hotel night after the sailing trip.',
      },
    ],
  },
  {
    id: 'inca-trail-trip',
    title: 'Inca Trail + Cusco',
    timeframe: 'Peru hike + extra Cusco night',
    color: '#c37b2b',
    provisional: false,
    summary: 'Overnights only as dots, with the trail traced through the Andes and Machu Picchu called out separately.',
    stops: [
      {
        id: 'cusco-arrival',
        name: 'Cusco',
        coordinates: [-71.9675, -13.5319],
        note: 'Arrival night in Cusco.',
      },
      {
        id: 'ollantaytambo-night',
        name: 'Ollantaytambo',
        coordinates: [-72.2642, -13.2581],
        note: 'Night before the trek.',
      },
      {
        id: 'wayllabamba-night',
        name: 'Wayllabamba',
        coordinates: [-72.4466, -13.2652],
        note: 'First campsite on trail.',
      },
      {
        id: 'pacaymayo-night',
        name: 'Pacaymayo',
        coordinates: [-72.5026, -13.2139],
        note: 'Second trail camp after Dead Woman’s Pass.',
      },
      {
        id: 'winay-wayna-night',
        name: 'Wiñay Wayna',
        coordinates: [-72.53644, -13.19292],
        note: 'Final campsite before sunrise at Machu Picchu.',
      },
      {
        id: 'cusco-final-night',
        name: 'Cusco',
        coordinates: [-71.9675, -13.5319],
        note: 'Extra night in Cusco at the end.',
      }
    ],
    routePoints: [
      [-71.9675, -13.5319],
      [-72.0147, -13.3928],
      [-72.2642, -13.2581],
      [-72.545, -13.2817],
      [-72.4466, -13.2652],
      [-72.4862, -13.2052],
      [-72.5054, -13.2267],
      [-72.53152, -13.20635],
      [-72.53644, -13.19292],
      [-72.5449, -13.1631],
      [-72.545, -13.1631],
      [-72.5252, -13.1547],
      [-72.2642, -13.2581],
      [-71.9675, -13.5319]
    ],
    landmarks: [
      {
        id: 'machu-picchu',
        name: 'Machu Picchu',
        coordinates: [-72.545, -13.1631],
        note: 'Trail finish.',
        special: 'landmark'
      }
    ]
  },
]
