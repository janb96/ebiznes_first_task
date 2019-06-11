import React from 'react';
import { Component } from 'react';

class PleaseLogin extends Component {
    render() {
        return (
            <div className="container">
                <br/>
                <br/>
                <h1 className={"text-center"}>
                    <div className="alert alert-info">
                        If you want to use this shop, you have to login
                    </div>
                </h1>
                <br/>
                <br/>
                <div className="row text-center">
                    <div className="col-6">
                        <h1>
                            <a href="http://localhost:9000/authenticate/facebook">Log-in <i className="fab fa-facebook-square"></i></a>
                        </h1>
                    </div>
                    <div className="col-6">
                        <h1>
                            <a href="http://localhost:9000/authenticate/google">Log-in <i className="fab fa-google"></i></a>
                        </h1>
                    </div>
                </div>
            </div>
        );

    }
}

export default PleaseLogin;