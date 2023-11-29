import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

const RemainingBudget = () => {
    const { expenses, budget } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const isOverBudget = totalExpenses > budget;

    return (
        //check whether the remaining budget is over or under budget. If over budget, use the overBudget style, otherwise use the underBudget style
        <View style={[styles.container, isOverBudget ? styles.overBudget : styles.underBudget]}>
            <Text style={styles.label}>Remaining: ${budget - totalExpenses}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    label: {
        color: 'black',
    },
    overBudget: {
        backgroundColor: 'red', 
    },
    underBudget: {
        backgroundColor: 'green', 
    },
});

export default RemainingBudget;
