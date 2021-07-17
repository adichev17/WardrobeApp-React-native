import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, SafeAreaView } from 'react-native';
import ThingComponentScrollViewWrapper from './ThingComponentScrollViewWrapper';

export default function CategoryScrollView({
  _ListThing,
  _SortedListThing,
  _listThingSRCArray,
  setThingsInConstructor,
}) {
  const [nameActiveCategory, setNameActiveCategory] = useState('Все вещи');
  const [ListThing, setListThing] = useState(_ListThing);
  const [SortedListThing, setSortedListThing] = useState(_SortedListThing);

  useEffect(() => {
    SortedForCategory();
  }, [nameActiveCategory]);
  const list = [
    {
      title: 'Все вещи',
      onPress: () => {
        setNameActiveCategory('Все вещи');
      },
    },
    {
      title: 'Верхняя одежда',
      onPress: () => {
        setNameActiveCategory('Верхняя одежда');
      },
    },
    {
      title: 'Аксессуары',
      onPress: () => {
        setNameActiveCategory('Аксессуары');
      },
    },
    {
      title: 'Обувь',
      onPress: () => {
        setNameActiveCategory('Обувь');
      },
    },
    {
      title: 'Толстовки и худи',
      onPress: () => {
        setNameActiveCategory('Толстовки и худи');
      },
    },
  ];
  const SortedForCategory = () => {
    if (nameActiveCategory !== 'Все вещи' && ListThing !== null) {
      let newList = [];
      let sortCategory = ListThing.filter((name) => {
        return name.category == nameActiveCategory;
      })[0];
      newList.push(sortCategory);
      setSortedListThing(newList);
    } else if (nameActiveCategory === 'Все вещи' && ListThing !== null) {
      setSortedListThing(ListThing);
    }
  };

  return (
    <View>
      <SafeAreaView style={styles.containerForTitleCategory}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          disableIntervalMomentum={true}
          disableScrollViewPanResponder={true}
          style={styles.scrollView}>
          {list.map((el, i) => {
            return (
              <View>
                <Text onPress={el.onPress} style={styles.titleCategory}>
                  {el.title}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      <SafeAreaView style={styles.containerForImages}>
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {SortedListThing.map((el, i) => {
            return (
              <ThingComponentScrollViewWrapper
                includeThings={el.includeThings}
                titleCategory={''}
                setThingsInConstructor={setThingsInConstructor}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerForTitleCategory: {
    width: '100%',
    marginHorizontal: '3%',
  },
  scrollViewForTitleCategory: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  titleCategory: {
    marginHorizontal: 15,
    fontWeight: 'bold',
    color: '#706E6E',
  },
  containerForImages: {
    height: 200,
  },
});
