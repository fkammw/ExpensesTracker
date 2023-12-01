// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    addContainer: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'paleturquoise',
        borderRadius: 15,
    },
    overviewContainer: {
        width: '100%',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'papayawhip',
        marginTop: 10,
        borderRadius: 15,
    },
    recordContainer: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'lavenderblush',
        marginTop: 10,
        borderRadius: 15,
    },

    dataSettingButton:{
        width: '48%',
        backgroundColor: 'royalblue',
        padding: 10,
        borderRadius: 10,

    },
    monthHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 0,
        backgroundColor: 'navy',
        borderColor: 'navy',
        color: 'white',
        padding: 10,
        width: '100%',
        textAlign: 'center',
        marginTop: 5,
        borderRadius: 10,
    },

    h1: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'navy',
        padding: 10,
        width: '100%',
        textAlign: 'center',
        marginTop: 5,
    },

    
    h2: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'navy',
        width: '100%',
        textAlign: 'center',

    },
    prompt: {
        fontSize: 20,
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    },
    textInput: {
        width: '350px',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        padding: 10,
        paddingLeft: 20,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 20,
    },

    selectBox: {
        width: '100%',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        padding: 0,
    },
    categorySelectBox: {
        width: '350px',
        fontSize: 20,
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 0,
    },
    inputBox: {
        width: '350px',
        fontSize: 20,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: 'royalblue',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'navy',
        padding: 10,
        width: '100%',
        textAlign: 'center',
        marginTop: 5,
        borderRadius: 10,
    },
    overBudget: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 5,
        width: '100%',
        textAlign: 'center',
        borderRadius: 10,
        color: 'red',
    },
    underBudget: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 5,
        width: '100%',
        textAlign: 'center',
        borderRadius: 10,
        color: 'green',
    },

    chartArea: {
        fontFamily: 'sans-serif',
        textAlign: 'center',
        margin: 'auto',
        borderRadius: 10,
    },
    recordItem: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'palevioletred',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 5,
    },
    recordDate:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'navy',
        marginBottom: 5,
    },
    recordMonth: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'navy',
        marginBottom: 5,
    },
    recordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    recordCategory: {
        fontSize: 18,
        color: '#333',
    },

    recordText: {
        fontSize: 16,
        color: '#333',
    },
    recordFormula: {
        fontSize: 16,
        color: '#333',
        fontStyle: 'italic',
    },
    recordAmountIncome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
    recordAmountExpense: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
    recordDescription: {
        fontSize: 16,
        color: '#333',
        fontStyle: 'italic',
    },
    
});
