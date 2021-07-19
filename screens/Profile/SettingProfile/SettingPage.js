import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import DataUserComponent from './DataUserComponent/DataUserComponent';

export default function SettingPage({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <DataUserComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    height: '100%',
  },
});
