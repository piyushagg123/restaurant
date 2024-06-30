import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import OrderHistory from "./pages/OrderHistory";
import AllOrders from "./pages/AllOrders";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/all-orders" element={<AllOrders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
