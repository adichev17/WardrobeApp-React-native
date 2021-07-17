import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';

export default function ThingWrapper({ thing, index }) {
  const [count, setCount] = useState();

  const AddToDesigner = (src) => {
    console.log(src);
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
      {/* {() => setCount(() => count + 1)} */}
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
