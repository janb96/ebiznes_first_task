import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Products from './Components/Products';
import Navbar from './Components/Navbar';
import Categories from './Components/Categories';
import Users from './Components/Users';
import Orders from './Components/Orders';
import MakeOrder from './Components/MakeOrder';
import AddCategory from "./Components/AddCategory";
import AddProduct from "./Components/AddProduct";
import Home from "./Components/Home";
import AdminPanel from "./Components/AdminPanel";
import AddUser from "./Components/AddUser";
import axios from 'axios';

axios.defaults.withCredentials = true;

class App extends Component {
  render() {
    return (
        <Router>
          <div className="container">
            <Navbar />
            <br/>
            <br/>
            <br/>
            <Route exact path="/" component={Home} />
            <Route exact path="/products/:isAdmin?" component={Products} />
            <Route exact path="/admin-panel" component={AdminPanel} />
            <Route path="/categories/:isAdmin?" component={Categories} />
            <Route path="/users/:isAdmin?" component={Users} />
            <Route path="/orders/:isAdmin?" component={Orders} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/addcategory" component={AddCategory} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/addorder/:id/:orderDetailTotalNetPrice/:orderDetailTotalGrossPrice" component={MakeOrder} />
          </div>
        </Router>
    );
  }
}

export default App;