import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';

// Define the initial empty state
const initialState = {
  expenses: [],
  incomes: [],
};

// Define the test data 
const testData = {
    expenses: [
        { date: '2023-01-01', category: 'Dining', description: 'Earls Kitchen', amount: 45.00 },
        { date: '2023-01-03', category: 'Fashion', description: 'Lululemon', amount: 79.00 },
        { date: '2023-01-09', category: 'Entertainment', description: 'Gamestop', amount: 40.00 },
        { date: '2023-01-12', category: 'Groceries', description: 'Walmart', amount: 40.00 },
        { date: '2023-01-12', category: 'Transportation', description: 'Costco Gas', amount: 56.00 },
        { date: '2023-01-15', category: 'Utilities', description: 'Telus Intenet', amount: 80.00 },
        { date: '2023-01-17', category: 'Others', description: 'lost', amount: 10.00 },
    ],
    incomes: [
        { date: '2023-01-05', category: 'Salary', description: 'Salary from Winners', amount: 2305.00 },
        { date: '2023-01-10', category: 'Interest', description: 'TD Bank interest', amount: 50.00 },
        { date: '2023-01-05', category: 'Property', description: 'Salary from Winners', amount: 1250.00 },
        { date: '2023-01-05', category: 'Others', description: 'Gift from Santa', amount: 120.00 },
        // Add more sample data as needed
    ],
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

  return (
    <FinancialDataContext.Provider value={{ state, dispatch, loadTestData }}>
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => useContext(FinancialDataContext);
