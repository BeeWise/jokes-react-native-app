import {View, ViewProps} from 'react-native';
import React, {Component} from 'react';

export class HorizontalSpaceCell extends Component<HorizontalSpaceCell.Props, HorizontalSpaceCell.State> {
  render() {
    return <View style={[this.props.style, {width: this.props.model.width}]} />;
  }
}

export namespace HorizontalSpaceCell {
  export class Model {
    width: number = 0;

    constructor(width: number) {
      this.width = width;
    }
  }

  export interface Props extends ViewProps {
    model: Model;
  }

  export interface State {}
}
