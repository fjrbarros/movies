import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const readValue = useCallback(() => {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;

    setStoredValue(valueToStore);

    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [readValue]);

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
