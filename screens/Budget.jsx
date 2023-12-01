import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Budget = () => {
    const { state, isMonthOverBudget } = useFinancialData();
    const [monthlyBudget, setMonthlyBudget] = useState('');
    const [totalSpent, setTotalSpent] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    const currentMonthWord = currentDate.toLocaleString('default', { month: 'long' });

    // Calculate total expenses for the current month
    useEffect(() => {
        const total = state.expenses
            .filter(expense => expense.date.startsWith(currentMonth))
            .reduce((acc, expense) => acc + expense.amount, 0);
        setTotalSpent(total);
    }, [state.expenses, currentMonth]);

    // Load the budget for the current month when the component mounts
    useEffect(() => {
        const loadBudget = async () => {
            const savedBudget = await AsyncStorage.getItem(`budget_${currentMonth}`);
            if (savedBudget !== null) {
                setMonthlyBudget(savedBudget);
            }
        };
        loadBudget();
    }, [currentMonth]);

    const saveBudget = async () => {
        setIsSubmitting(true);
        try {
            await AsyncStorage.setItem(`budget_${currentMonth}`, monthlyBudget);
            alert('Monthly budget saved successfully!');
        } catch (error) {
            alert('Failed to save monthly budget: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Display budget status for each month
    const displayBudgetStatus = () => {
        const sortedMonthKeys = Object.keys(state.budgets).sort((a, b) => b.localeCompare(a));

        return sortedMonthKeys.map(monthKey => {
            const monthName = getMonthName(monthKey); // Only month name
            const budgetAmount = state.budgets[monthKey];
            const totalSpentForMonth = state.expenses
                .filter(expense => expense.date.startsWith(monthKey))
                .reduce((acc, expense) => acc + expense.amount, 0);
            const remaining = budgetAmount - totalSpentForMonth;

            return (
                <View key={monthKey} style={styles.recordItem}>
                    <Text style={styles.recordMonth}>{monthName}</Text>
                    <View style={styles.recordRow}>
                        <Text style={styles.recordText}>{`Budget - Expense:`}</Text>
                        <Text style={remaining >= 0 ? styles.recordAmountIncome : styles.recordAmountExpense}>
                            {remaining >= 0 ? `Remaining` : `Overspent`}
                        </Text>
                    </View>
                    <View style={styles.recordRow}>
                        <Text style={styles.recordFormula}>{`$${budgetAmount} - $${totalSpentForMonth}`}</Text>

                        <Text style={remaining >= 0 ? styles.recordAmountIncome : styles.recordAmountExpense}>${remaining}
                        </Text>
                    </View>
                </View>
            );
        });
    };
    const getMonthName = (monthString) => {
        const [year, month] = monthString.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleString('default', { month: 'long' });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.monthHeading}>{currentMonthWord}</Text>
            <View style={styles.addContainer}>
                <Text style={styles.h1}>Monthly Budget</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="$"
                    value= {monthlyBudget}
                    onChangeText={setMonthlyBudget}
                    keyboardType="numeric"
                />
                <TouchableOpacity 
                    style={[styles.button, isSubmitting && styles.disabledButton]} 
                    onPress={saveBudget} 
                    disabled={isSubmitting}>
                    <Text style={styles.buttonText}>Save Monthly Budget</Text>
                </TouchableOpacity>
                <Text style={styles.h2}>As of today</Text>
                <Text style={styles.h2}>Total Expense: ${totalSpent}</Text>
                {
                    monthlyBudget > 0 ? (
                        <Text 
                            style={
                                monthlyBudget - totalSpent < 0 ? 
                                styles.overBudget : 
                                styles.underBudget
                            }>
                            Remaining: 
                            {monthlyBudget - totalSpent < 0 
                                ? ` -$${Math.abs(monthlyBudget - totalSpent)}` 
                                : ` $${monthlyBudget - totalSpent}`}
                        </Text>
                    ) : (
                        <Text style={styles.prompt}>Please input your budget for {currentMonthWord}.</Text>
                    )
                }
            </View>

            <View style={styles.recordContainer}>
                <Text style={styles.h1}>Previous Months</Text>
                {displayBudgetStatus()}
            </View>

        </ScrollView>
    );
};



export default Budget;
