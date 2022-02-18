import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, } from 'react-native';
import { Button, TextInput, HelperText, Snackbar, ActivityIndicator } from 'react-native-paper';
import { AuthContext } from "../App";


const RegisterForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [touchedRePassword, setTouchedRePassword] = useState(false);
    const [showEmailHelper, setShowEmailHelper] = useState(false);
    const [showPasswordHelper, setShowPasswordHelper] = useState(false);
    const [showPasswordReHelper, setShowPasswordReHelper] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
    });

    const { register, isLoading } = useContext(AuthContext);

    useEffect(() => {
        setShowEmailHelper(Boolean(touchedEmail && !email));
        setShowPasswordHelper(Boolean(touchedPassword && !password))
    }, [email, password]);

    useEffect(() => {
        if (rePassword && password && rePassword !== password) {
            setPasswordMessage('Password and RePassword must be matched');
            setShowPasswordReHelper(true);
            setShowPasswordHelper(true);
            return;
        } else {
            setShowPasswordReHelper(false);
            setShowPasswordHelper(false);
        }

    }, [password, rePassword]);

    const onSubmit = async () => {
        if (!email) {
            setShowEmailHelper(true);
            return;
        }

        if (!password) {
            setShowPasswordHelper(true);
            return;
        }

        if (!rePassword) {
            setPasswordMessage('*Required');
            setShowPasswordReHelper(true);
            return;
        }

        const response = await register(email.toLowerCase(), password);

        if (response.success) {
            navigation.push('Login');
        } else {
            setSnackbarState({
                open: true,
                message: response.message
            });
        }
    }

    return (
        <View style={styles.wrapper}>
            {
                isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                    <>
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
                                {passwordMessage}
                            </HelperText>
                        </View>
                        <View style={styles.textInput}>
                            <TextInput
                                textContentType="password"
                                secureTextEntry
                                value={rePassword}
                                onChangeText={(e) => {
                                    if (!touchedRePassword) {
                                        setTouchedRePassword(true);
                                    }
                                    setRePassword(e);
                                }}
                                label="RePassword"
                            />
                            <HelperText type="error" visible={showPasswordReHelper}>
                                {passwordMessage}
                            </HelperText>
                        </View>
                        <Button
                            mode="contained"
                            onPress={onSubmit}
                            style={{ width: '25%' }}
                        >
                            Sign Up
                        </Button>
                    </>
                )
            }
            <Snackbar
                visible={snackbarState.open}
                onDismiss={() => setSnackbarState({
                    open: false,
                    message: ''
                })}
                action={{
                    onPress: () => {
                        // Do something
                    },
                }}>
                {snackbarState.message}
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
        justifyContent: 'space-between',
        height: 300
    },
    textInput: {
        height: 40,
        width: '50%'
    }
});

export default RegisterForm;
