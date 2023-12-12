import {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {users} from '../userInfo/userInfo';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../App';

export const Login = () => {
  const {usersDispatch} = useContext(UserContext);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(runValidator()).length === 0) {
      const user = users.find((ele) => {
        if (
          ele.username === form.userName &&
          ele.password === form.password
        ) {
          return ele;
        }
      });
      if (!user) {
        newErrors.password = 'Invalid user name or password';
        newErrors.userName = 'Invalid user name or password';
        setErrors(newErrors);
      } else {
        const userInfo = JSON.stringify(user);
        localStorage.setItem('user', userInfo);

        usersDispatch({type: 'SET_USER', payload: userInfo});
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
              <Form.Label>Email address</Form.Label>
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
