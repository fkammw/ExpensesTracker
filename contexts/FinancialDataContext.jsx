import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { testData } from './TestData';


// Define the initial empty state
const initialState = {
  expenses: [],
  incomes: [],
};

// Reducer function to handle actions
const financialDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return { ...state, expenses: action.payload };
        case 'SET_INCOMES':
            return { ...state, incomes: action.payload };
        case 'ADD_EXPENSE':
            return { ...state, expenses: [...state.expenses, action.payload] };
        case 'ADD_INCOME':
            return { ...state, incomes: [...state.incomes, action.payload] };
        default:
            return state;
    }
};

// Create the context
const FinancialDataContext = createContext();

// Context provider component
export const FinancialDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financialDataReducer, initialState);

  // Function to load data from AsyncStorage
  const loadData = useCallback(async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem('expenses');
      const savedIncomes = await AsyncStorage.getItem('incomes');
      
      if (savedExpenses !== null) {
        dispatch({ type: 'SET_EXPENSES', payload: JSON.parse(savedExpenses) });
      }
      
      if (savedIncomes !== null) {
        dispatch({ type: 'SET_INCOMES', payload: JSON.parse(savedIncomes) });
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Function to load test data
  const loadTestData = useCallback(async () => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(testData.expenses));
      await AsyncStorage.setItem('incomes', JSON.stringify(testData.incomes));
      dispatch({ type: 'SET_EXPENSES', payload: testData.expenses });
      dispatch({ type: 'SET_INCOMES', payload: testData.incomes });
    } catch (error) {
      console.error('Failed to load test data', error);
    }
  }, []);
  
  // Function to reset data
  const resetData = async () => {
    try {
        await AsyncStorage.clear(); // Clear AsyncStorage
        // Dispatch actions to reset state
        dispatch({ type: 'SET_EXPENSES', payload: [] });
        dispatch({ type: 'SET_INCOMES', payload: [] });
        alert('Data has been reset.');
    } catch (error) {
        alert('Failed to reset data: ' + error.message);
    }
  };


  return (
    <FinancialDataContext.Provider value={{ state, dispatch, loadTestData, resetData }}>
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => useContext(FinancialDataContext);
