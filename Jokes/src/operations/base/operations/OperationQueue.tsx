import {Operation} from './Operation';

export class OperationQueue {
  operations: Operation[] = [];

  operationCount(): number {
    return this.operations.length;
  }

  addOperation(operation: Operation) {
    if (operation === undefined) {
      return;
    }
    this.operations.push(operation);

    operation.run(() => {
      this.operations = this.operations.filter(item => item.id !== operation.id);
    });
  }

  cancelAllOperations() {
    this.operations.forEach(element => {
      element.cancel();
    });
    this.operations.length = 0;
  }
}
