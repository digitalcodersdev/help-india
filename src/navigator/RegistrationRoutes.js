import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerRoutes from './DrawerRoutes';

const Stack = createNativeStackNavigator();

const RegistrationRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}>
        {/* <DrawerRoutes/> */}
      <Stack.Screen name="Home" component={DrawerRoutes} />
    </Stack.Navigator>
  );
};

export default RegistrationRoutes;
