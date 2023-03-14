import {View, ViewProps} from 'react-native';
import React, {Component} from 'react';

export class SpaceCell extends Component<SpaceCell.Props, SpaceCell.State> {
  render() {
    return <View style={[this.props.style, {height: this.props.model.height}]} />;
  }
}

export namespace SpaceCell {
  export class Model {
    height: number = 0;

    constructor(height: number) {
      this.height = height;
    }
  }

  export interface Props extends ViewProps {
    model: Model;
  }

  export interface State {}
}
