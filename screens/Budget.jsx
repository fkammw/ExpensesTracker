// Budget.jsx
import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TextInput, Button} from 'react-native';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Budget = () => {
    const { state } = useFinancialData();
    const [monthlyBudget, setMonthlyBudget] = useState('');
    const [totalSpent, setTotalSpent] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const month = '2023-11'; // Define the month for the budget here

    // Calculate total expenses for the month
    useEffect(() => {
        const total = state.expenses
            .filter(expense => expense.date.startsWith(month))
            .reduce((acc, expense) => acc + expense.amount, 0);
        setTotalSpent(total);
    }, [state.expenses, month]);

    // Load the budget for the month when the component mounts
    useEffect(() => {
        const loadBudget = async () => {
            const savedBudget = await AsyncStorage.getItem(`budget_${month}`);
            savedBudget && setMonthlyBudget(savedBudget);
        };

        loadBudget();
    }, [month]);

    const saveBudget = async () => {
        setIsSubmitting(true);
        try {
            await AsyncStorage.setItem(`budget_${month}`, monthlyBudget);
            alert('Monthly budget saved successfully!');
        } catch (error) {
            alert('Failed to save monthly budget: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.heading}>Set Monthly Budget for {month}</Text>
            <TextInput
                style={styles.textInput}
                value={monthlyBudget}
                onChangeText={setMonthlyBudget}
                keyboardType="numeric"
            />
            <Button title="Save Monthly Budget" onPress={saveBudget} disabled={isSubmitting} />
            <Text style={styles.heading}>Monthly Budget Overview</Text>
            <Text>Total Budget: ${monthlyBudget}</Text>
            <Text>Total Spent: ${totalSpent}</Text>
            <Text>Remaining: ${monthlyBudget - totalSpent}</Text>
        </ScrollView>
    );
};

export default Budget;
