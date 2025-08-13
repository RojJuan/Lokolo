import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from './app/screens/HomeScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

export type RootStackParamList = {
	Welcome: undefined;
	Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Welcome">
				<Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}


