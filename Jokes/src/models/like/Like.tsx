import {Joke} from '../joke/Joke';
import {User} from '../user/User';

export class Like {
  id?: number;
  uuid?: string;

  joke?: Joke;
  user?: User;

  createdAt?: string;

  type?: number;
}

export namespace Like {
  export class Type {
    static like = new Type(0);
    static dislike = new Type(1);

    static allCases: Type[] = [this.like, this.dislike];

    value: number;

    constructor(value: number) {
      this.value = value;
    }

    static from(value?: number): Type | undefined {
      if (value === undefined) {
        return undefined;
      }
      return new Type(value);
    }
  }
}
