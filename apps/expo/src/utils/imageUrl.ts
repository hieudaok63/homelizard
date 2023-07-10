import { getBaseUrl } from "./api";

export function genImageUrl(path: string) {
  return {
    uri: `${getBaseUrl()}${path}`,
  };
}
