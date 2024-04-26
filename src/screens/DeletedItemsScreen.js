import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DeletedListContext } from '../context/DeletedListContext';
import { ListContext } from '../context/ListContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function DeletedItemsScreen() {
  const { deletedLists, restoreList } = useContext(DeletedListContext);
  const { addList } = useContext(ListContext);

  // Restore a list from the deleted lists array and add it back to the lists array
  const handleRestoreList = (id) => {
    const list = restoreList(id);
    if (list) {
      addList(list);
    }
  };

  return (
    <View style={styles.container}>
      {deletedLists.length === 0 ? (
      <Text style={styles.placeholderText}>No deleted lists yet!</Text>
    ) : (
        deletedLists.map((list) => (
          <View key={list.id} style={[styles.list, {backgroundColor: list.color}]}>
            <View style={styles.listItem}>
              <Text style={styles.listName}>{list.name}</Text>
              <TouchableOpacity title="Restore" onPress={() => handleRestoreList(list.id)}>
                <MaterialIcons name="restore" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))
    )}
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
    height: 80,
    width: 380,
    justifyContent: 'center',
  },
  listName: {
    color: 'white',
    fontSize: 30,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});