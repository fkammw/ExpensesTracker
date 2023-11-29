import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button } from 'react-native';
import { useFinancialData } from '../contexts/FinancialDataContext';
import { SelectList } from 'react-native-dropdown-select-list';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordList from '../components/RecordList';

const category_options = ['Salary', 'Interest', 'Property', 'Other'];

const Income = () => {
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
        setDate(today);
        setAmount('');
        setCategory(category_options[0]);
        setDescription('');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.heading}>Add Income</Text>
            <TextInput style={styles.textInput} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
            <TextInput style={styles.textInput} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
            <Text style={styles.label}>Category</Text>
            <SelectList
                data={category_options.map((item) => ({ key: item, value: item }))}
                setSelected={setCategory}
                placeholder="Select a Category"
                boxStyles={styles.selectBox}/>
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
