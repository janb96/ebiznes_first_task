import axios from 'axios';

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
            // users: []
        };
    }

    // async componentDidMount() {
    //     const promise = await axios.get('http://localhost:9000/users');
    //     const response = promise.data;
    //     this.setState({ users: response });
    // }

    render(){

        return (
            <div className="container">
                <h1><kbd>EBIZNES</kbd> SHOP</h1>
                <br/>
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
                                <div className="card-body">Show all orders</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;