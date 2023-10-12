import { useCallback, useRef, useState } from 'react';
import type { GestureResponderEvent, LayoutChangeEvent } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';

const useSvgCapture = () => {
  const [paths, setPaths] = useState<number[][]>([]);
  const lowestPoints = useRef({ x: 0, y: 0 });

  const handleSetLowestPoints = (x: number, y: number) => {
    if (x < lowestPoints.current.x) {
      lowestPoints.current.x = y;
    }
    if (y < lowestPoints.current.y) {
      lowestPoints.current.y = y;
    }
  };
  const handleOnTouchStart = useCallback((e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    handleSetLowestPoints(locationX, locationY);
    setPaths((prev) => {
      return [[locationX, locationY], ...prev];
    });
  }, []);

  const handleOnTouchMove = useCallback((e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    handleSetLowestPoints(locationX, locationY);
    setPaths((prev) => {
      const updatedPath = [...prev];
      if (updatedPath[0]) {
        updatedPath[0] = [...updatedPath[0], locationX, locationY];
      }
      return updatedPath;
    });
  }, []);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout;
    lowestPoints.current = { x: width, y: height };
  };

  const getCleanedSvgImage = useCallback(() => {
    return paths.map((polygon) => {
      return polygon.map((point, index) => {
        if (index % 2 === 0) {
          return point - lowestPoints.current.x;
        } else {
          return point - lowestPoints.current.y;
        }
      });
    });
  }, [paths]);

  const clearPad = () => {
    setPaths([]);
  };

  const svgStringToBlob = async (svgString: string) => {
    try {
      // Convert SVG string to Base64.
      const base64Data = RNFetchBlob.base64.encode(svgString);

      //Use RNFetchBlob to write the Base64 data to a temporary file.
      const tmpFilePath = `${RNFetchBlob.fs.dirs.CacheDir}/tempSvgFile.svg`;
      await RNFetchBlob.fs.writeFile(tmpFilePath, base64Data, 'base64');

      // tmpFilePath now contains blob which we can upload to S3
      return tmpFilePath;
    } catch (error) {
      console.error('Failed to convert SVG string to blob:', error);
      throw error;
    }
  };

  const pathsToSVG = (cleanedSvgPath: number[][]) => {
    const svgPolylines = cleanedSvgPath
      .map((polygon) => {
        const pointsStr = polygon
          .map((point, index) => {
            return index % 2 === 0 ? `${point},` : `${point}`;
          })
          .join(' ')
          .trim();
        return `<polyline points="${pointsStr}" fill="transparent" stroke="black" stroke-width="3" />`;
      })
      .join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg">
      ${svgPolylines}
    </svg>`;
  };

  const getFilePath = () => {
    const cleanedSvgPath = getCleanedSvgImage();
    const svgString = pathsToSVG(cleanedSvgPath);
    const svgBlob = svgStringToBlob(svgString);
    return svgBlob;
  };

  return {
    paths,
    handleOnTouchStart,
    handleOnTouchMove,
    handleLayout,
    clearPad,
    getFilePath,
  };
};

export default useSvgCapture;
