import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Fontisto, Ionicons, MaterialCommunityIcons, Feather, FontAwesome, FontAwesome5} from '@expo/vector-icons';

const RestAPIComponent = ({ latitude, longitude }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Fetch weather data from the API when the latitude and longitude are available
    if (latitude && longitude) {
      getWeatherDataFromAPI();
    }
  }, [latitude, longitude]);

  // Fetch weather data from the OpenWeatherMap API
  const getWeatherDataFromAPI = async () => {
    try {
      console.log("Loading data ... ");
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=8d0d74cacd05c0c91dc1dda16a7eac3e`
      );
      const json = await response.json();
      console.log(json);
      setLoading(false);
      setData(json);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching weather data:', error);
      setErrorMsg('Error fetching weather data');
    }
  };
  
  // Render the weather icon based on the weather data
  const renderWeatherIcon = () => {
    if (!data || !data.weather || data.weather.length === 0) {
      return <Text style={styles.text}>Weather data not available</Text>;
    }
    
    const iconCode = data.weather[0].icon;
    
    // change weather api icon based on the icon code
    switch (iconCode) {
      case '01d':
        return <Feather name="sun" size={30} color="#FFD700" />;
      case '01n':
        return <Feather name="moon" size={30} color="black" />;
      case '02d':
        return <FontAwesome5 name="cloud-sun" size={30} color="gray" />;
      case '02n':
        return <FontAwesome5 name="cloud-moon" size={30} color="gray" />;
      case '03d':
        return <MaterialCommunityIcons name="weather-partly-cloudy" size={30} color="gray" />;
      case '03n':
        return <MaterialCommunityIcons name="weather-night-partly-cloudy" size={30} color="gray" />;
      case '04d':
      case '04n':
        return <FontAwesome name="cloud" size={30} color="gray" />;
      case '09d':
      case '09n':
        return <FontAwesome5 name="cloud-showers-heavy" size={30} color="gray" />;
      case '10d':
      case '10n':
        return <Ionicons name="rainy" size={30} color="blue" />;
      case '11d':
      case '11n':
        return <Fontisto name="lightning" size={30} color="midnightblue" />;
      case '13d':
      case '13n':
        return <FontAwesome5 name="snowflake" size={30} color="#ADD8E6" />;
      case '50d':
      case '50n':
        return <MaterialCommunityIcons name="weather-fog" size={30} color="gray" />;
      default:
        return <Ionicons name="thermometer-outline" size={30} color="#5500A9" />;
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View>
          <Text style={styles.text}>Loading...</Text>
          <ActivityIndicator size="large" color="#5500A9" />
        </View>
      )}
      {data && !loading && (
        <View style={{ alignItems: "center", rowGap: 10 }}>
          {renderWeatherIcon()}
          <Text style={styles.text }>Temperature: {data.main.temp}</Text>
          <Text style={styles.text}>Feels Like: {data.main.feels_like}</Text>
          <Text style={styles.text}>Min Temperature: {data.main.temp_min}</Text>
          <Text style={styles.text}>Max Temperature: {data.main.temp_max}</Text>
        </View>
      )}
      <Pressable
        onPress={() => {
          getWeatherDataFromAPI();
        }}
        style={styles.pressable}
      >
        <Text style={styles.pressabletxt}>Reload</Text>
      </Pressable>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    color: "black",
  },
  pressable: {
    width: 150,
    height: 50,
    marginVertical: 20,
    backgroundColor: "#5500A9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  pressabletxt:{
    color:'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  }
};

export default RestAPIComponent;