import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const COLORS = {
  white: '#fff',
  blackForSearchHeading: '#0D0D0D',
};

const CalendarScreen = () => {
  // This state leads to refresh the screen
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getDataByDate();
    }, 2000);
  }, []);

  // All the states are here
  const [selectedDate, setSelectedDate] = useState('');
  const [mealDataByDate, setMealDataByDate] = useState([]);

  // Get the data with the help of async storage with previously 'add to meal' from SearchScreen
  const getDataByDate = async () => {
    const foodDataByDate = await AsyncStorage.getItem('foodDataByDate');
    const parsedFoodDataByDate = JSON.parse(foodDataByDate);
    console.log('parsedFoodDataByDate');
    setMealDataByDate(parsedFoodDataByDate);
    console.log(mealDataByDate);
    // console.log(parsedFoodDataByDate['2023-05-08']);
  };

  useEffect(() => {
    getDataByDate();
  }, []);

  // Get the data by date:  by pressing on any date in calendar
  const onDayPress = day => {
    setSelectedDate(day.dateString);
    const mealDataForSelectedDate = mealDataByDate[day.dateString];
    if (mealDataForSelectedDate) {
      console.log('mealDataForSelectedDate');
      console.log(mealDataForSelectedDate);
    } else {
      console.log('No meal saved');
    }
  };

  const firstLetter = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getMealDataForDate = date => {
    if (mealDataByDate && mealDataByDate[date]) {
      return mealDataByDate[date].map(meal => {
        return Object.keys(meal).map(foodName => {
          return (
            // <View key={foodName}>
            //   <Text>{foodName}</Text>
            //   <Text>Calories: {meal[foodName].calories}</Text>
            //   <Text>Serving size (g): {meal[foodName].serving_size_g}</Text>
            //   {/* Display other nutrition data as needed */}
            // </View>
            <View style={styles.mealDetailsParentContainer} key={foodName}>
              <View style={styles.mealDetailsContainer}>
                <Text style={styles.mealName}>{firstLetter(foodName)}</Text>
              </View>
              <View style={styles.nutrientDetailsContainer}>
                <View style={styles.nutrientDetailsRowOne}>
                  <View
                    style={[
                      styles.nutrientContainer,
                      {borderTopLeftRadius: 24, borderBottomLeftRadius: 24},
                    ]}>
                    <Text style={styles.nutrientHeading}>Calories</Text>
                    <Text style={styles.nutrientValue}>
                      {meal[foodName].calories}
                    </Text>
                  </View>
                  <View style={styles.nutrientContainer}>
                    <Text style={styles.nutrientHeading}>Carbs (g)</Text>
                    <Text style={styles.nutrientValue}>
                      {meal[foodName].carbohydrates_total_g}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.nutrientContainer,
                      {
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                      },
                    ]}>
                    <Text style={styles.nutrientHeading}>Cholestrol (mg)</Text>
                    <Text style={styles.nutrientValue}>
                      {meal[foodName].cholesterol_mg}
                    </Text>
                  </View>
                  {/* <View style={styles.nutrientContainer}>
                <Text style={styles.nutrientHeading}>Sat. Fat (g)</Text>
                <Text style={styles.nutrientValue}>{item.fat_saturated_g}</Text>
              </View> */}
                </View>
                <View style={styles.nutrientDetailsRowOne}>
                  <View
                    style={[
                      styles.nutrientContainer,
                      {borderTopLeftRadius: 24, borderBottomLeftRadius: 24},
                    ]}>
                    <Text style={styles.nutrientHeading}>Fat (g)</Text>
                    <Text style={styles.nutrientValue}>
                      {meal[foodName].fat_total_g}
                    </Text>
                  </View>
                  <View style={styles.nutrientContainer}>
                    <Text style={styles.nutrientHeading}>Fiber (g)</Text>
                    <Text style={styles.nutrientValue}>
                      {meal[foodName].fiber_g}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.nutrientContainer,
                      {
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                      },
                    ]}>
                    <Text style={styles.nutrientHeading}>Potassium (mg)</Text>
                    <Text style={styles.nutrientValue}>
                      {meal[foodName].potassium_mg}
                    </Text>
                  </View>
                  {/* <View style={styles.nutrientContainer}>
                <Text style={styles.nutrientHeading}>Protein (g)</Text>
                <Text style={styles.nutrientValue}>{item.protein_g}</Text>
              </View> */}
                </View>
                <View style={styles.nutrientDetailsRowOne}>
                  <View
                    style={[
                      styles.nutrientContainer,
                      {borderTopLeftRadius: 24, borderBottomLeftRadius: 24},
                    ]}>
                    <Text style={styles.nutrientHeading}>Protein (g)</Text>
                    <Text style={styles.nutrientValue}>
                      {meal[foodName].protein_g}
                    </Text>
                  </View>
                  {/* <View style={styles.nutrientContainer}>
                <Text style={styles.nutrientHeading}>Serving Size (g)</Text>
                <Text style={styles.nutrientValue}>{item.serving_size_g}</Text>
              </View> */}
                  <View style={styles.nutrientContainer}>
                    <Text style={styles.nutrientHeading}>Sodium (mg)</Text>
                    <Text style={styles.nutrientValue}>
                      {meal[foodName].sodium_mg}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.nutrientContainer,
                      {
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                      },
                    ]}>
                    <Text style={styles.nutrientHeading}>Sugar (g)</Text>
                    <Text style={styles.nutrientValue}>
                      {meal[foodName].sugar_g}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        });
      });
    } else {
      return (
        <View
          style={{
            alignItems: 'center',
            marginTop: 150,
            // borderWidth: 1,
          }}>
          <Text style={{fontFamily: 'Signika-Regular'}}>No meal data</Text>
          <Text style={{fontFamily: 'Signika-Regular'}}>
            (Choose the date wisely)
          </Text>
        </View>
      );
    }
  };

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* {Object.keys(mealDataByDate || {}) ? ( */}
      {mealDataByDate ? (
        <ScrollView style={styles.container}>
          <View style={styles.calendarHeadingContainer}>
            <Text style={styles.calendarHeading}>Calendar</Text>
          </View>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{[selectedDate]: {selected: true}}}
          />

          <View style={styles.mealDataContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.container}>
              {getMealDataForDate(selectedDate)}
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <View style={styles.calendarHeadingContainer}>
            <Text style={styles.calendarHeading}>Calendar</Text>
          </View>
          <Calendar />
          <View style={styles.noDataInCalendarContainer}>
            <View style={styles.iconAndTextContainer}>
              <Ionicons name="calendar-outline" size={80}></Ionicons>
              <Text style={{fontFamily: 'Signika-Regular'}}>
                You have no data in calendar
              </Text>
              <Text style={{fontFamily: 'Signika-Regular'}}>
                Kindly refresh for updated data
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  calendarHeadingContainer: {
    // borderColor: '#000',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  calendarHeading: {
    fontSize: 24,
    color: COLORS.blackForSearchHeading,
    fontFamily: 'Signika-SemiBold',
    // lineHeight: 16,
    // fontWeight: 500,
  },
  mealDataContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    flex: 1,
  },

  mealDetailsParentContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    marginTop: 15,
    marginBottom: 20,
    // backgroundColor: COLORS.white,
  },
  mealDetailsContainer: {},
  mealName: {
    fontSize: 25,
    color: 'black',
    marginLeft: 30,
    fontFamily: 'Signika-Regular',
  },
  nutrientDetailsContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    marginTop: 8,
  },
  nutrientDetailsRowOne: {
    // borderWidth: 1,
    borderColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    alignSelf: 'center',
    // width: '100%',
    borderRadius: 24,
  },
  nutrientContainer: {
    borderWidth: 1,
    // borderColor: 'black', // for design evalutaion
    alignItems: 'center',
    backgroundColor: '#FFF8EE',
    marginHorizontal: 3,
    paddingVertical: 8,
    borderColor: '#FFF8EE', // important
    // justifyContent: 'center',
    // marginVertical: 7,
    borderRadius: 20,
    width: '28%',
  },
  nutrientHeading: {
    // fontSize: 16,
    marginVertical: 4,
    marginBottom: 4,
    color: '#FF8473',
    fontFamily: 'Signika-Regular',
  },
  nutrientValue: {
    fontSize: 19,
    marginVertical: 5,
    marginTop: 10,
    color: '#FF8473',
    fontFamily: 'Signika-Regular',
  },
  noDataInCalendarContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    flex: 1,
  },
  iconAndTextContainer: {
    // borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
});