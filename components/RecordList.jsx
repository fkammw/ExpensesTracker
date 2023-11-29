// RecordList.js
import React from 'react';
import { View, Text } from 'react-native';

const RecordList = ({ records }) => {
    return (
        <View>
            {records.map((record, index) => (
                <Text key={index}>
                    {record.date} - {record.category}: ${record.amount} - {record.description}
                </Text>
            ))}
        </View>
    );
};

export default RecordList;
