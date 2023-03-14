import {ImageTitleButton} from '../../components/buttons/ImageTitleButton';
import {SpaceCell} from '../../components/cells/space/SpaceCell';
import {LoadingImageView} from '../../components/views/loading_image_view/LoadingImageView';
import {AttributedText} from '../../models/attributed_text/AttributedText';
import {CompoundImage} from '../../models/image/CompoundImage';
import {ApplicationConstraints} from '../../style/ApplicationConstraints';
import {JokeTextCell} from '../../components/cells/joke/JokeTextCell';
import {JokesLocalization} from './JokesLocalization';
import {JokesModels} from './JokesModels';
import {JokesDisplayLogic} from './JokesScene';
import {JokesStyle} from './JokesStyle';
import {formatDistanceToNowStrict, Locale, parseISO} from 'date-fns';
import {LocalizationManager} from '../../localization/LocalizationManager';
import {enUS, ro} from 'date-fns/locale';
import {UserAvatarView} from '../../components/views/user_avatar_view/UserAvatarView';
import {Joke} from '../../models/joke/Joke';
import {ApplicationLocalization} from '../application/ApplicationLocalization';
import {User} from '../../models/user/User';
import {JokeQuestionAnswerCell} from '../../components/cells/joke/JokeQuestionAnswerCell';

export interface JokesPresentationLogic {
  presentLoadingState(): void;
  presentNotLoadingState(): void;

  presentItems(response: JokesModels.ItemsPresentation.Response): void;

  presentNoMoreItems(): void;
  presentRemoveNoMoreItems(): void;

  presentError(response: JokesModels.ErrorPresentation.Response): void;
  presentRemoveError(): void;

  presentReadState(response: JokesModels.ItemReadState.Response): void;

  presentErrorActionAlert(response: JokesModels.ActionAlertPresentation.Response): void;

  presentScrollToItem(response: JokesModels.ItemScroll.Response): void;
}

export class JokesPresenter implements JokesPresentationLogic {
  displayer?: JokesDisplayLogic;

  presentLoadingState() {
    this.displayer?.displayLoadingState();
  }

  presentNotLoadingState() {
    this.displayer?.displayNotLoadingState();
  }

  presentItems(response: JokesModels.ItemsPresentation.Response) {
    this.displayer?.displayItems(new JokesModels.ItemsPresentation.ViewModel(this.displayedItems(response.items, response.readJokes)));
  }

  presentNoMoreItems() {
    let text = new AttributedText(JokesLocalization.instance.noMoreItemsText(), JokesStyle.instance.flatListModel().noMoreItemsTextStyle);
    this.displayer?.displayNoMoreItems(new JokesModels.NoMoreItemsPresentation.ViewModel(text));
  }

  presentRemoveNoMoreItems() {
    this.displayer?.displayRemoveNoMoreItems();
  }

  presentError(_response: JokesModels.ErrorPresentation.Response) {
    let text = new AttributedText(JokesLocalization.instance.errorText(), JokesStyle.instance.flatListModel().errorTextStyle);
    this.displayer?.displayError(new JokesModels.ErrorPresentation.ViewModel(text));
  }

  presentRemoveError() {
    this.displayer?.displayRemoveError();
  }

  presentReadState(response: JokesModels.ItemReadState.Response): void {
    this.displayer?.displayReadState(new JokesModels.ItemReadState.ViewModel(response.isRead, response.id));
  }

  presentErrorActionAlert(response: JokesModels.ActionAlertPresentation.Response): void {
    let message = response.error.localizedMessage();
    this.displayer?.displayErrorActionAlert(new JokesModels.ActionAlertPresentation.ViewModel(undefined, message));
  }

  presentScrollToItem(response: JokesModels.ItemScroll.Response): void {
    this.displayer?.displayScrollToItem(new JokesModels.ItemScroll.ViewModel(response.animated, response.index));
  }

  //#region Items
  displayedItems(items: Joke[], readJokes: Joke[]): JokesModels.DisplayedItem[] {
    if (items.length === 0) {
      return [];
    }
    var displayedItems: (JokesModels.DisplayedItem | undefined)[] = [];
    displayedItems.push(this.displayedSpaceItem(ApplicationConstraints.constant.x16));

    items.forEach((joke, index, array) => {
      let isRead = readJokes.some(element => joke.uuid === element.uuid);
      displayedItems.push(this.displayedJokeItem(joke, isRead));

      if (index !== array.length - 1) {
        displayedItems.push(this.displayedSpaceItem(ApplicationConstraints.constant.x16));
      }
    });
    return displayedItems.filter((item): item is JokesModels.DisplayedItem => !!item);
  }

  displayedSpaceItem(height: number): JokesModels.DisplayedItem {
    return new JokesModels.DisplayedItem(JokesModels.ItemType.space, new SpaceCell.Model(height));
  }
  //#endregion

  //#region Joke
  displayedJokeItem(joke: Joke, isRead: boolean): JokesModels.DisplayedItem {
    if (joke.type === Joke.Type.qna.value && joke.answer !== undefined) {
      return this.displayedJokeQnaItem(joke, isRead);
    }
    return this.displayedJokeTextItem(joke);
  }
  //#endregion

  //#region Joke text
  displayedJokeTextItem(joke: Joke): JokesModels.DisplayedItem {
    let avatar = this.jokeAvatarViewModel(joke);
    let likeCount = this.jokeLikeViewModel(joke);
    let dislikeCount = this.jokeDislikeViewModel(joke);

    let model = new JokeTextCell.Model(avatar);
    model.id = joke.uuid;
    model.name = new AttributedText(joke.user?.name, JokesStyle.instance.jokeCellModel().nameStyle);
    model.username = new AttributedText(this.usernameText(joke.user), JokesStyle.instance.jokeCellModel().usernameStyle);
    model.text = new AttributedText(joke.text, JokesStyle.instance.jokeCellModel().textStyle);
    model.likeCount = likeCount;
    model.dislikeCount = dislikeCount;
    model.time = new AttributedText(this.time(joke.createdAt), JokesStyle.instance.jokeCellModel().timeStyle);
    return new JokesModels.DisplayedItem(JokesModels.ItemType.jokeText, model);
  }
  //#endregion

  //#region Joke qna
  displayedJokeQnaItem(joke: Joke, isRead: boolean): JokesModels.DisplayedItem {
    let avatar = this.jokeAvatarViewModel(joke);
    let likeCount = this.jokeLikeViewModel(joke);
    let dislikeCount = this.jokeDislikeViewModel(joke);

    let model = new JokeQuestionAnswerCell.Model(avatar);
    model.id = joke.uuid;
    model.name = new AttributedText(joke.user?.name, JokesStyle.instance.jokeCellModel().nameStyle);
    model.username = new AttributedText(this.usernameText(joke.user), JokesStyle.instance.jokeCellModel().usernameStyle);
    model.text = new AttributedText(joke.text, JokesStyle.instance.jokeCellModel().textStyle);
    model.answer = new AttributedText(joke.answer, JokesStyle.instance.jokeCellModel().answerStyle);
    model.likeCount = likeCount;
    model.dislikeCount = dislikeCount;
    model.time = new AttributedText(this.time(joke.createdAt), JokesStyle.instance.jokeCellModel().timeStyle);
    model.isRead = isRead;
    return new JokesModels.DisplayedItem(JokesModels.ItemType.jokeQna, model);
  }
  //#endregion

  jokeAvatarViewModel(joke: Joke): UserAvatarView.Model {
    let loadingImage = new LoadingImageView.Model(this.compoundImage(joke.user?.photo?.url150, JokesStyle.instance.jokeCellModel().avatarPlaceholder), false);
    loadingImage.activityIndicatorColor = JokesStyle.instance.jokeCellModel().avatarActivityColor;
    loadingImage.borderTopLeftRadius = JokesStyle.instance.jokeCellModel().avatarBorderRadius;
    loadingImage.borderTopRightRadius = JokesStyle.instance.jokeCellModel().avatarBorderRadius;
    loadingImage.borderBottomLeftRadius = JokesStyle.instance.jokeCellModel().avatarBorderRadius;
    loadingImage.borderBottomRightRadius = JokesStyle.instance.jokeCellModel().avatarBorderRadius;

    let avatar = new UserAvatarView.Model(loadingImage);
    avatar.isDisabled = false;
    avatar.backgroundColor = JokesStyle.instance.jokeCellModel().avatarBackgroundColor;
    avatar.borderWidth = JokesStyle.instance.jokeCellModel().avatarBorderWidth;
    avatar.borderColor = JokesStyle.instance.jokeCellModel().avatarBorderColor;
    avatar.margin = JokesStyle.instance.jokeCellModel().avatarMargin;
    return avatar;
  }

  jokeLikeViewModel(joke: Joke): ImageTitleButton.Model {
    let likeCount = new ImageTitleButton.Model();
    likeCount.activityIndicatorColor = JokesStyle.instance.jokeCellModel().likeCountActivityColor;
    likeCount.image = new CompoundImage(undefined, JokesStyle.instance.jokeCellModel().likeCountImage);
    likeCount.imageTintColor = JokesStyle.instance.jokeCellModel().unselectedLikeCountTintColor;
    likeCount.backgroundColor = JokesStyle.instance.jokeCellModel().unselectedLikeCountBackgroundColor;
    likeCount.title = new AttributedText(joke.likeCount.toString(), JokesStyle.instance.jokeCellModel().unselectedLikeCountStyle);
    likeCount.borderRadius = ApplicationConstraints.constant.x12;
    likeCount.isDisabled = false;
    likeCount.isLoading = false;
    return likeCount;
  }

  jokeDislikeViewModel(joke: Joke): ImageTitleButton.Model {
    let dislikeCount = new ImageTitleButton.Model();
    dislikeCount.activityIndicatorColor = JokesStyle.instance.jokeCellModel().dislikeCountActivityColor;
    dislikeCount.image = new CompoundImage(undefined, JokesStyle.instance.jokeCellModel().dislikeCountImage);
    dislikeCount.imageTintColor = JokesStyle.instance.jokeCellModel().unselectedDislikeCountTintColor;
    dislikeCount.backgroundColor = JokesStyle.instance.jokeCellModel().unselectedDislikeCountBackgroundColor;
    dislikeCount.title = new AttributedText(joke.dislikeCount.toString(), JokesStyle.instance.jokeCellModel().unselectedDislikeCountStyle);
    dislikeCount.borderRadius = ApplicationConstraints.constant.x12;
    dislikeCount.isDisabled = false;
    dislikeCount.isLoading = false;
    return dislikeCount;
  }

  compoundImage(url?: string, placeholder?: any): CompoundImage {
    if (url !== undefined && url !== null && url.length > 0) {
      let image = new CompoundImage(url);
      image.resizeMode = 'cover';
      return image;
    }
    let image = new CompoundImage(undefined, placeholder);
    image.resizeMode = 'cover';
    return image;
  }

  time(createdAt?: string): string | undefined {
    if (createdAt === undefined || createdAt === null || createdAt.length === 0) {
      return undefined;
    }
    let date = parseISO(createdAt);
    let locale = this.locale();
    return formatDistanceToNowStrict(date, {addSuffix: false, roundingMethod: 'floor', locale: locale});
  }

  locale(): Locale | undefined {
    switch (LocalizationManager.instance.preferredLocalization()) {
      case 'en':
        return enUS;
      case 'ro':
        return ro;
      default:
        return undefined;
    }
  }

  usernameText(user?: User): string | undefined {
    let username = user?.username;
    if (username !== undefined) {
      return ApplicationLocalization.instance.usernameTitle(username);
    }
    return undefined;
  }
}
