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

class App extends Component {
  render() {
    return (
        <Router>
          <div className="container">
            <Navbar />
            <br/>
            <br/>
            <br/>
            <Route exact path="/" component={Products} />
            <Route path="/categories" component={Categories} />
            <Route path="/users" component={Users} />
            <Route path="/orders" component={Orders} />
            <Route path="/addcategory" component={AddCategory} />
              <Route path="/addproduct" component={AddProduct} />
            <Route path="/addorder/:id/:productQuantity/:orderDetailTotalNetPrice/:orderDetailTotalGrossPrice" component={MakeOrder} />
          </div>
        </Router>
    );
  }
}

export default App;