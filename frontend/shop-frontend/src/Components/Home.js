import {
    Link
} from 'react-router-dom';

import React, {
    Component,
} from 'react';

class Home extends Component {

    constructor () {
        super();
        this.state = {
        };
    }

    render(){
        let cars_photo = require("../photo/audi-rs6.jpg");
        let categories_photo = require("../photo/categories.jpg");
        let orders = require("../photo/orders.png");
        return (
            <div className="container">
                <h1><kbd>EBIZNES</kbd> SHOP</h1>
                <div className="row">
                    <div className="col-4">
                        <Link to="/products">
                            <div className="card bg-success text-white">
                                <div className="card-body">Show all products</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-4">
                        <Link to="/categories">
                            <div className="card bg-info text-white">
                                <div className="card-body">Show all categories</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-4">
                        <Link to="/orders">
                            <div className="card bg-warning text-white">
                                <div className="card-body">Show my orders</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-4">
                        <img src={cars_photo} className="img-fluid" alt="Products"/>
                    </div>
                    <div className="col-4">
                        <img src={categories_photo} className="img-fluid" alt="Categories"/>
                    </div>
                    <div className="col-4">
                        <img src={orders} className="img-fluid" alt="Orders"/>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

export default Home;