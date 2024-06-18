import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import drawerRoutes from '../../constants/drawerRoutes';
import R from '../../resources/R';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerWrapper = props => {
  const navigation = useNavigation();
  const handleOnPress = screen => {
    navigation.navigate(screen);
  };

  // const handleLogout = () => {};

  return (
    <DrawerContentScrollView {...props}>
      {/* <View style={styles.loginSection}>
        {user ? (
          <View>
            <Text style={styles.userMsg}>
              Welcome, {'firstName' in user ? user.firstName : user.phone}
            </Text>
          </View>
        ) : (
          <View style={styles.loginBtn}>
            <Button
              title="Sign In"
              onPress={() => {
                handleOnPress(ScreensNameEnum.LOGIN_SCREEN);
              }}
            />
          </View>
        )}
      </View> */}
      <View style={styles.drawerList}>
        {drawerRoutes.map((item, index) => (
          <DrawerItem
            key={`${index}_routes`}
            icon={({color}) => (
              <Icon color={item.color} size={30} name={item.icon} />
            )}
            label={item.title}
            onPress={() => handleOnPress(item.screen)}
            style={styles.drawerItem}
            labelStyle={styles.drawerItemLabel}
          />
        ))}
        {/* {user && (
          <DrawerItem
            label={'Logout'}
            onPress={handleLogout}
            style={styles.drawerItem}
            labelStyle={styles.drawerItemLabel}
            icon={({color}) => (
              <Icon
                iconColor={color}
                size={{height: 20, width: 20}}
                icon={R.icons.LogoutIcon}
              />
            )}
          />
        )} */}
      </View>
    </DrawerContentScrollView>
  );
};
export default DrawerWrapper;
const styles = StyleSheet.create({
  loginSection: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  loginBtn: {width: 100},
  drawerList: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  drawerItem: {
    marginVertical: 0,
    paddingVertical: 0,
  },
  drawerItemLabel: {
    marginVertical: 0,
    paddingVertical: 0,
    // fontFamily: R.fonts.Bold,
    fontWeight: '800',
  },
  userMsg: {
    fontFamily: R.fonts.LatoBold,
    fontSize: 18,
  },
});
