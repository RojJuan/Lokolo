import { useNavigation } from '@react-navigation/native';
import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';

export default function IndexScreen() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // This hides the header
    });
  }, [navigation]);

  return (
    <WelcomeScreen />
  );
}