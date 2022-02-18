import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import LoginForm from '../components/LoginForm';

const Login = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Headline>
                Welcome the App
            </Headline>
            <LoginForm navigation={navigation} />
            <Text style={styles.textOr}>or</Text>
            <Button
                mode="contained"
                onPress={() => navigation.push('Register')}
                style={{ width: '25%' }}
            >
                Sign up
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
        backgroundColor: '#00000f',
        overflow: 'scroll'
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

export default Login;
