import axios from 'axios';

import User from './User';

import React, {
    Component,
} from 'react';

class Users extends Component {

    constructor () {
        super();
        this.state = {
            users: []
        };
    }

    async componentDidMount() {
        const promise = await axios.get('http://localhost:9000/users');
        const response = promise.data;
        this.setState({ users: response });
    }

    render(){

        return (
            <div className="container">
                <h1>Users list:</h1>
                <div className="row">
                    <div className="col-12">
                        {this.state.users.map(user =>
                            <User
                                userID={user.userID}
                                email={user.email}
                                firstName={user.firstName}
                                surname={user.surname}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

}

export default Users;