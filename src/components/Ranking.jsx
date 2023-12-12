import {useContext} from 'react';
import Table from 'react-bootstrap/Table';
import {DishesContext, UserContext} from '../App';
import {users as userInfo} from '../userInfo/userInfo';

export const Ranking = () => {
  const {dishes} = useContext(DishesContext);
  const {users} = useContext(UserContext);

  const userList = [];
  const combinedPoints = {};
  const user = JSON.parse(
    localStorage.getItem(`${users?.user?.username}`)
  );
  console.log(user);
  userInfo.map((user) => {
    userList.push(user.username);
  });
  const result = userList.map((user) => {
    return JSON.parse(localStorage.getItem(user));
  });
  result.forEach((infoArray) => {
    if (infoArray) {
      infoArray.forEach((info) => {
        const {dishId, points} = info;
        combinedPoints[dishId] =
          (combinedPoints[dishId] || 0) + points;
      });
    }
  });

  const newDishesList = dishes.dishesList
    .map((dish) => {
      const points = combinedPoints[dish.id] || 0;
      const choice = user?.find((ele) => ele.dishId === dish.id);
      console.log(choice);
      return {
        ...dish,
        points,
        choice: choice ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="main-grid-item-icon"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="main-grid-item-icon"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" x2="9" y1="9" y2="15" />
            <line x1="9" x2="15" y1="9" y2="15" />
          </svg>
        ),
      };
    })
    .sort((a, b) => b.points - a.points);

  console.log(newDishesList);
  return (
    <div>
      <h1>Ranking</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL NO</th>
            <th>Title</th>
            <th>Points</th>
            <th>My choice</th>
          </tr>
        </thead>
        <tbody>
          {newDishesList?.map((dish, i) => {
            return (
              <tr key={dish.id}>
                <td>{i + 1}</td>
                <td>{dish.dishName}</td>
                <td>{dish.points}</td>
                <td>{dish.choice}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
