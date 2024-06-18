import {
  View,
  Button,
  Alert,
  TextInput,
  Text,
  Linking,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  AppOpenAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import adConstants from '../constants/adConstants';
import useInitializeAds from '../customHooks/useInitializeAds';
import BannerAd from '../components/BannerAd';
import Header from '../components/Header';
import ScreensNameEnum from '../constants/ScreensNameEnum';

const appOpenAd = AppOpenAd.createForAdRequest(adConstants.APP_OPEN_ID);
const rewarded = RewardedAd.createForAdRequest(adConstants.REWARDED_ID);

const HomeScreen = ({navigation}) => {
  useInitializeAds();
  const [fileUrl, setFileUrl] = useState('');
  const [originalUrl, setOUrl] = useState('');
  const [rewardLoaded, setRewardLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      // appOpenAd.show();
    });
    appOpenAd.load();
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribeRewardedLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardLoaded(true);
      },
    );

    const unsubscribeRewardedEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of', reward);
        // You can handle the reward logic here
        Linking.openURL(fileUrl).catch(err =>
          console.error('Failed to open URL:', err),
        );
      },
    );

    rewarded.load();

    return () => {
      unsubscribeRewardedLoaded();
      unsubscribeRewardedEarned();
    };
  }, [fileUrl]);

  const extractFileUrl = () => {
    if (isValidURL(originalUrl)) {
      const matches = originalUrl.match(/file=([^&]*)/);
      if (matches && matches.length > 1) {
        const decodedUrl = decodeURIComponent(matches[1]);
        setFileUrl(decodedUrl);
        setOUrl('');
      } else {
        Alert.alert('Invalid URL', 'Please enter an encrypted url');
        setOUrl('');
      }
    } else {
      Alert.alert('Invalid URL', 'Please enter an encrypted url');
      setOUrl('');
    }
  };

  const isValidURL = url => {
    // Regular expression to validate URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const hanldeOpenUrl = async () => {
    try {
      if (fileUrl) {
        rewarded.show();
      } else {
        Alert.alert('No URL available');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/back1.jpg')}
        style={styles.container}>
        <StatusBar backgroundColor={'black'} />

        <BannerAd />
        <View style={styles.TextInputView}>
          <TextInput
            placeholder="enter your url"
            value={originalUrl}
            onChangeText={setOUrl}
            style={styles.textInput}
            placeholderTextColor={'gray'}
            multiline
          />
          <Button title="Convert URL" onPress={extractFileUrl} />
          {fileUrl?.length ? (
            <>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '900',
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Click on the Below Link
              </Text>
              <Text
                style={{
                  marginVertical: 10,
                  color: 'white',
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  lineHeight: 30,
                }}
                onPress={hanldeOpenUrl}>
                {fileUrl}
              </Text>
              <Button
                title="Reset"
                onPress={() => {
                  setFileUrl('');
                  setOUrl('');
                }}
              />
            </>
          ) : null}
        </View>
        <BannerAd />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextInputView: {flex: 1, justifyContent: 'center', width: '100%'},
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: 'white',
    fontWeight: '600',
    fontSize: 16,
    color: 'gray',
  },
});
