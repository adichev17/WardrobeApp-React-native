import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import ThingWrapper from './ThingWrapper';

export default function ThingComponentScrollViewWrapper({ includeThings, titleCategory }) {
  return (
    <View>
      <Text style={styles.titleCategory}>
        {titleCategory}. {includeThings.length}
      </Text>
      <ScrollView style={styles.wrapperCategoryThing} horizontal={true}>
        {includeThings.map((thing) => {
          return <ThingWrapper thing={thing} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperCategoryThing: {
    height: 180,
    width: '100%',
    // backgroundColor: '#ffffff',
    marginVertical: '2%',
  },
  titleCategory: {
    marginHorizontal: 15,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#706E6E',
  },
});
