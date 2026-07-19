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
    routePoints: [
      [20.71136, 38.82891],
      [20.7124, 38.8338],
      [20.7136, 38.8368],
      [20.7102, 38.8441],
      [20.7024, 38.8626],
      [20.6855, 38.8405],
      [20.6628, 38.7448],
      [20.7045, 38.575],
      [20.71864, 38.3643],
      [20.68924, 38.4502],
      [20.6995, 38.4395],
      [20.581, 38.4565],
      [20.581, 38.4565],
      [20.6532, 38.6035],
      [20.6755, 38.734],
      [20.6855, 38.8405],
      [20.7024, 38.8626],
      [20.7102, 38.8441],
      [20.7136, 38.8368],
      [20.7124, 38.8338],
      [20.71136, 38.82891],
      [-0.1276, 51.5072]
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
      [18.42, 54.55],
      [16.9, 54.7],
      [15.2, 54.66],
      [13.6419, 54.5158],
      [12.3, 54.5],
      [11.2, 54.44],
      [10.2210, 54.3737],
      [9.9650, 54.3170],
      [9.6610, 54.2720],
      [9.2860, 54.1710],
      [8.9885, 54.1607],
      [9.1473611111, 53.8961944444],
      [8.45, 53.86],
      [7.1, 53.55],
      [5.45, 52.9],
      [4.05, 52.0],
      [2.3452, 51.0377],
      [0.45, 50.68],
      [-1.6, 49.65],
      [-3.2, 48.85],
      [-4.4879722222, 48.3774444444],
      [-5.55, 47.15],
      [-7.15, 44.35],
      [-8.55, 41.9],
      [-9.05, 40.3],
      [-9.25, 39.15],
      [-9.4156944444, 38.6927777778],
      [-9.1393, 38.7108]
    ]
  },
  {
    id: 'iceland-road-trip',
    title: 'Iceland road trip',
    timeframe: 'Reykjanes + South Coast',
    color: '#5e7fc7',
    provisional: false,
    summary: 'A loop through Reykjavik, the South Coast, and a few big Iceland highlights, with dots only where I spent the night.',
    stops: [
      {
        id: 'blue-house-bb',
        name: 'Blue House B&B',
        coordinates: [-21.9864, 64.1676],
        note: 'First night near Reykjavik after Keflavík and the Blue Lagoon.',
      },
      {
        id: 'thingholt-stay',
        name: 'Þingholt',
        coordinates: [-21.9357, 64.1457],
        note: 'Stayed near Þingholt after downtown Reykjavik.',
      },
      {
        id: 'rangarthing-eystra',
        name: 'Rangárþing eystra',
        coordinates: [-19.1456, 63.7531],
        note: 'Base for a few nights and day trips across the South Coast.',
      },
      {
        id: 'reykjavik-return',
        name: 'Reykjavik',
        coordinates: [-21.9426, 64.1466],
        note: 'Final two nights back in Reykjavik.',
      }
    ],
    routePoints: [
      [-22.6056, 63.985],
      [-22.4475, 63.8804],
      [-21.9864, 64.1676],
      [-21.9266, 64.142],
      [-21.9346, 64.1417],
      [-21.9224, 64.1475],
      [-21.9357, 64.1457],
      [-21.9547, 64.1205],
      [-21.0174, 64.2557],
      [-19.1456, 63.7531],
      [-19.0186, 63.4186],
      [-19.006, 63.5321],
      [-19.047, 63.4046],
      [-19.5113, 63.6156],
      [-19.7672, 63.6838],
      [-22.4308, 63.8424],
      [-21.9426, 64.1466]
    ]
  },
  {
    id: 'ast-la-barra-stays',
    title: 'AST La Barra',
    timeframe: 'Miramar, Nicaragua — twice',
    color: '#2d7c68',
    provisional: false,
    summary: 'Two separate stays at AST’s La Barra spot in Miramar, so this one shows as a single-location dot.',
    stops: [
      {
        id: 'la-barra-miramar',
        name: 'La Barra, Miramar',
        coordinates: [-86.7622, 12.16921],
        note: 'Approximate AST La Barra location in Miramar / Puerto Sandino area.',
      }
    ]
  },
  {
    id: 'ast-las-flores-stay',
    title: 'AST Las Flores',
    timeframe: 'El Cuco, El Salvador — once',
    color: '#b45d7a',
    provisional: false,
    summary: 'One stay at AST’s Las Flores spot near El Cuco, shown as a single-location dot.',
    stops: [
      {
        id: 'las-flores-el-cuco',
        name: 'Las Flores, El Cuco',
        coordinates: [-88.11468, 13.17223],
        note: 'Approximate AST Las Flores location near Playa Las Flores / El Cuco.',
      }
    ]
  },
  {
    id: 'playa-negra-surf-trip',
    title: 'Hotel Playa Negra',
    timeframe: 'Playa Negra, Costa Rica — surf trip',
    color: '#3f8f5d',
    provisional: false,
    summary: 'A one-spot surf trip at Hotel Playa Negra, so this one shows as a single-location dot.',
    stops: [
      {
        id: 'hotel-playa-negra',
        name: 'Hotel Playa Negra',
        coordinates: [-85.8369, 10.7868],
        note: 'Approximate Hotel Playa Negra location in Playa Negra, Guanacaste.',
      }
    ]
  },
  {
    id: 'club-marena-stays',
    title: 'Club Marena',
    timeframe: 'Rosarito, Mexico — surf stays',
    color: '#5f88c6',
    provisional: false,
    summary: 'Multiple stays at Club Marena near K38, so this one shows as a single-location dot.',
    stops: [
      {
        id: 'club-marena-rosarito',
        name: 'Club Marena',
        coordinates: [-116.9856, 32.26067],
        note: 'Approximate Club Marena location in Rosarito near K38.',
      }
    ]
  },
  {
    id: 'punta-mita-surf-trip',
    title: 'Punta Mita',
    timeframe: 'Punta Mita, Mexico — surf trip',
    color: '#4aa7b8',
    provisional: false,
    summary: 'A one-spot surf trip in Punta Mita, so this one shows as a single-location dot.',
    stops: [
      {
        id: 'punta-mita',
        name: 'Punta Mita',
        coordinates: [-105.51986, 20.77285],
        note: 'Approximate Punta Mita location in Nayarit.',
      }
    ]
  },
  {
    id: 'turtle-bay-surf-trip',
    title: 'Turtle Bay',
    timeframe: 'Oʻahu, Hawaiʻi — surf trip',
    color: '#5b90d6',
    provisional: false,
    summary: 'A one-spot surf trip at Turtle Bay on Oʻahu’s North Shore.',
    stops: [
      {
        id: 'turtle-bay-oahu',
        name: 'Turtle Bay',
        coordinates: [-158.00151, 21.70138],
        note: 'Approximate Turtle Bay location near Kahuku on Oʻahu.',
      }
    ]
  },
  {
    id: 'calistoga-family-trip',
    title: 'Calistoga',
    timeframe: 'Calistoga, California — family trip',
    color: '#c68b4f',
    provisional: false,
    summary: 'A family trip in Calistoga, shown as a single-location dot.',
    stops: [
      {
        id: 'calistoga',
        name: 'Calistoga',
        coordinates: [-122.5797, 38.5788],
        note: 'Approximate Calistoga location in Napa County.',
      }
    ]
  },
  {
    id: 'san-luis-valley-family-trip',
    title: 'San Luis Valley',
    timeframe: 'San Luis Valley, Colorado — family trip',
    color: '#8c6bc7',
    provisional: false,
    summary: 'A family trip in the San Luis Valley that included climbing California Peak.',
    stops: [
      {
        id: 'california-peak',
        name: 'California Peak',
        coordinates: [-105.4986228, 37.6141705],
        note: 'California Peak in the Sangre de Cristo Range above the San Luis Valley.',
      }
    ]
  },
  {
    id: 'salmon-creek-loop-trip',
    title: 'Salmon Creek loop',
    timeframe: 'Big Sur, California — done a few times',
    color: '#4f8b6f',
    provisional: false,
    summary: 'A repeat Big Sur loop using Salmon Creek, Cruickshank, and Buckeye, with camp dots at Salmon Creek Falls and Lion Den Campground.',
    stops: [
      {
        id: 'salmon-creek-falls',
        name: 'Salmon Creek Falls',
        coordinates: [-121.35677218437195, 35.81607317579855],
        note: 'Camped near Salmon Creek Falls.',
      },
      {
        id: 'lion-den-campground',
        name: 'Lion Den Campground',
        coordinates: [-121.340207, 35.8580216],
        note: 'Lion Den Campground on the Salmon Creek / Cruickshank side of the loop.',
      }
    ],
    routePoints: [
      [-121.35888139584, 35.815671873182],
      [-121.35677218437195, 35.81607317579855],
      [-121.336, 35.8372],
      [-121.340207, 35.8580216],
      [-121.3797, 35.8427],
      [-121.36088452592, 35.814067467508]
    ]
  },
  {
    id: 'cooper-landing-family-trip',
    title: 'Cooper Landing',
    timeframe: 'Cooper Landing, Alaska — family trip',
    color: '#5c9c84',
    provisional: false,
    summary: 'A family trip to Cooper Landing, shown as a single-location dot.',
    stops: [
      {
        id: 'cooper-landing',
        name: 'Cooper Landing',
        coordinates: [-149.8235, 60.4864],
        note: 'Approximate Cooper Landing location on the Kenai Peninsula.',
      }
    ]
  },
]
