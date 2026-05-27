const ACCESS_TOKEN_KEY = "omnihub.access-token";

export function setAccessToken(token: string) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
}

export function getAccessToken() {
  if (typeof window !== "undefined") {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  return null;
}

export function clearAccessToken() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}