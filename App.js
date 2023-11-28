import React from "react"; 
// import { StatusBar } from 'expo-status-bar'; // Remove if not used

import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Expenses } from './screens/Expenses';
import {Add} from './screens/Add';
import {Reports} from './screens/Reports';
import Home from './screens/Home';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
              size = focused ? 28 : 24;
            } else if (route.name === 'Expenses') {
              iconName = 'upload';
              size = focused ? 28 : 24;
            } else if (route.name === 'Add') {
              iconName = 'download';
              size = focused ? 28 : 24;
            } else if (route.name === 'Reports') {
              iconName = 'piechart';
              size = focused ? 28 : 24;
            }

            return route.name === 'Home' ? 
              <Foundation name={iconName} size={size} color={color} /> :
              <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#4343D8',
          inactiveTintColor: '#9B9BF7',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Expenses" component={Expenses} />
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="Reports" component={Reports} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
