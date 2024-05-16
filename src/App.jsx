import Layout from './components/Layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { useAuth } from './context/AuthContext';
import LogInSignUp from './pages/AuthPage/LogInSignUp';

function App() {
  const authContext = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<LogInSignUp />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
