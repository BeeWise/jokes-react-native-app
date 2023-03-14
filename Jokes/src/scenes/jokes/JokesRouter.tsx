import {JokesScene} from './JokesScene';

export interface JokesRoutingLogic {
  showActionAlertScene(title?: string, message?: string): void;
  dismissActionAlertScene(): void;
}

export class JokesRouter implements JokesRoutingLogic {
  scene?: JokesScene;

  showActionAlertScene(title?: string, message?: string): void {
    if (this.scene !== undefined) {
      this.scene.modalContainerView?.showActionAlertScene(title, message);
    }
  }

  dismissActionAlertScene(): void {
    if (this.scene !== undefined) {
      this.scene.modalContainerView?.dismissActionAlertScene();
    }
  }
}
