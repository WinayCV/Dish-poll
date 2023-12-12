import {useEffect} from 'react';
import axios from 'axios';

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  useEffect(() => {
    (async () => {
      const dishList = await axios.get(
        ' https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json'
      );
      console.log(dishList);
    })();
  });
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user.username}!</h2>
    </div>
  );
};
