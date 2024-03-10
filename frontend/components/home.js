import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage

const Home = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProtectedMessage();
    }, []);

    const fetchProtectedMessage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('Token:', token);
            const response = await axios.post("http://localhost:8000/protected", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setMessage(response.data.message);
            } else {
                setMessage('user not logged');
            }
        } catch (error) {
            console.error(error);
            setMessage('user not logged');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        fontSize: 20,
    },
});

export default Home;
