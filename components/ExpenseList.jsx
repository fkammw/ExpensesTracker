import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';


const ExpenseList = () => {
    const { expenses } = useContext(AppContext);
    const [filteredExpenses, setFilteredExpenses] = useState(expenses || []);

    useEffect(() => {
        setFilteredExpenses(expenses);
    }, [expenses]);

    const handleChange = (text) => {
        const searchResults = expenses.filter((expense) =>
            expense.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredExpenses(searchResults);
    };

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Type to search..."
                onChangeText={handleChange}
            />
            <FlatList 
                data={filteredExpenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ExpenseItem
                        id={item.id}
                        name={item.name}
                        cost={item.cost}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default ExpenseList;
