import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, DrawingManager, OverlayView } from '@react-google-maps/api';

interface MapViewProps {
  address: string;
  onAreaCalculated: (area: number) => void;
}

const libraries: ("drawing" | "geometry" | "places" | "visualization")[] = ['drawing', 'geometry'];

const MapView: React.FC<MapViewProps> = ({ address, onAreaCalculated }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAq6M_E3fa6uSymzqQZiJxIpL1ygca0JBk",
    libraries: libraries,
  });

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(2);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [roofPolygon, setRoofPolygon] = useState<google.maps.Polygon | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const mapOptions = useCallback(() => {
    if (!isLoaded) return {};
    return {
      mapTypeId: 'satellite',
      tilt: 0,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    };
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && address && map) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          const newCenter = { lat: lat(), lng: lng() };
          setCenter(newCenter);
          setZoom(21); // Increased zoom level
          map.panTo(newCenter);
          map.setZoom(21);
        }
      });
    }
  }, [isLoaded, address, map]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
    if (roofPolygon) {
      roofPolygon.setMap(null);
    }
    setRoofPolygon(polygon);
    const area = google.maps.geometry.spherical.computeArea(polygon.getPath());
    onAreaCalculated(area);
  }, [onAreaCalculated, roofPolygon]);

  const RoofOverlay = () => {
    if (!roofPolygon) return null;
    const bounds = new google.maps.LatLngBounds();
    roofPolygon.getPath().forEach((point) => bounds.extend(point));
    return (
      <OverlayView
        bounds={bounds}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(173, 216, 230, 0.5)', // Light blue with 50% opacity
          pointerEvents: 'none',
        }} />
      </OverlayView>
    );
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={center}
      onLoad={onLoad}
      options={mapOptions()}
    >
      {address && <Marker position={center} />}
      <DrawingManager
        onPolygonComplete={onPolygonComplete}
        options={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON],
          },
          polygonOptions: {
            fillColor: '#ff0000',
            fillOpacity: 0.3,
            strokeWeight: 2,
            clickable: false,
            editable: true,
            zIndex: 1,
          },
        }}
      />
      <RoofOverlay />
    </GoogleMap>
  );
};

export default MapView;