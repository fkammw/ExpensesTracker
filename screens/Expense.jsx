import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordList from '../components/RecordList';

// Define CATEGORY_OPTIONS outside of the component
const CATEGORY_OPTIONS = ['Dining', 'Fashion', 'Entertainment', 'Groceries', 'Transportation', 'Utilities', 'Others'];

const Expense = () => {
    const { dispatch, state } = useFinancialData();

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(CATEGORY_OPTIONS[0]); // Default to the first category (Dining)
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]); // Current date in YYYY-MM-DD format
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const submitExpense = async () => {
        if (!date || !amount || !category || !description) {
            alert('Please fill all fields.');
            return;
        }
    
        const newExpense = {
            date,
            amount: parseFloat(amount),
            category,
            description,
        };
        setIsSubmitting(true);
        try {
            // Dispatch action to add the expense
            dispatch({
                type: 'ADD_EXPENSE',
                payload: newExpense
            });
    
            // Retrieve the current expenses from AsyncStorage
            const existingExpenses = await AsyncStorage.getItem('expenses');
            const currentExpenses = existingExpenses ? JSON.parse(existingExpenses) : [];
    
            // Add the new expense to the current expenses
            const updatedExpenses = [...currentExpenses, newExpense];
    
            // Save the updated expenses back to AsyncStorage
            await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    
            alert('Expense added successfully!');
        } catch (error) {
            alert('Something went wrong, please try again!');
        } finally {
            setIsSubmitting(false);
        }
    
        // Reset the form
        setDate(new Date().toISOString().split('T')[0]);
        setAmount('');
        setCategory(CATEGORY_OPTIONS[0]);
        setDescription('');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.heading}>Reset Expense</Text>
            <Button title="Reset Data" onPress={resetData} />
            <Text style={styles.heading}>Add Expense</Text>
            <TextInput style={styles.textInput} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
            <TextInput style={styles.textInput} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
            <Text style={styles.label}>Category</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                style={{ height: 50, width: 200 }}
            >
                <Picker.Item label="Dining" value="Dining" />
                <Picker.Item label="Fashion" value="Fashion" />
                <Picker.Item label="Entertainment" value="Entertainment" />
                <Picker.Item label="Groceries" value="Groceries" />
                <Picker.Item label="Transportation" value="Transportation" />
                <Picker.Item label="Utilities" value="Utilities" />
                <Picker.Item label="Others" value="Others" />
            </Picker>

            <TextInput style={styles.textInput} placeholder="Description" value={description} onChangeText={setDescription} />
            <Button title="Add" onPress={submitExpense} disabled={isSubmitting} />
            <Text style={styles.heading}>Expenses:</Text>
            {state.expenses && (
            <RecordList records={state.expenses.slice().sort((a, b) => new Date(b.date) - new Date(a.date))} />
        )}
        </ScrollView>
    );
};

export default Expense;
