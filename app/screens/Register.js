import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import RegisterForm from '../components/RegisterForm';

const Register = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>
                Register to the App
            </Text>
            <RegisterForm navigation={navigation} />
            <Text style={styles.textOr}>or do you have an account?</Text>
            <Button
                mode="contained"
                onPress={() => navigation.push('Login')}
                style={{ width: '25%' }}
            >
                Login
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000f'
    },
    textHeader: {
        padding: 50,
        fontSize: 24
    },
    textOr: {
        padding: 10,
        fontSize: 16
    },
    form: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    }
})

export default Register;
