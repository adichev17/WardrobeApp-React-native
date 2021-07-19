import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';

export default function FlatListGridFor3Items({ Data }) {
  return (
    <Grid>
      <Col>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: Data[0] !== undefined ? Data[0] : ' ',
            // cache: 'force-cache',
          }}
        />
      </Col>
      <Col>
        <Row>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: Data[1] !== undefined ? Data[1] : ' ',
              // cache: 'force-cache',
            }}
          />
        </Row>
        <Row>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: Data[2] !== undefined ? Data[2] : ' ',
              // cache: 'force-cache',
            }}
          />
        </Row>
      </Col>
    </Grid>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: '98%',
    height: '98%',
    resizeMode: 'cover',
  },
});
