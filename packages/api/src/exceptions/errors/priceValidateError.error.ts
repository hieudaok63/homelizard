import { ValidateError } from "./validateError.error";

export class PriceValidateError extends ValidateError {
  constructor() {
    super(
      "Maximum price should be greater than or equal to minimum price.",
      "BAD_REQUEST",
    );
  }
}
