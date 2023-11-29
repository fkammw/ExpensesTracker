import React, {useState} from 'react';
import { Text, Button, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { PieChart } from 'react-native-chart-kit';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import RecordList from '../components/RecordList';

   const monthOptions = [
        {key: 'all', value: 'All Months'},
        {key: '1', value: 'January'},
        {key: '2', value: 'February'},
        {key: '3', value: 'March'},
        {key: '4', value: 'April'},
        {key: '5', value: 'May'},
        {key: '6', value: 'June'},
        {key: '7', value: 'July'},
        {key: '8', value: 'August'},
        {key: '9', value: 'September'},
        {key: '10', value: 'October'},
        {key: '11', value: 'November'},
        {key: '12', value: 'December'},
    ];

const Home = () => {
    const { state, loadTestData } = useFinancialData();
    const [selectedMonth, setSelectedMonth] = useState('all'); 

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

    const filteredRecords = selectedMonth && selectedMonth !== 'all'
    ? combinedRecords.filter(record => {
        const recordMonth = new Date(record.date).getMonth() + 1;
        return recordMonth === parseInt(selectedMonth, 10);
      })
    : combinedRecords;

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Button title="Load Test Data" onPress={loadTestData} />
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
            <SelectList
                data={monthOptions}
                setSelected={setSelectedMonth}
                placeholder="Select a Month"
                boxStyles={styles.selectBox}/>
            <RecordList records={filteredRecords} />
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
