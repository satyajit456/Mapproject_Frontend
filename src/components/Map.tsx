import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, Polygon, InfoWindow, Circle } from '@react-google-maps/api';

interface MapProps {
  address: string;
}

export default function Map({ address }: MapProps) {
  const [center, setCenter] = useState({ lat: 25.7617, lng: -80.1918 });
  const [zoom, setZoom] = useState(12);
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [addressDetails, setAddressDetails] = useState('');
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAq6M_E3fa6uSymzqQZiJxIpL1ygca0JBk",
  });

  useEffect(() => {
    if (isLoaded && address) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          const newCenter = { lat: lat(), lng: lng() };
          setCenter(newCenter);
          setZoom(17);
          setAddressDetails(results[0].formatted_address);

          const offset = 0.001;
          setPolygonCoords([
            { lat: lat() + offset, lng: lng() - offset },
            { lat: lat() + offset, lng: lng() + offset },
            { lat: lat() - offset, lng: lng() + offset },
            { lat: lat() - offset, lng: lng() - offset },
          ]);
        }
      });
    }
  }, [isLoaded, address]);

  if (loadError) return <div className="w-full h-[300px] bg-red-50 rounded-lg flex items-center justify-center text-red-500">Error loading map</div>;
  if (!isLoaded) return <div className="w-full h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">Loading map...</div>;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-[300px] rounded-lg"
      center={center}
      zoom={zoom}
      options={{
        mapTypeId: 'satellite',
        tilt: 0,
      }}
    >
      {address && (
        <Marker
          position={center}
          onClick={() => setShowInfoWindow(true)} // Show InfoWindow on marker click
        />
      )}
      {polygonCoords.length > 0 && (
        <Polygon
          paths={polygonCoords}
          options={{
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      )}
      {showInfoWindow && (
        <InfoWindow position={center} onCloseClick={() => setShowInfoWindow(false)}>
          <div className="text-sm w-48">
            <strong>Address:</strong>
            <p>{addressDetails}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}