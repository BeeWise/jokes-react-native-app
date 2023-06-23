import 'reflect-metadata';

jest.useFakeTimers();

jest.mock('react-native-localize', () => 'RNLocalize');
jest.mock('react-native-url-polyfill', () => 'URL');
jest.mock('uuid', () => ({v4: () => 'adfd01fb-309b-4e1c-9117-44d003f5d7fc'}));

jest.mock(
  'react-native-localization',
  () =>
    class RNLocalization {
      language = 'en';

      constructor(props) {
        this.props = props;
        this.setLanguage(this.language);
      }

      setLanguage(interfaceLanguage) {
        this.language = interfaceLanguage;
        if (this.props[interfaceLanguage]) {
          var localizedStrings = this.props[this.language];
          for (var key in localizedStrings) {
            if (localizedStrings.hasOwnProperty(key)) {
              this[key] = localizedStrings[key];
            }
          }
        }
      }
    },
);

it('test', () => {
  expect(true).toBeTruthy();
});
