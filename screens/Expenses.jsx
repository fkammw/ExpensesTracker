import { ScrollView, Text, StyleSheet } from 'react-native';

import { AppProvider } from '../context/AppContext';
import AddExpenseForm from '../components/AddExpenseForm';



const Expenses = () => {
    return (
        <AppProvider>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>My Budget Planner</Text>
                <AddExpenseForm />
            </ScrollView>
        </AppProvider>
    );
    }
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
    });


export default Expenses;