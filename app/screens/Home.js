import react, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
    const { isAuth } = useContext(AuthContext);
    return (
        <View>
            <Text>
                Home
            </Text>
        </View>
    );
};

export default Home;