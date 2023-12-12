import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
    })();
  });
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user.username}!</h2>
      <Card style={{width: '18rem'}}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and
            make up the bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
