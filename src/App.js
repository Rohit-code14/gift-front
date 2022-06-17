import MainApp from "./components/MainApp";
import Cart from "./components/Cart";
import Login from "./components/login";
import Register from "./components/register";
import ProductList from "./components/productlist";
import Checkout from "./components/checkout";
import Pay from "./components/pay";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Order from "./components/order";
import VendorLogin from "./components/vendorLogin";
import VendorRegistration from "./components/vendorRegistration";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<MainApp />} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/vlogin" exact element={<VendorLogin/>} />
        <Route path="/register" exact element={<Register/>} />
        <Route path="/vregister" exact element={<VendorRegistration/>} />
        <Route path="/cart" exact element={<Cart/>} />
        <Route path="/suggest" exact element={<ProductList/>} />
        <Route path="/out" exact element={<Checkout/>} />
        <Route path="/pay" exact element={<Pay/>} />
        <Route path="/order" exact element={<Order/>} />

      </Routes>
    </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={5}
        />
        </>
  );
}

export default App;
