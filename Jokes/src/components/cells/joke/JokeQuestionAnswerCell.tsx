import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, ViewProps, TouchableOpacity} from 'react-native';
import {AttributedText} from '../../../models/attributed_text/AttributedText';
import {ApplicationConstraints} from '../../../style/ApplicationConstraints';
import {v4 as uuidv4} from 'uuid';
import {UserAvatarView} from '../../../components/views/user_avatar_view/UserAvatarView';
import {ImageTitleButton} from '../../../components/buttons/ImageTitleButton';
import {ApplicationStyle} from '../../../style/ApplicationStyle';
import {CompoundImage} from '../../../models/image/CompoundImage';
import {ApplicationLocalization} from '../../../scenes/application/ApplicationLocalization';

export class JokeQuestionAnswerCell extends PureComponent<JokeQuestionAnswerCell.Props, JokeQuestionAnswerCell.State> implements JokeQuestionAnswerCell.CellInterface, UserAvatarView.Delegate {
  constructor(props: JokeQuestionAnswerCell.Props) {
    super(props);
    this.props.model.cellInterface = this;
  }

  reload(): void {
    this.setState({});
  }

  render() {
    return this.setupContentView();
  }

  setupContentView() {
    return (
      <View key={uuidv4()} style={[constraints.contentView, styles.contentView]}>
        {this.setupContainerView()}
      </View>
    );
  }

  setupContainerView() {
    return (
      <View key={uuidv4()} style={[constraints.containerView, styles.containerView]}>
        {this.setupVerticalSpaceView(ApplicationConstraints.constant.x16)}
        {this.setupTopContainerView()}
        {this.setupVerticalSpaceView(ApplicationConstraints.constant.x16)}
        {this.setupText()}
        {this.setupVerticalSpaceView(ApplicationConstraints.constant.x16)}
        {this.setupAnswer()}
        {this.setupVerticalSpaceView(ApplicationConstraints.constant.x16)}
        {this.setupBottomContainerView()}
        {this.setupVerticalSpaceView(ApplicationConstraints.constant.x16)}
      </View>
    );
  }

  setupTopContainerView() {
    return (
      <View key={uuidv4()} style={constraints.topContainerView}>
        {this.setupUserAvatarView()}
        {this.setupHorizontalSpaceView(ApplicationConstraints.constant.x8)}
        {this.setupUserContainerView()}
        {this.setupHorizontalSpaceView(ApplicationConstraints.constant.x8)}
      </View>
    );
  }

  setupUserAvatarView() {
    return <UserAvatarView model={this.props.model.avatar} style={constraints.avatarView} delegate={this} />;
  }

  userAvatarViewOnPress(_view: UserAvatarView): void {
    this.props.delegate?.jokeQuestionAnswerCellOnPressUserAvatar(this, this.props.model.id);
  }

  setupUserContainerView() {
    return (
      <TouchableOpacity style={constraints.userContainerView} onPress={() => this.props.delegate?.jokeQuestionAnswerCellOnPressUserName(this, this.props.model.id)}>
        {this.setupName()}
        {this.setupUsername()}
      </TouchableOpacity>
    );
  }

  setupName() {
    return (
      <Text key={uuidv4()} style={[this.props.model.name?.style, constraints.name]}>
        {this.props.model.name?.text}
      </Text>
    );
  }

  setupUsername() {
    return (
      <Text key={uuidv4()} style={[this.props.model.username?.style, constraints.username]}>
        {this.props.model.username?.text}
      </Text>
    );
  }

  setupText() {
    return (
      <Text key={uuidv4()} allowFontScaling={true} style={[this.props.model.text?.style, constraints.text]}>
        {this.props.model.text?.text}
      </Text>
    );
  }

  setupAnswer() {
    if (this.props.model.isRead) {
      return this.setupAnswerText();
    } else {
      return this.setupAnswerButton();
    }
  }

  setupAnswerButton() {
    let model = new ImageTitleButton.Model();
    model.image = new CompoundImage(undefined, ApplicationStyle.images.answerSmallImage, 'contain');
    model.isDisabled = false;
    model.backgroundImage = new CompoundImage(undefined, ApplicationStyle.images.buttonBackgroundImage, 'cover');
    model.borderRadius = ApplicationConstraints.constant.x16;
    model.borderColor = ApplicationStyle.colors.white;
    model.backgroundColor = ApplicationStyle.colors.primary;
    model.title = new AttributedText(ApplicationLocalization.instance.readAnswerTitle(), styles.answerButtonText);
    return <ImageTitleButton style={constraints.answerButton} model={model} onPress={() => this.props.delegate?.jokeQuestionAnswerCellOnPressReadAnswer(this, this.props.model.id)} />;
  }

  setupAnswerText() {
    return (
      <Text key={uuidv4()} allowFontScaling={true} style={[this.props.model.answer?.style, constraints.answerText]}>
        {this.props.model.answer?.text}
      </Text>
    );
  }

  setupBottomContainerView() {
    return (
      <View style={constraints.bottomContainerView}>
        {this.setupLikeCountView()}
        {this.setupHorizontalSpaceView(ApplicationConstraints.constant.x8)}
        {this.setupDislikeCountView()}
        {this.setupHorizontalSpaceView(ApplicationConstraints.constant.x8, 1)}
        {this.setupTime()}
      </View>
    );
  }

  setupLikeCountView() {
    if (this.props.model.likeCount !== undefined && this.props.model.likeCount !== null) {
      return <ImageTitleButton style={constraints.likeCountView} model={this.props.model.likeCount} onPress={() => this.props.delegate?.jokeQuestionAnswerCellOnPressLikeCount(this, this.props.model.id)} />;
    }
    return null;
  }

  setupDislikeCountView() {
    if (this.props.model.dislikeCount !== undefined && this.props.model.dislikeCount !== null) {
      return <ImageTitleButton style={constraints.dislikeCountView} model={this.props.model.dislikeCount} onPress={() => this.props.delegate?.jokeQuestionAnswerCellOnPressDislikeCount(this, this.props.model.id)} />;
    }
    return null;
  }

  setupTime() {
    return (
      <Text key={uuidv4()} style={[this.props.model.time?.style, constraints.time]}>
        {this.props.model.time?.text}
      </Text>
    );
  }

  setupVerticalSpaceView(space: number) {
    return <View key={uuidv4()} style={{height: space}} />;
  }

  setupHorizontalSpaceView(space: number, flex?: number) {
    return <View key={uuidv4()} style={{width: space, flex: flex}} />;
  }
}

const styles = StyleSheet.create({
  contentView: {
    backgroundColor: ApplicationStyle.colors.transparent,
  },
  containerView: {
    backgroundColor: ApplicationStyle.colors.white,
    borderColor: ApplicationStyle.colors.lightGray,
    borderRadius: ApplicationConstraints.constant.x16,
    borderWidth: ApplicationConstraints.constant.x1,
  },
  answerButtonText: {
    color: ApplicationStyle.colors.white,
    fontFamily: ApplicationStyle.fonts.regular,
    fontSize: 17,
    includeFontPadding: false,
  },
});

const constraints = StyleSheet.create({
  contentView: {
    flex: 1,
    width: ApplicationConstraints.multiplier.x100,
  },
  containerView: {
    flex: 1,
    flexDirection: 'column',
    marginStart: ApplicationConstraints.constant.x16,
    marginEnd: ApplicationConstraints.constant.x16,
  },
  topContainerView: {
    flexDirection: 'row',
    marginStart: ApplicationConstraints.constant.x16,
    marginEnd: ApplicationConstraints.constant.x16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainerView: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {},
  username: {},
  avatarView: {
    width: ApplicationConstraints.constant.x40,
    height: ApplicationConstraints.constant.x40,
  },
  text: {
    marginStart: ApplicationConstraints.constant.x16,
    marginEnd: ApplicationConstraints.constant.x16,
  },
  answerButton: {
    marginStart: ApplicationConstraints.constant.x16,
    marginEnd: ApplicationConstraints.constant.x16,
    height: ApplicationConstraints.constant.x32,
  },
  answerText: {
    marginStart: ApplicationConstraints.constant.x16,
    marginEnd: ApplicationConstraints.constant.x16,
  },
  bottomContainerView: {
    flexDirection: 'row',
    marginStart: ApplicationConstraints.constant.x16,
    marginEnd: ApplicationConstraints.constant.x16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeCountView: {
    height: ApplicationConstraints.constant.x24,
  },
  dislikeCountView: {
    height: ApplicationConstraints.constant.x24,
  },
  time: {},
});

export namespace JokeQuestionAnswerCell {
  export class Model {
    id?: string;

    avatar: UserAvatarView.Model;

    name?: AttributedText;
    username?: AttributedText;
    text?: AttributedText;
    answer?: AttributedText;
    isRead: boolean = false;

    likeCount?: ImageTitleButton.Model;
    dislikeCount?: ImageTitleButton.Model;

    time?: AttributedText;

    cellInterface?: CellInterface;

    constructor(avatar: UserAvatarView.Model) {
      this.avatar = avatar;
    }
  }

  export interface Props extends ViewProps {
    model: Model;
    delegate?: Delegate;
  }

  export interface State {}

  export interface CellInterface {
    reload(): void;
  }

  export interface Delegate {
    jokeQuestionAnswerCellOnPressLikeCount(cell: JokeQuestionAnswerCell, id?: string): void;
    jokeQuestionAnswerCellOnPressDislikeCount(cell: JokeQuestionAnswerCell, id?: string): void;
    jokeQuestionAnswerCellOnPressUserAvatar(cell: JokeQuestionAnswerCell, id?: string): void;
    jokeQuestionAnswerCellOnPressUserName(cell: JokeQuestionAnswerCell, id?: string): void;
    jokeQuestionAnswerCellOnPressReadAnswer(cell: JokeQuestionAnswerCell, id?: string): void;
  }
}
