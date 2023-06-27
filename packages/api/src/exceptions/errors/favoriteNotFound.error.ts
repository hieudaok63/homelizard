import { ResourceNotFound } from "./resourceNotFound.error";

export class FavoriteNotFound extends ResourceNotFound {
  constructor() {
    super("Favorite not found", "NOT_FOUND");
  }
}
