import {Image, StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import React, {Component} from 'react';
import {ApplicationStyle} from '../../../style/ApplicationStyle';
import {ApplicationConstraints} from '../../../style/ApplicationConstraints';
import {UserAvatarView} from '../user_avatar_view/UserAvatarView';
import {v4 as uuidv4} from 'uuid';

export class LogoNavigationView extends Component<LogoNavigationView.Props, LogoNavigationView.State> implements UserAvatarView.Delegate {
  reload() {
    this.setState({});
  }

  render() {
    return this.setupContainerView();
  }

  setupContainerView() {
    return (
      <View {...this.props}>
        <View style={[constraints.container, styles.container]}>
          {this.props.model.includeBack && this.setupBackButton()}
          {this.setupLogoImageView()}
          {this.props.model.includeUserAvatar && this.setupUserAvatarContainerView()}
        </View>
        {this.setupSeparatorView()}
      </View>
    );
  }

  setupBackButton() {
    return (
      <TouchableOpacity style={constraints.backButton} onPress={_event => this.props.delegate?.logoNavigationViewOnPressBackButton(this)}>
        <Image resizeMode="contain" source={ApplicationStyle.images.backArrowSmallImage} />
      </TouchableOpacity>
    );
  }

  setupLogoImageView() {
    return (
      <TouchableOpacity onPress={_event => this.props.delegate?.logoNavigationViewOnPressLogoImage(this)}>
        <Image resizeMode="contain" style={constraints.logoImageView} source={ApplicationStyle.images.neonLogoMediumImage} />
      </TouchableOpacity>
    );
  }

  setupUserAvatarContainerView() {
    return <View style={constraints.userAvatarViewContainer}>{this.setupUserAvatarView()}</View>;
  }

  setupUserAvatarView() {
    return <UserAvatarView style={constraints.userAvatarView} delegate={this} model={this.props.model.userAvatar} />;
  }

  setupSeparatorView() {
    if (!this.props.model.includeSeparator) {
      return null;
    }
    return <View key={uuidv4()} style={[constraints.separatorView, styles.separatorView]} />;
  }

  //#region UserAvatarView.Delegate
  userAvatarViewOnPress(_view: UserAvatarView) {
    this.props.delegate && this.props.delegate?.logoNavigationViewOnPressUserAvatar(this);
  }
  //#endregion
}

const styles = StyleSheet.create({
  container: {},
  separatorView: {
    backgroundColor: ApplicationStyle.colors.white,
  },
});

const constraints = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: ApplicationConstraints.navigationBarHeight(),
  },
  backButton: {
    position: 'absolute',
    left: 0,
    height: ApplicationConstraints.constant.x40,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: ApplicationConstraints.constant.x16,
  },
  logoImageView: {
    height: '75%',
    marginStart: ApplicationConstraints.constant.x16,
  },
  userAvatarViewContainer: {
    position: 'absolute',
    right: 0,
    height: ApplicationConstraints.constant.x40,
    aspectRatio: 1,
    alignItems: 'center',
    marginEnd: ApplicationConstraints.constant.x16,
  },
  userAvatarView: {},
  separatorView: {
    height: ApplicationConstraints.constant.x1,
  },
});

export namespace LogoNavigationView {
  export class Model {
    includeBack: boolean = false;
    includeUserAvatar: boolean = false;
    includeSeparator: boolean = false;
    userAvatar: UserAvatarView.Model;

    constructor(userAvatar: UserAvatarView.Model) {
      this.userAvatar = userAvatar;
    }
  }
  export interface Props extends ViewProps {
    model: Model;
    delegate?: Delegate;
  }

  export interface Delegate {
    logoNavigationViewOnPressBackButton(view: LogoNavigationView): void;
    logoNavigationViewOnPressLogoImage(view: LogoNavigationView): void;
    logoNavigationViewOnPressUserAvatar(view: LogoNavigationView): void;
  }

  export interface State {}
}
