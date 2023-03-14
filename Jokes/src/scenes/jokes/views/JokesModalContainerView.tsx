import React, {Component} from 'react';
import {Modal, StyleSheet, View, ViewProps} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import {ActionAlertScene} from '../../action_alert/ActionAlertScene';

export class JokesModalContainerView extends Component<JokesModalContainerView.Props, JokesModalContainerView.State> implements ActionAlertScene.Delegate {
  actionAlertSceneModel: ActionAlertScene.Model = new ActionAlertScene.Model();

  constructor(props: JokesModalContainerView.Props) {
    super(props);
  }

  reload() {
    this.setState({});
  }

  render() {
    return this.setupContainerView();
  }

  setupContainerView() {
    return <View style={constraints.containerView}>{this.setupActionAlertScene()}</View>;
  }

  //#region Action alert scene
  showActionAlertScene(title?: string, message?: string) {
    this.actionAlertSceneModel.isVisible = true;
    this.actionAlertSceneModel.title = title;
    this.actionAlertSceneModel.message = message;
    this.reload();
  }

  dismissActionAlertScene() {
    this.actionAlertSceneModel.isVisible = false;
    this.reload();
  }

  setupActionAlertScene() {
    return (
      <Modal
        style={constraints.modalView}
        animationType="fade"
        transparent={true}
        visible={this.actionAlertSceneModel.isVisible}
        onRequestClose={() => {
          this.dismissActionAlertScene();
        }}>
        <ActionAlertScene key={uuidv4()} model={this.actionAlertSceneModel} delegate={this} />
      </Modal>
    );
  }

  actionAlertSceneOnPressCancelAction(scene: ActionAlertScene): void {
    this.props.delegate?.jokesModalContainerViewActionAlertOnPressCancelAction(this, scene);
  }
  //#endregion
}

const constraints = StyleSheet.create({
  containerView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
  },
});

export namespace JokesModalContainerView {
  export class Model {}

  export interface Props extends ViewProps {
    model: Model;
    delegate?: Delegate;
  }

  export interface State {}

  export interface Delegate {
    jokesModalContainerViewActionAlertOnPressCancelAction(view: JokesModalContainerView, scene: ActionAlertScene): void;
  }
}
