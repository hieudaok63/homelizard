import { ResourceNotFound } from "./resourceNotFound.error";

export class RealEstateObjectNotFound extends ResourceNotFound {
    constructor() {
        super("Real estate object not found", "NOT_FOUND");
    }
}
