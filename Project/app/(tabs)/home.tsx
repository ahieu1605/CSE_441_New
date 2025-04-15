import { useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        router.replace('/(auth)/login');
      }
    };
    checkLogin();
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng đến với Piggy Bank!</Text>
      <Image
        source={require('../../assets/images/piggy.png')}
        style={styles.piggy}
      />
      <Text style={styles.money}>Số tiền hiện tại: 2.000.000.000 VNĐ</Text>
      <Text style={styles.money}>Hãy gửi tiền vào: chanlesiege.vn để gấp đôi tiền hiện tại</Text>
      <Button title="Đăng xuất" onPress={handleLogout} color="#ff4444" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  piggy: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  money: {
    fontSize: 18,
    marginBottom: 20,
  },
});