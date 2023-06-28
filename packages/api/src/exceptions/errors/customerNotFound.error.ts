import { ResourceNotFound } from "./resourceNotFound.error";

export class CustomerNotFound extends ResourceNotFound {
  constructor() {
    super("Customer not found", "NOT_FOUND");
  }
}
