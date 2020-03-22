export const appKey = "kid_SyyaPx1hr";
export const appSecret = "108e1a8f5dfa40209eddda8cba2f506c";

function saveData(key, value) {
  localStorage.setItem(key + appKey, JSON.stringify(value));
}

export function getData(key) {
  return localStorage.getItem(key);
}

export function saveUser(data) {
  localStorage.setItem(`userInfo`, JSON.stringify(data));
  localStorage.setItem(`authToken`, JSON.stringify(data._kmd.authtoken));
}

export function removeUser() {
  localStorage.clear();
}