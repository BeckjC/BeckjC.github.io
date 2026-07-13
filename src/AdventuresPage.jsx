import { useEffect, useMemo, useRef, useState } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { select } from 'd3-selection'
import { zoom, zoomIdentity } from 'd3-zoom'
import { feature } from 'topojson-client'
import worldAtlas from 'world-atlas/countries-110m.json'
import { travelLog } from './adventuresData'

const MAP_WIDTH = 960
const MAP_HEIGHT = 520
const MIN_SCALE = 1
const MAX_SCALE = 24

const worldFeatures = feature(worldAtlas, worldAtlas.objects.countries).features

function buildProjection() {
  return geoNaturalEarth1()
    .fitExtent(
      [
        [24, 24],
        [MAP_WIDTH - 24, MAP_HEIGHT - 24],
      ],
      { type: 'FeatureCollection', features: worldFeatures },
    )
}

export default function AdventuresPage() {
  const [selectedTripId, setSelectedTripId] = useState(travelLog[0]?.id ?? null)
  const [transform, setTransform] = useState(zoomIdentity)
  const svgRef = useRef(null)

  const projection = useMemo(() => buildProjection(), [])
  const pathGenerator = useMemo(() => geoPath(projection), [projection])
  const selectedTrip = travelLog.find((trip) => trip.id === selectedTripId) ?? travelLog[0] ?? null

  const projectedTrips = useMemo(
    () =>
      travelLog.map((trip) => {
        const projectedStops = trip.stops
          .map((stop) => {
            const point = projection(stop.coordinates)
            if (!point) return null
            return { ...stop, x: point[0], y: point[1] }
          })
          .filter(Boolean)

        return {
          ...trip,
          projectedStops,
          linePath:
            projectedStops.length > 1
              ? projectedStops
                  .map((stop, index) => `${index === 0 ? 'M' : 'L'} ${stop.x} ${stop.y}`)
                  .join(' ')
              : '',
        }
      }),
    [projection],
  )

  useEffect(() => {
    if (!svgRef.current) return

    const selection = select(svgRef.current)
    const zoomBehavior = zoom()
      .scaleExtent([MIN_SCALE, MAX_SCALE])
      .translateExtent([
        [0, 0],
        [MAP_WIDTH, MAP_HEIGHT],
      ])
      .extent([
        [0, 0],
        [MAP_WIDTH, MAP_HEIGHT],
      ])
      .filter((event) => {
        if (event.type === 'wheel') return true
        if (event.type === 'mousedown') return event.button === 0
        return true
      })
      .on('zoom', (event) => {
        setTransform(event.transform)
      })

    selection.call(zoomBehavior)
    selection.on('dblclick.zoom', null)

    return () => {
      selection.on('.zoom', null)
    }
  }, [])

  return (
    <section className="section page-section adventures-shell">
      <div className="section-heading adventures-heading compact-heading">
        <h1>Beck’s Adventures</h1>
      </div>

      <div className="adventures-layout">
        <div className="map-card compact-card">
          <div className="map-frame">
            <svg
              ref={svgRef}
              className="adventures-map"
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              role="img"
              aria-label="World map showing Beck's travel log"
            >
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#f7fbff" rx="28" />
              <g transform={transform.toString()}>
                {worldFeatures.map((shape) => (
                  <path key={shape.id} d={pathGenerator(shape)} className="map-country" />
                ))}

                {projectedTrips.map((trip) =>
                  trip.linePath ? (
                    <path
                      key={`${trip.id}-line`}
                      d={trip.linePath}
                      className={selectedTrip?.id === trip.id ? 'trip-line trip-line-active' : 'trip-line'}
                      style={{ '--trip-color': trip.color }}
                    />
                  ) : null,
                )}

                {projectedTrips.flatMap((trip) =>
                  trip.projectedStops.map((stop) => (
                    <circle
                      key={`${trip.id}-${stop.id}`}
                      cx={stop.x}
                      cy={stop.y}
                      r={(selectedTrip?.id === trip.id ? 7 : 5.25) / Math.max(transform.k ** 0.55, 1)}
                      className={selectedTrip?.id === trip.id ? 'trip-stop trip-stop-active' : 'trip-stop'}
                      style={{ '--trip-color': trip.color }}
                    />
                  )),
                )}
              </g>
            </svg>
          </div>
        </div>

        <aside className="adventures-sidebar adventures-sidebar-bottom">
          <div className="adventures-sidebar-card compact-card">
            <div className="trip-list trip-list-compact trip-list-inline">
              {travelLog.map((trip) => (
                <button
                  key={trip.id}
                  type="button"
                  className={selectedTrip?.id === trip.id ? 'trip-chip trip-chip-active' : 'trip-chip'}
                  onClick={() => setSelectedTripId(trip.id)}
                >
                  <span className="trip-chip-dot" style={{ backgroundColor: trip.color }} />
                  <span>{trip.title}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedTrip ? (
            <div className="adventures-sidebar-card compact-card">
              <h2>{selectedTrip.title}</h2>
              <p className="trip-timeframe">{selectedTrip.timeframe}</p>
              <ol className="trip-stop-list trip-stop-list-compact trip-stop-list-inline">
                {selectedTrip.stops.map((stop) => (
                  <li key={stop.id}>{stop.name}</li>
                ))}
              </ol>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  )
}
