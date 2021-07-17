import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, SafeAreaView } from 'react-native';
import ThingComponentScrollViewWrapper from './ThingComponentScrollViewWrapper';
import ThingWrapper from './ThingWrapper';

export default function CategoryScrollView({ _ListThing, _SortedListThing, _listThingSRCArray }) {
  const [nameActiveCategory, setNameActiveCategory] = useState('Все вещи');
  const [ListThing, setListThing] = useState(_ListThing);
  const [SortedListThing, setSortedListThing] = useState(_SortedListThing);

  const [IndexFromList, setIndexFromList] = useState(0);

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
      //   if (sortCategory === undefined || sortCategory === null) {
      //     sortCategory = [];
      //   }
      newList.push(sortCategory);
      setSortedListThing(newList);
      // console.log('-------------------------');
      // console.log(sortCategory);
    } else if (nameActiveCategory === 'Все вещи' && ListThing !== null) {
      setSortedListThing(ListThing);
    }
  };
  // console.log(SortedListThing);

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
                index={i}
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
