import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native'; // Thêm AppState
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/(auth)/login');
      }
    };
    checkLogin();
  }, []);

  // Lắng nghe trạng thái ứng dụng
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === 'background') {
        // Khi ứng dụng chuyển sang background, đăng xuất
        await AsyncStorage.removeItem('isLoggedIn');
        router.replace('/(auth)/login');
      }
    };

    // Đăng ký lắng nghe sự kiện AppState
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Dọn dẹp khi component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}