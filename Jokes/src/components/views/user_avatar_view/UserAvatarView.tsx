import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import React, {Component} from 'react';
import {LoadingImageView} from '../loading_image_view/LoadingImageView';
import {ApplicationConstraints} from '../../../style/ApplicationConstraints';

export class UserAvatarView extends Component<UserAvatarView.Props, UserAvatarView.State> {
  constructor(props: UserAvatarView.Props) {
    super(props);
  }

  render() {
    return this.setupContainerView();
  }

  reload() {
    this.setState({});
  }

  setupContainerView() {
    return (
      <TouchableOpacity disabled={this.props.model.isDisabled} {...this.props} onPress={_event => this.props.delegate?.userAvatarViewOnPress(this)}>
        <View style={[this.constraints().containerView, this.styles().containerView]}>{this.setupImageContainerView()}</View>
      </TouchableOpacity>
    );
  }

  setupImageContainerView() {
    return <View style={[this.constraints().imageContainerView, this.styles().imageContainerView]}>{this.setupImageView()}</View>;
  }

  setupImageView() {
    return <LoadingImageView style={this.constraints().imageView} model={this.props.model.loadingImage} />;
  }

  styles(): any {
    return StyleSheet.create({
      containerView: {
        borderTopRightRadius: this.props.model.loadingImage.borderTopRightRadius,
        borderTopLeftRadius: this.props.model.loadingImage.borderTopLeftRadius,
        borderBottomRightRadius: this.props.model.loadingImage.borderBottomRightRadius,
        borderBottomLeftRadius: this.props.model.loadingImage.borderBottomLeftRadius,
      },
      imageContainerView: {
        backgroundColor: this.props.model.backgroundColor,
        borderColor: this.props.model.borderColor,
        borderWidth: this.props.model.borderWidth,
        borderTopRightRadius: this.props.model.loadingImage.borderTopRightRadius,
        borderTopLeftRadius: this.props.model.loadingImage.borderTopLeftRadius,
        borderBottomRightRadius: this.props.model.loadingImage.borderBottomRightRadius,
        borderBottomLeftRadius: this.props.model.loadingImage.borderBottomLeftRadius,
      },
    });
  }

  constraints(): any {
    return StyleSheet.create({
      containerView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      imageContainerView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        aspectRatio: 1,
      },
      imageView: {
        flex: 1,
        aspectRatio: 1,
        margin: this.props.model.margin,
      },
    });
  }
}

export namespace UserAvatarView {
  export class Model {
    isDisabled: boolean = false;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    loadingImage: LoadingImageView.Model;
    margin: number = ApplicationConstraints.constant.x0;

    constructor(loadingImage: LoadingImageView.Model) {
      this.loadingImage = loadingImage;
    }
  }
  export interface Props extends ViewProps {
    model: Model;
    delegate?: Delegate;
  }

  export interface State {}

  export interface Delegate {
    userAvatarViewOnPress(view: UserAvatarView): void;
  }
}
