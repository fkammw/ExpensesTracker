import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { testData } from './TestData';


// Define the initial empty state
const initialState = {
  expenses: [],
  incomes: [],
  budgets: [],
};

// Reducer function to handle actions
const financialDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return { ...state, expenses: action.payload };
        case 'SET_INCOMES':
            return { ...state, incomes: action.payload };
        case 'SET_BUDGETS':
          return { ...state, budgets: action.payload };
        case 'ADD_EXPENSE':
            return { ...state, expenses: [...state.expenses, action.payload] };
        case 'ADD_INCOME':
            return { ...state, incomes: [...state.incomes, action.payload] };
        case 'ADD_BUDGETS':
            return { ...state, budgets: [...state.budgets, action.payload] };
        default:
            return state;
    }
};

// Create the context
const FinancialDataContext = createContext();

// Context provider component
export const FinancialDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financialDataReducer, initialState);

  const loadData = useCallback(async () => {
    try {
      // Load expenses, incomes, and budgets from AsyncStorage
      const savedExpenses = await AsyncStorage.getItem('expenses');
      const savedIncomes = await AsyncStorage.getItem('incomes');
      const savedBudgets = await AsyncStorage.getItem('budgets');
      
      dispatch({ type: 'SET_EXPENSES', payload: savedExpenses ? JSON.parse(savedExpenses) : [] });
      dispatch({ type: 'SET_INCOMES', payload: savedIncomes ? JSON.parse(savedIncomes) : [] });
      dispatch({ type: 'SET_BUDGETS', payload: savedBudgets ? JSON.parse(savedBudgets) : {} });
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
      await AsyncStorage.setItem('budgets', JSON.stringify(testData.budgets));
      dispatch({ type: 'SET_EXPENSES', payload: testData.expenses });
      dispatch({ type: 'SET_INCOMES', payload: testData.incomes });
      dispatch({ type: 'SET_BUDGETS', payload: testData.budgets });
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
        dispatch({ type: 'SET_BUDGETS', payload: [] });
        alert('Data has been reset.');
    } catch (error) {
        alert('Failed to reset data: ' + error.message);
    }
  };

  const isMonthOverBudget = useCallback((month) => {
    const monthlyExpenses = state.expenses.filter(expense => expense.date.startsWith(month));
    const totalSpent = monthlyExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    return totalSpent > (state.budgets[month] || 0);
  }, [state.expenses, state.budgets]);

  return (
  <FinancialDataContext.Provider value={{ state, dispatch, loadTestData, resetData, isMonthOverBudget }}>
    {children}
  </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => useContext(FinancialDataContext);
