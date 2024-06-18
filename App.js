import {StatusBar} from 'react-native';
import React from 'react';
import RootRoutes from './src/navigator/RootRoutes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        // backgroundColor={R.colors.primary}
        barStyle="light-content"
      />
      <RootRoutes />
    </GestureHandlerRootView>
  );
};

export default App;
