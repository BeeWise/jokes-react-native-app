export class Photo {
  id?: number;
  uuid?: string;

  createdAt?: string;

  url?: string;
  url150?: string;
  url450?: string;

  constructor(id?: number) {
    this.id = id;
  }
}
