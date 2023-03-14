import {localizedStrings} from '../../localization/LocalizationManager';

export class JokesLocalization {
  static instance = new JokesLocalization();

  jokeOfTheDayTitle(): string {
    return localizedStrings['Jokes.scene.joke.of.the.day.title'];
  }

  jokeOfTheWeekTitle(): string {
    return localizedStrings['Jokes.scene.joke.of.the.week.title'];
  }

  jokeOfTheMonthTitle(): string {
    return localizedStrings['Jokes.scene.joke.of.the.month.title'];
  }

  jokeOfTheYearTitle(): string {
    return localizedStrings['Jokes.scene.joke.of.the.year.title'];
  }

  noMoreItemsText(): string {
    return localizedStrings['Jokes.scene.no.more.items.text'];
  }

  errorText(): string {
    return localizedStrings['Jokes.scene.error.text'];
  }

  sourceText(source: string): string {
    return localizedStrings.formatString(localizedStrings['Jokes.scene.source.text'], source) as string;
  }
}
