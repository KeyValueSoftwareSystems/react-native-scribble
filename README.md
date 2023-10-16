# react-native-scribble

React native package to capture user scribbling on screen and converting it to an svg image

## Installation

```sh
npm i @keyvaluesystems/react-native-scribble
```

## Usage

```jsx
import { SvgCapture ,useSvgCapture } from '@keyvaluesystems/react-native-scribble';
  // ...
  const signatureProps = useSvgCapture();
  const { clearPad, getFilePath } = signatureProps;

  const handleFileGeneration = async () => {
    const filePath = await getFilePath();
  };
  // ...
  return (
    <>
      <SvgCapture {...signatureProps} />
      <Button title="Clear" onClick={clearPad} />
      <Button title="Save" onClick={handleFileGeneration} />
    </>
  );
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
