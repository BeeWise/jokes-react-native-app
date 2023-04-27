import React, {Component} from 'react';
import {Image, StyleSheet, View, ViewProps, ColorValue, ActivityIndicator} from 'react-native';
import {CompoundImage} from '../../../models/image/CompoundImage';

export class LoadingImageView extends Component<LoadingImageView.Props, LoadingImageView.State> {
  constructor(props: LoadingImageView.Props) {
    super(props);
  }

  render() {
    return this.setupContainerView();
  }

  setupContainerView() {
    return (
      <View {...this.props}>
        {this.setupImage()}
        {this.setupActivityIndicatorContainerView()}
      </View>
    );
  }

  setupImage() {
    return (
      <Image
        onLoadStart={() => this.setLoadingState()}
        onLoadEnd={() => this.setNotLoadingState()}
        resizeMode={this.props.model.image.resizeMode}
        style={[
          constraints.image,
          {
            borderTopRightRadius: this.props.model.borderTopRightRadius,
            borderTopLeftRadius: this.props.model.borderTopLeftRadius,
            borderBottomRightRadius: this.props.model.borderBottomRightRadius,
            borderBottomLeftRadius: this.props.model.borderBottomLeftRadius,
            backgroundColor: this.props.model.imageBackgroundColor,
          },
        ]}
        source={this.props.model.image.image()}
      />
    );
  }

  setupActivityIndicatorContainerView() {
    return this.props.model.isLoading ? <View style={constraints.activityIndicatorContainerView}>{this.setupActivityIndicator()}</View> : null;
  }

  setupActivityIndicator() {
    return this.props.model.isLoading ? <ActivityIndicator style={constraints.activityIndicator} animating={this.props.model.isLoading} color={this.props.model.activityIndicatorColor} /> : null;
  }

  setLoadingState() {
    this.props.model.isLoading = true;
    this.setState({});
  }

  setNotLoadingState() {
    this.props.model.isLoading = false;
    this.setState({});
  }
}

const constraints = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  activityIndicatorContainerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {},
});

export namespace LoadingImageView {
  export class Model {
    image: CompoundImage;
    isLoading: boolean;
    activityIndicatorColor?: ColorValue;
    imageBackgroundColor?: ColorValue;

    borderTopRightRadius?: number;
    borderTopLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomLeftRadius?: number;

    constructor(image: CompoundImage, isLoading: boolean) {
      this.image = image;
      this.isLoading = isLoading;
    }
  }

  export interface Props extends ViewProps {
    model: Model;
  }

  export interface State {}
}
