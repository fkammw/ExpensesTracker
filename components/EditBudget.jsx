import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';

const EditBudget = (props) => {
    const [value, setValue] = useState(props.budget.toString());

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={value}
                onChangeText={setValue}
            />
            <Button
                title="Save"
                onPress={() => props.handleSaveClick(parseInt(value))}
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

export default EditBudget;
