import { useMemo, useRef, useState } from 'react'
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

function getDistance(first, second) {
  return Math.hypot(second.x - first.x, second.y - first.y)
}

function getMidpoint(first, second) {
  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  }
}

function zoomAroundPoint(view, nextScale, point) {
  const ratio = nextScale / view.scale

  return {
    scale: nextScale,
    x: point.x - (point.x - view.x) * ratio,
    y: point.y - (point.y - view.y) * ratio,
  }
}

export default function AdventuresPage() {
  const [selectedTripId, setSelectedTripId] = useState(travelLog[0]?.id ?? null)
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 })
  const pointersRef = useRef(new Map())
  const gestureRef = useRef(null)

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

  const zoom = (direction) => {
    setView((current) => {
      const nextScale = clamp(current.scale * direction, MIN_SCALE, MAX_SCALE)
      return zoomAroundPoint(current, nextScale, { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 })
    })
  }

  const resetView = () => {
    pointersRef.current.clear()
    gestureRef.current = null
    setView({ scale: 1, x: 0, y: 0 })
  }

  const handleWheel = (event) => {
    event.preventDefault()
    const bounds = event.currentTarget.getBoundingClientRect()
    const point = {
      x: ((event.clientX - bounds.left) / bounds.width) * MAP_WIDTH,
      y: ((event.clientY - bounds.top) / bounds.height) * MAP_HEIGHT,
    }

    setView((current) => {
      const nextScale = clamp(
        event.deltaY > 0 ? current.scale / ZOOM_STEP : current.scale * ZOOM_STEP,
        MIN_SCALE,
        MAX_SCALE,
      )

      return zoomAroundPoint(current, nextScale, point)
    })
  }

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    const nextPointers = new Map(pointersRef.current)
    nextPointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    pointersRef.current = nextPointers

    const pointerValues = [...nextPointers.values()]

    if (pointerValues.length === 1) {
      gestureRef.current = {
        type: 'pan',
        startPointer: pointerValues[0],
        startView: view,
      }
      return
    }

    if (pointerValues.length === 2) {
      const [first, second] = pointerValues
      gestureRef.current = {
        type: 'pinch',
        startDistance: getDistance(first, second),
        startMidpoint: getMidpoint(first, second),
        startView: view,
      }
    }
  }

  const handlePointerMove = (event) => {
    if (!pointersRef.current.has(event.pointerId)) return

    const nextPointers = new Map(pointersRef.current)
    nextPointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    pointersRef.current = nextPointers

    const pointerValues = [...nextPointers.values()]
    const gesture = gestureRef.current

    if (!gesture) return

    if (pointerValues.length >= 2) {
      const [first, second] = pointerValues
      const currentDistance = getDistance(first, second)
      const currentMidpoint = getMidpoint(first, second)

      setView(() => {
        const nextScale = clamp(
          gesture.startView.scale * (currentDistance / gesture.startDistance),
          MIN_SCALE,
          MAX_SCALE,
        )

        const scaledView = zoomAroundPoint(gesture.startView, nextScale, gesture.startMidpoint)

        return {
          ...scaledView,
          x: scaledView.x + (currentMidpoint.x - gesture.startMidpoint.x),
          y: scaledView.y + (currentMidpoint.y - gesture.startMidpoint.y),
        }
      })

      return
    }

    if (gesture.type === 'pan' && pointerValues.length === 1) {
      const [pointer] = pointerValues
      setView(() => ({
        ...gesture.startView,
        x: gesture.startView.x + (pointer.x - gesture.startPointer.x),
        y: gesture.startView.y + (pointer.y - gesture.startPointer.y),
      }))
    }
  }

  const handlePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const nextPointers = new Map(pointersRef.current)
    nextPointers.delete(event.pointerId)
    pointersRef.current = nextPointers

    const pointerValues = [...nextPointers.values()]

    if (pointerValues.length === 1) {
      gestureRef.current = {
        type: 'pan',
        startPointer: pointerValues[0],
        startView: view,
      }
      return
    }

    if (pointerValues.length === 0) {
      gestureRef.current = null
    }
  }

  return (
    <section className="section page-section adventures-shell">
      <div className="section-heading adventures-heading compact-heading">
        <h1>Beck’s Adventures</h1>
      </div>

      <div className="adventures-layout">
        <aside className="adventures-sidebar">
          <div className="adventures-sidebar-card compact-card">
            <div className="trip-list trip-list-compact">
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
              <ol className="trip-stop-list trip-stop-list-compact">
                {selectedTrip.stops.map((stop) => (
                  <li key={stop.id}>{stop.name}</li>
                ))}
              </ol>
            </div>
          ) : null}
        </aside>

        <div className="map-card compact-card">
          <div className="map-toolbar map-toolbar-compact">
            <p>Drag • pinch • zoom</p>
            <div className="map-controls">
              <button type="button" className="button" onClick={() => zoom(1 / ZOOM_STEP)}>
                −
              </button>
              <button type="button" className="button" onClick={resetView}>
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
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#f7fbff" rx="28" />
              <g transform={`translate(${view.x} ${view.y}) scale(${view.scale})`}>
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
                      r={selectedTrip?.id === trip.id ? 6 : 4.5}
                      className={selectedTrip?.id === trip.id ? 'trip-stop trip-stop-active' : 'trip-stop'}
                      style={{ '--trip-color': trip.color }}
                    />
                  )),
                )}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
