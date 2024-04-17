// src/screens/AddListScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ListContext } from '../context/ListContext';
import uuid from 'react-native-uuid';

export default function AddListScreen() {
    const navigation = useNavigation();
    const { lists, setLists } = useContext(ListContext);
    const [listName, setListName] = useState('');
    const [color, setColor] = useState('#FFFFFF');

    const colors = ['#2C0058', '#3B60B4', '#B21544', '#8FD810', '#525252'];

    const handleAddList = () => {
        if (listName && color !== '#FFFFFF') {
            const newList = { id: uuid.v4(), name: listName, color, items: [] };
            setLists(prevLists => [...prevLists, newList]);
            navigation.navigate('ListItems', { list: newList });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={listName}
                    onChangeText={setListName}
                    placeholder="Enter list name"
                />
                {listName.length > 0 && (
                    <TouchableOpacity onPress={() => setListName('')}>
                    <Ionicons name="close-circle" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.colorLabel}>Color</Text>
            <View style={styles.colorPicker}>
                {colors.map((colorOption, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.colorOption, 
                            { backgroundColor: colorOption },
                            color === colorOption ? styles.selectedColor : null
                        ]}
                        onPress={() => setColor(colorOption)}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.nextButton, (!listName || color === '#FFFFFF') && styles.disabledButton]} 
                onPress={handleAddList}
                disabled={!listName || color === '#FFFFFF'}
            >
                <Text style={styles.nextButtonText}>Next</Text>
                <Ionicons name="arrow-forward" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 50,
      backgroundColor: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      },
    input: {
      height: 50,
      paddingLeft: 20,
      width: '80%',
      fontSize: 25,
    },
    clearButton: {
        position: 'absolute',
        right: 10,
    },
    colorLabel: {
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
    colorPicker: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      width: '80%',
    },
    colorOption: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
        },
    cancelButton: {
        position: 'absolute',
        left: 20,
        bottom: 20,
    },
    cancelButtonText: {
        color: 'gray',
        fontSize: 20,
      },
    nextButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'black',
        marginRight: 5,
        fontSize: 20,
    },
    selectedColor: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    disabledButton: {
        opacity: 0.5,
    },
});