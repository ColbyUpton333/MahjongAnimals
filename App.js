
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ThemeScreen from './src/screens/ThemeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ThemeProvider } from './src/themes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0f141a' }, headerTintColor: '#fff' }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mahjong Animals' }} />
          <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Play' }} />
          <Stack.Screen name="Themes" component={ThemeScreen} options={{ title: 'Themes' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
