import {useContext, useEffect, useState} from 'react';
import {
  Button,
  Container,
  Dropdown,
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer, toast} from 'react-toastify';
import {DishesContext, UserContext} from '../App';

export const Dashboard = () => {
  const {users} = useContext(UserContext);
  const {dishes} = useContext(DishesContext);

  const [dishRankInfo, setDishRankInfo] = useState([]);

  useEffect(() => {
    (async () => {
      const userObj = JSON.parse(localStorage.getItem('user'));

      const storedDishRankInfo = await JSON.parse(
        localStorage.getItem(userObj.username)
      );
      if (storedDishRankInfo) {
        setDishRankInfo(storedDishRankInfo);
      }
    })();
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

      return updatedInfo;
    });
  };

  const handleSave = () => {
    if (users.user.username) {
      localStorage.setItem(
        `${users.user.username}`,
        JSON.stringify(dishRankInfo)
      );
      toast.success('Rank saved sucessfully', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center mt-2">Dashboard</h1>
        <p>Welcome {users.user.username}</p>
        <Button onClick={handleSave} className="w-50 mb-5">
          Save
        </Button>
      </div>

      <Row>
        {dishes?.dishesList?.map((dish) => (
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
                <Card.Text title={dish.description}>
                  {dish.description.slice(0, 50) + '...'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
