import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import RecordList from '../components/RecordList';
import { ScrollView } from 'react-native-gesture-handler';


const Home = () => {
    const { state } = useFinancialData();

    // Combine and sort expenses and incomes
    const combinedRecords = [...state.expenses, ...state.incomes]
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting by date in descending order

    // Process the data to get the chart format
    const processChartData = (data, colorMapping) => {
        // This is a basic example, you can enhance the logic as per your requirements
        const categories = [...new Set(data.map(item => item.category))];
        return categories.map(category => {
            const total = data.filter(item => item.category === category)
                              .reduce((acc, item) => acc + item.amount, 0);
            return {
                name: category,
                amount: total,
                color: colorMapping[category] || '#000000', // You can map categories to specific colors
                legendFontColor: '#7F7F7F',
                legendFontSize: 15
            };
        });
    };

    const expenseChartData = processChartData(state.expenses, expenseColors);
    const incomeChartData = processChartData(state.incomes, incomeColors);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Expense Overview</Text>
            <PieChart
                data={expenseChartData}
                width={300}
                height={200}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
            />
            <Text style={styles.heading}>Income Overview</Text>
            <PieChart
                data={incomeChartData}
                width={300}
                height={200}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
            />
            <Text style={styles.heading}>Records</Text>
            <RecordList records={combinedRecords} />
        </View>
    );
};

const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const expenseColors = {
    'Dining': '#FD3C4A',
    'Fashion': '#0077FF',
    'Groceries': '#FBB025',
    'Entertainment': '#00A86B',
    'Transportation': '#7F3DFF',
    'Utilities': '#1D0367',
    'Others': '#C1B260'
};

const incomeColors = {
    'Property': '#24BD98',
    'Salary': '#4D88FF',
    'Interest': '#DB50F1',
    'Others': '#FFFFCC'
};


export default Home;
