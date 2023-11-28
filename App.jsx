import React, { createContext, useReducer, useContext } from 'react';
import { FinancialDataProvider } from './contexts/FinancialDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StatusBar } from 'expo-status-bar'; // Remove if not used

import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Expense from './screens/Expense';
import Income from './screens/Income';
import Budget from './screens/Budget';
import Home from './screens/Home';

const Tab = createBottomTabNavigator();

export const useFinancialData = () => useContext(FinancialDataContext);

export default function App() {
  return (
    <FinancialDataProvider>
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Expense') {
            iconName = 'upload';
          } else if (route.name === 'Income') {
            iconName = 'download';
          } else if (route.name === 'Budget') {
            iconName = 'piechart';
          }
          size = focused ? 28 : 24;

          // Choose the appropriate icon based on the route
          return route.name === 'Home' ? 
            <Foundation name={iconName} size={size} color={color} /> :
            <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4343D8',
        tabBarInactiveTintColor: '#9B9BF7',
        tabBarStyle: [{ display: 'flex' }, null]
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Income" component={Income} />
      <Tab.Screen name="Expense" component={Expense} />
      <Tab.Screen name="Budget" component={Budget} />
    </Tab.Navigator>

    </NavigationContainer>
    </FinancialDataProvider>
  );
}
