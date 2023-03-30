import Home from "./pages/home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Sucess from "./pages/Sucess";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";



function App() {
  //create routes, if there is no user, redirect to login page
  const user = useSelector((state: any) => state.login.user);
  console.log(user)
  return (
  <Router>
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/register"/>} />
      <Route path="/cart" element={user ? <Cart /> : <Navigate to="/register"/>} />
      <Route path="/sucess" element={user ? <Sucess /> : <Navigate to="/register"/>} />
      <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
      <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/products/:category" element={<ProductList />} />
    </Routes>
  </Router>
  );
}

export default App;
