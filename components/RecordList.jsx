// RecordList.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const RecordList = ({ records }) => {
    return (
        <View>
            {records.map((record, index) => (
                <Text key={index} style={styles.per}>
                    {record.date} - {record.category}: ${record.amount} - {record.description}
                </Text>
            ))}
        </View>
    );
};

export default RecordList;
