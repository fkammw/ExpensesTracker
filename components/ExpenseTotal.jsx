import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
    const { expenses } = useContext(AppContext);

    const total = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Spent so far: ${total}</Text>
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
});

export default ExpenseTotal;
