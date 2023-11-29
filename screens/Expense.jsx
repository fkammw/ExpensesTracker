import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordList from '../components/RecordList';

const category_options = ['Dining', 'Fashion', 'Entertainment', 'Groceries', 'Transportation', 'Utilities', 'Others'];

const Expense = () => {
    const { dispatch, state } = useFinancialData();
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(category_options[0]);
    const [description, setDescription] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateAndSetDate = (inputDate) => {
        if (!inputDate) return;
        const regex = /^\d{4}-\d{1,2}-\d{1,2}$/; // Regex to match YYYY-M-D or YYYY-MM-DD
    
        if (regex.test(inputDate)) {
            const [year, month, day] = inputDate.split('-').map(part => part.padStart(2, '0'));
            setDate(`${year}-${month}-${day}`);
        } else {
            // Handle invalid date format
            alert('Invalid date format. Please use YYYY-MM-DD format.');
            setDate(today);
            return;
        } 
    };

    const handleDateBlur = () => {
        validateAndSetDate(date);
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
        setDate(today);
        setAmount('');
        setCategory(CATEGORY_OPTIONS[0]);
        setDescription('');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.heading}>Add Expense</Text>
            <TextInput style={styles.textInput} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} onBlur={handleDateBlur} />
            <TextInput style={styles.textInput} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
            <Text style={styles.label}>Category</Text>
            <SelectList
                data={category_options.map((item) => ({ key: item, value: item }))}
                setSelected={setCategory}
                placeholder="Select a Category"
                boxStyles={styles.selectBox}/>

            <TextInput style={styles.textInput} placeholder="Description" value={description} onChangeText={setDescription} />
            <Button title="Add" onPress={submitExpense} disabled={isSubmitting} />
            <Text style={styles.heading}>Expenses Record</Text>
            {state.expenses && (
            <RecordList records={state.expenses.slice().sort((a, b) => new Date(b.date) - new Date(a.date))} />
        )}
        </ScrollView>
    );
};

export default Expense;
