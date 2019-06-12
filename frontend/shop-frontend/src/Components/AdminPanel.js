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
        };
    }

    render(){

        return (
            <div className="container">
                <h1 className="display-1 text-center"><span className="badge badge-warning">Admin Panel</span></h1>
                <br/>
                <h2 className="text-center"><kbd>ADD</kbd></h2>
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
                        <br/>
                        {/*<Link to="/adduser">*/}
                        {/*    <div className="card bg-success text-white">*/}
                        {/*        <div className="card-body">Add user</div>*/}
                        {/*    </div>*/}
                        {/*</Link>*/}
                    </div>
                </div>
                <br/>
                <h2 className="text-center"><kbd>DELETE&EDIT</kbd></h2>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <Link to="/products/True">
                            <div className="card bg-danger text-white">
                                <div className="card-body">
                                    Delete&<span className="badge badge-pill badge-warning">Update</span> products</div>
                            </div>
                        </Link>
                        <br/>
                        <Link to="/categories/True">
                            <div className="card bg-danger text-white">
                                <div className="card-body">
                                    Delete&<span className="badge badge-pill badge-warning">Update</span> categories</div>
                            </div>
                        </Link>
                        <br/>
                        <Link to="/orders/True">
                            <div className="card bg-danger text-white">
                                <div className="card-body">
                                    Delete&<span className="badge badge-pill badge-warning">Update</span> orders</div>
                            </div>
                        </Link>
                        <br/>
                        <Link to="/users/True">
                            <div className="card bg-danger text-white">
                                <div className="card-body">
                                    Delete&<span className="badge badge-pill badge-warning">Update</span> users</div>
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