import {ApplicationScene} from './ApplicationScene';

export interface ApplicationRoutingLogic {}

export class ApplicationRouter implements ApplicationRoutingLogic {
  scene?: ApplicationScene;
}
