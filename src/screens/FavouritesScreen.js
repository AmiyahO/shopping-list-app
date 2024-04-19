import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FavouritesContext } from '../context/FavouritesContext';

const FavouritesScreen = () => {
    const { favourites, toggleFavourite } = useContext(FavouritesContext);
    
    return (
        <View style={styles.container}>
            {favourites.length === 0 ? (
                <Text>No favourite items yet!</Text>
            ) : (
                <FlatList
                    style={styles.listContainer}
                    data={favourites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.listItem}>
                            <View style={styles.listItemContent}>
                                <FontAwesome name="circle" size={24} color={item.listColor} style={{ marginRight: 4 }} />
                                <Text style={styles.listItemText}>{item.name}</Text>
                            </View>
                                <FontAwesome 
                                    name="star" // Always show star icon, but change color based on starred property
                                    size={24} 
                                    color="gold" 
                                    onPress={() => toggleFavourite(item)}
                                /> 
                                {/* You can add additional item details here */}
                            
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        backgroundColor:'white'
    },
    listContainer: {
        flex: 1,
        alignSelf: 'stretch', // Make the container take the full width
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 0, // Remove padding from the bottom
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
})

export default FavouritesScreen;