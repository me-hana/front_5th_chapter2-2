import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isTest = process.env.NODE_ENV === "test";

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isTest) return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.warn("useLocalStorage error:", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
