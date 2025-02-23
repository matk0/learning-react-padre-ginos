import { useState, useEffect, useDebugValue } from 'react';

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(
    pizzaOfTheDay
      ? `${pizzaOfTheDay.id} : ${pizzaOfTheDay.name}`
      : 'loading...',
  );

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const response = await fetch('/api/pizza-of-the-day');
      const json = await response.json();
      setPizzaOfTheDay(json);
    }

    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
