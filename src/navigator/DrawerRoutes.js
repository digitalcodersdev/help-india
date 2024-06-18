import {createDrawerNavigator} from '@react-navigation/drawer';
import ScreensNameEnum from '../constants/ScreensNameEnum';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerWrapper from '../library/wrapper/DrawerWrapper';
import FileConverter from '../screens/FileConverter';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const DrawerRoutes = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerWrapper {...props} />}>
      {/* <Drawer.Screen
        name={ScreensNameEnum.HOME_SCREEN}
        component={HomeScreen}
      /> */}
      <Drawer.Screen component={AppFlow} name="App" />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;

function AppFlow() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}>
      <Stack.Screen component={HomeScreen} name={ScreensNameEnum.HOME_SCREEN} />
      <Stack.Screen
        component={FileConverter}
        name={ScreensNameEnum.FILE_CONVERTER_SCREEN}
      />
    </Stack.Navigator>
  );
}
