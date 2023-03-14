import {Photo} from '../photo/Photo';

export class User {
  static currentUser?: User = undefined;

  id?: number;
  uuid?: string;

  createdAt?: string;

  username?: string;
  email?: string;
  name?: string;

  photo?: Photo;

  points: number = 0;

  constructor(id?: number, uuid?: string) {
    this.id = id;
    this.uuid = uuid;
  }
}

export namespace User {
  export class Report {
    id?: number;
    uuid?: string;

    type?: number;
    text?: string;

    createdAt?: string;
  }
}
