import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        marginTop: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color="#00aa00"></ActivityIndicator>
    </View>
  );
}
