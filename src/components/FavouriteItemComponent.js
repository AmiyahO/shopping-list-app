import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FavouriteItemComponent = ({ item, isFavourite, onToggleFavourite }) => {
  return (
    <TouchableOpacity onPress={onToggleFavourite}>
      <View style={{ padding: 10 }}>
        <Text>{item.name}</Text>
        {/* You can add additional item details here */}
      </View>
    </TouchableOpacity>
  );
};

export default FavouriteItemComponent;