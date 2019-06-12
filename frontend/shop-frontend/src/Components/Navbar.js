import React from 'react';
import { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import axios from "axios";

class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            userData: null,
            date: new Date()
        };
    }

    async componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        const promise = await axios.get('http://localhost:9000');
        const response = promise.data;
        if(response !== "Unauthorized"){
            this.setState({
                userData: response,
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        if(this.state.userData == null){
            return (
                <div className="fixed-top" id="nawigacja">
                    <div className="row p-2 border border-secondary">
                        <div className="col-3">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="col-3">
                            <Link to="/admin-panel">Admin Panel</Link>
                        </div>
                        <div className="col-2">
                            <a href="http://localhost:9000/authenticate/facebook">Log-in <i className="fab fa-facebook-square"></i></a>
                        </div>
                        <div className="col-2">
                            <a href="http://localhost:9000/authenticate/google">Log-in <i className="fab fa-google"></i></a>
                        </div>
                        <div className="col-2">
                            <div ><i className="fas fa-cut"> {this.state.date.toLocaleTimeString()}</i></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="fixed-top" id="nawigacja">
                    <div className="row p-2 border border-secondary">
                        <div className="col-3">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="col-3">
                            <Link to="/admin-panel">Admin Panel</Link>
                        </div>
                        <div className="col-2">
                            Hi <span className="badge badge-success">{this.state.userData[0].firstName}</span>!
                        </div>
                        <div className="col-2">
                            <a href="http://localhost:9000/signOut">Logout</a>
                        </div>
                        <div className="col-2">
                            <div ><i className="fas fa-cut"> {this.state.date.toLocaleTimeString()}</i></div>
                        </div>
                    </div>
                </div>
            );
        }

    }

}

export default Navbar;