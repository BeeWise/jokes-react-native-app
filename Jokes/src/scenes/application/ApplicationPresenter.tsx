import {ApplicationModels} from './ApplicationModels';
import {ApplicationDisplayLogic} from './ApplicationScene';

export interface ApplicationPresentationLogic {
  presentSetupScene(response: ApplicationModels.SetupScene.Response): void;
}

export class ApplicationPresenter implements ApplicationPresentationLogic {
  displayer?: ApplicationDisplayLogic;

  presentSetupScene(response: ApplicationModels.SetupScene.Response): void {
    this.displayer?.displaySetupScene(new ApplicationModels.SetupScene.ViewModel(response.type));
  }
}
