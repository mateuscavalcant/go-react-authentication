import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para lidar com o logout
const HandleLogout = async (navigation) => {
    try {
        // Limpar o token do AsyncStorage
        await AsyncStorage.removeItem('token');

        // Redirecionar para a tela de login ou qualquer outra tela apropriada
        navigation.navigate('login');
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
};

export default HandleLogout;
