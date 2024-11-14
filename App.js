import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import WeatherScreen from './WeatherScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Weather App' }} />
        <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: 'توقعات الطقس' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
