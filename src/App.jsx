import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Login} from './components/Login';

function App() {
  return (
    <div>
      <h1>React dish poll</h1>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
