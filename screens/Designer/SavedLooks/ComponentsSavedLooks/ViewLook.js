import * as React from 'react';
import { StyleSheet, View, ActivityIndicator, SafeAreaView, ScrollView, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FlatListGridFor3Items from '../../ComponentsDesignerPages/GridThing/FlatListGridFor3Items';
import FlatListGridFor4Items from '../../ComponentsDesignerPages/GridThing/FlatListGridFor4Items';
import FlatListGridForMore4Items from '../../ComponentsDesignerPages/GridThing/FlatListGridForMore4Items';

export default function ViewLook({ look }) {
  return (
    <View style={styles.wrapperLook}>
      {look.length <= 3 && look.length !== 0 ? (
        <FlatListGridFor3Items Data={look} />
      ) : look.length === 4 ? (
        <FlatListGridFor4Items Data={look} />
      ) : look.length > 4 ? (
        <FlatListGridForMore4Items Data={look} />
      ) : (
        <Text>Нет образов</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperLook: {
    height: 270,
    marginHorizontal: '2%',
    marginVertical: '2%',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
});
