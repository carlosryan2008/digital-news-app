import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";
import { TextField, CircularProgress } from '@mui/material';

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

export default function MuseumMap() {
  const [museums, setMuseums] = useState<google.maps.places.PlaceResult[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMuseum, setSelectedMuseum] = useState<google.maps.places.PlaceResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [searchLocation, setSearchLocation] = useState<google.maps.LatLngLiteral | null>(null);

  const fetchMuseums = useCallback((location: google.maps.LatLngLiteral) => {
    if (map && window.google && window.google.maps && window.google.maps.places) {
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        location: location,
        radius: 5000,
        type: 'museum',
        keyword: searchQuery || '',
      };

      console.log('Fetching museums with request:', request);

      service.nearbySearch(request, (results, status) => {
        console.log('Service response:', results, status);
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setMuseums(results);
        } else {
          setMuseums([]);
          console.error('Error fetching museums:', status);
        }
        setLoading(false);
      });
    }
  }, [map, searchQuery]);

  const geocodeAddress = useCallback((address: string) => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        console.log('Geocoding response:', results, status);
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location.toJSON();
          setSearchLocation(location);
          if (map) {
            map.setCenter(location);
            setLoading(true);
            fetchMuseums(location);
          }
        } else {
          console.error('Error geocoding address:', status);
          setLoading(false);
        }
      });
    }
  }, [map, fetchMuseums]);

  useEffect(() => {
    // Obter a localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);

          if (map) {
            // Centralizar o mapa na localização do usuário
            map.setCenter(location);
            setLoading(true);
            fetchMuseums(location);
          }
        },
        (error) => {
          console.error('Erro ao obter a localização do usuário:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocalização não é suportada pelo navegador.');
      setLoading(false);
    }
  }, [map, fetchMuseums]);

  const handleSearch = () => {
    if (searchQuery) {
      geocodeAddress(searchQuery);
    } else if (userLocation) {
      setMuseums([]);
      setLoading(true);
      fetchMuseums(userLocation);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <LoadScript 
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} 
      libraries={['places']}  // Certifique-se de incluir o library 'places'
    >
      <div>
        <TextField
          label="Pesquisar cidade"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {loading && <CircularProgress />}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={searchLocation || userLocation || { lat: -3.71722, lng: -38.54306 }}  // Centraliza em Fortaleza se a localização do usuário não estiver disponível
          zoom={12}
          onLoad={(mapInstance) => setMap(mapInstance)}
          options={mapOptions}
        >
          {museums.map((museum) => (
            <Marker
              key={museum.place_id}
              position={{
                lat: museum.geometry?.location?.lat() || 0,
                lng: museum.geometry?.location?.lng() || 0,
              }}
              title={museum.name}
              onClick={() => setSelectedMuseum(museum)}
            />
          ))}
          {selectedMuseum && (
            <InfoWindow
              position={{
                lat: selectedMuseum.geometry?.location?.lat() || 0,
                lng: selectedMuseum.geometry?.location?.lng() || 0,
              }}
              onCloseClick={() => setSelectedMuseum(null)}
            >
              <div>
                <h2>{selectedMuseum.name}</h2>
                <p>{selectedMuseum.vicinity}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}
