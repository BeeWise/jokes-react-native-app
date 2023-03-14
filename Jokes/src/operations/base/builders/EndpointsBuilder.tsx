import {Configuration} from '../../../../config';

export class EndpointsBuilder {
  static instance = new EndpointsBuilder();

  //#region Jokes
  jokesEndpoint() {
    return Configuration.instance.jokesEndpoint();
  }
  //#endregion
}
