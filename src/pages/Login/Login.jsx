import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { MaterialCommunityIcons } from "@expo/vector-icons"
import { authService } from "../../service/auth";
import * as Animatable from "react-native-animatable";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const navigation = useNavigation();
    const [dynamicStyle, setDynamicStyle] = useState(styles.messageError2);

    const login = async() => {
        try{
            await authService.login(email, password);
            setErrorLogin("");
            setDynamicStyle(styles.messageError2)
        }
        catch(error){
            console.log(error);
            setErrorLogin("Invalid Email or Password");
            setDynamicStyle(styles.messageError1)
        }
    }

    return (
        // <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Animatable.View style={styles.container} animation="fadeInUp">
            <View style={styles.box}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    type="text"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                ></TextInput>

                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    type="text"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                ></TextInput>
                <Text
                    onPress={() => navigation.navigate("ForgotPassword")}
                    style={styles.forgotPassword}
                >Forgot your Password?</Text>
                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={{color: "white"}}>Login</Text>
                </TouchableOpacity>
                <Text onPress={() => navigation.navigate("NewUser")} style={styles.link}>
                    Register
                </Text>
                <Text style={dynamicStyle.message}>{errorLogin}</Text>
            </View>
        </Animatable.View>
        // </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: 16
    },
    box: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 5
    },
    forgotPassword: {
        display: "flex",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 12,
    },
    button: {
        display: "flex",
        backgroundColor: "blue",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    link: {
        textAlign: "center",
        color: "blue",
        marginTop: 15
    },
    messageError1: {
        message: {
            textAlign: "center",
            color: "#df0a21",
            marginTop: 15,
        }
    },
    messageError2: {
        message: {
            display: "none"
        }
    }
});
