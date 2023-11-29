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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
    },
    monthSection: {
        fontSize: 20,
        marginTop: 20, // Or any fixed margin you prefer
        alignSelf: 'flex-start', // Align to the start of the flex container
      },
    monthLabel: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20, // Or any fixed margin you prefer
    alignSelf: 'flex-start', // Align to the start of the flex container
    },
});