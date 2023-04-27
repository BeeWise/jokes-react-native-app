import {ColorValue, TextStyle} from 'react-native';
import {ApplicationStyle} from '../../style/ApplicationStyle';
import {ApplicationConstraints} from '../../style/ApplicationConstraints';
import {withAlphaHex} from 'with-alpha-hex';

export class JokesStyle {
  static instance = new JokesStyle();

  contentViewModel(): JokesStyle.ContentViewModel {
    return new JokesStyle.ContentViewModel();
  }

  userAvatarViewModel(): JokesStyle.UserAvatarView {
    return new JokesStyle.UserAvatarView();
  }

  flatListModel(): JokesStyle.FlatListModel {
    return new JokesStyle.FlatListModel();
  }

  jokeCellModel(): JokesStyle.JokeCellModel {
    return new JokesStyle.JokeCellModel();
  }

  cellModel(): JokesStyle.CellModel {
    return new JokesStyle.CellModel();
  }
}

export namespace JokesStyle {
  export class UserAvatarView {
    placeholder = ApplicationStyle.images.userAvatarPlaceholderSmallImage;
    borderRadius: number = ApplicationConstraints.constant.x20;
    backgroundColor = ApplicationStyle.colors.transparent;
    borderColor = withAlphaHex(ApplicationStyle.colors.white, 0.5);
    borderWidth = ApplicationConstraints.constant.x1;
    margin = ApplicationConstraints.constant.x0;
    activityIndicatorColor = ApplicationStyle.colors.white;
  }

  export class ContentViewModel {
    backgroundColor: ColorValue = ApplicationStyle.colors.transparent;
  }

  export class FlatListModel {
    backgroundColor: ColorValue = ApplicationStyle.colors.backgroundColor;
    activityIndicatorColor: ColorValue = ApplicationStyle.colors.primary;
    noMoreItemsTextStyle: TextStyle = {
      color: ApplicationStyle.colors.gray,
      fontFamily: ApplicationStyle.fonts.regular,
      fontSize: 14,
    };
    errorTextStyle: TextStyle = {
      color: ApplicationStyle.colors.secondary,
      fontFamily: ApplicationStyle.fonts.regular,
      fontSize: 14,
    };
  }

  export class CellModel {
    backgroundColor: ColorValue = ApplicationStyle.colors.transparent;
  }

  export class JokeCellModel {
    avatarBorderRadius: number = ApplicationConstraints.constant.x20;
    avatarActivityColor: string = ApplicationStyle.colors.primary;
    avatarBackgroundColor: string = ApplicationStyle.colors.transparent;
    avatarBorderColor: string = withAlphaHex(ApplicationStyle.colors.white, 0.5);
    avatarBorderWidth: number = ApplicationConstraints.constant.x1;
    avatarMargin = ApplicationConstraints.constant.x0;
    avatarPlaceholder: any = ApplicationStyle.images.userAvatarPlaceholderSmallImage;

    nameStyle: TextStyle = {
      color: ApplicationStyle.colors.primary,
      fontFamily: ApplicationStyle.fonts.bold,
      fontSize: 17,
      includeFontPadding: false,
    };
    usernameStyle: TextStyle = {
      color: ApplicationStyle.colors.gray,
      fontFamily: ApplicationStyle.fonts.regular,
      fontSize: 14,
      includeFontPadding: false,
    };
    textStyle: TextStyle = {
      color: ApplicationStyle.colors.primary,
      fontFamily: ApplicationStyle.fonts.regular,
      fontSize: 17,
      includeFontPadding: false,
    };
    answerStyle: TextStyle = {
      color: ApplicationStyle.colors.primary,
      fontFamily: ApplicationStyle.fonts.regular,
      fontSize: 17,
      includeFontPadding: false,
    };

    likeCountActivityColor: string = ApplicationStyle.colors.gray;
    likeCountImage: any = ApplicationStyle.images.likeSmallImage;
    unselectedLikeCountBackgroundColor: string = ApplicationStyle.colors.transparent;
    unselectedLikeCountTintColor: string = ApplicationStyle.colors.gray;
    unselectedLikeCountStyle: TextStyle = {
      color: ApplicationStyle.colors.gray,
      fontFamily: ApplicationStyle.fonts.regular,
      fontSize: 16,
    };

    dislikeCountActivityColor: string = ApplicationStyle.colors.primary;
    dislikeCountImage: any = ApplicationStyle.images.dislikeSmallImage;
    unselectedDislikeCountBackgroundColor: string = ApplicationStyle.colors.transparent;
    unselectedDislikeCountTintColor: string = ApplicationStyle.colors.gray;
    unselectedDislikeCountStyle: TextStyle = {
      color: ApplicationStyle.colors.gray,
      fontFamily: ApplicationStyle.fonts.regular,
      fontSize: 16,
    };

    timeStyle: TextStyle = {
      color: ApplicationStyle.colors.gray,
      fontFamily: ApplicationStyle.fonts.oblique,
      fontSize: 13,
      includeFontPadding: false,
    };
  }
}
