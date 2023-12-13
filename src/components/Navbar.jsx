import {Navbar, Nav} from 'react-bootstrap';
import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../App';
export const NavBar = () => {
  const {usersDispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    usersDispatch({type: 'RESET_USER'});
    navigate('/');
  };
  return (
    <Navbar bg="light" expand="lg" className="w-100">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100 justify-content-between align-items-center">
          <span>
            <h4>Dish Poll</h4>
          </span>
          {localStorage.getItem('user') ? (
            <div className="d-flex justify-content-end">
              <Nav.Link as={Link} to="/" onClick={handleLogout}>
                Logout
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/result">
                Ranking
              </Nav.Link>
            </div>
          ) : (
            <div>
              <Nav.Link as={Link} to="/">
                Login
              </Nav.Link>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
