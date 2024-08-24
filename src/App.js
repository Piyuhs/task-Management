import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

 
 import Admin from './component/Admin/admin';
import User from './component/users/user'
import UserOwn from './pages/userOwn/uO';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<  Admin/>} />
          <Route path="/users" element={<  User/>} />
          <Route path="/user-Own" element={<  UserOwn/>} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;