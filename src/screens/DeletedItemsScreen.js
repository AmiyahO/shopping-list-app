import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DeletedItemsScreen() {
  return (
    <View style={styles.container}>
      <Text>Deleted Items</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    backgroundColor: 'white',
  },
});