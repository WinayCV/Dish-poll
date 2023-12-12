import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useContext, useEffect} from 'react';
import axios from 'axios';
import {DishesContext} from '../App';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const {dishesDispatch, dishes} = useContext(DishesContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json'
        );
        dishesDispatch({type: 'SET_DISHES', payload: response.data});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <Container>
      <h1>Dashboard</h1>
      <h2>Welcome {user && user.username}!</h2>
      <Row>
        {dishes.dishesList &&
          dishes.dishesList.map((dish) => (
            <Col key={dish.id} xs={12} md={6} lg={4}>
              <Card style={{width: '18rem', marginBottom: '20px'}}>
                <Card.Img variant="top" src={dish.image} />
                <Card.Body
                  style={{height: '150px', overflow: 'hidden'}}
                >
                  <Card.Title>{dish.dishName}</Card.Title>
                  <Card.Text>{dish.description}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};
