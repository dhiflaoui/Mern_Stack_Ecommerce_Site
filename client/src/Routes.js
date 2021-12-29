import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./Core/Home";
import Navbar from "./Core/Navbar";
import PrivateRoute from "./auth/privateRoute";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AdminRoute from "./auth/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        {/* <Route path="/shop" exact component={Shop} /> */}
        {/* <Route path="/cart" exact component={Cart} /> */}
        <Route path="/Signin" exact>
          <Signin />
        </Route>
        <Route path="/Signup" exact>
          <Signup />
        </Route>

        {/* TO REMOVE */}
        <Route path="/user/dashboard" exact>
          <UserDashboard />
        </Route>
        <Route path="/create/category" exact>
          <AddCategory />
        </Route>
        <Route path="/create/product" exact>
          <AddProduct />
        </Route>
        {/* */}

        {/* <PrivateRoute path="/user/dashboard" exact component={UserDashboard} /> */}
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        {/* <AdminRoute path="/create/category" exact component={AddCategory} /> */}
        {/* <AdminRoute path="/create/product" exact component={AddProduct} /> */}
      </Switch>
    </Router>
  );
};
export default Routes;
