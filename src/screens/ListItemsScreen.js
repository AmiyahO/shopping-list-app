import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ListContext } from '../context/ListContext';
import { DeletedListContext } from '../context/DeletedListContext';
import { FavouritesContext } from '../context/FavouritesContext';
import uuid from 'react-native-uuid';
import tinycolor from 'tinycolor2';

export default function ListItemsScreen({ route }) {
  const navigation = useNavigation();
  const { lists, setLists, updateList } = useContext(ListContext);
  const [newItem, setNewItem] = useState('');
  const { deletedLists, setDeletedLists } = useContext(DeletedListContext);
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);
  
  const { list: incomingList } = route.params;
  const list = lists.find(list => list.id === incomingList.id);

  // Check if list is defined before trying to access its items property
  const [items, setItems] = useState(list ? list.items : []);

  useEffect(() => {
    setItems(items.map(item => ({
        ...item,
        starred: favourites.some(favItem => favItem.id === item.id) // Set starred property based on favourites
    })));
  }, [favourites]);
 
 useLayoutEffect(() => {
  // Set the header background color to the list color and the text color based on the list color  
  const headerTintColor = tinycolor(list.color).isLight() ? 'black' : 'white';
    
    navigation.setOptions({
      headerStyle: {
        backgroundColor: list.color,
      },
      headerTintColor: headerTintColor,
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
      headerTitleAlign: 'center',
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

  // Add or remove an item from the favourites list based on the star icon being pressed
  const handleStarItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        if (item.starred) {
          removeFavourite(id);
        } else {
          addFavourite({ ...item, listColor: list.color });
        }
        return { ...item, starred: !item.starred };
      }
      return item;
    });
    setItems(newItems);
    updateList(list.id, newItems); // Update the items in the ListContext
  };

  const handleDeleteList = () => {
    // Find the list in the lists array
    const listToDelete = lists.find(l => l.id === list.id);
    
    if (listToDelete) {
      setLists(lists.filter(l => l.id !== list.id)); // Remove the list from the lists array
      setDeletedLists([...deletedLists, listToDelete]); // Add the list to the deleted lists array
  
      // Remove any items from the deleted list that are in the favourites list
      listToDelete.items.forEach(item => {
        if (item.starred) {
          removeFavourite(item.id);
        }
      });
  
      navigation.navigate('HomeScreen'); // Navigate back to the home screen
    }
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
            value={newItem}
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
    marginBottom: 20,
    paddingTop: 20,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 0,
  },
  input: {
    height: 50,
    paddingLeft: 35,
    width: '70%',
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    marginRight: 15,
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
    marginLeft: 10,
  },
  listItemButtons: {
    flexDirection: 'row',
  },
  checkedItemText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});