export const homeBase = {
  id: 'santa-barbara-home',
  name: 'Santa Barbara',
  coordinates: [-119.6982, 34.4208],
  note: 'Home base.',
  special: 'home',
}

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
  {
    id: 'baltic-to-lisbon-trip',
    title: 'Gdańsk to Lisbon sail',
    timeframe: 'August 2025',
    color: '#2e6ea8',
    provisional: false,
    summary: 'Hotel nights in Gdańsk, then a long sail through the Baltic, Kiel Canal, Channel, Biscay, and down to Lisbon. Unlisted nights were spent at sea.',
    stops: [
      {
        id: 'gdansk-bb',
        name: 'B&B Hotel Gdańsk Old Town',
        coordinates: [18.6526, 54.3486],
        note: 'Stayed 8/3–8/5.',
      },
      {
        id: 'gdansk-holland-house',
        name: 'Holland House Residence, Gdańsk',
        coordinates: [18.6539, 54.3488],
        note: 'Stayed 8/5–8/7.',
      },
      {
        id: 'gdansk-stay-inn',
        name: 'Stay Inn Hotel Gdańsk',
        coordinates: [18.6518, 54.3497],
        note: 'Stayed 8/7–8/8.',
      },
      {
        id: 'sassnitz-harbor',
        name: 'Sassnitz Harbor',
        coordinates: [13.6419, 54.5158],
        note: 'Night of 8/9.',
      },
      {
        id: 'kiel-canal-night',
        name: 'Post–Kiel Canal anchorage',
        coordinates: [9.1473611111, 53.8961944444],
        note: 'Night of 8/10 after navigating the canal.',
      },
      {
        id: 'port-du-grand-large',
        name: 'Port du Grand Large',
        coordinates: [2.3452, 51.0377],
        note: 'Night of 8/14 on the fuel dock.',
      },
      {
        id: 'brittany-night',
        name: 'Off Brittany',
        coordinates: [-4.4879722222, 48.3774444444],
        note: 'Night of 8/16.',
      },
      {
        id: 'lisbon-approach-night',
        name: 'Off Lisbon',
        coordinates: [-9.4156944444, 38.6927777778],
        note: 'Night of 8/21.',
      },
      {
        id: 'lisbon-hotel',
        name: 'Lisbon',
        coordinates: [-9.1393, 38.7108],
        note: 'Lift Boutique Hotel on 8/22.',
      }
    ],
    routePoints: [
      [18.6985, 54.3822],
      [18.05, 54.56],
      [16.3, 54.63],
      [14.9, 54.6],
      [13.6419, 54.5158],
      [12.15, 54.47],
      [10.95, 54.4],
      [10.2210, 54.3737],
      [9.9650, 54.3170],
      [9.6610, 54.2720],
      [9.2860, 54.1710],
      [8.9885, 54.1607],
      [8.45, 54.08],
      [7.1, 53.88],
      [5.45, 53.18],
      [4.05, 52.18],
      [2.3452, 51.0377],
      [0.2, 50.75],
      [-2.4, 48.95],
      [-4.4879722222, 48.3774444444],
      [-5.25, 47.6],
      [-6.25, 45.3],
      [-8.0, 43.2],
      [-9.05, 40.3],
      [-9.25, 39.15],
      [-9.4217, 38.6979],
      [-9.1393, 38.7108]
    ]
  },
]
