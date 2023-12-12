import {useContext} from 'react';
import {DishesContext} from '../App';

export const Ranking = () => {
  const {dishes} = useContext(DishesContext);
  console.log(dishes);
  const result = {};
  return (
    <div>
      <h1>Ranking</h1>
    </div>
  );
};
