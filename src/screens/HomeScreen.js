// src/screens/HomeScreen.js
import React, { useContext } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ListContext } from '../context/ListContext';

export default function HomeScreen() {
  
  const navigation = useNavigation();
  const { lists, setLists} = useContext(ListContext);

  const handleSelectList = (list) => {
    // Navigate to the ListItemsScreen with the selected list
    navigation.navigate('ListItems', { list });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={lists.length === 0 && styles.scrollView}>
      {lists.length > 0 ? (
        lists.map((list) => (
          <TouchableOpacity key={list.id} style={[styles.list, {backgroundColor: list.color}]} onPress={() => handleSelectList(list)} >
            <Text style={styles.listName}>{list.name}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.placeholderContainer}>
          <Image source={require('../../assets/list-picture.png')} style={styles.image} />
          <Text style={styles.placeholderText}>No lists yet. {"\n"}Click the "+" button to create a new list.</Text>
        </View>
      )}
    </ScrollView>
    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddList')}>
        <Ionicons name="add" size={30} color="white" />
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50,
  },
  addButton: {
    backgroundColor: '#5500A9',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 40,
    bottom: 40,
  },
  list: {
    paddingLeft: 50,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 5,
    height: 80, // Set a fixed height
    width: 380, // Set a fixed width
    justifyContent: 'center', // Center the text vertically
  },
  listName: {
    color: 'white', // Change the text color to white
    fontSize: 30,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    paddingTop: 80,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});