import React from 'react';
import {
  type GestureResponderEvent,
  type LayoutChangeEvent,
  View,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import Svg, { G, Polyline } from 'react-native-svg';

type CaptureSignatureProps = {
  paths: number[][];
  canvasStyle?: StyleProp<ViewStyle>;
  handleOnTouchStart: (e: GestureResponderEvent) => void;
  handleOnTouchMove: (e: GestureResponderEvent) => void;
  handleLayout: (e: LayoutChangeEvent) => void;
};

const SvgCapture = ({
  paths,
  canvasStyle,
  handleOnTouchStart,
  handleOnTouchMove,
  handleLayout,
}: CaptureSignatureProps) => {
  return (
    <View style={styles.canvasAndControlWrapper}>
      <View
        style={[styles.canvas, canvasStyle]}
        onTouchStart={handleOnTouchStart}
        onTouchMove={handleOnTouchMove}
        onLayout={handleLayout}
      >
        <Svg>
          <G>
            {paths.map((item) => {
              return (
                <Polyline
                  key={JSON.stringify(item)}
                  points={item}
                  fill="transparent"
                  stroke="blue"
                  strokeWidth="3"
                />
              );
            })}
          </G>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  canvasAndControlWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  canvas: {
    flex: 1,
  },
});

export default SvgCapture;
