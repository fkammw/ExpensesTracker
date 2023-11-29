import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ViewBudget = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.budgetText}>Budget: £{props.budget}</Text>
            <Button title="Edit" onPress={props.handleEditClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
    },
    budgetText: {
        marginBottom: 10,
        fontSize: 16,
        color: 'black',
        
    },
    
});

export default ViewBudget;
