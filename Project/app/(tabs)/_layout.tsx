import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Trang chủ' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}