import { getBaseUrl } from "./api";

export function genImageUrl(path?: string) {
  if (!path || path.startsWith("http")) {
    return { uri: path };
  }
  return {
    uri: `${getBaseUrl()}${path}`,
  };
}
