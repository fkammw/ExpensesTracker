import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Define the initial state
const initialState = {
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
            // Logic to add an expense and save to AsyncStorage
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            };
        case 'ADD_INCOME':
            // Logic to add an income and save to AsyncStorage
            return {
                ...state,
                incomes: [...state.incomes, action.payload]
            };
        // Add more cases as needed for updating and deleting
        default:
            return state;
    }
};


// Create the context
const FinancialDataContext = createContext();

// Context provider component
export const FinancialDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(financialDataReducer, initialState);

    useEffect(() => {
        const loadData = async () => {
          try {
            const savedExpenses = await AsyncStorage.getItem('expenses');
            const savedIncomes = await AsyncStorage.getItem('incomes');
      
            // If there are saved expenses, use them, otherwise use initial expenses
            if (savedExpenses !== null) {
              dispatch({ type: 'SET_EXPENSES', payload: JSON.parse(savedExpenses) });
            } else {
              dispatch({ type: 'SET_EXPENSES', payload: initialState.expenses });
            }
            
            // If there are saved incomes, use them, otherwise use initial incomes
            if (savedIncomes !== null) {
              dispatch({ type: 'SET_INCOMES', payload: JSON.parse(savedIncomes) });
            } else {
              dispatch({ type: 'SET_INCOMES', payload: initialState.incomes });
            }
          } catch (error) {
            console.error('Failed to load data', error);
          }
        };
      
        loadData();
      }, []);
      

    return (
        <FinancialDataContext.Provider value={{ state, dispatch }}>
            {children}
        </FinancialDataContext.Provider>
    );
};


// Hook to use financial data in components
export const useFinancialData = () => useContext(FinancialDataContext);
