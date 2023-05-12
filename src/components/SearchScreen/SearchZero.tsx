import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const SearchZero = () => {
  return (
    <View style={styles.shoppingBasketContainer}>
      <Image
        style={styles.shoppingBasketImg}
        source={require('../../assets/shopping-basket.png')}
      />
      <View style={styles.taglineContainer}>
        <Text style={styles.tagline}>Search about your meal</Text>
      </View>
    </View>
  );
};

export default SearchZero;

const styles = StyleSheet.create({
  shoppingBasketContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 250,
  },
  shoppingBasketImg: {
    tintColor: 'grey',
    alignSelf: 'center',
    // borderWidth: 1,
    borderColor: 'black',
  },
  taglineContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    marginTop: 12,
  },
  tagline: {
    // borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
  },
});