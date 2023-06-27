import { ResourceNotFound } from "./resourceNotFound.error";

export class UserNotFound extends ResourceNotFound {
  constructor() {
    super("User not found", "NOT_FOUND");
  }
}
