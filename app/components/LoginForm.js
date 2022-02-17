import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, } from 'react-native';
import { Button, TextInput, HelperText, Snackbar } from 'react-native-paper';
import { AuthContext } from "../App";


const LoginForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [showEmailHelper, setShowEmailHelper] = useState(false);
    const [showPasswordHelper, setShowPasswordHelper] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const auth = useContext(AuthContext);

    useEffect(() => {
        setShowEmailHelper(Boolean(touchedEmail && !email));
        setShowPasswordHelper(Boolean(touchedPassword && !password))
    }, [email, password]);

    const onSubmit = async () => {
        if (!email) {
            setShowEmailHelper(true);
            return;
        }

        if (!password) {
            setShowPasswordHelper(true);
            return;
        }
        const response = await auth.login(email.toLowerCase(), password);
        console.log(response);

        if (response.success) {
            navigation.navigete('Home');
        } else {
            setShowSnackbar(true);
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.textInput}>
                <TextInput
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(e) => {
                        if (!touchedEmail) {
                            setTouchedEmail(true);
                        }
                        setEmail(e);
                    }}
                    label="Email"
                />
                <HelperText type="error" visible={showEmailHelper}>
                    *Required
                </HelperText>
            </View>
            <View style={styles.textInput}>
                <TextInput
                    textContentType="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(e) => {
                        if (!touchedPassword) {
                            setTouchedPassword(true);
                        }
                        setPassword(e);
                    }}
                    label="Password"
                />
                <HelperText type="error" visible={showPasswordHelper}>
                    *Required
                </HelperText>
            </View>
            <Button
                mode="contained"
                onPress={onSubmit}
                style={{ width: '25%' }}
            >
                Login
            </Button>
            <Snackbar
                visible={showSnackbar}
                onDismiss={() => setShowSnackbar(false)}
                action={{
                    onPress: () => {
                        // Do something
                    },
                }}>
                Email or password is incorrect
            </Snackbar>
        </View >
    )
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 300
    },
    textInput: {
        height: 50,
        backgroundColor: 'white',
        width: '50%'
    }
});

export default LoginForm;
