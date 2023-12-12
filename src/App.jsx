import './App.css';
import {Route, Link, Routes, useNavigate} from 'react-router-dom';
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Ranking} from './components/Ranking';
import {createContext, useEffect, useReducer} from 'react';
import {userReducers} from './Reducer/usersReducer';
export const UserContext = createContext();
function App() {
  const [users, usersDispatch] = useReducer(userReducers, {user: {}});
  const navigate = useNavigate();
  const handleLogot = () => {
    localStorage.clear();
    usersDispatch({type: 'RESET_USER'});
    navigate('/');
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      usersDispatch({
        type: 'SET_USER',
        payload: localStorage.getItem('user'),
      });
    }
  }, []);
  console.log(users);
  return (
    <UserContext.Provider value={{users, usersDispatch}}>
      <div>
        <h1>React dish poll</h1>
        <nav>
          <ul>
            {localStorage.getItem('user') ? (
              <li>
                <Link to="/" onClick={handleLogot}>
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/">Login</Link>
              </li>
            )}

            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/result">Ranking</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/result" element={<Ranking />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
