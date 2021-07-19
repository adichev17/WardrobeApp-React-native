import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';

const Item = ({ uri }) => (
  <Row>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: uri,
      }}
    />
  </Row>
);

export default function FlatListGridForMore4Items({ Data }) {
  var FirstPartData = Data !== null ? Data.slice() : [' '];
  var SecondPartData = FirstPartData.splice(Math.ceil(FirstPartData.length / 2));
  return (
    <Grid>
      <Col>
        {FirstPartData.map((uri) => {
          return <Item uri={uri} />;
        })}
      </Col>
      <Col>
        {SecondPartData.map((uri) => {
          return <Item uri={uri} />;
        })}
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
