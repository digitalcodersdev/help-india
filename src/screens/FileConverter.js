import axios from 'axios';
import React, {useState} from 'react';
import {View, Button, Text, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import Loader from '../library/commons/Loader';
import Share from 'react-native-share';

const SERVER_URL = 'http://192.168.115.226:3000/convert-to-pdf';

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log('file', file, '__M');

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.doc, DocumentPicker.types.docx],
      });
      setFile(res);
      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  const uploadDocument = async () => {
    setLoading(true);
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const fileUri = file[0].uri;
      const fileName = file[0].name;
      const fileType = file[0].type;

      // Convert content URI to file URI
      const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.copyFile(fileUri, localFilePath);

      const formData = new FormData();
      formData.append('file', {
        name: fileName,
        type: fileType,
        uri: `file://${localFilePath}`,
      });

      const response = await axios.post(SERVER_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 && response.data) {
        const {dirs} = RNFetchBlob.fs;
        const filePath = `${dirs.DownloadDir}/${fileName.replace(
          /\..+$/,
          '.pdf',
        )}`;

        // Save the file
        RNFetchBlob.fs
          .writeFile(filePath, response.data, 'base64')
          .then(() => {
            console.log('File saved to:', filePath);
            setLoading(false);

            // Optional: Share the file after saving
            shareFile(filePath);
          })
          .catch(err => {
            console.error('Error saving file:', err);
            setLoading(false);
          });
      } else {
        setLoading(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error('File upload or download error:', err);
      setLoading(false);
    }
  };

  const shareFile = async filePath => {
    try {
      const shareOptions = {
        title: 'Share PDF File',
        url: `file://${filePath}`,
        failOnCancel: false,
      };

      await Share.open(shareOptions);
      console.log('File shared successfully:', filePath);
    } catch (error) {
      console.error('Error sharing file:', error);
      throw error;
    }
  };

  return (
    <View>
      <Button title="Pick a Document" onPress={pickDocument} />
      {file && (
        <View>
          <Text>{`Picked file: ${file[0].name}`}</Text>
          <Button title="Convert to PDF" onPress={uploadDocument} />
        </View>
      )}
      <Loader loading={loading} message={'Converting files, please wait'} />
    </View>
  );
};

export default FileConverter;
