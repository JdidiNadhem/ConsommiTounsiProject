import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentClient } from "./JS/Actions/client";
import { get_all_products } from "./JS/Actions/products";
import { get_purchases } from "./JS/Actions/purchases";

import ProductDetails from "./Components/Product/ProductDetails";
import LandPage from "./Components/LandPage/LandPage";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import PrivateRoute from "./router/PrivateRoute";
import Profile from "./Components/Profile/Profile";
import Register from "./Components/Register/Register";
import Error from "./Components/Error/Error";
import Footer from "./Components/Footer/Footer";

import "./App.css";
import Society from "./Components/Society/Society";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Admin from "./Components/Admin/Admin";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(get_all_products());
    dispatch(get_purchases());
    if (token) {
      dispatch(currentClient());
    }
  }, [dispatch, token]);
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/product_details" component={ProductDetails} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/society" component={Society} />
        <PrivateRoute path="/shoppingcart" component={ShoppingCart} />
        <PrivateRoute path="/admin" component={Admin} />
        <Route path="/*" component={Error} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
