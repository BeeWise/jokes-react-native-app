import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextStyle, View} from 'react-native';
import {ApplicationConstraints} from '../../style/ApplicationConstraints';
import {ApplicationStyle} from '../../style/ApplicationStyle';
import {withAlphaHex} from 'with-alpha-hex';
import {LoadingButton} from '../../components/buttons/LoadingButton';
import {AttributedText} from '../../models/attributed_text/AttributedText';
import {ApplicationLocalization} from '../application/ApplicationLocalization';
import {v4 as uuidv4} from 'uuid';

export class ActionAlertScene extends React.Component<ActionAlertScene.Props, ActionAlertScene.State> {
  constructor(props: ActionAlertScene.Props) {
    super(props);
  }

  //#region Subviews
  reload() {
    this.setState({});
  }

  render() {
    return this.setupSafeAreaView();
  }

  setupSafeAreaView() {
    return <SafeAreaView style={[this.constraints.safeAreaView, this.styles.safeAreaView]}>{this.setupContainerView()}</SafeAreaView>;
  }

  setupContainerView() {
    return (
      <View key={uuidv4()} style={[this.constraints.containerView, this.styles.containerView]}>
        {this.setupTopSpaceView()}
        {this.setupTitle()}
        {this.setupTitleSpaceView()}
        {this.setupMessage()}
        {this.setupMessageSpaceView()}
        {this.setupCancelButton()}
        {this.setupVerticalSpaceView(ApplicationConstraints.constant.x16)}
      </View>
    );
  }

  setupTopSpaceView() {
    if (this.props.model.title !== undefined || this.props.model.message !== undefined) {
      return this.setupVerticalSpaceView(ApplicationConstraints.constant.x16);
    }
    return null;
  }

  setupTitle() {
    if (this.props.model.title === undefined) {
      return null;
    }
    return (
      <Text key={uuidv4()} style={[this.titleStyle, this.constraints.title]}>
        {this.props.model.title}
      </Text>
    );
  }

  setupTitleSpaceView() {
    if (this.props.model.title !== undefined) {
      return this.setupVerticalSpaceView(ApplicationConstraints.constant.x16);
    }
    return null;
  }

  setupMessage() {
    if (this.props.model.message === undefined) {
      return null;
    }
    return (
      <Text key={uuidv4()} style={[this.messageStyle, this.constraints.message]}>
        {this.props.model.message}
      </Text>
    );
  }

  setupMessageSpaceView() {
    if (this.props.model.message !== undefined) {
      return this.setupVerticalSpaceView(ApplicationConstraints.constant.x16);
    }
    return null;
  }

  setupVerticalSpaceView(space: number) {
    return <View key={uuidv4()} style={{height: space}} />;
  }

  setupCancelButton() {
    let title = this.props.model.cancelTitle ?? ApplicationLocalization.instance.cancelTitle();
    let model = new LoadingButton.Model();
    model.backgroundColor = ApplicationStyle.colors.white;
    model.borderColor = ApplicationStyle.colors.gray;
    model.borderWidth = StyleSheet.hairlineWidth;
    model.title = new AttributedText(title, this.actionStyle);
    model.borderRadius = ApplicationConstraints.constant.x24;
    model.isDisabled = false;
    return <LoadingButton key={uuidv4()} style={this.constraints.cancelButton} model={model} onPress={() => this.props.delegate?.actionAlertSceneOnPressCancelAction(this, this.props.model.cancelType)} />;
  }
  //#endregion

  //#region Styles
  styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: withAlphaHex(ApplicationStyle.colors.primary, 0.8),
    },
    containerView: {
      backgroundColor: ApplicationStyle.colors.white,
      borderRadius: ApplicationConstraints.constant.x16,
    },
  });

  titleStyle: TextStyle = {
    color: ApplicationStyle.colors.primary,
    fontFamily: ApplicationStyle.fonts.bold,
    fontSize: 17,
    textAlign: 'center',
  };

  messageStyle: TextStyle = {
    color: ApplicationStyle.colors.primary,
    fontFamily: ApplicationStyle.fonts.regular,
    fontSize: 15,
  };

  actionStyle: TextStyle = {
    color: ApplicationStyle.colors.primary,
    fontFamily: ApplicationStyle.fonts.regular,
    fontSize: 16,
    textAlign: 'center',
  };
  //#endregion

  //#region Constraints
  constraints = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    containerView: {
      flexDirection: 'column',
      marginStart: ApplicationConstraints.constant.x16,
      marginEnd: ApplicationConstraints.constant.x16,
      overflow: 'hidden',
    },
    title: {
      marginStart: ApplicationConstraints.constant.x16,
      marginEnd: ApplicationConstraints.constant.x16,
    },
    message: {
      marginStart: ApplicationConstraints.constant.x16,
      marginEnd: ApplicationConstraints.constant.x16,
    },
    cancelButton: {
      height: ApplicationConstraints.constant.x48,
      marginStart: ApplicationConstraints.constant.x16,
      marginEnd: ApplicationConstraints.constant.x16,
    },
  });
  //#endregion
}

export namespace ActionAlertScene {
  export class Model {
    isVisible: boolean = false;
    title?: string;
    message?: string;
    cancelTitle?: string;
    cancelType?: string;
  }

  export interface Props {
    model: Model;
    delegate?: Delegate;
  }

  export interface Delegate {
    actionAlertSceneOnPressCancelAction(scene: ActionAlertScene, cancelType?: string): void;
  }

  export interface State {}
}
