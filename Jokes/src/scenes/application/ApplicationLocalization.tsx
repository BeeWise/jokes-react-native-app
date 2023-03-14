import {localizedStrings} from '../../localization/LocalizationManager';

export class ApplicationLocalization {
  static instance = new ApplicationLocalization();

  cancelTitle(): string {
    return localizedStrings['Cancel.title'];
  }

  saveTitle(): string {
    return localizedStrings['Save.title'];
  }

  doneTitle(): string {
    return localizedStrings['Done.title'];
  }

  okTitle(): string {
    return localizedStrings['OK.title'];
  }

  jokesTitle(): string {
    return localizedStrings['Jokes.title'];
  }

  jokeStatusPendingTitle(): string {
    return localizedStrings['Joke.status.pending.title'];
  }

  jokeStatusApprovedTitle(): string {
    return localizedStrings['Joke.status.approved.title'];
  }

  jokeStatusRejectedTitle(): string {
    return localizedStrings['Joke.status.rejected.title'];
  }

  jokeStatusAdminRemovedTitle(): string {
    return localizedStrings['Joke.status.admin.removed.title'];
  }

  jokeStatusOwnerRemovedTitle(): string {
    return localizedStrings['Joke.status.owner.removed.title'];
  }

  usernameTitle(username: string): string {
    return localizedStrings.formatString(localizedStrings['Username.title'], username) as string;
  }

  shareJokeTitle(): string {
    return localizedStrings['Share.joke.title'];
  }

  shareJokeMessage(): string {
    return localizedStrings['Share.joke.message'];
  }

  readAnswerTitle(): string {
    return localizedStrings['Read.answer.title'];
  }

  iOSTitle(): string {
    return localizedStrings['iOS.title'];
  }

  androidTitle(): string {
    return localizedStrings['Android.title'];
  }

  jokeTypeTextTitle(): string {
    return localizedStrings['Joke.type.text.title'];
  }

  jokeTypeQnaTitle(): string {
    return localizedStrings['Joke.type.qna.title'];
  }
}
