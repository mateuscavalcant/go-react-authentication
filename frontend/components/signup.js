import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupForm = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirm_password", confirmPassword);

        fetch("http://localhost:8000/signup", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error.name || data.error.email || data.error.password || data.error.confirm_password);
                } else {
                    console.log(data.message);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    // Navigate to login screen
                    navigation.navigate('login');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.header}>Sign Up</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                <View style={styles.formLink}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Text style={styles.link}>Login</Text>
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


export default SignupForm;
