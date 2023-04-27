import {ApplicationStyle} from '../../style/ApplicationStyle';

export class SplashScreenStyle {
  static instance = new SplashScreenStyle();

  contentViewModel(): SplashScreenStyle.ContentViewModel {
    return new SplashScreenStyle.ContentViewModel();
  }
}

export namespace SplashScreenStyle {
  export class ContentViewModel {
    backgroundImage = ApplicationStyle.images.wallBackgroundImage;
  }
}
