import { useCallback, useState } from "react";

export const useKey = () => {
  const [key, setKey] = useState(Math.floor(Math.random() * 10 ** 10));
  const next = useCallback(() => setKey((prev) => prev + 1), []);

  return [key, next] as const;
};
