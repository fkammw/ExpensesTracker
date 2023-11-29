import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

const AddExpenseForm = () => {
    const { dispatch } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const onSubmit = () => {
        const expense = {
            id: uuidv4(),
            name,
            cost: parseInt(cost),
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });

        setName('');
        setCost('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Cost</Text>
                <TextInput
                    style={styles.input}
                    value={cost}
                    onChangeText={setCost}
                    placeholder="Enter cost"
                    keyboardType="numeric"
                />
            </View>
            <Button title="Save" onPress={onSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
    }
});

export default AddExpenseForm;
