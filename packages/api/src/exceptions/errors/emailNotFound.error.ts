import { ResourceNotFound } from "./resourceNotFound.error";

export class EmailNotFound extends ResourceNotFound {
  constructor() {
    super("Email not found", "NOT_FOUND");
  }
}
