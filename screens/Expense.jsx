// Expense.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from '../styles/styles';

const Expense = ({ onAddExpense }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const submitExpense = () => {
        onAddExpense({ name, amount: parseFloat(amount) });
        setName('');
        setAmount('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Expense</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Expense Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Button title="Add" onPress={submitExpense} />
        </View>
    );
};

export default Expense;
