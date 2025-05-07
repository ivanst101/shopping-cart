export const setItemInStorage = function (name, data) {
  return localStorage?.setItem(name, JSON.stringify(data));
};

export const getItemFromStorage = function (name) {
  return localStorage?.getItem(name);
};

export const getParsedItemFromStorage = function (name) {
  return JSON.parse(localStorage?.getItem(name));
};

export const removeItemFromStorage = function (name) {
  return localStorage?.removeItem(name);
};
