import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordList from '../components/RecordList';

const category_options = ['Dining', 'Fashion', 'Entertainment', 'Groceries', 'Transportation', 'Utilities', 'Others'];

const monthOptions = [
    {key: 'all', value: 'All Months'},
    {key: '1', value: 'January'},
    {key: '2', value: 'February'},
    {key: '3', value: 'March'},
    {key: '4', value: 'April'},
    {key: '5', value: 'May'},
    {key: '6', value: 'June'},
    {key: '7', value: 'July'},
    {key: '8', value: 'August'},
    {key: '9', value: 'September'},
    {key: '10', value: 'October'},
    {key: '11', value: 'November'},
    {key: '12', value: 'December'},
];

const Expense = () => {
    const { dispatch, state } = useFinancialData();
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(category_options[0]);
    const [description, setDescription] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filterRecordsByMonth = (records, month) => {
        if (month === 'all') {
            return records;
        }
        const currentYear = new Date().getFullYear();
        const monthIndex = parseInt(month, 10);

        return records.filter(record => {
            const recordDate = new Date(record.date);
            const recordMonth = recordDate.getMonth() + 1;
            const recordYear = recordDate.getFullYear();
            return recordMonth === monthIndex && recordYear === currentYear;
        });
    };

    const filteredExpenses = selectedMonth === 'all' ? state.expenses : filterRecordsByMonth(state.expenses, selectedMonth);

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
            type: 'expense' // Add this line
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
        setCategory(category_options[0]);
        setDescription('');
    };
    

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.addContainer}>
                <Text style={styles.h1}>Add Expense</Text>
                <TextInput style={styles.textInput} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} onBlur={handleDateBlur} />
                
                <SelectList
                    data={category_options.map((item) => ({ key: item, value: item }))}
                    setSelected={setCategory}
                    placeholder="Select a Category"
                    boxStyles={styles.categorySelectBox}
                    dropdownStyles={styles.selectBox}
                    dropdownTextStyles={styles.inputBox}
                    inputStyles={styles.inputBox}/>

                <TextInput style={styles.textInput} placeholder="Amount ($)" keyboardType="numeric" value={amount} onChangeText={setAmount} />
                <TextInput style={styles.textInput} placeholder="Description" value={description} onChangeText={setDescription} />
                <TouchableOpacity style={styles.button} onPress={submitExpense} disabled={isSubmitting}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.recordContainer}>
                <Text style={styles.h1}>View Expense</Text>
                <Text style={styles.monthHeading}>{monthOptions.find(option => option.key === selectedMonth.toString())?.value || 'All Months'}</Text>
                <SelectList
                    data={monthOptions}
                    setSelected={setSelectedMonth}
                    placeholder="Select a Month"
                    boxStyles={styles.selectBox}
                    dropdownStyles={styles.selectBox}
                    dropdownTextStyles={styles.inputBox}
                    inputStyles={styles.inputBox}/>


                {state.expenses && (
                <RecordList records={filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date))} />
            )}
            </View>
        </ScrollView>
    );
};

export default Expense;
