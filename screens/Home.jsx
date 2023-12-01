import React, {useState} from 'react';
import { Text, TouchableOpacity, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { PieChart } from 'react-native-chart-kit';
import { useFinancialData } from '../contexts/FinancialDataContext';
import styles from '../styles/styles';
import { Dimensions } from 'react-native';
import RecordList from '../components/RecordList';
import { View } from 'react-native';

// constants for setting the width of the pie charts
const screenWidth = Dimensions.get('window').width;
const pieChartWidth = screenWidth * 0.85;

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
        const { state, loadTestData, resetData } = useFinancialData();
        const currentDate = new Date();
        const currentMonthIndex = String(currentDate.getMonth() + 1); // Adding 1 since getMonth() returns 0-11
        const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
      
        const categorizeRecords = (records) => {
          return records.map(record => ({
            ...record,
            type: record.hasOwnProperty('expense') ? 'expense' : 'income'
          }));
        };
      
        const filterRecordsByMonth = (records, month) => {
            if (month === 'all') {
                return records;
            }
            const currentYear = new Date().getFullYear();
            const monthIndex = parseInt(month, 10);
    
            return records.filter(record => {
                const recordDate = new Date(record.date);
                const recordMonth = recordDate.getMonth() + 1;
                const recordYear = recordDate.getFullYear();
                return recordMonth === monthIndex && recordYear === currentYear;
            });
        };
      
        const sortedRecords = [...state.expenses, ...state.incomes]
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting by date in descending order


        // Categorize and combine expenses and incomes
        const combinedRecords = categorizeRecords([...state.expenses, ...state.incomes])
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting by date in descending order

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
      
        const displaySelectedMonth = () => {
          const monthName = monthOptions.find(option => option.key === selectedMonth)?.value || 'All Months';
          return (
            <Text style={styles.monthHeading}>{monthName}</Text>
          );
        };
      
        const expenseChartData = processChartData(filterRecordsByMonth(state.expenses, selectedMonth), expenseColors);
        const incomeChartData = processChartData(filterRecordsByMonth(state.incomes, selectedMonth), incomeColors);
        const filteredRecords = selectedMonth && selectedMonth !== 'all'
        ? filterRecordsByMonth(sortedRecords, parseInt(selectedMonth, 10))
        : sortedRecords;

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={styles.dataSettingButton} 
                onPress={loadTestData}>
                <Text style={styles.buttonText}>Load Test Data</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.dataSettingButton} 
                onPress={resetData}>
                <Text style={styles.buttonText}>Reset Data</Text>
            </TouchableOpacity>
            </View>
            <SelectList
                data={monthOptions}
                setSelected={setSelectedMonth}
                placeholder="Select a Month"
                boxStyles={styles.selectBox}
                dropdownStyles={styles.selectBox}
                dropdownTextStyles={styles.inputBox}
                inputStyles={styles.inputBox}/>
        {displaySelectedMonth()}
            <View style={styles.overviewContainer}>
            <Text style={styles.h1}>Expense Overview</Text>
                <PieChart
                    data={expenseChartData}
                    width={pieChartWidth}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="amount"
                    backgroundColor="white"
                    paddingLeft="5"
                    style={styles.chartArea}
                />
            </View>
            
            <View style={styles.overviewContainer}>
                <Text style={styles.h1}>Income Overview</Text>
                <PieChart
                    data={incomeChartData}
                    width={pieChartWidth}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="amount"
                    backgroundColor="white"
                    paddingLeft="5"
                    style={styles.chartArea}
                />
                </View>
            <View style={styles.recordContainer}>
                <Text style={styles.h1}>Records</Text>
                <RecordList records={filteredRecords} />
            </View>  
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
    'Others': '#EAB676'
};


export default Home;
