import { useEffect, useRef, Reducer, useReducer } from 'react';

export const usePrevious = <T,>(state: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}

const toggleReducer = (state: boolean, nextValue?: any) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

export const useToggle = (initialValue: boolean): [boolean, (nextValue?: any) => void] => {
  return useReducer<Reducer<boolean, any>>(toggleReducer, initialValue);
};