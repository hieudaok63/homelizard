import { ResourceNotFound } from "./resourceNotFound.error";

export class RequestNotFound extends ResourceNotFound {
    constructor() {
        super("Request object not found", "NOT_FOUND");
    }
}

export class RequestHistoryNotFound extends ResourceNotFound {
    constructor() {
        super("Request history not found", "NOT_FOUND");
    }
}
