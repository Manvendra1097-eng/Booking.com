export const TOKEN_KEY = '_auth_token_';
export function storeValueInLs(key, value) {
  localStorage.setItem(key, value);
}

export function fetchValueFromLs(key) {
  return localStorage.getItem(key) || null;
}

export function removeValueFromLs(key) {
  localStorage.removeItem(key);
}
