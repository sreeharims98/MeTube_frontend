export const getStorage = (value) => {
  return sessionStorage.getItem(value);
};

export const setStorage = (value, data) => {
  return sessionStorage.setItem(value, data);
};

export const removeStorage = (value) => {
  return sessionStorage.removeItem(value);
};
