import LoginPage from "./Screens/LoginPage";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} exact/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
