// Income.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from '../styles/styles';

const Income = ({ onAddIncome }) => {
    const [source, setSource] = useState('');
    const [amount, setAmount] = useState('');

    const submitIncome = () => {
        onAddIncome({ source, amount: parseFloat(amount) });
        setSource('');
        setAmount('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Income</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Income Source"
                value={source}
                onChangeText={setSource}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Button title="Add" onPress={submitIncome} />
        </View>
    );
};

export default Income;
