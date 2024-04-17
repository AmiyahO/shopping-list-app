// src/components/ListItemsScreen.js
import React, { useContext, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {ScrollView} from 'react-native';
import { ListContext } from '../context/ListContext';
import { DeletedListContext } from '../context/DeletedListContext';
import uuid from 'react-native-uuid';
import tinycolor from 'tinycolor2';

export default function ListItemsScreen({ route }) {
  const navigation = useNavigation();
  const { lists, setLists, updateList } = useContext(ListContext);
  const [newItem, setNewItem] = useState('');
  const { deletedLists, setDeletedLists } = useContext(DeletedListContext);
  
  const { list: incomingList } = route.params;
  const list = lists.find(list => list.id === incomingList.id);

  // Check if list is defined before trying to access its items property
 const [items, setItems] = useState(list ? list.items : []);

  useLayoutEffect(() => {
    const headerTintColor = tinycolor(list.color).isLight() ? 'black' : 'white';
    
    navigation.setOptions({
      headerStyle: {
        backgroundColor: list.color, // Set the header background color to the list color
      },
      headerTintColor: headerTintColor, // Set the header text (and icons) color
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} >
          <Ionicons name="arrow-back" size={25} color={headerTintColor} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleDeleteList} >
          <Ionicons name="trash" size={25} color={headerTintColor} />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center', // Align the title to the center
    });
  }, [navigation, list.color]);

  const handleAddItem = (text) => {
    if (text) {
      const newItem = { id: uuid.v4(), name: text, checked: false, starred: false };
      const newItems = [...items, newItem];
      setItems(newItems);
      updateList(list.id, newItems); // Update the items in the ListContext
      setNewItem(''); // Clear the TextInput
    }
  };

  const handleCheckItem = (id) => {
    const newItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(newItems);
    updateList(list.id, newItems); // Update the items in the ListContext
  };

  const handleStarItem = (id) => {
    const newItems = items.map((item) => item.id === id ? { ...item, starred: !item.starred } : item);
    setItems(newItems);
    updateList(list.id, newItems); // Update the items in the ListContext
  };

  const handleDeleteList = () => {
    setLists(lists.filter(l => l.id !== list.id)); // Remove the list from the lists
    setDeletedLists([...deletedLists, list]); // Add the list to the deleted lists
    navigation.navigate('HomeScreen'); // Navigate back to the home screen
  };

  return (
    list && (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ScrollView>
            {items.map((item) => (
              <View key={item.id} style={styles.listItem}>
              <View style={styles.listItemContent}>
                <TouchableOpacity onPress={() => handleCheckItem(item.id)}>
                  <MaterialIcons name={item.checked ? "check-box" : "check-box-outline-blank"} size={24} color="black" />
                </TouchableOpacity>
                {typeof item.name === 'string' && <Text style={[styles.listItemText, item.checked ? styles.checkedItemText : {}]}>{item.name}</Text>}
              </View>
              <TouchableOpacity onPress={() => handleStarItem(item.id)}>
                <FontAwesome name={item.starred ? "star" : "star-o"} size={24} color={item.starred ? "gold" : "#5500A9"} /> 
              </TouchableOpacity>
            </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.addItemContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setNewItem}
            onSubmitEditing={(event) => handleAddItem(event.nativeEvent.text)}
            placeholder="Add new item"
            value={newItem} // Bind the newItem state to the TextInput value
          />
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddItem(newItem)}>
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Add some padding at the bottom
    paddingTop: 20,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch', // Make the container take the full width
    justifyContent: 'flex-start', // Start items from the top
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 0, // Remove padding from the bottom
  },
  input: {
    height: 50,
    paddingLeft: 35,
    width: '70%',
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    marginRight: 15, // Add some margin to the right
  },
  addButton: {
    backgroundColor: '#5500A9',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 35,
    borderColor: '#5500A9',
    backgroundColor: '#EDEFF3',
    padding: 20,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 20,
    marginLeft: 10, // Add some margin to the left of the text
  },
  listItemButtons: {
    flexDirection: 'row',
  },
  checkedItemText: {
    textDecorationLine: 'line-through', // Cross out the text
    color: 'gray', // Grey out the text
  },
});