// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
        justifyContent: 'center',
        padding: 20,
        
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
        borderRadius: 10,
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
    },
    overBudget: {
        color: 'red',
    },
    underBudget: {
        color: 'green',
    },
    selectBox: {
        marginTop: 10,
        marginBottom: 15,
    },
    
    per: {
        borderStyle:'solid',
        borderWidth: 2,
        borderColor: '#ddd',
        width: '100%',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        width: '100%', 
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        shadowColor: '#dedede',
        shadowOffset: { width: 0, height: 3 },
    },
    chart: {
        margin: '0 auto',
    },
    vv: {
        textAlign: 'center',
        margin: 'auto',
        borderStyle:'solid',
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: '300',
        shadowColor: '#dedede',
        shadowOffset: { width: 0, height: 3 },
    }
});
