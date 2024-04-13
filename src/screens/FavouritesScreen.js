import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import FavouriteItemComponent from '../components/FavouriteItemComponent';
import { useFavourites } from '../context/FavouritesContext';

const FavouritesScreen = () => {
    //const { items } = route.params; // Get items from route params

    //const favourites = items.filter(item => item.favourite); // Filter favourites from items

    const { favourites } = useFavourites();
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Favourites</Text>
            {favourites.length === 0 ? (
                <Text>No favourite items yet!</Text>
            ) : (
                <FlatList
                    data={favourites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <FavouriteItemComponent 
                            item={item} 
                            isFavourite={true}  // Since this screen only shows favourites, all items will be marked as favourites
                        />
                    )}
                />
            )}
        </View>
    );
};

export default FavouritesScreen;