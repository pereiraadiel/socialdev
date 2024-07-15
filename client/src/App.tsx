import HomePage from './components/pages/home.page';
import NoMatchPage from './components/pages/no-match.page';
import ProfilePage from './components/pages/profile.page';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/u/:username" element={<ProfilePage/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<NoMatchPage/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
