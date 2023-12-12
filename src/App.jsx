import './App.css';
import {Route, Link, Routes, useNavigate} from 'react-router-dom';
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {Ranking} from './components/Ranking';
import {createContext, useReducer} from 'react';
import {userReducers} from './Reducer/usersReducer';
export const UserContext = createContext();
function App() {
  const [users, usersDispatch] = useReducer(userReducers, {});
  const navigate = useNavigate();
  const handleLogot = () => {
    localStorage.clear();
    navigate('/');
  };
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
