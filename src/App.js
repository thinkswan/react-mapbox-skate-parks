import React, { useState } from "react"
import ReactMapGL, { Marker } from "react-map-gl"
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
          <button className="marker-btn">
            <img src={skateboardSvg} alt="Skate park" />
          </button>
        </Marker>
      ))}
    </ReactMapGL>
  )
}
