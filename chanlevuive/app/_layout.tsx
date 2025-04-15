import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ title: 'Trang chủ' }} />
      <Stack.Screen name="game" options={{ title: 'Chơi Tài Xỉu' }} />
    </Stack>
  );
}