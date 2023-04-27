import {TaskEnvironment} from '../../tasks/environment/TaskEnvironment';
import {ApplicationModels} from './ApplicationModels';
import {ApplicationPresentationLogic} from './ApplicationPresenter';
import {ApplicationWorker, ApplicationWorkerDelegate} from './ApplicationWorker';
import {Configuration} from '../../../config';
import {TaskConfigurator} from '../../tasks/configurator/TaskConfigurator';
import {User} from '../../models/user/User';
import {OperationError} from '../../operations/base/errors/OperationError';

export interface ApplicationBusinessLogic {
  shouldSetupScene(): void;
  shouldSetupEnvironment(): void;
  shouldFetchUserDetails(): void;
}

export class ApplicationInteractor implements ApplicationBusinessLogic, ApplicationWorkerDelegate {
  presenter?: ApplicationPresentationLogic;
  worker?: ApplicationWorker;

  taskEnvironment?: TaskEnvironment;

  isFetchingUserDetails: boolean = false;

  constructor() {
    this.worker = new ApplicationWorker(this);
  }

  shouldSetupScene(): void {
    this.presenter?.presentSetupScene(new ApplicationModels.SetupScene.Response(ApplicationModels.SceneType.splash));
  }

  shouldSetupEnvironment() {
    let value = Configuration.instance.environment();
    if (value !== undefined) {
      TaskConfigurator.instance.environment = TaskEnvironment[value as keyof typeof TaskEnvironment];
    } else {
      TaskConfigurator.instance.environment = TaskEnvironment.memory;
    }
  }

  //#region User details
  shouldFetchUserDetails() {
    if (!this.isFetchingUserDetails) {
      this.isFetchingUserDetails = true;
      this.worker?.fetchUserDetails();
    }
  }

  successDidFetchUserDetails(user?: User) {
    User.currentUser = user;

    this.isFetchingUserDetails = false;
    this.presenter?.presentSetupScene(new ApplicationModels.SetupScene.Response(ApplicationModels.SceneType.jokes));
  }

  failureDidFetchUserDetails(_error: OperationError) {
    this.isFetchingUserDetails = false;
  }
  //#endregion
}
