import React from 'react';
import {JokesScene} from './src/scenes/jokes/JokesScene';

const App = () => {
  return <JokesScene model={new JokesScene.Model()} />;
};

export default App;
