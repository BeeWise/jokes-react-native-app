import {User} from '../../models/user/User';
import {OperationError} from '../../operations/base/errors/OperationError';

export interface ApplicationWorkerDelegate {
  successDidFetchUserDetails(user?: User): void;
  failureDidFetchUserDetails(error: OperationError): void;
}

export class ApplicationWorker {
  delegate?: ApplicationWorkerDelegate;

  constructor(delegate?: ApplicationWorkerDelegate) {
    this.delegate = delegate;
  }

  fetchUserDetails() {
    let delegate = this.delegate;
    let delay = Math.floor(Math.random() * 1500) + 500;

    setTimeout(() => {
      delegate?.successDidFetchUserDetails(this.user());
    }, delay);
  }

  private user(): User {
    let user = new User(1, 'uuid1');
    user.name = 'Name';
    user.username = 'username';
    user.email = 'email@mail.com';
    return user;
  }
}
