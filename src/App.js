// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/fonts/style.css';
import 'react-toastify/dist/ReactToastify.css';

// React
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Shop from './components/Shop';
import Profile from './components/Profile';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import { toast, ToastContainer } from 'react-toastify';
import { UserProvider } from './UserProvider';


function App() {
  return (
    <UserProvider>
        <NavBar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Shop />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        <Footer />
    </UserProvider>
  );
}

export default App;
