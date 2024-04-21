import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ListProvider } from './src/context/ListContext';
import { DeletedListProvider } from './src/context/DeletedListContext';
import { FavouritesProvider } from './src/context/FavouritesContext';
import { UserProvider } from './src/context/UserContext';
import HomeScreen from './src/screens/HomeScreen';
import DeletedItemsScreen from './src/screens/DeletedItemsScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import AddListScreen from './src/screens/AddListScreen';
import ListItemsScreen from './src/screens/ListItemsScreen';
import LoginForm from './src/screens/LoginScreen';
import { UserContext } from './src/context/UserContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack () {
  const { name } = useContext(UserContext); // Retrieve name from UserContext
  
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{
          title: `Welcome, ${name}!`,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 34,
          },
        }}
      />
      <Stack.Screen 
        name="AddList" 
        component={AddListScreen}
        options={{ 
          title: 'Add List', 
          headerStyle: { 
            backgroundColor: 'white' 
          }, 
          headerTintColor: 'black',
          headerTitleStyle: { 
            fontWeight: 'bold',
            fontSize: 28,
          },
        }}
      />
      <Stack.Screen 
        name="ListItems" 
        component={ListItemsScreen}
        options={({ route }) => ({ 
          title: route.params.list.name, // Set the title to the list name
          headerStyle: { 
            backgroundColor: 'white' 
          }, 
          headerTintColor: 'black',
          headerTitleStyle: { 
            fontWeight: 'bold',
            fontSize: 28, 
          },
        })} 
      />
    </Stack.Navigator>
  );

}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#5500A9',
          height: 56,
          paddingTop: 10,
          paddingHorizontal: 30,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen 
        name="Favourites" 
        component={FavouritesScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="star-o" color={color} size={30} />
          ),
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 34, // Increase the font size
          },
        }}
      />
      <Tab.Screen 
        name="Recycle Bin" 
        component={DeletedItemsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="trash-o" color={color} size={30} />
          ),
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 34, // Increase the font size
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [lists, setLists] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Add a state to track login status
  const [userName, setUserName] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const onLoginSuccess = () => {
    // Logic to handle successful login
    console.log('Login successful');
  };
  
  return (
    <View style={styles.container}>
      <ListProvider value={[lists, setLists]}>
        <DeletedListProvider>
          <FavouritesProvider>
            <UserProvider setName={setUserName}>
              <NavigationContainer>
                <StatusBar style="auto" />
                {!isLoggedIn ? (
                  <LoginForm onLoginSuccess={handleLogin} />
                ) : (
                  <TabNavigator />
                )}
              </NavigationContainer>
            </UserProvider>
          </FavouritesProvider>
        </DeletedListProvider>
      </ListProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
