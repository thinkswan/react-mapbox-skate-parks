import React, { useState, useEffect } from "react"
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import * as parkData from "./json/ottawa-skate-parks.json"
import skateboardSvg from "./svg/skateboard.svg"
import "./App.css"

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  })
  const [selectedPark, setSelectedPark] = useState(null)

  useEffect(() => {
    const listener = event => {
      if (event.key === "Escape") setSelectedPark(null)
    }

    window.addEventListener("keydown", listener)

    return () => window.removeEventListener("keydown", listener)
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={setViewport}
    >
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          latitude={park.geometry.coordinates[1]}
          longitude={park.geometry.coordinates[0]}
        >
          <button
            className="marker-btn"
            onClick={() => {
              setSelectedPark(park)
            }}
          >
            <img src={skateboardSvg} alt="Skate park" />
          </button>
        </Marker>
      ))}

      {selectedPark && (
        <Popup
          latitude={selectedPark.geometry.coordinates[1]}
          longitude={selectedPark.geometry.coordinates[0]}
          onClose={() => setSelectedPark(null)}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  )
}
