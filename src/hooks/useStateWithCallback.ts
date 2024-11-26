import { useCallback, useEffect, useRef, useState } from "react";

export const useStateWithCallback = <T>(
  initialState: T
): [T, (newState: T | ((prevState: T) => T), cb?: (state: T) => void) => void] => {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef<((state: T) => void) | null>(null);

  const updateState = useCallback(
    (newState: T | ((prevState: T) => T), cb?: (state: T) => void) => {
      cbRef.current = cb || null;

      setState((prev) => {
        return typeof newState === "function" ? (newState as (prevState: T) => T)(prev) : newState;
      });
    },
    []
  );

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, updateState];
};
