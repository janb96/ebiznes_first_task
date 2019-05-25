import React from 'react';
import { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
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
        return (
            <div className="fixed-top" id="nawigacja">
                <div className="row p-2 border border-secondary">
                    <div className="col-3">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="col-3">
                        <Link to="/get">GET</Link>
                    </div>
                    <div className="col-3">
                        <Link to="/add">ADD</Link>
                    </div>
                    <div className="col-3">
                        <div ><i className="fas fa-cut"> {this.state.date.toLocaleTimeString()}</i></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Navbar;