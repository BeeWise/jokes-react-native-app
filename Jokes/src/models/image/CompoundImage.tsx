import {ImageResizeMode, ImageSourcePropType} from 'react-native';

export class CompoundImage {
  uri: ImageSourcePropType;
  source?: ImageSourcePropType;
  resizeMode?: ImageResizeMode = 'cover';

  constructor(uri?: string, source?: number, resizeMode?: ImageResizeMode) {
    this.uri = {uri: uri};
    this.source = source;
    this.resizeMode = resizeMode ?? 'cover';
  }

  image(): ImageSourcePropType {
    if (this.source !== undefined) {
      return this.source;
    }
    return this.uri;
  }
}
