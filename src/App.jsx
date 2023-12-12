import './App.css';
import {Route, Link, Routes, useNavigate} from 'react-router-dom';
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Ranking} from './components/Ranking';
import {createContext, useEffect, useReducer} from 'react';
import {userReducers} from './Reducer/usersReducer';
import {dishesReducer} from './Reducer/disheshReducer';
export const UserContext = createContext();
export const DishesContext = createContext();
function App() {
  const [users, usersDispatch] = useReducer(userReducers, {
    user: {},
    rank: {id: '', rank1: '', rank2: '', rank3: ''},
    ranks: [],
  });
  const [dishes, dishesDispatch] = useReducer(dishesReducer, {
    dishesList: [],
  });
  const navigate = useNavigate();
  const handleLogot = () => {
    localStorage.removeItem('user');
    usersDispatch({type: 'RESET_USER'});
    navigate('/');
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      usersDispatch({
        type: 'SET_USER',
        payload: localStorage.getItem('user'),
      });
      dishesDispatch({
        type: 'SET_DISHES',
        payload: localStorage.getItem('dishes'),
      });
    }
  }, []);
  // console.log(localStorage.getItem('dishes'));
  return (
    <UserContext.Provider value={{users, usersDispatch}}>
      <DishesContext.Provider value={{dishes, dishesDispatch}}>
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
      </DishesContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
