import react, { useContext } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Button, Paragraph } from "react-native-paper";
import { AuthContext } from "../App";

const Home = () => {
    const { logout } = useContext(AuthContext);
    return (
        <SafeAreaView>
            <View style={styles.wrapper}>
                <Paragraph>
                    You now have an authentication and here is home page.
                </Paragraph>
                <Button
                    mode="contained"
                    onPress={logout}
                    style={{ width: '25%', marginTop: 50 }}
                >
                    Logout
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Home;