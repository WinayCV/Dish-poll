import axios from 'axios';
import {createContext, useEffect, useReducer} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {dishesReducer} from './Reducer/disheshReducer';
import {userReducers} from './Reducer/usersReducer';
import {Dashboard} from './components/Dashboard';
import {Login} from './components/Login';
import {NavBar} from './components/Navbar';
import {Ranking} from './components/Ranking';
import {NetworkError} from './components/NetworkError';
export const UserContext = createContext();
export const DishesContext = createContext();
function App() {
  const [users, usersDispatch] = useReducer(userReducers, {
    user: {},
  });
  const [dishes, dishesDispatch] = useReducer(dishesReducer, {
    dishesList: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      (async () => {
        try {
          const response = await axios.get(
            'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json'
          );
          dishesDispatch({
            type: 'SET_DISHES',
            payload: response.data,
          });

          if (response.status !== 200) {
            navigate('/error');
          }
          // else {
          //   navigate('/dashboard');
          // }
        } catch (error) {
          console.error('Error fetching data:', error);
          navigate('/error');
        }
      })();
      usersDispatch({
        type: 'SET_USER',
        payload: JSON.parse(localStorage.getItem('user')),
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{users, usersDispatch}}>
      <DishesContext.Provider value={{dishes, dishesDispatch}}>
        <div>
          <NavBar />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/result" element={<Ranking />} />
            <Route path="/error" element={<NetworkError />} />
          </Routes>
        </div>
      </DishesContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
