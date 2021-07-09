import React from 'react';
import { StyleSheet, ScrollView, Text, Image, View } from 'react-native';

export default function ThingWrapper({ thing }) {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: thing,
          cache: 'force-cache',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 180,
    // marginLeft: '2%',
  },
  wrapper: {
    marginHorizontal: 10,
  },
});
