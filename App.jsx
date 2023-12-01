import React, { useContext } from 'react';
import { FinancialDataProvider } from './contexts/FinancialDataContext';
import { StyleSheet } from 'react-native';

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
      tabBarOptions={{activeBackgroundColor:'#e5dff5',inactiveBackgroundColor:'#e5dff5'}}
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
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: '#1b8aca',
        tabBarStyle: [{ display: 'flex' }, null],
        
      })}
    > 
      <Tab.Screen name="Home" component={Home} options={{headerStyle:{backgroundColor:'navy'},headerTintColor:'#fff', headerTitleAlign:'center',headerTitleStyle: { fontSize: 28, fontWeight: 'bold'}}}/>
      <Tab.Screen name="Income" component={Income} options={{headerStyle:{backgroundColor:'navy'},headerTintColor:'#fff', headerTitleAlign:'center',headerTitleStyle: { fontSize: 28, fontWeight: 'bold'}}}/>
      <Tab.Screen name="Expense" component={Expense} options={{headerStyle:{backgroundColor:'navy'},headerTintColor:'#fff', headerTitleAlign:'center',headerTitleStyle: { fontSize: 28, fontWeight: 'bold'}}}/>
      <Tab.Screen name="Budget" component={Budget} options={{headerStyle:{backgroundColor:'navy'},headerTintColor:'#fff', headerTitleAlign:'center',headerTitleStyle: { fontSize: 28, fontWeight: 'bold'}}}/>
    </Tab.Navigator>

    </NavigationContainer>
    </FinancialDataProvider>
  );
}
