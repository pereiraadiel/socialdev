import HomePage from './components/pages/home.page';
import NoMatchPage from './components/pages/no-match.page';
import ProfilePage from './components/pages/profile.page';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import SignInPage from './components/pages/sign-in.page';
import SignUpPage from './components/pages/sign-up.page';

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/u/:username" element={<ProfilePage/>}/>
            <Route path="/sign/in" element={<SignInPage/>}/>
            <Route path="/sign/up" element={<SignUpPage/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<NoMatchPage/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
