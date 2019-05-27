import axios from 'axios';

import {
    Link
} from 'react-router-dom';

import React, {
    Component,
} from 'react';

class AdminPanel extends Component {

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
            <div className="container text-center">
                <h1 className="display-1"><span className="badge badge-warning">Admin Panel</span></h1>
                <br/>
                <h2><kbd>ADD</kbd></h2>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <Link to="/addproduct">
                            <div className="card bg-success text-white">
                                <div className="card-body">Add product</div>
                            </div>
                        </Link>
                        <br/>
                        <Link to="/addcategory">
                            <div className="card bg-success text-white">
                                <div className="card-body">Add category</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <br/>
                <h2><kbd>DELETE&EDIT</kbd></h2>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <Link to="/products/True">
                            <div className="card bg-danger text-white">
                                <div className="card-body">Delete products</div>
                            </div>
                        </Link>
                        <br/>
                        <Link to="/categories/True">
                            <div className="card bg-danger text-white">
                                <div className="card-body">Delete categories</div>
                            </div>
                        </Link>
                        <br/>
                        <Link to="/orders/True">
                            <div className="card bg-danger text-white">
                                <div className="card-body">Delete orders</div>
                            </div>
                        </Link>
                        <br/>
                        <Link to="/users/True">
                            <div className="card bg-danger text-white">
                                <div className="card-body">Delete users</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <br/>
            </div>
        );
    }

}

export default AdminPanel;