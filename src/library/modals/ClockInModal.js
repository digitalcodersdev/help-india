import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../commons/Button';
import R from '../../resources/R';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
/*
 * This function is used to create the confirmation modal
 * @author TechQuiz <mohitkumar.webdev@gmail.com>
 */
const ClockInModal = ({
  isVisible,
  confirmationText = '',
  onModalClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onModalClose();
    onConfirm && onConfirm();
  };
  const [city, setCity] = useState('Jaipur');
  const [office, setOffice] = useState('office');
  const [type, setType] = useState('');

  function getCurrentDateTime() {
    const currentDate = new Date();

    // Get day, month, and year
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = currentDate.getFullYear();

    // Get hours, minutes, and AM/PM
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12-hour format

    // Construct the formatted date-time string
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes} ${amPM}`;

    return formattedDateTime;
  }

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={e => {
        onModalClose(false);
      }}
      onBackdropPress={e => {
        onModalClose(false);
      }}
      style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <View
          style={{
            backgroundColor: R.colors.WHITE,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: R.colors.LIGHTGRAY,
          }}>
          <Text
            style={{
              color: R.colors.PRIMARI_DARK,
              fontWeight: 'bold',
              padding: 10,
              textAlign: 'center',
              fontSize: R.fontSize.L,
            }}>
            Clock In
          </Text>
          <Icon
            name="close-thick"
            size={25}
            color={R.colors.PRIMARI_DARK}
            style={{padding: 10}} onPress={()=>{onModalClose(false)}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '98%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="clock-time-eight"
              size={25}
              color={R.colors.PRIMARI_DARK}
              style={{padding: 10}}
            />
            <Text style={[styles.modalHeaderText, {marginTop: 0}]}>
              {getCurrentDateTime()}
            </Text>
          </View>
          <Text
            style={{
              backgroundColor: R.colors.PRIMARI_DARK,
              color: R.colors.PRIMARY_LIGHT,
              padding: 5,
              borderRadius: 5,
              paddingHorizontal: 5,
              textAlign: 'center',
              marginLeft: 20,
            }}>
            General shift
          </Text>
          {/* <Button
            title="General shift"
            buttonStyle={{
              alignSelf: 'left',
              width: '40%',
              marginTop: 10,
              backgroundColor: R.colors.primary,
            }}
            textStyle={{fontWeight: 'bold'}}
          /> */}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.textView}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 16,
                  color: 'black',
                  paddingTop: 10,
                  paddingLeft: 8,
                },
              ]}>
              Location
            </Text>
            <View style={[styles.TextInput]}>
              <Picker
                itemStyle={{fontSize: 20}}
                selectedValue={type}
                enabled={true}
                onValueChange={(itemValue, itemIndex) => {
                  setType(itemValue);
                }}>
                <Picker.Item label={'Jaipur'} value={'cl'} />
                <Picker.Item label={'Etawah'} value={'el'} />
              </Picker>
            </View>
          </View>
          <View style={{}}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 16,
                  color: 'black',
                  paddingTop: 10,
                  paddingLeft: 8,
                },
              ]}>
              Working From *
            </Text>

            <View style={[styles.TextInput]}>
              <Picker
                itemStyle={{fontSize: 20}}
                selectedValue={type}
                enabled={true}
                onValueChange={(itemValue, itemIndex) => {
                  setType(itemValue);
                }}>
                <Picker.Item label={'Office'} value={'cl'} />
                <Picker.Item label={'Home'} value={'el'} />
              </Picker>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '50%',
            alignSelf: 'flex-end',
            margin: 20,
        
          }}>
          <Text
            style={{
              backgroundColor: R.colors.DARKGRAY,
              color: R.colors.PRIMARY_LIGHT,
              paddingHorizontal: 20,
              borderRadius: 5,
              paddingHorizontal: 15,
              width: '40%',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Cancel
          </Text>
          {/* <Button
            title="Cancel"
            buttonStyle={{
              alignSelf: 'left',
              width: '40%',

              marginTop: 10,
              backgroundColor: R.colors.WHITE,
            }}
            textStyle={{fontWeight: 'bold', color: R.colors.PRIMARI_DARK}}
          /> */}
          <Text
            style={{
              backgroundColor: R.colors.primary,
              color: R.colors.PRIMARY_LIGHT,
              paddingHorizontal: 20,
              borderRadius: 5,
              paddingVertical: 10,
              width: '50%',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Clock In
          </Text>
          {/* <Button
            title="Clock In"
            buttonStyle={{
              alignSelf: 'left',
              width: '40%',

              marginTop: 10,
              backgroundColor: R.colors.primary,
            }}
            textStyle={{fontWeight: 'bold'}}
          /> */}
        </View>
      </View>
    </Modal>
  );
};

export default ClockInModal;

const styles = StyleSheet.create({
  modalHeaderText: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontFamily: R.fonts.Regular,
    fontSize: R.fontSize.M,
    paddingVertical: 10,
    marginBottom: 10,
  },
  modalContainer: {
    justifyContent: 'center',
    margin: 20,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    minHeight: 260,
    // justifyContent: 'space-between',
    borderRadius: 12,
  },
  modalFooterText: {
    flexDirection: 'row',
  },
  buttonText: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: R.colors.lightYellow,
  },
  modalHeaderText: {
    fontWeight: 'bold',
    color: R.colors.PRIMARI_DARK,
    marginTop: 10,
    fontSize: 15,
  },
  TextInput: {
    width: 170,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: R.colors.PRIMARY_LIGHT,
    textAlign: 'left',
    alignSelf: 'center',
  },
});
