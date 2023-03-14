import {StyleSheet, Text, View, ActivityIndicator, ViewProps, Image, ImageBackground, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {ApplicationStyle} from '../../style/ApplicationStyle';
import {AttributedText} from '../../models/attributed_text/AttributedText';
import {ApplicationConstraints} from '../../style/ApplicationConstraints';
import {CompoundImage} from '../../models/image/CompoundImage';

export class ImageTitleButton extends Component<ImageTitleButton.Props> implements ImageTitleButton.ViewInterface {
  constructor(props: ImageTitleButton.Props) {
    super(props);
    this.props.model.viewInterface = this;
  }

  reload() {
    this.setState({});
  }

  render(): React.ReactNode {
    return <View style={this.props.style}>{this.setupTouchableOpacity()}</View>;
  }

  setupTouchableOpacity() {
    let containerStyle = {
      ...this.constraints.container,
      backgroundColor: this.props.model.backgroundColor,
      borderRadius: this.props.model.borderRadius,
      borderColor: this.props.model.borderColor,
      borderWidth: this.props.model.borderWidth,
      opacity: this.props.model.opacity,
    };

    return (
      <TouchableOpacity disabled={this.props.model.isDisabled} style={containerStyle} onPress={_event => this.onPress()}>
        {this.setupContainerView()}
      </TouchableOpacity>
    );
  }

  setupContainerView() {
    let backgroundImage = this.props.model.backgroundImage;
    if (backgroundImage === undefined || backgroundImage === null) {
      return this.setupContentView();
    }
    return this.setupImageBackground();
  }

  setupImageBackground() {
    let backgroundImage = this.props.model.backgroundImage;
    if (backgroundImage === undefined || backgroundImage === null) {
      return null;
    }
    let imageStyle = {
      ...this.constraints.container,
    };

    return (
      <ImageBackground
        style={imageStyle}
        borderBottomLeftRadius={this.props.model.borderRadius}
        borderBottomRightRadius={this.props.model.borderRadius}
        borderTopLeftRadius={this.props.model.borderRadius}
        borderTopRightRadius={this.props.model.borderRadius}
        source={backgroundImage.image()}
        resizeMode={backgroundImage.resizeMode}>
        {this.setupContentView()}
      </ImageBackground>
    );
  }

  setupContentView() {
    return (
      <View style={this.constraints.contentView}>
        {this.setupImageContainerView()}
        {this.setupActivityIndicator()}
        {this.setupTitle()}
      </View>
    );
  }

  setupImageContainerView() {
    if (this.props.model.image !== undefined && this.props.model.image !== null) {
      let imageContainerViewStyle = {
        ...this.constraints.imageContainerView,
        opacity: this.props.model.isLoading ? 0 : 1,
      };
      return <View style={imageContainerViewStyle}>{this.setupImage()}</View>;
    }
    return null;
  }

  setupImage() {
    if (this.props.model.image !== undefined && this.props.model.image !== null) {
      let style = {
        ...this.constraints.image,
        tintColor: this.props.model.imageTintColor,
      };
      return <Image style={style} source={this.props.model.image.image()} resizeMode="contain" />;
    }
    return null;
  }

  setupTitle() {
    let style = {
      ...this.constraints.title,
      ...this.props.model.title?.style,
      opacity: this.props.model.isLoading ? 0 : 1,
    };
    return <Text style={style}>{this.props.model.title?.text}</Text>;
  }

  setupActivityIndicator() {
    let style = {
      ...this.constraints.activityIndicator,
      opacity: this.props.model.isLoading ? 1 : 0,
    };
    return <ActivityIndicator style={style} color={this.props.model.activityIndicatorColor} animating={this.props.model.isLoading} />;
  }

  onPress() {
    if (this.props.onPress === undefined || this.props.onPress === null) {
      return;
    }
    if (this.props.model.isDisabled === true) {
      return;
    }
    if (this.props.model.isLoading === true) {
      return;
    }
    this.props.onPress();
  }

  constraints = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    contentView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainerView: {
      height: ApplicationConstraints.multiplier.x62,
      aspectRatio: 1,
      marginStart: ApplicationConstraints.constant.x10,
    },
    image: {
      flex: 1,
      aspectRatio: 1,
    },
    title: {
      marginStart: ApplicationConstraints.constant.x10,
      marginEnd: ApplicationConstraints.constant.x10,
    },
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  });
}

export namespace ImageTitleButton {
  export class Model {
    image?: CompoundImage;
    imageTintColor?: string;
    title?: AttributedText;

    borderRadius = ApplicationConstraints.constant.x4;
    borderWidth = 0.0;
    borderColor = ApplicationStyle.colors.primary;

    activityIndicatorColor = ApplicationStyle.colors.white;
    backgroundColor = ApplicationStyle.colors.primary;

    isLoading = false;
    isDisabled = false;

    opacity = 1.0;

    backgroundImage?: CompoundImage;

    viewInterface?: ViewInterface;
  }

  export interface Props extends ViewProps {
    model: ImageTitleButton.Model;
    onPress?: () => void;
  }

  export interface ViewInterface {
    reload(): void;
  }
}
