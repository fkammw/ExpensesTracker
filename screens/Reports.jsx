import React from 'react';
import {View, Text, ScrollView, StyleSheet } from 'react-native';

import { AppProvider } from '../context/AppContext';
import Budget from '../components/Budget';
import ExpenseTotal from '../components/ExpenseTotal';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import RemainingBudget from '../components/Remaining';

export const Reports = () => {
    return (
        //<Text>Budget Reports</Text>
        <AppProvider>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>My Budget Planner</Text>
                <Budget />
                <RemainingBudget />
                <ExpenseTotal />
                <Text style={styles.subHeader}>Expenses</Text>
                <ExpenseList />
                <Text style={styles.subHeader}>Add Expense</Text>
                <AddExpenseForm />
            </ScrollView>
        </AppProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    // Add additional styles as needed
});
