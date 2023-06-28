import { TRPCError } from "@trpc/server";
import { type TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";

export class BaseError extends TRPCError {
  constructor(message: string, code: TRPC_ERROR_CODE_KEY, cause?: string) {
    super({ code, message, cause });
  }
}
