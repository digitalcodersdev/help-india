import mobileAds from 'react-native-google-mobile-ads';
const useInitializeAds = () => {
  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      // Initialization complete!
      // console.log('ADS INITIALISATION STATUS', adapterStatuses);
    });
};

export default useInitializeAds;
