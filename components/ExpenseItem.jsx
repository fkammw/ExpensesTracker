import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    return (
        <View style={styles.item}>
            <Text style={styles.label}>{props.name}</Text>
            <Text style={styles.label}>${props.cost}</Text>
            <TouchableOpacity onPress={handleDeleteExpense}>
                <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    label: {
        marginBottom: 10,
        color: 'black',
        marginRight: 20,
    },
    // Additional styles can be added here
});

export default ExpenseItem;
