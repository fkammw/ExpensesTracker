import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const RecordList = ({ records }) => {
    return (
        <View>
            {records.map((record, index) => {
                // Determine the style based on the type of record
                const amountStyle = record.type === 'income' ? styles.recordAmountIncome : styles.recordAmountExpense;
                // Format the amount with a + or - sign based on the type
                const formattedAmount = record.type === 'income'
                  ? `$${record.amount.toFixed(2)}`
                  : `-$${Math.abs(record.amount).toFixed(2)}`;

                return (
                    <View key={index} style={styles.recordItem}>
                        <Text style={styles.recordDate}>{record.date}</Text>
                        <View style={styles.recordRow}>
                            <Text style={styles.recordCategory}>{record.category}</Text>
                            <Text style={amountStyle}>{formattedAmount}</Text>
                        </View>
                        <Text style={styles.recordDescription}>{record.description}</Text>
                    </View>
                );
            })}
        </View>
    );
};

export default RecordList;