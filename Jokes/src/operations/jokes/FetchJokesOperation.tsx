import {Expose, Type, plainToInstance} from 'class-transformer';
import {Joke} from '../../models/joke/Joke';
import {Like} from '../../models/like/Like';
import {Photo} from '../../models/photo/Photo';
import {User} from '../../models/user/User';
import {EndpointsBuilder} from '../base/builders/EndpointsBuilder';
import {HTTPMethod, OperationRequestBuilder} from '../base/builders/OperationRequestBuilder';
import {AsynchronousOperation} from '../base/operations/AsynchronousOperation';
import {JSONFileOperation} from '../base/operations/JSONFileOperation';

export namespace FetchJokesOperationModels {
  export class Request {
    page: number;
    limit: number;
    orderBy: number;
    startedAt?: string;
    endedAt?: string;

    constructor(page: number, limit: number, orderBy: number, startedAt?: string, endedAt?: string) {
      this.page = page;
      this.limit = limit;
      this.orderBy = orderBy;
      this.startedAt = startedAt;
      this.endedAt = endedAt;
    }
  }

  export class Response {
    @Expose({name: 'data'})
    @Type(() => JokeModel)
    data?: JokeModel[];

    toJokes(): Joke[] {
      return (this.data ?? []).map(element => {
        return element.toJoke();
      });
    }
  }

  export class JokeModel {
    @Expose({name: 'id'})
    id?: number;

    @Expose({name: 'uuid'})
    uuid?: string;

    @Expose({name: 'created_at'})
    createdAt?: string;

    @Expose({name: 'text'})
    text?: string;

    @Expose({name: 'answer'})
    answer?: string;

    @Expose({name: 'type'})
    type?: number;

    @Expose({name: 'source'})
    source?: string;

    @Expose({name: 'like_count'})
    likeCount?: number;

    @Expose({name: 'dislike_count'})
    dislikeCount?: number;

    @Expose({name: 'comment_count'})
    commentCount?: number;

    @Expose({name: 'status'})
    status?: number;

    @Expose({name: 'user'})
    @Type(() => UserModel)
    user?: UserModel;

    @Expose({name: 'like'})
    @Type(() => LikeModel)
    like?: LikeModel;

    toJoke(): Joke {
      let joke = new Joke();
      joke.id = this.id;
      joke.uuid = this.uuid;
      joke.createdAt = this.createdAt;
      joke.text = this.text;
      joke.source = this.source;
      joke.likeCount = this.likeCount ?? 0;
      joke.dislikeCount = this.dislikeCount ?? 0;
      joke.commentCount = this.commentCount ?? 0;
      joke.status = this.status ?? Joke.Status.pending.value;
      joke.user = this.user?.toUser();
      joke.like = this.like?.toLike();
      joke.answer = this.answer;
      joke.type = this.type;
      return joke;
    }
  }

  export class UserModel {
    @Expose({name: 'id'})
    id?: number;

    @Expose({name: 'uuid'})
    uuid?: string;

    @Expose({name: 'created_at'})
    createdAt?: string;

    @Expose({name: 'username'})
    username?: string;

    @Expose({name: 'email'})
    email?: string;

    @Expose({name: 'name'})
    name?: string;

    @Expose({name: 'photo'})
    @Type(() => PhotoModel)
    photo?: PhotoModel;

    @Expose({name: 'points'})
    points?: number;

    toUser(): User {
      let user = new User(this.id);
      user.id = this.id;
      user.uuid = this.uuid;
      user.createdAt = this.createdAt;
      user.username = this.username;
      user.email = this.email;
      user.name = this.name;
      user.photo = this.photo?.toPhoto();
      user.points = this.points ?? 0;
      return user;
    }
  }

  export class PhotoModel {
    @Expose({name: 'id'})
    id?: number;

    @Expose({name: 'uuid'})
    uuid?: string;

    @Expose({name: 'created_at'})
    createdAt?: string;

    @Expose({name: 'url'})
    url?: string;

    @Expose({name: 'url_150'})
    url150?: string;

    @Expose({name: 'url_450'})
    url450?: string;

    toPhoto(): Photo {
      let photo = new Photo();
      photo.id = this.id;
      photo.uuid = this.uuid;
      photo.createdAt = this.createdAt;
      photo.url = this.url;
      photo.url150 = this.url150;
      photo.url450 = this.url450;
      return photo;
    }
  }

  export class LikeModel {
    @Expose({name: 'id'})
    id?: number;

    @Expose({name: 'uuid'})
    uuid?: string;

    @Expose({name: 'created_at'})
    createdAt?: string;

    @Expose({name: 'type'})
    type?: number;

    toLike(): Like {
      let like = new Like();
      like.id = this.id;
      like.uuid = this.uuid;
      like.createdAt = this.createdAt;
      like.type = this.type;
      return like;
    }
  }
}

class FetchJokesOperationRequestBuilder extends OperationRequestBuilder<FetchJokesOperationModels.Request> {
  url(): string {
    return EndpointsBuilder.instance.jokesEndpoint();
  }

  httpMethod(): string {
    return HTTPMethod.get.toString();
  }

  requiresAuthorization(): boolean {
    return false;
  }

  queryParameters(): Map<string, string> {
    let parameters = new Map();
    parameters.set('page', this.model.page);
    parameters.set('limit', this.model.limit);
    parameters.set('order_by', this.model.orderBy);
    if (this.model.startedAt !== undefined) {
      parameters.set('started_at', this.model.startedAt);
    }
    if (this.model.endedAt !== undefined) {
      parameters.set('ended_at', this.model.endedAt);
    }
    return parameters;
  }
}

export class FetchJokesOperation extends AsynchronousOperation<FetchJokesOperationModels.Response> {
  request(): XMLHttpRequest {
    return new FetchJokesOperationRequestBuilder(this.model).request();
  }

  parse(body: any): FetchJokesOperationModels.Response | undefined {
    let response = plainToInstance(FetchJokesOperationModels.Response, body);
    if (response.data !== undefined) {
      return response;
    }
    return undefined;
  }
}

export class FetchJokesLocalOperation extends JSONFileOperation<FetchJokesOperationModels.Response> {
  delay: number = 500;
  shouldFail: boolean = Math.random() > 0.9;

  json(): any | undefined {
    return require('../../resources/json/fetch_jokes_local_operation.json');
  }

  parse(body: any): FetchJokesOperationModels.Response | undefined {
    return plainToInstance(FetchJokesOperationModels.Response, body);
  }
}
