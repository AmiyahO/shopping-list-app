import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const RestAPIComponent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getWeatherDataFromAPI();
    return () => {};
  }, []);

  const getWeatherDataFromAPI = async () => {
    try {
      console.log("Loading data ... ");
      setLoading(true);
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=35.1662941715448&lon=33.314645205165675&appid=e1127e4563a7b6dac4f5e799c47622ff");
      const json = await response.json();
      console.log(json);
      setLoading(false);
      setData(json.main);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View>
          <Text style={styles.text}>Loading...</Text>
          <ActivityIndicator />
        </View>
      )}
      {data && !loading && (
        <View style={{ alignItems: "center", rowGap: 10 }}>
        <Ionicons name="thermometer-outline" size={30}/><Text style={styles.text }>Temperature: {data.temp}</Text>
          <Text style={styles.text}>Feels Like: {data.feels_like}</Text>
          <Text style={styles.text}>Min Temperature: {data.temp_min}</Text>
          <Text style={styles.text}>Max Temperature: {data.temp_max}</Text>
        </View>
      )}
      <Pressable
        onPress={() => {
          getWeatherDataFromAPI();
        }}
        style={styles.pressable}
      ><Text style={styles.pressabletxt}>Reload</Text></Pressable>
    </View>
  );
};

export default RestAPIComponent;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    
  },
  pressable: {
    width: 100,
    height: 40,
    marginVertical: 15,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  pressabletxt:{
    color:'#fff'
  }
};
