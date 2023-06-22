import 'react-native';
import {JokesScene} from '../../../src/scenes/jokes/JokesScene';
import {JokesRoutingLogicSpy} from './test_doubles/JokesRoutingLogicSpy';
import {LogoNavigationView} from '../../../src/components/views/logo_navigation_view/LogoNavigationView';
import {UserAvatarView} from '../../../src/components/views/user_avatar_view/UserAvatarView';
import {LoadingImageView} from '../../../src/components/views/loading_image_view/LoadingImageView';
import {CompoundImage} from '../../../src/models/image/CompoundImage';
import {JokesBusinessLogicSpy} from './test_doubles/JokesBusinessLogicSpy';
import {JokeQuestionAnswerCell} from '../../../src/components/cells/joke/JokeQuestionAnswerCell';
import {JokesModels} from '../../../src/scenes/jokes/JokesModels';
import {AttributedText} from '../../../src/models/attributed_text/AttributedText';

describe('JokesSceneTests', () => {
  var sut: JokesScene;
  var routerSpy: JokesRoutingLogicSpy;
  var interactorSpy: JokesBusinessLogicSpy;

  beforeAll(() => {
    sut = new JokesScene({model: new JokesScene.Model()});
    routerSpy = new JokesRoutingLogicSpy();
    interactorSpy = new JokesBusinessLogicSpy();
    sut.router = routerSpy;
    sut.interactor = interactorSpy;
    sut.setState = jest.fn();
  });

  it('testShouldSelectLogoShouldAskTheInteractorToSelectLogo', () => {
    sut.logoNavigationViewOnPressLogoImage(new LogoNavigationView({model: new LogoNavigationView.Model(new UserAvatarView.Model(new LoadingImageView.Model(new CompoundImage(), false)))}));
    expect(interactorSpy.shouldSelectLogoCalled).toBeTruthy();
  });

  it('testJokeQuestionAnswerCellOnPressReadAnswerShouldAskTheInteractorToSelectReadAnswer', () => {
    sut.jokeQuestionAnswerCellOnPressReadAnswer(new JokeQuestionAnswerCell({model: new JokeQuestionAnswerCell.Model(new UserAvatarView.Model(new LoadingImageView.Model(new CompoundImage(), false)))}));
    expect(interactorSpy.shouldSelectReadAnswerCalled).toBeTruthy();
  });

  it('testDisplayLoadingStateShouldUpdateIsLoadingForProps', () => {
    sut.props.model.isLoading = false;
    sut.displayLoadingState();
    expect(sut.props.model.isLoading).toBeTruthy();
  });

  it('testDisplayLoadingStateShouldCallSetState', () => {
    sut.displayLoadingState();
    expect(sut.setState).toBeCalled();
  });

  it('testDisplayNotLoadingStateShouldUpdateIsLoadingForProps', () => {
    sut.props.model.isLoading = true;
    sut.displayNotLoadingState();
    expect(sut.props.model.isLoading).toBeFalsy();
  });

  it('testDisplayNotLoadingStateShouldCallSetState', () => {
    sut.displayNotLoadingState();
    expect(sut.setState).toBeCalled();
  });

  it('testDisplayItemsShouldUpdateDisplayedItemsForProps', () => {
    let items = [new JokesModels.DisplayedItem(JokesModels.ItemType.jokeText)];
    sut.props.model.displayedItems = items;
    sut.displayItems(new JokesModels.ItemsPresentation.ViewModel(items));
    expect(sut.props.model.displayedItems.length).toEqual(items.length);
  });

  it('testDisplayItemsShouldCallSetState', () => {
    sut.displayItems(new JokesModels.ItemsPresentation.ViewModel([]));
    expect(sut.setState).toBeCalled();
  });

  it('testDisplayNoMoreItemsShouldUpdateNoMoreItemsForProps', () => {
    sut.props.model.noMoreItemsText = undefined;
    sut.props.model.noMoreItems = false;
    let text = new AttributedText('text');
    sut.displayNoMoreItems(new JokesModels.NoMoreItemsPresentation.ViewModel(text));
    expect(sut.props.model.noMoreItems).toBeTruthy();
    expect(sut.props.model.noMoreItemsText).toEqual(text);
  });

  it('testDisplayNoMoreItemsShouldCallSetState', () => {
    sut.displayNoMoreItems(new JokesModels.NoMoreItemsPresentation.ViewModel());
    expect(sut.setState).toBeCalled();
  });

  it('testDisplayRemoveNoMoreItemsShouldUpdateNoMoreItemsForProps', () => {
    sut.props.model.noMoreItemsText = new AttributedText('text');
    sut.props.model.noMoreItems = true;
    sut.displayRemoveNoMoreItems();
    expect(sut.props.model.noMoreItems).toBeFalsy();
    expect(sut.props.model.noMoreItemsText).toBeUndefined();
  });

  it('testDisplayRemoveNoMoreItemsShouldCallSetState', () => {
    sut.displayRemoveNoMoreItems();
    expect(sut.setState).toBeCalled();
  });

  it('testDisplayErrorShouldUpdateErrorForProps', () => {
    sut.props.model.errorText = undefined;
    sut.props.model.hasError = false;
    let text = new AttributedText('text');
    sut.displayError(new JokesModels.ErrorPresentation.ViewModel(text));
    expect(sut.props.model.hasError).toBeTruthy();
    expect(sut.props.model.errorText).toEqual(text);
  });

  it('testDisplayErrorShouldCallSetState', () => {
    sut.displayError(new JokesModels.ErrorPresentation.ViewModel());
    expect(sut.setState).toBeCalled();
  });

  it('testDisplayRemoveErrorShouldUpdateErrorForProps', () => {
    sut.props.model.errorText = new AttributedText('text');
    sut.props.model.hasError = true;
    sut.displayRemoveError();
    expect(sut.props.model.hasError).toBeFalsy();
    expect(sut.props.model.errorText).toBeUndefined();
  });

  it('testDisplayRemoveErrorShouldCallSetState', () => {
    sut.displayRemoveError();
    expect(sut.setState).toBeCalled();
  });

  it('testDisplayReadStateShouldUpdateIsReadForJokeQnaModel', () => {
    let isRead = true;
    let uuid = 'jokeId';

    let model = new JokeQuestionAnswerCell.Model(new UserAvatarView.Model(new LoadingImageView.Model(new CompoundImage(), false)));
    model.isRead = false;
    model.id = uuid;

    let item = new JokesModels.DisplayedItem(JokesModels.ItemType.jokeQna, model);
    sut.props.model.displayedItems = [item];

    sut.displayReadState(new JokesModels.ItemReadState.ViewModel(isRead, uuid));
    expect(model.isRead).toEqual(isRead);
  });
});
