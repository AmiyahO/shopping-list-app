import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const LocationComponent = ({ onLocationSuccess }) => {
    const [errorMsg, setErrorMsg] = useState(null);
    
    useEffect(() => {
      (async () => {
        // Request permission to access the location of the device and get the current location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        onLocationSuccess(location.coords.latitude, location.coords.longitude); // Call the onLocationSuccess function with the latitude and longitude
      })();
    }, [onLocationSuccess]);

    return null;// Render nothing
  };

export default LocationComponent;