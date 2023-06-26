import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(res);
    } catch (error) {
      console.log('Error picking file:', error);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post(
          'https://file-uploader-backend.onrender.com/api/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        setUploadedFileUrl(response.data.fileUrl);
      } catch (error) {
        console.log('Error uploading file:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Upload</Text>
      <TouchableOpacity style={styles.button} onPress={handleFilePick}>
        <Text style={styles.buttonText}>Choose File</Text>
      </TouchableOpacity>
      {selectedFile && (
        <Text style={styles.selectedFileText}>
          Selected File: {selectedFile.name}
        </Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handleUpload}
        disabled={!selectedFile}>
        <Text style={styles.buttonText}>Upload File</Text>
      </TouchableOpacity>
      {uploadedFileUrl ? (
        <Text style={styles.uploadedFileText}>
          File Uploaded! URL: {uploadedFileUrl}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedFileText: {
    fontSize: 16,
    marginBottom: 10,
  },
  uploadedFileText: {
    fontSize: 16,
    marginTop: 10,
    color: 'green',
  },
});

export default App;
