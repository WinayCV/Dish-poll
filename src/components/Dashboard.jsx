import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [dishRankInfo, setDishRankInfo] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json'
        );
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const rankPoints = {
    1: {rank: 1, points: 30},
    2: {rank: 2, points: 20},
    3: {rank: 3, points: 10},
  };

  const handleRankSelect = (dishId, rank) => {
    setDishRankInfo((prevInfo) => {
      let updatedInfo = prevInfo.filter(
        (info) => info.dishId !== dishId
      );

      if (rank !== 'none') {
        const rankObj = {
          dishId,
          rank: rankPoints[rank].rank,
          points: rankPoints[rank].points,
        };

        if (prevInfo.find((info) => info.rank === rankObj.rank)) {
          updatedInfo = updatedInfo.filter(
            (info) => info.rank !== rankObj.rank
          );
        }

        updatedInfo.push(rankObj);
      }
      setPoints(updatedInfo);
      return updatedInfo;
    });
  };

  const handleSave = () => {
    console.log(points);
  };

  return (
    <Container>
      <h1>Dashboard</h1>
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
                    {dishRankInfo.find(
                      (info) => info.dishId === dish.id
                    )
                      ? `Rank ${
                          dishRankInfo.find(
                            (info) => info.dishId === dish.id
                          ).rank
                        }`
                      : 'No Rank'}
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
