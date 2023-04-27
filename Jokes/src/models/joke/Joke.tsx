import {User} from '../../models/user/User';
import {ApplicationLocalization} from '../../scenes/application/ApplicationLocalization';
import {Like} from '../../models/like/Like';

export class Joke {
  id?: number;
  uuid?: string;
  text?: string;
  answer?: string;

  user?: User;

  likeCount: number = 0;
  dislikeCount: number = 0;
  commentCount: number = 0;

  createdAt?: string;

  like?: Like;

  source?: string;
  status: number = Joke.Status.pending.value;

  type?: number;

  isLiked(): boolean {
    if (this.like !== undefined) {
      return this.like.type === Like.Type.like.value;
    }
    return false;
  }

  isDisliked(): boolean {
    if (this.like !== undefined) {
      return this.like.type === Like.Type.dislike.value;
    }
    return false;
  }
}

export namespace Joke {
  export class Status {
    static pending = new Status(0);
    static approved = new Status(1);
    static rejected = new Status(2);
    static adminRemoved = new Status(3);
    static ownerRemoved = new Status(4);

    static allCases: Status[] = [this.pending, this.approved, this.rejected, this.adminRemoved, this.ownerRemoved];

    value: number;

    constructor(value: number) {
      this.value = value;
    }

    static from(value?: number): Status | undefined {
      if (value === undefined) {
        return undefined;
      }
      return new Status(value);
    }

    name(): string | undefined {
      switch (this.value) {
        case Status.approved.value:
          return ApplicationLocalization.instance.jokeStatusApprovedTitle();
        case Status.pending.value:
          return ApplicationLocalization.instance.jokeStatusPendingTitle();
        case Status.rejected.value:
          return ApplicationLocalization.instance.jokeStatusRejectedTitle();
        case Status.adminRemoved.value:
          return ApplicationLocalization.instance.jokeStatusAdminRemovedTitle();
        case Status.ownerRemoved.value:
          return ApplicationLocalization.instance.jokeStatusOwnerRemovedTitle();
        default:
          return undefined;
      }
    }
  }
}

export namespace Joke {
  export class OrderBy {
    static points = new OrderBy(0);
    static latest = new OrderBy(1);

    static allCases: OrderBy[] = [this.points, this.latest];

    value: number;

    constructor(value: number) {
      this.value = value;
    }

    static from(value?: number): OrderBy | undefined {
      if (value === undefined) {
        return undefined;
      }
      return new OrderBy(value);
    }
  }
}

export namespace Joke {
  export class Type {
    static text = new Type(0);
    static qna = new Type(1);

    static allCases: Type[] = [this.text, this.qna];

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
