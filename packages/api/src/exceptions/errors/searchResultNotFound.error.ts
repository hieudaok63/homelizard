import { ResourceNotFound } from "./resourceNotFound.error";

export class SearchResultNotFound extends ResourceNotFound {
  constructor() {
    super("Search result not found", "NOT_FOUND");
  }
}
