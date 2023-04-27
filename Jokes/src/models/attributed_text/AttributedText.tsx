import {TextStyle} from 'react-native';

export class AttributedText {
  text?: string;
  style?: TextStyle;
  numberOfLines?: number;

  isTappable: boolean = false;
  tappableIdentifier?: any;

  constructor(text?: string, style?: TextStyle, numberOfLines?: number) {
    this.text = text;
    this.style = style;
    this.numberOfLines = numberOfLines;
  }
}
