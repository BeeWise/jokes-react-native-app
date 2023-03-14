import {StyleSheet, Text, View, ActivityIndicator, ViewProps, TouchableOpacity, ImageBackground} from 'react-native';
import React, {Component} from 'react';
import {ApplicationStyle} from '../../style/ApplicationStyle';
import {AttributedText} from '../../models/attributed_text/AttributedText';
import {ApplicationConstraints} from '../../style/ApplicationConstraints';

export class LoadingButton extends Component<LoadingButton.Props> {
  reload() {
    this.setState({});
  }

  render(): React.ReactNode {
    return <View style={this.props.style}>{this.setupTouchableOpacity()}</View>;
  }

  setupTouchableOpacity() {
    let containerStyle = {
      ...this.constraints.container,
      ...this.styles.container,
      backgroundColor: this.props.model.backgroundColor,
      borderRadius: this.props.model.borderRadius,
      borderColor: this.props.model.borderColor,
      borderWidth: this.props.model.borderWidth,
      shadowColor: this.props.model.shadowColor,
      opacity: this.props.model.opacity,
    };

    return (
      <TouchableOpacity disabled={this.props.model.isDisabled} style={containerStyle} onPress={_event => this.onPress()}>
        {this.setupContainerView()}
      </TouchableOpacity>
    );
  }

  setupContainerView() {
    var backgroundImage = this.props.model.backgroundImage;
    if (backgroundImage === undefined || backgroundImage === null) {
      return this.setupContentView();
    }
    return this.setupImageBackground();
  }

  setupImageBackground() {
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
        source={this.props.model.backgroundImage}>
        {this.setupContentView()}
      </ImageBackground>
    );
  }

  setupContentView() {
    return (
      <View>
        {this.props.model.isLoading && this.setupActivityIndicator()}
        {!this.props.model.isLoading && this.setupTitle()}
      </View>
    );
  }

  setupTitle() {
    let style = [this.constraints.title, this.props.model.title?.style];
    return <Text style={style}>{this.props.model.title?.text}</Text>;
  }

  setupActivityIndicator() {
    let style = [this.constraints.activityIndicator];
    return <ActivityIndicator style={style} color={this.props.model.activityIndicatorColor} animating={this.props.model.isLoading} />;
  }

  onPress() {
    if (this.props.onPress === undefined || this.props.onPress === null) return;
    if (this.props.model.isDisabled === true) return;
    if (this.props.model.isLoading === true) return;
    this.props.onPress();
  }

  styles = StyleSheet.create({
    container: {
      shadowOpacity: 1,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
      elevation: 2,
    },
  });
  constraints = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {},
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  });
}

export namespace LoadingButton {
  export class Model {
    title?: AttributedText;
    borderRadius = ApplicationConstraints.constant.x24;
    borderWidth = 0.0;
    isLoading = false;
    isDisabled = false;
    borderColor = ApplicationStyle.colors.primary;
    activityIndicatorColor = ApplicationStyle.colors.white;
    backgroundColor = ApplicationStyle.colors.primary;
    backgroundImage?: any;
    shadowColor = ApplicationStyle.colors.primary;
    opacity = 1.0;
  }

  export interface Props extends ViewProps {
    model: LoadingButton.Model;
    onPress?: () => void;
  }
}
