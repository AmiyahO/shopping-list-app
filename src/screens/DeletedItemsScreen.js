import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DeletedListContext } from '../context/DeletedListContext';
import { ListContext } from '../context/ListContext';
import { MaterialIcons } from '@expo/vector-icons';
import tinycolor from 'tinycolor2';

export default function DeletedItemsScreen() {
  const { deletedLists, restoreList } = useContext(DeletedListContext);
  const { addList } = useContext(ListContext);

  const handleRestoreList = (id) => {
    const list = restoreList(id);
    if (list) {
      addList(list);
    }
  };

  function getIconColor(backgroundColor) {
    return tinycolor(backgroundColor).isDark() ? 'white' : 'black';
  }
  
  return (
    <View style={styles.container}>
      {deletedLists.map((list) => (
        <View key={list.id} style={[styles.list, {backgroundColor: list.color}]}>
          <View style={styles.listItem}>
            <Text style={styles.listName}>{list.name}</Text>
            <TouchableOpacity title="Restore" onPress={() => handleRestoreList(list.id)}>
              <MaterialIcons name="restore" size={30} color={getIconColor(list.color)} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
  list: {
    paddingLeft: 50,
    paddingRight: 50,
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});