import { useState, useEffect } from "react";
const getLocalValue = (key, initialValue) => {
  // Check if the code is running in the browser
  if (typeof window === "undefined") return initialValue;

  // Get the stored value from localStorage
  const localValue = localStorage.getItem(key);

  // If there's a value, parse it and return
  if (localValue) return JSON.parse(localValue);

  // If no value exists, return the initial value or the result of a function
  if (initialValue instanceof Function) return initialValue();

  return initialValue;
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;