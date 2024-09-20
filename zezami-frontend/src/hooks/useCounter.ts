import { useState, useEffect } from 'react';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounter = (initialCount: number = 0): CounterState => {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('counter');
    return savedCount ? parseInt(savedCount, 10) : initialCount;
  });

  useEffect(() => {
    localStorage.setItem('counter', count.toString());
  }, [count]);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(initialCount);

  return { count, increment, decrement, reset };
};

export default useCounter;
