import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const storedDishes =
    JSON.parse(localStorage.getItem('dishes')) || [];
  const [dishes, setDishes] = useState(storedDishes);
  const [selectedRanks, setSelectedRanks] = useState({});

  useEffect(() => {
    if (!storedDishes.length) {
      (async () => {
        try {
          const response = await axios.get(
            'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json'
          );
          localStorage.setItem(
            'dishes',
            JSON.stringify(response.data)
          );
          setDishes(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      })();
    }
  }, [storedDishes.length]);

  const handleRankSelect = (dishId, rank) => {
    if (rank === 'none' || selectedRanks[dishId] === rank) {
      const updatedDishes = dishes.map((dish) =>
        dish.id === dishId ? {...dish, rank: undefined} : dish
      );
      setDishes(updatedDishes);
      setSelectedRanks({...selectedRanks, [dishId]: undefined});
      localStorage.setItem('dishes', JSON.stringify(updatedDishes));
    } else if (!selectedRanks[dishId]) {
      const updatedDishes = dishes.map((dish) =>
        dish.id === dishId ? {...dish, rank: rank} : dish
      );
      setDishes(updatedDishes);
      setSelectedRanks({...selectedRanks, [dishId]: rank});
      localStorage.setItem('dishes', JSON.stringify(updatedDishes));
    } else {
      alert(`Rank ${rank} is already assigned to another dish.`);
    }
  };
  const handleSave = () => {
    dishes.forEach((dish) => {
      const dishId = dish.id;
      const rank = dish.rank;
      if (rank) {
        console.log(rank, dishId);
      }
    });
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <h2>Welcome {user && user.username}!</h2>
      <button onClick={handleSave}>Save</button>
      <Row>
        {dishes.map((dish) => (
          <Col key={dish.id} xs={12} md={6} lg={4}>
            <Card style={{width: '18rem', marginBottom: '20px'}}>
              <Card.Img variant="top" src={dish.image} />
              <Card.Body style={{height: '150px'}}>
                <Card.Title>{dish.dishName}</Card.Title>
                <Dropdown
                  onSelect={(eventKey) =>
                    handleRankSelect(dish.id, eventKey)
                  }
                >
                  <Dropdown.Toggle
                    variant="success"
                    id={`dropdown-${dish.id}`}
                  >
                    {dish.rank ? `Rank ${dish.rank}` : 'No Rank'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="none">
                      No Rank
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="1">Rank 1</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Rank 2</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Rank 3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
