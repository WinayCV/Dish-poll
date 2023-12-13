import {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {users} from '../userInfo/userInfo';
import {useNavigate} from 'react-router-dom';
import {DishesContext, UserContext} from '../App';
import axios from 'axios';

export const Login = () => {
  const {usersDispatch} = useContext(UserContext);
  const {dishesDispatch} = useContext(DishesContext);
  const [form, setForm] = useState({userName: '', password: ''});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const newErrors = {};
  const runValidator = () => {
    if (form.userName == '') {
      newErrors.userName = 'User name cannot be empty';
    }
    if (form.password == '') {
      newErrors.password = 'Password cannot be empty';
    }
    setErrors(newErrors);

    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(runValidator()).length === 0) {
      const user = users.find((ele) => {
        if (
          ele.username === form.userName &&
          ele.password === form.password
        ) {
          return {
            id: ele.id,
            username: ele.username,
          };
        }
      });
      if (!user) {
        newErrors.password = 'Invalid user name or password';
        newErrors.userName = 'Invalid user name or password';
        setErrors(newErrors);
      } else {
        const userInfo = {id: user.id, username: user.username};
        const userInfoString = JSON.stringify(userInfo);
        console.log(userInfo);
        localStorage.setItem('user', userInfoString);
        try {
          const response = await axios.get(
            'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json'
          );
          dishesDispatch({
            type: 'SET_DISHES',
            payload: response.data,
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }

        usersDispatch({
          type: 'SET_USER',
          payload: JSON.parse(userInfoString),
        });
        navigate('/dashboard');
        setErrors('');
      }
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter Username"
                name="userName"
                onChange={handleChange}
                value={form.userName}
              />
              {errors.userName && (
                <Form.Text className="text-danger">
                  {errors.userName}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password}
                </Form.Text>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
