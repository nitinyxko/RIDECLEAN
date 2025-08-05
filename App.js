import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CustomerHomeScreen from './src/screens/customer/CustomerHomeScreen';
import WasherHomeScreen from './src/screens/washer/WasherHomeScreen';
import ServiceBookingScreen from './src/screens/customer/ServiceBookingScreen';
import OrderTrackingScreen from './src/screens/customer/OrderTrackingScreen';
import ProductStoreScreen from './src/screens/customer/ProductStoreScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import WasherOrdersScreen from './src/screens/washer/WasherOrdersScreen';
import WasherEarningsScreen from './src/screens/washer/WasherEarningsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    accent: '#FF9800',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FF9800',
  },
};

// Customer Tab Navigator
function CustomerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Book Service') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'bag' : 'bag-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={CustomerHomeScreen} />
      <Tab.Screen name="Book Service" component={ServiceBookingScreen} />
      <Tab.Screen name="Products" component={ProductStoreScreen} />
      <Tab.Screen name="Orders" component={OrderHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Washer Tab Navigator
function WasherTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={WasherHomeScreen} />
      <Tab.Screen name="Orders" component={WasherOrdersScreen} />
      <Tab.Screen name="Earnings" component={WasherEarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="CustomerTabs" component={CustomerTabNavigator} />
          <Stack.Screen name="WasherTabs" component={WasherTabNavigator} />
          <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
} 