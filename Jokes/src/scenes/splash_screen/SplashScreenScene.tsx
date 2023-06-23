import React from 'react';
import {ImageBackground, StatusBar, StyleSheet} from 'react-native';
import {ApplicationStyle} from '../../style/ApplicationStyle';
import {SplashScreenStyle} from './SplashScreenStyle';

export class SplashScreenScene extends React.Component<SplashScreenScene.Props, SplashScreenScene.State> {
  constructor(props: SplashScreenScene.Props) {
    super(props);
  }

  //#region Subviews
  render() {
    return this.setupImageView();
  }

  setupImageView() {
    return (
      <ImageBackground style={[this.constraints.imageView]} source={SplashScreenStyle.instance.contentViewModel().backgroundImage}>
        <StatusBar animated={true} backgroundColor={ApplicationStyle.colors.transparent} barStyle={'light-content'} showHideTransition={'fade'} hidden={false} translucent />
      </ImageBackground>
    );
  }
  //#endregion

  //#region Constraints
  constraints = StyleSheet.create({
    imageView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  //#endregion
}

export namespace SplashScreenScene {
  export class Model {}

  export interface Props {
    model: Model;
  }

  export interface State {}
}
