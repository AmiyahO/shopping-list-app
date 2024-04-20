import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleLogin = () => {
    console.log('Logging in with Name:', name, 'Surname:', surname);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logintext}>Login</Text>
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
        <Text style={styles.btntext}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logintext: {
    fontSize: 25,
    fontWeight:'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: 285,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  loginbtn: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    color:'#fff'
  },
  btntext: {
    color: '#fff',
    textAlign: 'center',
    width:55,
  },
  disabled: {
    backgroundColor: 'gray',
    color: '#000000',
  },
});
