import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import LocationComponent from '../components/LocationComponent';
import RestAPIComponent from '../components/WeatherComponent';

const LoginForm = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [latitude, setLatitude] = useState(null); // Add latitude state variable
  const [longitude, setLongitude] = useState(null); // Add longitude state variable

  const handleLogin = () => {
    console.log('Logging in with Name:', name, 'Surname:', surname);
    setName(name); // Update the name state with the entered name
    onLoginSuccess();
  };

  const handleLocationSuccess = (latitude, longitude) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder='Name'
        value={name}
        onChangeText={text => setName(text)} 
      />
      <TextInput
        style={styles.input}
        placeholder='Surname'
        value={surname}
        onChangeText={text => setSurname(text)}
      />
      <TouchableOpacity
        style={[styles.loginbtn, name === '' || surname === '' ? styles.disabled : null]}
        disabled={name === '' || surname === ''}
        onPress={handleLogin}
      >
      <Text style={styles.btntext}>Log in</Text>
      </TouchableOpacity>
      <LocationComponent onLocationSuccess={handleLocationSuccess} />
      {latitude !== null && longitude !== null && (
        <RestAPIComponent latitude={latitude} longitude={longitude} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 34,
    paddingBottom: 70,
    color: 'black',
  },
  input: {
    backgroundColor: '#F6F7FB',
    borderColor: '#5500A9',
    borderWidth: 1,
    height: 60,
    width: 285,
    marginVertical: 10,
    paddingLeft: 30,
    borderRadius: 30,
    color: 'black',
    fontSize: 20,
    fontWeight:'bold',
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  loginbtn: {
    backgroundColor: '#5500A9',
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
    width: 150,
    height: 50,
    alignSelf: 'center',
  },
  btntext: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  disabled: {
    backgroundColor: 'gray',
    color: 'white',
  },
});

export default LoginForm;