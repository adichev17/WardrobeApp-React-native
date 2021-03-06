import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';

export default function FlatListGridFor4Items({ Data }) {
  return (
    <Grid>
      <Col>
        <Row>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: Data[0] !== undefined ? Data[0] : ' ',
            }}
          />
        </Row>
        <Row>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: Data[1] !== undefined ? Data[1] : ' ',
            }}
          />
        </Row>
      </Col>
      <Col>
        <Row>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: Data[2] !== undefined ? Data[2] : ' ',
            }}
          />
        </Row>
        <Row>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: Data[3] !== undefined ? Data[3] : ' ',
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
