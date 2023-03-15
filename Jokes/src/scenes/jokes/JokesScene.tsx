import React from 'react';
import {ActivityIndicator, FlatList, ImageBackground, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SpaceCell} from '../../components/cells/space/SpaceCell';
import {AttributedText} from '../../models/attributed_text/AttributedText';
import {JokeTextCell} from '../../components/cells/joke/JokeTextCell';
import {JokesBusinessLogic, JokesInteractor} from './JokesInteractor';
import {JokesModels} from './JokesModels';
import {JokesPresenter} from './JokesPresenter';
import {JokesRoutingLogic, JokesRouter} from './JokesRouter';
import {JokesStyle} from './JokesStyle';
import {v4 as uuidv4} from 'uuid';
import {ApplicationConstraints} from '../../style/ApplicationConstraints';
import {JokesModalContainerView} from './views/JokesModalContainerView';
import {ActionAlertScene} from '../action_alert/ActionAlertScene';
import {LogoNavigationView} from '../../components/views/logo_navigation_view/LogoNavigationView';
import {ApplicationStyle} from '../../style/ApplicationStyle';
import {UserAvatarView} from '../../components/views/user_avatar_view/UserAvatarView';
import {LoadingImageView} from '../../components/views/loading_image_view/LoadingImageView';
import {CompoundImage} from '../../models/image/CompoundImage';
import {JokeQuestionAnswerCell} from '../../components/cells/joke/JokeQuestionAnswerCell';

export interface JokesDisplayLogic {
  displayLoadingState(): void;
  displayNotLoadingState(): void;

  displayItems(viewModel: JokesModels.ItemsPresentation.ViewModel): void;

  displayNoMoreItems(viewModel: JokesModels.NoMoreItemsPresentation.ViewModel): void;
  displayRemoveNoMoreItems(): void;

  displayError(viewModel: JokesModels.ErrorPresentation.ViewModel): void;
  displayRemoveError(): void;

  displayReadState(viewModel: JokesModels.ItemReadState.ViewModel): void;
  displayErrorActionAlert(viewModel: JokesModels.ActionAlertPresentation.ViewModel): void;

  displayScrollToItem(viewModel: JokesModels.ItemScroll.ViewModel): void;
}

export class JokesScene extends React.Component<JokesScene.Props, JokesScene.State> implements JokesDisplayLogic, JokeTextCell.Delegate, JokeQuestionAnswerCell.Delegate, JokesModalContainerView.Delegate, LogoNavigationView.Delegate {
  interactor?: JokesBusinessLogic;
  router?: JokesRoutingLogic;

  modalContainerView?: JokesModalContainerView | null;

  navigationView?: LogoNavigationView | null;
  flatList?: FlatList | null;

  constructor(props: JokesScene.Props) {
    super(props);
    this.setup();
  }

  setup() {
    let interactor = new JokesInteractor();
    let presenter = new JokesPresenter();
    let router = new JokesRouter();
    this.interactor = interactor;
    this.router = router;
    interactor.presenter = presenter;
    presenter.displayer = this;
    router.scene = this;
  }

  componentDidMount() {
    this.interactor?.shouldFetchJokes();
  }

  //#region Subviews
  reload() {
    this.setState({});
  }

  render() {
    return (
      <ImageBackground style={[this.constraints.imageBackgroundView]} source={ApplicationStyle.images.wallBackgroundImage}>
        <SafeAreaView style={[this.constraints.safeAreaView, this.styles.safeAreaView]}>
          <StatusBar animated={true} backgroundColor={ApplicationStyle.colors.primary} barStyle={'light-content'} showHideTransition={'fade'} hidden={false} />
          {this.setupModalContainerView()}
          {this.setupNavigationBar()}
          {this.setupFlatList()}
        </SafeAreaView>
      </ImageBackground>
    );
  }

  setupNavigationBar() {
    if (this.props.model.logoNavigation !== undefined && this.props.model.logoNavigation !== null) {
      return <LogoNavigationView ref={ref => (this.navigationView = ref)} delegate={this} style={this.constraints.navigationView} model={this.props.model.logoNavigation} />;
    } else {
      let model = this.setupLogoNavigationViewModel();
      this.props.model.logoNavigation = model;
      return <LogoNavigationView ref={ref => (this.navigationView = ref)} delegate={this} style={this.constraints.navigationView} model={this.props.model.logoNavigation} />;
    }
  }

  setupLogoNavigationViewModel(): LogoNavigationView.Model {
    let loadingImage = new LoadingImageView.Model(new CompoundImage(), false);
    loadingImage.borderBottomLeftRadius = JokesStyle.instance.userAvatarViewModel().borderRadius;
    loadingImage.borderBottomRightRadius = JokesStyle.instance.userAvatarViewModel().borderRadius;
    loadingImage.borderTopLeftRadius = JokesStyle.instance.userAvatarViewModel().borderRadius;
    loadingImage.borderTopRightRadius = JokesStyle.instance.userAvatarViewModel().borderRadius;
    loadingImage.activityIndicatorColor = JokesStyle.instance.userAvatarViewModel().activityIndicatorColor;

    let userAvatar = new UserAvatarView.Model(loadingImage);
    userAvatar.backgroundColor = JokesStyle.instance.userAvatarViewModel().backgroundColor;
    userAvatar.borderColor = JokesStyle.instance.userAvatarViewModel().borderColor;
    userAvatar.borderWidth = JokesStyle.instance.userAvatarViewModel().borderWidth;

    let model = new LogoNavigationView.Model(userAvatar);
    model.includeBack = false;
    model.includeUserAvatar = false;
    model.includeSeparator = true;
    return model;
  }

  logoNavigationViewOnPressBackButton(_view: LogoNavigationView): void {}

  logoNavigationViewOnPressLogoImage(_view: LogoNavigationView): void {
    this.interactor?.shouldSelectLogo();
  }

  logoNavigationViewOnPressUserAvatar(_view: LogoNavigationView): void {}

  setupFlatList() {
    return (
      <FlatList
        ref={flatList => (this.flatList = flatList)}
        style={[this.constraints.flatList, this.styles.flatList]}
        data={this.props.model.displayedItems}
        keyExtractor={item => item.uuid}
        renderItem={({item}) => this.renderFlatListItem(item)}
        onScrollToIndexFailed={() => {}}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}
        keyboardDismissMode={'none'}
        onEndReached={() => this.interactor?.shouldFetchJokes()}
        onEndReachedThreshold={0.2}
        ListFooterComponent={this.setupFlatListFooter()}
        refreshControl={this.setupRefreshControl()}
      />
    );
  }

  setupFlatListFooter() {
    if (this.props.model.isLoading) {
      return this.setupActivityIndicator();
    } else if (this.props.model.noMoreItems) {
      return this.setupNoMoreItemsText();
    } else if (this.props.model.hasError) {
      return this.setupErrorText();
    }
    return null;
  }

  setupActivityIndicator() {
    return <ActivityIndicator style={this.constraints.activityIndicator} color={JokesStyle.instance.flatListModel().activityIndicatorColor} />;
  }

  setupNoMoreItemsText() {
    return (
      <Text key={uuidv4()} style={[this.constraints.noMoreItemsText, this.props.model.noMoreItemsText?.style]}>
        {this.props.model.noMoreItemsText?.text}
      </Text>
    );
  }

  setupErrorText() {
    return (
      <TouchableOpacity style={this.constraints.errorText} onPress={_event => this.interactor?.shouldFetchJokes()}>
        <Text key={uuidv4()} style={this.props.model.errorText?.style}>
          {this.props.model.errorText?.text}
        </Text>
      </TouchableOpacity>
    );
  }

  setupRefreshControl() {
    return (
      <RefreshControl
        tintColor={JokesStyle.instance.flatListModel().activityIndicatorColor}
        colors={[JokesStyle.instance.flatListModel().activityIndicatorColor]}
        refreshing={false}
        onRefresh={() => this.interactor?.shouldRefreshDetails()}
      />
    );
  }

  setupModalContainerView() {
    return <JokesModalContainerView key={uuidv4()} ref={ref => (this.modalContainerView = ref)} model={new JokesModalContainerView.Model()} delegate={this} />;
  }

  jokesModalContainerViewActionAlertOnPressCancelAction(_view: JokesModalContainerView, _scene: ActionAlertScene): void {
    this.router?.dismissActionAlertScene();
  }
  //#endregion

  //#region Styles
  styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: JokesStyle.instance.contentViewModel().backgroundColor,
    },
    flatList: {
      backgroundColor: JokesStyle.instance.flatListModel().backgroundColor,
    },
  });
  //#endregion

  //#region Constraints
  constraints = StyleSheet.create({
    imageBackgroundView: {
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
    },
    navigationView: {},
    flatList: {
      flex: 1,
    },
    activityIndicator: {
      margin: ApplicationConstraints.constant.x8,
    },
    noMoreItemsText: {
      alignSelf: 'center',
      margin: ApplicationConstraints.constant.x8,
    },
    errorText: {
      alignSelf: 'center',
      margin: ApplicationConstraints.constant.x8,
    },
  });
  //#endregion

  //#region Cells
  renderFlatListItem(item: JokesModels.DisplayedItem) {
    switch (item.type) {
      case JokesModels.ItemType.jokeText:
        return this.setupJokeTextCell(item);
      case JokesModels.ItemType.jokeQna:
        return this.setupJokeQnaCell(item);
      case JokesModels.ItemType.space:
        return this.setupSpaceCell(item);
    }
  }

  setupJokeTextCell(item: JokesModels.DisplayedItem) {
    let model = item.model as JokeTextCell.Model;
    return <JokeTextCell model={model} delegate={this} />;
  }

  jokeTextCellOnPressLikeCount(_cell: JokeTextCell, _id?: string): void {}

  jokeTextCellOnPressDislikeCount(_cell: JokeTextCell, _id?: string): void {}

  jokeTextCellOnPressUserAvatar(_cell: JokeTextCell, _id?: string): void {}

  jokeTextCellOnPressUserName(_cell: JokeTextCell, _id?: string): void {}

  setupJokeQnaCell(item: JokesModels.DisplayedItem) {
    let model = item.model as JokeQuestionAnswerCell.Model;
    return <JokeQuestionAnswerCell model={model} delegate={this} />;
  }

  jokeQuestionAnswerCellOnPressLikeCount(_cell: JokeQuestionAnswerCell, _id?: string): void {}

  jokeQuestionAnswerCellOnPressDislikeCount(_cell: JokeQuestionAnswerCell, _id?: string): void {}

  jokeQuestionAnswerCellOnPressUserAvatar(_cell: JokeQuestionAnswerCell, _id?: string): void {}

  jokeQuestionAnswerCellOnPressUserName(_cell: JokeQuestionAnswerCell, _id?: string): void {}

  jokeQuestionAnswerCellOnPressReadAnswer(_cell: JokeQuestionAnswerCell, id?: string): void {
    this.interactor?.shouldSelectReadAnswer(new JokesModels.ItemSelection.Request(id));
  }

  setupSpaceCell(item: JokesModels.DisplayedItem) {
    let model = item.model as SpaceCell.Model;
    return <SpaceCell model={model} />;
  }
  //#endregion

  //#region Display logic
  displayLoadingState() {
    this.props.model.isLoading = true;
    this.reload();
  }

  displayNotLoadingState() {
    this.props.model.isLoading = false;
    this.reload();
  }

  displayItems(viewModel: JokesModels.ItemsPresentation.ViewModel) {
    this.props.model.displayedItems = viewModel.items;
    this.reload();
  }

  displayNoMoreItems(viewModel: JokesModels.NoMoreItemsPresentation.ViewModel) {
    this.props.model.noMoreItems = true;
    this.props.model.noMoreItemsText = viewModel.text;
    this.reload();
  }

  displayRemoveNoMoreItems() {
    this.props.model.noMoreItems = false;
    this.props.model.noMoreItemsText = undefined;
    this.reload();
  }

  displayError(viewModel: JokesModels.ErrorPresentation.ViewModel) {
    this.props.model.hasError = true;
    this.props.model.errorText = viewModel.errorText;
    this.reload();
  }

  displayRemoveError() {
    this.props.model.hasError = false;
    this.props.model.errorText = undefined;
    this.reload();
  }

  displayReadState(viewModel: JokesModels.ItemReadState.ViewModel): void {
    let jokeQnaModel = this.displayedJokeQnaModel(JokesModels.ItemType.jokeQna, viewModel.id);
    if (jokeQnaModel !== undefined) {
      jokeQnaModel.isRead = viewModel.isRead;
      jokeQnaModel.cellInterface?.reload();
    }
  }

  displayErrorActionAlert(viewModel: JokesModels.ActionAlertPresentation.ViewModel): void {
    this.router?.showActionAlertScene(viewModel.title, viewModel.message);
  }

  displayScrollToItem(viewModel: JokesModels.ItemScroll.ViewModel) {
    this.flatList?.scrollToIndex({animated: viewModel.animated, index: viewModel.index});
  }
  //#endregion

  //#region Auxiliary
  displayedJokeTextModel(type: JokesModels.ItemType, id?: string): JokeTextCell.Model | undefined {
    for (let index = 0; index < this.props.model.displayedItems.length; index++) {
      let item = this.props.model.displayedItems[index];
      if (item.type === type && item.model instanceof JokeTextCell.Model) {
        let model = item.model as JokeTextCell.Model | undefined;
        if (model !== undefined && model.id === id) {
          return model;
        }
      }
    }
    return undefined;
  }

  displayedJokeQnaModel(type: JokesModels.ItemType, id?: string): JokeQuestionAnswerCell.Model | undefined {
    for (let index = 0; index < this.props.model.displayedItems.length; index++) {
      let item = this.props.model.displayedItems[index];
      if (item.type === type && item.model instanceof JokeQuestionAnswerCell.Model) {
        let model = item.model as JokeQuestionAnswerCell.Model | undefined;
        if (model !== undefined && model.id === id) {
          return model;
        }
      }
    }
    return undefined;
  }
  //#endregion

  displayLogoNavigationLoadingState(isLoading: boolean) {
    if (this.navigationView !== undefined && this.navigationView !== null && this.props.model.logoNavigation !== undefined && this.props.model.logoNavigation !== null) {
      this.props.model.logoNavigation.userAvatar.loadingImage.isLoading = isLoading;
      this.navigationView.props.model.userAvatar.loadingImage.isLoading = isLoading;
      this.navigationView.reload();
    }
  }

  displayLogoNavigationAvatar(model: UserAvatarView.Model) {
    if (this.navigationView !== undefined && this.navigationView !== null && this.props.model.logoNavigation !== undefined && this.props.model.logoNavigation !== null) {
      this.props.model.logoNavigation.userAvatar = model;
      this.navigationView.props.model.userAvatar = model;
      this.navigationView.reload();
    }
  }
}

export namespace JokesScene {
  export class Model {
    logoNavigation?: LogoNavigationView.Model;

    displayedItems: JokesModels.DisplayedItem[] = [];
    isLoading: boolean = false;
    hasError: boolean = false;
    errorText?: AttributedText;
    noMoreItems: boolean = false;
    noMoreItemsText?: AttributedText;
  }

  export interface Props {
    model: Model;
    delegate?: Delegate;
  }

  export interface State {}

  export interface Delegate {}
}
