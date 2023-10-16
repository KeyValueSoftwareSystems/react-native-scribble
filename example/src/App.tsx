import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import {
  SvgCapture,
  useSvgCapture,
} from '@keyvaluesystems/react-native-scribble';

export default function App() {
  const signatureProps = useSvgCapture();
  const { clearPad } = signatureProps;

  return (
    <View style={styles.container}>
      <View style={styles.svgCaptureContainer}>
        <SvgCapture {...signatureProps} />
      </View>
      <Button title="Clear" onPress={clearPad} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  svgCaptureContainer: {
    width: '100%',
    height: '80%',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
