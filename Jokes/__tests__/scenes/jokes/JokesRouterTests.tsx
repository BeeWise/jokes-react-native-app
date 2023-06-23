import 'react-native';
import {JokesRouter} from '../../../src/scenes/jokes/JokesRouter';
import {JokesSceneSpy} from './test_doubles/JokesSceneSpy';
import {JokesScene} from '../../../src/scenes/jokes/JokesScene';

describe('JokesRouterTests', () => {
  var sut: JokesRouter;
  var sceneSpy: JokesSceneSpy;

  beforeAll(() => {
    sut = new JokesRouter();
    sceneSpy = new JokesSceneSpy({model: new JokesScene.Model()});
    sut.scene = sceneSpy;
  });

  it('test', () => {
    expect(true).toBeTruthy();
  });
});
