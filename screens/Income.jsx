// Income.jsx
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordList from '../components/RecordList';

// Define INCOME_CATEGORY_OPTIONS outside of the component
const INCOME_CATEGORY_OPTIONS = ['Salary', 'Interest', 'Property', 'Other'];

const Income = () => {
    const { dispatch, state } = useFinancialData();

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(INCOME_CATEGORY_OPTIONS[0]); // Default to the first category (Salary)
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitIncome = async () => {
        if (!date || !amount || !category || !description) {
            alert('Please fill all fields.');
            return;
        }

        const newIncome = {
            date,
            amount: parseFloat(amount),
            category,
            description,
        };
        setIsSubmitting(true);
        try {
            // Dispatch action to add the income
            dispatch({
                type: 'ADD_INCOME',
                payload: newIncome
            });

            // Retrieve the current incomes from AsyncStorage
            const existingIncomes = await AsyncStorage.getItem('incomes');
            const currentIncomes = existingIncomes ? JSON.parse(existingIncomes) : [];

            // Add the new income to the current incomes
            const updatedIncomes = [...currentIncomes, newIncome];

            // Save the updated incomes back to AsyncStorage
            await AsyncStorage.setItem('incomes', JSON.stringify(updatedIncomes));

            alert('Income added successfully!');
        } catch (error) {
            alert('Something went wrong, please try again!');
        } finally {
            setIsSubmitting(false);
        }

        // Reset the form
        setDate(new Date().toISOString().split('T')[0]);
        setAmount('');
        setCategory(INCOME_CATEGORY_OPTIONS[0]);
        setDescription('');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.heading}>Add Income</Text>
            <TextInput style={styles.textInput} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
            <TextInput style={styles.textInput} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
            <Text style={styles.label}>Category</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                style={{ height: 50, width: 200 }}
            >
                {INCOME_CATEGORY_OPTIONS.map((cat, index) => (
                    <Picker.Item key={index} label={cat} value={cat} />
                ))}
            </Picker>
            <TextInput style={styles.textInput} placeholder="Description" value={description} onChangeText={setDescription} />
            <Button title="Add" onPress={submitIncome} disabled={isSubmitting} />
            <Text style={styles.heading}>Income Record</Text>
            {state.incomes && (
            <RecordList records={state.incomes.slice().sort((a, b) => new Date(b.date) - new Date(a.date))} />
        )}
        </ScrollView>
    );
};

export default Income;
