import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {users} from '../userInfo/userInfo';

export const Login = () => {
  const [form, setForm] = useState({userName: '', password: ''});
  const [errors, setErrors] = useState({});
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
        console.log(user);
        localStorage.setItem('user', user);
        setErrors('');
      }
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter user Name"
            name="userName"
            onChange={handleChange}
            value={form.userName}
          />
          <span>
            {errors.userName && (
              <p style={{color: 'red'}}>{errors.userName}</p>
            )}
          </span>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>
        <span>
          {errors.password && (
            <p style={{color: 'red'}}>{errors.password}</p>
          )}
        </span>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
