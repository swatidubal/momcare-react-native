import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

import { colors } from './src/theme/colors';
import { MomCareProvider } from './src/data/MomCareContext';
import HomeScreen from './src/screens/HomeScreen';
import SelfCareTipsScreen from './src/screens/SelfCareTipsScreen';
import JournalScreen from './src/screens/JournalScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import {
  createReminderNotificationChannel,
  requestNotificationPermission,
  scheduleDailyReminder,
} from './src/notifications/reminders';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: 'home',
  'Self-Care': 'heart',
  Journal: 'book',
  Support: 'chatbubbles',
};

export default function App() {
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setPositionAsync('absolute');
        await NavigationBar.setBackgroundColorAsync('#FFFBF700');
        await NavigationBar.setButtonStyleAsync('dark');
      }

      await createReminderNotificationChannel();
      const granted = await requestNotificationPermission();
      if (granted) {
        await scheduleDailyReminder();
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <MomCareProvider>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: colors.deepSage,
              tabBarInactiveTintColor: '#9A8F86',
              tabBarStyle: { backgroundColor: colors.surface },
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
              ),
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Self-Care" component={SelfCareTipsScreen} />
            <Tab.Screen name="Journal" component={JournalScreen} />
            <Tab.Screen name="Support" component={ResourcesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </MomCareProvider>
    </SafeAreaProvider>
  );
}
