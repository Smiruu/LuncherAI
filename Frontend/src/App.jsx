import LoginPage from "./Screens/LoginPage";
import RegisterPage from "./Screens/RegisterPage";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} exact/>
          <Route path='/register' element={<RegisterPage />} exact/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
