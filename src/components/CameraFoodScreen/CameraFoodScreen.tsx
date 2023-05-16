import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CameraFoodScreen = () => {
  const [imageData, setImageData] = useState(``);
  const [takePhotoClicked, setTakePhotoClicked] = useState(false);

  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
  };

  const takePicture = async () => {
    if (camera != null) {
      const photo = await camera.current.takePhoto();
      console.log(`photo`);
      console.log(photo);
      console.log(`photo path`);
      console.log(photo.path);
      setImageData(photo.path);
      setTakePhotoClicked(false);
    }
  };

  if (device == null) return <ActivityIndicator />;
  return (
    <View style={{flex: 1}}>
      {takePhotoClicked ? (
        <View style={{flex: 1}}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo
          />
          <View style={styles.cameraBottomContainer}>
            <TouchableOpacity
              style={styles.cameraBtn}
              onPress={() => {
                takePicture();
              }}>
              <View style={styles.innerCameraBtn}></View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.imageAndBtnContainer}>
          {imageData !== '' && (
            <Image source={{uri: 'file://' + imageData}} style={styles.image} />
          )}
          {imageData !== '' ? (
            <View style={styles.clickPhotoAndBtn}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setTakePhotoClicked(true);
                }}>
                <Text style={styles.btnText}>Click Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendBtnContainer}>
                <Ionicons
                  name="send-outline"
                  size={25}
                  style={{transform: [{rotateZ: '-20deg'}]}}></Ionicons>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.clickPhotoAndBtn}>
              <TouchableOpacity
                style={[styles.btn, {alignSelf: 'center'}]}
                onPress={() => {
                  setTakePhotoClicked(true);
                }}>
                <Text style={styles.btnText}>Click Photo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default CameraFoodScreen;

const styles = StyleSheet.create({
  cameraBottomContainer: {
    backgroundColor: 'white',
    height: 168,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  cameraBtn: {
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: '#FFC0B8',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCameraBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#FF8473',
    borderRadius: 50,
  },
  imageAndBtnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: 'black',
  },
  image: {
    width: '90%',
    height: '80%',
    marginBottom: 15,
    borderRadius: 20,
  },
  clickPhotoAndBtn: {
    // borderWidth: 1,
    borderColor: 'blue',
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 72,
    width: '90%',
    borderRadius: 24,
    backgroundColor: '#91C788',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: 'black',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  sendBtnContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    height: 72,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});