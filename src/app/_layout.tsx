import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { SesioniProvider, useSesioni } from '../lib/sesioni';

function Navigimi() {
  const { sesioni, dukeNgarkuar } = useSesioni();

  if (dukeNgarkuar) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!sesioni}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={!sesioni}>
        <Stack.Screen name="hyrja" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SesioniProvider>
      <Navigimi />
    </SesioniProvider>
  );
}
