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

  const [ListCategory, setListCategory] = useState(null);

  useEffect(() => {
    let ListTitleCategorys = [];
    let TitleAllThing = {};

    TitleAllThing['title'] = 'Все вещи';
    TitleAllThing['onPress'] = () => {
      setNameActiveCategory('Все вещи');
    };
    ListTitleCategorys.push(TitleAllThing);

    ListThing.map((el) => {
      let TitleCategory = {};
      TitleCategory['title'] = el.category;
      TitleCategory['onPress'] = () => {
        setNameActiveCategory(el.category);
      };
      ListTitleCategorys.push(TitleCategory);
    });

    setListCategory(ListTitleCategorys);
  }, []);

  useEffect(() => {
    SortedForCategory();
  }, [nameActiveCategory]);

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
          {ListCategory !== null ? (
            ListCategory.map((el, i) => {
              return (
                <View>
                  <Text onPress={el.onPress} style={styles.titleCategory}>
                    {el.title}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text> </Text>
          )}
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
                key={i}
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
    marginBottom: '3%',
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
