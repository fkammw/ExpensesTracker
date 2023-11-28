import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styles from '../styles/styles';


const Home = () => {
    // Initialize the chart data with default values
    const [chartData, setChartData] = useState([
        {
            name: "Food",
            amount: 0,
            color: "#e62d20",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Clothes",
            amount: 50,
            color: "#27e620",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Bills",
            amount:80,
            color: "#1c6bd9",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Others",
            amount: 150,
            color: "#5adbac",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Expense Overview</Text>
            <PieChart
                data={chartData}
                width={300}
                height={200}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
            />
        </View>
    );
};

export default Home;
