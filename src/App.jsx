import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import SignupForm from './Routes/SignupForm';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Routes/Home';
import About from './Routes/About';
import Contact from './Routes/Contact';
import NotFound from './Routes/NotFound';
import LoginForm from './Routes/LoginForm';
import Dashboard from './Routes/Dashboard';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import Routechecker from './Routes/Routechecker';
import AnotherChecker from './Routes/AnotherChecker';



export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} >
        <Route element={<AnotherChecker />} >
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<Routechecker />} >
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
