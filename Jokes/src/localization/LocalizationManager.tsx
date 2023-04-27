import LocalizedStrings from 'react-native-localization';
import en from './en.json';
import ro from './ro.json';
import * as RNLocalize from 'react-native-localize';

export const localizedStrings = new LocalizedStrings({
  en: en,
  ro: ro,
});

export class LocalizationManager {
  static instance = new LocalizationManager();

  defaultLanguage = 'en';

  preferredLocalization(): string {
    let localeCode = this.defaultLanguage;
    let supportedLocaleCodes = this.preferredLocalizations();
    let deviceLocaleCodes = RNLocalize.getLocales().map(locale => locale.languageCode);
    deviceLocaleCodes.some(code => {
      if (supportedLocaleCodes.includes(code)) {
        localeCode = code;
        return true;
      }
    });
    return localeCode;
  }

  preferredLocalizations(): string[] {
    return localizedStrings.getAvailableLanguages();
  }

  setLanguage(language: string) {
    localizedStrings.setLanguage(language);
  }
}
