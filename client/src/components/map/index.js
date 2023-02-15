import React from 'react'
import logoMarker from "../../logo-map-marker.png"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



const containerStyle = {
  width: '900px',
  height: '900px'
};

const center = {
  lat: -33.8776191058,
  lng: 151.2034
  ,
};

// To hide map details
const mapStyles = {
  styles: [
    {
      "featureType": "landscape",
      "stylers": [
        {
          "lightness": 20
        },
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "saturation": 5
        },
        {
          "lightness": 5
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    }
  ]
}
function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}

    >
      <GoogleMap
        options={mapStyles}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}

      >
        { /* Child components, such as markers, info windows, etc. */}
        <Marker position={center} icon={logoMarker} />
        <></>
      </GoogleMap>

    </LoadScript>
  )
}

export default React.memo(MyComponent)