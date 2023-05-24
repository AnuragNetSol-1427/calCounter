import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  ALREADY_HAVE_AN_ACCOUNT,
  EMAIL_ADDRESS,
  EMAIL_KEYBOARD_TYPE,
  EMAIL_PLACEHOLDER,
  EMAIL_RETURN_TYPE,
  ICON_LOCK_CLOSED_OUTLINE,
  ICON_LOCK_CLOSED_OUTLINE_SIZE,
  ICON_PERSON_OUTLINE,
  ICON_PERSON_OUTLINE_SIZE,
  LOGIN_BTN,
  PASSWORD,
  PASSWORD_PLACEHOLDER,
  REGISTER,
  REGISTRATION_TOAST,
} from '../../constants/constants';

const COLORS = {
  green: '#91C788',
  loginBtnColor: '#FF9385',
  white: '#fff',
};

const Register = () => {
  // All the states are here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [eyeImage, setEyeImage] = useState('eye-outline');

  // Navigation hooks
  const navigator = useNavigation();

  // All the refs are here
  const passwordRef = useRef();

  // All the regular expressions are here
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  // Checkers
  const emailCheck = email.length > 0 && emailRegEx.test(email);
  const passwordCheck = password.length > 0 && passwordRegEx.test(password);

  const forOpacity =
    emailCheck && passwordCheck
      ? styles.forOpacityEnabled
      : styles.forOpacityDisabled;

  // All the functions are here
  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
    setEyeImage(secureTextEntry ? 'eye-off-outline' : 'eye-outline');
  };

  const handleRegister = async () => {
    try {
      // console.log('Hello');
      // console.log(`Email: `, email);
      // console.log(`Password: `, password);

      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      console.log(isUserCreated);
      navigator.navigate('Login');
      ToastAndroid.show(REGISTRATION_TOAST, ToastAndroid.SHORT);
    } catch (error) {}
  };

  // Navigation
  const logInBtn = () => {
    navigator.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{REGISTER}</Text>
      </View>
      {/* This below is for email input */}
      <View style={styles.inputParentContainer}>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>{EMAIL_ADDRESS}</Text>
        </View>
        <View style={styles.textInputParentContainer}>
          <View style={styles.textInputContainer}>
            <Ionicons
              name={ICON_PERSON_OUTLINE}
              size={ICON_PERSON_OUTLINE_SIZE}></Ionicons>

            <TextInput
              style={styles.textInput}
              placeholder={EMAIL_PLACEHOLDER}
              keyboardType={EMAIL_KEYBOARD_TYPE}
              returnKeyType={EMAIL_RETURN_TYPE}
              onChangeText={setEmail}
              value={email}
              onSubmitEditing={() => passwordRef.current.focus()}></TextInput>
          </View>
        </View>
      </View>
      {/* This below is for password input */}
      <View style={[styles.inputParentContainer, {marginTop: 25}]}>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>{PASSWORD}</Text>
        </View>
        <View style={styles.textInputParentContainer}>
          <View style={styles.textInputContainer}>
            <Ionicons
              name={ICON_LOCK_CLOSED_OUTLINE}
              size={ICON_LOCK_CLOSED_OUTLINE_SIZE}></Ionicons>

            <TextInput
              style={[styles.textInput, {width: '72%'}]}
              placeholder={PASSWORD_PLACEHOLDER}
              secureTextEntry={secureTextEntry}
              ref={passwordRef}
              onChangeText={setPassword}
              value={password}></TextInput>
            <TouchableOpacity onPress={toggleSecureTextEntry}>
              <Ionicons
                name={eyeImage}
                size={22}
                style={{marginLeft: 5}}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Register Button */}
      <View style={styles.registerBtnAndAlreadyHaveAccountContainer}>
        <View style={styles.registerBtnContainer}>
          <TouchableOpacity
            style={[styles.registerBtn, forOpacity]}
            onPress={handleRegister}>
            <Text style={styles.registerBtnText}>{REGISTER}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alreadyHaveAccountContainer}>
          <Text style={styles.alreadyHaveAccountText}>
            {ALREADY_HAVE_AN_ACCOUNT}
          </Text>
          <TouchableOpacity style={styles.logInBtnContainer} onPress={logInBtn}>
            <Text style={styles.logInBtnText}>{LOGIN_BTN}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: 'black',
    backgroundColor: COLORS.white,
  },
  headingContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    marginTop: 88,
  },
  heading: {
    // borderWidth: 1,
    borderColor: 'black',
    fontSize: 28,
    color: COLORS.green,
    // fontWeight: 'bold',
    fontFamily: 'Signika-Bold',
  },
  inputParentContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    width: '85%',
    marginTop: 82,
  },
  inputLabelContainer: {
    // borderWidth: 1,
    borderColor: 'black',
  },
  inputLabel: {
    fontSize: 12,
    // fontWeight: 500,
    fontFamily: 'Signika-SemiBold',
    marginLeft: 12,
  },
  textInputParentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // borderColor: '#222',
    // borderWidth: 1,
  },
  textInputContainer: {
    borderColor: '#111',
    borderWidth: 1, // important
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  textInput: {
    width: '80%',
    height: 64,
    // borderWidth: 1,
    borderColor: 'black',
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 7,
    fontFamily: 'Signika-Regular',
  },
  registerBtnAndAlreadyHaveAccountContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    width: '85%',
    position: 'absolute',
    bottom: 80,
  },
  registerBtnContainer: {
    // borderWidth: 1,
    borderColor: 'black',
  },
  registerBtn: {
    // borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 72,
    borderRadius: 24,
    backgroundColor: COLORS.loginBtnColor,
  },
  registerBtnText: {
    // borderWidth: 1,
    borderColor: 'black',
    fontSize: 24,
    color: 'white',
    fontFamily: 'Signika-Regular',
  },
  alreadyHaveAccountContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  alreadyHaveAccountText: {
    // borderWidth: 1,
    borderColor: 'black',
    fontSize: 13,
    fontFamily: 'Signika-Regular',
  },
  logInBtnContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    marginLeft: 5,
  },
  logInBtnText: {
    // borderWidth: 1,
    borderColor: 'black',
    color: COLORS.green,
    // fontWeight: 800,
    fontSize: 13,
    fontFamily: 'Signika-SemiBold',
  },
  forOpacityEnabled: {
    opacity: 1,
  },
  forOpacityDisabled: {
    opacity: 0.5,
  },
});