import { useState, useEffect } from "react";
const getLocalValue = (key, initialValue) => {
  // for server side react
  if (typeof window !== "undefined") {
    return initialValue;
  }

  //getting the value
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) {
    return localValue;
  }

  // return result of a function

  if (initialValue instanceof Function) {
    return initialValue();
  }
};
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
};

export default useLocalStorage;
