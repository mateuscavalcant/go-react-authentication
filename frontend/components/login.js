import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginForm = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("identifier", email);
        formData.append("password", password);

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                body: formData,

            });

            const data = await response.json();

            if (data.error) {
                setError(data.error.credentials || data.error.password);
            } else {
                console.log(data.message);
                setEmail('');
                setPassword('');
                let token = data.token;
                await AsyncStorage.setItem('token', token);

                console.log('Token:', token);
                // Navigate to home screen
                navigation.navigate('home');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.header}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email or username"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />


                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.formLink}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                        <Text style={styles.link}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
    },

    header: {
        fontSize: 28,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 20,
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        maxWidth: 430,
        width: '100%',
        padding: 30,
        borderRadius: 15,
        backgroundColor: '#ffffff',
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#a5a5a5',
        borderRadius: 6,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#000000',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    formLink: {
        flexDirection: 'row',
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#000000',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginForm;
