import {BannerAd, TestIds, BannerAdSize} from 'react-native-google-mobile-ads';

import {StyleSheet} from 'react-native';
import React from 'react';
import adConstants from '../constants/adConstants';


const BannerAds = () => {
  return <BannerAd unitId={adConstants.BANNER_ID} size={BannerAdSize.FULL_BANNER} />;
};

export default BannerAds;

const styles = StyleSheet.create({});
