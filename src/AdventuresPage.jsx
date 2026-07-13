import { useMemo, useState } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import worldAtlas from 'world-atlas/countries-110m.json'
import { travelLog } from './adventuresData'

const MAP_WIDTH = 960
const MAP_HEIGHT = 520
const MIN_SCALE = 1
const MAX_SCALE = 8
const ZOOM_STEP = 1.2

const worldFeatures = feature(worldAtlas, worldAtlas.objects.countries).features

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

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
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 })
  const [dragState, setDragState] = useState(null)

  const projection = useMemo(() => buildProjection(), [])
  const pathGenerator = useMemo(() => geoPath(projection), [projection])

  const selectedTrip = travelLog.find((trip) => trip.id === selectedTripId) ?? travelLog[0] ?? null

  const projectedTrips = useMemo(() => {
    return travelLog.map((trip) => {
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
    })
  }, [projection])

  const activeProjectedTrip = projectedTrips.find((trip) => trip.id === selectedTrip?.id) ?? projectedTrips[0] ?? null

  const zoom = (direction) => {
    setView((current) => ({
      ...current,
      scale: clamp(current.scale * direction, MIN_SCALE, MAX_SCALE),
    }))
  }

  const handleWheel = (event) => {
    event.preventDefault()
    const nextScale = event.deltaY > 0 ? view.scale / ZOOM_STEP : view.scale * ZOOM_STEP
    setView((current) => ({
      ...current,
      scale: clamp(nextScale, MIN_SCALE, MAX_SCALE),
    }))
  }

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragState({ startX: event.clientX, startY: event.clientY, originX: view.x, originY: view.y })
  }

  const handlePointerMove = (event) => {
    if (!dragState) return
    setView((current) => ({
      ...current,
      x: dragState.originX + (event.clientX - dragState.startX),
      y: dragState.originY + (event.clientY - dragState.startY),
    }))
  }

  const handlePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setDragState(null)
  }

  return (
    <section className="section page-section adventures-shell">
      <div className="section-heading adventures-heading">
        <h1>Beck’s Adventures</h1>
        <p>A living travel log with pins for the places you’ve stayed and lines connecting each trip.</p>
      </div>

      <div className="adventures-layout">
        <aside className="adventures-sidebar">
          <div className="adventures-sidebar-card">
            <p className="adventures-kicker">Trip index</p>
            <div className="trip-list">
              {travelLog.map((trip) => (
                <button
                  key={trip.id}
                  type="button"
                  className={selectedTrip?.id === trip.id ? 'trip-chip trip-chip-active' : 'trip-chip'}
                  onClick={() => setSelectedTripId(trip.id)}
                >
                  <span className="trip-chip-dot" style={{ backgroundColor: trip.color }} />
                  <span>
                    {trip.title}
                    {trip.provisional ? ' · starter' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {selectedTrip ? (
            <div className="adventures-sidebar-card">
              <p className="adventures-kicker">Selected trip</p>
              <h2>{selectedTrip.title}</h2>
              <p>{selectedTrip.summary}</p>
              <p className="trip-timeframe">{selectedTrip.timeframe}</p>
              <ol className="trip-stop-list">
                {selectedTrip.stops.map((stop) => (
                  <li key={stop.id}>
                    <strong>{stop.name}</strong>
                    <span>{stop.note}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </aside>

        <div className="map-card">
          <div className="map-toolbar">
            <p>Scroll to zoom. Drag to move.</p>
            <div className="map-controls">
              <button type="button" className="button" onClick={() => zoom(1 / ZOOM_STEP)}>
                −
              </button>
              <button type="button" className="button" onClick={() => setView({ scale: 1, x: 0, y: 0 })}>
                reset
              </button>
              <button type="button" className="button" onClick={() => zoom(ZOOM_STEP)}>
                +
              </button>
            </div>
          </div>

          <div className="map-frame">
            <svg
              className="adventures-map"
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              role="img"
              aria-label="World map showing Beck's travel log"
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#f7fbff" rx="28" />
              <g transform={`translate(${view.x} ${view.y}) scale(${view.scale})`}>
                {worldFeatures.map((shape) => (
                  <path
                    key={shape.id}
                    d={pathGenerator(shape)}
                    className="map-country"
                  />
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
                    <g key={`${trip.id}-${stop.id}`}>
                      <circle
                        cx={stop.x}
                        cy={stop.y}
                        r={selectedTrip?.id === trip.id ? 6 : 4.5}
                        className={selectedTrip?.id === trip.id ? 'trip-stop trip-stop-active' : 'trip-stop'}
                        style={{ '--trip-color': trip.color }}
                      />
                    </g>
                  )),
                )}
              </g>
            </svg>
          </div>

          {activeProjectedTrip?.provisional ? (
            <p className="map-note">
              Starter data is live. Send me your trips later and I’ll turn this into the real log.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
