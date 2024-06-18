import R from '../resources/R';
import ScreensNameEnum from './ScreensNameEnum';

const drawerRoutes = [
  {
    title: 'Home',
    screen: ScreensNameEnum.HOME_SCREEN,
    icon: 'home',
    color: 'blue',
  },
  {
    title: 'File Converter',
    screen: ScreensNameEnum.FILE_CONVERTER_SCREEN,
    icon: 'file-sign',
    color: R.colors.GREEN,
  },
];

export default drawerRoutes;
