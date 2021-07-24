import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';

export default function ThingWrapper({ thing, index, setThingsInConstructor }) {
  const AddToDesigner = (src) => {
    setThingsInConstructor(src);
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => AddToDesigner(thing)}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: thing,
            cache: 'force-cache',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 180,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  wrapper: {
    marginHorizontal: 10,
  },
});
