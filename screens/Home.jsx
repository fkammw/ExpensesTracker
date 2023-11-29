import React from 'react';
import { Text, Button, View, ScrollView} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import RecordList from '../components/RecordList';


const Home = () => {
    const { state, loadTestData, resetData } = useFinancialData();

    // Helper function to get a label for the month
    const getMonthYear = (dateString) => {
        // Parse the date string and construct a UTC date
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
      
        // Format the date as "Month Year" in UTC
        return date.toLocaleDateString('default', { year: 'numeric', month: 'long', timeZone: 'UTC' });
      };
    
    // Function to group records by month
    const groupByMonth = (records) => {
        return records.reduce((groups, record) => {
            const month = getMonthYear(record.date);
            if (!groups[month]) {
                groups[month] = [];
            }
            groups[month].push(record);
            return groups;
        }, {});
    };

        // Group combined records by month
        const recordsByMonth = groupByMonth([...state.expenses, ...state.incomes]);

        // Function to render records grouped by month
        const renderRecordsByMonth = () => {
            return Object.entries(recordsByMonth).sort((a, b) => new Date(b[0]) - new Date(a[0])).map(([month, records]) => (
                <View key={month} style={styles.monthSection}>
                    <Text style={styles.monthLabel}>{month}</Text>
                    <RecordList records={records.sort((a, b) => new Date(b.date) - new Date(a.date))} />
                </View>
            ));
        };

    // Combine and sort expenses and incomes
    const combinedRecords = [...state.expenses, ...state.incomes]
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting by date in descending order

    // Process the data to get the chart format
    const processChartData = (data, colorMapping) => {
        const categories = [...new Set(data.map(item => item.category))];
        return categories.map(category => {
            const total = data.filter(item => item.category === category)
                              .reduce((acc, item) => acc + item.amount, 0);
            return {
                name: category,
                amount: total,
                color: colorMapping[category] || '#000000',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15
            };
        });
    };
    const renderChartOrMessage = (data, chartData, title) => {
        if (data.length === 0) {
            return (
                <View>
                    <Text style={styles.heading}>{title}</Text>
                    <Text>No data available. Add data in the Expense or Income tabs, or load test data.</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={styles.heading}>{title}</Text>
                    <PieChart
                        data={chartData}
                        width={300}
                        height={200}
                        chartConfig={chartConfig}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />
                </View>
            );
        }
    };
    const expenseChartData = processChartData(state.expenses, expenseColors);
    const incomeChartData = processChartData(state.incomes, incomeColors);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Button title="Load Test Data" onPress={loadTestData} />
            <Button title="Reset Data" onPress={resetData} />
            {renderChartOrMessage(state.expenses, expenseChartData, "Expense Overview")}
            {renderChartOrMessage(state.incomes, incomeChartData, "Income Overview")}
            <Text style={styles.heading}>Records</Text>
            {renderRecordsByMonth()}
        </ScrollView>
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
