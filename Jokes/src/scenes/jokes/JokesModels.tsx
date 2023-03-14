import {v4 as uuidv4} from 'uuid';
import {AttributedText} from '../../models/attributed_text/AttributedText';
import {OperationError} from '../../operations/base/errors/OperationError';
import {Joke} from '../../models/joke/Joke';

export namespace JokesModels {
  export class PaginationModel {
    isFetchingItems: boolean = false;
    noMoreItems: boolean = false;
    hasError: boolean = false;
    currentPage: number = 0;
    limit: number = 10;
    items: Joke[] = [];

    readJokes: Joke[] = [];

    reset() {
      this.isFetchingItems = false;
      this.noMoreItems = false;
      this.hasError = false;
      this.currentPage = 0;
      this.limit = 10;
      this.items = [];

      this.readJokes = [];
    }
  }

  export enum ItemType {
    jokeText,
    jokeQna,
    space,
  }

  export class DisplayedItem {
    uuid: string;
    type: ItemType;
    model?: any;

    constructor(type: ItemType, model?: any) {
      this.uuid = uuidv4();
      this.type = type;
      this.model = model;
    }
  }

  export namespace ItemsPresentation {
    export class Response {
      items: Joke[];
      readJokes: Joke[];

      constructor(items: Joke[], readJokes: Joke[]) {
        this.items = items;
        this.readJokes = readJokes;
      }
    }

    export class ViewModel {
      items: DisplayedItem[];

      constructor(items: DisplayedItem[]) {
        this.items = items;
      }
    }
  }

  export namespace NoMoreItemsPresentation {
    export class ViewModel {
      text?: AttributedText;

      constructor(text?: AttributedText) {
        this.text = text;
      }
    }
  }

  export namespace ErrorPresentation {
    export class Response {
      error: OperationError;

      constructor(error: OperationError) {
        this.error = error;
      }
    }

    export class ViewModel {
      errorText?: AttributedText;

      constructor(errorText?: AttributedText) {
        this.errorText = errorText;
      }
    }
  }

  export namespace ActionAlertPresentation {
    export class Response {
      error: OperationError;

      constructor(error: OperationError) {
        this.error = error;
      }
    }

    export class ViewModel {
      title?: string;
      message?: string;

      constructor(title?: string, message?: string) {
        this.title = title;
        this.message = message;
      }
    }
  }

  export namespace ItemSelection {
    export class Request {
      id?: string;

      constructor(id?: string) {
        this.id = id;
      }
    }
  }

  export namespace ItemReadState {
    export class Response {
      isRead: boolean;
      id?: string;

      constructor(isRead: boolean, id?: string) {
        this.isRead = isRead;
        this.id = id;
      }
    }

    export class ViewModel {
      isRead: boolean;
      id?: string;

      constructor(isRead: boolean, id?: string) {
        this.isRead = isRead;
        this.id = id;
      }
    }
  }

  export namespace ItemScroll {
    export class Response {
      animated: boolean;
      index: number;

      constructor(animated: boolean, index: number) {
        this.animated = animated;
        this.index = index;
      }
    }

    export class ViewModel {
      animated: boolean;
      index: number;

      constructor(animated: boolean, index: number) {
        this.animated = animated;
        this.index = index;
      }
    }
  }
}
