const TokenKey = "token";

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token);
}

export function clearToken(){
  return localStorage.removeItem(TokenKey);
}