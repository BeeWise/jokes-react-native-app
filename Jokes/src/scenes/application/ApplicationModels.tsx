export namespace ApplicationModels {
  export enum SceneType {
    splash,
    jokes,
  }

  export namespace SetupScene {
    export class Response {
      type: SceneType;

      constructor(type: SceneType) {
        this.type = type;
      }
    }

    export class ViewModel {
      type: SceneType;

      constructor(type: SceneType) {
        this.type = type;
      }
    }
  }
}
