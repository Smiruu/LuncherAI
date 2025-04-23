import LoginPage from "./Screens/LoginPage";
import RegisterPage from "./Screens/RegisterPage";
import VerifyEmail from "./Screens/VerifyEmail";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} exact/>
          <Route path='/register' element={<RegisterPage />} exact/>
          <Route path='/verify-email' element={<VerifyEmail />} exact/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
