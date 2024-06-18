import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import RegistrationRoutes from './RegistrationRoutes';
import {isFunction} from 'lodash-es';

/*
 * This function  handles startup app functionality and here we are setting user in our local storage
 * @author TechQuiz <mohitkumar.webdev@gmail.com>
 */

const RootRoutes = () => {
  const [hasNoInternet, setHasNoInternet] = useState(false);

  useEffect(() => {
    const netInfoSubscriber = NetInfo.addEventListener(state => {
      setHasNoInternet(!state.isConnected);
    });
    return () => (isFunction(netInfoSubscriber) ? netInfoSubscriber() : void 0);
  }, []);

  if (hasNoInternet) {
    return (
      <Text
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 30,
        }}>
        No Internet Connection!
      </Text>
    );
  }

  return (
    <NavigationContainer>
      <RegistrationRoutes />
    </NavigationContainer>
  );
};

export default RootRoutes;
const styles = StyleSheet.create({
  imageStyle: {
    width: '80%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  alightCenter: {alignSelf: 'center'},
});
