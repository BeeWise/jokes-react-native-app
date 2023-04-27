import React, {Component} from 'react';
import {ApplicationRouter, ApplicationRoutingLogic} from './ApplicationRouter';
import {ApplicationPresenter} from './ApplicationPresenter';
import {ApplicationBusinessLogic, ApplicationInteractor} from './ApplicationInteractor';
import {ApplicationModels} from './ApplicationModels';
import {SplashScreenScene} from '../splash_screen/SplashScreenScene';
import {v4 as uuidv4} from 'uuid';
import {JokesScene} from '../jokes/JokesScene';

export interface ApplicationDisplayLogic {
  displaySetupScene(viewModel: ApplicationModels.SetupScene.ViewModel): void;
}

export class ApplicationScene extends Component<ApplicationScene.Props, ApplicationScene.State> implements ApplicationDisplayLogic {
  interactor?: ApplicationBusinessLogic;
  router?: ApplicationRoutingLogic;

  sceneType: ApplicationModels.SceneType = ApplicationModels.SceneType.splash;

  constructor(props: ApplicationScene.Props) {
    super(props);
    this.setup();
  }

  componentDidMount() {
    this.interactor?.shouldSetupEnvironment();
    this.interactor?.shouldSetupScene();
    this.interactor?.shouldFetchUserDetails();
  }

  setup() {
    let interactor = new ApplicationInteractor();
    let presenter = new ApplicationPresenter();
    let router = new ApplicationRouter();
    this.interactor = interactor;
    this.router = router;
    interactor.presenter = presenter;
    presenter.displayer = this;
    router.scene = this;
  }

  reload() {
    this.setState({});
  }

  render(): React.ReactNode {
    switch (this.sceneType) {
      case ApplicationModels.SceneType.splash:
        return this.setupSplashScene();
      case ApplicationModels.SceneType.jokes:
        return this.setupJokesScene();
    }
  }

  setupSplashScene() {
    return <SplashScreenScene key={uuidv4()} model={new SplashScreenScene.Model()} />;
  }

  setupJokesScene() {
    return <JokesScene key={uuidv4()} model={new JokesScene.Model()} />;
  }

  //#region Display logic
  displaySetupScene(viewModel: ApplicationModels.SetupScene.ViewModel): void {
    this.sceneType = viewModel.type;
    this.reload();
  }
  //#endregion
}

export namespace ApplicationScene {
  export interface Props {}

  export interface State {}
}
