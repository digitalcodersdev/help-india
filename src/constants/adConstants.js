import {AppOpenAd, TestIds} from 'react-native-google-mobile-ads';
import APP_CONSTAINTS from './appConstants';

const __DEV__ = APP_CONSTAINTS.DEV_MODE === 'DEVELOPMENT';
const adConstants = {
  APP_OPEN_ID: __DEV__
    ? TestIds.APP_OPEN
    : 'ca-app-pub-1707683176830560/8313415653',
  BANNER_ID: __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-1707683176830560/9499058751',
  REWARDED_ID: __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-1707683176830560/4085400188',
};

export default adConstants;
