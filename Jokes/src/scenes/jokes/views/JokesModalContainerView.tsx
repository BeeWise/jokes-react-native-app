import React, {Component} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

export class JokesModalContainerView extends Component<JokesModalContainerView.Props, JokesModalContainerView.State> {
  constructor(props: JokesModalContainerView.Props) {
    super(props);
  }

  reload() {
    this.setState({});
  }

  render() {
    return this.setupContainerView();
  }

  setupContainerView() {
    return <View style={constraints.containerView} />;
  }
}

const constraints = StyleSheet.create({
  containerView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
  },
});

export namespace JokesModalContainerView {
  export class Model {}

  export interface Props extends ViewProps {
    model: Model;
    delegate?: Delegate;
  }

  export interface State {}

  export interface Delegate {}
}
