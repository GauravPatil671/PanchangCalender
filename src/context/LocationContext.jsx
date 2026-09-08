import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_LOCATION, POPULAR_CITIES } from '../utils/locationsData';

const LocationContext = createContext();

const STORAGE_KEY = 'panchang_selected_location';

export function LocationProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read location from localStorage');
    }
    return DEFAULT_LOCATION;
  });

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedLocation));
    } catch (e) {
      console.warn('Could not save location to localStorage');
    }
  }, [selectedLocation]);

  const setLocation = (loc) => {
    setSelectedLocation(loc);
    setIsSelectorOpen(false);
  };

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetecting(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Find closest city in our popular cities list
        let closest = POPULAR_CITIES[0];
        let minDistance = Infinity;

        POPULAR_CITIES.forEach((c) => {
          const d = Math.hypot(c.latitude - latitude, c.longitude - longitude);
          if (d < minDistance) {
            minDistance = d;
            closest = c;
          }
        });

        // If reasonably close (< 1.5 deg ~ 150km), use recognized city name, else custom coordinates
        if (minDistance < 1.5) {
          setLocation(closest);
        } else {
          setLocation({
            id: 'custom-location',
            city: 'My Location',
            state: 'Detected Coordinates',
            country: 'India',
            latitude,
            longitude,
            timezone: 'Asia/Kolkata'
          });
        }
        setIsDetecting(false);
        setIsSelectorOpen(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setGeoError('Unable to detect location. Please select your city manually.');
        setIsDetecting(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        setLocation,
        isSelectorOpen,
        setIsSelectorOpen,
        detectCurrentLocation,
        isDetecting,
        geoError,
        setGeoError
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}
